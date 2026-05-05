import { useState, useEffect } from "react"
import { Sidebar } from "./components/Sidebar"
import { Header } from "./components/Header"
import { Dashboard } from "./components/Dashboard"
import { Projects } from "./components/Projects"
import { TasksSchedule } from "./components/TasksSchedule"
import { ProjectDetails } from "./components/ProjectDetails"
import { Scheduling } from "./components/Scheduling"
import { DailyLogs } from "./components/DailyLogs"
import { PunchLists } from "./components/PunchLists"
import { ChangeOrders } from "./components/ChangeOrders"
import { Inspections } from "./components/Inspections"
import { WorkOrders } from "./components/WorkOrders"
import { Auth } from "./components/Auth"
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card"
import { Button } from "./components/ui/button"
import { Badge } from "./components/ui/badge"
import { Calendar, Users, FileText, DollarSign, BarChart3, MessageSquare, Camera, Shield, Settings } from "lucide-react"

interface User {
  id: string
  email: string
  name: string
  role: string
}

export default function App() {
  const [user, setUser] = useState<User | null>(null)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('construction_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        localStorage.removeItem('construction_user')
      }
    }
    setLoading(false)
  }, [])

  const handleAuthSuccess = (userData: User) => {
    setUser(userData)
  }

  const handleSignOut = () => {
    localStorage.removeItem('construction_user')
    setUser(null)
    setActiveTab("dashboard")
    setSelectedProject(null)
  }

  const handleProjectSelect = (project: any) => {
    setSelectedProject(project)
    setActiveTab("project-details")
  }

  const handleBackToProjects = () => {
    setSelectedProject(null)
    setActiveTab("projects")
  }

  const handleProjectUpdate = (updatedProject: any) => {
    setSelectedProject(updatedProject)
    // Here you would typically update the project in your backend
    console.log("Project updated:", updatedProject)
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    setSidebarOpen(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-brand-orange rounded-lg flex items-center justify-center shadow-lg mx-auto mb-4">
            <span className="text-white font-bold text-2xl">I</span>
          </div>
          <h2 className="text-xl font-semibold text-brand-text-dark mb-2">INCODM</h2>
          <p className="text-brand-text-light">Loading Construction Management System...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Auth onAuthSuccess={handleAuthSuccess} />
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard user={user} onProjectSelect={handleProjectSelect} />
      case "projects":
        return <Projects user={user} onProjectSelect={handleProjectSelect} />
      case "project-details":
        return selectedProject ? (
          <ProjectDetails 
            project={selectedProject} 
            user={user} 
            onBack={handleBackToProjects}
            onProjectUpdate={handleProjectUpdate}
          />
        ) : (
          <Projects user={user} onProjectSelect={handleProjectSelect} />
        )
      case "tasks":
        return <TasksSchedule user={user} />
      case "scheduling":
        return <Scheduling />
      case "daily-logs":
        return <DailyLogs />
      case "punch-lists":
        return <PunchLists />
      case "change-orders":
        return <ChangeOrders />
      case "inspections":
        return <Inspections />
      case "work-orders":
        return <WorkOrders />
      case "meetings":
        return <MeetingsPlaceholder />
      case "team":
        return <TeamPlaceholder />
      case "documents":
        return <DocumentsPlaceholder />
      case "budget":
        return <BudgetPlaceholder />
      case "reports":
        return <ReportsPlaceholder />
      case "communication":
        return <CommunicationPlaceholder />
      case "photos":
        return <PhotosPlaceholder />
      case "safety":
        return <SafetyPlaceholder />
      case "settings":
        return <SettingsPlaceholder user={user} onSignOut={handleSignOut} />
      default:
        return <Dashboard user={user} onProjectSelect={handleProjectSelect} />
    }
  }

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Header 
          activeTab={activeTab} 
          user={user} 
          onSignOut={handleSignOut}
          onMenuToggle={() => setSidebarOpen(prev => !prev)}
        />
        
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

// Placeholder components for other sections
function MeetingsPlaceholder() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-brand-text-dark">Meetings</h2>
        <Button className="bg-brand-orange hover:bg-brand-orange-hover text-white">
          <Calendar className="h-4 w-4 mr-2" />
          Schedule Meeting
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-brand-orange" />
              <span className="text-brand-text-dark">Upcoming Meetings</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg hover:bg-brand-orange-light transition-colors">
                <h4 className="font-medium text-brand-text-dark">Weekly Project Standup</h4>
                <p className="text-sm text-brand-text-light">Today at 2:00 PM</p>
                <p className="text-xs text-brand-text-light">Downtown Office Complex Team</p>
              </div>
              <div className="p-3 border rounded-lg hover:bg-brand-orange-light transition-colors">
                <h4 className="font-medium text-brand-text-dark">Budget Review</h4>
                <p className="text-sm text-brand-text-light">Tomorrow at 10:00 AM</p>
                <p className="text-xs text-brand-text-light">All Project Managers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-brand-text-dark">Meeting Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start text-brand-orange border-brand-orange hover:bg-brand-orange-light">
                Daily Standup
              </Button>
              <Button variant="outline" className="w-full justify-start text-brand-orange border-brand-orange hover:bg-brand-orange-light">
                Project Review
              </Button>
              <Button variant="outline" className="w-full justify-start text-brand-orange border-brand-orange hover:bg-brand-orange-light">
                Safety Meeting
              </Button>
              <Button variant="outline" className="w-full justify-start text-brand-orange border-brand-orange hover:bg-brand-orange-light">
                Client Presentation
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-brand-text-dark">Meeting Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-brand-text-light">This Week</p>
                <p className="text-2xl font-semibold text-brand-text-dark">12 meetings</p>
              </div>
              <div>
                <p className="text-sm text-brand-text-light">Average Duration</p>
                <p className="text-2xl font-semibold text-brand-text-dark">45 min</p>
              </div>
              <div>
                <p className="text-sm text-brand-text-light">Attendance Rate</p>
                <p className="text-2xl font-semibold text-brand-text-dark">87%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function TeamPlaceholder() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-brand-text-dark">Team Management</h2>
        <Button className="bg-brand-orange hover:bg-brand-orange-hover text-white">
          <Users className="h-4 w-4 mr-2" />
          Invite Member
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-brand-text-dark">Team Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <p className="text-2xl font-semibold text-brand-text-dark">127</p>
              <p className="text-sm text-brand-text-light">Total Members</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-brand-text-dark">24</p>
              <p className="text-sm text-brand-text-light">Active Projects</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-brand-text-dark">8</p>
              <p className="text-sm text-brand-text-light">Departments</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-brand-text-dark">94%</p>
              <p className="text-sm text-brand-text-light">Utilization</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-brand-text-dark">Recent Activity</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-brand-orange-light transition-colors">
                <div>
                  <p className="font-medium text-brand-text-dark">John Smith joined Downtown Office Complex</p>
                  <p className="text-sm text-brand-text-light">2 hours ago</p>
                </div>
                <Badge className="bg-brand-orange text-white">New</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-brand-orange-light transition-colors">
                <div>
                  <p className="font-medium text-brand-text-dark">Team meeting scheduled for Tower A project</p>
                  <p className="text-sm text-brand-text-light">4 hours ago</p>
                </div>
                <Badge variant="outline" className="text-brand-orange border-brand-orange">Meeting</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function DocumentsPlaceholder() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-brand-text-dark">Documents</h2>
        <Button className="bg-brand-orange hover:bg-brand-orange-hover text-white">
          <FileText className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4 text-center">
            <FileText className="h-8 w-8 mx-auto mb-2 text-brand-orange" />
            <p className="font-medium text-brand-text-dark">Blueprints</p>
            <p className="text-sm text-brand-text-light">45 files</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4 text-center">
            <FileText className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <p className="font-medium text-brand-text-dark">Contracts</p>
            <p className="text-sm text-brand-text-light">28 files</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4 text-center">
            <FileText className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <p className="font-medium text-brand-text-dark">Reports</p>
            <p className="text-sm text-brand-text-light">67 files</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4 text-center">
            <FileText className="h-8 w-8 mx-auto mb-2 text-purple-500" />
            <p className="font-medium text-brand-text-dark">Permits</p>
            <p className="text-sm text-brand-text-light">12 files</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function BudgetPlaceholder() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-brand-text-dark">Budget &amp; Finance</h2>
        <Button className="bg-brand-orange hover:bg-brand-orange-hover text-white">
          <DollarSign className="h-4 w-4 mr-2" />
          Add Expense
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="text-brand-text-dark">Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-green-600">$8.7M</p>
            <p className="text-sm text-brand-text-light">Across all projects</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-brand-orange">
          <CardHeader>
            <CardTitle className="text-brand-text-dark">Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-brand-orange">$6.3M</p>
            <p className="text-sm text-brand-text-light">72% of total budget</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="text-brand-text-dark">Remaining</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-blue-600">$2.4M</p>
            <p className="text-sm text-brand-text-light">28% available</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ReportsPlaceholder() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-brand-text-dark">Reports &amp; Analytics</h2>
        <Button className="bg-brand-orange hover:bg-brand-orange-hover text-white">
          <BarChart3 className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-brand-text-dark">Project Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-brand-text-light border-2 border-dashed border-gray-200 rounded-lg">
              Chart placeholder - Project completion rates over time
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-brand-text-dark">Budget Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-brand-text-light border-2 border-dashed border-gray-200 rounded-lg">
              Chart placeholder - Budget vs actual spending
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function CommunicationPlaceholder() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-brand-text-dark">Communication</h2>
        <Button className="bg-brand-orange hover:bg-brand-orange-hover text-white">
          <MessageSquare className="h-4 w-4 mr-2" />
          New Message
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-brand-text-dark">Recent Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg hover:bg-brand-orange-light transition-colors">
                <p className="font-medium text-brand-text-dark">Site Update Required</p>
                <p className="text-sm text-brand-text-light">From: John Doe</p>
                <p className="text-xs text-gray-400">2 hours ago</p>
              </div>
              <div className="p-3 border rounded-lg hover:bg-brand-orange-light transition-colors">
                <p className="font-medium text-brand-text-dark">Budget Approval</p>
                <p className="text-sm text-brand-text-light">From: Sarah Johnson</p>
                <p className="text-xs text-gray-400">4 hours ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-brand-text-dark">Team Channels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="p-2 border rounded flex items-center justify-between hover:bg-brand-orange-light transition-colors">
                <span className="text-sm text-brand-text-dark">General</span>
                <Badge variant="secondary">5</Badge>
              </div>
              <div className="p-2 border rounded flex items-center justify-between hover:bg-brand-orange-light transition-colors">
                <span className="text-sm text-brand-text-dark">Downtown Office</span>
                <Badge variant="secondary">12</Badge>
              </div>
              <div className="p-2 border rounded flex items-center justify-between hover:bg-brand-orange-light transition-colors">
                <span className="text-sm text-brand-text-dark">Safety Updates</span>
                <Badge variant="destructive">3</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-brand-text-dark">Announcements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="font-medium text-blue-900">New Safety Protocol</p>
                <p className="text-sm text-blue-700">Please review the updated safety guidelines</p>
              </div>
              <div className="p-3 bg-brand-orange-light border border-orange-200 rounded-lg">
                <p className="font-medium text-brand-orange">Project Milestone</p>
                <p className="text-sm text-orange-700">Downtown Office 50% complete!</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function PhotosPlaceholder() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-brand-text-dark">Project Photos</h2>
        <Button className="bg-brand-orange hover:bg-brand-orange-hover text-white">
          <Camera className="h-4 w-4 mr-2" />
          Upload Photos
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Card key={i} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                <Camera className="h-8 w-8 text-brand-text-light" />
              </div>
              <p className="text-sm font-medium text-brand-text-dark">Construction Progress {i}</p>
              <p className="text-xs text-brand-text-light">Downtown Office - Floor {i}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function SafetyPlaceholder() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-brand-text-dark">Safety &amp; Quality</h2>
        <Button className="bg-brand-orange hover:bg-brand-orange-hover text-white">
          <Shield className="h-4 w-4 mr-2" />
          Report Incident
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="text-brand-text-dark">Safety Score</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-green-600">95%</p>
            <p className="text-sm text-brand-text-light">Above industry average</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-brand-orange">
          <CardHeader>
            <CardTitle className="text-brand-text-dark">Incidents This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-brand-orange">2</p>
            <p className="text-sm text-brand-text-light">Both minor incidents</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="text-brand-text-dark">Quality Checks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-blue-600">47</p>
            <p className="text-sm text-brand-text-light">Completed this week</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function SettingsPlaceholder({ user, onSignOut }: { user: User, onSignOut: () => void }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-brand-text-dark">Settings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-brand-text-dark">Account Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-brand-text-dark">Name</label>
                <p className="text-sm text-brand-text-light">{user.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-brand-text-dark">Email</label>
                <p className="text-sm text-brand-text-light">{user.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-brand-text-dark">Role</label>
                <p className="text-sm text-brand-text-light capitalize">{user.role.replace('_', ' ')}</p>
              </div>
              <Button variant="outline" onClick={onSignOut} className="text-red-600 border-red-600 hover:bg-red-50">
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-brand-text-dark">System Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-brand-text-dark">Time Zone</label>
                <p className="text-sm text-brand-text-light">UTC-5 (Eastern Time)</p>
              </div>
              <div>
                <label className="text-sm font-medium text-brand-text-dark">Date Format</label>
                <p className="text-sm text-brand-text-light">MM/DD/YYYY</p>
              </div>
              <div>
                <label className="text-sm font-medium text-brand-text-dark">Currency</label>
                <p className="text-sm text-brand-text-light">USD ($)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}