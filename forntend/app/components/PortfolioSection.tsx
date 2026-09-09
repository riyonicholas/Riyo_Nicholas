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
      className="group/card cursor-pointer shrink-0 w-[310px] sm:w-[370px] md:w-[410px] lg:w-[440px] flex flex-col select-none perspective-1000"
    >
      {/* Liquid Glass Container */}
      <div className="relative flex flex-col h-[460px] sm:h-[520px] rounded-[2.5rem] bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(46,71,53,0.12)] transition-all duration-700 ease-out hover:-translate-y-3 overflow-hidden">
        
        {/* Subtle Inner Glow / Reflection for Glass Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/70 pointer-events-none opacity-60 z-0" />

        {/* Floating Top Image Area */}
        <div className="relative w-full h-[45%] sm:h-[50%] p-4 sm:p-5 pb-0 z-20">
          <div className="w-full h-full rounded-[1.8rem] overflow-hidden shadow-sm relative border border-white/40">
            <img
              src={item.img}
              alt={item.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover/card:scale-110"
            />
            {/* Subtle overlay on image */}
            <div className="absolute inset-0 bg-black/5 group-hover/card:bg-black/0 transition-colors duration-500" />
            
            {/* Glass Badge Floating on Image */}
            <div className="absolute top-3.5 left-3.5">
              <span className="px-3.5 py-1.5 bg-white/80 text-[#2e4735] text-[10px] sm:text-xs font-bold rounded-full uppercase tracking-widest backdrop-blur-md shadow-sm border border-white">
                {item.badge}
              </span>
            </div>

            {/* Glass Number Indicator */}
            <div className="absolute top-3.5 right-3.5">
               <span className="w-8 h-8 flex items-center justify-center bg-black/20 backdrop-blur-md rounded-full text-white text-xs font-mono font-bold border border-white/30 shadow-sm">
                 0{item.id}
               </span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="relative z-30 flex flex-col flex-1 px-8 py-6 sm:px-10 sm:py-8">
          
          <div className="mb-auto">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-3 group-hover/card:text-[#2e4735] transition-colors duration-300 drop-shadow-sm">
              {item.title}
            </h3>
            
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4 font-medium">
              {item.desc}
            </p>
          </div>

          <div className="mt-auto">
            <div className="flex flex-wrap gap-2.5 mb-6">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] sm:text-xs font-bold px-3.5 py-1.5 rounded-xl bg-white/50 hover:bg-white text-[#2e4735] transition-colors backdrop-blur-md shadow-sm border border-white/60"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Animated Divider */}
            <div className="w-full h-[1px] bg-slate-300/60 mb-5 relative overflow-hidden rounded-full">
              <div className="absolute top-0 left-0 h-full w-full bg-[#f5b201] -translate-x-full group-hover/card:translate-x-0 transition-transform duration-700 ease-out" />
            </div>

            {/* Footer Explore Action */}
            <div className="flex items-center justify-between text-[#2e4735] font-bold text-sm">
              <span className="flex items-center gap-3 tracking-wide uppercase text-xs">
                Lihat Detail
                <div className="w-6 h-[2px] bg-[#2e4735] group-hover/card:w-12 group-hover/card:bg-[#f5b201] transition-all duration-500 ease-out" />
              </span>
              <div className="w-10 h-10 rounded-full bg-white/70 shadow-sm border border-white/80 flex items-center justify-center group-hover/card:bg-[#f5b201] group-hover/card:text-white transition-all duration-300 -rotate-45 group-hover/card:rotate-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
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
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
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
