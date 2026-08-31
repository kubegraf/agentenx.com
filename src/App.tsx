import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { HowItWorks, Containers, Platform } from "./components/SectionsA";
import { AIConsole, Autonomous, Developers } from "./components/SectionsB";
import { Architecture, UseCases, Reliability, Pricing, FinalCTA, Footer } from "./components/SectionsC";

/* Page order tells the story: what is it → how does it work → what do I get →
   why is the AI different → can I trust it → how do I start. */
export default function App() {
  return (
    <>
      <a
        href="#main"
        className="btn-primary sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <HowItWorks />
        <Platform />
        <Containers />
        <AIConsole />
        <Autonomous />
        <Developers />
        <Architecture />
        <UseCases />
        <Reliability />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
