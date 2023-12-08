import { Brand, Hero,SplitSlider, Statistics, HowWeThinkAndWorkSection} from '../components';

export default function HomePage() {



  return (
    <main className="overflow-hidden">
      <Hero/>
      <SplitSlider/>
      <Statistics/>
      <HowWeThinkAndWorkSection/>
      <div><Brand/></div>
    </main>
  );
}
