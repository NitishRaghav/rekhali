"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Plus, Trash2, Upload, X } from "lucide-react"
import Image from "next/image"

interface Product {
  id: string
  name: string
  slug: string
  description: string
  story?: string
  price: number | string
  original_price?: number | string
  hero_image?: string
  images: string[]
  image_order?: string[]
  sizes: string[]
  fabric?: string
  care_instructions?: string
  in_stock: boolean
  featured: boolean
  created_at: string
}

interface ProductManagementProps {
  initialProducts: Product[]
}

export function ProductManagement({ initialProducts }: ProductManagementProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    story: "",
    price: "",
    original_price: "",
    hero_image: "",
    images: [] as string[],
    image_order: [] as string[],
    sizes: "S, M, L, XL",
    fabric: "",
    care_instructions: "",
    in_stock: true,
    featured: false,
  })

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      story: "",
      price: "",
      original_price: "",
      hero_image: "",
      images: [],
      image_order: [],
      sizes: "S, M, L, XL",
      fabric: "",
      care_instructions: "",
      in_stock: true,
      featured: false,
    })
    setShowForm(false)
    setError(null)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isHero: boolean) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const formDataObj = new FormData()
      formDataObj.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formDataObj,
      })

      if (!response.ok) throw new Error("Upload failed")
      const { url } = await response.json()

      if (isHero) {
        setFormData({ ...formData, hero_image: url })
      } else {
        setFormData({ ...formData, images: [...formData.images, url] })
      }
    } catch (err) {
      setError("Image upload failed")
    }
  }

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    const slug = formData.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")

    const sizesArray = formData.sizes
      .split(",")
      .map((size) => size.trim())
      .filter(Boolean)

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          slug,
          description: formData.description,
          story: formData.story,
          price: Number.parseFloat(formData.price),
          original_price: formData.original_price ? Number.parseFloat(formData.original_price) : null,
          hero_image: formData.hero_image,
          images: formData.images,
          image_order: formData.images.map((_, i) => (i + 1).toString()),
          sizes: sizesArray,
          fabric: formData.fabric || null,
          care_instructions: formData.care_instructions || null,
          in_stock: formData.in_stock,
          featured: formData.featured,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to add product")
      }

      const newProduct = await response.json()
      setProducts([newProduct, ...products])
      setSuccess("Product added successfully!")
      resetForm()
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add product")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    try {
      const response = await fetch(`/api/products?id=${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Delete failed")

      setProducts(products.filter((p) => p.id !== id))
      setSuccess("Product deleted successfully!")
      router.refresh()
    } catch (err) {
      setError("Failed to delete product")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">Products ({products.length})</h2>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., HEER"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price (Rs.) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="666.00"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="original_price">Original Price (Rs.) - Optional</Label>
                  <Input
                    id="original_price"
                    type="number"
                    step="0.01"
                    value={formData.original_price}
                    onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                    placeholder="999.00"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sizes">Sizes (comma-separated)</Label>
                  <Input
                    id="sizes"
                    value={formData.sizes}
                    onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                    placeholder="S, M, L, XL"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Product description..."
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="story">Product Story</Label>
                <Textarea
                  id="story"
                  value={formData.story}
                  onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                  placeholder="Tell the story behind this product..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Hero Image (Main Product Image)</Label>
                <div className="flex gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, true)}
                    className="cursor-pointer"
                  />
                </div>
                {formData.hero_image && (
                  <div className="relative h-32 w-32 overflow-hidden rounded-lg">
                    <Image
                      src={formData.hero_image}
                      alt="Hero"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Product Images (Gallery)</Label>
                <div className="flex gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, false)}
                    className="cursor-pointer"
                    multiple
                  />
                  <span className="text-sm text-muted-foreground">({formData.images.length} images)</span>
                </div>
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-4 gap-2">
                    {formData.images.map((img, idx) => (
                      <div key={idx} className="relative group">
                        <div className="relative h-20 w-20 overflow-hidden rounded-lg">
                          <Image src={img} alt={`Product ${idx + 1}`} fill className="object-cover" />
                        </div>
                        <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white text-xs flex items-center justify-center w-full h-full rounded-lg opacity-0 group-hover:opacity-100 transition">
                          Image {idx + 1}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fabric">Fabric</Label>
                  <Input
                    id="fabric"
                    value={formData.fabric}
                    onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                    placeholder="100% Cotton"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="care">Care Instructions</Label>
                  <Input
                    id="care"
                    value={formData.care_instructions}
                    onChange={(e) => setFormData({ ...formData, care_instructions: e.target.value })}
                    placeholder="Machine wash cold"
                  />
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <Switch
                    id="in_stock"
                    checked={formData.in_stock}
                    onCheckedChange={(checked) => setFormData({ ...formData, in_stock: checked })}
                  />
                  <Label htmlFor="in_stock">In Stock</Label>
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                  />
                  <Label htmlFor="featured">Featured</Label>
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    "Add Product"
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Product List */}
      <div className="grid gap-4">
        {products.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No products yet. Add your first product above!</p>
            </CardContent>
          </Card>
        ) : (
          products.map((product) => (
            <Card key={product.id}>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="relative h-20 w-16 overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={
                      product.hero_image ||
                      product.images?.[0] ||
                      "/placeholder.svg?height=80&width=64&query=kurta"
                    }
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Rs. {Number(product.price).toFixed(2)} • {product.in_stock ? "In Stock" : "Sold Out"}
                    {product.featured && " • Featured"}
                  </p>
                  {product.images && product.images.length > 0 && (
                    <p className="text-xs text-muted-foreground">{product.images.length} images</p>
                  )}
                </div>
                <Button variant="destructive" size="icon" onClick={() => handleDelete(product.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
