import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Input } from "./ui/input"
import { Plus, Search, CheckCircle, Clock, AlertTriangle, XCircle } from "lucide-react"

const punchItems = [
  { id: 1, number: "PL-001", project: "Downtown Office Complex", location: "Floor 3 – Lobby", description: "Touch-up paint on east wall near elevator bank – visible scuff marks and roller overlap lines", trade: "Painting", assignedTo: "ABC Painting Co.", dueDate: "2026-05-10", priority: "low", status: "open", createdBy: "Sarah Johnson", createdDate: "2026-04-28" },
  { id: 2, number: "PL-002", project: "Downtown Office Complex", location: "Mechanical Room B2", description: "Pipe insulation missing on 3 sections of chilled water supply line. Install 1.5\" Armaflex per spec.", trade: "Mechanical", assignedTo: "Metro Mechanical Inc.", dueDate: "2026-05-07", priority: "high", status: "in-progress", createdBy: "Tom Wilson", createdDate: "2026-04-30" },
  { id: 3, number: "PL-003", project: "Downtown Office Complex", location: "Roof Level", description: "HVAC curb flashing not sealed per waterproofing spec. Re-flash with specified sealant.", trade: "Roofing", assignedTo: "Summit Roofing LLC", dueDate: "2026-05-05", priority: "critical", status: "open", createdBy: "Tom Wilson", createdDate: "2026-05-01" },
  { id: 4, number: "PL-004", project: "Residential Tower A", location: "Unit 1204", description: "Closet door does not close fully – binding at top corner. Adjust door hinge alignment.", trade: "Doors & Hardware", assignedTo: "Premier Millwork", dueDate: "2026-05-12", priority: "low", status: "complete", createdBy: "Emily White", createdDate: "2026-04-25" },
  { id: 5, number: "PL-005", project: "Residential Tower A", location: "Parking Level P1", description: "Concrete crack in driving aisle – 1/8\" wide × 22 ft. Route and seal per structural EOR direction.", trade: "Concrete", assignedTo: "Solid Concrete Co.", dueDate: "2026-05-08", priority: "high", status: "in-progress", createdBy: "James Lee", createdDate: "2026-04-29" },
  { id: 6, number: "PL-006", project: "Shopping Center Renovation", location: "Food Court", description: "Exhaust hood not functioning in Bay 4. Contractor to verify ductwork connection and balancing.", trade: "Mechanical", assignedTo: "Metro Mechanical Inc.", dueDate: "2026-05-06", priority: "critical", status: "open", createdBy: "Robert Taylor", createdDate: "2026-05-02" },
  { id: 7, number: "PL-007", project: "Shopping Center Renovation", location: "North Entrance", description: "Automatic door sensor misaligned – activates too late. Readjust sensor per manufacturer spec.", trade: "Doors & Hardware", assignedTo: "Premier Millwork", dueDate: "2026-05-09", priority: "medium", status: "complete", createdBy: "Robert Taylor", createdDate: "2026-04-27" },
]

const priorityStyle = (p: string) => {
  if (p === "critical") return "bg-red-100 text-red-800"
  if (p === "high") return "bg-orange-100 text-orange-800"
  if (p === "medium") return "bg-yellow-100 text-yellow-800"
  return "bg-gray-100 text-gray-700"
}

const statusStyle = (s: string) => {
  if (s === "complete") return "bg-green-100 text-green-800"
  if (s === "in-progress") return "bg-blue-100 text-blue-800"
  return "bg-red-100 text-red-800"
}

const StatusIcon = ({ status }: { status: string }) => {
  if (status === "complete") return <CheckCircle className="h-4 w-4 text-green-500" />
  if (status === "in-progress") return <Clock className="h-4 w-4 text-blue-500" />
  if (status === "open") return <AlertTriangle className="h-4 w-4 text-red-500" />
  return <XCircle className="h-4 w-4 text-gray-400" />
}

export function PunchLists() {
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterPriority, setFilterPriority] = useState<string>("all")

  const filtered = punchItems.filter(item => {
    const matchSearch = item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.project.toLowerCase().includes(search.toLowerCase()) ||
      item.number.toLowerCase().includes(search.toLowerCase()) ||
      item.trade.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === "all" || item.status === filterStatus
    const matchPriority = filterPriority === "all" || item.priority === filterPriority
    return matchSearch && matchStatus && matchPriority
  })

  const stats = {
    open: punchItems.filter(i => i.status === "open").length,
    inProgress: punchItems.filter(i => i.status === "in-progress").length,
    complete: punchItems.filter(i => i.status === "complete").length,
    critical: punchItems.filter(i => i.priority === "critical").length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-brand-text-dark">Punch Lists</h2>
          <p className="text-sm text-brand-text-light mt-0.5">Track and resolve pre-closeout deficiencies</p>
        </div>
        <Button className="bg-brand-orange hover:bg-brand-orange-hover text-white self-start sm:self-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add Punch Item
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-red-500 cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilterStatus("open")}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div><p className="text-2xl font-semibold text-brand-text-dark">{stats.open}</p><p className="text-xs text-brand-text-light mt-1">Open Items</p></div>
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500 cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilterStatus("in-progress")}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div><p className="text-2xl font-semibold text-brand-text-dark">{stats.inProgress}</p><p className="text-xs text-brand-text-light mt-1">In Progress</p></div>
              <Clock className="h-6 w-6 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500 cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilterStatus("complete")}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div><p className="text-2xl font-semibold text-brand-text-dark">{stats.complete}</p><p className="text-xs text-brand-text-light mt-1">Complete</p></div>
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-brand-orange cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilterPriority("critical")}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div><p className="text-2xl font-semibold text-brand-text-dark">{stats.critical}</p><p className="text-xs text-brand-text-light mt-1">Critical Priority</p></div>
              <AlertTriangle className="h-6 w-6 text-brand-orange" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-text-light" />
          <Input placeholder="Search punch items..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 bg-gray-50 border-gray-200 w-64 focus:border-brand-orange" />
        </div>
        <div className="flex gap-2">
          {["all","open","in-progress","complete"].map(s => (
            <Button key={s} size="sm" variant={filterStatus === s ? "default" : "outline"}
              onClick={() => setFilterStatus(s)}
              className={filterStatus === s ? "bg-brand-orange hover:bg-brand-orange-hover text-white" : "text-brand-text-light border-gray-200 hover:bg-brand-orange-light hover:text-brand-orange"}
            >
              {s === "all" ? "All" : s === "in-progress" ? "In Progress" : s.charAt(0).toUpperCase() + s.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-brand-text-dark">#</th>
                  <th className="text-left p-4 text-sm font-medium text-brand-text-dark">Description</th>
                  <th className="text-left p-4 text-sm font-medium text-brand-text-dark">Project / Location</th>
                  <th className="text-left p-4 text-sm font-medium text-brand-text-dark">Trade</th>
                  <th className="text-left p-4 text-sm font-medium text-brand-text-dark">Priority</th>
                  <th className="text-left p-4 text-sm font-medium text-brand-text-dark">Due</th>
                  <th className="text-left p-4 text-sm font-medium text-brand-text-dark">Status</th>
                  <th className="text-left p-4 text-sm font-medium text-brand-text-dark">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(item => (
                  <tr key={item.id} className="border-b hover:bg-brand-orange-light transition-colors">
                    <td className="p-4 text-sm font-mono text-brand-orange font-medium">{item.number}</td>
                    <td className="p-4 max-w-xs">
                      <p className="text-sm font-medium text-brand-text-dark line-clamp-2">{item.description}</p>
                      <p className="text-xs text-brand-text-light mt-0.5">Assigned: {item.assignedTo}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm text-brand-text-dark">{item.project}</p>
                      <p className="text-xs text-brand-text-light">{item.location}</p>
                    </td>
                    <td className="p-4 text-sm text-brand-text-light">{item.trade}</td>
                    <td className="p-4">
                      <Badge className={priorityStyle(item.priority)} variant="secondary">
                        {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm text-brand-text-dark">{new Date(item.dueDate).toLocaleDateString("en-US",{month:"short",day:"numeric"})}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5">
                        <StatusIcon status={item.status} />
                        <Badge className={statusStyle(item.status)} variant="secondary">
                          {item.status === "in-progress" ? "In Progress" : item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </Badge>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" className="text-brand-orange border-brand-orange hover:bg-brand-orange-light text-xs px-2">Edit</Button>
                        {item.status !== "complete" && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white text-xs px-2">Close</Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
