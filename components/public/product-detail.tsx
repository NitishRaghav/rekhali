"use client"

import { useState } from "react"
import { MessageCircle, Minus, Plus } from "lucide-react"

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
}

interface ProductDetailProps {
  product: Product
  whatsappNumber: string
}

export function ProductDetail({ product, whatsappNumber }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || "S")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const images = product.images?.length > 0 ? product.images : ["/cotton-kurti-fashion.jpg"]

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Hi! I'm interested in:\n\n` +
        `Product: ${product.name}\n` +
        `Price: Rs. ${product.price.toFixed(2)}\n` +
        `Size: ${selectedSize}\n` +
        `Quantity: ${quantity}\n\n` +
        `Please let me know the availability and delivery details.`,
    )
    const cleanNumber = whatsappNumber.replace(/[^0-9]/g, "")
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, "_blank")
  }

  return (
    <div className="flex-1">
      <div className="grid md:grid-cols-2 gap-0">
        {/* Left: Image Gallery - Shopify style vertical scroll */}
        <div className="bg-muted/30">
          {/* Thumbnails on left, main image */}
          <div className="flex">
            {/* Thumbnail strip */}
            <div className="hidden md:flex flex-col gap-2 p-4 w-24">
              {images.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`aspect-square overflow-hidden border-2 transition-colors ${
                    currentImageIndex === idx ? "border-foreground" : "border-transparent"
                  }`}
                >
                  <img src={image || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="flex-1">
              <div className="aspect-[3/4] md:aspect-auto md:h-[calc(100vh-120px)] overflow-hidden">
                <img
                  src={images[currentImageIndex] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Mobile image dots */}
          <div className="flex justify-center gap-2 py-4 md:hidden">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentImageIndex === idx ? "bg-foreground" : "bg-foreground/30"
                }`}
              />
            ))}
          </div>

          {/* Mobile thumbnails */}
          <div className="flex gap-2 px-4 pb-4 overflow-x-auto md:hidden">
            {images.map((image, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-16 h-20 flex-shrink-0 overflow-hidden border-2 ${
                  currentImageIndex === idx ? "border-foreground" : "border-transparent"
                }`}
              >
                <img src={image || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Info - Shopify style */}
        <div className="p-6 md:p-10 md:sticky md:top-[100px] md:h-fit">
          {/* Product Name */}
          <h1 className="text-2xl md:text-3xl font-normal tracking-wide">{product.name}</h1>

          {/* Price */}
          <p className="mt-4 text-lg">Rs. {product.price.toFixed(2)}</p>

          {/* Size Selector */}
          <div className="mt-8">
            <label className="text-sm">Size</label>
            <div className="mt-2 flex gap-2">
              {product.sizes?.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 text-sm border transition-colors ${
                    selectedSize === size
                      ? "border-foreground bg-foreground text-background"
                      : "border-border hover:border-foreground"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-6">
            <div className="flex items-center border border-border w-fit">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 hover:bg-muted transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-6 py-3 text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 hover:bg-muted transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* WhatsApp Button - replacing Add to Cart */}
          <button
            onClick={handleWhatsAppClick}
            disabled={!product.in_stock}
            className="mt-6 w-full py-4 bg-[#25D366] hover:bg-[#20BD5A] text-white text-sm font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <MessageCircle className="w-5 h-5" />
            Chat on WhatsApp
          </button>

          {!product.in_stock && (
            <p className="mt-2 text-sm text-muted-foreground text-center">Currently out of stock</p>
          )}

          {/* Product Details - Collapsible style like Shopify */}
          <div className="mt-10 border-t border-border">
            <details className="py-4 border-b border-border" open>
              <summary className="font-medium cursor-pointer">Details</summary>
              <div className="mt-4 text-sm text-muted-foreground space-y-2">
                {product.fabric && (
                  <p>
                    <strong>Fabric:</strong> {product.fabric}
                  </p>
                )}
                {product.description && <p>{product.description}</p>}
              </div>
            </details>

            {product.care_instructions && (
              <details className="py-4 border-b border-border">
                <summary className="font-medium cursor-pointer">
                  Keep Your Clothes Beautiful: Wash & Care Instruction
                </summary>
                <div className="mt-4 text-sm text-muted-foreground">
                  <ol className="list-decimal list-inside space-y-1">
                    {product.care_instructions.split("\n").map((instruction, idx) => (
                      <li key={idx}>{instruction.replace(/^\d+\.\s*/, "")}</li>
                    ))}
                  </ol>
                </div>
              </details>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
