import { Brand, Hero, SplitSlider, Statistics, HowWeThinkAndWorkSection, CTABanner, FeaturedEventsPreview, WhyGeoDiscover } from '../components';

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <Hero/>
      <FeaturedEventsPreview/>
      <SplitSlider/>
      <WhyGeoDiscover/>
      <Statistics/>
      <HowWeThinkAndWorkSection/>
      <CTABanner/>
      <div><Brand/></div>
    </main>
  );
}
