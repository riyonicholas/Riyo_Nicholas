"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function HeroSection() {
  const router = useRouter();
  
  return (
    <>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
          width: max-content;
        }
        .animate-spin-slow {
          animation: spin 12s linear infinite;
        }
      `}</style>

      <section id="beranda" className="pt-32 lg:pt-40 pb-0 bg-slate-50 font-sans overflow-hidden relative z-0">
        {/* Liquid Glass Background Orbs */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#f5b201]/20 rounded-full blur-[140px] pointer-events-none mix-blend-multiply opacity-70 animate-pulse z-0" />
        <div className="absolute bottom-20 right-0 w-[500px] h-[500px] bg-[#2e4735]/10 rounded-full blur-[120px] pointer-events-none mix-blend-multiply opacity-60 z-0" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 lg:gap-8 items-center min-h-[70vh] relative z-10">

          {/* Left Column: Content */}
          <div className="space-y-8 relative z-10 text-left">
            {/* Glassmorphism Hello There Badge */}
            <div className="inline-block relative">
              <span className="bg-white/50 backdrop-blur-xl border border-white/80 px-6 py-2.5 text-slate-700 font-bold inline-block text-sm tracking-wider shadow-[0_4px_16px_0_rgba(0,0,0,0.05)] rounded-2xl flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#f5b201] animate-ping"></span>
                Hello There!
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
              I'm <span className="text-[#f5b201] underline decoration-[#f5b201] decoration-4 underline-offset-8">Riyo Nicholas Saputra,</span> <br className="hidden lg:block" />
              <span className="mt-4 block text-[0.8em]">Front-End Developer</span>
              <span className="mt-2 block text-[0.8em]">Based in Indonesia.</span>
            </h1>

            {/* Paragraph */}
            <p className="text-gray-500 text-lg leading-relaxed max-w-lg font-medium">
              I'm an experienced Front-End Web Developer & Hardware Technician collaborating with various clients and building modern solutions.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-5 pt-4">
              <button
                onClick={() => document.getElementById("portofolio")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-white/40 backdrop-blur-2xl border border-white/60 hover:bg-white/60 hover:-translate-y-1 text-slate-900 pl-8 pr-2 py-2 rounded-full font-bold transition-all duration-300 flex items-center gap-4 text-sm md:text-base shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] hover:shadow-[0_16px_48px_0_rgba(0,0,0,0.15)] group"
              >
                View My Portfolio
                <span className="w-10 h-10 bg-white/80 border border-white text-slate-900 flex items-center justify-center rounded-full shadow-inner group-hover:bg-[#f5b201] group-hover:border-[#f5b201] group-hover:text-white transition-all">
                  <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </span>
              </button>
              <button
                onClick={() => document.getElementById("kontak")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-white/60 backdrop-blur-xl hover:bg-white/90 text-slate-900 border border-white/80 hover:scale-105 px-8 py-3.5 rounded-full font-bold transition-all duration-300 text-sm md:text-base shadow-sm"
              >
                Hire Me
              </button>
            </div>
          </div>

          {/* Right Column: Images & Shapes */}
          <div className="relative w-full h-full flex items-center justify-center mt-10 lg:mt-0 px-4 md:px-8">

            {/* Main Image Container with Stacked Glass Effect */}
            <div className="relative w-full max-w-sm md:max-w-md aspect-[4/5] z-10 mx-auto">
              
              {/* Back Card (Glass offset) */}
              <div className="absolute inset-0 bg-white/40 backdrop-blur-2xl rounded-[2.5rem] border border-white/60 shadow-xl -rotate-6 translate-x-3 translate-y-4"></div>

              {/* Front Card (Image container) */}
              <div className="absolute inset-0 bg-white/60 backdrop-blur-3xl rounded-[2.5rem] border-[4px] border-white/80 shadow-[0_16px_40px_0_rgba(0,0,0,0.15)] overflow-hidden flex items-end justify-center">
                <Image
                  src="/gambar/WhatsApp%20Image%202026-08-26%20at%2017.30.52.jpeg"
                  alt="Hero Photo"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>

              {/* Floating Badge 1 (Green Glass) */}
              <div className="absolute -left-6 md:-left-12 top-1/3 bg-[#2e4735]/85 backdrop-blur-xl border border-white/20 text-white px-5 md:px-6 py-2.5 rounded-full font-bold text-xs md:text-sm shadow-xl flex items-center gap-2.5 z-20">
                <span className="w-2.5 h-2.5 bg-[#f5b201] rounded-full opacity-100 shadow-[0_0_8px_rgba(245,178,1,0.8)]"></span>
                Product Designer
              </div>

              {/* Floating Badge 2 (Yellow Glass) */}
              <div className="absolute -right-4 md:-right-8 bottom-1/4 bg-[#f5b201]/90 backdrop-blur-xl border border-white/40 text-[#2e4735] px-5 md:px-6 py-2.5 rounded-full font-extrabold text-xs md:text-sm shadow-xl flex items-center gap-2 z-20">
                <span className="text-white drop-shadow-sm text-base">✨</span>
                UI/UX Designer
              </div>

              {/* Circular "Hire Me" Glass Badge */}
              <div className="absolute -top-6 -right-6 md:-top-10 md:-right-10 w-24 h-24 md:w-28 md:h-28 bg-[#2e4735]/85 backdrop-blur-xl rounded-full flex items-center justify-center shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] z-20 border border-white/30">
                <div className="absolute inset-0 animate-spin-slow pointer-events-none">
                  <svg viewBox="0 0 100 100" className="w-full h-full p-2 text-[#f5b201]">
                    <path id="curve" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                    <text className="text-[14px] font-bold uppercase tracking-[0.2em]" fill="currentColor">
                      <textPath href="#curve" startOffset="0">HIRE ME • HIRE ME •</textPath>
                    </text>
                  </svg>
                </div>
                <div className="w-8 h-8 md:w-10 md:h-10 bg-[#f5b201]/90 backdrop-blur-md rounded-full flex items-center justify-center text-[#2e4735] z-10 shadow-inner border border-white/40">
                  <svg className="w-4 h-4 md:w-5 md:h-5 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Glassmorphism Marquee Banner Section */}
        <div className="relative mt-20 md:mt-28 w-full mb-10 z-10">
          {/* Dark green slanted background (Glassy) */}
          <div className="absolute top-2 md:top-4 left-0 w-full h-16 md:h-20 bg-[#1f3124]/90 backdrop-blur-2xl border-t border-white/10 origin-left -rotate-[2deg] z-0"></div>
          
          {/* Orange horizontal marquee layer (Glassy) */}
          <div className="relative w-full h-14 md:h-16 bg-[#fb9e00]/90 backdrop-blur-2xl flex items-center overflow-hidden z-10 border-y border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]">
            <div className="flex animate-marquee items-center gap-10 md:gap-16 text-white font-semibold text-lg md:text-xl tracking-wide px-4 drop-shadow-md">
              <span>App Design</span> <span className="text-white/40 text-sm font-normal">•</span>
              <span>Website Design</span> <span className="text-white/40 text-sm font-normal">•</span>
              <span>Dashboard</span> <span className="text-white/40 text-sm font-normal">•</span>
              <span>Wireframe</span> <span className="text-white/40 text-sm font-normal">•</span>
              <span>Hardware Setup</span> <span className="text-white/40 text-sm font-normal">•</span>

              {/* Duplicate for seamless looping */}
              <span>App Design</span> <span className="text-white/40 text-sm font-normal">•</span>
              <span>Website Design</span> <span className="text-white/40 text-sm font-normal">•</span>
              <span>Dashboard</span> <span className="text-white/40 text-sm font-normal">•</span>
              <span>Wireframe</span> <span className="text-white/40 text-sm font-normal">•</span>
              <span>Hardware Setup</span> <span className="text-white/40 text-sm font-normal">•</span>
            </div>
          </div>
        </div>
      </section>

      {/* Liquid Glass Services Section */}
      <section id="layanan" className="relative z-20 bg-[#f1f5f9] pt-24 pb-20 overflow-hidden">
        {/* Subtle Gray Grid Wallpaper */}
        <div className="absolute inset-0 z-0 opacity-60" style={{ 
          backgroundImage: 'linear-gradient(to right, #cbd5e1 1px, transparent 1px), linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)',
          backgroundSize: '40px 40px' 
        }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#f1f5f9] to-transparent z-0 pointer-events-none opacity-80"></div>

        {/* Background Orbs for Services */}
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#f5b201]/20 rounded-full blur-[120px] pointer-events-none mix-blend-multiply opacity-80 z-0" />
        <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-[#2e4735]/20 rounded-full blur-[120px] pointer-events-none mix-blend-multiply opacity-70 z-0" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <p className="text-[#f5b201] font-bold text-[13px] md:text-sm tracking-[0.2em] uppercase mb-4 flex items-center gap-4">
                <span className="w-6 md:w-8 h-[2px] bg-[#f5b201]"></span> Services
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight drop-shadow-sm">
                Services <span className="font-medium italic text-[#f5b201]">I</span><br className="hidden md:block" /> Provide
              </h2>
            </div>
            <button 
              onClick={() => router.push("/all-services")}
              className="hidden md:flex mt-6 md:mt-0 bg-[#2e4735]/90 backdrop-blur-xl border border-white/20 hover:bg-[#1f3124] hover:scale-105 text-white pl-6 pr-1.5 py-1.5 rounded-full font-bold transition-all duration-300 items-center gap-4 text-sm shadow-[0_8px_24px_0_rgba(46,71,53,0.3)]"
            >
              View All Services
              <span className="w-8 h-8 bg-white/20 backdrop-blur-md text-white border border-white/40 flex items-center justify-center rounded-full">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </span>
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Glass Card 1 */}
            <div className="relative bg-gradient-to-br from-white/40 to-white/5 backdrop-blur-[40px] p-10 rounded-[2.5rem] border border-white/40 border-t-white/90 border-l-white/90 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] hover:-translate-y-2 hover:shadow-[0_24px_64px_0_rgba(0,0,0,0.1)] hover:from-white/50 hover:to-white/10 transition-all duration-500 group overflow-hidden">
              {/* Glossy Top Reflection */}
              <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/50 to-transparent opacity-60 pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/70 backdrop-blur-xl rounded-2xl shadow-sm border border-white flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                  <span className="bg-[#2e4735] text-xs font-black text-[#f5b201] px-2 py-1 rounded-lg">UX</span>
                </div>
                <h3 className="font-extrabold text-slate-900 mb-4 text-xl">UI/UX Design</h3>
                <p className="text-slate-600 leading-relaxed mb-6 text-sm font-medium">
                  Membangun pengalaman pengguna yang intuitif dan antarmuka visual yang modern dan responsif.
                </p>
                <a href="#" className="text-slate-900 font-bold text-sm flex items-center gap-2 group-hover:text-[#2e4735]">
                  Learn more <span className="text-[#f5b201] group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>

            {/* Glass Card 2 */}
            <div className="relative bg-gradient-to-br from-white/40 to-white/5 backdrop-blur-[40px] p-10 rounded-[2.5rem] border border-white/40 border-t-white/90 border-l-white/90 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] hover:-translate-y-2 hover:shadow-[0_24px_64px_0_rgba(0,0,0,0.1)] hover:from-white/50 hover:to-white/10 transition-all duration-500 group overflow-hidden">
              {/* Glossy Top Reflection */}
              <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/50 to-transparent opacity-60 pointer-events-none"></div>

              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/70 backdrop-blur-xl rounded-2xl shadow-sm border border-white flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                  ⚙️
                </div>
                <h3 className="font-extrabold text-slate-900 mb-4 text-xl">Application Design</h3>
                <p className="text-slate-600 leading-relaxed mb-6 text-sm font-medium">
                  Merancang aplikasi dengan performa tinggi untuk Android, Windows, dan berbagai platform lainnya.
                </p>
                <a href="#" className="text-slate-900 font-bold text-sm flex items-center gap-2 group-hover:text-[#2e4735]">
                  Learn more <span className="text-[#f5b201] group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>

            {/* Glass Card 3 */}
            <div className="relative bg-gradient-to-br from-white/40 to-white/5 backdrop-blur-[40px] p-10 rounded-[2.5rem] border border-white/40 border-t-white/90 border-l-white/90 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] hover:-translate-y-2 hover:shadow-[0_24px_64px_0_rgba(0,0,0,0.1)] hover:from-white/50 hover:to-white/10 transition-all duration-500 group overflow-hidden">
              {/* Glossy Top Reflection */}
              <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/50 to-transparent opacity-60 pointer-events-none"></div>

              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/70 backdrop-blur-xl rounded-2xl shadow-sm border border-white flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                  💻
                </div>
                <h3 className="font-extrabold text-slate-900 mb-4 text-xl">Website Design</h3>
                <p className="text-slate-600 leading-relaxed mb-6 text-sm font-medium">
                  Menciptakan situs web landing page, profil perusahaan, hingga portofolio dengan keunggulan teknis.
                </p>
                <a href="#" className="text-slate-900 font-bold text-sm flex items-center gap-2 group-hover:text-[#2e4735]">
                  Learn more <span className="text-[#f5b201] group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
