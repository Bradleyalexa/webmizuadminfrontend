import { PageHeader } from "@/src/components/ui/page-header"
import { TaskForm } from "@/src/features/tasks/components/task-form"

export default function NewTaskPage() {
  return (
    <div>
      <PageHeader title="Create Task" description="Create a new manual task for technicians." backHref="/admin/tasks" />
      <TaskForm />
    </div>
  )
}
