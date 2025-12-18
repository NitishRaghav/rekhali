import { Header } from "@/components/public/header"
import { Hero } from "@/components/public/hero"
import { Footer } from "@/components/public/footer"

export default async function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <div className="flex-1" />
      <Footer />
    </main>
  )
}
