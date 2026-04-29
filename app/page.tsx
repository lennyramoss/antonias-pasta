import About from "@/components/About";
import FeaturedMenus from "@/components/FeaturedMenus";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import LocationHours from "@/components/LocationHours";
import MenuCTA from "@/components/MenuCTA";
import MenuGrid from "@/components/MenuGrid";
import ReservationCTA from "@/components/ReservationCTA";
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
    streetAddress: "Paseo 1536",
    addressLocality: "Tigre",
    addressRegion: "Buenos Aires",
    addressCountry: "AR",
  },
  openingHours: "Mo-Su 19:00-00:00",
  telephone: "+54 9 11 1234-5678",
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
      <main className="bg-antonias-burgundy">
        <About />
        <SectionDivider className="mt-20 sm:mt-24" />
        <FeaturedMenus />
        <SectionDivider className="mt-24 sm:mt-32" />
        <MenuGrid />
        <SectionDivider className="mt-24 sm:mt-32" />
        <MenuCTA />
        <SectionDivider />
        <ReservationCTA />
        <SectionDivider className="mt-20 sm:mt-24" />
        <LocationHours />
      </main>
      <Footer />
    </>
  );
}
