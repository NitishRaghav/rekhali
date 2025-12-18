import { db } from "@/server/db"
import { products as productsTable } from "@/shared/schema"
import { Header } from "@/components/public/header"
import { Footer } from "@/components/public/footer"
import { ProductCard } from "@/components/public/product-card"
import { desc } from "drizzle-orm"

export const metadata = {
  title: "Products – Rekhali",
  description: "Browse our collection of handcrafted kurtas by rural women artisans.",
}

export default async function ProductsPage() {
  try {
    const products = await db.query.products.findMany({
      orderBy: [desc(productsTable.created_at)],
    })
    
    return renderProducts(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return renderProducts([])
  }
}

function renderProducts(products: any[]) {

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 px-4 py-8 md:px-6">
        {/* Page Title */}
        <h1 className="text-2xl md:text-3xl font-normal mb-8">Products</h1>

        {/* Filters Row */}
        <div className="flex items-center justify-between mb-6 text-sm">
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">{products.length} items</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Sort</span>
            <select className="bg-transparent border-none outline-none text-foreground cursor-pointer">
              <option>Featured</option>
              <option>Price, low to high</option>
              <option>Price, high to low</option>
              <option>Date, new to old</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No products available yet.</p>
            <p className="text-sm text-muted-foreground mt-2">Add products from the admin dashboard.</p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
