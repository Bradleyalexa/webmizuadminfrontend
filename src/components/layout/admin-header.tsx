"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Bell, User, X, Check, Clock, AlertCircle, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"

const mockNotifications = [
  {
    id: "1",
    type: "service",
    title: "New Service Request",
    message: "John Smith requested AC maintenance",
    time: "5 min ago",
    read: false,
  },
  {
    id: "2",
    type: "task",
    title: "Task Completed",
    message: "Tom Wilson completed thermostat installation",
    time: "1 hour ago",
    read: false,
  },
  {
    id: "3",
    type: "alert",
    title: "Contract Expiring",
    message: "Contract #C-2024-087 expires in 7 days",
    time: "2 hours ago",
    read: true,
  },
  {
    id: "4",
    type: "service",
    title: "Reschedule Request",
    message: "Sarah Johnson requested to reschedule service",
    time: "3 hours ago",
    read: true,
  },
]

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "service":
      return <Clock className="h-4 w-4 text-[#00C49A]" />
    case "task":
      return <Check className="h-4 w-4 text-[#00C49A]" />
    case "alert":
      return <AlertCircle className="h-4 w-4 text-amber-500" />
    default:
      return <Bell className="h-4 w-4 text-muted-foreground" />
  }
}

interface AdminHeaderProps {
  onMenuClick: () => void
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [isMounted, setIsMounted] = useState(false)
  const unreadCount = notifications.filter((n) => !n.read).length

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const clearNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const handleMenuClick = () => {
    onMenuClick()
  }

  if (!isMounted) {
    return (
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-white px-4 md:px-6">
         {/* Static placeholder to prevent layout shift */}
         <div className="w-10 h-10" />
         <div className="flex gap-2">
            <div className="w-10 h-10 bg-slate-100 rounded-full" />
            <div className="w-10 h-10 bg-slate-100 rounded-full" />
         </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-white px-4 md:px-6">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleMenuClick}
        onTouchEnd={(e) => {
          e.preventDefault()
          handleMenuClick()
        }}
        className="lg:hidden text-[#333333] hover:bg-[#F6F9FC] min-w-[44px] min-h-[44px]"
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Open menu</span>
      </Button>

      <div className="hidden lg:block" />

      <div className="flex items-center gap-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-[#333333] hover:bg-[#F6F9FC] min-w-[44px] min-h-[44px]"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#00C49A] text-[10px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
              <span className="sr-only">Notifications</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-md">
            <SheetHeader className="border-b border-border pb-4">
              <div className="flex items-center justify-between">
                <SheetTitle className="font-heading text-lg font-semibold text-[#0A2540]">Notifications</SheetTitle>
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-xs text-[#00C49A] hover:text-[#00a883] hover:bg-[#00C49A]/10"
                  >
                    Mark all as read
                  </Button>
                )}
              </div>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-8rem)] py-4">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Bell className="h-12 w-12 text-muted-foreground/30" />
                  <p className="mt-4 text-sm text-muted-foreground">No notifications</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => markAsRead(notification.id)}
                      className={`group relative cursor-pointer rounded-lg border p-4 transition-all duration-200 ${
                        notification.read ? "border-border bg-white" : "border-[#00C49A]/30 bg-[#00C49A]/5"
                      } hover:border-[#00C49A]/50 hover:bg-[#F6F9FC]`}
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          clearNotification(notification.id)
                        }}
                        className="absolute right-2 top-2 h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F6F9FC]">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 pr-6">
                          <p className="font-medium text-[#0A2540]">{notification.title}</p>
                          <p className="mt-0.5 text-sm text-muted-foreground">{notification.message}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{notification.time}</p>
                        </div>
                      </div>
                      {!notification.read && (
                        <div className="absolute left-2 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#00C49A]" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </SheetContent>
        </Sheet>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-[#333333] hover:bg-[#F6F9FC] min-w-[44px] min-h-[44px]">
              <User className="h-5 w-5" />
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/admin/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/admin/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="text-destructive">
              <Link href="/login">Sign out</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
