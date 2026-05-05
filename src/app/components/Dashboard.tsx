import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Progress } from "./ui/progress"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Calendar, CheckCircle, Clock, DollarSign, FileText, Users, AlertTriangle, TrendingUp, Eye } from "lucide-react"

interface DashboardProps {
  user: {
    id: string
    name: string
    email: string
    role: string
  }
  onProjectSelect?: (project: any) => void
}

export function Dashboard({ user, onProjectSelect }: DashboardProps) {
  const projects = [
    {
      id: 1,
      name: "Downtown Office Complex",
      progress: 65,
      status: "On Track",
      budget: "$2.4M",
      spent: "$1.56M",
      deadline: "Dec 15, 2025",
      team: 24,
      tasks: { completed: 45, total: 69 },
      description: "A 25-story mixed-use development in the heart of downtown",
      priority: "High",
      startDate: "2024-08-15",
      endDate: "2025-12-15",
      location: "Downtown District, City Center",
      manager: "Sarah Johnson",
      teamMembers: [
        { name: "Mike Chen", role: "Architect", avatar: "MC" },
        { name: "Lisa Davis", role: "Engineer", avatar: "LD" },
        { name: "Tom Wilson", role: "Contractor", avatar: "TW" },
        { name: "Anna Brown", role: "Safety Officer", avatar: "AB" },
      ],
      recentActivity: "Foundation inspection completed",
      issues: 2,
      lastUpdate: "2 hours ago"
    },
    {
      id: 2,
      name: "Residential Tower A",
      progress: 32,
      status: "Behind",
      budget: "$3.8M",
      spent: "$1.21M",
      deadline: "Mar 20, 2026",
      team: 18,
      tasks: { completed: 23, total: 71 },
      description: "Luxury residential tower with 40 floors and amenities",
      priority: "High",
      startDate: "2024-10-01",
      endDate: "2026-03-20",
      location: "Riverfront District",
      manager: "David Rodriguez",
      teamMembers: [
        { name: "Emily White", role: "Architect", avatar: "EW" },
        { name: "James Lee", role: "Engineer", avatar: "JL" },
        { name: "Maria Garcia", role: "Contractor", avatar: "MG" },
      ],
      recentActivity: "Budget review required",
      issues: 5,
      lastUpdate: "4 hours ago"
    },
    {
      id: 3,
      name: "Shopping Center Renovation",
      progress: 89,
      status: "Ahead",
      budget: "$1.2M",
      spent: "$1.07M",
      deadline: "Aug 30, 2025",
      team: 12,
      tasks: { completed: 67, total: 75 },
      description: "Complete renovation of existing 3-story shopping center",
      priority: "Medium",
      startDate: "2024-06-01",
      endDate: "2025-08-30",
      location: "Suburban Mall District",
      manager: "Jennifer Kim",
      teamMembers: [
        { name: "Robert Taylor", role: "Architect", avatar: "RT" },
        { name: "Susan Miller", role: "Interior Designer", avatar: "SM" },
        { name: "Alex Chen", role: "Contractor", avatar: "AC" },
      ],
      recentActivity: "Final inspections scheduled",
      issues: 0,
      lastUpdate: "1 day ago"
    }
  ]

  const recentActivities = [
    { id: 1, type: "task", message: "Foundation inspection completed", time: "2 hours ago", user: "Mike Johnson" },
    { id: 2, type: "meeting", message: "Weekly standup scheduled", time: "4 hours ago", user: "Sarah Davis" },
    { id: 3, type: "document", message: "Blueprint v3.2 uploaded", time: "6 hours ago", user: "Tom Wilson" },
    { id: 4, type: "budget", message: "Budget approval requested", time: "1 day ago", user: "Lisa Chen" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Track": return "bg-green-100 text-green-800"
      case "Behind": return "bg-red-100 text-red-800"
      case "Ahead": return "bg-blue-100 text-blue-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const formatRole = (role: string) => {
    return role.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  const handleProjectView = (project: any) => {
    if (onProjectSelect) {
      // Transform project data to match ProjectDetails expected format
      const transformedProject = {
        ...project,
        team: project.teamMembers || [],
        tasks: {
          total: project.tasks.total,
          completed: project.tasks.completed,
          inProgress: project.tasks.total - project.tasks.completed - Math.floor(project.tasks.total * 0.1),
          pending: Math.floor(project.tasks.total * 0.1)
        }
      }
      onProjectSelect(transformedProject)
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-brand-orange-light to-orange-50 border border-orange-200 rounded-lg p-4 lg:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="text-xl lg:text-2xl font-semibold text-brand-text-dark">Welcome back, {user.name}!</h1>
            <p className="text-brand-text-light mt-1 text-sm">{formatRole(user.role)} • {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="sm:text-right">
            <p className="text-sm text-brand-text-light">Current Time</p>
            <p className="text-lg font-medium text-brand-text-dark">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-brand-orange">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-brand-text-dark">Active Projects</CardTitle>
            <FileText className="h-4 w-4 text-brand-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand-text-dark">12</div>
            <p className="text-xs text-brand-text-light">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-brand-text-dark">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand-text-dark">$8.7M</div>
            <p className="text-xs text-brand-text-light">
              73% allocated
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-brand-text-dark">Team Members</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand-text-dark">127</div>
            <p className="text-xs text-brand-text-light">
              Across all projects
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-brand-text-dark">Completion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand-text-dark">67%</div>
            <p className="text-xs text-brand-text-light">
              +5% from last week
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Overview */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-brand-text-dark">Active Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="border rounded-lg p-4 space-y-3 hover:shadow-sm transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-semibold text-brand-text-dark">{project.name}</h4>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleProjectView(project)}
                          className="text-brand-orange hover:bg-brand-orange-light"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-brand-text-light">Budget</p>
                        <p className="font-medium text-brand-text-dark">{project.budget}</p>
                      </div>
                      <div>
                        <p className="text-brand-text-light">Spent</p>
                        <p className="font-medium text-brand-text-dark">{project.spent}</p>
                      </div>
                      <div>
                        <p className="text-brand-text-light">Team</p>
                        <p className="font-medium text-brand-text-dark">{project.team} members</p>
                      </div>
                      <div>
                        <p className="text-brand-text-light">Deadline</p>
                        <p className="font-medium text-brand-text-dark">{project.deadline}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-brand-text-light">Progress</span>
                        <span className="text-brand-text-dark font-medium">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                      <div className="flex justify-between text-xs text-brand-text-light">
                        <span>{project.tasks.completed}/{project.tasks.total} tasks completed</span>
                        <span>{project.tasks.total - project.tasks.completed} remaining</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-brand-text-dark">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {activity.type === "task" && <CheckCircle className="h-4 w-4 text-green-500" />}
                      {activity.type === "meeting" && <Calendar className="h-4 w-4 text-brand-orange" />}
                      {activity.type === "document" && <FileText className="h-4 w-4 text-blue-500" />}
                      {activity.type === "budget" && <DollarSign className="h-4 w-4 text-purple-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-brand-text-dark">{activity.message}</p>
                      <p className="text-xs text-brand-text-light">{activity.user} • {activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-brand-text-dark">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start bg-brand-orange hover:bg-brand-orange-hover text-white" variant="default">
                <FileText className="h-4 w-4 mr-2" />
                Create New Project
              </Button>
              <Button className="w-full justify-start text-brand-orange border-brand-orange hover:bg-brand-orange-light" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Meeting
              </Button>
              <Button className="w-full justify-start text-brand-orange border-brand-orange hover:bg-brand-orange-light" variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Invite Team Member
              </Button>
              <Button className="w-full justify-start text-brand-orange border-brand-orange hover:bg-brand-orange-light" variant="outline">
                <Clock className="h-4 w-4 mr-2" />
                View All Tasks
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-orange-500" />
                <span className="text-brand-text-dark">Alerts</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-800 font-medium">Budget exceeded on Tower A project</p>
                  <p className="text-xs text-red-600">Review required</p>
                </div>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <p className="text-sm text-yellow-800 font-medium">3 permits expiring this month</p>
                  <p className="text-xs text-yellow-600">Action needed</p>
                </div>
                <div className="p-3 bg-brand-orange-light border border-orange-200 rounded-md">
                  <p className="text-sm text-brand-orange font-medium">Weather delay possible next week</p>
                  <p className="text-xs text-orange-600">Monitor forecast</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}