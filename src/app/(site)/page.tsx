import { Hero } from "@/components/sections/Hero";
import { Introduction } from "@/components/sections/Introduction";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Philosophy } from "@/components/sections/Philosophy";
import { Services } from "@/components/sections/Services";
import { Materials } from "@/components/sections/Materials";
import { Process } from "@/components/sections/Process";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { Studio } from "@/components/sections/Studio";
import { VisualBreak } from "@/components/sections/VisualBreak";
import { Journal } from "@/components/sections/Journal";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Introduction />
      <FeaturedProjects />
      <BeforeAfter />
      <Philosophy />
      <Services />
      <Materials />
      <Process />
      <Stats />
      <Testimonials />
      <Studio />
      <VisualBreak />
      <Journal />
      <Contact />
    </>
  );
}
