import Description from "../components/Description";
import Generation from "../components/Generation";
import Hero from "../components/Hero";
import Testimonials from "../components/Testimonials";
import Works from "../components/Works";


export default function Home() {
  return (
    <div>
      <Hero/>
      <Works/>
      <Description/>
      <Testimonials/>
      <Generation/>
    </div>
  )
}
