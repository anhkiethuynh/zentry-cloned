import Hero from "./components/Hero";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollSmoother);

const App = () => {
  ScrollSmoother.create({
    smooth: 1,
    effects: true,
    smoothTouch: 0.1,
    wrapper: document.querySelector("#smooth-wrapper"),
    content: document.querySelector("#smooth-content"),
  });
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Story />
      <Contact />
      <Footer />
      {/* <section className="z-0 min-h-screen bg-amber-200"></section> */}
    </main>
  );
};

export default App;
