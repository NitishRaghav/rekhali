"use client"

import Link from "next/link"
import { useState } from "react"

interface Product {
  id: string
  name: string
  slug: string
  price: number
  images: string[]
  sizes: string[]
}

export function ProductCard({ product }: { product: Product }) {
  const [currentImage, setCurrentImage] = useState(0)
  const [showSizes, setShowSizes] = useState(false)

  const images = product.images?.length > 0 ? product.images : ["/cotton-kurti-fashion.jpg"]

  return (
    <div className="group">
      {/* Image Container */}
      <Link href={`/products/${product.id}`} className="block relative aspect-[3/4] overflow-hidden bg-muted mb-3">
        <img
          src={images[currentImage] || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover transition-opacity duration-300"
        />

        {/* Image Navigation Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
            {images.slice(0, 5).map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.preventDefault()
                  setCurrentImage(idx)
                }}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  currentImage === idx ? "bg-foreground" : "bg-foreground/30"
                }`}
              />
            ))}
          </div>
        )}
      </Link>

      {/* Product Info */}
      <div className="space-y-2">
        {/* Add/Choose Button */}
        <div className="relative">
          {!showSizes ? (
            <button
              onClick={() => setShowSizes(true)}
              className="w-full py-2 text-xs border border-border hover:border-foreground transition-colors flex items-center justify-center gap-2"
            >
              <span>Add</span>
              <span className="text-muted-foreground">Choose</span>
            </button>
          ) : (
            <div className="flex gap-1">
              {product.sizes?.map((size) => (
                <Link
                  key={size}
                  href={`/products/${product.id}?size=${size}`}
                  className="flex-1 py-2 text-xs border border-border hover:border-foreground hover:bg-foreground hover:text-background transition-colors text-center"
                >
                  {size}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Name */}
        <Link href={`/products/${product.id}`}>
          <h3 className="text-sm font-medium tracking-wide">{product.name}</h3>
        </Link>

        {/* Price */}
        <p className="text-sm text-muted-foreground">Rs. {product.price.toFixed(2)}</p>
      </div>
    </div>
  )
}
