import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export const metadata = {
  title: "Admin Dashboard - Rekhali",
}

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  // Check if user is admin
  const { data: adminUser } = await supabase.from("admin_users").select("*").eq("id", user.id).single()

  if (!adminUser) {
    redirect("/admin/login")
  }

  const { data: products } = await supabase.from("products").select("*").order("created_at", { ascending: false })

  const { data: settings } = await supabase.from("settings").select("*")

  return <AdminDashboard products={products || []} settings={settings || []} userEmail={user.email || ""} />
}
