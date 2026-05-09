import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Shield, X, CreditCard, Ticket, AlertTriangle, FileText } from "lucide-react";

const tiers = [
  {
    name: "VIP SILVER",
    price: "€25",
    color: "slate-400",
    features: [
      "+25 Queue Priority",
      "Unique Discord Role & Website Badge",
      "2 Exclusive Custom Vehicle Mods",
      "Priority Support Access",
    ],
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=400&auto=format&fit=crop"
  },
  {
    name: "VIP GOLD",
    price: "€40",
    color: "light-cyan",
    features: [
      "+45 Queue Priority",
      "Gold Profile Identity & Discord Status",
      "1 Monthly Custom Import Voucher",
      "VIP Fast-Track Application",
    ],
    image: "https://images.unsplash.com/photo-1550684847-75bdda21cc95?q=80&w=400&auto=format&fit=crop"
  },
  {
    name: "OVERLIMIT ELITE",
    price: "€75",
    color: "blue-500",
    features: [
      "GOD-TIER Queue Priority",
      "Elite Founder Badge & Status",
      "Dedicated Asset Development Request",
      "Infinite Import Garages Space",
      "Access to Elite Underworld Events",
    ],
    image: "https://images.unsplash.com/photo-1550684848-86a5d8727436?q=80&w=400&auto=format&fit=crop"
  },
];

interface UpgradeModalProps {
  tier: typeof tiers[0] | null;
  onClose: () => void;
}

function UpgradeModal({ tier, onClose }: UpgradeModalProps) {
  const [activeDoc, setActiveDoc] = React.useState<'terms' | 'privacy' | null>(null);
  const [hasReadToBottom, setHasReadToBottom] = React.useState(false);
  const [docsRead, setDocsRead] = React.useState({ terms: false, privacy: false });
  const scrollRef = React.useRef<HTMLDivElement>(null);

  if (!tier) return null;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 50) {
      if (activeDoc) {
        setDocsRead(prev => ({ ...prev, [activeDoc]: true }));
        setHasReadToBottom(true);
      }
    }
  };

  const termsOfService = [
    { title: "Πολιτική Επιστροφών", content: "Όλες οι συναλλαγές είναι τελικές. Λόγω της φύσης των ψηφιακών αγαθών, δεν παρέχεται επιστροφή χρημάτων (No Refund Policy) σε καμία περίπτωση μετά την ενεργοποίηση της υπηρεσίας." },
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

  const currentContent = activeDoc === 'terms' ? termsOfService : privacyPolicy;

  // Mark document as read immediately when activeDoc changes
  React.useEffect(() => {
    if (activeDoc) {
      setDocsRead(prev => ({ ...prev, [activeDoc]: true }));
    }
  }, [activeDoc]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-dark-black/95 backdrop-blur-xl"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="w-full max-w-xl bg-graphite border border-white/10 rounded-sm relative overflow-hidden flex flex-col shadow-[0_0_80px_rgba(0,191,255,0.25)]"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-light-cyan to-transparent opacity-50" />
        
        <div className="p-8 md:p-10 max-h-[90vh] flex flex-col">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-soft-gray hover:text-white transition-colors z-30"
          >
            <X className="w-6 h-6" />
          </button>

          <AnimatePresence mode="wait">
            {!activeDoc ? (
              <motion.div 
                key="info"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 1, x: 20 }}
                className="space-y-8"
              >
                <div className="mb-8">
                  <div className="font-technical text-[10px] text-light-cyan uppercase tracking-[0.3em] font-black mb-2">
                    Transaction Information
                  </div>
                  <h3 className="font-display text-3xl font-black text-white italic uppercase tracking-tighter">
                    Upgrade to <span className="text-light-cyan">{tier.name}</span>
                  </h3>
                </div>

                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-sm bg-light-cyan/10 border border-light-cyan/20 flex items-center justify-center flex-shrink-0">
                      <Ticket className="w-6 h-6 text-light-cyan" />
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-black text-white uppercase mb-1">Open a Support Ticket</h4>
                      <p className="text-soft-gray text-xs leading-relaxed">
                        To complete your purchase, please join our official Discord server and open a billing ticket. Our staff will process your transaction manually.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-sm bg-light-cyan/10 border border-light-cyan/20 flex items-center justify-center flex-shrink-0">
                      <CreditCard className="w-6 h-6 text-light-cyan" />
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-black text-white uppercase mb-1">Accepted Payment Methods</h4>
                      <div className="flex gap-4 mt-2">
                         <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-sm text-[10px] font-black text-white tracking-widest uppercase">PayPal</span>
                         <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-sm text-[10px] font-black text-white tracking-widest uppercase">Paysafe</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-white/5">
                    <div className="flex items-start gap-4 p-4 bg-red-500/5 border border-red-500/20 rounded-sm mb-6">
                      <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div className="text-[10px] uppercase font-black tracking-widest text-red-500">
                        Strict No-Refund Policy // All sales are final. We do not offer money back once the service has been activated.
                      </div>
                    </div>

                    <div className="space-y-3">
                      <button 
                        onClick={() => { setActiveDoc('terms'); setHasReadToBottom(false); }}
                        className="flex items-center gap-3 text-soft-gray hover:text-light-cyan transition-all cursor-pointer group w-full text-left"
                      >
                        <FileText className="w-4 h-4" />
                        <span className={`font-technical text-[10px] uppercase tracking-widest border-b ${docsRead.terms ? 'border-green-500 text-green-500' : 'border-soft-gray/20 group-hover:border-light-cyan'}`}>
                          {docsRead.terms ? '✓ Terms of Service Read' : 'Read Terms of Service'}
                        </span>
                      </button>

                      <button 
                        onClick={() => { setActiveDoc('privacy'); setHasReadToBottom(false); }}
                        className="flex items-center gap-3 text-soft-gray hover:text-light-cyan transition-all cursor-pointer group w-full text-left"
                      >
                        <Shield className="w-4 h-4" />
                        <span className={`font-technical text-[10px] uppercase tracking-widest border-b ${docsRead.privacy ? 'border-green-500 text-green-500' : 'border-soft-gray/20 group-hover:border-light-cyan'}`}>
                           {docsRead.privacy ? '✓ Privacy Policy Read' : 'Read Privacy Policy'}
                        </span>
                      </button>
                    </div>
                  </div>

                  <button
                    disabled={!(docsRead.terms && docsRead.privacy)}
                    className={`w-full py-4 font-display font-black text-sm uppercase tracking-widest skew-btn border transition-all ${
                      docsRead.terms && docsRead.privacy 
                        ? 'bg-light-cyan text-dark-black border-light-cyan shadow-[0_0_20px_rgba(0,191,255,0.4)]' 
                        : 'bg-white/5 text-white/20 border-white/5 cursor-not-allowed opacity-50'
                    }`}
                  >
                    {docsRead.terms && docsRead.privacy ? "PROCEED TO PURCHASE" : "LOCKED // REVIEW BOTH DOCUMENTS"}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="docs"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col h-full"
              >
                <div className="mb-6">
                   <button 
                     onClick={() => setActiveDoc(null)}
                     className="text-light-cyan text-[10px] font-black uppercase tracking-widest mb-2 flex items-center gap-2 hover:translate-x-[-4px] transition-transform"
                   >
                     ← BACK TO INFO
                   </button>
                   <h3 className="font-display text-2xl font-black text-white italic uppercase">
                     {activeDoc === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
                   </h3>
                </div>

                <div 
                  ref={scrollRef}
                  onScroll={handleScroll}
                  className="flex-1 overflow-y-auto pr-4 space-y-6 custom-scrollbar max-h-[350px]"
                >
                   {currentContent.map((item, i) => (
                     <div key={i} className="space-y-2 border-l-2 border-white/5 pl-4 hover:border-light-cyan/30 transition-colors">
                        <div className="font-technical text-[10px] text-light-cyan uppercase font-black tracking-tighter">0{i+1}. {item.title}</div>
                        <p className="text-soft-gray text-xs leading-relaxed font-sans">{item.content}</p>
                     </div>
                   ))}
                   
                   <div className="py-8 text-center border-t border-white/5">
                      <div className="inline-flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-light-cyan">
                         {hasReadToBottom ? "✓ Document Read" : "↓ Scroll to bottom to confirm"}
                      </div>
                   </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveDoc(null)}
                  className="mt-8 w-full py-4 font-display font-black text-sm uppercase tracking-widest skew-btn transition-all duration-500 bg-light-cyan text-dark-black shadow-[0_0_20px_rgba(0,191,255,0.4)]"
                >
                  I UNDERSTAND
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Subscriptions() {
  const [selectedTier, setSelectedTier] = React.useState<typeof tiers[0] | null>(null);

  return (
    <section className="py-24 relative overflow-hidden" id="subscriptions">
      <div className="absolute -left-24 top-1/4 w-96 h-96 bg-light-cyan/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="heading-massive text-4xl mb-4 text-white italic">
            PREMIUM <span className="text-light-cyan">ACCESS</span>
          </h2>
          <p className="font-sans text-soft-gray max-w-lg mx-auto">
            Scale your experience with our exclusive membership tiers. Unlock elite features and priority network access.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative rounded-sm overflow-hidden bg-graphite flex flex-col border border-white/5 hover:border-light-cyan/30 transition-all group shadow-[0_0_20px_rgba(0,0,0,0.5)]"
              id={`tier-${tier.name.toLowerCase().replace(' ', '-')}`}
            >
              <div className="absolute inset-0 z-[5] pointer-events-none group-hover:opacity-100 opacity-20 transition-opacity">
                <div className="hud-corner top-4 left-4 border-t border-l" />
                <div className="hud-corner top-4 right-4 border-t border-r" />
                <div className="hud-corner bottom-4 left-4 border-b border-l" />
                <div className="hud-corner bottom-4 right-4 border-b border-r" />
              </div>

              <div className="h-48 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-graphite to-transparent z-10" />
                <img src={tier.image} alt={tier.name} className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute top-6 left-6 z-20 flex items-center gap-2">
                  <Shield className={`w-6 h-6 ${tier.name.includes('GOLD') ? 'text-light-cyan' : tier.name.includes('ELITE') ? 'text-blue-500' : 'text-light-cyan'}`} />
                  <span className="font-display text-2xl font-black tracking-widest italic">{tier.name}</span>
                </div>
              </div>

              <div className="p-8 flex-grow flex flex-col">
                <ul className="space-y-4 mb-10 flex-grow">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="flex gap-3 text-sm text-soft-gray leading-tight">
                      <Check className="w-4 h-4 text-light-cyan flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <div className="mb-4">
                     <span className="font-technical text-xs uppercase tracking-widest text-soft-gray block">Monthly Contribution</span>
                     <span className="font-display text-3xl font-black text-white">{tier.price} <span className="text-sm font-normal opacity-60">EUR</span></span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedTier(tier)}
                    className={`w-full py-4 rounded-sm font-display text-xs font-black tracking-[0.2em] transition-all skew-btn bg-light-cyan text-dark-black shadow-[0_0_15px_rgba(0,191,255,0.2)] hover:shadow-[0_0_25px_rgba(0,191,255,0.4)] hover:-translate-y-0.5`}
                    id={`subscribe-${tier.name.toLowerCase().replace(' ', '-')}`}
                  >
                    <span className="block">UPGRADE NOW</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
         {selectedTier && (
           <UpgradeModal tier={selectedTier} onClose={() => setSelectedTier(null)} />
         )}
      </AnimatePresence>
    </section>
  );
}
