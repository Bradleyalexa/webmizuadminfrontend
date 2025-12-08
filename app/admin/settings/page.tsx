import { PageHeader } from "@/src/components/ui/page-header"
import { SettingsPage } from "@/src/features/settings/components/settings-page"

export default function AdminSettingsPage() {
  return (
    <div>
      <PageHeader title="Settings" description="Manage your account and application settings." />
      <SettingsPage />
    </div>
  )
}
