"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface TechItem {
  name: string;
  cat: string;
  desc: string;
  icon: React.ReactNode;
}

const staticTechStack: TechItem[] = [
  {
    name: "React & Next.js",
    cat: "Frontend",
    desc: "Framework utama untuk pengembangan aplikasi web modern yang cepat dan SEO-friendly.",
    icon: (
      <svg className="w-8 h-8 text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(90 12 12)" />
        <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(150 12 12)" />
        <circle cx="12" cy="12" r="1" />
      </svg>
    ),
  },
  {
    name: "HTML5 & CSS3",
    cat: "Frontend",
    desc: "Struktur semantik dan styling responsif menggunakan CSS modern dan Tailwind CSS.",
    icon: (
      <svg className="w-8 h-8 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    name: "JS & TypeScript",
    cat: "Frontend",
    desc: "Bahasa pemrograman utama untuk logika interaktif yang aman dan terstruktur.",
    icon: (
      <svg className="w-8 h-8 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    name: "Figma (UI/UX)",
    cat: "Design",
    desc: "Pembuatan wireframe, desain antarmuka, prototipe interaktif, dan design system.",
    icon: (
      <svg className="w-8 h-8 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
        <path d="M12 2h3.5A3.5 3.5 0 0 1 19 5.5v0A3.5 3.5 0 0 1 15.5 9H12V2z" />
        <path d="M8.5 16H12v-7H8.5A3.5 3.5 0 0 0 5 12.5v0A3.5 3.5 0 0 0 8.5 16z" />
        <path d="M12 9h3.5A3.5 3.5 0 0 1 19 12.5v0A3.5 3.5 0 0 1 15.5 16H12V9z" />
        <path d="M8.5 16A3.5 3.5 0 0 0 12 19.5V23H8.5A3.5 3.5 0 0 1 5 19.5v0A3.5 3.5 0 0 1 8.5 16z" />
      </svg>
    ),
  },
  {
    name: "Canva & CorelDraw",
    cat: "Design",
    desc: "Layout poster cepat, materi konten media sosial, dan penataan halaman publikasi.",
    icon: (
      <svg className="w-8 h-8 text-teal-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    name: "Repair Android & iPhone",
    cat: "Hardware",
    desc: "Perbaikan modul layar LCD, konektor pengisian daya, penggantian baterai, dan analisis kelistrikan.",
    icon: (
      <svg className="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
  },
  {
    name: "Laptop & PC Diagnostics",
    cat: "Hardware",
    desc: "Instalasi sistem, troubleshoot hardware, penggantian komponen, dan optimasi kinerja termal.",
    icon: (
      <svg className="w-8 h-8 text-cyan-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
];

const catColor: Record<string, string> = {
  Frontend: "#2563eb",
  Design: "#7c3aed",
  Hardware: "#06b6d4",
};

const catMap: Record<string, string> = {
  frontend: "Frontend",
  design: "Design",
  hardware: "Hardware",
  language: "Frontend",
  backend: "Frontend",
  database: "Frontend",
  tool: "Design",
};

const getIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes("react") || n.includes("next")) {
    return (
      <svg className="w-8 h-8 text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(90 12 12)" />
        <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(150 12 12)" />
        <circle cx="12" cy="12" r="1" />
      </svg>
    );
  }
  if (n.includes("html") || n.includes("css")) {
    return (
      <svg className="w-8 h-8 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    );
  }
  if (n.includes("javascript") || n.includes("typescript") || n.includes("js") || n.includes("ts")) {
    return (
      <svg className="w-8 h-8 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    );
  }
  if (n.includes("figma")) {
    return (
      <svg className="w-8 h-8 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
        <path d="M12 2h3.5A3.5 3.5 0 0 1 19 5.5v0A3.5 3.5 0 0 1 15.5 9H12V2z" />
        <path d="M8.5 16H12v-7H8.5A3.5 3.5 0 0 0 5 12.5v0A3.5 3.5 0 0 0 8.5 16z" />
        <path d="M12 9h3.5A3.5 3.5 0 0 1 19 12.5v0A3.5 3.5 0 0 1 15.5 16H12V9z" />
        <path d="M8.5 16A3.5 3.5 0 0 0 12 19.5V23H8.5A3.5 3.5 0 0 1 5 19.5v0A3.5 3.5 0 0 1 8.5 16z" />
      </svg>
    );
  }
  if (n.includes("canva") || n.includes("corel")) {
    return (
      <svg className="w-8 h-8 text-teal-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    );
  }
  if (n.includes("android") || n.includes("iphone") || n.includes("phone") || n.includes("repair")) {
    return (
      <svg className="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    );
  }
  return (
    <svg className="w-8 h-8 text-cyan-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
};

export default function AboutSection() {
  const [skills, setSkills] = useState<any[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const res = await fetch(`${API}/api/skills`);
        if (!res.ok) return;
        const data = await res.json();
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          const mapped = data.data.map((s: any) => ({
            name: s.name,
            cat: catMap[s.category] || "Design",
            desc: s.description || "",
            icon: getIcon(s.name),
          }));
          setSkills(mapped);
        }
      } catch {
        // Backend offline / tidak dapat dijangkau: otomatis fallback ke staticTechStack tanpa memicu modal error dev mode
      }
    }
    fetchSkills();
  }, []);

  const displaySkills = skills.length > 0 ? skills : staticTechStack;

  return (
    <section id="tentang" className="py-24 relative bg-[#2e4735] flex flex-col items-center overflow-hidden font-sans">
      
      {/* SECTION 1: ABOUT ME PROFILE */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full mb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image & Floating Badges */}
          <div className="relative flex justify-center items-center mt-8 lg:mt-0">
            {/* Liquid Glass Outer Ring */}
            <div className="p-3 md:p-5 rounded-full border border-white/10 bg-white/5 backdrop-blur-3xl shadow-[0_0_50px_rgba(255,255,255,0.03)]">
              {/* Liquid Glass Inner Ring */}
              <div className="p-3 md:p-5 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl relative">
                
                {/* Profile Image Wrapper */}
                <div className="w-[260px] h-[260px] md:w-[360px] md:h-[360px] bg-[#f5b201] rounded-full relative flex justify-center items-center overflow-hidden shadow-2xl">
                  <img 
                    src="/gambar/WhatsApp Image 2026-08-26 at 17.30.52.jpeg" 
                    alt="Riyo Nicholas Saputra" 
                    className="w-full h-full object-cover z-10"
                  />
                </div>

                {/* Floating Glass Icons (Scattered around the circle) */}
                <div className="absolute inset-0 w-full h-full z-20 pointer-events-none">
                  
                  {/* Top Left - Figma */}
                  <div className="absolute top-[10%] -left-[5%] w-12 h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-xl rounded-2xl border-2 border-white/30 shadow-[0_10px_40px_rgba(0,0,0,0.15)] flex items-center justify-center p-2.5 md:p-3 transform -rotate-12 pointer-events-auto hover:scale-110 hover:-translate-y-2 transition-all duration-300">
                    <svg className="w-full h-full text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
                      <path d="M12 2h3.5A3.5 3.5 0 0 1 19 5.5v0A3.5 3.5 0 0 1 15.5 9H12V2z" />
                      <path d="M8.5 16H12v-7H8.5A3.5 3.5 0 0 0 5 12.5v0A3.5 3.5 0 0 0 8.5 16z" />
                      <path d="M12 9h3.5A3.5 3.5 0 0 1 19 12.5v0A3.5 3.5 0 0 1 15.5 16H12V9z" />
                      <path d="M8.5 16A3.5 3.5 0 0 0 12 19.5V23H8.5A3.5 3.5 0 0 1 5 19.5v0A3.5 3.5 0 0 1 8.5 16z" />
                    </svg>
                  </div>

                  {/* Top Right - React */}
                  <div className="absolute top-[15%] -right-[5%] w-14 h-14 md:w-16 md:h-16 bg-[#1f3024]/60 backdrop-blur-xl rounded-full border-2 border-white/20 shadow-[0_10px_40px_rgba(0,0,0,0.15)] flex items-center justify-center p-3 md:p-3.5 transform rotate-12 pointer-events-auto hover:scale-110 hover:-translate-y-2 transition-all duration-300">
                    <svg className="w-full h-full text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(30 12 12)" />
                      <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(90 12 12)" />
                      <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(150 12 12)" />
                      <circle cx="12" cy="12" r="1" />
                    </svg>
                  </div>

                  {/* Middle Left - Palette */}
                  <div className="absolute top-[45%] -left-[12%] w-10 h-10 md:w-12 md:h-12 bg-[#1f3024]/60 backdrop-blur-xl rounded-xl border-2 border-white/20 shadow-[0_10px_40px_rgba(0,0,0,0.15)] flex items-center justify-center p-2 md:p-2.5 transform -rotate-6 pointer-events-auto hover:scale-110 hover:-translate-y-2 transition-all duration-300">
                    <svg className="w-full h-full text-pink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
                      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
                      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
                      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
                      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.992 6.012 17.525 2 12 2z"/>
                    </svg>
                  </div>

                  {/* Bottom Right - Hardware/Repair */}
                  <div className="absolute bottom-[20%] -right-[8%] w-12 h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-xl rounded-2xl border-2 border-white/30 shadow-[0_10px_40px_rgba(0,0,0,0.15)] flex items-center justify-center p-2.5 md:p-3 transform rotate-6 pointer-events-auto hover:scale-110 hover:-translate-y-2 transition-all duration-300">
                    <svg className="w-full h-full text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                    </svg>
                  </div>

                  {/* Bottom Left - Code */}
                  <div className="absolute bottom-[10%] left-[8%] w-12 h-12 md:w-14 md:h-14 bg-[#f5b201]/20 backdrop-blur-xl rounded-full border-2 border-[#f5b201]/50 shadow-[0_10px_40px_rgba(0,0,0,0.15)] flex items-center justify-center p-2.5 md:p-3 transform -rotate-12 pointer-events-auto hover:scale-110 hover:-translate-y-2 transition-all duration-300">
                    <svg className="w-full h-full text-[#f5b201]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Text Content */}
          <div className="text-left mt-16 lg:mt-0 lg:pl-10">
            {/* Subtitle */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-[2px] bg-[#f5b201]"></span>
              <span className="text-white text-sm font-bold tracking-widest uppercase">About Me</span>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl lg:text-[54px] font-bold text-white leading-[1.1] tracking-tight mb-6">
              Who is <span className="italic font-light text-[#f5b201]">Riyo Nicholas Saputra?</span>
            </h2>

            {/* Description */}
            <p className="text-white/80 leading-relaxed text-[15px] md:text-[17px] mb-10 font-light">
              Halo! Saya adalah seorang praktisi teknologi dan kreator visual yang bergerak aktif di bidang Front-End Development, UI/UX, Desain Grafis, dan Teknisi Perangkat Keras. Saya berfokus pada estetika dan fungsionalitas dalam berinteraksi dengan produk digital maupun fisik.
            </p>

            {/* Stats / Info Row */}
            <div className="flex flex-wrap items-start justify-between gap-6 mb-12 border-t border-white/10 pt-8">
              <div>
                <h4 className="text-[#f5b201] text-2xl font-bold mb-1">S1</h4>
                <p className="text-white/70 text-[11px] font-medium uppercase tracking-wider">Teknik Informatika</p>
              </div>
              <div>
                <h4 className="text-[#f5b201] text-2xl font-bold mb-1">3+</h4>
                <p className="text-white/70 text-[11px] font-medium uppercase tracking-wider">Tahun Pengalaman</p>
              </div>
              <div>
                <h4 className="text-[#f5b201] text-2xl font-bold mb-1">50+</h4>
                <p className="text-white/70 text-[11px] font-medium uppercase tracking-wider">Proyek Diselesaikan</p>
              </div>
            </div>

            {/* CTA & Signature */}
            <div className="flex items-center gap-8">
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full p-1.5 pr-6 hover:bg-white/20 hover:shadow-[0_8px_32px_rgba(255,255,255,0.1)] transition-all duration-300 group hover:-translate-y-1"
              >
                <span className="w-10 h-10 bg-white/20 border border-white/30 rounded-full flex items-center justify-center text-white font-bold group-hover:bg-[#f5b201] group-hover:border-[#f5b201] group-hover:text-[#2e4735] transition-all shadow-inner">
                  <svg className={`w-5 h-5 transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                </span>
                <span className="text-white text-sm font-bold uppercase tracking-wider drop-shadow-sm">
                  {isExpanded ? 'Tutup Detail' : 'Lihat Selengkapnya'}
                </span>
              </button>
              
              {/* Signature Style Text */}
              <div className="hidden sm:block text-[#f5b201] text-3xl font-serif italic opacity-90 transform -rotate-2">
                Riyo Nicholas
              </div>
            </div>
          </div>
        </div>

        {/* EXPANDABLE DETAILED ABOUT ME */}
        <div className={`grid transition-all duration-700 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-20' : 'grid-rows-[0fr] opacity-0 mt-0 pointer-events-none'}`}>
          <div className="overflow-hidden px-4 md:px-8 -mx-4 md:-mx-8">
            <div className="relative pt-10 border-t border-white/10 mt-10">
              
              <div className="flex flex-col items-center text-center">
                <div className="space-y-6 text-white/80 font-light leading-[1.8] text-[15px] md:text-base flex flex-col items-center text-center w-full max-w-4xl">
                  
                  {/* Photo Profile Placeholder */}
                  <div className="w-48 md:w-56 aspect-[3/4] bg-white/10 backdrop-blur-xl rounded-2xl mb-6 relative overflow-hidden border border-white/20 shadow-2xl flex flex-col items-center justify-center text-white/50 hover:shadow-[0_0_30px_rgba(245,178,1,0.2)] hover:-translate-y-2 transition-all duration-500 group">
                    <svg className="w-12 h-12 mb-2 drop-shadow-sm text-white/60 group-hover:scale-110 transition-transform duration-500 group-hover:text-[#f5b201]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/60 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-sm z-10 group-hover:text-white">Foto Profil</span>
                  </div>

                  <p className="text-xl md:text-2xl font-bold text-white leading-snug mb-8">
                    Halo, perkenalkan saya seorang Front-End Web Developer sekaligus mahasiswa Teknologi Informasi di STIKOM PGRI Banyuwangi.
                  </p>

                  <p>
                    Fokus utama saya adalah merancang dan membangun antarmuka web yang modern, responsif, serta intuitif bagi pengguna. Dalam setiap proyek, saya terbiasa mengawal prosesnya mulai dari tahap perancangan wireframe dan mockup UI di Figma, hingga mengimplementasikannya ke dalam kode menggunakan <strong>React.js</strong>, <strong>Next.js</strong>, dan <strong>Tailwind CSS</strong>.
                  </p>

                  <p>
                    Di samping aktivitas pengembangan web, saya mengelola usaha mandiri berskala kecil—di bawah tingkatan UMKM—yang bergerak di bidang perbaikan hardware perangkat elektronik serta smartphone. Dari toko ini, saya terbiasa menangani pengerjaan teknis secara langsung menggunakan alat-alat pendukung seperti solder hingga <em>hot air rework station</em>.
                  </p>

                  <p>
                    Selain itu, saya juga aktif menyalurkan kreativitas melalui desain grafis dan pembuatan materi promosi visual menggunakan Canva serta teknologi AI. Di waktu senggang, saya sangat menikmati eksplorasi visual, tren desain, dan hal-hal yang berkaitan dengan budaya skateboarding.
                  </p>
                </div>
              </div>

              {/* FAMILY SECTION */}
              <div className="pt-20 mt-16 border-t border-white/10 flex flex-col items-center w-full">
                <div className="text-center mb-16">
                  <p className="text-[#f5b201] font-bold text-sm tracking-widest uppercase mb-4 flex items-center justify-center gap-3">
                    <span className="w-6 h-[2px] bg-[#f5b201]"></span> Family <span className="w-6 h-[2px] bg-[#f5b201]"></span>
                  </p>
                  <h2 className="text-4xl md:text-5xl font-bold text-white leading-[1.1] tracking-tight">
                    Tentang <span className="italic font-light text-[#f5b201]">Keluarga Saya</span>
                  </h2>
                </div>

                <div className="w-full flex flex-wrap justify-center md:justify-between gap-10 md:gap-4">
                  {[
                    { role: "Saya", label: "Aku" },
                    { role: "Adik", label: "Adikku" },
                    { role: "Ayah", label: "Ayah" },
                    { role: "Ibu", label: "Ibu" }
                  ].map((member, i) => (
                    <div key={i} className="flex flex-col items-center group cursor-pointer">
                      <div className="w-40 md:w-52 lg:w-64 aspect-[3/4] bg-white/5 backdrop-blur-xl rounded-3xl mb-5 relative overflow-hidden border border-white/20 shadow-lg flex flex-col items-center justify-center text-white/50 group-hover:shadow-[0_0_40px_rgba(245,178,1,0.2)] group-hover:-translate-y-2 group-hover:scale-105 transition-all duration-500">
                        <svg className="w-10 h-10 mb-2 drop-shadow-sm group-hover:scale-110 transition-transform duration-500 text-white/70 group-hover:text-[#f5b201]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                        <span className="text-[8px] font-bold uppercase tracking-widest text-white/60 bg-white/10 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20 shadow-sm z-10 group-hover:text-white">Foto</span>
                      </div>
                      <h4 className="font-bold text-white text-base">{member.label}</h4>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 bg-white/5 px-2 py-0.5 rounded-full mt-1 border border-white/10 shadow-sm">{member.role}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-10 p-6 md:p-8 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-inner flex flex-col items-center w-full text-center">
                  <div className="w-8 h-8 mb-4 opacity-50 text-white/70 drop-shadow-sm">
                    <svg fill="currentColor" viewBox="0 0 24 24"><path d="M14 17H4v2h10v-2zm6-8H4v2h16V9zM4 15h16v-2H4v2zM4 5v2h16V5H4z" /></svg>
                  </div>
                  <p className="text-white/70 italic leading-relaxed font-light">
                    [Deskripsi singkat atau paragraf penutup mengenai cerita keluarga Anda akan diisi di kotak ini nantinya...]
                  </p>
                </div>
              </div>

              {/* PARTNER SECTION */}
              <div className="pt-20 mt-16 border-t border-white/10 flex flex-col items-center w-full">
                <div className="text-center mb-16">
                  <p className="text-[#f5b201] font-bold text-sm tracking-widest uppercase mb-4 flex items-center justify-center gap-3">
                    <span className="w-6 h-[2px] bg-[#f5b201]"></span> Partner <span className="w-6 h-[2px] bg-[#f5b201]"></span>
                  </p>
                  <h2 className="text-4xl md:text-5xl font-bold text-white leading-[1.1] tracking-tight">
                    Tentang <span className="italic font-light text-[#f5b201]">Seseorang Spesial</span>
                  </h2>
                </div>

                <div className="flex flex-col gap-8 items-center w-full">
                  <div className="w-64 md:w-80 lg:w-96 aspect-[3/4] bg-white/5 backdrop-blur-xl rounded-[2.5rem] relative overflow-hidden border border-white/20 shadow-xl flex flex-col items-center justify-center text-pink-300/60 flex-shrink-0 group hover:shadow-[0_0_40px_rgba(236,72,153,0.25)] hover:-translate-y-3 transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <svg className="w-16 h-16 mb-2 drop-shadow-sm group-hover:scale-110 transition-transform duration-500 text-pink-300/80 group-hover:text-pink-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-pink-200 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-sm z-10 group-hover:text-white">Slot Foto Pasangan</span>
                  </div>

                  <div className="flex-1 w-full flex flex-col items-center gap-6 mt-2">
                    <div className="pb-6 border-b border-white/10 w-full text-center">
                      <h4 className="font-bold text-white text-xl mb-3">Pasangan</h4>
                      <p className="text-sm text-white/70 leading-relaxed italic font-light">
                        [Deskripsi singkat tepat di bawah foto pacar akan diisi di sini...]
                      </p>
                    </div>

                    <div className="p-6 md:p-8 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-inner flex flex-col items-center w-full text-center">
                      <div className="w-8 h-8 mb-4 opacity-50 text-pink-300/80 drop-shadow-sm">
                        <svg fill="currentColor" viewBox="0 0 24 24"><path d="M14 17H4v2h10v-2zm6-8H4v2h16V9zM4 15h16v-2H4v2zM4 5v2h16V5H4z" /></svg>
                      </div>
                      <p className="text-white/70 italic leading-relaxed font-light">
                        [Paragraf panjang atau cerita lebih detail tentang dirinya akan ditempatkan di dalam kotak ini nantinya...]
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FRIENDS SECTION */}
              <div className="pt-20 mt-16 border-t border-white/10 flex flex-col items-center w-full">
                <div className="text-center mb-16">
                  <p className="text-[#f5b201] font-bold text-sm tracking-widest uppercase mb-4 flex items-center justify-center gap-3">
                    <span className="w-6 h-[2px] bg-[#f5b201]"></span> Friends <span className="w-6 h-[2px] bg-[#f5b201]"></span>
                  </p>
                  <h2 className="text-4xl md:text-5xl font-bold text-white leading-[1.1] tracking-tight">
                    Lingkaran <span className="italic font-light text-[#f5b201]">Pertemanan</span>
                  </h2>
                </div>

                <div className="w-full flex flex-wrap justify-center md:justify-between gap-8 md:gap-4">
                  {[
                    { label: "Kiki" },
                    { label: "Sasa" },
                    { label: "Lutfi" },
                    { label: "Arin" },
                    { label: "Dandi" }
                  ].map((friend, i) => (
                    <div key={i} className="flex flex-col items-center group cursor-pointer">
                      <div className="w-32 md:w-44 lg:w-52 aspect-[3/4] bg-white/5 backdrop-blur-xl rounded-3xl mb-4 relative overflow-hidden border border-white/20 shadow-lg flex flex-col items-center justify-center text-sky-300/50 group-hover:shadow-[0_0_40px_rgba(14,165,233,0.2)] group-hover:-translate-y-2 group-hover:scale-105 transition-all duration-500">
                        <svg className="w-8 h-8 mb-2 drop-shadow-sm group-hover:scale-110 transition-transform duration-500 text-sky-300/70 group-hover:text-sky-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                        <span className="text-[8px] font-bold uppercase tracking-widest text-sky-200 bg-white/10 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20 shadow-sm z-10 group-hover:text-white">Foto</span>
                      </div>
                      <h4 className="font-bold text-white text-sm md:text-base">{friend.label}</h4>
                    </div>
                  ))}
                </div>

                <div className="mt-10 p-6 md:p-8 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-inner flex flex-col items-center w-full text-center">
                  <div className="w-8 h-8 mb-4 opacity-50 text-sky-300/80 drop-shadow-sm">
                    <svg fill="currentColor" viewBox="0 0 24 24"><path d="M14 17H4v2h10v-2zm6-8H4v2h16V9zM4 15h16v-2H4v2zM4 5v2h16V5H4z" /></svg>
                  </div>
                  <p className="text-white/70 italic leading-relaxed font-light">
                    [Deskripsi singkat, cerita persahabatan, atau paragraf penutup mengenai teman-teman Anda akan diisi di kotak ini nantinya...]
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: ACADEMIC & PROFESSIONAL JOURNEY */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full mb-32">
        <div className="text-center mb-16">
          <p className="text-[#f5b201] font-bold text-sm tracking-widest uppercase mb-4 flex items-center justify-center gap-3">
            <span className="w-6 h-[2px] bg-[#f5b201]"></span> Education &amp; Work
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-[54px] font-bold text-white leading-[1.1] tracking-tight">
            My <span className="italic font-light text-[#f5b201]">Academic and</span><br />Professional Journey
          </h2>
        </div>
        
        {/* Timeline/List for Education and Work */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Education Main Card */}
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(0,0,0,0.2)] hover:bg-white/10 hover:border-white/20">
             {/* Header */}
             <div className="flex items-center gap-5 mb-8 border-b border-white/10 pb-8">
               <div className="w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(255,255,255,0.05)] shrink-0">
                 {/* Graduation Cap Icon */}
                 <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L1 9L4 10.63V17C4 18.66 7.58 20 12 20C16.42 20 20 18.66 20 17V10.63L23 9L12 3ZM12 17.5C8.38 17.5 6 16.5 6 15.5V11.73L12 15L18 11.73V15.5C18 16.5 15.62 17.5 12 17.5ZM12 12.82L3.6 8.25L12 3.75L20.4 8.25L12 12.82Z" /></svg>
               </div>
               <h3 className="text-2xl font-bold text-white">Education</h3>
             </div>

             {/* List */}
             <div className="flex flex-col gap-10">
               <div className="relative pl-8 border-l-2 border-white/10">
                 <div className="absolute top-1.5 -left-[5px] w-2 h-2 bg-white/20 rounded-full"></div>
                 <p className="text-white/50 text-xs font-bold mb-2 tracking-widest uppercase">2023 - Sekarang</p>
                 <h4 className="text-xl font-bold text-white mb-1">Stikom PGRI Banyuwangi</h4>
                 <p className="text-[#f5b201] text-sm font-medium">Sarjana Teknik Informatika</p>
               </div>
               
               <div className="relative pl-8 border-l-2 border-white/10">
                 <div className="absolute top-1.5 -left-[5px] w-2 h-2 bg-white/20 rounded-full"></div>
                 <p className="text-white/50 text-xs font-bold mb-2 tracking-widest uppercase">2020 - 2023</p>
                 <h4 className="text-xl font-bold text-white mb-1">SMKN 1 Banyuwangi</h4>
                 <p className="text-[#f5b201] text-sm font-medium">Teknik Komputer &amp; Jaringan</p>
               </div>

               <div className="relative pl-8 border-l-2 border-white/10">
                 <div className="absolute top-1.5 -left-[5px] w-2 h-2 bg-white/20 rounded-full"></div>
                 <p className="text-white/50 text-xs font-bold mb-2 tracking-widest uppercase">2017 - 2019</p>
                 <h4 className="text-xl font-bold text-white mb-1">SMPN 2 Banyuwangi</h4>
                 <p className="text-[#f5b201] text-sm font-medium">Pendidikan Dasar Menengah</p>
               </div>
             </div>
          </div>
          
          {/* Work Experience Main Card */}
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(0,0,0,0.2)] hover:bg-white/10 hover:border-white/20">
             {/* Header */}
             <div className="flex items-center gap-5 mb-8 border-b border-white/10 pb-8">
               <div className="w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(255,255,255,0.05)] shrink-0">
                 {/* Briefcase Icon */}
                 <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20 6H16V4C16 2.9 15.1 2 14 2H10C8.9 2 8 2.9 8 4V6H4C2.9 6 2.01 6.9 2.01 8L2 19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V8C22 6.9 21.1 6 20 6ZM10 4H14V6H10V4ZM20 19H4V8H20V19Z" /></svg>
               </div>
               <h3 className="text-2xl font-bold text-white">Work Experience</h3>
             </div>

             {/* List */}
             <div className="flex flex-col gap-10">
               <div className="relative pl-8 border-l-2 border-white/10">
                 <div className="absolute top-1.5 -left-[5px] w-2 h-2 bg-white/20 rounded-full"></div>
                 <p className="text-white/50 text-xs font-bold mb-2 tracking-widest uppercase">2021 - Sekarang</p>
                 <h4 className="text-xl font-bold text-white mb-1">Graphic &amp; UI/UX Designer</h4>
                 <p className="text-[#f5b201] text-sm font-medium">Freelancer</p>
               </div>
               
               <div className="relative pl-8 border-l-2 border-white/10">
                 <div className="absolute top-1.5 -left-[5px] w-2 h-2 bg-white/20 rounded-full"></div>
                 <p className="text-white/50 text-xs font-bold mb-2 tracking-widest uppercase">2022 - Sekarang</p>
                 <h4 className="text-xl font-bold text-white mb-1">Hardware Technician</h4>
                 <p className="text-[#f5b201] text-sm font-medium">IT Support &amp; Service Center</p>
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: TOOLKIT & TECHNOLOGY */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pb-20">
        <div className="text-center mb-16">
          <p className="text-[#f5b201] font-bold text-sm tracking-widest uppercase mb-4 flex items-center justify-center gap-3">
            <span className="w-6 h-[2px] bg-[#f5b201]"></span> Tech &amp; Tools
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-[54px] font-bold text-white leading-[1.1] tracking-tight">
            Teknologi &amp; <span className="italic font-light text-[#f5b201]">Toolkit</span><br />Pendukung
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {displaySkills.map((tech, idx) => (
            <div key={idx} className="bg-[#354f3b] border border-[#48634e] p-6 rounded-[1.5rem] flex flex-col hover:bg-[#3d5c44] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-[#2e4735] flex items-center justify-center mb-5 border border-white/10 shadow-inner">
                {tech.icon}
              </div>
              <h4 className="text-lg font-bold text-white mb-2">{tech.name}</h4>
              <p className="text-white/70 text-[13px] leading-relaxed font-light">{tech.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
