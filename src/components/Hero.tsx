import { motion } from "motion/react";
import { ChevronRight, Shield, Activity } from "lucide-react";
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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl"
        >
          <div className="mb-10 flex items-center gap-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 1, type: "spring", damping: 10 }}
            >
              <SmartImage 
                src="/input_file_2.png" 
                alt="Overlimit Logo" 
                className="h-48 md:h-72 w-auto object-contain drop-shadow-[0_0_80px_rgba(0,191,255,0.8)] hover:scale-110 transition-transform duration-500" 
                fallbackIcon={<Shield className="w-24 h-24 text-light-cyan" />}
              />
            </motion.div>
            <div className="hud-line h-24 w-1 hidden md:block opacity-50 bg-gradient-to-b from-transparent via-light-cyan to-transparent shadow-[0_0_15px_rgba(0,191,255,0.5)]" />
            <div className="hidden md:block">
              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="font-display text-4xl font-black text-white italic leading-tight tracking-tighter"
              >
                OVERLIMIT<br />
                <span className="text-light-cyan text-glow">NETWORK</span>
              </motion.div>
              <div className="font-technical text-[8px] text-soft-gray uppercase tracking-widest mt-1">Hellas // European Edition</div>
            </div>
          </div>

          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-8 inline-flex items-center gap-3 px-4 py-2 bg-light-cyan/5 border-l-4 border-light-cyan backdrop-blur-sm shadow-[0_0_20px_rgba(0,191,255,0.1)]"
          >
            <span className="w-2 h-2 rounded-full bg-light-cyan animate-pulse shadow-[0_0_10px_#00BFFF]" />
            <span className="text-[10px] uppercase font-black tracking-[0.3em] text-light-cyan">
              Overlimit Roleplay // Phase 1 Active // No Limit
            </span>
          </motion.div>

          <h1 className="heading-massive text-[80px] md:text-[120px] mb-8 text-white leading-[0.9]">
            PUSH THE<br />
            <span className="text-light-cyan text-glow">OVERLIMIT</span>
          </h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="font-sans text-xl text-soft-gray mb-14 leading-relaxed max-w-xl border-l-2 border-white/10 pl-8"
          >
            High-performance infrastructure, elite Greek community, and an unparalleled underground ecosystem. Witness the ultimate Roleplay evolution.
          </motion.p>

          <div className="flex flex-wrap gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const cfs = 'play.overlimit.gr:30120';
                navigator.clipboard.writeText(cfs);
              }}
              className="bg-light-cyan text-dark-black font-display text-xl font-black px-12 py-6 skew-btn hover:shadow-[0_0_30px_rgba(0,191,255,0.4)] transition-all flex items-center gap-4 group relative"
              id="cta-join"
            >
              <div className="absolute top-0 right-0 w-2 h-2 bg-dark-black opacity-20" />
              <Shield className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              <span className="block italic">JOIN OVERLIMIT</span>
            </motion.button>
            
            <motion.a
              href="fivem://connect/play.overlimit.gr:30120"
              whileHover={{ backgroundColor: "rgba(0,191,255,0.1)", borderColor: "rgba(0,191,255,0.5)" }}
              className="glass-panel text-white font-display text-xl font-black px-12 py-6 skew-btn transition-all group border border-white/10 flex items-center gap-4"
              id="cta-connect"
            >
              <Activity className="w-6 h-6 text-light-cyan group-hover:animate-pulse" />
              <span className="block group-hover:text-light-cyan transition-colors italic">CONNECT TO SERVER</span>
            </motion.a>
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
