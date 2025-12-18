import { Header } from "@/components/public/header"
import { Footer } from "@/components/public/footer"

export const metadata = {
  title: "About Us - Rekhali | Premium Cotton Kurtis",
  description: "Learn about Rekhali's mission to empower rural women artisans through sustainable fashion.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 px-4 py-12 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <h1 className="text-3xl md:text-4xl font-normal mb-12">About Us</h1>

          {/* Main Content - matching Rekhali's exact content */}
          <div className="grid md:grid-cols-2 gap-8 items-start mb-16">
            <div>
              <img
                src="/two-sisters-founders-rekhali-fashion-brand.jpg"
                alt="Tanisha & Simran - Founders of Rekhali"
                className="w-full aspect-square object-cover"
              />
            </div>
            <div className="space-y-4 text-foreground">
              <p className="leading-relaxed">
                <strong>Rekhali</strong> was founded by two sisters - <em>Tanisha & Simran</em>, with the specific goal
                of empowering women in their village in an age of fast fashion and overconsumption.
              </p>
              <p className="leading-relaxed">
                From the very beginning, we were committed to building a slow, sustainable, and socially conscious
                brand. That&apos;s why we chose to build our team by collaborating with women from our village. It took
                seven months of meetings and trial and error, but we&apos;ve finally built a team of five incredible
                women.
              </p>
              <p className="leading-relaxed">
                Every single piece you receive from us is a testament to the love and effort of all five of us, and a
                step toward a more mindful and sustainable future.
              </p>
            </div>
          </div>

          {/* Second Section */}
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <h2 className="text-xl font-medium">Our Commitment: Slow Fashion & Ethical Production</h2>
              <p className="leading-relaxed text-foreground">
                We stand proudly at the forefront of the slow fashion movement. Every piece is a mindfully curated with
                love and hardwork of our entire team.
              </p>
              <ul className="space-y-4 text-foreground">
                <li>
                  <strong>Ethically Made</strong>: We ensure fair wages and building meaningful partnerships with our
                  rural women.
                </li>
                <li>
                  <strong>Minimalist Design</strong>: Our focus is on timeless and versatile clothing designed to be
                  staples in your everyday wardrobe.
                </li>
                <li>
                  <strong>Zero Waste Commitment</strong>: We are committed to a zero-waste project by recycling every
                  single fabric scrap from each collection batch, ensuring minimal material goes to waste.
                </li>
              </ul>
            </div>
            <div>
              <img
                src="/women-artisans-sewing-traditional-indian-clothing.jpg"
                alt="Rekhali Artisans at Work"
                className="w-full aspect-square object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
