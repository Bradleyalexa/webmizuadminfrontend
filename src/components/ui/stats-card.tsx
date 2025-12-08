import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

export function StatsCard({ title, value, icon: Icon, trend, className }: StatsCardProps) {
  return (
    <Card className={cn("bg-white shadow-sm", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="mt-2 font-heading text-3xl font-bold text-[#0A2540]">{value}</p>
            {trend && (
              <p className={cn("mt-1 text-sm font-medium", trend.isPositive ? "text-[#00C49A]" : "text-destructive")}>
                {trend.isPositive ? "+" : "-"}
                {Math.abs(trend.value)}% from last month
              </p>
            )}
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00C49A]/10">
            <Icon className="h-6 w-6 text-[#00C49A]" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
