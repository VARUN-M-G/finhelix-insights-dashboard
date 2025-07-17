import { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  icon?: ReactNode
  className?: string
}

export function MetricCard({ 
  title, 
  value, 
  subtitle, 
  trend, 
  trendValue, 
  icon,
  className 
}: MetricCardProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      case "neutral":
        return <Minus className="h-4 w-4 text-yellow-500" />
      default:
        return null
    }
  }

  const getTrendBadgeVariant = () => {
    switch (trend) {
      case "up":
        return "default"
      case "down":
        return "destructive"
      case "neutral":
        return "secondary"
      default:
        return "secondary"
    }
  }

  return (
    <Card className={cn("glass-card animate-fade-in", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && (
          <div className="text-muted-foreground">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground mb-1">
          {value}
        </div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mb-2">
            {subtitle}
          </p>
        )}
        {trend && trendValue && (
          <div className="flex items-center space-x-2">
            <Badge variant={getTrendBadgeVariant()} className="flex items-center space-x-1">
              {getTrendIcon()}
              <span className="text-xs">{trendValue}</span>
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  )
}