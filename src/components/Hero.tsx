import { motion } from "motion/react";
import { ChevronRight, Shield } from "lucide-react";
import SmartImage from "./SmartImage";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden" id="hero">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-dark-black via-dark-black/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-black via-transparent to-dark-black/40 z-10" />
        <SmartImage 
          src="/input_file_2.png" 
          alt="Overlimit Banner" 
          className="w-full h-full object-contain scale-150 opacity-20 blur-sm"
        />
        <div className="absolute inset-0 bg-light-cyan/5 mix-blend-overlay" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
        {/* HUD Frame */}
        <div className="absolute -inset-4 border border-white/5 pointer-events-none rounded-sm overflow-hidden">
          <div className="hud-corner top-0 left-0 border-t-2 border-l-2" />
          <div className="hud-corner top-0 right-0 border-t-2 border-r-2" />
          <div className="hud-corner bottom-0 left-0 border-b-2 border-l-2" />
          <div className="hud-corner bottom-0 right-0 border-b-2 border-r-2" />
        </div>

        <motion.div
// ... rest of the file
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="mb-8 flex items-center gap-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <SmartImage 
                src="/input_file_2.png" 
                alt="Overlimit Logo" 
                className="h-48 md:h-72 w-auto object-contain drop-shadow-[0_0_50px_rgba(0,191,255,0.6)]" 
                fallbackIcon={<Shield className="w-24 h-24 text-light-cyan" />}
              />
            </motion.div>
            <div className="hud-line h-20 w-1 hidden md:block opacity-50" />
            <div className="hidden md:block">
              <div className="font-display text-2xl font-black text-white italic leading-tight">OVERLIMIT<br /><span className="text-light-cyan">NETWORK</span></div>
              <div className="font-technical text-[8px] text-soft-gray uppercase tracking-widest mt-1">Hellas // European Edition</div>
            </div>
          </div>

          <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 bg-graphite border-l-4 border-light-cyan">
            <span className="w-2 h-2 rounded-full bg-light-cyan animate-pulse" />
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-light-cyan">
              Overlimit Roleplay // Phase 1 Active
            </span>
          </div>

          <h1 className="heading-massive text-[80px] md:text-[120px] mb-8 text-white leading-[0.9]">
            PUSH THE<br />
            <span className="text-light-cyan text-glow">OVERLIMIT</span>
          </h1>

          <p className="font-sans text-xl text-soft-gray mb-12 leading-relaxed max-w-lg">
            High-performance scripts, elite community, and an unparalleled underground over limit. Experience the ultimate Greek Roleplay evolution.
          </p>

          <div className="flex flex-wrap gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-light-cyan text-dark-black font-display text-xl font-black px-12 py-6 skew-btn hover:shadow-[0_0_30px_rgba(0,191,255,0.4)] transition-all"
              id="cta-join"
            >
              <span className="block">JOIN OVER LIMIT</span>
            </motion.button>
            
            <motion.button
              whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              onClick={() => document.getElementById('subscriptions')?.scrollIntoView({ behavior: 'smooth' })}
              className="glass-panel text-white font-display text-xl font-black px-12 py-6 skew-btn transition-all"
              id="cta-store"
            >
              <span className="block">BROWSE STORE</span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Decorative side element */}
      <motion.div 
        initial={{ opacity: 0, rotate: 45, scale: 0.8 }}
        animate={{ opacity: 0.2, rotate: 15, scale: 1 }}
        transition={{ delay: 0.5, duration: 1.5 }}
        className="absolute -right-20 top-1/4 w-[600px] h-[600px] pointer-events-none"
      >
        <div className="w-full h-full border-[60px] border-light-cyan/30 blur-2xl rounded-full" />
      </motion.div>
    </section>
  );
}
