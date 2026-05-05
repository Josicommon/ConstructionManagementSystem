import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Progress } from "./ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Separator } from "./ui/separator"
import { 
  ArrowLeft,
  Edit,
  Save,
  X,
  Plus,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  FileText,
  Camera,
  Settings,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Target,
  Briefcase,
  MessageSquare,
  Phone,
  Mail,
  MoreHorizontal,
  Download,
  Upload,
  Trash2
} from "lucide-react"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"

interface ProjectDetailsProps {
  project: any
  user: {
    id: string
    name: string
    email: string
    role: string
  }
  onBack: () => void
  onProjectUpdate: (updatedProject: any) => void
}

export function ProjectDetails({ project, user, onBack, onProjectUpdate }: ProjectDetailsProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedProject, setEditedProject] = useState(project)
  const [activeTab, setActiveTab] = useState("overview")

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatRole = (role: string) => {
    return role.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress": return "bg-blue-100 text-blue-800"
      case "Behind Schedule": return "bg-red-100 text-red-800"
      case "Ahead of Schedule": return "bg-green-100 text-green-800"
      case "Completed": return "bg-gray-100 text-gray-800"
      case "Planning": return "bg-yellow-100 text-yellow-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800"
      case "Medium": return "bg-yellow-100 text-yellow-800"
      case "Low": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const handleSave = () => {
    onProjectUpdate(editedProject)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedProject(project)
    setIsEditing(false)
  }

  // Mock data for project tasks
  const projectTasks = [
    {
      id: 1,
      title: "Foundation Work",
      status: "completed",
      assignee: "Mike Chen",
      dueDate: "2024-08-30",
      progress: 100
    },
    {
      id: 2,
      title: "Steel Framework",
      status: "in-progress",
      assignee: "Lisa Davis",
      dueDate: "2024-09-15",
      progress: 65
    },
    {
      id: 3,
      title: "Electrical Installation",
      status: "pending",
      assignee: "Tom Wilson",
      dueDate: "2024-09-30",
      progress: 0
    }
  ]

  const projectDocuments = [
    {
      id: 1,
      name: "Project Blueprint v3.2",
      type: "PDF",
      size: "2.4 MB",
      uploadedBy: "Sarah Johnson",
      uploadedDate: "2024-08-15",
      category: "blueprints"
    },
    {
      id: 2,
      name: "Safety Protocol.docx",
      type: "DOCX",
      size: "156 KB",
      uploadedBy: "Mike Chen",
      uploadedDate: "2024-08-20",
      category: "safety"
    },
    {
      id: 3,
      name: "Budget_Report_Q3.xlsx",
      type: "XLSX",
      size: "89 KB",
      uploadedBy: "Lisa Davis",
      uploadedDate: "2024-09-01",
      category: "financial"
    }
  ]

  const projectPhotos = [
    {
      id: 1,
      name: "Foundation_Complete.jpg",
      uploadedBy: "Mike Chen",
      uploadedDate: "2024-08-22",
      description: "Foundation work completed"
    },
    {
      id: 2,
      name: "Steel_Frame_Progress.jpg",
      uploadedBy: "Lisa Davis",
      uploadedDate: "2024-09-05",
      description: "Steel framework installation progress"
    },
    {
      id: 3,
      name: "Site_Overview.jpg",
      uploadedBy: "Tom Wilson",
      uploadedDate: "2024-09-10",
      description: "Overall site progress"
    }
  ]

  const budgetBreakdown = [
    { category: "Materials", budgeted: 800000, spent: 520000, remaining: 280000 },
    { category: "Labor", budgeted: 600000, spent: 390000, remaining: 210000 },
    { category: "Equipment", budgeted: 400000, spent: 250000, remaining: 150000 },
    { category: "Permits", budgeted: 200000, spent: 180000, remaining: 20000 },
    { category: "Other", budgeted: 400000, spent: 220000, remaining: 180000 }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">{project.name}</h1>
            <p className="text-gray-600">{project.location}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge className={getStatusColor(project.status)}>
            {project.status}
          </Badge>
          <Badge variant="outline" className={getPriorityColor(project.priority)}>
            {project.priority} Priority
          </Badge>
          {user.role === 'project_manager' && (
            <Button
              variant={isEditing ? "default" : "outline"}
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
            >
              {isEditing ? <Save className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
              {isEditing ? "Save" : "Edit"}
            </Button>
          )}
          {isEditing && (
            <Button variant="ghost" onClick={handleCancel}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Project Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-2xl font-bold">{project.progress}%</span>
                <span className="text-sm text-muted-foreground">Complete</span>
              </div>
              <Progress value={project.progress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <DollarSign className="h-4 w-4 mr-2" />
              Budget
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="text-2xl font-bold">{formatCurrency(project.budget)}</div>
              <div className="text-sm text-muted-foreground">
                {formatCurrency(project.spent)} spent
              </div>
              <div className="text-xs text-green-600">
                {formatCurrency(project.budget - project.spent)} remaining
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Team
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="text-2xl font-bold">{project.team.length}</div>
              <div className="text-sm text-muted-foreground">Members</div>
              <div className="flex -space-x-1">
                {project.team.slice(0, 3).map((member: any, index: number) => (
                  <Avatar key={index} className="h-6 w-6 border-2 border-white">
                    <AvatarFallback className="text-xs">{member.avatar}</AvatarFallback>
                  </Avatar>
                ))}
                {project.team.length > 3 && (
                  <div className="h-6 w-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                    <span className="text-xs text-gray-600">+{project.team.length - 3}</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="text-2xl font-bold">
                {Math.ceil((new Date(project.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
              </div>
              <div className="text-sm text-muted-foreground">Days remaining</div>
              <div className="text-xs text-muted-foreground">
                Due: {new Date(project.endDate).toLocaleDateString()}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="communication">Notes</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Project Name</Label>
                      <Input
                        id="name"
                        value={editedProject.name}
                        onChange={(e) => setEditedProject({...editedProject, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={editedProject.description}
                        onChange={(e) => setEditedProject({...editedProject, description: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={editedProject.location}
                        onChange={(e) => setEditedProject({...editedProject, location: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="status">Status</Label>
                        <Select value={editedProject.status} onValueChange={(value) => setEditedProject({...editedProject, status: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Planning">Planning</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Behind Schedule">Behind Schedule</SelectItem>
                            <SelectItem value="Ahead of Schedule">Ahead of Schedule</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="priority">Priority</Label>
                        <Select value={editedProject.priority} onValueChange={(value) => setEditedProject({...editedProject, priority: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Low">Low</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <Label>Description</Label>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                    </div>
                    <div>
                      <Label>Location</Label>
                      <p className="text-sm text-muted-foreground flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {project.location}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Start Date</Label>
                        <p className="text-sm text-muted-foreground">{new Date(project.startDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <Label>End Date</Label>
                        <p className="text-sm text-muted-foreground">{new Date(project.endDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div>
                      <Label>Project Manager</Label>
                      <p className="text-sm text-muted-foreground">{project.manager}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm">Foundation inspection completed</p>
                      <p className="text-xs text-muted-foreground">Mike Chen • 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <FileText className="h-4 w-4 text-blue-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm">Updated project blueprint</p>
                      <p className="text-xs text-muted-foreground">Sarah Johnson • 4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Users className="h-4 w-4 text-purple-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm">New team member added</p>
                      <p className="text-xs text-muted-foreground">Project Manager • 1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <DollarSign className="h-4 w-4 text-orange-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm">Budget updated</p>
                      <p className="text-xs text-muted-foreground">Lisa Davis • 2 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Task Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{project.tasks.completed}</div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{project.tasks.inProgress}</div>
                  <div className="text-sm text-muted-foreground">In Progress</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{project.tasks.pending}</div>
                  <div className="text-sm text-muted-foreground">Pending</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{project.tasks.total}</div>
                  <div className="text-sm text-muted-foreground">Total Tasks</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Project Tasks</h3>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left p-4 font-medium">Task</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Assignee</th>
                      <th className="text-left p-4 font-medium">Due Date</th>
                      <th className="text-left p-4 font-medium">Progress</th>
                      <th className="text-left p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectTasks.map((task) => (
                      <tr key={task.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            {task.status === 'completed' && <CheckCircle className="h-4 w-4 text-green-500" />}
                            {task.status === 'in-progress' && <Clock className="h-4 w-4 text-blue-500" />}
                            {task.status === 'pending' && <Clock className="h-4 w-4 text-gray-500" />}
                            <span className="font-medium">{task.title}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge className={
                            task.status === 'completed' ? 'bg-green-100 text-green-800' :
                            task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }>
                            {task.status.replace('-', ' ')}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">
                                {task.assignee.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{task.assignee}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-sm">{new Date(task.dueDate).toLocaleDateString()}</span>
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
                            <DropdownMenuContent>
                              <DropdownMenuItem>Edit Task</DropdownMenuItem>
                              <DropdownMenuItem>Assign</DropdownMenuItem>
                              <DropdownMenuItem>Mark Complete</DropdownMenuItem>
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

        <TabsContent value="team" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Team Members</h3>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Member
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.team.map((member: any, index: number) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>{member.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-medium">{member.name}</h4>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Phone className="h-4 w-4 mr-2" />
                          Call
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="h-4 w-4 mr-2" />
                          Email
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="budget" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Budget Overview</h3>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Expense
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Total Budget</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(project.budget)}</div>
                <p className="text-sm text-muted-foreground">Allocated</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Spent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{formatCurrency(project.spent)}</div>
                <p className="text-sm text-muted-foreground">
                  {Math.round((project.spent / project.budget) * 100)}% of budget
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Remaining</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(project.budget - project.spent)}
                </div>
                <p className="text-sm text-muted-foreground">
                  {Math.round(((project.budget - project.spent) / project.budget) * 100)}% remaining
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Budget Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {budgetBreakdown.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.category}</span>
                      <span className="text-sm text-muted-foreground">
                        {formatCurrency(item.spent)} / {formatCurrency(item.budgeted)}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(item.spent / item.budgeted) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-12">
                        {Math.round((item.spent / item.budgeted) * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Project Documents</h3>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left p-4 font-medium">Document</th>
                      <th className="text-left p-4 font-medium">Type</th>
                      <th className="text-left p-4 font-medium">Size</th>
                      <th className="text-left p-4 font-medium">Uploaded By</th>
                      <th className="text-left p-4 font-medium">Date</th>
                      <th className="text-left p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectDocuments.map((doc) => (
                      <tr key={doc.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4 text-blue-500" />
                            <span className="font-medium">{doc.name}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline">{doc.type}</Badge>
                        </td>
                        <td className="p-4">
                          <span className="text-sm">{doc.size}</span>
                        </td>
                        <td className="p-4">
                          <span className="text-sm">{doc.uploadedBy}</span>
                        </td>
                        <td className="p-4">
                          <span className="text-sm">{new Date(doc.uploadedDate).toLocaleDateString()}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="photos" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Project Photos</h3>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Photos
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectPhotos.map((photo) => (
              <Card key={photo.id}>
                <CardContent className="p-4">
                  <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                    <Camera className="h-12 w-12 text-gray-400" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">{photo.name}</h4>
                    <p className="text-sm text-muted-foreground">{photo.description}</p>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>{photo.uploadedBy}</span>
                      <span>{new Date(photo.uploadedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="communication" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Project Notes & Communication</h3>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Note
            </Button>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Foundation inspection passed</h4>
                      <p className="text-sm text-muted-foreground">
                        All foundation work has been completed and passed inspection. Ready to proceed with next phase.
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">2 hours ago</span>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    By: Mike Chen
                  </div>
                </div>
                
                <div className="border-l-4 border-yellow-500 pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Material delivery delayed</h4>
                      <p className="text-sm text-muted-foreground">
                        Steel materials will be delivered 2 days late due to supplier issues. Adjusting timeline accordingly.
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">1 day ago</span>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    By: Sarah Johnson
                  </div>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Safety training completed</h4>
                      <p className="text-sm text-muted-foreground">
                        All team members have completed the required safety training for this phase of construction.
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">3 days ago</span>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    By: Anna Brown
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Project Settings</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Notification Settings</Label>
                  <p className="text-sm text-muted-foreground">Email notifications for task updates</p>
                </div>
                <div>
                  <Label>Default Task View</Label>
                  <p className="text-sm text-muted-foreground">List view</p>
                </div>
                <div>
                  <Label>Budget Alerts</Label>
                  <p className="text-sm text-muted-foreground">Alert when 80% of budget is spent</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Danger Zone</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Archive Project</Label>
                  <p className="text-sm text-muted-foreground">Move project to archive</p>
                  <Button variant="outline" className="mt-2">Archive</Button>
                </div>
                <div>
                  <Label>Delete Project</Label>
                  <p className="text-sm text-muted-foreground">Permanently delete this project</p>
                  <Button variant="destructive" className="mt-2">Delete</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}