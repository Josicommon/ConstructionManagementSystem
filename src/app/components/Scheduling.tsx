import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Plus, ChevronLeft, ChevronRight, CalendarDays, Clock, MapPin, Users } from "lucide-react"

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"]

const scheduleItems = [
  { id: 1, title: "Foundation Pour – Block A", project: "Downtown Office Complex", start: "2026-05-05", end: "2026-05-07", type: "task", crew: 12, location: "Site A", color: "bg-brand-orange text-white" },
  { id: 2, title: "Steel Erection", project: "Residential Tower A", start: "2026-05-06", end: "2026-05-10", type: "task", crew: 8, location: "Site B", color: "bg-blue-500 text-white" },
  { id: 3, title: "Electrical Rough-In", project: "Shopping Center Renovation", start: "2026-05-04", end: "2026-05-06", type: "task", crew: 6, location: "Site C", color: "bg-green-500 text-white" },
  { id: 4, title: "Safety Inspection", project: "Downtown Office Complex", start: "2026-05-08", end: "2026-05-08", type: "inspection", crew: 2, location: "Site A", color: "bg-red-500 text-white" },
  { id: 5, title: "Concrete Curing Check", project: "Residential Tower A", start: "2026-05-11", end: "2026-05-12", type: "task", crew: 3, location: "Site B", color: "bg-purple-500 text-white" },
  { id: 6, title: "MEP Coordination Meeting", project: "All Projects", start: "2026-05-09", end: "2026-05-09", type: "meeting", crew: 10, location: "Office", color: "bg-yellow-500 text-white" },
]

const upcomingMilestones = [
  { id: 1, title: "Foundation Complete", project: "Downtown Office Complex", date: "2026-05-15", status: "on-track" },
  { id: 2, title: "Framing Complete", project: "Residential Tower A", date: "2026-05-28", status: "at-risk" },
  { id: 3, title: "Grand Opening", project: "Shopping Center Renovation", date: "2026-06-10", status: "on-track" },
]

export function Scheduling() {
  const today = new Date(2026, 4, 4) // May 4, 2026
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [view, setView] = useState<"month" | "week">("month")

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1) }
    else setCurrentMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1) }
    else setCurrentMonth(m => m + 1)
  }

  const getItemsForDay = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return scheduleItems.filter(item => item.start <= dateStr && item.end >= dateStr)
  }

  const isToday = (day: number) => {
    return day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-brand-text-dark">Scheduling</h2>
          <p className="text-sm text-brand-text-light mt-0.5">Construction schedule and calendar management</p>
        </div>
        <Button className="bg-brand-orange hover:bg-brand-orange-hover text-white self-start sm:self-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add Schedule Item
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="xl:col-span-3">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm" onClick={prevMonth} className="hover:bg-brand-orange-light text-brand-text-light">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <h3 className="text-lg font-semibold text-brand-text-dark">{MONTHS[currentMonth]} {currentYear}</h3>
                  <Button variant="ghost" size="sm" onClick={nextMonth} className="hover:bg-brand-orange-light text-brand-text-light">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={view === "month" ? "default" : "outline"}
                    onClick={() => setView("month")}
                    className={view === "month" ? "bg-brand-orange hover:bg-brand-orange-hover text-white" : "text-brand-orange border-brand-orange hover:bg-brand-orange-light"}
                  >
                    Month
                  </Button>
                  <Button
                    size="sm"
                    variant={view === "week" ? "default" : "outline"}
                    onClick={() => setView("week")}
                    className={view === "week" ? "bg-brand-orange hover:bg-brand-orange-hover text-white" : "text-brand-orange border-brand-orange hover:bg-brand-orange-light"}
                  >
                    Week
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Day labels */}
              <div className="grid grid-cols-7 mb-2">
                {DAYS.map(d => (
                  <div key={d} className="text-center text-xs font-medium text-brand-text-light py-2">{d}</div>
                ))}
              </div>
              {/* Calendar grid */}
              <div className="grid grid-cols-7 border-t border-l border-border">
                {/* Empty cells before first day */}
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                  <div key={`empty-${i}`} className="min-h-[90px] border-r border-b border-border bg-gray-50" />
                ))}
                {/* Day cells */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1
                  const items = getItemsForDay(day)
                  return (
                    <div
                      key={day}
                      className={`min-h-[90px] border-r border-b border-border p-1 ${isToday(day) ? "bg-brand-orange-light" : "hover:bg-gray-50"}`}
                    >
                      <span className={`text-xs font-medium inline-flex items-center justify-center w-6 h-6 rounded-full mb-1 ${isToday(day) ? "bg-brand-orange text-white" : "text-brand-text-dark"}`}>
                        {day}
                      </span>
                      <div className="space-y-0.5">
                        {items.slice(0, 2).map(item => (
                          <div key={item.id} className={`text-xs px-1 py-0.5 rounded truncate cursor-pointer ${item.color}`}>
                            {item.title}
                          </div>
                        ))}
                        {items.length > 2 && (
                          <div className="text-xs text-brand-orange font-medium pl-1">+{items.length - 2} more</div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar panels */}
        <div className="space-y-4">
          {/* Upcoming Milestones */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-brand-text-dark text-base">Upcoming Milestones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingMilestones.map(m => (
                <div key={m.id} className="border rounded-lg p-3 hover:bg-brand-orange-light transition-colors">
                  <p className="text-sm font-medium text-brand-text-dark">{m.title}</p>
                  <p className="text-xs text-brand-text-light mt-0.5">{m.project}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-brand-text-light">{new Date(m.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                    <Badge className={m.status === "on-track" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"} variant="secondary">
                      {m.status === "on-track" ? "On Track" : "At Risk"}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* This Week */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-brand-text-dark text-base">This Week's Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {scheduleItems.slice(0, 4).map(item => (
                <div key={item.id} className="flex items-start gap-2">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${item.color.replace("text-white", "")}`} />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-brand-text-dark truncate">{item.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-brand-text-light flex items-center gap-1">
                        <Users className="h-3 w-3" />{item.crew}
                      </span>
                      <span className="text-xs text-brand-text-light flex items-center gap-1">
                        <MapPin className="h-3 w-3" />{item.location}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Upcoming Schedule Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-brand-text-dark">All Scheduled Items</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-brand-text-dark">Item</th>
                  <th className="text-left p-4 text-sm font-medium text-brand-text-dark">Project</th>
                  <th className="text-left p-4 text-sm font-medium text-brand-text-dark">Start</th>
                  <th className="text-left p-4 text-sm font-medium text-brand-text-dark">End</th>
                  <th className="text-left p-4 text-sm font-medium text-brand-text-dark">Crew</th>
                  <th className="text-left p-4 text-sm font-medium text-brand-text-dark">Type</th>
                </tr>
              </thead>
              <tbody>
                {scheduleItems.map(item => (
                  <tr key={item.id} className="border-b hover:bg-brand-orange-light transition-colors">
                    <td className="p-4 text-sm font-medium text-brand-text-dark">{item.title}</td>
                    <td className="p-4 text-sm text-brand-text-light">{item.project}</td>
                    <td className="p-4 text-sm text-brand-text-dark">{new Date(item.start).toLocaleDateString("en-US",{month:"short",day:"numeric"})}</td>
                    <td className="p-4 text-sm text-brand-text-dark">{new Date(item.end).toLocaleDateString("en-US",{month:"short",day:"numeric"})}</td>
                    <td className="p-4 text-sm text-brand-text-dark">{item.crew} workers</td>
                    <td className="p-4">
                      <Badge variant="secondary" className={
                        item.type === "inspection" ? "bg-red-100 text-red-700" :
                        item.type === "meeting" ? "bg-yellow-100 text-yellow-700" :
                        "bg-blue-100 text-blue-700"
                      }>
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </Badge>
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
