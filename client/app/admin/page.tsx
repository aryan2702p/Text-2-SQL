'use client'
import { NavBar } from '@/components/nav-bar'
import { AdminDashboard } from '@/components/admin/adminDashboard'

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#051421]">
      <NavBar />
      <AdminDashboard />
    </div>
  )
}

