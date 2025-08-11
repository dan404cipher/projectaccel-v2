import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"
import TypeOfWork from "@/components/dashboard/TypeOfWork"
import { PriorityBreakdown } from "@/components/dashboard/PriorityBreakdown"
import EmergenceIssue from "@/components/dashboard/EmergenceIssue"
import IssuesAnalysis from "@/components/dashboard/IssuesAnalysis"

const Dashboard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())

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
          <div className="text-lg sm:text-xl lg:text-[20px] font-bold text-[#06263D]">4</div>
          <p className="text-xs sm:text-sm lg:text-[14px] font-medium text-[#999999] text-center">Assigned to me</p>
        </div>

        <div className="bg-white h-24 sm:h-32 lg:h-[140px] w-full rounded-2xl sm:rounded-3xl shadow-[0px_9px_20px_0px_rgba(46,35,94,0.07)] flex flex-col items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4">
          <h3 className="text-sm sm:text-base lg:text-[20px] font-semibold text-[#333333] text-center">Assigned Issues</h3>
          <div className="text-lg sm:text-xl lg:text-[20px] font-bold text-[#06263D]">44</div>
          <p className="text-xs sm:text-sm lg:text-[14px] font-medium text-[#999999] text-center">Issues across all projects</p>
        </div>

        <div className="bg-white h-24 sm:h-32 lg:h-[140px] w-full rounded-2xl sm:rounded-3xl shadow-[0px_9px_20px_0px_rgba(46,35,94,0.07)] flex flex-col items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4">
          <h3 className="text-sm sm:text-base lg:text-[20px] font-semibold text-[#333333] text-center">In progress</h3>
          <div className="text-lg sm:text-xl lg:text-[20px] font-bold text-[#06263D]">32</div>
          <p className="text-xs sm:text-sm lg:text-[14px] font-medium text-[#999999] text-center">Currently being worked on</p>
        </div>

        <div className="bg-white h-24 sm:h-32 lg:h-[140px] w-full rounded-2xl sm:rounded-3xl shadow-[0px_9px_20px_0px_rgba(46,35,94,0.07)] flex flex-col items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4">
          <h3 className="text-sm sm:text-base lg:text-[20px] font-semibold text-[#333333] text-center">Over Due Issues</h3>
          <div className="text-lg sm:text-xl lg:text-[20px] font-bold text-[#06263D]">5</div>
          <p className="text-xs sm:text-sm lg:text-[14px] font-medium text-[#999999] text-center">Pending Beyond Deadline</p>
        </div>

        <div className="bg-white h-24 sm:h-32 lg:h-[140px] w-full rounded-2xl sm:rounded-3xl shadow-[0px_9px_20px_0px_rgba(46,35,94,0.07)] flex flex-col items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 relative">
          <h3 className="text-sm sm:text-base lg:text-[20px] font-semibold text-[#333333] text-center">Completion Rate</h3>

          <div className="relative w-12 h-12 sm:w-16 sm:h-16 lg:w-[72px] lg:h-[72px] rounded-full overflow-hidden">
            <div className="absolute inset-[3.2%] bg-[rgba(255,255,255,0.4)] opacity-40 rounded-full border-[2px] sm:border-[3px] border-[#67909b]"></div>
            <div className="absolute inset-[6%] overflow-hidden rounded-full">
              <div className="absolute bottom-[-50%] left-[-70%] right-[-7.73%] top-[46.36%]">
                <div className="absolute bottom-[-45.45%] left-[-2.27%] right-[-5.46%] top-[46.36%] opacity-60">
                  <div className="h-6 sm:h-8 lg:h-9 w-full bg-[#67909b]"></div>
                  <div className="bg-[#67909b] flex-grow min-h-px w-full"></div>
                </div>
              </div>
              <div className="absolute font-medium text-[10px] sm:text-[12px] text-white" style={{ top: "calc(50% + 8px)", left: "calc(50% + 0.5px)", transform: "translate(-50%, -50%)" }}>
                32%
              </div>
            </div>
          </div>

          <div className="absolute right-2 sm:right-4 top-16 sm:top-20 lg:top-[71px]">
            <div className="text-xs sm:text-sm lg:text-[14px] font-semibold text-[#06263D] text-center">41 of 131</div>
          </div>
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
          s
        </div>
      </div>

      {/* Types of Work and Priority Section */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white h-auto min-h-[300px] sm:min-h-[350px] lg:h-[395px] w-full rounded-2xl sm:rounded-3xl shadow-[0px_9px_20px_0px_rgba(46,35,94,0.07)]">
          <div className="flex flex-col gap-2 items-start justify-start p-4 sm:p-6 w-full">
            <div className="text-base sm:text-lg lg:text-[20px] font-medium text-[#252525] w-full">Types of work</div>
            <div className="text-sm sm:text-base lg:text-[16px] font-medium text-[#999999] w-full">Issues in all projects</div>
          </div>

          <div className="p-4 sm:p-6">
            {workTypeData.map((item, index) => (
              <div key={item.label} className="flex items-center gap-4 sm:gap-6 lg:gap-[25px] mb-3 sm:mb-4">
                <div className="h-6 sm:h-8 lg:h-[30px] w-8 sm:w-10 flex items-center justify-center">
                  <div className="text-sm sm:text-base lg:text-[16px] font-medium text-[#1c2024]">{item.label}</div>
                </div>
                <div className="flex-1 h-10 bg-gray-200 rounded relative">
                  <div
                    className="h-full rounded"
                    style={{
                      width: `${item.value}%`,
                      backgroundColor: item.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <Card style={{
          borderRadius: '24px',
          background: '#FFF',
          boxShadow: '0 9px 20px 0 rgba(46, 35, 94, 0.07)'
        }}>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Priority Breakdown</CardTitle>
            <p className="text-sm text-muted-foreground">Priority breakdown of all projects</p>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-24 h-24">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" fill="none" stroke="hsl(var(--chart-accent))" strokeWidth="3" strokeDasharray="60 40" strokeLinecap="round" />
                  <circle cx="18" cy="18" r="12" fill="none" stroke="hsl(var(--chart-primary))" strokeWidth="2" strokeDasharray="40 60" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-foreground">32</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {["Highest", "High", "Medium", "Low", "Lowest"].map((priority, index) => (
                <div key={priority} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-chart-danger' :
                        index === 1 ? 'bg-chart-warning' :
                          index === 2 ? 'bg-chart-secondary' :
                            index === 3 ? 'bg-chart-accent' :
                              'bg-muted'
                      }`} />
                    <span className="text-sm text-muted-foreground">{priority}</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {index === 0 ? '12' : index === 1 ? '8' : index === 2 ? '7' : index === 3 ? '3' : '2'}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card> */}
      {/* Emerging Issues */}
      {/* <div className="bg-white h-auto min-h-[300px] sm:min-h-[350px] lg:h-[395px] w-full rounded-2xl sm:rounded-3xl shadow-[0px_9px_20px_0px_rgba(46,35,94,0.07)]">
          <div className="flex flex-col gap-4 sm:gap-6 items-start justify-start p-4 sm:p-6 w-full">
            <div className="flex flex-row items-center justify-between w-full">
              <div className="flex flex-row gap-2 items-center justify-start">
                <div className="w-6 h-6 sm:w-8 sm:h-8">
                  <svg width="24" height="24" viewBox="0 0 32 32" fill="none" className="sm:w-8 sm:h-8">
                    <rect width="32" height="32" rx="6" fill="#f0f0f0" />
                  </svg>
                </div>
                <div className="text-base sm:text-lg lg:text-[20px] font-medium text-[#252525]">Emerg Issues</div>
              </div>
            </div>

            <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10 items-start justify-start w-full">
              {emergingIssues.slice(0, 4).map((issue, index) => (
                <div key={issue.id} className="flex flex-row gap-3 sm:gap-4 items-start justify-start w-full">
                  <div className="flex flex-row items-center justify-between px-0 py-px w-12 sm:w-[62px] flex-shrink-0">
                    <div className="bg-[#263238] w-4 h-4 sm:w-5 sm:h-5 rounded-full sm:rounded-[32px] flex items-center justify-center">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="sm:w-3 sm:h-3">
                        <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" stroke="white" strokeWidth="1" fill="white" />
                      </svg>
                    </div>
                    <div className="text-[10px] sm:text-[12px] font-normal text-[#666666] text-right tracking-[-0.072px] hidden sm:block">BG – 17</div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 lg:gap-[91px] items-start sm:items-center justify-start flex-1 min-w-0">
                    <div className="flex flex-col gap-1 sm:gap-2 items-start justify-start flex-1 min-w-0">
                      <div className="text-sm sm:text-base lg:text-[16px] font-medium text-[#333333]">{issue.title}</div>
                      <div className="flex flex-row gap-1 sm:gap-2 items-start justify-start text-xs sm:text-[12px]">
                        <div className="font-normal text-[#999999]">Projects</div>
                        <div className="font-medium text-[#999999]">Hire-Accel Portal</div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 items-start justify-start w-full sm:w-20 flex-shrink-0">
                      <div className="text-xs sm:text-sm lg:text-[14px] font-medium text-[#252525] text-center w-full">Time Left</div>
                      <div className="bg-[#c0ced2] h-4 sm:h-5 w-full sm:w-20 rounded-lg relative">
                        <div className="text-[10px] sm:text-[12px] font-medium text-[#445256] absolute top-[2px] sm:top-[3px] left-[8px] sm:left-[27px]">
                          {index === 0 ? '8 hrs' : index === 1 ? '10 hrs' : index === 2 ? '1 day' : '2 days'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> */}
      {/* </div> */}


      {/* Issues Analysis Section */}
          {/* Recent Comments */}
    {/* <div className="bg-white h-auto min-h-[300px] sm:min-h-[350px] lg:h-[395px] w-full rounded-2xl sm:rounded-3xl shadow-[0px_9px_20px_0px_rgba(46,35,94,0.07)] overflow-hidden">
      <div className="flex flex-col gap-4 sm:gap-6 items-start justify-start p-4 sm:p-6 w-full">
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-row gap-2 items-center justify-start w-full">
            <div className="w-6 h-6 sm:w-8 sm:h-8">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none" className="sm:w-8 sm:h-8">
                <rect width="32" height="32" rx="6" fill="#f0f0f0" />
              </svg>
            </div>
            <div className="text-base sm:text-lg lg:text-[20px] font-medium text-[#252525]">Recent Comments</div>
            <div className="bg-[#586468] w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center">
              <div className="text-xs sm:text-sm lg:text-[14px] font-medium text-white">44</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4 h-48 sm:h-64 lg:h-[291px] items-start justify-start overflow-y-auto w-full">
          {recentComments.map((comment, index) => (
            <div key={index} className="bg-[#f9f9f9] flex flex-row gap-3 sm:gap-4 items-start justify-start px-3 sm:px-4 py-2 rounded-xl sm:rounded-2xl w-full">
              <div className="flex flex-row items-center justify-between px-0 py-px w-12 sm:w-[62px] flex-shrink-0">
                <div className="bg-[#263238] w-4 h-4 sm:w-5 sm:h-5 rounded-full sm:rounded-[32px] flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="sm:w-3 sm:h-3">
                    <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" stroke="white" strokeWidth="1" fill="white" />
                  </svg>
                </div>
                <div className="text-[10px] sm:text-[12px] font-normal text-[#666666] text-right tracking-[-0.072px] hidden sm:block">BG – 17</div>
              </div>

              <div className="flex flex-col gap-1 sm:gap-2 items-start justify-start flex-1 min-w-0">
                <div className="flex flex-col gap-1 sm:gap-2 items-start justify-start w-full">
                  <div className="text-sm sm:text-base lg:text-[16px] font-medium text-[#333333]">Login forgot password bugfix</div>
                  <div className="text-xs sm:text-sm lg:text-[12px] font-normal text-[#999999] w-full">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                </div>

                <div className="flex flex-row items-center justify-between w-full">
                  <div className="flex flex-row gap-1 items-center justify-start">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gray-300"></div>
                    <div className="text-sm sm:text-base lg:text-[16px] font-medium text-[#333333] tracking-[-0.32px]">Kate</div>
                  </div>

                  <div className="text-xs sm:text-sm lg:text-[12px] font-normal text-[#999999] tracking-[-0.24px]">6 mins ago</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div> */}


    {/* </div> */}

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