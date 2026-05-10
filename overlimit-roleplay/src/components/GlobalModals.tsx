import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Users, Mic, Activity, MessageSquare, Clock, ArrowRight } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ServerStatsModal({ isOpen, onClose }: ModalProps) {
  const [stats, setStats] = React.useState({
    totalMembers: 0,
    todayAdded: 0, 
    vcMembers: 0,
    onlineMembers: 0,
    loading: true,
    widgetEnabled: false,
    guildId: "1493591550301569165"
  });

  React.useEffect(() => {
    if (!isOpen) return;
    
    let isMounted = true;
    
    const fetchStats = async () => {
      try {
        setStats(s => ({ ...s, loading: true }));
        // 1. Fetch overall counts via Invite API
        const inviteRes = await fetch("https://discord.com/api/invites/83fQBbKYNE?with_counts=true");
        const inviteData = await inviteRes.json();
        
        // 2. Fetch VC counts via Widget API (Requires Server Widget to be enabled in Discord settings!)
        // Guild ID obtained from previous invite tests
        const guildId = inviteData?.guild?.id || "1493591550301569165";
        let vcMembers = 0;
        let widgetEnabled = false;
        
        try {
          const widgetRes = await fetch(`https://discord.com/api/guilds/${guildId}/widget.json`);
          if (widgetRes.ok) {
            const widgetData = await widgetRes.json();
            if (!widgetData.code) { // if code 50004 or similar, it's disabled or errored
              widgetEnabled = true;
              // Calculate members inside a voice channel 
              if (widgetData.members && Array.isArray(widgetData.members)) {
                vcMembers = widgetData.members.filter((m: any) => m.channel_id).length;
              }
            }
          }
        } catch (err) {
          console.warn("Widget fetch failed. Widget likely disabled in server settings.", err);
        }

        if (isMounted) {
          setStats({
            totalMembers: inviteData.approximate_member_count || 0,
            onlineMembers: inviteData.approximate_presence_count || 0,
            vcMembers: widgetEnabled ? vcMembers : 0,
            todayAdded: 0, 
            loading: false,
            widgetEnabled: widgetEnabled,
            guildId
          });
        }
      } catch (error) {
        console.error("Failed fetching Discord stats", error);
        if (isMounted) {
          setStats(s => ({ ...s, loading: false }));
        }
      }
    };
    
    fetchStats();
    // Refresh every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-dark-black/95 backdrop-blur-xl"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="w-full max-w-lg bg-graphite border border-white/10 rounded-sm relative overflow-hidden shadow-[0_0_80px_rgba(0,191,255,0.2)]"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-light-cyan to-transparent opacity-50" />
            
            <div className="p-8 md:p-10">
              <button onClick={onClose} className="absolute top-6 right-6 text-soft-gray hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>

              <div className="mb-10">
                <div className="font-technical text-[10px] text-light-cyan uppercase tracking-[0.4em] font-black mb-2">Live Overlimit Data</div>
                <h3 className="font-display text-3xl font-black text-white italic uppercase tracking-tighter">Server <span className="text-light-cyan">Statistics</span></h3>
              </div>

              <div className="space-y-6">
                <div className="p-5 bg-white/5 border border-white/10 rounded-sm flex items-center justify-between group hover:border-light-cyan/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-light-cyan/10 rounded-sm flex items-center justify-center">
                      <Users className="w-5 h-5 text-light-cyan" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-soft-gray uppercase tracking-widest">Discord Members</div>
                      <div className="text-xl font-display font-black text-white italic">
                        {stats.loading ? "..." : stats.totalMembers.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-right">
                    <span className="text-green-500">
                      {stats.loading ? "" : `${stats.onlineMembers.toLocaleString()} Online`}
                    </span>
                  </div>
                </div>

                <div className="p-5 bg-white/5 border border-white/10 rounded-sm flex items-center justify-between group hover:border-light-cyan/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-light-cyan/10 rounded-sm flex items-center justify-center">
                      <Mic className="w-5 h-5 text-light-cyan" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-soft-gray uppercase tracking-widest">VC Status</div>
                      <div className="text-xl font-display font-black text-white italic">Active</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full animate-pulse bg-green-500`} />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest text-right">
                      {stats.loading ? "..." : `${stats.vcMembers} in VC`}
                    </span>
                  </div>
                </div>

                <div className="p-5 bg-white/5 border border-white/10 rounded-sm flex items-center justify-between group hover:border-light-cyan/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-light-cyan/10 rounded-sm flex items-center justify-center">
                      <Activity className="w-5 h-5 text-light-cyan" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-soft-gray uppercase tracking-widest">Overall Status</div>
                      <div className="text-xl font-display font-black text-white italic">Operational</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-green-500 text-dark-black text-[9px] font-black uppercase tracking-tighter rounded-sm">Normal</span>
                </div>
              </div>

              <button 
                onClick={onClose}
                className="mt-10 w-full py-4 bg-light-cyan text-dark-black font-display font-black text-xs uppercase tracking-[0.2em] skew-btn"
              >
                Close Dashboard
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface SupportModalProps extends ModalProps {
  initialTab?: 'info' | 'terms' | 'privacy';
}

export function SupportModal({ isOpen, onClose, initialTab = 'info' }: SupportModalProps) {
  const [activeTab, setActiveTab] = React.useState<'info' | 'terms' | 'privacy'>(initialTab);
  const [hasReadToBottom, setHasReadToBottom] = React.useState(false);

  // Sync activeTab with initialTab when opening
  React.useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setHasReadToBottom(false);
    }
  }, [isOpen, initialTab]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 50) {
      setHasReadToBottom(true);
    }
  };

  const termsOfService = [
    { title: "Πολιτική Επιστροφών", content: "Όλες οι συναλλαγές είναι τελικές. Λόγω τηςφύσης των ψηφιακών αγαθών, δεν παρέχεται επιστροφή χρημάτων (No Refund Policy) σε καμία περίπτωση μετά την ενεργοποίηση της υπηρεσίας." },
    { title: "Απαιτήσεις Discord", content: "Η ολοκλήρωση της αγοράς γίνεται αποκλειστικά μέσω Support Ticket στο Discord. Πρέπει να είστε μέλος του Official Discord μας για να λάβετε το rank σας." },
    { title: "Κανόνες Διακομιστή", content: "Η κατοχή συνδρομής δεν σας δίνει το δικαίωμα να παραβιάζετε τους κανόνες. Το Ban από το Staff Team δεν συνεπάγεται επιστροφή χρημάτων." },
    { title: "Τρόποι Πληρωμής", content: "Δεχόμαστε PayPal (Friends & Family) και Paysafe. Οποιαδήποτε άλλη μέθοδος πρέπει να συζητηθεί προηγουμένως με το Billing Department." }
  ];

  const privacyPolicy = [
    { title: "Συλλογή Δεδομένων", content: "Συλλέγουμε μόνο τα απαραίτητα στοιχεία για την ταυτοποίηση της πληρωμής σας (Discord ID, Transaction ID και Email επικοινωνίας)." },
    { title: "Χρήση Πληροφοριών", content: "Τα δεδομένα σας χρησιμοποιούνται αποκλειστικά για την παροχή του VIP Rank και την τεχνική υποστήριξη της συνδρομής σας." },
    { title: "Ασφάλεια", content: "Δεν μοιραζόμαστε, δεν πουλάμε και δεν ενοικιάζουμε τα προσωπικά σας δεδομένα σε τρίτες εταιρείες ή διαφημιστικές." },
    { title: "Διατήρηση Δεδομένων", content: "Τα αρχεία των συναλλαγών διατηρούνται για λόγους ασφαλείας και φορολογικής συμμόρφωσης για το διάστημα που ορίζει η νομοθεσία." }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-dark-black/95 backdrop-blur-xl"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="w-full max-w-lg bg-graphite border border-white/10 rounded-sm relative overflow-hidden shadow-[0_0_80px_rgba(0,191,255,0.2)]"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-light-cyan to-transparent opacity-50" />
            
            <div className="p-8 md:p-10 text-center flex flex-col max-h-[85vh]">
              <button 
                onClick={() => { onClose(); setActiveTab('info'); }} 
                className="absolute top-6 right-6 text-soft-gray hover:text-white transition-colors z-30"
              >
                <X className="w-6 h-6" />
              </button>

              <AnimatePresence mode="wait">
                {activeTab === 'info' ? (
                  <motion.div key="info" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <div className="w-16 h-16 bg-light-cyan/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <MessageSquare className="w-8 h-8 text-light-cyan" />
                    </div>
                    <h3 className="font-display text-3xl font-black text-white italic uppercase tracking-tighter mb-4">Support <span className="text-light-cyan">Portal</span></h3>
                    <p className="font-sans text-sm text-soft-gray mb-8 leading-relaxed">
                      If you want help, just make a support ticket or you can join the "Waiting for Support" call to be served directly.
                      <br /><br />
                      <span className="text-white font-black uppercase text-[10px] tracking-widest block mb-2 underline decoration-light-cyan/30 underline-offset-4">Need Staff?</span>
                      If you need someone from the Staff Team, open a ticket or join the waiting room in Discord and ping staff.
                    </p>
                    <div className="grid grid-cols-1 gap-4 mb-8">
                      <div className="p-4 bg-white/5 border border-white/10 rounded-sm flex items-center gap-4 text-left">
                        <Clock className="w-5 h-5 text-light-cyan opacity-50" />
                        <div className="text-[10px] font-black text-soft-gray uppercase tracking-widest leading-tight">Average Response Time<br /><span className="text-white text-sm">~15 MINUTES</span></div>
                      </div>
                    </div>
                    <div className="flex gap-4 mb-8">
                      <button onClick={() => { setActiveTab('terms'); setHasReadToBottom(false); }} className="flex-1 py-2 text-[10px] font-black uppercase tracking-widest text-soft-gray hover:text-white border border-white/5 rounded-sm">Terms</button>
                      <button onClick={() => { setActiveTab('privacy'); setHasReadToBottom(false); }} className="flex-1 py-2 text-[10px] font-black uppercase tracking-widest text-soft-gray hover:text-white border border-white/5 rounded-sm">Privacy</button>
                    </div>
                    <a href="https://discord.gg/83fQBbKYNE" target="_blank" className="w-full py-4 bg-light-cyan text-dark-black font-display font-black text-xs uppercase tracking-[0.2em] skew-btn flex items-center justify-center gap-3 group">
                      Open Discord Ticket <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </motion.div>
                ) : (
                  <motion.div key="docs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col text-left">
                    <button onClick={() => setActiveTab('info')} className="text-light-cyan text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">← Back</button>
                    <h3 className="font-display text-2xl font-black text-white italic uppercase mb-6">{activeTab === 'terms' ? 'Terms of Service' : 'Privacy Policy'}</h3>
                    <div onScroll={handleScroll} className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar max-h-[300px] mb-8">
                       {(activeTab === 'terms' ? termsOfService : privacyPolicy).map((item, i) => (
                         <div key={i} className="border-l-2 border-white/5 pl-4">
                            <div className="font-technical text-[10px] text-light-cyan uppercase font-black">{item.title}</div>
                            <p className="text-soft-gray text-xs leading-relaxed">{item.content}</p>
                         </div>
                       ))}
                    </div>
                    <button 
                      onClick={initialTab !== 'info' ? onClose : () => setActiveTab('info')} 
                      className="w-full py-4 font-display font-black text-xs uppercase tracking-[0.2em] skew-btn bg-light-cyan text-dark-black shadow-[0_0_20px_rgba(0,191,255,0.2)]"
                    >
                      I Understand
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
