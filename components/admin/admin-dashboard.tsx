"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogOut, Package, Settings } from "lucide-react"
import { ProductManagement } from "./product-management"
import { SettingsPanel } from "./settings-panel"

interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  original_price?: number
  images: string[]
  sizes: string[]
  fabric?: string
  care_instructions?: string
  in_stock: boolean
  featured: boolean
  created_at: string
}

interface Setting {
  id: string
  key: string
  value: string
}

interface AdminDashboardProps {
  products: Product[]
  settings: Setting[]
  userEmail: string
}

export function AdminDashboard({ products, settings, userEmail }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("products")
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-semibold text-primary">Rekhali Admin</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{userEmail}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="products" className="gap-2">
              <Package className="h-4 w-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <ProductManagement initialProducts={products} />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsPanel initialSettings={settings} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
