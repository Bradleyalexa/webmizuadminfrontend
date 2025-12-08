import { PageHeader } from "@/src/components/ui/page-header"
import { ProfilePage } from "@/src/features/profile/components/profile-page"

export default function AdminProfilePage() {
  return (
    <div>
      <PageHeader title="Profile" description="Manage your profile information." />
      <ProfilePage />
    </div>
  )
}
