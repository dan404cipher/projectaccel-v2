import { Card, CardContent } from "@/components/ui/card"

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  variant?: "default" | "accent" | "warning" | "success"
}

export function StatCard({ title, value, subtitle, variant = "default" }: StatCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "accent":
        return "border-l-4 border-l-accent"
      case "warning":
        return "border-l-4 border-l-chart-warning"
      case "success":
        return "border-l-4 border-l-chart-accent"
      default:
        return "border-l-4 border-l-primary"
    }
  }

  return (
    <Card 
      className={`transition-shadow ${getVariantStyles()}`}
      style={{
        borderRadius: '24px',
        background: '#FFF',
        boxShadow: '0 9px 20px 0 rgba(46, 35, 94, 0.07)',
        width: '260px',
        height: '140px'
      }}
    >
      <CardContent className="p-6 h-full flex flex-col justify-center">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}