import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Input } from "./ui/input"
import { Plus, Search, Cloud, Sun, CloudRain, Wind, Users, ChevronDown, ChevronUp } from "lucide-react"

const logs = [
  {
    id: 1,
    date: "2026-05-04",
    project: "Downtown Office Complex",
    superintendent: "Mike Chen",
    weather: "sunny",
    temperature: "72°F",
    workers: 28,
    shift: "Day",
    workCompleted: "Poured 3rd floor slab sections A through D. Completed formwork on east wing columns. MEP rough-in inspection passed on floors 1-2.",
    materials: "Concrete (45 CY), Rebar (#5, #8 mix), Form lumber",
    equipment: "Concrete pump, Tower crane, 2× forklifts",
    delays: "None",
    safetyNotes: "Toolbox talk on heat safety. No incidents.",
    visitors: "City inspector (John Parks) – passed",
    photos: 12,
    status: "submitted"
  },
  {
    id: 2,
    date: "2026-05-03",
    project: "Residential Tower A",
    superintendent: "David Rodriguez",
    weather: "cloudy",
    temperature: "65°F",
    workers: 19,
    shift: "Day",
    workCompleted: "Continued steel erection floors 8-10. Installed 45 shear studs. Welding inspection completed on floors 6-7.",
    materials: "Structural steel (W14×132), Shear studs, Welding wire",
    equipment: "Mobile crane, Welding machines, Aerial lifts",
    delays: "1hr delay – crane operator shift change",
    safetyNotes: "Fall protection check. Caught 1 improperly clipped lanyard – corrected immediately.",
    visitors: "Owner's rep (Susan Lee)",
    photos: 8,
    status: "submitted"
  },
  {
    id: 3,
    date: "2026-05-02",
    project: "Shopping Center Renovation",
    superintendent: "Robert Taylor",
    weather: "rainy",
    temperature: "58°F",
    workers: 11,
    shift: "Day",
    workCompleted: "Interior drywall installation lobby area 80% complete. Paint primer applied to south wing. Flooring substrate prep.",
    materials: "Drywall (5/8\" fire-rated), Joint compound, Paint primer",
    equipment: "Scissor lifts, Drywall lifts",
    delays: "Exterior work suspended due to rain",
    safetyNotes: "Slip hazard signs placed at all entrances. No incidents.",
    visitors: "None",
    photos: 6,
    status: "draft"
  },
  {
    id: 4,
    date: "2026-05-01",
    project: "Downtown Office Complex",
    superintendent: "Mike Chen",
    weather: "sunny",
    temperature: "70°F",
    workers: 32,
    shift: "Day",
    workCompleted: "Completed 2nd floor slab pour. Installed curtain wall panels on south façade (grids 1-4). Started mechanical penthouse framing.",
    materials: "Concrete (55 CY), Curtain wall panels (12 units), Steel tubing",
    equipment: "Concrete pump, Tower crane, Curtain wall lift",
    delays: "None",
    safetyNotes: "No incidents. Heat index advisory issued to all crew.",
    visitors: "Structural engineer (Tom Baird) – routine site visit",
    photos: 18,
    status: "approved"
  },
]

const WeatherIcon = ({ weather }: { weather: string }) => {
  if (weather === "sunny") return <Sun className="h-4 w-4 text-yellow-500" />
  if (weather === "rainy") return <CloudRain className="h-4 w-4 text-blue-500" />
  return <Cloud className="h-4 w-4 text-gray-400" />
}

const statusStyle = (s: string) => {
  if (s === "approved") return "bg-green-100 text-green-800"
  if (s === "submitted") return "bg-blue-100 text-blue-800"
  return "bg-yellow-100 text-yellow-800"
}

export function DailyLogs() {
  const [search, setSearch] = useState("")
  const [expanded, setExpanded] = useState<number | null>(1)

  const filtered = logs.filter(l =>
    l.project.toLowerCase().includes(search.toLowerCase()) ||
    l.superintendent.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-brand-text-dark">Daily Logs</h2>
          <p className="text-sm text-brand-text-light mt-0.5">Daily site reports and field activity records</p>
        </div>
        <Button className="bg-brand-orange hover:bg-brand-orange-hover text-white self-start sm:self-auto">
          <Plus className="h-4 w-4 mr-2" />
          New Daily Log
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Logs This Week", value: "12", color: "border-l-brand-orange" },
          { label: "Pending Approval", value: "3", color: "border-l-yellow-500" },
          { label: "Approved", value: "8", color: "border-l-green-500" },
          { label: "Total Workers Today", value: "58", color: "border-l-blue-500" },
        ].map(s => (
          <Card key={s.label} className={`border-l-4 ${s.color}`}>
            <CardContent className="p-4">
              <p className="text-2xl font-semibold text-brand-text-dark">{s.value}</p>
              <p className="text-xs text-brand-text-light mt-1">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-text-light" />
        <Input
          placeholder="Search logs..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-10 bg-gray-50 border-gray-200 focus:border-brand-orange"
        />
      </div>

      {/* Log entries */}
      <div className="space-y-3">
        {filtered.map(log => (
          <Card key={log.id} className="overflow-hidden">
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-brand-orange-light transition-colors"
              onClick={() => setExpanded(expanded === log.id ? null : log.id)}
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="text-center flex-shrink-0 w-12">
                  <p className="text-xs text-brand-text-light">{new Date(log.date).toLocaleDateString("en-US",{month:"short"})}</p>
                  <p className="text-xl font-bold text-brand-text-dark leading-none">{new Date(log.date).getDate()}</p>
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-brand-text-dark truncate">{log.project}</p>
                  <p className="text-sm text-brand-text-light">Superintendent: {log.superintendent}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                <WeatherIcon weather={log.weather} />
                <span className="text-sm text-brand-text-light hidden sm:flex items-center gap-1"><Users className="h-3.5 w-3.5" />{log.workers}</span>
                <Badge className={statusStyle(log.status)} variant="secondary">
                  {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                </Badge>
                {expanded === log.id ? <ChevronUp className="h-4 w-4 text-brand-text-light" /> : <ChevronDown className="h-4 w-4 text-brand-text-light" />}
              </div>
            </div>

            {expanded === log.id && (
              <CardContent className="border-t bg-gray-50 p-4 space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                  <div><p className="text-brand-text-light text-xs">Weather</p><p className="font-medium text-brand-text-dark">{log.temperature} · {log.weather}</p></div>
                  <div><p className="text-brand-text-light text-xs">Workers on Site</p><p className="font-medium text-brand-text-dark">{log.workers}</p></div>
                  <div><p className="text-brand-text-light text-xs">Shift</p><p className="font-medium text-brand-text-dark">{log.shift}</p></div>
                  <div><p className="text-brand-text-light text-xs">Photos</p><p className="font-medium text-brand-text-dark">{log.photos} attached</p></div>
                </div>
                <div>
                  <p className="text-xs font-medium text-brand-text-dark mb-1">Work Completed</p>
                  <p className="text-sm text-brand-text-light">{log.workCompleted}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><p className="text-xs font-medium text-brand-text-dark mb-1">Materials Used</p><p className="text-sm text-brand-text-light">{log.materials}</p></div>
                  <div><p className="text-xs font-medium text-brand-text-dark mb-1">Equipment</p><p className="text-sm text-brand-text-light">{log.equipment}</p></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-brand-text-dark mb-1">Delays</p>
                    <p className={`text-sm ${log.delays === "None" ? "text-green-600" : "text-red-600"}`}>{log.delays}</p>
                  </div>
                  <div><p className="text-xs font-medium text-brand-text-dark mb-1">Visitors</p><p className="text-sm text-brand-text-light">{log.visitors}</p></div>
                </div>
                <div className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-xs font-medium text-yellow-800">Safety: </p>
                  <p className="text-xs text-yellow-700">{log.safetyNotes}</p>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="text-brand-orange border-brand-orange hover:bg-brand-orange-light">Edit</Button>
                  {log.status === "draft" && <Button size="sm" className="bg-brand-orange hover:bg-brand-orange-hover text-white">Submit</Button>}
                  {log.status === "submitted" && <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">Approve</Button>}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
