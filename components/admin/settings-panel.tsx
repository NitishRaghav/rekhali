"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, MessageCircle } from "lucide-react"

interface Setting {
  id: string
  key: string
  value: string
}

interface SettingsPanelProps {
  initialSettings: Setting[]
}

export function SettingsPanel({ initialSettings }: SettingsPanelProps) {
  const whatsappSetting = initialSettings.find((s) => s.key === "whatsapp_number")
  const [whatsappNumber, setWhatsappNumber] = useState(whatsappSetting?.value || "+919876543210")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleSaveWhatsApp = async () => {
    setLoading(true)
    setError(null)
    setSuccess(null)

    const { error: updateError } = await supabase.from("settings").upsert(
      {
        key: "whatsapp_number",
        value: whatsappNumber,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "key",
      },
    )

    if (updateError) {
      setError(updateError.message)
      setLoading(false)
      return
    }

    setSuccess("WhatsApp number updated successfully!")
    setLoading(false)
    router.refresh()
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-foreground">Settings</h2>

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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-green-600" />
            WhatsApp Business Number
          </CardTitle>
          <CardDescription>
            This is the phone number customers will contact when they click &ldquo;Chat on WhatsApp&rdquo;
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="whatsapp">Phone Number (with country code)</Label>
              <Input
                id="whatsapp"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="+919876543210"
              />
              <p className="text-xs text-muted-foreground">
                Include country code without spaces (e.g., +919876543210 for India)
              </p>
            </div>
          </div>
          <Button onClick={handleSaveWhatsApp} className="mt-4" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
