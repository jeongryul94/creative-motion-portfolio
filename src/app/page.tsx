import { Hero } from "@/components/sections/Hero";
import { SelectedWorks } from "@/components/sections/SelectedWorks";
import { HomeProjects } from "@/components/sections/HomeProjects";
import { About } from "@/components/sections/About";
import { Expertise } from "@/components/sections/Expertise";
import { Contact } from "@/components/sections/Contact";
import { projects } from "@/data/projects";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWorks projects={projects} />
      <HomeProjects />
      <About />
      <Expertise />
      <Contact />
    </>
  );
}
