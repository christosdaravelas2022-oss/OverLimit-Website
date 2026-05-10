import { motion } from "motion/react";
import { Twitter, Youtube, MessageCircle, Github, Shield } from "lucide-react";
import SmartImage from "./SmartImage";

interface FooterProps {
  onOpenStats: () => void;
  onOpenSupport: (tab?: 'info' | 'terms' | 'privacy') => void;
}

export default function Footer({ onOpenStats, onOpenSupport }: FooterProps) {
  return (
    <footer className="bg-dark-black pt-16 pb-12 relative overflow-hidden" id="footer">
      <div className="absolute top-0 left-0 w-full hud-line opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 relative z-10">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <SmartImage 
                src="/input_file_2.png" 
                alt="Overlimit Logo" 
                className="h-20 w-auto object-contain" 
                fallbackIcon={<Shield className="w-8 h-8 text-light-cyan" />}
              />
              <div className="font-display text-2xl font-black uppercase italic tracking-tighter">
                <span className="text-light-cyan">OVERLIMIT</span> RP
              </div>
            </div>
            <p className="font-sans text-sm text-soft-gray leading-relaxed mb-8 border-l border-light-cyan/30 pl-4">
              The premier Greek Roleplay destination. Experience high-performance gameplay in an immersive, community-driven Hellenic environment.
            </p>
            <div className="flex gap-4">
              {[Twitter, Youtube, MessageCircle, Github].map((Icon, i) => (
                <a key={i} href="#" className="w-11 h-11 bg-graphite border border-white/5 flex items-center justify-center hover:border-light-cyan/50 hover:text-light-cyan transition-all -skew-x-12" id={`social-icon-${i}`}>
                   <Icon size={18} className="skew-x-12" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-xs font-black mb-8 tracking-[0.3em] text-white uppercase italic border-b border-white/5 pb-2">QUICK LINKS</h4>
            <ul className="space-y-4 font-technical text-[11px] text-soft-gray uppercase tracking-[0.2em] font-bold">
              {[
                { name: "Home", url: "#" },
                { name: "Store", url: "#subscriptions" },
                { name: "Rules", onClick: () => {} },
                { name: "Terms of Service", onClick: () => onOpenSupport('terms') },
                { name: "Privacy Policy", onClick: () => onOpenSupport('privacy') }
              ].map(link => (
                <li key={link.name}>
                  {link.onClick ? (
                    <button 
                      onClick={link.onClick}
                      className="hover:text-light-cyan transition-colors flex items-center gap-2 group w-full text-left"
                    >
                      <div className="w-1 h-1 bg-light-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </button>
                  ) : (
                    <a href={link.url} className="hover:text-light-cyan transition-colors flex items-center gap-2 group">
                      <div className="w-1 h-1 bg-light-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xs font-black mb-8 tracking-[0.3em] text-white uppercase italic border-b border-white/5 pb-2">COMMUNITY</h4>
            <ul className="space-y-4 font-technical text-[11px] text-soft-gray uppercase tracking-[0.2em] font-bold">
              {[
                { name: "Discord", url: "https://discord.gg/83fQBbKYNE" },
                { name: "Member List", onClick: onOpenStats },
                { name: "Support", onClick: onOpenSupport },
                { name: "Apply Now", url: "#jobs" }
              ].map(link => (
                <li key={link.name}>
                  {link.onClick ? (
                    <button 
                      onClick={link.onClick}
                      className="hover:text-light-cyan transition-colors flex items-center gap-2 group w-full text-left"
                    >
                      <div className="w-1 h-1 bg-light-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </button>
                  ) : (
                    <a 
                      href={link.url} 
                      target={link.url?.startsWith('http') ? "_blank" : "_self"}
                      className="hover:text-light-cyan transition-colors flex items-center gap-2 group"
                    >
                      <div className="w-1 h-1 bg-light-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xs font-black mb-8 tracking-[0.3em] text-white uppercase italic border-b border-white/5 pb-2">PROJECT</h4>
            <div className="bg-graphite p-4 border border-white/5 relative">
              <div className="absolute top-0 right-0 p-1 opacity-10 font-display text-xl">OL</div>
              <p className="font-technical text-[10px] text-soft-gray mb-1 font-black tracking-widest">BUSINESS INQUIRIES:</p>
              <a href="mailto:admin@overlimit-rp.com" className="font-display text-sm font-black text-light-cyan hover:underline">
                admin@overlimit-rp.com
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
          <p className="font-technical text-[10px] text-soft-gray font-bold tracking-[0.1em]">
            &copy; {new Date().getFullYear()} OVERLIMIT ROLEPLAY. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-6">
            <span className="w-8 hud-line" />
            <p className="font-technical text-[9px] text-white/20 tracking-[0.3em] uppercase font-black">
              NOT AFFILIATED WITH ROCKSTAR GAMES OR TAKE-TWO INTERACTIVE.
            </p>
          </div>
        </div>
      </div>
      
      {/* Decorative background element */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-light-cyan/5 blur-[120px] rounded-full pointer-events-none" />
    </footer>
  );
}
