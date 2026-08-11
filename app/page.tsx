import { Header } from "@/components/header";
import { HeroSection } from "@/components/sections/hero-section";
import { PhilosophySection } from "@/components/sections/philosophy-section";
import { MissionSection } from "@/components/sections/mission-section";
import { FeaturedProductsSection } from "@/components/sections/featured-products-section";
import { TechnologySection } from "@/components/sections/technology-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { RepresentativesGridOnly, RepresentativesCarouselOnly } from "@/components/sections/representatives-stack";
import { CollectionSection } from "@/components/sections/collection-section";
import { EditorialSection } from "@/components/sections/editorial-section";
import { RegistrationSection } from "@/components/sections/registration-section";
import { FooterSection } from "@/components/sections/footer-section";
import { WordHeroSection } from "@/components/ui/scroll-hero-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <PhilosophySection />
      <MissionSection />
      {/* 3. El Directorio Animado en 3D (GSAP) */}
      <RepresentativesCarouselOnly />
      
      {/* Comunidad / Inspiración (Imágenes con animación) */}
      <TechnologySection />

      {/* 2. El Carrusel 3D animado */}
      <FeaturedProductsSection />

      {/* Dynamic Intro to the Business Circuit */}
      <WordHeroSection />

      <CollectionSection />
      <EditorialSection />
      <GallerySection />
      <RegistrationSection />
      <FooterSection />
    </main>
  );
}
