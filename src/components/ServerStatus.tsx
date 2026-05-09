import { useState, useEffect } from "react";
import { motion, useSpring, useTransform, animate } from "motion/react";
import { Users, Zap, Signal } from "lucide-react";

function Counter({ value, label, sublabel }: { value: number | string, label: string, sublabel: string }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (typeof value === 'number') {
      const controls = animate(0, value, {
        duration: 2,
        onUpdate: (latest) => setDisplayValue(Math.floor(latest)),
      });
      return () => controls.stop();
    }
  }, [value]);

  return (
    <div className="flex flex-col items-center md:items-start text-center md:text-left">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-1.5 h-1.5 rounded-full bg-light-cyan animate-pulse shadow-[0_0_8px_rgba(0,191,255,0.8)]" />
        <span className="font-technical text-[10px] font-black uppercase tracking-[0.2em] text-light-cyan">{label}</span>
      </div>
      <div className="font-display text-4xl md:text-5xl font-black text-white italic tracking-tighter">
        {typeof value === 'number' ? displayValue.toLocaleString() : value}
      </div>
      <div className="font-technical text-[8px] text-soft-gray uppercase tracking-widest mt-1 opacity-50">{sublabel}</div>
    </div>
  );
}

export default function ServerStatus() {
  const [memberCount, setMemberCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiscordData = async () => {
      try {
        const response = await fetch("https://discord.com/api/invites/83fQBbKYNE?with_counts=true");
        const data = await response.json();
        setMemberCount(data.approximate_member_count);
      } catch (error) {
        console.error("Failed to fetch Discord data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscordData();
    const interval = setInterval(fetchDiscordData, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-dark-black border-y border-white/5 relative overflow-hidden" id="status">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,191,255,0.03)_0%,transparent_70%)]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3 mb-2">
              <Signal className="w-5 h-5 text-light-cyan animate-pulse" />
              <h2 className="font-display text-xl font-black text-white uppercase italic tracking-tighter">
                LIVE <span className="text-light-cyan">NETWORK</span> STATS
              </h2>
            </div>
            <p className="font-sans text-xs text-soft-gray uppercase tracking-[0.2em] font-medium">Real-time connection monitoring</p>
          </div>

          <div className="flex justify-center md:justify-start gap-12 md:gap-24 col-span-1 md:col-span-2">
            <Counter 
              value={loading ? 0 : (memberCount || 1000)} 
              label="DISCORD MEMBERS" 
              sublabel="Active community members"
            />
            
            <div className="w-px h-16 bg-white/10 hidden md:block" />

            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-soft-gray/30" />
                <span className="font-technical text-[10px] font-black uppercase tracking-[0.2em] text-soft-gray">FiveM Status</span>
              </div>
              <div className="font-display text-2xl md:text-3xl font-black text-white uppercase italic tracking-tight leading-none mt-2">
                In Development
              </div>
              <div className="inline-flex items-center gap-2 mt-3 px-2 py-0.5 bg-white/5 border border-white/10 rounded-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                <span className="font-technical text-[8px] text-yellow-500/80 font-black uppercase tracking-widest">COMING SOON</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative glitch line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-light-cyan/20 to-transparent" />
    </section>
  );
}
