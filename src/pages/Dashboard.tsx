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
import AppIntegration from "@/components/dashboard/AppIntegration"
import AssignIssue from "@/components/dashboard/AssignIssue"

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
    <div className="space-y-4 sm:space-y-6 lg:space-y-10 px-2 sm:px-4 lg:px-6 w-full pt-2 h-full overflow-y-scroll">
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
          <IssuesAnalysis className="h-full"/>
        </div>
        <div>
          <RecentCommand className="h-full"/>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 flex flex-col h-full">
          <MySchedule className="h-full" />
        </div>

        <div className="lg:col-span-2 flex flex-col gap-4 h-full">
          <BugOverview className="h-full"/>
          <AppIntegration className="flex-1" />
        </div>
      </div>
      <div className="flex">
          <AssignIssue />
      </div>
    </div>
  )
}

export default Dashboard;