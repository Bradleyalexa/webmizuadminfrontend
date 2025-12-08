import { PageHeader } from "@/src/components/ui/page-header"
import { TaskList } from "@/src/features/tasks/components/task-list"

export default function TasksPage() {
  return (
    <div>
      <PageHeader title="Tasks" description="View and manage daily tasks and schedules." />
      <TaskList />
    </div>
  )
}
