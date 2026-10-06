"use client";

const socials = [
  {
    name: "WhatsApp",
    url: "https://wa.me/6281234567890", // Ganti dengan nomor WhatsApp Anda
    color: "bg-emerald-500",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.44A12.02 12.02 0 0012 0a12 12 0 00-10.4 17.9L0 24l6.23-1.63a11.97 11.97 0 005.77 1.48h.01a12 12 0 0011.96-12 12.04 12.04 0 00-3.45-8.41zm-8.52 18.53h-.01a10.02 10.02 0 01-5.11-1.39l-.37-.22-3.8.99 1.01-3.7-.24-.38A9.97 9.97 0 012.03 12a10 10 0 0117.06-7.07 9.97 9.97 0 012.9 7.07 10 10 0 01-9.99 10zM17.5 14.5c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15s-.78.98-.95 1.18c-.18.2-.35.23-.65.08-1.57-.75-2.78-1.42-3.86-2.67-.28-.32.3-.3.86-1.42.1-.2.05-.38-.03-.53-.08-.15-.68-1.63-.93-2.23-.24-.58-.48-.5-.68-.51h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.5 0 1.48 1.08 2.9 1.23 3.1.15.2 2.1 3.23 5.1 4.53 1.93.83 2.7.98 3.65.83.75-.13 2.38-.98 2.7-1.93.33-.95.33-1.75.23-1.93-.1-.15-.38-.23-.68-.38z" /></svg>
    ),
    username: "+62 812-3456-7890" // Ganti dengan teks nomor Anda
  },
  {
    name: "Instagram",
    url: "https://instagram.com/riyonicholas", // Ganti link IG Anda
    color: "bg-pink-600",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
    ),
    username: "@riyonicholas"
  },
  {
    name: "TikTok",
    url: "https://tiktok.com/@riyonicholas", // Ganti link TikTok Anda
    color: "bg-slate-900",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.95v7.4c-.01 2.98-1.73 5.67-4.46 6.81-2.81 1.18-6.13.65-8.4-1.28-2.14-1.82-3.07-4.79-2.32-7.53.7-2.58 2.8-4.61 5.4-5.21 2.11-.49 4.41.01 6.13 1.35V5.53c-2.31-1.39-5.18-1.77-7.79-1.04-3.32.92-5.99 3.59-6.84 6.94-.8 3.12-.04 6.51 2.06 9.07 2.17 2.63 5.62 4.09 8.97 3.8 3.65-.3 6.9-2.71 8.24-6.17.65-1.65.92-3.45.92-5.22V.02h-3.92v.01z" /></svg>
    ),
    username: "@riyonicholas"
  },
  {
    name: "Facebook",
    url: "https://facebook.com/riyonicholas", // Ganti link FB Anda
    color: "bg-blue-600",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 22.954 24 17.99 24 12c0-6.627-5.373-12-12-12z" /></svg>
    ),
    username: "Riyo Nicholas"
  }
];

export default function ContactSection() {
  return (
    <section id="kontak" className="py-24 md:py-32 relative bg-[#2e4735] font-sans overflow-hidden z-0">

      {/* Light Liquid Glass Floating Orbs */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#f5b201]/15 rounded-full blur-[140px] pointer-events-none mix-blend-screen animate-pulse z-0 -translate-y-1/2" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen z-0" />

      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10 text-center">

        {/* Title Area */}
        <div className="flex flex-col items-center justify-center mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-[2px] bg-[#f5b201]"></span>
            <span className="text-[#f5b201] text-sm font-bold tracking-widest uppercase drop-shadow-sm">Contact</span>
            <span className="w-6 h-[2px] bg-[#f5b201]"></span>
          </div>
          <h2 className="text-5xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-tight drop-shadow-sm mb-6">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#f5b201] font-light italic">Connect</span>
          </h2>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Punya ide menarik, pertanyaan, atau sekadar ingin menyapa? Hubungi saya kapan saja melalui salah satu platform di bawah ini.
          </p>
        </div>

        {/* Social Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 w-full max-w-4xl mx-auto">
          {socials.map((social, i) => (
            <a
              key={i}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-6 md:p-8 bg-white/5 hover:bg-white/10 backdrop-blur-2xl border border-white/10 hover:border-white/30 rounded-[2rem] transition-all duration-500 group shadow-[0_16px_40px_rgba(0,0,0,0.1)] hover:shadow-[0_16px_40px_rgba(245,178,1,0.15)] hover:-translate-y-2 cursor-pointer"
            >
              <div className={`w-16 h-16 rounded-[1.25rem] bg-white/10 flex flex-shrink-0 items-center justify-center text-white mr-6 group-hover:${social.color} transition-colors duration-500 shadow-inner border border-white/5 group-hover:border-transparent`}>
                {social.icon}
              </div>
              <div className="flex flex-col items-start text-left">
                <span className="text-white/50 text-xs md:text-sm font-bold tracking-widest uppercase mb-1">{social.name}</span>
                <span className="text-white font-bold text-lg md:text-xl group-hover:text-[#f5b201] transition-colors duration-300">{social.username}</span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
