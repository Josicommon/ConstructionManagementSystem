import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Input } from "./ui/input"
import { Plus, Search, TrendingUp, TrendingDown, DollarSign, Clock, CheckCircle, XCircle } from "lucide-react"

const changeOrders = [
  { id: 1, number: "CO-001", project: "Downtown Office Complex", title: "Additional Structural Reinforcement – Level 12", description: "Owner requested additional shear wall reinforcement on level 12 due to design change for mechanical penthouse expansion.", initiatedBy: "Owner", submittedDate: "2026-04-20", approvedDate: "2026-04-28", costImpact: 85000, scheduleImpact: 5, status: "approved", reason: "Owner Change", priority: "high" },
  { id: 2, number: "CO-002", project: "Downtown Office Complex", title: "MEP Coordination Conflict Resolution – Floors 8-10", description: "Revise MEP routing on floors 8-10 due to coordination conflicts with structural beams discovered during BIM clash detection.", initiatedBy: "Contractor", submittedDate: "2026-04-25", approvedDate: null, costImpact: 42000, scheduleImpact: 3, status: "pending", reason: "Design Conflict", priority: "high" },
  { id: 3, number: "CO-003", project: "Residential Tower A", title: "Unit Upgrade Package – Premium Finishes", description: "Buyer-requested upgrade to premium flooring (LVT to hardwood) and countertops (laminate to quartz) in units 801-820.", initiatedBy: "Owner", submittedDate: "2026-04-15", approvedDate: "2026-04-22", costImpact: 156000, scheduleImpact: 0, status: "approved", reason: "Owner Change", priority: "medium" },
  { id: 4, number: "CO-004", project: "Residential Tower A", title: "Unforeseen Rock Excavation – P2 Level", description: "Encountered unforeseen bedrock at P2 level during excavation. Requires blasting and additional rock removal beyond contract scope.", initiatedBy: "Contractor", submittedDate: "2026-04-30", approvedDate: null, costImpact: 225000, scheduleImpact: 12, status: "under-review", reason: "Unforeseen Condition", priority: "critical" },
  { id: 5, number: "CO-005", project: "Shopping Center Renovation", title: "Hazardous Material Abatement – Asbestos Tile", description: "Discovery of asbestos floor tile beneath existing flooring in 3 tenant bays. Requires certified abatement before flooring installation.", initiatedBy: "Contractor", submittedDate: "2026-04-18", approvedDate: "2026-04-24", costImpact: 38500, scheduleImpact: 7, status: "approved", reason: "Unforeseen Condition", priority: "critical" },
  { id: 6, number: "CO-006", project: "Shopping Center Renovation", title: "Delete Decorative Façade Feature", description: "Owner decided to eliminate decorative metal screen element on north façade to reduce costs. Credit back to contract.", initiatedBy: "Owner", submittedDate: "2026-04-22", approvedDate: "2026-04-29", costImpact: -28000, scheduleImpact: -2, status: "approved", reason: "Value Engineering", priority: "low" },
]

const statusStyle = (s: string) => {
  if (s === "approved") return "bg-green-100 text-green-800"
  if (s === "pending") return "bg-yellow-100 text-yellow-800"
  if (s === "under-review") return "bg-blue-100 text-blue-800"
  if (s === "rejected") return "bg-red-100 text-red-800"
  return "bg-gray-100 text-gray-700"
}

const priorityStyle = (p: string) => {
  if (p === "critical") return "bg-red-100 text-red-800"
  if (p === "high") return "bg-orange-100 text-orange-800"
  if (p === "medium") return "bg-yellow-100 text-yellow-800"
  return "bg-gray-100 text-gray-700"
}

const formatCurrency = (amount: number) => {
  const abs = Math.abs(amount)
  const formatted = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(abs)
  return amount < 0 ? `-${formatted}` : `+${formatted}`
}

export function ChangeOrders() {
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filtered = changeOrders.filter(co => {
    const matchSearch = co.title.toLowerCase().includes(search.toLowerCase()) ||
      co.number.toLowerCase().includes(search.toLowerCase()) ||
      co.project.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === "all" || co.status === filterStatus
    return matchSearch && matchStatus
  })

  const totalApproved = changeOrders.filter(c => c.status === "approved").reduce((s, c) => s + c.costImpact, 0)
  const totalPending = changeOrders.filter(c => c.status !== "approved" && c.status !== "rejected").reduce((s, c) => s + c.costImpact, 0)
  const pendingCount = changeOrders.filter(c => c.status === "pending" || c.status === "under-review").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-brand-text-dark">Change Orders</h2>
          <p className="text-sm text-brand-text-light mt-0.5">Manage contract modifications and cost adjustments</p>
        </div>
        <Button className="bg-brand-orange hover:bg-brand-orange-hover text-white self-start sm:self-auto">
          <Plus className="h-4 w-4 mr-2" />
          New Change Order
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-brand-orange">
          <CardContent className="p-4">
            <p className="text-xs text-brand-text-light mb-1">Total Change Orders</p>
            <p className="text-2xl font-semibold text-brand-text-dark">{changeOrders.length}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <p className="text-xs text-brand-text-light mb-1">Pending Approval</p>
            <p className="text-2xl font-semibold text-brand-text-dark">{pendingCount}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <p className="text-xs text-brand-text-light mb-1">Approved Value</p>
            <p className={`text-xl font-semibold ${totalApproved >= 0 ? "text-green-600" : "text-red-600"}`}>
              {formatCurrency(totalApproved)}
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <p className="text-xs text-brand-text-light mb-1">Potential Exposure</p>
            <p className="text-xl font-semibold text-blue-600">{formatCurrency(totalPending)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-text-light" />
          <Input placeholder="Search change orders..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 bg-gray-50 border-gray-200 w-64 focus:border-brand-orange" />
        </div>
        <div className="flex flex-wrap gap-2">
          {["all","pending","under-review","approved","rejected"].map(s => (
            <Button key={s} size="sm" variant={filterStatus === s ? "default" : "outline"}
              onClick={() => setFilterStatus(s)}
              className={filterStatus === s ? "bg-brand-orange hover:bg-brand-orange-hover text-white" : "text-brand-text-light border-gray-200 hover:bg-brand-orange-light hover:text-brand-orange"}
            >
              {s === "all" ? "All" : s === "under-review" ? "Under Review" : s.charAt(0).toUpperCase() + s.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Change Order Cards */}
      <div className="space-y-4">
        {filtered.map(co => (
          <Card key={co.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-mono text-sm text-brand-orange font-medium">{co.number}</span>
                    <Badge className={priorityStyle(co.priority)} variant="secondary">{co.priority.charAt(0).toUpperCase() + co.priority.slice(1)}</Badge>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-600">{co.reason}</Badge>
                  </div>
                  <h4 className="font-semibold text-brand-text-dark">{co.title}</h4>
                  <p className="text-sm text-brand-text-light mt-1">{co.project}</p>
                  <p className="text-sm text-brand-text-light mt-2 line-clamp-2">{co.description}</p>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-2 flex-shrink-0">
                  <Badge className={statusStyle(co.status)} variant="secondary">
                    {co.status === "under-review" ? "Under Review" : co.status.charAt(0).toUpperCase() + co.status.slice(1)}
                  </Badge>
                  <div className={`flex items-center gap-1 font-semibold text-lg ${co.costImpact >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {co.costImpact >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    {formatCurrency(co.costImpact)}
                  </div>
                  <span className="text-xs text-brand-text-light">{co.scheduleImpact > 0 ? `+${co.scheduleImpact}` : co.scheduleImpact} days schedule impact</span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                <div className="flex items-center gap-4 text-xs text-brand-text-light">
                  <span>Submitted: {new Date(co.submittedDate).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}</span>
                  {co.approvedDate && <span>Approved: {new Date(co.approvedDate).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}</span>}
                  <span>By: {co.initiatedBy}</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="text-brand-orange border-brand-orange hover:bg-brand-orange-light text-xs">View</Button>
                  {(co.status === "pending" || co.status === "under-review") && (
                    <>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white text-xs">Approve</Button>
                      <Button size="sm" variant="outline" className="text-red-600 border-red-300 hover:bg-red-50 text-xs">Reject</Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
