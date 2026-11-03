import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { MarqueeStrip } from "@/components/marquee-strip";
import { Navbar } from "@/components/navbar";
import { PortfolioGuideBot } from "@/components/portfolio-guide-bot";
import { Projects } from "@/components/projects";
import { ServicesPillars } from "@/components/services-pillars";
import { TechStack } from "@/components/tech-stack";
import { Workflow } from "@/components/workflow";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <MarqueeStrip />
        <ServicesPillars />
        <TechStack />
        <Projects />
        <Workflow />
        <Contact />
      </main>
      <Footer />
      <PortfolioGuideBot />
    </>
  );
}
