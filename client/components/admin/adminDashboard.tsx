'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TableGrid } from '@/components/admin/tableGrid'
import { UserGrid } from '@/components/admin/userGrid'
//import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

export function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[#E3D5B8] mb-4">Admin Dashboard</h1>
        {/* <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb> */}
      </header>

      <Tabs defaultValue="tables" className="space-y-4">
        <TabsList className="bg-[#0A1929] border-b border-[#8BA7B4]/20">
          <TabsTrigger value="tables" className="text-[#8BA7B4] data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-[#8BA7B4]">
            Tables
          </TabsTrigger>
          <TabsTrigger value="users" className="text-[#8BA7B4] data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-[#8BA7B4]">
            Users
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tables">
          <TableGrid />
        </TabsContent>
        <TabsContent value="users">
          <UserGrid />
        </TabsContent>
      </Tabs>
    </div>
  )
}

