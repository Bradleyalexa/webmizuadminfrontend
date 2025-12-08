import { PageHeader } from "@/src/components/ui/page-header"
import { TaskEditForm } from "@/src/features/tasks/components/task-edit-form"

export default async function EditTaskPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div>
      <PageHeader title="Edit Task" description="Update task details." backHref={`/admin/tasks/${id}`} />
      <TaskEditForm taskId={id} />
    </div>
  )
}
