import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturedRecipes from '@/components/FeaturedRecipes';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-50 via-white to-beige-100">
      <Header />
      <HeroSection />
      <FeaturedRecipes />
      <HowItWorks />
      <Footer />
    </div>
  );
}