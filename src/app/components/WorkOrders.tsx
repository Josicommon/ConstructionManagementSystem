import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Input } from "./ui/input"
import { Plus, Search, Wrench, Clock, CheckCircle, AlertTriangle, User, Calendar } from "lucide-react"

const workOrders = [
  { id: 1, number: "WO-001", project: "Downtown Office Complex", title: "Repair Water Intrusion – Level 5 East Wall", description: "Investigate and repair water intrusion observed at east perimeter wall near window assembly at gridline C-8. Assess source, perform remediation, and restore finishes.", category: "Waterproofing", assignedTo: "Summit Roofing LLC", assignedBy: "Tom Wilson", priority: "critical", status: "in-progress", createdDate: "2026-05-01", dueDate: "2026-05-06", estimatedHours: 24, actualHours: 14, laborCost: 3200, materialCost: 850 },
  { id: 2, number: "WO-002", project: "Downtown Office Complex", title: "Replace Defective HVAC Actuator – AHU-7", description: "AHU-7 supply damper actuator failed during TAB process. Order and replace with specified unit. Rebalance associated zones after replacement.", category: "Mechanical", assignedTo: "Metro Mechanical Inc.", assignedBy: "Tom Wilson", priority: "high", status: "open", createdDate: "2026-05-03", dueDate: "2026-05-09", estimatedHours: 8, actualHours: 0, laborCost: 960, materialCost: 425 },
  { id: 3, number: "WO-003", project: "Residential Tower A", title: "Fix Elevator 2 Door Sensor Malfunction", description: "Elevator 2 door re-opens randomly mid-cycle. Elevator contractor to inspect, adjust or replace door sensor. Service call required within 24 hours.", category: "Vertical Transport", assignedTo: "Kone Elevators", assignedBy: "David Rodriguez", priority: "critical", status: "completed", createdDate: "2026-04-30", dueDate: "2026-05-01", estimatedHours: 4, actualHours: 3, laborCost: 720, materialCost: 180 },
  { id: 4, number: "WO-004", project: "Residential Tower A", title: "Patch and Paint Drywall – Units 904, 912", description: "Drywall damage in closets of units 904 and 912 from plumbing rough-in access. Patch holes, tape, texture, and paint to match existing.", category: "Finishes", assignedTo: "ABC Painting Co.", assignedBy: "Emily White", priority: "medium", status: "open", createdDate: "2026-05-02", dueDate: "2026-05-12", estimatedHours: 12, actualHours: 0, laborCost: 1440, materialCost: 320 },
  { id: 5, number: "WO-005", project: "Shopping Center Renovation", title: "Restore Power to Bay 6 – Tripped GFCI", description: "Loss of power in tenant Bay 6. Electrician to identify tripped GFCI breaker, test circuit, restore power, and identify root cause.", category: "Electrical", assignedTo: "Apex Electric LLC", assignedBy: "Robert Taylor", priority: "high", status: "completed", createdDate: "2026-05-03", dueDate: "2026-05-04", estimatedHours: 3, actualHours: 2, laborCost: 360, materialCost: 45 },
  { id: 6, number: "WO-006", project: "Shopping Center Renovation", title: "Adjust Storefront Door Hardware – South Entry", description: "South main entry storefront door closer is too fast; door slamming. Adjust closer hydraulic pressure and backcheck per spec.", category: "Doors & Hardware", assignedTo: "Premier Millwork", assignedBy: "Robert Taylor", priority: "low", status: "open", createdDate: "2026-05-04", dueDate: "2026-05-14", estimatedHours: 2, actualHours: 0, laborCost: 240, materialCost: 0 },
]

const priorityStyle = (p: string) => {
  if (p === "critical") return "bg-red-100 text-red-800"
  if (p === "high") return "bg-orange-100 text-orange-800"
  if (p === "medium") return "bg-yellow-100 text-yellow-800"
  return "bg-gray-100 text-gray-700"
}

const statusStyle = (s: string) => {
  if (s === "completed") return "bg-green-100 text-green-800"
  if (s === "in-progress") return "bg-blue-100 text-blue-800"
  if (s === "open") return "bg-yellow-100 text-yellow-800"
  return "bg-gray-100 text-gray-700"
}

const StatusIcon = ({ s }: { s: string }) => {
  if (s === "completed") return <CheckCircle className="h-4 w-4 text-green-500" />
  if (s === "in-progress") return <Clock className="h-4 w-4 text-blue-500" />
  return <AlertTriangle className="h-4 w-4 text-yellow-500" />
}

const formatCurrency = (n: number) => `$${n.toLocaleString()}`

export function WorkOrders() {
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")

  const filtered = workOrders.filter(wo => {
    const matchSearch = wo.title.toLowerCase().includes(search.toLowerCase()) ||
      wo.number.toLowerCase().includes(search.toLowerCase()) ||
      wo.project.toLowerCase().includes(search.toLowerCase()) ||
      wo.category.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === "all" || wo.status === filterStatus
    const matchPriority = filterPriority === "all" || wo.priority === filterPriority
    return matchSearch && matchStatus && matchPriority
  })

  const stats = {
    open: workOrders.filter(w => w.status === "open").length,
    inProgress: workOrders.filter(w => w.status === "in-progress").length,
    completed: workOrders.filter(w => w.status === "completed").length,
    critical: workOrders.filter(w => w.priority === "critical").length,
  }

  const totalLaborCost = workOrders.reduce((s, w) => s + w.laborCost, 0)
  const totalMaterialCost = workOrders.reduce((s, w) => s + w.materialCost, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-brand-text-dark">Work Orders</h2>
          <p className="text-sm text-brand-text-light mt-0.5">Field work requests, repairs, and corrective actions</p>
        </div>
        <Button className="bg-brand-orange hover:bg-brand-orange-hover text-white self-start sm:self-auto">
          <Plus className="h-4 w-4 mr-2" />
          New Work Order
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div><p className="text-2xl font-semibold text-brand-text-dark">{stats.open}</p><p className="text-xs text-brand-text-light mt-1">Open</p></div>
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div><p className="text-2xl font-semibold text-brand-text-dark">{stats.inProgress}</p><p className="text-xs text-brand-text-light mt-1">In Progress</p></div>
              <Wrench className="h-5 w-5 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div><p className="text-2xl font-semibold text-brand-text-dark">{stats.completed}</p><p className="text-xs text-brand-text-light mt-1">Completed</p></div>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div><p className="text-2xl font-semibold text-brand-text-dark">{stats.critical}</p><p className="text-xs text-brand-text-light mt-1">Critical Priority</p></div>
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cost summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-brand-text-light">Total Labor Cost</p>
            <p className="text-xl font-semibold text-brand-text-dark mt-1">{formatCurrency(totalLaborCost)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-brand-text-light">Total Material Cost</p>
            <p className="text-xl font-semibold text-brand-text-dark mt-1">{formatCurrency(totalMaterialCost)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-brand-text-light">Total WO Cost</p>
            <p className="text-xl font-semibold text-brand-orange mt-1">{formatCurrency(totalLaborCost + totalMaterialCost)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-text-light" />
          <Input placeholder="Search work orders..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 bg-gray-50 border-gray-200 w-60 focus:border-brand-orange" />
        </div>
        <div className="flex flex-wrap gap-2">
          {["all","open","in-progress","completed"].map(s => (
            <Button key={s} size="sm" variant={filterStatus === s ? "default" : "outline"}
              onClick={() => setFilterStatus(s)}
              className={filterStatus === s ? "bg-brand-orange hover:bg-brand-orange-hover text-white" : "text-brand-text-light border-gray-200 hover:bg-brand-orange-light hover:text-brand-orange"}
            >
              {s === "all" ? "All" : s === "in-progress" ? "In Progress" : s.charAt(0).toUpperCase() + s.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Work order cards */}
      <div className="space-y-4">
        {filtered.map(wo => (
          <Card key={wo.id} className={`hover:shadow-md transition-shadow ${wo.priority === "critical" ? "border-l-4 border-l-red-500" : ""}`}>
            <CardContent className="p-5">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <StatusIcon s={wo.status} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-mono text-xs text-brand-orange font-medium">{wo.number}</span>
                      <Badge className={priorityStyle(wo.priority)} variant="secondary">{wo.priority.charAt(0).toUpperCase() + wo.priority.slice(1)}</Badge>
                      <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs">{wo.category}</Badge>
                    </div>
                    <h4 className="font-semibold text-brand-text-dark">{wo.title}</h4>
                    <p className="text-sm text-brand-text-light mt-1 line-clamp-2">{wo.description}</p>
                    <div className="flex flex-wrap gap-4 mt-2 text-xs text-brand-text-light">
                      <span className="flex items-center gap-1"><User className="h-3 w-3" />{wo.assignedTo}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />Due {new Date(wo.dueDate).toLocaleDateString("en-US",{month:"short",day:"numeric"})}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{wo.actualHours}/{wo.estimatedHours}h</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-2 flex-shrink-0">
                  <Badge className={statusStyle(wo.status)} variant="secondary">
                    {wo.status === "in-progress" ? "In Progress" : wo.status.charAt(0).toUpperCase() + wo.status.slice(1)}
                  </Badge>
                  <div className="text-right">
                    <p className="text-xs text-brand-text-light">Est. Cost</p>
                    <p className="text-sm font-semibold text-brand-text-dark">{formatCurrency(wo.laborCost + wo.materialCost)}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4 pt-3 border-t border-border">
                <Button size="sm" variant="outline" className="text-brand-orange border-brand-orange hover:bg-brand-orange-light text-xs">View Details</Button>
                {wo.status === "open" && <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs">Start Work</Button>}
                {wo.status === "in-progress" && <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white text-xs">Mark Complete</Button>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
