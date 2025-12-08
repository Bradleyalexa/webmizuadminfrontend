"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Loader2 } from "lucide-react"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().optional(),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    console.log("Login data:", data)
    // Simulate login
    await new Promise((resolve) => setTimeout(resolve, 1000))
    router.push("/admin")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F6F9FC] p-4">
      <div className="w-full max-w-md">
        <div className="mb-6 md:mb-8 text-center">
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-[#0A2540]">Admin Panel</h1>
          <p className="mt-2 text-sm md:text-base text-muted-foreground">Sign in to your account</p>
        </div>

        <Card className="bg-white shadow-lg">
          <CardHeader className="space-y-1 pb-4 px-4 md:px-6">
            <CardTitle className="font-heading text-xl md:text-2xl font-semibold text-[#0A2540]">
              Welcome back
            </CardTitle>
            <CardDescription className="text-sm">Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent className="px-4 md:px-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#333333] text-sm">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@company.com"
                  {...register("email")}
                  className="border-border bg-white focus:border-[#00C49A] focus:ring-[#00C49A]"
                />
                {errors.email && <p className="text-xs md:text-sm text-destructive">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-[#333333] text-sm">
                    Password
                  </Label>
                  <Link href="/forgot-password" className="text-xs md:text-sm text-[#00C49A] hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password")}
                    className="border-border bg-white pr-10 focus:border-[#00C49A] focus:ring-[#00C49A]"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:bg-transparent hover:text-[#0A2540]"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.password && <p className="text-xs md:text-sm text-destructive">{errors.password.message}</p>}
              </div>

              <Controller
                name="rememberMe"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox id="rememberMe" checked={field.value} onCheckedChange={field.onChange} />
                    <Label htmlFor="rememberMe" className="text-xs md:text-sm text-muted-foreground">
                      Remember me
                    </Label>
                  </div>
                )}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#00C49A] text-white hover:bg-[#00a883]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-xs md:text-sm">
              <span className="text-muted-foreground">Don&apos;t have an account? </span>
              <Link href="/signup" className="font-medium text-[#00C49A] hover:underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
