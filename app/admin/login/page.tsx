"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Info } from "lucide-react"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showSetup, setShowSetup] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    // Check if user is admin
    const { data: adminUser, error: adminError } = await supabase
      .from("admin_users")
      .select("*")
      .eq("id", data.user?.id)
      .single()

    if (adminError || !adminUser) {
      setError("You are not authorized to access the admin panel.")
      await supabase.auth.signOut()
      setLoading(false)
      return
    }

    router.push("/admin/dashboard")
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md space-y-4">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-normal">Rekhali Admin</CardTitle>
            <CardDescription>Sign in to manage your store</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@rekhali.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Setup Instructions Toggle */}
        <button
          onClick={() => setShowSetup(!showSetup)}
          className="w-full flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <Info className="h-4 w-4" />
          {showSetup ? "Hide setup instructions" : "First time? Click for setup instructions"}
        </button>

        {showSetup && (
          <Card className="border-blue-200 bg-blue-50/50">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Admin Setup Instructions</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-blue-800 space-y-3">
              <p className="font-medium">Step 1: Run the database script</p>
              <p className="text-xs">
                Execute <code className="bg-blue-100 px-1 rounded">scripts/001_init_database.sql</code> in your Supabase
                SQL Editor to create all tables.
              </p>

              <p className="font-medium">Step 2: Create admin user in Supabase</p>
              <ol className="list-decimal list-inside text-xs space-y-1">
                <li>Go to Supabase Dashboard → Authentication → Users</li>
                <li>Click &quot;Add User&quot;</li>
                <li>
                  Enter email: <code className="bg-blue-100 px-1 rounded">admin@rekhali.com</code>
                </li>
                <li>
                  Enter password: <code className="bg-blue-100 px-1 rounded">Rekhali@2024</code>
                </li>
                <li>Click &quot;Create User&quot; and copy the UUID</li>
              </ol>

              <p className="font-medium">Step 3: Add to admin_users table</p>
              <p className="text-xs">Run this SQL (replace UUID):</p>
              <pre className="bg-blue-100 p-2 rounded text-xs overflow-x-auto">
                {`INSERT INTO admin_users (id, email)
VALUES ('YOUR-UUID-HERE', 'admin@rekhali.com');`}
              </pre>

              <p className="font-medium">Step 4: Login with credentials</p>
              <p className="text-xs">
                Email: <code className="bg-blue-100 px-1 rounded">admin@rekhali.com</code>
                <br />
                Password: <code className="bg-blue-100 px-1 rounded">Rekhali@2024</code>
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}
