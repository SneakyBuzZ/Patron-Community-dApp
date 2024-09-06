import HeroSection from '@/components/public/HeroSection';
import { FeaturesSectionDemo } from '@/components/public/FeatureSection';
import { OrbitingCirclesDemo } from '@/components/public/WalletSection';

const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSectionDemo />
      <OrbitingCirclesDemo />
    </>
  );
};

export default LandingPage;