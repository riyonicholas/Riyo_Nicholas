"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type Category = "uiux" | "grafis" | "frontend" | "hardware" | "penelitian";

interface ProjectItem {
  id: number;
  title: string;
  desc: string;
  tags: string[];
  detail: string;
  img: string;
  category?: Category;
  metricLabel?: string;
}

const staticPortfolioData: Record<Category, ProjectItem[]> = {
  uiux: [
    {
      id: 1,
      title: "Portal Akademik Terpadu",
      desc: "Sistem dashboard interaktif untuk manajemen kurikulum secara real-time.",
      tags: ["Figma", "Next.js", "Dashboard"],
      detail: "Riset tampilan bertema profesional, navigasi sidebar berjenjang.",
      img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop",
      metricLabel: "UI/UX",
    },
    {
      id: 2,
      title: "Mobile Health Tracker",
      desc: "Antarmuka aplikasi pelacakan kebugaran harian dengan visualisasi metrik kesehatan.",
      tags: ["Figma", "Mobile UI", "Data Viz"],
      detail: "User flow 5 layar, komponen reusable, skema warna biru-teal yang menenangkan.",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
      metricLabel: "UI/UX",
    },
    {
      id: 3,
      title: "E-Commerce UI Kit",
      desc: "Design system modular untuk platform belanja daring modern dengan 40+ komponen.",
      tags: ["Design System", "Figma", "E-Commerce"],
      detail: "40+ komponen siap pakai, token warna konsisten.",
      img: "https://images.unsplash.com/photo-1547028443-441695420366?q=80&w=800&auto=format&fit=crop",
      metricLabel: "UI/UX",
    }
  ],
  grafis: [
    {
      id: 5,
      title: "Branding & Brand Identity",
      desc: "Identitas merek menyeluruh mencakup logo geometris, palet warna, dan panduan.",
      tags: ["Illustrator", "Branding", "Vector"],
      detail: "Konsep: kekuatan dan modernitas. Bentuk geometris minimalis.",
      img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop",
      metricLabel: "GRAFIS",
    },
    {
      id: 6,
      title: "Poster Event Teknologi",
      desc: "Karya poster visual acara seminar teknologi dengan estetika dinamis.",
      tags: ["Photoshop", "Poster", "Event"],
      detail: "Komposisi diagonal, efek pencahayaan dinamis.",
      img: "https://images.unsplash.com/photo-1561069934-eee225936bb4?q=80&w=800&auto=format&fit=crop",
      metricLabel: "GRAFIS",
    }
  ],
  hardware: [
    {
      id: 9,
      title: "Ganti LCD iPhone 13 Pro",
      desc: "Penggantian modul OLED dan kalibrasi True Tone via pemindahan data chip IC original.",
      tags: ["iPhone", "OLED Repair", "True Tone"],
      detail: "Masalah: layar retak. Solusi: penggantian modul OEM + kalibrasi True Tone.",
      img: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=800&auto=format&fit=crop",
      metricLabel: "HARDWARE",
    },
    {
      id: 10,
      title: "Repair Motherboard Android",
      desc: "Analisis kelistrikan dan reballing IC Power BGA pada perangkat mati total.",
      tags: ["Android", "Motherboard", "BGA IC"],
      detail: "Solusi: reballing BGA IC, penggantian komponen SMD.",
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
      metricLabel: "HARDWARE",
    },
    {
      id: 11,
      title: "Upgrade RAM & NVMe SSD Laptop",
      desc: "Peningkatan performa laptop gaming dengan migrasi OS ke PCIe 4.0 SSD.",
      tags: ["Laptop", "NVMe SSD", "RAM DDR4"],
      detail: "Booting lambat. Solusi: migrasi OS ke NVMe PCIe 4.0, upgrade RAM.",
      img: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=800&auto=format&fit=crop",
      metricLabel: "HARDWARE",
    }
  ],
  penelitian: [
    {
      id: 12,
      title: "Riset Keamanan Data Cloud",
      desc: "Studi literatur dan eksperimen mengenai enkripsi end-to-end pada arsitektur cloud server.",
      tags: ["Research", "Cloud", "Security"],
      detail: "Menganalisis performa algoritma enkripsi pada load server AWS.",
      img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop",
      metricLabel: "RISET",
    },
    {
      id: 13,
      title: "Optimasi Jaringan IoT",
      desc: "Pengembangan topologi jaringan mesh pada perangkat Internet of Things untuk pertanian pintar.",
      tags: ["IoT", "Networking", "Mesh"],
      detail: "Pengujian ping dan latency pada node ESP32 dalam skala 50 perangkat.",
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
      metricLabel: "RISET",
    }
  ],
  frontend: [
    {
      id: 10,
      title: "Company Profile Web",
      desc: "Membangun antarmuka profil perusahaan yang dinamis dan beranimasi.",
      tags: ["React", "TailwindCSS", "Framer"],
      detail: "Optimasi SEO dan performa tinggi dengan metrik memuaskan.",
      img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
      metricLabel: "WEB DEV",
    },
    {
      id: 11,
      title: "E-Learning Dashboard",
      desc: "Dashboard untuk memantau kemajuan belajar dan kuis secara real-time.",
      tags: ["Next.js", "TypeScript", "Zustand"],
      detail: "Autentikasi kompleks dan sinkronisasi status belajar dengan database.",
      img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
      metricLabel: "WEB DEV",
    }
  ]
};

const tabs: { id: Category; label: string; icon: string; badge: string }[] = [
  { id: "uiux", label: "UI/UX Design", icon: "🎨", badge: "Figma & UI" },
  { id: "grafis", label: "Desain Grafis", icon: "🖌️", badge: "Visual & Branding" },
  { id: "frontend", label: "Front-End Web", icon: "💻", badge: "Web Developer" },
  { id: "hardware", label: "Hardware", icon: "🔧", badge: "Perbaikan Komponen" },
  { id: "penelitian", label: "Penelitian Ilmiah", icon: "🔬", badge: "Riset Teknologi" },
];

export default function ServicesSection() {
  const router = useRouter();
  const [active, setActive] = useState<Category>("uiux");
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [selectedModalProject, setSelectedModalProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch(`${API}/api/projects`);
        if (!res.ok) return;
        const data = await res.json();
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          const mapped: ProjectItem[] = data.data.map((p: any) => ({
            id: p.id,
            title: p.title,
            desc: p.description || p.desc || "",
            tags: Array.isArray(p.technologies) ? p.technologies : (p.tags || []),
            detail: p.detail || "",
            img: p.img || p.image || "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop",
            category: p.category,
            metricLabel: p.category ? p.category.toUpperCase() : "Active",
          }));
          setProjects(mapped);
        }
      } catch {
        // Fallback to static if backend is unavailable
      }
    }
    fetchProjects();
  }, []);

  const getFilteredItems = () => {
    let items = projects.length > 0 ? projects : staticPortfolioData[active];
    if (projects.length > 0) {
      items = items.filter(p => p.category === active);
    }
    return items;
  };

  const activeItems = getFilteredItems();
  const currentTab = tabs.find((t) => t.id === active)!;

  return (
    <section className="relative z-20 min-h-screen flex flex-col font-sans pt-28 pb-32 lg:pb-12 bg-slate-50 overflow-hidden">
      {/* Smooth Liquid Background Orbs */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-[#f1f5f9] to-slate-100 z-0 pointer-events-none opacity-80"></div>
      <div className="absolute top-0 -left-32 w-[600px] h-[600px] bg-[#f5b201]/10 rounded-full blur-[140px] pointer-events-none opacity-70 animate-pulse" />
      <div className="absolute top-1/2 -right-32 w-[600px] h-[600px] bg-[#2e4735]/10 rounded-full blur-[140px] pointer-events-none opacity-70" />

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 relative z-20">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-[#f5b201] font-bold text-[13px] md:text-sm tracking-[0.2em] uppercase mb-4 flex items-center justify-center gap-4">
            <span className="w-6 md:w-8 h-[2px] bg-[#f5b201]"></span> Portofolio Lengkap
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6 drop-shadow-sm">
            Showcase <span className="font-medium italic text-[#f5b201]">Karya</span>
          </h1>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-medium mb-12">
            Eksplorasi seluruh rekam jejak digital saya. Filter berdasarkan kategori untuk melihat karya desain visual, pengembangan aplikasi web, atau studi kasus perbaikan perangkat keras secara mendetail.
          </p>

        </div>

        {/* Category Switcher - Matching Navbar Style (with Back Button) */}
        <div className="w-full overflow-x-auto px-4 pb-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex justify-start lg:justify-center">
          <div className="flex items-center gap-1 bg-white/40 backdrop-blur-xl border border-white/60 rounded-full px-2 py-1.5 shadow-sm w-max shrink-0 mx-auto lg:mx-0">
            
            {/* Back Button Inside Menu */}
            <button
              onClick={() => router.back()}
              className="relative shrink-0 whitespace-nowrap px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border border-transparent text-gray-600 hover:text-gray-900 hover:bg-white/40 flex items-center gap-2 group mr-1"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
              <span>Kembali</span>
            </button>

            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                style={{ WebkitTapHighlightColor: 'transparent' }}
                className={`relative shrink-0 whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 border border-transparent flex items-center gap-2 ${
                  active === t.id
                    ? "text-[#2e4735]"
                    : "text-gray-600 hover:text-gray-900 hover:bg-white/30"
                }`}
              >
                {active === t.id && (
                  <motion.div
                    layoutId="activeTabBgServices"
                    className="absolute inset-0 bg-white/60 shadow-sm border border-white/50 rounded-full"
                    transition={{ type: "spring", bounce: 0.4, duration: 0.35 }}
                  />
                )}
                <span className={`relative z-10 ${active === t.id ? "text-[#f5b201]" : "text-gray-400"}`}>{t.icon}</span>
                <span className="relative z-10">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Liquid Glass Grid Showcase Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
          {activeItems.map((item, idx) => (
            <div
              key={item.id || idx}
              onClick={() => setSelectedModalProject(item)}
              className="group cursor-pointer bg-white/60 backdrop-blur-xl rounded-[2.5rem] overflow-hidden flex flex-col shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_48px_rgba(46,71,53,0.12)] transition-all duration-500 hover:-translate-y-2 border border-white"
            >
              {/* Top Image Container */}
              <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-200 shrink-0">
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Floating Metric Badge over the image */}
                <div className="absolute top-4 right-4 z-20">
                  <span className="bg-white/90 backdrop-blur-md border border-slate-200 text-slate-800 text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f5b201]"></span>
                    {item.metricLabel}
                  </span>
                </div>
              </div>

              {/* Bottom Text Panel */}
              <div className="p-6 md:p-8 flex flex-col flex-1">
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 leading-tight mb-3 line-clamp-2 group-hover:text-[#2e4735] transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed font-medium mb-6 line-clamp-2">
                  {item.desc}
                </p>

                <div className="mt-auto pt-5 border-t border-slate-200/60 flex items-center justify-between">
                  <div className="flex flex-wrap gap-2 overflow-hidden max-h-7">
                    {item.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 truncate"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="w-10 h-10 shrink-0 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-[#f5b201] group-hover:border-[#f5b201] group-hover:text-white group-hover:scale-110 transition-all shadow-sm">
                    <svg className="w-4 h-4 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ──── LIQUID GLASS DETAIL MODAL POPUP ──── */}
      {selectedModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white/90 backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-10 max-w-lg w-full shadow-2xl relative text-left border border-white/60">
            <button
              onClick={() => setSelectedModalProject(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-900/5 text-slate-600 hover:bg-slate-900/10 hover:text-slate-900 flex items-center justify-center text-sm font-bold transition-colors"
            >
              ✕
            </button>

            <div className="flex items-center gap-5 mb-6">
              <div className="w-16 h-16 rounded-3xl overflow-hidden border-2 border-white/60 shadow-lg shrink-0">
                <img src={selectedModalProject.img} alt="Thumb" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-extrabold tracking-wider px-3 py-1 rounded-full bg-[#f5b201] text-gray-900 shadow-sm">
                  {selectedModalProject.metricLabel}
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-2 leading-tight">
                  {selectedModalProject.title}
                </h3>
              </div>
            </div>

            <p className="text-base text-slate-700 font-medium leading-relaxed mb-6">
              {selectedModalProject.desc}
            </p>

            <div className="bg-white/50 rounded-3xl p-6 border border-white/80 shadow-inner mb-8">
              <div className="text-xs font-bold text-slate-900 mb-2 uppercase tracking-wide flex items-center gap-2">
                <span className="text-[#f5b201]">★</span> Teknis &amp; Detail Solusi
              </div>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                {selectedModalProject.detail}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {selectedModalProject.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs font-bold px-4 py-2 rounded-full bg-white/80 border border-slate-200 text-slate-700 shadow-sm"
                >
                  #{t}
                </span>
              ))}
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setSelectedModalProject(null)}
                className="px-8 py-3 rounded-full text-sm font-bold text-white bg-[#2e4735] hover:bg-[#1f3124] shadow-xl hover:shadow-[#2e4735]/40 hover:-translate-y-0.5 transition-all flex items-center gap-2 border border-[#2e4735]/50"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
