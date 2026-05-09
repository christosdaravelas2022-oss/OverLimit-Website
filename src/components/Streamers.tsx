import { motion } from "motion/react";
import { Play, Users } from "lucide-react";

const streamers = [
  { name: "SHOTZ", viewers: "633", thumbnail: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" },
  { name: "TIMMAC", viewers: "348", thumbnail: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop" },
  { name: "KEBUNFOX", viewers: "1.2K", thumbnail: "https://images.unsplash.com/photo-1542103749-8ef59b94f47e?q=80&w=200&auto=format&fit=crop" },
];

export default function Streamers() {
  return (
    <section className="py-24 bg-dark-black relative overflow-hidden" id="streamers">
      {/* Dynamic Background Lighting */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-light-cyan/10 blur-[150px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-electric-blue/10 blur-[150px] animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 relative">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-64 h-24 bg-light-cyan/30 blur-[60px] rounded-full pointer-events-none opacity-60" />
          <h2 className="heading-massive text-4xl mb-4 text-white uppercase italic relative z-10 drop-shadow-[0_0_25px_rgba(0,191,255,0.6)]">
            OVERLIMIT <span className="text-light-cyan text-glow animate-pulse">STREAMERS</span>
          </h2>
          <p className="font-sans text-soft-gray max-w-2xl mx-auto relative z-10 leading-relaxed font-medium">
            Experience Overlimit RP live through our official creator hub. High-stakes stories, unfiltered interactions, and premium roleplay at its peak.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {streamers.map((streamer, i) => (
            <motion.div
              key={streamer.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden bg-dark-black border border-white/5 hover:border-light-cyan/50 transition-all rounded-sm"
              id={`streamer-${streamer.name.toLowerCase()}`}
            >
              <div className="aspect-video relative overflow-hidden">
                <div className="absolute inset-0 bg-dark-black/40 group-hover:bg-dark-black/10 transition-colors z-10" />
                <img 
                  src={`https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop&sig=${i+10}`} 
                  alt={streamer.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 bg-light-cyan rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,191,255,0.6)]">
                    <Play className="text-dark-black fill-dark-black ml-1 w-6 h-6" />
                  </div>
                </div>
                <div className="absolute top-4 left-4 z-20 bg-blue-600 px-2 py-0.5 rounded-sm flex items-center gap-1 shadow-lg">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold tracking-widest text-white uppercase">LIVE</span>
                </div>
              </div>

              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border-2 border-light-cyan overflow-hidden shadow-[0_0_10px_rgba(0,191,255,0.3)]">
                    <img src={streamer.thumbnail} alt={streamer.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="font-display text-sm font-bold tracking-wider">{streamer.name}</span>
                </div>
                <div className="flex items-center gap-2 text-soft-gray">
                  <Users className="w-4 h-4 text-light-cyan" />
                  <span className="font-technical font-bold text-white">{streamer.viewers}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
