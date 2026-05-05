import { useState, useEffect } from "react"
import { 
  Home, 
  FolderOpen, 
  CheckSquare, 
  Calendar, 
  Users, 
  FileText, 
  DollarSign, 
  BarChart3, 
  MessageSquare, 
  Camera, 
  Shield, 
  Settings,
  X,
  ChevronDown,
  ChevronRight,
  CalendarDays,
  ClipboardList,
  ListChecks,
  FilePen,
  ClipboardCheck,
  Wrench,
  FolderKanban
} from "lucide-react"
import { Button } from "./ui/button"

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  isOpen: boolean
  onClose: () => void
}

const PROJECT_MGMT_TABS = ["projects", "tasks", "scheduling", "daily-logs", "punch-lists", "change-orders", "inspections", "work-orders"]

export function Sidebar({ activeTab, onTabChange, isOpen, onClose }: SidebarProps) {
  const [projectMgmtOpen, setProjectMgmtOpen] = useState(PROJECT_MGMT_TABS.includes(activeTab))

  useEffect(() => {
    if (PROJECT_MGMT_TABS.includes(activeTab)) {
      setProjectMgmtOpen(true)
    }
  }, [activeTab])

  const topNavItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
  ]

  const projectMgmtItems = [
    { id: "projects", label: "Projects", sublabel: "List / Kanban / Gantt", icon: FolderKanban },
    { id: "tasks", label: "Task Management", icon: CheckSquare },
    { id: "scheduling", label: "Scheduling", icon: CalendarDays },
    { id: "daily-logs", label: "Daily Logs", icon: ClipboardList },
    { id: "punch-lists", label: "Punch Lists", icon: ListChecks },
    { id: "change-orders", label: "Change Orders", icon: FilePen },
    { id: "inspections", label: "Inspections", icon: ClipboardCheck },
    { id: "work-orders", label: "Work Orders", icon: Wrench },
  ]

  const bottomNavItems = [
    { id: "meetings", label: "Meetings", icon: Calendar },
    { id: "team", label: "Team", icon: Users },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "budget", label: "Budget", icon: DollarSign },
    { id: "reports", label: "Reports", icon: BarChart3 },
    { id: "communication", label: "Communication", icon: MessageSquare },
    { id: "photos", label: "Photos", icon: Camera },
    { id: "safety", label: "Safety", icon: Shield },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const handleNavClick = (id: string) => {
    onTabChange(id)
    onClose()
  }

  const isProjectMgmtActive = PROJECT_MGMT_TABS.includes(activeTab)

  const NavButton = ({ item }: { item: { id: string; label: string; icon: any; sublabel?: string } }) => {
    const Icon = item.icon
    const isActive = activeTab === item.id
    return (
      <Button
        variant="ghost"
        className={`w-full justify-start text-left px-3 transition-all duration-150 h-auto py-2 ${
          isActive
            ? "bg-brand-orange-light text-brand-orange font-medium border-r-2 border-brand-orange shadow-sm"
            : "text-brand-text-light hover:bg-brand-orange-light hover:text-brand-orange"
        }`}
        onClick={() => handleNavClick(item.id)}
      >
        <Icon className={`h-4 w-4 mr-3 flex-shrink-0 ${isActive ? "text-brand-orange" : "text-brand-text-light"}`} />
        <span className="flex flex-col items-start min-w-0">
          <span className="text-sm leading-tight">{item.label}</span>
          {item.sublabel && <span className="text-xs text-brand-text-light font-normal leading-tight mt-0.5">{item.sublabel}</span>}
        </span>
      </Button>
    )
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-border flex flex-col shadow-sm
          transform transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0 lg:z-auto lg:flex-shrink-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo Section */}
        <div className="p-5 border-b border-border flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-brand-orange rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
              <span className="text-white font-bold text-base">I</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-brand-text-dark leading-tight">INCODM</h1>
              <p className="text-xs text-brand-text-light leading-tight">Construction Management</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-brand-text-light hover:bg-brand-orange-light p-1"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {/* Dashboard */}
          {topNavItems.map(item => <NavButton key={item.id} item={item} />)}

          {/* Project Management Group */}
          <div className="pt-1">
            {/* Group header */}
            <button
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-semibold transition-all duration-150 ${
                isProjectMgmtActive
                  ? "bg-brand-orange text-white"
                  : "text-brand-text-dark hover:bg-brand-orange-light hover:text-brand-orange"
              }`}
              onClick={() => setProjectMgmtOpen(o => !o)}
            >
              <div className="flex items-center gap-2">
                <FolderOpen className="h-4 w-4 flex-shrink-0" />
                <span>Project Management</span>
              </div>
              {projectMgmtOpen
                ? <ChevronDown className="h-4 w-4 flex-shrink-0" />
                : <ChevronRight className="h-4 w-4 flex-shrink-0" />
              }
            </button>

            {/* Sub-items */}
            {projectMgmtOpen && (
              <div className="mt-1 ml-3 pl-3 border-l-2 border-brand-orange/20 space-y-0.5">
                {projectMgmtItems.map(item => {
                  const Icon = item.icon
                  const isActive = activeTab === item.id
                  return (
                    <Button
                      key={item.id}
                      variant="ghost"
                      className={`w-full justify-start text-left px-2.5 transition-all duration-150 h-auto py-2 ${
                        isActive
                          ? "bg-brand-orange-light text-brand-orange font-medium border-r-2 border-brand-orange"
                          : "text-brand-text-light hover:bg-brand-orange-light hover:text-brand-orange"
                      }`}
                      onClick={() => handleNavClick(item.id)}
                    >
                      <Icon className={`h-3.5 w-3.5 mr-2.5 flex-shrink-0 ${isActive ? "text-brand-orange" : "text-brand-text-light"}`} />
                      <span className="flex flex-col items-start min-w-0">
                        <span className="text-sm leading-tight">{item.label}</span>
                        {item.sublabel && (
                          <span className={`text-xs font-normal leading-tight mt-0.5 ${isActive ? "text-brand-orange/70" : "text-brand-text-light"}`}>
                            {item.sublabel}
                          </span>
                        )}
                      </span>
                    </Button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="pt-1 pb-1">
            <div className="border-t border-border" />
          </div>

          {/* Bottom nav items */}
          {bottomNavItems.map(item => <NavButton key={item.id} item={item} />)}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-border flex-shrink-0">
          <div className="bg-brand-orange-light rounded-lg p-3">
            <h4 className="font-medium text-sm text-brand-text-dark mb-1">Need Help?</h4>
            <p className="text-xs text-brand-text-light mb-2">
              Contact our support team for assistance.
            </p>
            <Button 
              size="sm" 
              className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white text-xs"
            >
              Get Support
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}
