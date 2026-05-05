import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Input } from "./ui/input"
import { Plus, Search, CheckCircle, XCircle, Clock, ClipboardList, AlertTriangle } from "lucide-react"

const inspections = [
  { id: 1, number: "INS-001", project: "Downtown Office Complex", type: "Structural", description: "Foundation concrete pour inspection – floors B1 to Grade", inspector: "City Inspector J. Parks", contractor: "Solid Concrete Co.", scheduledDate: "2026-05-06", completedDate: null, result: null, status: "scheduled", location: "Foundation Level", notes: "", reinspectionRequired: false },
  { id: 2, number: "INS-002", project: "Downtown Office Complex", type: "Electrical", description: "Electrical rough-in inspection floors 1–3 prior to wall close-up", inspector: "ABC Inspection Services", contractor: "Apex Electric LLC", scheduledDate: "2026-05-04", completedDate: "2026-05-04", result: "passed", status: "passed", location: "Floors 1–3", notes: "All rough-in work inspected and approved. Minor label correction required on panel P-1A.", reinspectionRequired: false },
  { id: 3, number: "INS-003", project: "Downtown Office Complex", type: "Fire Suppression", description: "Sprinkler rough-in inspection for floors 4–7", inspector: "Fire Marshal Office", contractor: "FireGuard Systems", scheduledDate: "2026-05-08", completedDate: null, result: null, status: "scheduled", location: "Floors 4–7", notes: "", reinspectionRequired: false },
  { id: 4, number: "INS-004", project: "Residential Tower A", type: "Structural", description: "High-strength bolt inspection – steel moment frame connections floors 6–10", inspector: "SGH Consulting Engineers", contractor: "Allied Steel Erectors", scheduledDate: "2026-05-02", completedDate: "2026-05-02", result: "failed", status: "failed", location: "Floors 6–10 Beam Connections", notes: "12 connections found with under-torqued bolts at gridline B-7. Contractor notified. Re-inspection required after corrective work.", reinspectionRequired: true },
  { id: 5, number: "INS-005", project: "Residential Tower A", type: "Plumbing", description: "Underground plumbing rough-in prior to concrete slab pour at P1", inspector: "City Plumbing Dept.", contractor: "Metro Plumbing Co.", scheduledDate: "2026-05-05", completedDate: "2026-05-05", result: "passed", status: "passed", location: "Parking Level P1", notes: "All drains, sleeves, and cleanouts installed per plan. Pressure test witnessed and passed.", reinspectionRequired: false },
  { id: 6, number: "INS-006", project: "Shopping Center Renovation", type: "Building", description: "Final building inspection prior to Certificate of Occupancy", inspector: "City Building Dept.", contractor: "General Contractor", scheduledDate: "2026-05-15", completedDate: null, result: null, status: "scheduled", location: "Entire Building", notes: "All sub-trade final inspections must be complete before scheduling.", reinspectionRequired: false },
  { id: 7, number: "INS-007", project: "Shopping Center Renovation", type: "MEP", description: "Mechanical, electrical, and plumbing final sign-off – north wing", inspector: "Independent MEP Consultant", contractor: "Metro Mechanical / Apex Electric", scheduledDate: "2026-04-29", completedDate: "2026-04-30", result: "passed", status: "passed", location: "North Wing", notes: "All systems operational and balanced. Minor damper label missing – corrected on site.", reinspectionRequired: false },
]

const resultStyle = (r: string | null, s: string) => {
  if (s === "passed") return "bg-green-100 text-green-800"
  if (s === "failed") return "bg-red-100 text-red-800"
  if (s === "scheduled") return "bg-blue-100 text-blue-800"
  return "bg-gray-100 text-gray-700"
}

const ResultIcon = ({ status }: { status: string }) => {
  if (status === "passed") return <CheckCircle className="h-4 w-4 text-green-500" />
  if (status === "failed") return <XCircle className="h-4 w-4 text-red-500" />
  return <Clock className="h-4 w-4 text-blue-500" />
}

const inspectionTypes = ["All Types", "Structural", "Electrical", "Plumbing", "Fire Suppression", "MEP", "Building"]

export function Inspections() {
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterType, setFilterType] = useState("All Types")
  const [expanded, setExpanded] = useState<number | null>(null)

  const filtered = inspections.filter(i => {
    const matchSearch = i.description.toLowerCase().includes(search.toLowerCase()) ||
      i.number.toLowerCase().includes(search.toLowerCase()) ||
      i.project.toLowerCase().includes(search.toLowerCase()) ||
      i.type.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === "all" || i.status === filterStatus
    const matchType = filterType === "All Types" || i.type === filterType
    return matchSearch && matchStatus && matchType
  })

  const stats = {
    total: inspections.length,
    scheduled: inspections.filter(i => i.status === "scheduled").length,
    passed: inspections.filter(i => i.status === "passed").length,
    failed: inspections.filter(i => i.status === "failed").length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-brand-text-dark">Inspections</h2>
          <p className="text-sm text-brand-text-light mt-0.5">Schedule and track all site and compliance inspections</p>
        </div>
        <Button className="bg-brand-orange hover:bg-brand-orange-hover text-white self-start sm:self-auto">
          <Plus className="h-4 w-4 mr-2" />
          Schedule Inspection
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total", value: stats.total, color: "border-l-brand-orange", icon: <ClipboardList className="h-5 w-5 text-brand-orange" /> },
          { label: "Scheduled", value: stats.scheduled, color: "border-l-blue-500", icon: <Clock className="h-5 w-5 text-blue-500" /> },
          { label: "Passed", value: stats.passed, color: "border-l-green-500", icon: <CheckCircle className="h-5 w-5 text-green-500" /> },
          { label: "Failed / Re-inspect", value: stats.failed, color: "border-l-red-500", icon: <XCircle className="h-5 w-5 text-red-500" /> },
        ].map(s => (
          <Card key={s.label} className={`border-l-4 ${s.color}`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div><p className="text-2xl font-semibold text-brand-text-dark">{s.value}</p><p className="text-xs text-brand-text-light mt-1">{s.label}</p></div>
                {s.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-text-light" />
          <Input placeholder="Search inspections..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 bg-gray-50 border-gray-200 w-60 focus:border-brand-orange" />
        </div>
        <div className="flex flex-wrap gap-2">
          {["all","scheduled","passed","failed"].map(s => (
            <Button key={s} size="sm" variant={filterStatus === s ? "default" : "outline"}
              onClick={() => setFilterStatus(s)}
              className={filterStatus === s ? "bg-brand-orange hover:bg-brand-orange-hover text-white" : "text-brand-text-light border-gray-200 hover:bg-brand-orange-light hover:text-brand-orange"}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Inspection cards */}
      <div className="space-y-3">
        {filtered.map(insp => (
          <Card key={insp.id} className={`overflow-hidden ${insp.reinspectionRequired ? "border-red-200" : ""}`}>
            <div
              className="p-4 cursor-pointer hover:bg-brand-orange-light transition-colors"
              onClick={() => setExpanded(expanded === insp.id ? null : insp.id)}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <ResultIcon status={insp.status} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs text-brand-orange font-medium">{insp.number}</span>
                      <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs">{insp.type}</Badge>
                      {insp.reinspectionRequired && <Badge className="bg-red-100 text-red-700 text-xs" variant="secondary"><AlertTriangle className="h-3 w-3 mr-1" />Re-inspect Required</Badge>}
                    </div>
                    <p className="font-medium text-brand-text-dark text-sm mt-0.5 truncate">{insp.description}</p>
                    <p className="text-xs text-brand-text-light">{insp.project} · {insp.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="text-right">
                    <p className="text-xs text-brand-text-light">
                      {insp.completedDate ? `Completed ${new Date(insp.completedDate).toLocaleDateString("en-US",{month:"short",day:"numeric"})}` : `Scheduled ${new Date(insp.scheduledDate).toLocaleDateString("en-US",{month:"short",day:"numeric"})}`}
                    </p>
                    <p className="text-xs text-brand-text-light">{insp.inspector}</p>
                  </div>
                  <Badge className={resultStyle(insp.result, insp.status)} variant="secondary">
                    {insp.status.charAt(0).toUpperCase() + insp.status.slice(1)}
                  </Badge>
                </div>
              </div>
            </div>

            {expanded === insp.id && (
              <CardContent className="border-t bg-gray-50 p-4 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div><p className="text-xs text-brand-text-light">Contractor</p><p className="font-medium text-brand-text-dark">{insp.contractor}</p></div>
                  <div><p className="text-xs text-brand-text-light">Inspector</p><p className="font-medium text-brand-text-dark">{insp.inspector}</p></div>
                  <div><p className="text-xs text-brand-text-light">Location</p><p className="font-medium text-brand-text-dark">{insp.location}</p></div>
                </div>
                {insp.notes && (
                  <div className={`p-3 rounded-lg border ${insp.status === "failed" ? "bg-red-50 border-red-200" : "bg-blue-50 border-blue-200"}`}>
                    <p className="text-xs font-medium mb-1 text-brand-text-dark">Inspector Notes</p>
                    <p className={`text-sm ${insp.status === "failed" ? "text-red-700" : "text-blue-700"}`}>{insp.notes}</p>
                  </div>
                )}
                <div className="flex gap-2 pt-1">
                  <Button size="sm" variant="outline" className="text-brand-orange border-brand-orange hover:bg-brand-orange-light">View Report</Button>
                  {insp.reinspectionRequired && <Button size="sm" className="bg-brand-orange hover:bg-brand-orange-hover text-white">Schedule Re-inspection</Button>}
                  {insp.status === "scheduled" && <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">Record Result</Button>}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
