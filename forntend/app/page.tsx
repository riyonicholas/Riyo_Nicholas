import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import PortfolioSection from "./components/PortfolioSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <HeroSection />

      {/* Elegant Dividers */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="border-t border-slate-200/50" />
      </div>

      <AboutSection />

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="border-t border-slate-200/50" />
      </div>

      <PortfolioSection />

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="border-t border-slate-200/50" />
      </div>

      <ContactSection />
      <Footer />
    </div>
  );
}
