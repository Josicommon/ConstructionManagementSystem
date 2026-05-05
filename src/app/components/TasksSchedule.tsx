import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { 
  Plus, 
  Filter,
  Calendar as CalendarIcon,
  CheckCircle,
  Clock,
  AlertTriangle,
  User,
  Calendar,
  Search,
  MoreHorizontal
} from "lucide-react"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

interface TasksScheduleProps {
  user: {
    id: string
    name: string
    email: string
    role: string
  }
}

export function TasksSchedule({ user }: TasksScheduleProps) {
  const tasks = [
    {
      id: 1,
      title: "Foundation Excavation",
      description: "Complete excavation work for building foundation",
      project: "Downtown Office Complex",
      status: "completed",
      priority: "high",
      assignee: { name: "Mike Chen", avatar: "MC" },
      startDate: "2024-08-15",
      endDate: "2024-08-22",
      progress: 100,
      dependencies: [],
      subtasks: 8,
      completedSubtasks: 8,
      estimatedHours: 120,
      actualHours: 118
    },
    {
      id: 2,
      title: "Steel Framework Installation",
      description: "Install structural steel framework for floors 1-5",
      project: "Downtown Office Complex",
      status: "in-progress",
      priority: "high",
      assignee: { name: "Lisa Davis", avatar: "LD" },
      startDate: "2024-08-23",
      endDate: "2024-09-15",
      progress: 65,
      dependencies: [1],
      subtasks: 12,
      completedSubtasks: 8,
      estimatedHours: 200,
      actualHours: 130
    },
    {
      id: 3,
      title: "Electrical Rough-in",
      description: "Install electrical systems for floors 1-3",
      project: "Downtown Office Complex",
      status: "pending",
      priority: "medium",
      assignee: { name: "Tom Wilson", avatar: "TW" },
      startDate: "2024-09-10",
      endDate: "2024-09-25",
      progress: 0,
      dependencies: [2],
      subtasks: 15,
      completedSubtasks: 0,
      estimatedHours: 180,
      actualHours: 0
    },
    {
      id: 4,
      title: "HVAC System Design Review",
      description: "Review and approve HVAC system designs",
      project: "Residential Tower A",
      status: "overdue",
      priority: "high",
      assignee: { name: "Anna Brown", avatar: "AB" },
      startDate: "2024-08-20",
      endDate: "2024-08-30",
      progress: 80,
      dependencies: [],
      subtasks: 5,
      completedSubtasks: 4,
      estimatedHours: 40,
      actualHours: 35
    },
    {
      id: 5,
      title: "Interior Finishing - Lobby",
      description: "Complete interior finishing work for main lobby",
      project: "Shopping Center Renovation",
      status: "in-progress",
      priority: "medium",
      assignee: { name: "Susan Miller", avatar: "SM" },
      startDate: "2024-09-01",
      endDate: "2024-09-20",
      progress: 45,
      dependencies: [],
      subtasks: 10,
      completedSubtasks: 5,
      estimatedHours: 160,
      actualHours: 72
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800"
      case "in-progress": return "bg-blue-100 text-blue-800"
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "overdue": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800"
      case "medium": return "bg-yellow-100 text-yellow-800"
      case "low": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4 text-green-500" />
      case "in-progress": return <Clock className="h-4 w-4 text-blue-500" />
      case "overdue": return <AlertTriangle className="h-4 w-4 text-red-500" />
      default: return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const formatRole = (role: string) => {
    return role.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  // Filter tasks based on user role - in a real app, this would come from the API
  const userTasks = tasks.filter(task => {
    // Show all tasks for project managers, only assigned tasks for others
    return user.role === 'project_manager' || task.assignee.name === user.name
  })

  // Generate calendar view data
  const generateCalendarData = () => {
    const today = new Date()
    const startDate = new Date(today.getFullYear(), today.getMonth(), 1)
    const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0)
    const days = []
    
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d))
    }
    
    return days
  }

  const calendarDays = generateCalendarData()

  return (
    <div className="space-y-6">
      {/* User Context Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Tasks &amp; Schedule</h2>
            <p className="text-sm text-gray-600">
              {user.role === 'project_manager' ? 'Managing all project tasks' : `Tasks assigned to ${user.name}`} • {formatRole(user.role)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">{userTasks.length} tasks</p>
            <p className="text-xs text-gray-500">
              {userTasks.filter(t => t.status === 'completed').length} completed
            </p>
          </div>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search tasks..." className="pl-10 w-64" />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="downtown">Downtown Office</SelectItem>
              <SelectItem value="tower">Residential Tower</SelectItem>
              <SelectItem value="shopping">Shopping Center</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="all">
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Task Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-xl font-semibold">{userTasks.filter(t => t.status === 'completed').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-xl font-semibold">{userTasks.filter(t => t.status === 'in-progress').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Overdue</p>
                <p className="text-xl font-semibold">{userTasks.filter(t => t.status === 'overdue').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Due This Week</p>
                <p className="text-xl font-semibold">
                  {userTasks.filter(t => {
                    const dueDate = new Date(t.endDate)
                    const weekFromNow = new Date()
                    weekFromNow.setDate(weekFromNow.getDate() + 7)
                    return dueDate <= weekFromNow && dueDate >= new Date()
                  }).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="list" className="space-y-6">
        <TabsList>
          <TabsTrigger value="list">Task List</TabsTrigger>
          <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
          <TabsTrigger value="gantt">Gantt Chart</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b bg-gray-50">
                    <tr>
                      <th className="text-left p-4 font-medium">Task</th>
                      <th className="text-left p-4 font-medium">Project</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Priority</th>
                      <th className="text-left p-4 font-medium">Assignee</th>
                      <th className="text-left p-4 font-medium">Due Date</th>
                      <th className="text-left p-4 font-medium">Progress</th>
                      <th className="text-left p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userTasks.map((task) => (
                      <tr key={task.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(task.status)}
                              <span className="font-medium">{task.title}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{task.description}</p>
                            <div className="text-xs text-muted-foreground">
                              {task.completedSubtasks}/{task.subtasks} subtasks • {task.actualHours}/{task.estimatedHours}h
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-sm">{task.project}</span>
                        </td>
                        <td className="p-4">
                          <Badge className={getStatusColor(task.status)}>
                            {task.status.replace('-', ' ')}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline" className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">{task.assignee.avatar}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{task.assignee.name}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-sm">{new Date(task.endDate).toLocaleDateString()}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${task.progress}%` }}
                              />
                            </div>
                            <span className="text-sm">{task.progress}%</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit Task</DropdownMenuItem>
                              <DropdownMenuItem>Assign</DropdownMenuItem>
                              <DropdownMenuItem>Duplicate</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kanban">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {["pending", "in-progress", "completed", "overdue"].map((status) => (
              <Card key={status}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center justify-between">
                    <span className="capitalize">{status.replace('-', ' ')}</span>
                    <Badge variant="secondary">
                      {userTasks.filter(task => task.status === status).length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {userTasks.filter(task => task.status === status).map((task) => (
                    <div key={task.id} className="border rounded-lg p-3 bg-white hover:shadow-md transition-shadow cursor-pointer">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium text-sm">{task.title}</h4>
                          <Badge variant="outline" className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>
                        <div className="flex items-center justify-between">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">{task.assignee.avatar}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground">
                            {new Date(task.endDate).toLocaleDateString()}
                          </span>
                        </div>
                        {task.progress > 0 && (
                          <div className="space-y-1">
                            <div className="w-full bg-gray-200 rounded-full h-1">
                              <div 
                                className="bg-blue-600 h-1 rounded-full" 
                                style={{ width: `${task.progress}%` }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground">{task.progress}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="gantt">
          <Card>
            <CardHeader>
              <CardTitle>Gantt Chart View</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-12 gap-2 text-xs text-muted-foreground border-b pb-2">
                  <div className="col-span-4">Task</div>
                  <div className="col-span-8 grid grid-cols-7 gap-2 text-center">
                    {['Aug 15', 'Aug 22', 'Aug 29', 'Sep 05', 'Sep 12', 'Sep 19', 'Sep 26'].map((date) => (
                      <div key={date}>{date}</div>
                    ))}
                  </div>
                </div>
                
                {userTasks.map((task) => (
                  <div key={task.id} className="grid grid-cols-12 gap-2 items-center py-2 border-b">
                    <div className="col-span-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(task.status)}
                        <div>
                          <p className="font-medium text-sm">{task.title}</p>
                          <p className="text-xs text-muted-foreground">{task.assignee.name}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-8">
                      <div className="relative h-6 bg-gray-100 rounded">
                        <div 
                          className="absolute top-0 h-full bg-blue-500 rounded"
                          style={{ 
                            left: '10%', 
                            width: '40%'
                          }}
                        />
                        <div 
                          className="absolute top-0 h-full bg-blue-300 rounded"
                          style={{ 
                            left: '10%', 
                            width: `${40 * task.progress / 100}%`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>Task Calendar - {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="p-2 text-center font-medium text-sm text-muted-foreground">
                    {day}
                  </div>
                ))}
                
                {calendarDays.map((day, index) => (
                  <div key={index} className="min-h-24 p-2 border rounded">
                    <div className="text-sm font-medium mb-1">{day.getDate()}</div>
                    <div className="space-y-1">
                      {userTasks
                        .filter(task => {
                          const taskDate = new Date(task.endDate)
                          return taskDate.toDateString() === day.toDateString()
                        })
                        .map((task) => (
                          <div key={task.id} className="text-xs p-1 bg-blue-100 text-blue-800 rounded truncate">
                            {task.title}
                          </div>
                        ))
                      }
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}