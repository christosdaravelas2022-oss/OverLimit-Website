import { motion } from "motion/react";
import SmartImage from "./SmartImage";
import { Play, Zap, Shield, Cpu } from "lucide-react";

export default function Showcase() {
  return (
    <section className="py-32 bg-dark-black overflow-hidden relative" id="showcase">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-light-cyan/10 border border-light-cyan/20 rounded-full mb-6">
               <Zap className="w-3 h-3 text-light-cyan fill-current" />
               <span className="text-[10px] font-black uppercase tracking-widest text-light-cyan">High Performance Over Limit</span>
            </div>
            <h2 className="heading-massive text-6xl md:text-8xl mb-6 text-white text-glow">
              ELITE <span className="text-light-cyan">SHOWCASE</span>
            </h2>
            <p className="font-sans text-xl text-soft-gray max-w-2xl mx-auto leading-relaxed">
              Experience the next generation of Roleplay fidelity. Custom-built environments and high-performance architecture.
            </p>
          </motion.div>
        </div>

        {/* Bento Grid Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[700px]">
          {/* Main Large Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-sm glass-panel border-white/5"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-dark-black via-transparent to-transparent z-10 opacity-80" />
            <SmartImage 
              src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1200&auto=format&fit=crop"
              alt="Elite Performance"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
            />
            <div className="absolute bottom-8 left-8 z-20">
              <div className="flex items-center gap-2 mb-2">
                <Cpu className="w-5 h-5 text-light-cyan" />
                <span className="font-technical text-xs font-black text-light-cyan uppercase tracking-widest">Custom Engine</span>
              </div>
              <h4 className="font-display text-3xl font-black text-white italic">PEAK FIDELITY</h4>
              <p className="text-soft-gray text-sm font-medium mt-2 max-w-xs">Optimized core enhancing visuals and stability.</p>
            </div>
            <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
               <div className="w-12 h-12 rounded-full bg-light-cyan text-dark-black flex items-center justify-center shadow-[0_0_20px_rgba(0,191,255,0.6)]">
                 <Play className="w-6 h-6 fill-current" />
               </div>
            </div>
          </motion.div>

          {/* Tactical Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="md:col-span-2 relative group overflow-hidden rounded-sm glass-panel border-white/5 h-64 md:h-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-dark-black via-transparent to-transparent z-10 opacity-70" />
            <SmartImage 
              src="https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1200&auto=format&fit=crop"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
              alt="Tactical Units"
            />
            <div className="absolute bottom-6 left-6 z-20">
              <h4 className="font-display text-xl font-black text-white italic uppercase">Tactical Ops</h4>
              <p className="text-soft-gray text-[10px] uppercase tracking-widest mt-1">Professional RP Units & Elite Equipment</p>
            </div>
          </motion.div>

          {/* Two Small Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="relative group overflow-hidden rounded-sm glass-panel border-white/5 h-64 md:h-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-dark-black via-transparent to-transparent z-10 opacity-70" />
            <SmartImage 
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop"
              className="w-full h-full object-cover scale-150 group-hover:scale-[1.6] transition-transform duration-700"
              alt="Underground Scene"
            />
            <div className="absolute bottom-4 left-4 z-20">
              <h4 className="font-display text-lg font-black text-white italic uppercase whitespace-nowrap">Underground Nitro</h4>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -5 }}
            className="relative group overflow-hidden rounded-sm glass-panel border-white/5 h-64 md:h-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-dark-black via-transparent to-transparent z-10 opacity-70" />
            <div className="w-full h-full bg-graphite flex items-center justify-center border-l-2 border-light-cyan group-hover:bg-light-cyan/5 transition-colors">
               <div className="text-center">
                  <Cpu className="w-8 h-8 text-light-cyan mx-auto mb-2 opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div className="font-display text-4xl font-black text-white">60+</div>
                  <div className="font-technical text-[10px] text-soft-gray uppercase tracking-widest">Custom Scripts</div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative text background */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 font-display text-[20vw] font-black text-white/[0.01] pointer-events-none select-none uppercase italic leading-none whitespace-nowrap -z-0">
        OVERLIMIT SHOWCASE
      </div>
    </section>
  );
}
