"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Mail, Phone, Briefcase } from "lucide-react"

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  role: z.string(),
  department: z.string(),
})

type ProfileFormData = z.infer<typeof profileSchema>

const mockProfile = {
  firstName: "Admin",
  lastName: "User",
  email: "admin@company.com",
  phone: "+1 (555) 123-4567",
  role: "Administrator",
  department: "Operations",
  avatar: "",
}

export function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: mockProfile,
  })

  const onSubmit = async (data: ProfileFormData) => {
    console.log("Profile data:", data)
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={mockProfile.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-[#00C49A]/10 text-2xl font-bold text-[#00C49A]">
                  {mockProfile.firstName[0]}
                  {mockProfile.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="outline"
                className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full border-[#00C49A] bg-white"
              >
                <Camera className="h-4 w-4 text-[#00C49A]" />
              </Button>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="font-heading text-2xl font-bold text-[#0A2540]">
                {mockProfile.firstName} {mockProfile.lastName}
              </h2>
              <p className="text-muted-foreground">{mockProfile.role}</p>
              <div className="mt-4 flex flex-wrap justify-center gap-4 sm:justify-start">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{mockProfile.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{mockProfile.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Briefcase className="h-4 w-4" />
                  <span>{mockProfile.department}</span>
                </div>
              </div>
            </div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant="outline"
              className="border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white bg-transparent"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {isEditing && (
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading text-lg font-semibold text-[#0A2540]">Edit Profile</CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-[#333333]">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    {...register("firstName")}
                    className="border-border bg-white focus:border-[#00C49A] focus:ring-[#00C49A]"
                  />
                  {errors.firstName && <p className="text-sm text-destructive">{errors.firstName.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-[#333333]">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    {...register("lastName")}
                    className="border-border bg-white focus:border-[#00C49A] focus:ring-[#00C49A]"
                  />
                  {errors.lastName && <p className="text-sm text-destructive">{errors.lastName.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#333333]">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="border-border bg-white focus:border-[#00C49A] focus:ring-[#00C49A]"
                  />
                  {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-[#333333]">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    {...register("phone")}
                    className="border-border bg-white focus:border-[#00C49A] focus:ring-[#00C49A]"
                  />
                  {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting} className="bg-[#00C49A] text-white hover:bg-[#00a883]">
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
