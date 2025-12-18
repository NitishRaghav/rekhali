import Link from "next/link"
import { Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="px-4 py-8 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Copyright and Links */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span>&copy; {new Date().getFullYear()}</span>
            <Link href="/" className="hover:text-foreground transition-colors">
              Rekhali
            </Link>
          </div>

          {/* Terms */}
          <div className="text-xs text-muted-foreground">
            <span>Terms and Policies</span>
            <span className="mx-2">·</span>
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy policy
            </Link>
          </div>

          {/* Social */}
          <a
            href="https://www.instagram.com/rekhalii"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Instagram className="h-5 w-5" />
            <span className="sr-only">Instagram</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
