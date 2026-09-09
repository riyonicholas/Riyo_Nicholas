"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

const links = [
  { 
    id: "beranda", 
    label: "Beranda",
    icon: <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
  },
  { 
    id: "tentang", 
    label: "Tentang",
    icon: <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
  },
  { 
    id: "portofolio", 
    label: "Portofolio",
    icon: <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
  },
  { 
    id: "kontak", 
    label: "Kontak",
    icon: <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';

  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(isHomePage ? "beranda" : "");

  const isClickScrolling = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      if (!isHomePage || isClickScrolling.current) return;
      
      const scrollPos = window.scrollY + 100;
      links.forEach((l) => {
        const sec = document.getElementById(l.id);
        if (sec && sec.offsetTop <= scrollPos && sec.offsetTop + sec.offsetHeight > scrollPos) {
          setActive(l.id);
        }
      });
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHomePage]);

  const goto = (id: string) => {
    if (isHomePage) {
      isClickScrolling.current = true;
      setActive(id);
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      
      setTimeout(() => {
        isClickScrolling.current = false;
      }, 1000);
    } else {
      router.push('/#' + id);
    }
  };

  return (
    <>
      {/* Top Navbar (Desktop Nav + Mobile Logo Only) */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 font-sans border-b ${scrolled || !isHomePage ? "bg-white/60 backdrop-blur-3xl shadow-[0_4px_30px_rgba(46,71,53,0.08)] border-white/40" : "bg-transparent border-transparent"}`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <button onClick={() => goto("beranda")} className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-sm bg-[#2e4735]/90 backdrop-blur-md text-white shadow-lg border border-white/20 group-hover:scale-105 transition-transform">
                R
              </div>
              <span className="font-extrabold text-lg tracking-tight text-gray-900 drop-shadow-sm">
                Riyo<span className="text-[#f5b201]">.</span>
              </span>
            </button>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1 bg-white/40 backdrop-blur-xl border border-white/60 rounded-full px-2 py-1.5 shadow-sm">
              {links.map((l) => (
                <button
                  key={l.id}
                  onClick={() => goto(l.id)}
                  className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-300 border border-transparent ${
                    active === l.id
                      ? "text-[#2e4735]"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/30"
                  }`}
                >
                  {active === l.id && (
                    <motion.div
                      layoutId="activeNavBg"
                      className="absolute inset-0 bg-white/60 shadow-sm border border-white/50 rounded-full"
                      transition={{ type: "spring", bounce: 0.4, duration: 0.35 }}
                    />
                  )}
                  <span className="relative z-10">{l.label}</span>
                </button>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => goto("kontak")}
                className="flex items-center bg-[#2e4735]/90 backdrop-blur-xl border border-white/20 hover:bg-[#1f3124] text-white rounded-full py-2.5 px-6 text-xs uppercase tracking-widest font-bold shadow-[0_8px_24px_0_rgba(46,71,53,0.3)] hover:-translate-y-0.5 transition-all duration-300"
              >
                Hubungi Saya
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Dock (iPhone Liquid Glass Style) */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] z-50">
        <div className="bg-white/40 backdrop-blur-3xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-full px-4 py-2.5 flex items-center justify-around">
          {links.map((l) => {
            const isActive = active === l.id;
            return (
              <button
                key={l.id}
                onClick={() => goto(l.id)}
                className={`relative flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ease-out ${
                  isActive 
                    ? "bg-white shadow-[0_4px_16px_rgba(0,0,0,0.1)] scale-110" 
                    : "bg-transparent active:scale-95"
                }`}
                aria-label={l.label}
              >
                <div className={`transition-colors duration-300 flex items-center justify-center ${
                  isActive 
                    ? "text-[#2e4735]" 
                    : "text-gray-500 drop-shadow-sm"
                }`}>
                  {l.icon}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
