import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import SmartImage from "./SmartImage";
import { Shield } from "lucide-react";

export default function Loading() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-dark-black flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="relative">
            {/* Pulsing rings */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 0.3 }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
              className="absolute inset-0 border-2 border-light-cyan rounded-full"
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 2, opacity: 0.1 }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeOut", delay: 0.5 }}
              className="absolute inset-0 border border-light-cyan rounded-full"
            />
            
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="relative z-10"
            >
              <SmartImage 
                src="/input_file_1.png" 
                alt="Overlimit Logo" 
                className="h-32 md:h-48 w-auto object-contain drop-shadow-[0_0_30px_rgba(0,191,255,0.5)]" 
                fallbackIcon={<Shield className="w-32 h-32 text-light-cyan animate-pulse" />}
              />
            </motion.div>
          </div>
          
          {/* Loading status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex flex-col items-center gap-4"
          >
            <div className="font-display text-xs font-black tracking-[0.5em] text-white uppercase italic">
              INITIALIZING OVER LIMIT
            </div>
            <div className="w-48 h-1 bg-white/5 relative overflow-hidden">
              <motion.div
                initial={{ left: "-100%" }}
                animate={{ left: "100%" }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="absolute top-0 bottom-0 w-1/2 bg-light-cyan shadow-[0_0_10px_rgba(0,191,255,0.8)]"
              />
            </div>
            <div className="font-technical text-[8px] text-light-cyan/50 font-black uppercase tracking-[0.2em]">
              Establishing Secure Connection // Athens, GR
            </div>
          </motion.div>

          {/* Background text */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 font-display text-[20vw] font-black text-white/[0.02] pointer-events-none select-none uppercase italic leading-none text-center whitespace-nowrap">
            OVERLIMIT RP
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
