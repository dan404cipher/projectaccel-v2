import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"
import TypeOfWork from "@/components/dashboard/TypeOfWork"
import { PriorityBreakdown } from "@/components/dashboard/PriorityBreakdown"
import EmergenceIssue from "@/components/dashboard/EmergenceIssue"
import IssuesAnalysis from "@/components/dashboard/IssuesAnalysis"
import RecentCommand from "@/components/dashboard/RecentCommand"
import { useCounter } from "@/hooks/use-counter"
import MySchedule from "@/components/dashboard/MySchedule"
import BugOverview from "@/components/dashboard/BugOverview"

const Dashboard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Counter hooks for stats animation
  const totalProjects = useCounter({ end: 4, delay: 3000 });
  const assignedIssues = useCounter({ end: 44, delay: 400 });
  const inProgress = useCounter({ end: 32, delay: 600 });
  const overDueIssues = useCounter({ end: 5, delay: 800 });
  const completionRate = useCounter({ end: 32, delay: 1000 });

  const issueAnalysisData = [
    { label: "Mon", value: 89, color: "hsl(var(--chart-primary))" },
    { label: "Tue", value: 85, color: "hsl(var(--chart-secondary))" },
    { label: "Wed", value: 75, color: "hsl(var(--chart-primary))" },
    { label: "Thu", value: 65, color: "hsl(var(--chart-secondary))" },
    { label: "Fri", value: 45, color: "hsl(var(--chart-primary))" },
    { label: "Sat", value: 25, color: "hsl(var(--chart-secondary))" },
  ]

  const workTypeData = [
    { label: "Epic", value: 45, color: "hsl(var(--chart-primary))" },
    { label: "Story", value: 30, color: "hsl(var(--chart-secondary))" },
    { label: "Task", value: 75, color: "hsl(var(--chart-accent))" },
    { label: "Bug", value: 85, color: "hsl(var(--chart-warning))" },
  ]

  const emergingIssues = [
    {
      id: "1",
      title: "Login forgot password bugfix",
      status: "open" as const,
      priority: "high" as const,
      assignees: [{ name: "John Doe" }, { name: "Jane Smith" }]
    },
    {
      id: "2",
      title: "Login forgot password bugfix",
      status: "in-progress" as const,
      priority: "medium" as const,
      assignees: [{ name: "Alice Brown" }]
    },
    {
      id: "3",
      title: "Login forgot password bugfix",
      status: "completed" as const,
      priority: "low" as const,
      assignees: [{ name: "Bob Wilson" }]
    }
  ]

  const recentComments = [
    {
      user: "Kate",
      comment: "Login forgot password bugfix",
      time: "2h",
      avatar: ""
    },
    {
      user: "Kate",
      comment: "Login forgot password bugfix",
      time: "4h",
      avatar: ""
    },
    {
      user: "Kate",
      comment: "Login forgot password bugfix",
      time: "6h",
      avatar: ""
    }
  ]

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-10 px-2 sm:px-4 lg:px-6 w-full pt-2">
      {/* Welcome Section */}
      <div className="space-y-1 sm:space-y-2">
        <h1 className="text-xl sm:text-2xl lg:text-[32px] font-medium text-[#438197]">Welcome Back !!</h1>
        <p className="text-base sm:text-lg lg:text-[20px] font-medium text-[#252525]">Krishna kumar</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-[23px] w-full">
        <div className="bg-white h-24 sm:h-32 lg:h-[140px] w-full rounded-2xl sm:rounded-3xl shadow-[0px_9px_20px_0px_rgba(46,35,94,0.07)] flex flex-col items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4">
          <h3 className="text-sm sm:text-base lg:text-[20px] font-semibold text-[#333333] text-center">Total Projects</h3>
          <div className="text-lg sm:text-xl lg:text-[20px] font-bold text-[#06263D]">{totalProjects}</div>
          <p className="text-xs sm:text-sm lg:text-[14px] font-medium text-[#999999] text-center">Assigned to me</p>
        </div>

        <div className="bg-white h-24 sm:h-32 lg:h-[140px] w-full rounded-2xl sm:rounded-3xl shadow-[0px_9px_20px_0px_rgba(46,35,94,0.07)] flex flex-col items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4">
          <h3 className="text-sm sm:text-base lg:text-[20px] font-semibold text-[#333333] text-center">Assigned Issues</h3>
          <div className="text-lg sm:text-xl lg:text-[20px] font-bold text-[#06263D]">{assignedIssues}</div>
          <p className="text-xs sm:text-sm lg:text-[14px] font-medium text-[#999999] text-center">Issues across all projects</p>
        </div>

        <div className="bg-white h-24 sm:h-32 lg:h-[140px] w-full rounded-2xl sm:rounded-3xl shadow-[0px_9px_20px_0px_rgba(46,35,94,0.07)] flex flex-col items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4">
          <h3 className="text-sm sm:text-base lg:text-[20px] font-semibold text-[#333333] text-center">In progress</h3>
          <div className="text-lg sm:text-xl lg:text-[20px] font-bold text-[#06263D]">{inProgress}</div>
          <p className="text-xs sm:text-sm lg:text-[14px] font-medium text-[#999999] text-center">Currently being worked on</p>
        </div>

        <div className="bg-white h-24 sm:h-32 lg:h-[140px] w-full rounded-2xl sm:rounded-3xl shadow-[0px_9px_20px_0px_rgba(46,35,94,0.07)] flex flex-col items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4">
          <h3 className="text-sm sm:text-base lg:text-[20px] font-semibold text-[#333333] text-center">Over Due Issues</h3>
          <div className="text-lg sm:text-xl lg:text-[20px] font-bold text-[#06263D]">{overDueIssues}</div>
          <p className="text-xs sm:text-sm lg:text-[14px] font-medium text-[#999999] text-center">Pending Beyond Deadline</p>
        </div>

        <div className="bg-white h-24 sm:h-32 lg:h-[140px] w-full rounded-2xl sm:rounded-3xl shadow-[0px_9px_20px_0px_rgba(46,35,94,0.07)] flex flex-col items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4">
          <h3 className="text-sm sm:text-base lg:text-[20px] font-semibold text-[#333333] text-center">Completion Rate</h3>
          <div className="text-lg sm:text-xl lg:text-[20px] font-bold text-[#06263D]">{completionRate}%</div>
          <p className="text-xs sm:text-sm lg:text-[14px] font-medium text-[#999999] text-center">Issues completed</p>
        </div>
      </div>

      {/*  Type of work , Priority Section and Emerengence Issue Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div>
          <TypeOfWork />
        </div>
        <div>
          <PriorityBreakdown />
        </div>
        <div>
          <EmergenceIssue />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <IssuesAnalysis />
        </div>
        <div>
          <RecentCommand />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1">
          <MySchedule />
        </div>
        <div className="lg:col-span-2">
          <BugOverview />
        </div>
      </div>



      {/* Schedule and Additional Sections */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <Card style={{
      borderRadius: '24px',
      background: '#FFF',
      boxShadow: '0 9px 20px 0 rgba(46, 35, 94, 0.07)'
    }}>
      <CardHeader>
        <CardTitle className="text-base font-semibold">My Schedule</CardTitle>
        <p className="text-sm text-muted-foreground">According to my schedule</p>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border-0"
        />
      </CardContent>
    </Card>

    <Card style={{
      borderRadius: '24px',
      background: '#FFF',
      boxShadow: '0 9px 20px 0 rgba(46, 35, 94, 0.07)'
    }}>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Bug overview</CardTitle>
        <p className="text-sm text-muted-foreground">Connect Integrations with other services in the future</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="text-sm">Login forgot password bugfix</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Open</span>
                <span>Normal</span>
                <span>UI Bug</span>
                <span>P - Normal</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div> */}

      {/* App Integrations */}
      {/* <Card className="shadow-[var(--shadow-card)]">
    <CardHeader>
      <CardTitle className="text-base font-semibold">App Integrations</CardTitle>
      <p className="text-sm text-muted-foreground">Connect integrations with other services in the future</p>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">GM</span>
            </div>
            <div>
              <p className="text-sm font-medium">Google Meet</p>
              <p className="text-xs text-muted-foreground">Connect calls and meetings online</p>
            </div>
          </div>
          <span className="text-xs text-muted-foreground">...</span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <div>
              <p className="text-sm font-medium">Figma</p>
              <p className="text-xs text-muted-foreground">Communicate with the team</p>
            </div>
          </div>
          <span className="text-xs text-muted-foreground">...</span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-teal-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <div>
              <p className="text-sm font-medium">Loom</p>
              <p className="text-xs text-muted-foreground">Loom lorem is a dummy text to fit</p>
            </div>
          </div>
          <span className="text-xs text-muted-foreground">...</span>
        </div>
      </div>
    </CardContent>
  </Card> */}

      {/* Assigned Issues Table */}
      {/* <Card className="shadow-[var(--shadow-card)]">
    <CardHeader>
      <CardTitle className="text-base font-semibold">Assigned Issues</CardTitle>
      <p className="text-sm text-muted-foreground">Assigned issues of all projects</p>
    </CardHeader>
    <CardContent>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-2 text-sm font-medium text-muted-foreground">Type</th>
              <th className="text-left p-2 text-sm font-medium text-muted-foreground">Issue Title</th>
              <th className="text-left p-2 text-sm font-medium text-muted-foreground">Assign to</th>
              <th className="text-left p-2 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-left p-2 text-sm font-medium text-muted-foreground">Priority</th>
              <th className="text-left p-2 text-sm font-medium text-muted-foreground">Due date</th>
              <th className="text-left p-2 text-sm font-medium text-muted-foreground">Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 6 }).map((_, index) => (
              <tr key={index} className="border-b border-border hover:bg-muted/50">
                <td className="p-2">
                  <div className="w-6 h-6 rounded bg-muted flex items-center justify-center">
                    <span className="text-xs font-medium">E</span>
                  </div>
                </td>
                <td className="p-2">
                  <span className="text-sm font-medium">Publish blog page</span>
                </td>
                <td className="p-2">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs border-2 border-background">
                      J
                    </div>
                    <div className="w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs border-2 border-background">
                      A
                    </div>
                    <span className="ml-2 text-xs text-muted-foreground">...</span>
                  </div>
                </td>
                <td className="p-2">
                  <Badge variant="outline" className="text-xs">Ready</Badge>
                </td>
                <td className="p-2">
                  <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">Low</Badge>
                </td>
                <td className="p-2">
                  <Badge variant="destructive" className="text-xs">Dec 5</Badge>
                </td>
                <td className="p-2">
                  <span className="text-xs text-muted-foreground cursor-pointer hover:text-foreground">...</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card> */}
    </div>
  )
}

export default Dashboard