import { motion } from "motion/react";
import { MessageSquare, ScrollText, Shield } from "lucide-react";
import SmartImage from "./SmartImage";

const photos = [
  "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2072&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=2070&auto=format&fit=crop",
];

export default function About() {
  return (
    <section className="py-24 relative overflow-hidden" id="about">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <div className="hud-line w-24 mb-8 hidden lg:block" />
          <h2 className="heading-massive text-5xl md:text-7xl mb-8 text-white">
            PUSH THE <span className="text-light-cyan">LIMIT</span>
          </h2>
          <div className="space-y-6 font-sans text-soft-gray leading-relaxed text-lg">
            <p className="border-l-2 border-light-cyan/30 pl-6">
              OVERLIMIT Roleplay is the premier Greek FiveM community built on a custom architecture that prioritizes fluidity, immersion, and stability. 
              <br /><br />
              <span className="text-white font-bold">THE HIGHEST LIMIT:</span> Our server utilizes proprietary synchronization logic and optimized asset streaming to ensure zero-lag experience even during high-intensity 100+ player interactions.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mt-12">
            <a 
              href="https://discord.gg/83fQBbKYNE"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-light-cyan px-8 py-4 rounded-sm font-display text-xs font-black tracking-widest text-dark-black hover:shadow-[0_0_20px_rgba(0,191,255,0.4)] transition-all skew-btn" 
              id="join-discord-main"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="block">JOIN OUR DISCORD SERVER</span>
            </a>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-rules'))}
              className="flex items-center gap-2 glass-panel border border-white/10 px-8 py-4 rounded-sm font-display text-xs font-black tracking-widest hover:border-light-cyan transition-all skew-btn" 
              id="read-rules"
            >
              <ScrollText className="w-4 h-4" />
              <span className="block">SERVER RULES</span>
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-6 relative">
          <div className="absolute inset-0 bg-light-cyan/5 blur-3xl rounded-full" />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="col-span-1 h-64 md:h-80 overflow-hidden glass-panel border-l-4 border-light-cyan"
          >
            <SmartImage 
              src="/input_file_1.png" 
              alt="Overlimit Logo" 
              className="w-full h-full object-contain p-8 bg-dark-black transition-all duration-700 hover:scale-110" 
              fallbackIcon={<Shield className="w-20 h-20 text-light-cyan/20" />}
            />
            <div className="absolute top-0 right-0 p-3 opacity-20 font-display text-4xl font-black">01</div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="col-span-1 h-64 md:h-80 mt-12 overflow-hidden glass-panel"
          >
            <img src={photos[1]} alt="RP Action" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-110" />
            <div className="absolute top-0 right-0 p-3 opacity-20 font-display text-4xl font-black">02</div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="col-span-2 h-64 mt-4 overflow-hidden glass-panel"
          >
            <img src={photos[2]} alt="RP Action" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-110" />
            <div className="absolute bottom-0 right-0 p-3 opacity-20 font-display text-4xl font-black italic">OVERLIMIT OVER LIMIT</div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative text background */}
      <div className="absolute -bottom-10 -left-10 font-display text-[12vw] font-black text-white/[0.02] pointer-events-none select-none uppercase italic leading-none">
        OVERLIMIT
      </div>
    </section>
  );
}
