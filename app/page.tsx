import About from "@/components/About";
import FeaturedMenus from "@/components/FeaturedMenus";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import LocationHours from "@/components/LocationHours";
import MenuCTA from "@/components/MenuCTA";
import MenuGrid from "@/components/MenuGrid";
import ReservationCTA from "@/components/ReservationCTA";
import Reviews from "@/components/Reviews";
import SectionDivider from "@/components/SectionDivider";

const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Antonias Pasta",
  description:
    "Restaurante de pastas artesanales y barra de tragos en Tigre, Buenos Aires.",
  servesCuisine: ["Italiana", "Pastas artesanales", "Cócteles"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Trilenium Tigre",
    addressLocality: "Tigre",
    addressRegion: "Buenos Aires",
    addressCountry: "AR",
  },
  openingHours: "Mo-Su 12:00-02:00",
  acceptsReservations: true,
  telephone: "+54 9 11 28376131",
  priceRange: "$$",
  url: "https://antoniaspasta.com",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
      />
      <Hero />
      <main className="bg-antonias-base">
        <About />
        <SectionDivider className="mt-20 sm:mt-24" />
        <FeaturedMenus />
        <SectionDivider className="mt-24 sm:mt-32" />
        <MenuGrid />
        <SectionDivider className="mt-24 sm:mt-32" />
        <MenuCTA />
        <SectionDivider />
        <Reviews />
        <SectionDivider className="mt-4 sm:mt-8" />
        <ReservationCTA />
        <SectionDivider className="mt-20 sm:mt-24" />
        <LocationHours />
      </main>
      <Footer />
    </>
  );
}
