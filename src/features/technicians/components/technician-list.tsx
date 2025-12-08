"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge } from "@/src/components/ui/status-badge"
import type { Technician } from "@/src/types"

const mockTechnicians: Technician[] = [
  {
    id: "t1",
    name: "Tom Wilson",
    email: "tom@company.com",
    phone: "+1 (555) 987-6543",
    specialization: "HVAC",
    isActive: true,
  },
  {
    id: "t2",
    name: "Jane Cooper",
    email: "jane@company.com",
    phone: "+1 (555) 876-5432",
    specialization: "Smart Home",
    isActive: true,
  },
  {
    id: "t3",
    name: "Alex Martinez",
    email: "alex@company.com",
    phone: "+1 (555) 765-4321",
    specialization: "General",
    isActive: true,
  },
  {
    id: "t4",
    name: "Chris Johnson",
    email: "chris@company.com",
    phone: "+1 (555) 654-3210",
    specialization: "HVAC",
    isActive: false,
  },
]

export function TechnicianList() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTechnicians = mockTechnicians.filter(
    (tech) =>
      tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.specialization.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="relative w-full sm:w-80">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search technicians..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 bg-white border-border focus:border-[#00C49A] focus:ring-[#00C49A]"
        />
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredTechnicians.map((tech) => (
          <Card
            key={tech.id}
            onClick={() => router.push(`/admin/technicians/${tech.id}`)}
            className="cursor-pointer bg-white shadow-sm transition-all duration-200 ease-out hover:shadow-md hover:border-[#00C49A]/30"
          >
            <CardContent className="p-4 md:p-6">
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-[#00C49A]/10 text-base md:text-lg font-bold text-[#00C49A]">
                  {tech.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <StatusBadge
                  status={tech.isActive ? "Active" : "Inactive"}
                  variant={tech.isActive ? "success" : "error"}
                />
              </div>
              <div className="mt-3 md:mt-4">
                <h3 className="font-heading font-semibold text-[#0A2540] text-sm md:text-base">{tech.name}</h3>
                <span className="inline-block mt-1 rounded-full bg-[#0A2540]/10 px-2 py-0.5 text-xs font-medium text-[#0A2540]">
                  {tech.specialization}
                </span>
              </div>
              <div className="mt-2 md:mt-3 space-y-1 text-xs md:text-sm text-muted-foreground">
                <p className="truncate">{tech.email}</p>
                <p>{tech.phone}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
