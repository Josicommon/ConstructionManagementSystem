import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Progress } from "./ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { 
  Plus, 
  Filter,
  SortDesc,
  MoreHorizontal,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye
} from "lucide-react"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Avatar, AvatarFallback } from "./ui/avatar"

interface ProjectsProps {
  user: {
    id: string
    name: string
    email: string
    role: string
  }
  onProjectSelect?: (project: any) => void
}

export function Projects({ user, onProjectSelect }: ProjectsProps) {
  const projects = [
    {
      id: 1,
      name: "Downtown Office Complex",
      description: "A 25-story mixed-use development in the heart of downtown",
      status: "In Progress",
      priority: "High",
      progress: 65,
      budget: 2400000,
      spent: 1560000,
      startDate: "2024-08-15",
      endDate: "2025-12-15",
      location: "Downtown District, City Center",
      manager: "Sarah Johnson",
      team: [
        { name: "Mike Chen", role: "Architect", avatar: "MC" },
        { name: "Lisa Davis", role: "Engineer", avatar: "LD" },
        { name: "Tom Wilson", role: "Contractor", avatar: "TW" },
        { name: "Anna Brown", role: "Safety Officer", avatar: "AB" },
      ],
      tasks: { total: 89, completed: 58, inProgress: 23, pending: 8 },
      recentActivity: "Foundation inspection completed",
      issues: 2,
      lastUpdate: "2 hours ago"
    },
    {
      id: 2,
      name: "Residential Tower A",
      description: "Luxury residential tower with 40 floors and amenities",
      status: "Behind Schedule",
      priority: "High",
      progress: 32,
      budget: 3800000,
      spent: 1210000,
      startDate: "2024-10-01",
      endDate: "2026-03-20",
      location: "Riverfront District",
      manager: "David Rodriguez",
      team: [
        { name: "Emily White", role: "Architect", avatar: "EW" },
        { name: "James Lee", role: "Engineer", avatar: "JL" },
        { name: "Maria Garcia", role: "Contractor", avatar: "MG" },
      ],
      tasks: { total: 95, completed: 30, inProgress: 35, pending: 30 },
      recentActivity: "Budget review required",
      issues: 5,
      lastUpdate: "4 hours ago"
    },
    {
      id: 3,
      name: "Shopping Center Renovation",
      description: "Complete renovation of existing 3-story shopping center",
      status: "Ahead of Schedule",
      priority: "Medium",
      progress: 89,
      budget: 1200000,
      spent: 1070000,
      startDate: "2024-06-01",
      endDate: "2025-08-30",
      location: "Suburban Mall District",
      manager: "Jennifer Kim",
      team: [
        { name: "Robert Taylor", role: "Architect", avatar: "RT" },
        { name: "Susan Miller", role: "Interior Designer", avatar: "SM" },
        { name: "Alex Chen", role: "Contractor", avatar: "AC" },
      ],
      tasks: { total: 67, completed: 60, inProgress: 5, pending: 2 },
      recentActivity: "Final inspections scheduled",
      issues: 0,
      lastUpdate: "1 day ago"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress": return "bg-blue-100 text-blue-800"
      case "Behind Schedule": return "bg-red-100 text-red-800"
      case "Ahead of Schedule": return "bg-green-100 text-green-800"
      case "Completed": return "bg-gray-100 text-gray-800"
      default: return "bg-yellow-100 text-yellow-800"
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

  const handleProjectView = (project: any) => {
    if (onProjectSelect) {
      onProjectSelect(project)
    }
  }

  return (
    <div className="space-y-6">
      {/* User Context Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Projects Overview</h2>
            <p className="text-sm text-gray-600">Managing projects as {formatRole(user.role)}</p>
          </div>
          <div className="sm:text-right">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <Button className="bg-brand-orange hover:bg-brand-orange-hover text-white">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
          <Button variant="outline" className="text-brand-text-light border-gray-200 hover:bg-brand-orange-light hover:text-brand-orange">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" className="text-brand-text-light border-gray-200 hover:bg-brand-orange-light hover:text-brand-orange">
            <SortDesc className="h-4 w-4 mr-2" />
            Sort
          </Button>
        </div>
        <div className="text-sm text-brand-text-light">
          <span>{projects.length} projects</span>
          <span className="mx-2">·</span>
          <span>Total Budget: {formatCurrency(projects.reduce((sum, p) => sum + p.budget, 0))}</span>
        </div>
      </div>

      <Tabs defaultValue="list" className="space-y-6">
        <TabsList className="bg-gray-100">
          <TabsTrigger value="list" className="data-[state=active]:bg-brand-orange data-[state=active]:text-white">List</TabsTrigger>
          <TabsTrigger value="kanban" className="data-[state=active]:bg-brand-orange data-[state=active]:text-white">Kanban</TabsTrigger>
          <TabsTrigger value="gantt" className="data-[state=active]:bg-brand-orange data-[state=active]:text-white">Gantt</TabsTrigger>
        </TabsList>

        {/* LIST VIEW */}
        <TabsContent value="list">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b bg-gray-50">
                    <tr>
                      <th className="text-left p-4 text-sm font-medium text-brand-text-dark">Project</th>
                      <th className="text-left p-4 text-sm font-medium text-brand-text-dark">Status</th>
                      <th className="text-left p-4 text-sm font-medium text-brand-text-dark">Progress</th>
                      <th className="text-left p-4 text-sm font-medium text-brand-text-dark">Budget</th>
                      <th className="text-left p-4 text-sm font-medium text-brand-text-dark">Timeline</th>
                      <th className="text-left p-4 text-sm font-medium text-brand-text-dark">Team</th>
                      <th className="text-left p-4 text-sm font-medium text-brand-text-dark">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((project) => (
                      <tr key={project.id} className="border-b hover:bg-brand-orange-light transition-colors">
                        <td className="p-4">
                          <div>
                            <p className="font-medium text-brand-text-dark">{project.name}</p>
                            <p className="text-sm text-brand-text-light">{project.location}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                        </td>
                        <td className="p-4">
                          <div className="space-y-1">
                            <span className="text-sm text-brand-text-dark">{project.progress}%</span>
                            <Progress value={project.progress} className="h-2 w-24" />
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="font-medium text-brand-text-dark">{formatCurrency(project.budget)}</p>
                          <p className="text-sm text-brand-text-light">{formatCurrency(project.spent)} spent</p>
                        </td>
                        <td className="p-4">
                          <p className="text-sm text-brand-text-dark">{new Date(project.endDate).toLocaleDateString()}</p>
                          <p className="text-xs text-brand-text-light">Due date</p>
                        </td>
                        <td className="p-4">
                          <div className="flex -space-x-1">
                            {project.team.slice(0, 3).map((member, index) => (
                              <Avatar key={index} className="h-6 w-6 border border-white">
                                <AvatarFallback className="text-xs bg-brand-orange text-white">{member.avatar}</AvatarFallback>
                              </Avatar>
                            ))}
                            {project.team.length > 3 && (
                              <div className="h-6 w-6 rounded-full bg-gray-100 border border-white flex items-center justify-center">
                                <span className="text-xs text-gray-600">+{project.team.length - 3}</span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" onClick={() => handleProjectView(project)} className="text-brand-orange hover:bg-brand-orange-light">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="text-brand-text-light hover:bg-brand-orange-light">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleProjectView(project)}>
                                  <Eye className="h-4 w-4 mr-2" />View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
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

        {/* KANBAN VIEW */}
        <TabsContent value="kanban">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { col: "Planning", color: "bg-yellow-500", textColor: "text-yellow-700", bg: "bg-yellow-50 border-yellow-200" },
              { col: "In Progress", color: "bg-blue-500", textColor: "text-blue-700", bg: "bg-blue-50 border-blue-200" },
              { col: "Behind Schedule", color: "bg-red-500", textColor: "text-red-700", bg: "bg-red-50 border-red-200" },
              { col: "Ahead of Schedule", color: "bg-green-500", textColor: "text-green-700", bg: "bg-green-50 border-green-200" },
            ].map(({ col, color, textColor, bg }) => {
              const colProjects = col === "In Progress"
                ? projects.filter(p => p.status === "In Progress")
                : col === "Behind Schedule"
                ? projects.filter(p => p.status === "Behind Schedule")
                : col === "Ahead of Schedule"
                ? projects.filter(p => p.status === "Ahead of Schedule")
                : []
              return (
                <div key={col} className="space-y-3">
                  <div className={`flex items-center justify-between p-3 rounded-lg border ${bg}`}>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${color}`} />
                      <span className={`text-sm font-semibold ${textColor}`}>{col}</span>
                    </div>
                    <Badge variant="secondary" className="bg-white text-gray-600">{colProjects.length}</Badge>
                  </div>
                  <div className="space-y-3 min-h-[200px]">
                    {colProjects.map(project => (
                      <Card key={project.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleProjectView(project)}>
                        <CardContent className="p-4 space-y-3">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-medium text-brand-text-dark text-sm leading-tight">{project.name}</h4>
                            <Badge variant="outline" className={getPriorityColor(project.priority) + " text-xs flex-shrink-0"}>{project.priority}</Badge>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs text-brand-text-light">
                              <span>Progress</span><span>{project.progress}%</span>
                            </div>
                            <Progress value={project.progress} className="h-1.5" />
                          </div>
                          <div className="flex items-center justify-between text-xs text-brand-text-light">
                            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{project.location.split(",")[0]}</span>
                            <span className="flex items-center gap-1"><Users className="h-3 w-3" />{project.team.length}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-brand-text-light">Budget: {formatCurrency(project.budget)}</span>
                            {project.issues > 0 && <span className="text-red-600 flex items-center gap-1"><AlertTriangle className="h-3 w-3" />{project.issues}</span>}
                          </div>
                          <div className="flex -space-x-1 pt-1">
                            {project.team.slice(0, 4).map((member, i) => (
                              <Avatar key={i} className="h-6 w-6 border-2 border-white">
                                <AvatarFallback className="text-xs bg-brand-orange text-white">{member.avatar}</AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    {colProjects.length === 0 && (
                      <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                        <p className="text-xs text-brand-text-light">No projects</p>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </TabsContent>

        {/* GANTT VIEW */}
        <TabsContent value="gantt">
          <Card>
            <CardHeader>
              <CardTitle className="text-brand-text-dark">Project Gantt Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                {/* Months header */}
                <div className="min-w-[700px]">
                  <div className="flex mb-4">
                    <div className="w-48 flex-shrink-0" />
                    <div className="flex-1 grid grid-cols-12 gap-0">
                      {["Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May","Jun","Jul"].map(m => (
                        <div key={m} className="text-center text-xs font-medium text-brand-text-light py-1 border-l border-gray-200">{m}</div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    {projects.map(project => {
                      const start = new Date(project.startDate)
                      const end = new Date(project.endDate)
                      const chartStart = new Date("2024-08-01")
                      const chartEnd = new Date("2025-07-31")
                      const totalDays = (chartEnd.getTime() - chartStart.getTime()) / (1000 * 60 * 60 * 24)
                      const startOffset = Math.max(0, (start.getTime() - chartStart.getTime()) / (1000 * 60 * 60 * 24))
                      const duration = Math.min(totalDays - startOffset, (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
                      const leftPct = (startOffset / totalDays) * 100
                      const widthPct = Math.max(5, (duration / totalDays) * 100)
                      const barColor = project.status === "Behind Schedule" ? "bg-red-400" : project.status === "Ahead of Schedule" ? "bg-green-400" : "bg-brand-orange"

                      return (
                        <div key={project.id} className="flex items-center gap-0">
                          <div className="w-48 flex-shrink-0 pr-3">
                            <p className="text-sm font-medium text-brand-text-dark truncate">{project.name}</p>
                            <div className="flex items-center gap-1 mt-0.5">
                              <Badge className={getStatusColor(project.status) + " text-xs py-0"} variant="secondary">{project.progress}%</Badge>
                            </div>
                          </div>
                          <div className="flex-1 relative h-8 bg-gray-100 rounded border border-gray-200">
                            <div
                              className={`absolute h-full rounded ${barColor} opacity-80 flex items-center px-2`}
                              style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                            >
                              <span className="text-xs text-white font-medium truncate">{project.name.split(" ")[0]}</span>
                            </div>
                            {/* Progress indicator */}
                            <div
                              className={`absolute h-full rounded ${barColor} opacity-100`}
                              style={{ left: `${leftPct}%`, width: `${widthPct * project.progress / 100}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div className="flex mt-4 pt-3 border-t gap-4">
                    <span className="flex items-center gap-1 text-xs text-brand-text-light"><span className="w-3 h-3 rounded bg-brand-orange" />In Progress</span>
                    <span className="flex items-center gap-1 text-xs text-brand-text-light"><span className="w-3 h-3 rounded bg-red-400" />Behind</span>
                    <span className="flex items-center gap-1 text-xs text-brand-text-light"><span className="w-3 h-3 rounded bg-green-400" />Ahead</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}