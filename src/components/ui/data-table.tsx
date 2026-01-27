"use client"

import type React from "react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Column<T> {
  key: string
  header: string
  render?: (item: T) => React.ReactNode
  className?: string
  hideOnMobile?: boolean
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  page?: number
  totalPages?: number
  onPageChange?: (page: number) => void
  onRowClick?: (item: T) => void
  isLoading?: boolean
  emptyMessage?: string
}

export function DataTable<T extends { id: string }>({
  columns,
  data,
  page = 1,
  totalPages = 1,
  onPageChange,
  onRowClick,
  isLoading,
  emptyMessage = "No data found",
}: DataTableProps<T>) {
  return (
    <div className="rounded-xl border border-border bg-white shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F6F9FC] hover:bg-[#F6F9FC]">
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className={cn(
                    "font-heading font-semibold text-[#0A2540] text-xs md:text-sm whitespace-nowrap",
                    column.className,
                    column.hideOnMobile && "hidden md:table-cell",
                  )}
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow key="loading">
                <TableCell colSpan={columns.length} className="h-32 text-center">
                  <div className="flex items-center justify-center">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#00C49A] border-t-transparent" />
                  </div>
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow key="empty">
                <TableCell colSpan={columns.length} className="h-32 text-center text-muted-foreground">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              data.map((item, index) => (
                <TableRow
                  key={item.id}
                  onClick={() => onRowClick?.(item)}
                  className={cn(
                    "transition-colors duration-200 ease-out",
                    index % 2 === 1 && "bg-[#F6F9FC]/50",
                    onRowClick && "cursor-pointer hover:bg-[#00C49A]/5",
                  )}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={column.key}
                      className={cn(
                        "text-xs md:text-sm",
                        column.className,
                        column.hideOnMobile && "hidden md:table-cell",
                      )}
                    >
                      {column.render
                        ? column.render(item)
                        : ((item as Record<string, unknown>)[column.key]?.toString() ?? "-")}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border px-4 py-3">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange?.(page - 1)}
              disabled={page <= 1}
              className="border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white text-xs md:text-sm"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              <span className="hidden sm:inline">Previous</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange?.(page + 1)}
              disabled={page >= totalPages}
              className="border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white text-xs md:text-sm"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
