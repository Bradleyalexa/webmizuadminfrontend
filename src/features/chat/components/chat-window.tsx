"use client"

import type React from "react"
import { ImageIcon } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { Send, Paperclip, MoreVertical, Phone, Video, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import type { ChatConversation, ChatMessage } from "@/src/types"

interface ChatWindowProps {
  conversation: ChatConversation
}

const mockMessages: Record<string, ChatMessage[]> = {
  conv1: [
    {
      id: "m1",
      conversationId: "conv1",
      senderId: "1",
      senderType: "customer",
      content: "Hi, I need help with my air conditioner. It's not cooling properly.",
      createdAt: "2025-06-09T09:00:00",
    },
    {
      id: "m2",
      conversationId: "conv1",
      senderId: "admin",
      senderType: "admin",
      content:
        "Hello John! I'm sorry to hear that. Can you tell me when you first noticed the issue? Also, what model is your AC unit?",
      createdAt: "2025-06-09T09:05:00",
    },
    {
      id: "m3",
      conversationId: "conv1",
      senderId: "1",
      senderType: "customer",
      content: "It started yesterday. I have the Air Conditioner Pro 5000.",
      createdAt: "2025-06-09T09:10:00",
    },
    {
      id: "m4",
      conversationId: "conv1",
      senderId: "admin",
      senderType: "admin",
      content:
        "Thank you for the information. I've checked your account and I can see you have an active maintenance contract. I'll schedule a technician visit for tomorrow. Would that work for you?",
      createdAt: "2025-06-09T09:15:00",
    },
    {
      id: "m5",
      conversationId: "conv1",
      senderId: "1",
      senderType: "customer",
      content: "Yes, tomorrow works! What time?",
      createdAt: "2025-06-09T09:20:00",
    },
    {
      id: "m6",
      conversationId: "conv1",
      senderId: "admin",
      senderType: "admin",
      content:
        "I've scheduled Tom Wilson to visit between 9:00 AM - 11:00 AM tomorrow. You'll receive a confirmation email shortly.",
      createdAt: "2025-06-09T09:25:00",
    },
    {
      id: "m7",
      conversationId: "conv1",
      senderId: "1",
      senderType: "customer",
      content: "Thanks for the quick response!",
      createdAt: "2025-06-09T10:30:00",
    },
  ],
  conv2: [
    {
      id: "m1",
      conversationId: "conv2",
      senderId: "2",
      senderType: "customer",
      content: "Hello, I scheduled a service for my thermostat. When can I expect the technician?",
      createdAt: "2025-06-09T09:30:00",
    },
    {
      id: "m2",
      conversationId: "conv2",
      senderId: "2",
      senderType: "customer",
      content: "When can I expect the technician?",
      createdAt: "2025-06-09T09:45:00",
    },
  ],
  conv3: [
    {
      id: "m1",
      conversationId: "conv3",
      senderId: "3",
      senderType: "customer",
      content: "My AC is making a strange noise",
      createdAt: "2025-06-08T16:20:00",
    },
  ],
  conv4: [],
  conv5: [],
}

export function ChatWindow({ conversation }: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages[conversation.id] || [])
  const [newMessage, setNewMessage] = useState("")
  const [attachment, setAttachment] = useState<File | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Update messages when conversation changes
  useEffect(() => {
    setMessages(mockMessages[conversation.id] || [])
  }, [conversation.id])

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim() && !attachment) return

    const message: ChatMessage = {
      id: `m${Date.now()}`,
      conversationId: conversation.id,
      senderId: "admin",
      senderType: "admin",
      content: newMessage,
      attachmentUrl: attachment ? URL.createObjectURL(attachment) : undefined,
      createdAt: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")
    setAttachment(null)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAttachment(file)
    }
  }

  const formatMessageTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatDateDivider = (dateStr: string) => {
    const date = new Date(dateStr)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
    }
  }

  // Group messages by date
  const groupedMessages: { date: string; messages: ChatMessage[] }[] = []
  messages.forEach((message) => {
    const dateStr = new Date(message.createdAt).toDateString()
    const existingGroup = groupedMessages.find((g) => g.date === dateStr)
    if (existingGroup) {
      existingGroup.messages.push(message)
    } else {
      groupedMessages.push({ date: dateStr, messages: [message] })
    }
  })

  // Check if customer is online (mock - based on unread count)
  const isOnline = (conversation.unreadCount ?? 0) > 0

  return (
    <div className="flex flex-1 flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-white px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00C49A] text-sm font-bold text-white">
              {conversation.customer?.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <span
              className={cn(
                "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white",
                isOnline ? "bg-[#00C49A]" : "bg-gray-400",
              )}
            />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-[#0A2540]">{conversation.customer?.name}</h3>
            <p className="text-xs text-muted-foreground">{isOnline ? "Online" : "Offline"}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-[#0A2540] hover:bg-[#F6F9FC]">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-[#0A2540] hover:bg-[#F6F9FC]">
            <Video className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-[#0A2540] hover:bg-[#F6F9FC]">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Customer Profile</DropdownMenuItem>
              <DropdownMenuItem>View Service History</DropdownMenuItem>
              <DropdownMenuItem>Mark as Resolved</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Block Customer</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 bg-[#F6F9FC]" ref={scrollRef}>
        <div className="p-6 space-y-6">
          {groupedMessages.map((group) => (
            <div key={group.date}>
              {/* Date divider */}
              <div className="flex items-center justify-center mb-4">
                <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
                  {formatDateDivider(group.messages[0].createdAt)}
                </span>
              </div>

              {/* Messages for this date */}
              <div className="space-y-4">
                {group.messages.map((message) => {
                  const isAdmin = message.senderType === "admin"

                  return (
                    <div key={message.id} className={cn("flex", isAdmin ? "justify-end" : "justify-start")}>
                      <div
                        className={cn(
                          "max-w-[70%] rounded-2xl px-4 py-3",
                          isAdmin
                            ? "bg-[#00C49A] text-white rounded-br-md"
                            : "bg-white text-[#333333] shadow-sm rounded-bl-md",
                        )}
                      >
                        {message.attachmentUrl && (
                          <img
                            src={message.attachmentUrl || "/placeholder.svg"}
                            alt="Attachment"
                            className="mb-2 max-w-full rounded-lg"
                          />
                        )}
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <p
                          className={cn(
                            "mt-1 text-right text-[10px]",
                            isAdmin ? "text-white/70" : "text-muted-foreground",
                          )}
                        >
                          {formatMessageTime(message.createdAt)}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}

          {messages.length === 0 && (
            <div className="flex h-full items-center justify-center py-20">
              <div className="text-center">
                <p className="text-muted-foreground">No messages yet</p>
                <p className="text-sm text-muted-foreground">Start the conversation!</p>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Attachment preview */}
      {attachment && (
        <div className="border-t border-border bg-white px-4 py-2">
          <div className="flex items-center gap-2 rounded-lg bg-[#F6F9FC] p-2">
            <ImageIcon className="h-5 w-5 text-muted-foreground" />
            <span className="flex-1 truncate text-sm text-[#333333]">{attachment.name}</span>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setAttachment(null)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-border bg-white p-4">
        <div className="flex items-center gap-3">
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-[#00C49A] hover:bg-[#00C49A]/10"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 border-transparent bg-[#F6F9FC] focus:border-[#00C49A] focus:ring-[#00C49A]"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() && !attachment}
            className="bg-[#00C49A] text-white hover:bg-[#00a883] disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
