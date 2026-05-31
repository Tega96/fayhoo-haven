import HeroSection from "./HeroSection"
import FeatureSection from './FeatureSection';
import DiscoverSection from "./DiscoverSection";

const page = () => {
  return (
    <div className="relative top-0 left-0">
      <HeroSection />
      <FeatureSection />
      <DiscoverSection />
    </div>
  )
}

export default page
