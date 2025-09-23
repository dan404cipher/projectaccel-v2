import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ChartData {
  label: string
  value: number
  color: string
}

interface ChartCardProps {
  title: string
  subtitle?: string
  data?: ChartData[]
  type?: "bar" | "progress" | "donut"
  children?: React.ReactNode
}

export function ChartCard({ title, subtitle, data, type = "bar", children }: ChartCardProps) {
  const renderChart = () => {
    if (children) return children

    if (type === "progress" && data) {
      return (
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-medium">{item.value}%</span>
              </div>
              <Progress value={item.value} className="h-2" />
            </div>
          ))}
        </div>
      )
    }

    if (type === "bar" && data) {
      const maxValue = Math.max(...data.map(item => item.value))
      return (
        <div className="flex items-end gap-2 h-32">
          {data.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-1">
              <div 
                className="w-full rounded-t-sm transition-all duration-300 hover:opacity-80"
                style={{ 
                  height: `${(item.value / maxValue) * 100}%`,
                  backgroundColor: item.color,
                  minHeight: '8px'
                }}
              />
              <span className="text-xs text-muted-foreground text-center">{item.label}</span>
            </div>
          ))}
        </div>
      )
    }

    return <div className="h-32 flex items-center justify-center text-muted-foreground">No data</div>
  }

  return (
    <Card 
      style={{
        borderRadius: '24px',
        background: '#FFF',
        boxShadow: '0 9px 20px 0 rgba(46, 35, 94, 0.07)'
      }}
      className="hover:shadow-[var(--shadow-elevated)] transition-shadow"
    >
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </CardHeader>
      <CardContent>
        {renderChart()}
      </CardContent>
    </Card>
  )
}