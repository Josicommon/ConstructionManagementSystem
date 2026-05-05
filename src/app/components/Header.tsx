import { Bell, Search, User, ChevronDown, Plus, Menu } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Badge } from "./ui/badge"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

interface HeaderProps {
  activeTab: string
  user: {
    id: string
    name: string
    email: string
    role: string
  }
  onSignOut: () => void
  onMenuToggle: () => void
}

export function Header({ activeTab, user, onSignOut, onMenuToggle }: HeaderProps) {
  const getPageTitle = (tab: string) => {
    const titles: Record<string, string> = {
      dashboard: "Dashboard",
      projects: "Projects",
      "project-details": "Project Details",
      tasks: "Task Management",
      scheduling: "Scheduling",
      "daily-logs": "Daily Logs",
      "punch-lists": "Punch Lists",
      "change-orders": "Change Orders",
      inspections: "Inspections",
      "work-orders": "Work Orders",
      meetings: "Meetings",
      team: "Team Management",
      documents: "Documents",
      budget: "Budget & Finance",
      reports: "Reports",
      communication: "Communication",
      photos: "Photos",
      safety: "Safety & Quality",
      settings: "Settings"
    }
    return titles[tab] || "Dashboard"
  }

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
  }

  const formatRole = (role: string) => {
    return role
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
    <header className="bg-white border-b border-border px-4 lg:px-6 py-3 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        {/* Left: Hamburger + Title */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Hamburger - mobile only */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-brand-text-light hover:bg-brand-orange-light flex-shrink-0"
            onClick={onMenuToggle}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2 min-w-0">
            <h1 className="text-base lg:text-xl font-semibold text-brand-text-dark truncate">{getPageTitle(activeTab)}</h1>
            {activeTab === "dashboard" && (
              <Badge variant="outline" className="text-green-700 bg-green-50 border-green-200 hidden sm:inline-flex flex-shrink-0">
                All Systems Operational
              </Badge>
            )}
          </div>
        </div>
        
        {/* Right: Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Search - hidden on small screens */}
          <div className="relative hidden md:block w-64 lg:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-brand-text-light" />
            <Input
              placeholder="Search projects, tasks..."
              className="pl-10 bg-gray-50 border-gray-200 focus:border-brand-orange focus:ring-brand-orange"
            />
          </div>
          
          {/* Search icon - small screens only */}
          <Button variant="ghost" size="sm" className="md:hidden text-brand-text-light hover:bg-brand-orange-light">
            <Search className="h-5 w-5" />
          </Button>
          
          {/* Quick Add */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-brand-orange hover:bg-brand-orange-hover text-white shadow-sm hidden sm:flex">
                <Plus className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Add New</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="text-brand-text-dark hover:bg-brand-orange-light hover:text-brand-orange">
                Create Project
              </DropdownMenuItem>
              <DropdownMenuItem className="text-brand-text-dark hover:bg-brand-orange-light hover:text-brand-orange">
                Add Task
              </DropdownMenuItem>
              <DropdownMenuItem className="text-brand-text-dark hover:bg-brand-orange-light hover:text-brand-orange">
                Schedule Meeting
              </DropdownMenuItem>
              <DropdownMenuItem className="text-brand-text-dark hover:bg-brand-orange-light hover:text-brand-orange">
                Upload Document
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-brand-text-dark hover:bg-brand-orange-light hover:text-brand-orange">
                Invite Team Member
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative hover:bg-brand-orange-light">
                <Bell className="h-5 w-5 text-brand-text-light" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 text-xs bg-red-500 text-white flex items-center justify-center">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72 sm:w-80">
              <DropdownMenuLabel className="text-brand-text-dark">Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="space-y-2 p-2">
                <div className="p-2 hover:bg-brand-orange-light rounded cursor-pointer">
                  <p className="font-medium text-sm text-brand-text-dark">Budget Alert</p>
                  <p className="text-xs text-brand-text-light">Tower A project is 15% over budget</p>
                  <p className="text-xs text-gray-400">2 hours ago</p>
                </div>
                <div className="p-2 hover:bg-brand-orange-light rounded cursor-pointer">
                  <p className="font-medium text-sm text-brand-text-dark">Task Completed</p>
                  <p className="text-xs text-brand-text-light">Foundation inspection has been completed</p>
                  <p className="text-xs text-gray-400">4 hours ago</p>
                </div>
                <div className="p-2 hover:bg-brand-orange-light rounded cursor-pointer">
                  <p className="font-medium text-sm text-brand-text-dark">Meeting Reminder</p>
                  <p className="text-xs text-brand-text-light">Weekly standup in 30 minutes</p>
                  <p className="text-xs text-gray-400">6 hours ago</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center text-brand-orange hover:bg-brand-orange-light">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 hover:bg-brand-orange-light px-2">
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarFallback className="bg-brand-orange text-white font-medium text-xs">
                    {getUserInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left hidden lg:block">
                  <p className="text-sm font-medium text-brand-text-dark leading-tight">{user.name}</p>
                  <p className="text-xs text-brand-text-light leading-tight">{formatRole(user.role)}</p>
                </div>
                <ChevronDown className="h-4 w-4 text-brand-text-light hidden lg:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="text-brand-text-dark">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-brand-text-dark hover:bg-brand-orange-light hover:text-brand-orange">
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="text-brand-text-dark hover:bg-brand-orange-light hover:text-brand-orange">
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="text-brand-text-dark hover:bg-brand-orange-light hover:text-brand-orange">
                Help & Support
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 hover:bg-red-50" onClick={onSignOut}>
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}