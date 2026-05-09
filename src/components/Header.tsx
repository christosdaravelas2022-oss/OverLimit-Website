import { motion } from "motion/react";
import SmartImage from "./SmartImage";
import { Shield } from "lucide-react";

export default function Header() {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-dark-black/80 backdrop-blur-md border-b border-white/5"
      id="header"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <SmartImage 
            src="/input_file_2.png" 
            alt="Overlimit Logo" 
            className="h-12 md:h-16 w-auto object-contain" 
            fallbackIcon={<Shield className="w-8 h-8 text-light-cyan" />}
          />
          <span className="font-display text-xl md:text-2xl font-black tracking-tighter text-white uppercase italic">
            OVERLIMIT<span className="text-light-cyan">RP</span>
          </span>
        </div>
        
        <nav className="hidden md:flex gap-10">
          {[
            { name: "Home", href: "#hero" },
            { name: "Servers", href: "#status" },
            { name: "Store", href: "#subscriptions" },
            { name: "Community", href: "#about" }
          ].map((item, i) => (
            <a 
              key={item.name} 
              href={item.href} 
              className={`font-technical text-[11px] uppercase tracking-[0.3em] font-black transition-colors ${i === 0 ? 'text-light-cyan border-b-2 border-light-cyan pb-1' : 'text-soft-gray hover:text-light-cyan'}`}
              id={`nav-link-${item.name.toLowerCase()}`}
            >
              {item.name}
            </a>
          ))}
        </nav>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="neon-border px-8 py-2.5 text-[11px] font-black uppercase tracking-[0.2em] bg-transparent hover:bg-light-cyan hover:text-dark-black transition-colors skew-btn"
          id="connect-now-button"
        >
          <span className="block">CONNECT NOW</span>
        </motion.button>
      </div>
    </motion.header>
  );
}
