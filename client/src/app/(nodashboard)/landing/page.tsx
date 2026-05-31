import HeroSection from "./HeroSection"
import FeatureSection from './FeatureSection';
import DiscoverSection from "./DiscoverSection";
import CallToAction from "./CallToAction";

const page = () => {
  return (
    <div className="relative top-0 left-0">
      <HeroSection />
      <FeatureSection />
      <DiscoverSection />
      <CallToAction />
    </div>
  )
}

export default page
