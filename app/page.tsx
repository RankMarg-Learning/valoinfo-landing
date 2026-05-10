"use client";

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { 
  Activity, Trophy, Users, Globe, Calendar, TrendingUp, 
  ChevronRight, Mail, Crosshair
} from 'lucide-react';

export default function ValoInfoLanding() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="relative min-h-screen bg-background overflow-hidden font-sans selection:bg-valo-red/30 selection:text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-valo-cyan/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-valo-red/20 to-transparent" />
        {/* Glow Effects */}
        {mounted && (
          <motion.div 
            style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }} 
            className="absolute top-0 left-0 w-[600px] h-[600px] bg-valo-cyan/5 blur-[120px] rounded-full z-0 transition-opacity duration-300"
          />
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-40">
        {/* Navigation / Header */}
        <nav className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50">
          <div className="flex items-center gap-2">
            <Crosshair className="w-8 h-8 text-valo-red" />
            <span className="text-2xl font-black tracking-tighter text-white">
              VALO<span className="text-valo-red">INFO</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex gap-4 mr-4">
              <a href="/crosshair" className="text-sm font-bold text-zinc-400 hover:text-white uppercase tracking-wider transition-colors">Crosshair Builder</a>
              <a href="/career" className="text-sm font-bold text-zinc-400 hover:text-white uppercase tracking-wider transition-colors">Careers</a>
            </div>
            <a href="https://x.com/thevaloinfo" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://discord.gg/Je4hgajgQW" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/></svg>
            </a>
            <a href="https://www.instagram.com/thevaloinfo/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.169a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/></svg>
            </a>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mt-16 md:mt-32">
          <TypingEffect />
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter mb-6 drop-shadow-lg"
          >
            ValoInfo is <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-valo-red via-valo-purple to-valo-cyan">
              Coming Soon
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-10 font-medium"
          >
            Live matches, tournaments, rankings, esports news, and everything Valorant — all in one place.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 mb-16 w-full sm:w-auto"
          >
            <button className="group relative px-8 py-4 bg-valo-red text-white font-bold uppercase tracking-wider overflow-hidden rounded-sm transition-transform hover:scale-105 w-full sm:w-auto">
              <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out skew-x-12" />
              Notify Me
            </button>
            <a href="https://discord.gg/Je4hgajgQW" target="_blank" rel="noopener noreferrer" className="group px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold uppercase tracking-wider border border-white/10 hover:border-valo-cyan/50 rounded-sm transition-all flex items-center justify-center gap-2 w-full sm:w-auto">
              Join Discord
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="mt-32">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">Built for Valorant Fans</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-valo-red to-valo-cyan mx-auto mt-6 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <FeatureCard key={idx} feature={feature} index={idx} />
            ))}
          </div>
        </div>

        {/* Community & Stats */}
        <div className="mt-32 p-1 rounded-3xl bg-gradient-to-r from-valo-red/20 via-valo-purple/20 to-valo-cyan/20">
          <div className="bg-background border border-white/10 rounded-[23px] p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-valo-red/10 blur-[100px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-valo-cyan/10 blur-[100px] rounded-full" />
            
            <h3 className="text-3xl font-bold text-white mb-10 relative z-10">The Ultimate Hub</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              <div className="flex flex-col items-center">
                <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500">24/7</span>
                <span className="text-valo-cyan font-semibold mt-2 uppercase tracking-widest text-sm">Match Coverage</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500">&lt;1s</span>
                <span className="text-valo-red font-semibold mt-2 uppercase tracking-widest text-sm">Real-Time Updates</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500">100+</span>
                <span className="text-valo-purple font-semibold mt-2 uppercase tracking-widest text-sm">Tournaments Tracked</span>
              </div>
            </div>
          </div>
        </div>

        {/* Subscribe Section */}
        <div className="mt-32 max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Get Early Access</h2>
          <p className="text-zinc-400 mb-8">Join the waitlist to be notified as soon as we launch.</p>
          <form className="relative flex flex-col sm:flex-row items-center gap-2" onSubmit={(e) => e.preventDefault()}>
            <div className="relative w-full">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-white/5 border border-white/10 focus:border-valo-cyan/50 focus:ring-1 focus:ring-valo-cyan/50 rounded-sm py-4 pl-12 pr-4 text-white outline-none transition-all placeholder:text-zinc-600"
              />
            </div>
            <button type="submit" className="w-full sm:w-auto whitespace-nowrap px-8 py-4 bg-valo-red hover:bg-red-500 text-white font-bold rounded-sm transition-colors uppercase text-sm">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black/50 backdrop-blur-lg pt-16 pb-12 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Crosshair className="w-6 h-6 text-valo-red" />
            <span className="text-xl font-black tracking-tighter text-white">
              VALO<span className="text-valo-red">INFO</span>
            </span>
          </div>
          <p className="text-zinc-500 text-sm">© 2026 ValoInfo. All rights reserved.</p>
          <div className="flex flex-wrap gap-6 mt-4 md:mt-0 justify-center">
            <a href="/crosshair" className="text-zinc-500 hover:text-valo-cyan transition-colors text-sm font-bold uppercase tracking-wider">Crosshairs</a>
            <a href="/career" className="text-zinc-500 hover:text-valo-red transition-colors text-sm font-bold uppercase tracking-wider">Careers</a>
            <a href="https://x.com/thevaloinfo" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-valo-cyan transition-colors text-sm font-medium">Twitter</a>
            <a href="https://discord.gg/Je4hgajgQW" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-valo-purple transition-colors text-sm font-medium">Discord</a>
            <a href="https://www.instagram.com/thevaloinfo/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-valo-red transition-colors text-sm font-medium">Instagram</a>
          </div>
        </div>
      </footer>

      {/* Fake Live Ticker */}
      <div className="fixed bottom-0 left-0 right-0 bg-valo-red text-white text-xs font-bold uppercase tracking-widest py-2 px-4 overflow-hidden z-50 flex items-center shadow-[0_0_20px_rgba(255,70,85,0.4)]">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-4 flex-shrink-0" />
        <div className="flex-1 overflow-hidden relative h-4">
          <motion.div 
            animate={{ x: [0, -1500] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="whitespace-nowrap flex items-center absolute inset-y-0"
          >
            <span className="mx-4">Champions Tour updates arriving soon...</span>
            <span className="mx-4 text-white/50">•</span>
            <span className="mx-4 text-white/50">•</span>
            <span className="mx-4">Live kill feed system calibrating...</span>
            <span className="mx-4 text-white/50">•</span>
            <span className="mx-4">Global team power rankings recalibrating...</span>
            {/* Duplicated for seamless loop */}
            <span className="mx-4 text-white/50">•</span>
            <span className="mx-4">Champions Tour updates arriving soon...</span>
            <span className="mx-4 text-white/50">•</span>
            <span className="mx-4 text-white/50">•</span>
            <span className="mx-4">Live kill feed system calibrating...</span>
            <span className="mx-4 text-white/50">•</span>
            <span className="mx-4">Global team power rankings recalibrating...</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Components Data & Implementation
const features = [
  { icon: <Activity className="w-6 h-6 text-valo-red" />, title: "Live Match Tracking", desc: "Real-time scores, economy, and round-by-round updates synchronized instantly." },
  { icon: <Trophy className="w-6 h-6 text-valo-cyan" />, title: "Tournament Coverage", desc: "Complete VCT, Challengers, and Ascension brackets, schedules, and VODs." },
  { icon: <Users className="w-6 h-6 text-valo-purple" />, title: "Team & Player Stats", desc: "Deep analytical stats, ACS, KAST, and comprehensive head-to-head records." },
  { icon: <TrendingUp className="w-6 h-6 text-valo-red" />, title: "Breaking Esports News", desc: "Latest roster changes, patch notes, and competitive scene updates as they happen." },
  { icon: <Calendar className="w-6 h-6 text-valo-cyan" />, title: "Match Schedules", desc: "Never miss a match with our comprehensive, time-zone adjusted calendar system." },
  { icon: <Globe className="w-6 h-6 text-valo-purple" />, title: "Global Rankings", desc: "Dynamically updated global and regional team power rankings based on performance." }
];

const FeatureCard = ({ feature, index }: { feature: any, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative p-px rounded-2xl bg-gradient-to-b from-white/10 to-transparent overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-valo-red/20 via-transparent to-valo-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative h-full bg-[#0d121f] group-hover:bg-[#12192b] transition-colors p-8 rounded-[15px] flex flex-col gap-4 z-10">
        <div className="p-3 bg-white/5 w-fit rounded-lg shadow-lg group-hover:shadow-[0_0_20px_rgba(255,70,85,0.2)] transition-all duration-300 transform group-hover:-translate-y-1">
          {feature.icon}
        </div>
        <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-valo-cyan transition-all">{feature.title}</h3>
        <p className="text-zinc-400 leading-relaxed text-sm font-medium">{feature.desc}</p>
      </div>
    </motion.div>
  );
};


const TypingEffect = () => {
  const text = "Tracking the Valorant Esports Universe...";
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-valo-cyan/10 border border-valo-cyan/20 mb-8">
      <span className="w-2 h-2 bg-valo-cyan rounded-full animate-pulse shadow-[0_0_10px_rgba(0,240,255,0.8)]" />
      <span className="text-valo-cyan font-mono text-sm sm:text-base font-medium h-6 flex items-center">
        {displayedText}
        <span className="w-2 h-4 bg-valo-cyan/80 ml-1 animate-pulse" />
      </span>
    </div>
  );
}
