"use client"

import Link from "next/link"
import { useState } from "react"
import { Search, User, ShoppingBag, X } from "lucide-react"

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-foreground text-background text-center py-2 text-xs tracking-wide">Welcome to our store</div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <nav className="flex items-center justify-between px-4 py-3 md:px-6">
          {/* Logo - Center on mobile, left on desktop */}
          <div className="flex-1 md:flex-none">
            <Link href="/" className="inline-block">
              <img
                src="https://rekhali.com/cdn/shop/files/Blue_Beige_Minimalist_Typography_Brand_Business_Card_1.png?height=36&v=1761235239"
                alt="Rekhali"
                className="h-9"
              />
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-1 hover:opacity-70 transition-opacity"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link href="/admin/login" className="p-1 hover:opacity-70 transition-opacity">
              <User className="h-5 w-5" />
            </Link>
            <button
              onClick={() => setCartOpen(true)}
              className="p-1 hover:opacity-70 transition-opacity relative"
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-foreground text-background text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-background">
          <div className="p-4">
            <div className="flex items-center gap-4 border-b border-border pb-4">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search"
                className="flex-1 bg-transparent outline-none text-lg"
                autoFocus
              />
              <button onClick={() => setSearchOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/20" onClick={() => setCartOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-background shadow-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium">Your cart is empty</h2>
                <button onClick={() => setCartOpen(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
              <Link
                href="/products"
                className="block w-full text-center py-3 border border-foreground text-sm hover:bg-foreground hover:text-background transition-colors"
                onClick={() => setCartOpen(false)}
              >
                Continue shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
