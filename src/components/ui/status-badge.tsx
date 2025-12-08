import { cn } from "@/lib/utils"

type StatusVariant = "success" | "warning" | "error" | "info" | "default"

interface StatusBadgeProps {
  status: string
  variant?: StatusVariant
  className?: string
}

const variantStyles: Record<StatusVariant, string> = {
  success: "bg-[#00C49A]/10 text-[#00C49A] border-[#00C49A]/20",
  warning: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  error: "bg-red-500/10 text-red-600 border-red-500/20",
  info: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  default: "bg-gray-500/10 text-gray-600 border-gray-500/20",
}

export function StatusBadge({ status, variant = "default", className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
        variantStyles[variant],
        className,
      )}
    >
      {status}
    </span>
  )
}
