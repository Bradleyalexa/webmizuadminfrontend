"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import type { ChatConversation } from "@/src/types"

interface ChatSidebarProps {
  conversations: ChatConversation[]
  selectedConversation: ChatConversation | null
  onSelectConversation: (conversation: ChatConversation) => void
}

export function ChatSidebar({ conversations, selectedConversation, onSelectConversation }: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredConversations = conversations.filter((conv) =>
    conv.customer?.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    } else if (diffDays === 1) {
      return "Yesterday"
    } else if (diffDays < 7) {
      return date.toLocaleDateString("en-US", { weekday: "short" })
    } else {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    }
  }

  return (
    <div className="flex w-full md:w-80 flex-col border-r border-border bg-white h-full">
      <div className="border-b border-border p-4 flex-shrink-0">
        <h2 className="font-heading text-lg font-semibold text-[#0A2540]">Support Chat</h2>
        <div className="relative mt-3">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-[#F6F9FC] border-transparent focus:border-[#00C49A] focus:ring-[#00C49A]"
          />
        </div>
      </div>

      <ScrollArea className="flex-1 min-h-0">
        <div className="p-2">
          {filteredConversations.map((conversation) => {
            const isSelected = selectedConversation?.id === conversation.id
            const hasUnread = conversation.unreadCount > 0

            return (
              <button
                key={conversation.id}
                onClick={() => onSelectConversation(conversation)}
                className={cn(
                  "w-full rounded-lg p-3 text-left transition-all duration-200 ease-out",
                  isSelected ? "bg-[#00C49A]/10" : "hover:bg-[#F6F9FC]",
                )}
              >
                <div className="flex items-start gap-3">
                  {/* Avatar with online indicator */}
                  <div className="relative flex-shrink-0">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold",
                        isSelected ? "bg-[#00C49A] text-white" : "bg-[#0A2540]/10 text-[#0A2540]",
                      )}
                    >
                      {conversation.customer?.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    {/* Online indicator */}
                    {conversation.unreadCount > 0 && (
                      <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-[#00C49A]" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={cn(
                          "font-medium truncate",
                          hasUnread ? "text-[#0A2540]" : "text-[#333333]",
                          isSelected && "text-[#0A2540]",
                        )}
                      >
                        {conversation.customer?.name}
                      </span>
                      <span className="text-xs text-muted-foreground flex-shrink-0">
                        {conversation.lastMessageAt ? formatTime(conversation.lastMessageAt) : ""}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-1 gap-2">
                      <p
                        className={cn(
                          "text-sm truncate",
                          hasUnread ? "font-medium text-[#333333]" : "text-muted-foreground",
                        )}
                      >
                        {conversation.lastMessage}
                      </p>
                      {hasUnread && (
                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#00C49A] px-1.5 text-xs font-medium text-white flex-shrink-0">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            )
          })}

          {filteredConversations.length === 0 && (
            <div className="py-8 text-center text-sm text-muted-foreground">No conversations found</div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
