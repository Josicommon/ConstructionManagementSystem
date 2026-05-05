import { Hono } from 'npm:hono'
import { cors } from 'npm:hono/cors'
import { logger } from 'npm:hono/logger'
import { createClient } from 'npm:@supabase/supabase-js'
import * as kv from './kv_store.tsx'

const app = new Hono()

app.use('*', logger(console.log))
app.use('*', cors({
  origin: '*',
  allowHeaders: ['*'],
  allowMethods: ['*'],
}))

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

// Ensure buckets exist on startup
async function initializeBuckets() {
  const bucketNames = ['make-e9721f66-documents', 'make-e9721f66-photos']
  
  for (const bucketName of bucketNames) {
    const { data: buckets } = await supabase.storage.listBuckets()
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName)
    
    if (!bucketExists) {
      console.log(`Creating bucket: ${bucketName}`)
      await supabase.storage.createBucket(bucketName, { public: false })
    }
  }
}

// Initialize buckets
initializeBuckets().catch(console.error)

// Authentication routes
app.post('/make-server-e9721f66/auth/signup', async (c) => {
  try {
    const { email, password, name, role } = await c.req.json()
    
    if (!email || !password || !name) {
      return c.json({ error: 'Missing required fields' }, 400)
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, role: role || 'team_member' },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    })

    if (error) {
      console.log('Signup error:', error.message)
      return c.json({ error: error.message }, 400)
    }

    // Store additional user data
    if (data.user) {
      await kv.set(`user:${data.user.id}`, {
        id: data.user.id,
        email,
        name,
        role: role || 'team_member',
        created_at: new Date().toISOString(),
        avatar: null,
        projects: []
      })
    }

    return c.json({ user: data.user })
  } catch (error) {
    console.log('Signup processing error:', error)
    return c.json({ error: 'Internal server error during signup' }, 500)
  }
})

// Projects routes
app.get('/make-server-e9721f66/projects', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    if (!accessToken) {
      return c.json({ error: 'No access token provided' }, 401)
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    if (!user?.id) {
      return c.json({ error: 'Unauthorized: Invalid access token' }, 401)
    }

    const projects = await kv.getByPrefix('project:')
    const userProjects = projects.filter(project => 
      project.team_members?.some((member: any) => member.id === user.id) ||
      project.manager_id === user.id
    )

    return c.json({ projects: userProjects })
  } catch (error) {
    console.log('Get projects error:', error)
    return c.json({ error: 'Failed to retrieve projects' }, 500)
  }
})

app.post('/make-server-e9721f66/projects', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    if (!accessToken) {
      return c.json({ error: 'No access token provided' }, 401)
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    if (!user?.id) {
      return c.json({ error: 'Unauthorized: Invalid access token' }, 401)
    }

    const projectData = await c.req.json()
    const projectId = `project:${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    const project = {
      id: projectId,
      name: projectData.name,
      description: projectData.description,
      status: 'planning',
      priority: projectData.priority || 'medium',
      budget: projectData.budget || 0,
      spent: 0,
      start_date: projectData.start_date,
      end_date: projectData.end_date,
      location: projectData.location,
      manager_id: user.id,
      team_members: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      progress: 0,
      tasks: {
        total: 0,
        completed: 0,
        in_progress: 0,
        pending: 0
      }
    }

    await kv.set(projectId, project)
    return c.json({ project })
  } catch (error) {
    console.log('Create project error:', error)
    return c.json({ error: 'Failed to create project' }, 500)
  }
})

app.put('/make-server-e9721f66/projects/:id', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    if (!accessToken) {
      return c.json({ error: 'No access token provided' }, 401)
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    if (!user?.id) {
      return c.json({ error: 'Unauthorized: Invalid access token' }, 401)
    }

    const projectId = `project:${c.req.param('id')}`
    const existing = await kv.get(projectId)
    
    if (!existing) {
      return c.json({ error: 'Project not found' }, 404)
    }

    if (existing.manager_id !== user.id) {
      return c.json({ error: 'Unauthorized: Only project manager can update' }, 403)
    }

    const updates = await c.req.json()
    const updatedProject = {
      ...existing,
      ...updates,
      updated_at: new Date().toISOString()
    }

    await kv.set(projectId, updatedProject)
    return c.json({ project: updatedProject })
  } catch (error) {
    console.log('Update project error:', error)
    return c.json({ error: 'Failed to update project' }, 500)
  }
})

// Tasks routes
app.get('/make-server-e9721f66/tasks', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    if (!accessToken) {
      return c.json({ error: 'No access token provided' }, 401)
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    if (!user?.id) {
      return c.json({ error: 'Unauthorized: Invalid access token' }, 401)
    }

    const projectId = c.req.query('project_id')
    let tasks = await kv.getByPrefix('task:')

    if (projectId) {
      tasks = tasks.filter(task => task.project_id === projectId)
    }

    // Filter tasks user has access to
    const userProjects = await kv.getByPrefix('project:')
    const accessibleProjectIds = userProjects
      .filter(project => 
        project.team_members?.some((member: any) => member.id === user.id) ||
        project.manager_id === user.id
      )
      .map(project => project.id)

    const accessibleTasks = tasks.filter(task => 
      accessibleProjectIds.includes(task.project_id) ||
      task.assignee_id === user.id
    )

    return c.json({ tasks: accessibleTasks })
  } catch (error) {
    console.log('Get tasks error:', error)
    return c.json({ error: 'Failed to retrieve tasks' }, 500)
  }
})

app.post('/make-server-e9721f66/tasks', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    if (!accessToken) {
      return c.json({ error: 'No access token provided' }, 401)
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    if (!user?.id) {
      return c.json({ error: 'Unauthorized: Invalid access token' }, 401)
    }

    const taskData = await c.req.json()
    const taskId = `task:${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    const task = {
      id: taskId,
      title: taskData.title,
      description: taskData.description,
      project_id: taskData.project_id,
      status: 'pending',
      priority: taskData.priority || 'medium',
      assignee_id: taskData.assignee_id,
      creator_id: user.id,
      start_date: taskData.start_date,
      end_date: taskData.end_date,
      estimated_hours: taskData.estimated_hours || 0,
      actual_hours: 0,
      progress: 0,
      subtasks: [],
      dependencies: taskData.dependencies || [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    await kv.set(taskId, task)
    return c.json({ task })
  } catch (error) {
    console.log('Create task error:', error)
    return c.json({ error: 'Failed to create task' }, 500)
  }
})

app.put('/make-server-e9721f66/tasks/:id', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    if (!accessToken) {
      return c.json({ error: 'No access token provided' }, 401)
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    if (!user?.id) {
      return c.json({ error: 'Unauthorized: Invalid access token' }, 401)
    }

    const taskId = `task:${c.req.param('id')}`
    const existing = await kv.get(taskId)
    
    if (!existing) {
      return c.json({ error: 'Task not found' }, 404)
    }

    const updates = await c.req.json()
    const updatedTask = {
      ...existing,
      ...updates,
      updated_at: new Date().toISOString()
    }

    await kv.set(taskId, updatedTask)

    // Update project task statistics if status changed
    if (updates.status && updates.status !== existing.status) {
      const project = await kv.get(existing.project_id)
      if (project) {
        // Recalculate task counts (simplified version)
        const allProjectTasks = (await kv.getByPrefix('task:')).filter(t => t.project_id === existing.project_id)
        const taskCounts = {
          total: allProjectTasks.length,
          completed: allProjectTasks.filter(t => t.status === 'completed').length,
          in_progress: allProjectTasks.filter(t => t.status === 'in-progress').length,
          pending: allProjectTasks.filter(t => t.status === 'pending').length
        }
        
        const updatedProject = {
          ...project,
          tasks: taskCounts,
          progress: taskCounts.total > 0 ? Math.round((taskCounts.completed / taskCounts.total) * 100) : 0,
          updated_at: new Date().toISOString()
        }
        
        await kv.set(existing.project_id, updatedProject)
      }
    }

    return c.json({ task: updatedTask })
  } catch (error) {
    console.log('Update task error:', error)
    return c.json({ error: 'Failed to update task' }, 500)
  }
})

// File upload routes
app.post('/make-server-e9721f66/files/upload', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    if (!accessToken) {
      return c.json({ error: 'No access token provided' }, 401)
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    if (!user?.id) {
      return c.json({ error: 'Unauthorized: Invalid access token' }, 401)
    }

    const formData = await c.req.formData()
    const file = formData.get('file') as File
    const projectId = formData.get('project_id') as string
    const category = formData.get('category') as string || 'documents'

    if (!file || !projectId) {
      return c.json({ error: 'Missing file or project_id' }, 400)
    }

    const bucketName = category === 'photos' ? 'make-e9721f66-photos' : 'make-e9721f66-documents'
    const fileName = `${projectId}/${Date.now()}-${file.name}`

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file)

    if (uploadError) {
      console.log('File upload error:', uploadError)
      return c.json({ error: 'Failed to upload file' }, 500)
    }

    // Generate signed URL for accessing the file
    const { data: signedUrlData } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(fileName, 3600) // 1 hour expiry

    const fileRecord = {
      id: `file:${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: file.name,
      path: fileName,
      bucket: bucketName,
      project_id: projectId,
      category,
      size: file.size,
      type: file.type,
      uploaded_by: user.id,
      uploaded_at: new Date().toISOString(),
      signed_url: signedUrlData?.signedUrl
    }

    await kv.set(fileRecord.id, fileRecord)
    return c.json({ file: fileRecord })
  } catch (error) {
    console.log('File upload processing error:', error)
    return c.json({ error: 'Failed to process file upload' }, 500)
  }
})

app.get('/make-server-e9721f66/files/:id/download', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    if (!accessToken) {
      return c.json({ error: 'No access token provided' }, 401)
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    if (!user?.id) {
      return c.json({ error: 'Unauthorized: Invalid access token' }, 401)
    }

    const fileId = `file:${c.req.param('id')}`
    const fileRecord = await kv.get(fileId)

    if (!fileRecord) {
      return c.json({ error: 'File not found' }, 404)
    }

    // Generate new signed URL
    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      .from(fileRecord.bucket)
      .createSignedUrl(fileRecord.path, 3600)

    if (signedUrlError) {
      console.log('Signed URL generation error:', signedUrlError)
      return c.json({ error: 'Failed to generate download URL' }, 500)
    }

    return c.json({ download_url: signedUrlData.signedUrl })
  } catch (error) {
    console.log('File download error:', error)
    return c.json({ error: 'Failed to generate download link' }, 500)
  }
})

// Team management routes
app.post('/make-server-e9721f66/projects/:id/members', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    if (!accessToken) {
      return c.json({ error: 'No access token provided' }, 401)
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    if (!user?.id) {
      return c.json({ error: 'Unauthorized: Invalid access token' }, 401)
    }

    const projectId = `project:${c.req.param('id')}`
    const { user_id, role } = await c.req.json()

    const project = await kv.get(projectId)
    if (!project) {
      return c.json({ error: 'Project not found' }, 404)
    }

    if (project.manager_id !== user.id) {
      return c.json({ error: 'Unauthorized: Only project manager can add members' }, 403)
    }

    const memberData = await kv.get(`user:${user_id}`)
    if (!memberData) {
      return c.json({ error: 'User not found' }, 404)
    }

    const teamMember = {
      id: user_id,
      name: memberData.name,
      email: memberData.email,
      role: role || 'team_member',
      joined_at: new Date().toISOString()
    }

    const updatedProject = {
      ...project,
      team_members: [...(project.team_members || []), teamMember],
      updated_at: new Date().toISOString()
    }

    await kv.set(projectId, updatedProject)
    return c.json({ project: updatedProject })
  } catch (error) {
    console.log('Add team member error:', error)
    return c.json({ error: 'Failed to add team member' }, 500)
  }
})

// Dashboard stats
app.get('/make-server-e9721f66/dashboard/stats', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    if (!accessToken) {
      return c.json({ error: 'No access token provided' }, 401)
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    if (!user?.id) {
      return c.json({ error: 'Unauthorized: Invalid access token' }, 401)
    }

    const projects = await kv.getByPrefix('project:')
    const tasks = await kv.getByPrefix('task:')
    
    // Filter for user's accessible data
    const userProjects = projects.filter(project => 
      project.team_members?.some((member: any) => member.id === user.id) ||
      project.manager_id === user.id
    )

    const userTasks = tasks.filter(task => 
      userProjects.some(project => project.id === task.project_id) ||
      task.assignee_id === user.id
    )

    const stats = {
      active_projects: userProjects.filter(p => p.status !== 'completed').length,
      total_budget: userProjects.reduce((sum, p) => sum + (p.budget || 0), 0),
      team_members: [...new Set(userProjects.flatMap(p => p.team_members || []).map(m => m.id))].length,
      completion_rate: userProjects.length > 0 
        ? Math.round(userProjects.reduce((sum, p) => sum + (p.progress || 0), 0) / userProjects.length)
        : 0,
      tasks: {
        completed: userTasks.filter(t => t.status === 'completed').length,
        in_progress: userTasks.filter(t => t.status === 'in-progress').length,
        overdue: userTasks.filter(t => t.status === 'overdue').length,
        due_this_week: userTasks.filter(t => {
          const dueDate = new Date(t.end_date)
          const weekFromNow = new Date()
          weekFromNow.setDate(weekFromNow.getDate() + 7)
          return dueDate <= weekFromNow && dueDate >= new Date()
        }).length
      }
    }

    return c.json({ stats })
  } catch (error) {
    console.log('Dashboard stats error:', error)
    return c.json({ error: 'Failed to retrieve dashboard stats' }, 500)
  }
})

app.get('/make-server-e9721f66/health', (c) => {
  return c.json({ status: 'OK', timestamp: new Date().toISOString() })
})

Deno.serve(app.fetch)