import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { db } from "@/server/db"
import { adminUsers, products, settings } from "@/shared/schema"
import { eq } from "drizzle-orm"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export const metadata = {
  title: "Admin Dashboard - Rekhali",
}

export default async function AdminDashboardPage() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get("admin_session")?.value

  if (!sessionId) {
    redirect("/admin/login")
  }

  // Get admin user
  const adminUser = await db.query.adminUsers.findFirst({
    where: eq(adminUsers.id, sessionId),
  })

  if (!adminUser) {
    redirect("/admin/login")
  }

  // Get products and settings
  const productsList = await db.query.products.findMany()
  const settingsList = await db.query.settings.findMany()

  return <AdminDashboard products={productsList || []} settings={settingsList || []} userEmail={adminUser.email || ""} />
}
