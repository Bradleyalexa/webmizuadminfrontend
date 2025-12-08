"use client"

import { useState } from "react"
import { ChatSidebar } from "./chat-sidebar"
import { ChatWindow } from "./chat-window"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import type { ChatConversation } from "@/src/types"

const mockConversations: ChatConversation[] = [
  {
    id: "conv1",
    customerId: "1",
    customer: {
      id: "1",
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "",
      address: "",
      createdAt: "",
      updatedAt: "",
    },
    lastMessage: "Thanks for the quick response!",
    lastMessageAt: "2025-06-09T10:30:00",
    unreadCount: 0,
  },
  {
    id: "conv2",
    customerId: "2",
    customer: {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "",
      address: "",
      createdAt: "",
      updatedAt: "",
    },
    lastMessage: "When can I expect the technician?",
    lastMessageAt: "2025-06-09T09:45:00",
    unreadCount: 2,
  },
  {
    id: "conv3",
    customerId: "3",
    customer: {
      id: "3",
      name: "Mike Davis",
      email: "mike.davis@email.com",
      phone: "",
      address: "",
      createdAt: "",
      updatedAt: "",
    },
    lastMessage: "My AC is making a strange noise",
    lastMessageAt: "2025-06-08T16:20:00",
    unreadCount: 1,
  },
  {
    id: "conv4",
    customerId: "4",
    customer: {
      id: "4",
      name: "Emily Brown",
      email: "emily.b@email.com",
      phone: "",
      address: "",
      createdAt: "",
      updatedAt: "",
    },
    lastMessage: "Got it, thank you!",
    lastMessageAt: "2025-06-08T14:10:00",
    unreadCount: 0,
  },
  {
    id: "conv5",
    customerId: "5",
    customer: {
      id: "5",
      name: "David Wilson",
      email: "david.w@email.com",
      phone: "",
      address: "",
      createdAt: "",
      updatedAt: "",
    },
    lastMessage: "Is there any update on my service request?",
    lastMessageAt: "2025-06-07T11:30:00",
    unreadCount: 3,
  },
  {
    id: "conv6",
    customerId: "6",
    customer: {
      id: "6",
      name: "Jennifer Lee",
      email: "jennifer.lee@email.com",
      phone: "",
      address: "",
      createdAt: "",
      updatedAt: "",
    },
    lastMessage: "The technician was very helpful!",
    lastMessageAt: "2025-06-06T09:15:00",
    unreadCount: 0,
  },
  {
    id: "conv7",
    customerId: "7",
    customer: {
      id: "7",
      name: "Robert Martinez",
      email: "robert.m@email.com",
      phone: "",
      address: "",
      createdAt: "",
      updatedAt: "",
    },
    lastMessage: "Can I reschedule my appointment?",
    lastMessageAt: "2025-06-05T14:30:00",
    unreadCount: 1,
  },
  {
    id: "conv8",
    customerId: "8",
    customer: {
      id: "8",
      name: "Amanda Clark",
      email: "amanda.c@email.com",
      phone: "",
      address: "",
      createdAt: "",
      updatedAt: "",
    },
    lastMessage: "Thank you for the invoice",
    lastMessageAt: "2025-06-04T11:00:00",
    unreadCount: 0,
  },
]

export function ChatLayout() {
  const [selectedConversation, setSelectedConversation] = useState<ChatConversation | null>(null)
  const [conversations, setConversations] = useState(mockConversations)

  const handleSelectConversation = (conversation: ChatConversation) => {
    setSelectedConversation(conversation)
    // Mark as read
    setConversations((prev) => prev.map((c) => (c.id === conversation.id ? { ...c, unreadCount: 0 } : c)))
  }

  const handleBack = () => {
    setSelectedConversation(null)
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] overflow-hidden rounded-xl border border-border bg-white shadow-sm">
      <div className={`${selectedConversation ? "hidden md:flex" : "flex"} w-full md:w-80 flex-shrink-0`}>
        <ChatSidebar
          conversations={conversations}
          selectedConversation={selectedConversation}
          onSelectConversation={handleSelectConversation}
        />
      </div>

      <div className={`${selectedConversation ? "flex" : "hidden md:flex"} flex-1 flex-col`}>
        {selectedConversation ? (
          <>
            {/* Mobile back button */}
            <div className="md:hidden flex items-center gap-2 border-b border-border p-3 bg-white">
              <Button variant="ghost" size="icon" onClick={handleBack} className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <span className="font-medium text-[#0A2540]">{selectedConversation.customer?.name}</span>
            </div>
            <ChatWindow conversation={selectedConversation} />
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center bg-[#F6F9FC]">
            <div className="text-center">
              <p className="text-lg font-medium text-[#0A2540]">Select a conversation</p>
              <p className="text-sm text-muted-foreground">Choose a customer from the sidebar to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
