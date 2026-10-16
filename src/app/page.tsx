import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { Projects } from "@/components/projects";
import { TechStack } from "@/components/tech-stack";
import { Workflow } from "@/components/workflow";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TechStack />
        <Projects />
        <Workflow />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
