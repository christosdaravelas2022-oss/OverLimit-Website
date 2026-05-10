import React from "react";
import { motion } from "motion/react";
import { Crown, Terminal } from "lucide-react";

const founders = [
  {
    name: "XristosX",
    role: "Founder & Lead Director",
    icon: <Crown className="w-10 h-10 text-light-cyan" />,
    desc: "Architect of the Over Limit vision. Oversees all core operations and strategic development."
  },
  {
    name: "Elgordo",
    role: "Founder & Technical Lead",
    icon: <Terminal className="w-10 h-10 text-light-cyan" />,
    desc: "Mastermind behind the high-performance scripts and server infrastructure safety."
  }
];

export default function Ownership() {
  return (
    <section className="py-32 relative overflow-hidden bg-dark-black" id="ownership">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-light-cyan rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-light-cyan rounded-full blur-[120px]" />
      </div>
      
      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div 
              initial={{opacity:0, x:-20}} 
              whileInView={{opacity:1, x:0}} 
              viewport={{once:true}} 
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-12 h-[1px] bg-light-cyan/30" />
              <span className="font-technical text-xs text-light-cyan uppercase tracking-[0.4em] font-black">
                Administration Hierarchy
              </span>
            </motion.div>
            <motion.h2 
              initial={{opacity:0, y:20}} 
              whileInView={{opacity:1, y:0}} 
              viewport={{once:true}} 
              className="heading-massive text-6xl md:text-8xl text-white leading-none"
            >
              PROJECT <span className="text-light-cyan">OWNERSHIP</span>
            </motion.h2>
          </div>
          
          <motion.div 
            initial={{opacity:0}} 
            whileInView={{opacity:1}} 
            viewport={{once:true}} 
            className="hidden md:block text-right"
          >
            <div className="font-technical text-[10px] text-soft-gray uppercase tracking-widest leading-relaxed">
              Security Clearance: LEVEL 5<br/>
              Status: <span className="text-green-500">OPERATIONAL</span>
            </div>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-white/5 border border-white/5">
          {founders.map((a, i) => (
            <motion.div 
              key={a.name}
              initial={{opacity:0, y:20}} 
              whileInView={{opacity:1, y:0}} 
              viewport={{once:true}} 
              transition={{delay: i*0.2}} 
              className="group relative bg-dark-black p-10 md:p-12 hover:bg-light-cyan/[0.02] transition-colors"
            >
              <div className="absolute top-6 left-6 hud-corner border-t border-l opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-6 right-6 hud-corner border-t border-r opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-6 left-6 hud-corner border-b border-l opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-6 right-6 hud-corner border-b border-r opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative mb-10 flex flex-col items-center justify-center">
                <div className="w-24 h-24 bg-graphite border border-white/5 rounded-sm flex items-center justify-center relative mb-8 group-hover:border-light-cyan/50 transition-colors shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                  <div className="absolute inset-0 bg-light-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {a.icon}
                </div>
                <div className="text-center">
                  <h3 className="heading-massive text-3xl text-white mb-2">{a.name}</h3>
                  <div className="text-light-cyan font-technical text-[10px] uppercase tracking-widest font-black">{a.role}</div>
                </div>
              </div>
              <p className="text-soft-gray font-sans text-sm text-center max-w-sm mx-auto leading-relaxed">{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
