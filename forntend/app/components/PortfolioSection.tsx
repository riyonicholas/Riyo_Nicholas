"use client";
import { useRouter } from "next/navigation";

const servicesData = [
  {
    id: 1,
    title: "UI/UX Design",
    desc: "Merancang antarmuka aplikasi dan website yang modern serta intuitif untuk menciptakan pengalaman pengguna yang memukau.",
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop",
    tags: ["Figma", "Prototyping", "Wireframe"],
    badge: "UI/UX"
  },
  {
    id: 2,
    title: "Desain Grafis",
    desc: "Menciptakan aset visual, branding, dan ilustrasi estetis untuk memperkuat identitas merek secara profesional.",
    img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop",
    tags: ["Branding", "Vector", "Illustration"],
    badge: "Creative"
  },
  {
    id: 3,
    title: "Front-End Web",
    desc: "Membangun antarmuka web yang interaktif, responsif, dan super cepat menggunakan framework modern seperti React & Next.js.",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    tags: ["React", "Next.js", "TailwindCSS"],
    badge: "Code"
  },
  {
    id: 4,
    title: "Teknisi Hardware",
    desc: "Layanan perbaikan kelistrikan, upgrade komponen, dan optimasi perangkat keras komputer serta smartphone dengan tingkat analisis dan presisi tinggi.",
    img: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=800&auto=format&fit=crop",
    tags: ["Motherboard", "BGA IC", "PC Build"],
    badge: "Technical"
  },
  {
    id: 5,
    title: "Penelitian Akademis",
    desc: "Eksplorasi mendalam dan riset di bidang teknologi informasi untuk meneliti, mengembangkan, dan menghadirkan inovasi digital yang relevan.",
    img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop",
    tags: ["Academic", "Research", "Tech"],
    badge: "Academic"
  }
];

function ServiceCard({
  item,
  onExplore,
}: {
  item: (typeof servicesData)[0];
  onExplore: () => void;
}) {
  return (
    <div
      onClick={onExplore}
      className="group/card cursor-pointer w-full h-full flex flex-col select-none"
    >
      <div className="relative flex flex-col h-full rounded-[2rem] bg-white shadow-[0_10px_40px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgb(46,71,53,0.08)] border border-slate-100 transition-all duration-500 ease-out hover:-translate-y-2 overflow-hidden">
        
        {/* Top Image Area */}
        <div className="relative w-full aspect-[4/3] sm:aspect-video lg:aspect-[4/3] overflow-hidden bg-slate-100">
          <img
            src={item.img}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
          />
          {/* Subtle gradient overlay to make image look premium */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
          
          {/* Floating Badge (Top Left) */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3.5 py-1.5 bg-white/95 backdrop-blur-sm text-slate-800 text-[10px] sm:text-xs font-bold rounded-full uppercase tracking-wider shadow-sm">
              {item.badge}
            </span>
          </div>

          {/* Icon/Arrow (Top Right) */}
          <div className="absolute top-4 right-4 z-10">
            <div className="w-9 h-9 rounded-full bg-white/95 backdrop-blur-sm text-slate-800 shadow-sm flex items-center justify-center group-hover/card:bg-[#f5b201] group-hover/card:text-white transition-all duration-300 -rotate-45 group-hover/card:rotate-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="relative flex flex-col flex-1 p-6 sm:p-8">
          
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover/card:text-[#2e4735] transition-colors duration-300">
              {item.title}
            </h3>
            <span className="text-slate-300 text-sm font-extrabold font-mono">0{item.id}</span>
          </div>
          
          <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-6 font-medium">
            {item.desc}
          </p>

          <div className="mt-auto">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-semibold px-3 py-1.5 rounded-lg bg-slate-50 text-slate-600 border border-slate-100 group-hover/card:border-slate-200 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Footer Action */}
            <div className="pt-5 border-t border-slate-100 flex items-center justify-between text-[#2e4735] font-bold text-sm">
              <span>Eksplorasi Detail</span>
              <div className="flex items-center group-hover/card:translate-x-2 transition-transform duration-300 text-[#f5b201]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default function PortfolioSection() {
  const router = useRouter();

  return (
    <section id="portofolio" className="py-28 md:py-36 relative bg-slate-50 overflow-hidden">
      {/* Background Liquid Glass Orbs */}
      <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-[#f5b201]/30 rounded-full blur-[120px] pointer-events-none mix-blend-multiply opacity-70 animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-[600px] h-[600px] bg-[#2e4735]/20 rounded-full blur-[140px] pointer-events-none mix-blend-multiply opacity-70" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">

        {/* Centered Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-[#f5b201] font-bold text-[13px] md:text-sm tracking-[0.2em] uppercase mb-4 flex items-center justify-center gap-4">
            <span className="w-6 md:w-8 h-[2px] bg-[#f5b201]"></span> Layanan &amp; Keahlian
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6 drop-shadow-sm">
            Fokus <span className="font-medium italic text-[#f5b201]">Utama</span><br className="hidden md:block" /> Saya
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
            Berbagai pilar keahlian yang saya dedikasikan untuk menghadirkan solusi teknologi terpadu, mulai dari desain visual yang menawan, pengembangan aplikasi web interaktif, hingga penelitian dan perbaikan perangkat keras yang presisi.
          </p>
        </div>
      </div>

      {/* Cards Gallery */}
      <div className="w-full relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-10 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {servicesData.map((item, idx) => (
            <ServiceCard
              key={`card-${item.id}-${idx}`}
              item={item}
              onExplore={() => router.push("/services")}
            />
          ))}
        </div>
      </div>

      {/* View All Button */}
      <div className="flex justify-center mt-2 mb-12 relative z-10">
        <button
          onClick={() => router.push('/services')}
          className="group relative flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-bold rounded-full shadow-lg shadow-slate-900/30 hover:shadow-xl hover:shadow-slate-900/40 hover:bg-slate-800 transition-all duration-300 hover:-translate-y-1"
        >
          View All Projects
          <span className="w-8 h-8 rounded-full bg-[#f5b201] text-slate-900 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </span>
        </button>
      </div>
    </section>
  );
}
