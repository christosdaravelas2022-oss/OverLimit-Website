/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Header from "./components/Header";
import Hero from "./components/Hero";
import ServerStatus from "./components/ServerStatus";
import About from "./components/About";
import Streamers from "./components/Streamers";
import Subscriptions from "./components/Subscriptions";
import JobApplications from "./components/JobApplications";
import Showcase from "./components/Showcase";
import Ownership from "./components/Ownership";
import Loading from "./components/Loading";
import Footer from "./components/Footer";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { ServerStatsModal, SupportModal } from "./components/GlobalModals";
import { SpeedInsights } from "@vercel/speed-insights/react";

export default function App() {
  const [showTicker, setShowTicker] = useState(true);
  const [isServerStatsOpen, setIsServerStatsOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [supportTab, setSupportTab] = useState<'info' | 'terms' | 'privacy'>('info');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let frameId: number;
    const handleMouseMove = (e: MouseEvent) => {
      frameId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  const handleOpenSupport = (tab: 'info' | 'terms' | 'privacy' | any = 'info') => {
    if (typeof tab !== 'string') {
      tab = 'info';
    }
    setSupportTab(tab as 'info' | 'terms' | 'privacy');
    setIsSupportOpen(true);
  };
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-dark-black font-sans text-white overflow-x-hidden selection:bg-light-cyan selection:text-dark-black dot-grid cursor-none">
      <Loading />
      
      <div className="hidden lg:block">
        <motion.div
          className="custom-cursor"
          animate={{ x: mousePosition.x - 10, y: mousePosition.y - 10 }}
          transition={{ type: "spring", damping: 25, stiffness: 400, mass: 0.5 }}
        />
        <motion.div
          className="custom-cursor-inner"
          animate={{ x: mousePosition.x - 2, y: mousePosition.y - 2 }}
          transition={{ type: "spring", damping: 15, stiffness: 600, mass: 0.2 }}
        />
      </div>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-light-cyan z-[110] origin-left"
        style={{ scaleX }}
      />
      
      <AnimatePresence>
        {showTicker && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-light-cyan text-dark-black py-1.5 relative z-[60] overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
              <div className="flex items-center gap-4 flex-1 justify-center md:justify-start">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-dark-black animate-pulse" />
                  <span className="font-technical text-[10px] uppercase font-black tracking-[0.2em]">
                    System Status: <span className="underline">Operational</span> // Premium FiveM Assets
                  </span>
                </div>
                <a href="#subscriptions" className="bg-dark-black text-light-cyan px-3 py-0.5 font-display text-[9px] font-bold skew-btn hover:bg-white hover:text-dark-black transition-all">
                  <span className="block">VISIT OVERLIMIT STORE</span>
                </a>
              </div>
              <button 
                onClick={() => setShowTicker(false)}
                className="hover:scale-110 transition-transform p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Header />
      
      <main>
        <Hero />
        <ServerStatus />
        <Showcase />
        <About />
        <Ownership />
        <Streamers />
        <Subscriptions />
        <JobApplications />
      </main>

      <Footer 
        onOpenStats={() => setIsServerStatsOpen(true)} 
        onOpenSupport={handleOpenSupport} 
      />

      {/* Global Modals */}
      <ServerStatsModal isOpen={isServerStatsOpen} onClose={() => setIsServerStatsOpen(false)} />
      <SupportModal 
        isOpen={isSupportOpen} 
        onClose={() => setIsSupportOpen(false)} 
        initialTab={supportTab}
      />

      {/* Global Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-30">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-electric-blue/10 blur-[150px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-light-cyan/5 blur-[150px] -translate-x-1/2" />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1.05); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
      `}} />
      
      <SpeedInsights />
    </div>
  );
}
