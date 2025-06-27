import { HeroSection } from "@/components/HeroSection";
import { CategoryGrid } from "@/components/CategoryGrid";
import { RecentViewsSection } from "@/components/RecentViewsSection";
import { Navigation } from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      <HeroSection />
      <RecentViewsSection />
      <CategoryGrid />
    </div>
  );
};

export default Index;