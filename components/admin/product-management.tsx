"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Plus, Trash2 } from "lucide-react"
import Image from "next/image"

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
  const supabase = createClient()

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    original_price: "",
    images: "",
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
      price: "",
      original_price: "",
      images: "",
      sizes: "S, M, L, XL",
      fabric: "",
      care_instructions: "",
      in_stock: true,
      featured: false,
    })
    setShowForm(false)
    setError(null)
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
    const imagesArray = formData.images
      .split(",")
      .map((img) => img.trim())
      .filter(Boolean)
    const sizesArray = formData.sizes
      .split(",")
      .map((size) => size.trim())
      .filter(Boolean)

    const { data, error: insertError } = await supabase
      .from("products")
      .insert({
        name: formData.name,
        slug,
        description: formData.description,
        price: Number.parseFloat(formData.price),
        original_price: formData.original_price ? Number.parseFloat(formData.original_price) : null,
        images: imagesArray,
        sizes: sizesArray,
        fabric: formData.fabric || null,
        care_instructions: formData.care_instructions || null,
        in_stock: formData.in_stock,
        featured: formData.featured,
      })
      .select()
      .single()

    if (insertError) {
      setError(insertError.message)
      setLoading(false)
      return
    }

    setProducts([data, ...products])
    setSuccess("Product added successfully!")
    resetForm()
    setLoading(false)
    router.refresh()
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    const { error: deleteError } = await supabase.from("products").delete().eq("id", id)

    if (deleteError) {
      setError(deleteError.message)
      return
    }

    setProducts(products.filter((p) => p.id !== id))
    setSuccess("Product deleted successfully!")
    router.refresh()
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
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="images">Image URLs (comma-separated)</Label>
                <Textarea
                  id="images"
                  value={formData.images}
                  onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                  placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                  rows={2}
                />
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
                    src={product.images?.[0] || "/placeholder.svg?height=80&width=64&query=kurta"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Rs. {product.price.toFixed(2)} • {product.in_stock ? "In Stock" : "Sold Out"}
                    {product.featured && " • Featured"}
                  </p>
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
