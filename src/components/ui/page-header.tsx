import type React from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PageHeaderProps {
  title: string
  description?: string
  children?: React.ReactNode
  backHref?: string
}

export function PageHeader({ title, description, children, backHref }: PageHeaderProps) {
  return (
    <div className="mb-6 md:mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        {backHref && (
          <Link href={backHref}>
            <Button variant="ghost" size="icon" className="text-[#0A2540] hover:bg-[#F6F9FC] shrink-0">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
        )}
        <div>
          <h1 className="font-heading text-xl md:text-2xl font-bold text-[#0A2540]">{title}</h1>
          {description && <p className="mt-1 text-xs md:text-sm text-muted-foreground">{description}</p>}
        </div>
      </div>
      {children && <div className="flex items-center gap-2 md:gap-3">{children}</div>}
    </div>
  )
}
