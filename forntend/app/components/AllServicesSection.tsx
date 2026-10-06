"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const servicesList = [
  {
    id: 1,
    title: "UI/UX Design",
    desc: "Membangun pengalaman pengguna yang intuitif dan antarmuka visual yang modern, responsif, serta menarik secara visual. Dari wireframe hingga high-fidelity prototype menggunakan Figma.",
    icon: "🎨",
    tags: ["Figma", "Prototyping", "Wireframing"],
    color: "from-pink-500 to-rose-500",
  },
  {
    id: 2,
    title: "Front-End Web Development",
    desc: "Mengembangkan situs web dan aplikasi web interaktif menggunakan teknologi modern seperti React, Next.js, dan TailwindCSS. Fokus pada performa, aksesibilitas, dan SEO.",
    icon: "💻",
    tags: ["React", "Next.js", "TailwindCSS"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    title: "Application Design",
    desc: "Merancang desain antarmuka aplikasi dengan performa tinggi untuk platform mobile (Android/iOS) maupun desktop, memastikan user flow yang mulus.",
    icon: "📱",
    tags: ["Mobile UI", "App Design", "User Flow"],
    color: "from-purple-500 to-indigo-500",
  },
  {
    id: 4,
    title: "Hardware Repair & Setup",
    desc: "Mendiagnosis dan memperbaiki masalah perangkat keras keras seperti motherboard smartphone, pergantian layar, hingga perakitan dan upgrade komponen PC/Laptop.",
    icon: "🔧",
    tags: ["Repair", "Upgrade", "Troubleshooting"],
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: 5,
    title: "Desain Grafis & Branding",
    desc: "Menciptakan identitas visual merek yang kuat, logo, poster, dan materi pemasaran digital menggunakan Adobe Illustrator dan Photoshop.",
    icon: "🖌️",
    tags: ["Branding", "Logo", "Illustrator"],
    color: "from-orange-500 to-[#f5b201]",
  },
  {
    id: 6,
    title: "Riset & Analisa Sistem",
    desc: "Melakukan penelitian ilmiah terkait topologi jaringan, IoT, atau optimasi keamanan sistem cloud untuk mencari solusi teknologi terbaik.",
    icon: "🔬",
    tags: ["Research", "IoT", "Networking"],
    color: "from-slate-600 to-slate-800",
  }
];

export default function AllServicesSection() {
  const router = useRouter();

  return (
    <section className="relative z-20 min-h-screen flex flex-col font-sans pt-32 pb-24 bg-slate-50 overflow-hidden">
      {/* Background Liquid Glass Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#f5b201]/10 rounded-full blur-[140px] pointer-events-none opacity-70 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#2e4735]/10 rounded-full blur-[140px] pointer-events-none opacity-70" />

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 relative z-20">
        
        {/* Navigation Back */}
        <button
          onClick={() => router.back()}
          className="mb-12 flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold group bg-white/50 px-5 py-2.5 rounded-full w-max shadow-sm border border-slate-200"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
          Kembali ke Beranda
        </button>

        {/* HEADER */}
        <div className="max-w-3xl mb-16">
          <p className="text-[#f5b201] font-bold text-[13px] md:text-sm tracking-[0.2em] uppercase mb-4 flex items-center gap-4">
            <span className="w-6 md:w-8 h-[2px] bg-[#f5b201]"></span> Semua Layanan
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6 drop-shadow-sm">
            Keahlian &amp; <span className="font-medium italic text-[#f5b201]">Solusi</span>
          </h1>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl font-medium mb-12">
            Berikut adalah daftar lengkap layanan profesional yang saya tawarkan. Saya menggabungkan kreativitas visual dengan keahlian teknis untuk memberikan solusi terbaik bagi setiap proyek.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {servicesList.map((service, idx) => (
            <div
              key={service.id}
              className="group relative bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(46,71,53,0.12)] transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col h-full"
            >
              {/* Glossy Top Reflection */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white to-transparent opacity-80 pointer-events-none z-10 rounded-t-[2.5rem]"></div>
              
              <div className="relative z-20 flex-1 flex flex-col">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-lg bg-gradient-to-br ${service.color} text-white group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                  {service.icon}
                </div>
                
                <h3 className="text-2xl font-extrabold text-slate-900 mb-4 group-hover:text-[#2e4735] transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-slate-500 text-sm leading-relaxed font-medium mb-8 flex-1">
                  {service.desc}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-slate-100">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-bold px-3 py-1.5 rounded-lg bg-slate-50 text-slate-600 border border-slate-100 group-hover:border-slate-200 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
