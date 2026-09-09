"use client";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#f1f5f9] font-sans relative z-10 overflow-hidden text-gray-900 pt-24 border-t border-gray-200">
      {/* Subtle Gray Grid Wallpaper */}
      <div className="absolute inset-0 z-0 opacity-60 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(to right, #cbd5e1 1px, transparent 1px), linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#f1f5f9] to-transparent z-0 pointer-events-none opacity-80"></div>

      {/* Liquid Glass Background Orbs (Light Mode) */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#f5b201]/20 rounded-full blur-[140px] pointer-events-none -z-10 mix-blend-multiply" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#2e4735]/10 rounded-full blur-[120px] pointer-events-none -z-10 mix-blend-multiply" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Top Section: Let's Connect */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-extrabold drop-shadow-sm tracking-tight text-gray-900">
            Let's <span className="text-[#f5b201] font-light italic">Connect</span> there
          </h2>
          <button
            onClick={() => document.getElementById("portofolio")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-6 bg-white/80 backdrop-blur-2xl border border-gray-200 hover:bg-white hover:border-gray-300 px-2 py-2 pl-8 rounded-full font-bold transition-all shadow-sm hover:shadow-md group text-gray-800"
          >
            View Portfolio
            <div className="w-12 h-12 bg-[#2e4735] rounded-full flex items-center justify-center text-[#f5b201] shadow-inner group-hover:bg-[#f5b201] group-hover:text-white transition-colors border border-transparent">
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </div>
          </button>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-16"></div>

        {/* 4-Column Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-12 text-left mb-20">

          {/* Column 1: Logo & Desc */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 font-bold text-3xl text-gray-900 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#f5b201] flex items-center justify-center text-white font-black shadow-md">
                R
              </div>
              <span className="font-extrabold tracking-tight">Riyo<span className="text-[#f5b201]">.</span></span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed font-medium mb-8 max-w-sm">
              Praktisi teknologi &amp; kreator visual yang mengintegrasikan kode modern, estetika desain visual, dan reparasi perangkat keras secara profesional.
            </p>
            <div className="flex flex-wrap gap-4">
              {[
                { label: "Facebook", icon: "FB" },
                { label: "LinkedIn", icon: "IN" },
                { label: "YouTube", icon: "YT" },
                { label: "Twitter", icon: "X" },
                { label: "Instagram", icon: "IG" }
              ].map((soc, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-[#f5b201] flex items-center justify-center text-white shadow-sm hover:-translate-y-1 hover:scale-110 hover:bg-[#2e4735] transition-all font-black text-[10px] tracking-wider">
                  {soc.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="lg:col-span-2">
            <h4 className="text-[#f5b201] text-sm font-bold mb-6 tracking-widest uppercase">Navigation</h4>
            <ul className="space-y-4 text-sm font-semibold text-gray-500">
              {["Home", "Services", "About", "Projects", "Blogs", "FAQs"].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="hover:text-gray-900 hover:translate-x-1 inline-block transition-all">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-[#f5b201] text-sm font-bold mb-6 tracking-widest uppercase">Contact</h4>
            <ul className="space-y-4 text-sm font-semibold text-gray-500">
              <li className="hover:text-gray-900 transition-colors cursor-pointer">+62 812-3456-7890</li>
              <li className="hover:text-gray-900 transition-colors cursor-pointer">www.riyonicholas.com</li>
              <li className="hover:text-gray-900 transition-colors cursor-pointer">hello@riyonicholas.com</li>
              <li className="max-w-[200px] leading-relaxed">Banyuwangi, Jawa Timur, Indonesia</li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:col-span-3">
            <h4 className="text-[#f5b201] text-sm font-bold mb-6 tracking-widest uppercase">Get the latest info</h4>
            <div className="flex items-center bg-white/60 backdrop-blur-xl border border-gray-200 rounded-xl p-1.5 shadow-sm focus-within:ring-2 focus-within:ring-[#f5b201]/40 transition-all">
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-transparent border-none text-gray-900 px-4 focus:outline-none placeholder:text-gray-400 text-sm font-medium"
              />
              <button className="w-10 h-10 rounded-lg bg-[#2e4735] flex items-center justify-center text-[#f5b201] hover:bg-[#1f3124] transition-colors shadow-sm flex-shrink-0 group">
                <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar (Solid Dark Green matching the image) */}
      <div className="bg-[#2e4735] py-6 border-t border-white/10 shadow-[0_-8px_32px_rgba(0,0,0,0.05)] relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-semibold text-white/70">
          <p>
            Copyright © {year} <span className="text-[#f5b201]">Riyo.</span> All Rights Reserved.
          </p>
          <div className="flex items-center gap-3">
            <a href="#" className="hover:text-white transition-colors">User Terms &amp; Conditions</a>
            <span className="text-white/20">|</span>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
