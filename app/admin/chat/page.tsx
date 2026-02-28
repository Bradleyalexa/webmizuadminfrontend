import { PageHeader } from "@/src/components/ui/page-header"
import { ChatLayout } from "@/src/features/chat/components/chat-layout"

export default function ChatPage() {
  return (
    <div>
      <PageHeader title="Support Chat" description="Communicate with customers and resolve support inquiries." />
      <ChatLayout />
    </div>
  )
} {/* trigger build */}
