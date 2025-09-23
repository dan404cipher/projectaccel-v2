import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Issue {
  id: string
  title: string
  status: "open" | "in-progress" | "completed"
  priority: "low" | "medium" | "high" | "highest"
  assignees: Array<{ name: string; avatar?: string }>
}

interface IssuesListProps {
  title: string
  issues: Issue[]
  showAll?: boolean
}

export function IssuesList({ title, issues, showAll = false }: IssuesListProps) {
  const displayIssues = showAll ? issues : issues.slice(0, 4)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "highest": return "bg-chart-danger"
      case "high": return "bg-chart-warning"
      case "medium": return "bg-chart-secondary"
      case "low": return "bg-chart-accent"
      default: return "bg-muted"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-chart-accent text-white"
      case "in-progress": return "bg-chart-warning text-white"
      case "open": return "bg-muted text-muted-foreground"
      default: return "bg-muted"
    }
  }

  return (
    <Card 
      style={{
        borderRadius: '24px',
        background: '#FFF',
        boxShadow: '0 9px 20px 0 rgba(46, 35, 94, 0.07)'
      }}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        <Badge variant="secondary" className="text-xs">
          {issues.length}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayIssues.map((issue) => (
            <div key={issue.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${getPriorityColor(issue.priority)}`} />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">{issue.title}</p>
                  <Badge variant="secondary" className={`text-xs ${getStatusColor(issue.status)}`}>
                    {issue.status.replace("-", " ")}
                  </Badge>
                </div>
              </div>
              <div className="flex -space-x-2">
                {issue.assignees.map((assignee, index) => (
                  <Avatar key={index} className="h-6 w-6 border-2 border-background">
                    <AvatarImage src={assignee.avatar} />
                    <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                      {assignee.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}