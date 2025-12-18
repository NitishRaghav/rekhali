import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface Product {
  id: string
  name: string
  slug: string
  price: number
  original_price?: number
  images: string[]
  in_stock: boolean
}

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">No products available yet. Check back soon!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <Link key={product.id} href={`/products/${product.id}`}>
          <Card className="group overflow-hidden border-0 bg-transparent shadow-none transition-all hover:shadow-lg">
            <CardContent className="p-0">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
                <Image
                  src={product.images?.[0] || "/placeholder.svg?height=600&width=450&query=kurta fashion"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {!product.in_stock && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <span className="rounded-full bg-white px-4 py-2 text-sm font-medium">Sold Out</span>
                  </div>
                )}
              </div>
              <div className="mt-4 space-y-1">
                <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-foreground">Rs. {product.price.toFixed(2)}</span>
                  {product.original_price && product.original_price > product.price && (
                    <span className="text-sm text-muted-foreground line-through">
                      Rs. {product.original_price.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
