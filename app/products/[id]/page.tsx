import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/public/header"
import { Footer } from "@/components/public/footer"
import { ProductDetail } from "@/components/public/product-detail"
import { notFound } from "next/navigation"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params
  const supabase = await createClient()
  const { data: product } = await supabase.from("products").select("*").eq("id", id).single()

  if (!product) {
    return { title: "Product Not Found – Rekhali" }
  }

  return {
    title: `${product.name} – Rekhali`,
    description: product.description || `Shop ${product.name} at Rekhali`,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: product } = await supabase.from("products").select("*").eq("id", id).single()

  if (!product) {
    notFound()
  }

  const { data: settings } = await supabase.from("settings").select("*").eq("key", "whatsapp_number").single()

  const whatsappNumber = settings?.value || "+919876543210"

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <ProductDetail product={product} whatsappNumber={whatsappNumber} />
      <div className="flex-1" />
      <Footer />
    </main>
  )
}
