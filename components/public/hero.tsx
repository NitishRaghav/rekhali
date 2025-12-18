import Link from "next/link"

export function Hero() {
  return (
    <section className="relative w-full">
      {/* Full-width hero image like Rekhali */}
      <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden">
        <img src="/elegant-indian-woman-in-green-cotton-kurti-minimal.jpg" alt="Rekhali Collection" className="w-full h-full object-cover" />
        {/* Shop All Button - Bottom center */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <Link
            href="/products"
            className="inline-block bg-background text-foreground px-8 py-3 text-sm tracking-wide hover:bg-foreground hover:text-background transition-colors border border-foreground"
          >
            Shop all
          </Link>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="max-w-3xl mx-auto text-center px-4 py-16">
        <p className="text-base md:text-lg leading-relaxed text-foreground">
          Rekhali is where minimal style meets maximum social impact. Step into a world of smart wear and sophisticated
          everyday basics. Rekhali&apos;s core mission is to empower rural women and young girls by working directly
          with skilled artisans in our village.
        </p>
      </div>
    </section>
  )
}
