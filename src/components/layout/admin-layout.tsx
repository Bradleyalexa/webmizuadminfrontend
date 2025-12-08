"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { AdminSidebar } from "./admin-sidebar"
import { AdminHeader } from "./admin-header"

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleOpenSidebar = useCallback(() => {
    setSidebarOpen(true)
  }, [])

  const handleCloseSidebar = useCallback(() => {
    setSidebarOpen(false)
  }, [])

  return (
    <div className="min-h-screen bg-[#F6F9FC]">
      <AdminSidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />
      <div className="lg:ml-64 transition-all duration-200 ease-out">
        <AdminHeader onMenuClick={handleOpenSidebar} />
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
