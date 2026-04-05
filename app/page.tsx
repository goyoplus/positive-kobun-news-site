import { ContactSection } from "@/components/contact-section";
import { FeatureGrid } from "@/components/feature-grid";
import { ImageWorkspace } from "@/components/image-workspace";
import { LandingHero } from "@/components/landing-hero";

export default function HomePage() {
  return (
    <main className="pb-20">
      <LandingHero />
      <FeatureGrid />
      <ImageWorkspace />
      <ContactSection />
    </main>
  );
}
