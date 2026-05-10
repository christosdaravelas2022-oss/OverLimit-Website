import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, AlertTriangle, Crosshair, Ban, X } from 'lucide-react';

const CATEGORIES = [
  { id: 'police', title: 'GENERAL RULES – POLICE', icon: Shield },
  { id: 'openup', title: 'OPEN UP RULES', icon: Crosshair },
  { id: 'punishments', title: 'PUNISHMENTS', icon: AlertTriangle },
  { id: 'mods', title: 'MODS & ANTI-CHEAT', icon: Ban }
];

const POLICE_RULES = [
  { title: "1. Fear of Police (FoP)", desc: "Κατά την αλληλεπίδρασή σας με αστυνομία ή στρατό, οφείλετε να δείχνετε τον ανάλογο φόβο. Πολιτικά οχήματα δεν επιτρέπεται να καταδιώκουν δυνάμεις ασφαλείας χωρίς σοβαρό λόγο." },
  { title: "2. Character Identity", desc: "Κάθε παίκτης διατηρεί ένα σταθερό χαρακτήρα. Δεν επιτρέπεται η αλλαγή ταυτότητας για αποφυγή συνεπειών (π.χ. καταζητούμενος που “γίνεται άλλος”)." },
  { title: "3. Hostage Priority", desc: "Εάν ο όμηρος δεν βρίσκεται υπό άμεση απειλή (π.χ. δεν σημαδεύεται), η αστυνομία έχει το δικαίωμα χρήσης θανατηφόρας βίας χωρίς να ισχύει το 0 Value of Life." },
  { title: "4. Meta / Multi Account Abuse", desc: "Χρήση πολλαπλών Steam ή συμμετοχή σε Discord υπηρεσιών ασφαλείας για άντληση πληροφοριών υπέρ criminals απαγορεύεται αυστηρά. Τιμωρία: wipe & severe punishments." },
  { title: "5. Chases & Shooting Rules", desc: "Σε καταδίωξη, η αστυνομία μπορεί να επιχειρήσει σκάσιμο ελαστικών μετά από 2 λεπτά. Από τη στιγμή που συμβεί αυτό, οι criminals έχουν δικαίωμα να ανοίξουν πυρ." },
  { title: "6. Police Equipment", desc: "Απαγορεύεται η παραχώρηση αστυνομικού εξοπλισμού σε μη εξουσιοδοτημένα άτομα." },
  { title: "7. Police Corruption", desc: "Απαγορεύεται οποιαδήποτε μορφή συνεργασίας ή διαρροής πληροφοριών προς criminals." },
  { title: "8. Fines System", desc: "Δεν επιτρέπεται η επιβολή του ίδιου προστίμου δύο φορές για το ίδιο αδίκημα." },
  { title: "9. Prison Transport (Μεταγωγή)", desc: "Απαιτείται ανακοίνωση τουλάχιστον 10 λεπτά πριν τη μεταγωγή. Μόλις η αστυνομία φτάσει στο garage των φυλακών, η διαδικασία θεωρείται ολοκληρωμένη και παύουν τα πυρά και από τις δύο πλευρές." },
  { title: "10. Patrol Rules", desc: "Για πρόσβαση σε χωράφια ή απομακρυσμένες περιοχές, απαιτείται ενημέρωση ή χρήση φάρων και σειρήνων." },
  { title: "11. Riot Shields", desc: "Επιτρέπονται μόνο σε ληστείες Κεντρικής Τράπεζας & Παλέτο. Μέγιστο: 4 ασπίδες. Επιτρέπεται χρήση pistol μόνο — απαγορεύονται καταχρηστικές κινήσεις (exploits)." },
  { title: "12. On Hold Situation", desc: "Όταν υπάρχει ενεργό “On Hold”, απαγορεύονται ληστείες και ομηρίες." },
  { title: "13. Border Control", desc: "Σε μπλόκα (π.χ. γέφυρα), αν όχημα δεν συμμορφώνεται, επιτρέπεται χρήση πυρών." },
  { title: "14. Martial Law", desc: "Σε περίπτωση Στρατιωτικού Νόμου (με επίσημη ανακοίνωση), ο στρατός μπορεί να χρησιμοποιήσει κάθε διαθέσιμο μέσο για εκκένωση περιοχής." },
  { title: "15. Military Base Trespassing", desc: "Είσοδος σε στρατόπεδο χωρίς άδεια επιτρέπει στον στρατό χρήση θανατηφόρας βίας χωρίς προειδοποίηση." },
  { title: "16. Criminal Areas Chases", desc: "Αν καταδίωξη ξεκινήσει από criminal περιοχή, μετά από 2 λεπτά η αστυνομία μπορεί να ακινητοποιήσει το όχημα με οποιοδήποτε μέσο." },
  { title: "17. Handcuffing", desc: "Δεν επιτρέπεται χρήση χειροπεδών από μπροστά." },
  { title: "18. PIT Maneuver", desc: "Επιτρέπεται PIT χωρίς την ανάγκη μπαριέρας." },
  { title: "19. Searches", desc: "Δεν επιτρέπεται σωματικός έλεγχος σε αντίθετο φύλο." },
  { title: "20. Suspicious Indicators", desc: "Η αστυνομία μπορεί να προβεί σε σωματικό έλεγχο αν υπάρχει τουλάχιστον ένα από τα εξής: οπλοθήκη, φιμέ τζάμια ή μάσκα (καθώς και μετά από καταδίωξη)." }
];

const OPEN_UP_RULES = [
  { title: "Evidence", desc: "Η αστυνομία οφείλει να παρέχει πλήρη στοιχεία στον εισαγγελέα για την οργάνωση (φωτογραφίες, ποινικό μητρώο, ταυτοποιημένα μέλη)." },
  { title: "Property Penalty", desc: "Σε Open Up, αφαιρείται το 30% από hood/villa/house της οργάνωσης. Δεν υπάρχει όριο ατόμων για άμυνα και δυνάμεις ασφαλείας." },
  { title: "Announcement", desc: "Υποχρεωτική ενημέρωση τουλάχιστον 1 ώρα πριν την έναρξη." },
  { title: "Start Procedure", desc: "Το Open Up ξεκινά μόνο με ένταλμα εισαγγελέα. Με την είσοδο στο χώρο, η αστυνομία ζητά παράδοση — οι criminals μπορούν να αρνηθούν." },
  { title: "Preparation Time", desc: "Σε περίπτωση άρνησης, δίνεται περιθώριο 2 λεπτών για να πάρουν θέσεις πριν την έναρξη της σύγκρουσης." },
  { title: "Ruleset", desc: "Ισχύουν όλοι οι κανόνες του server, εκτός από το Value of Life (VoL)." },
  { title: "No Limit", desc: "Οι criminal ομάδες δεν έχουν περιορισμό αριθμού παικτών κατά τη διάρκεια Open Up." }
];

const PUNISHMENTS = [
  { title: "RDM", desc: "250 Community Service" },
  { title: "VDM", desc: "120 Community Service" },
  { title: "KOS", desc: "240 Community Service" },
  { title: "OOC", desc: "120 Community Service" },
  { title: "Άρνηση RP", desc: "180 Community Service" },
  { title: "Ανούσιο RP", desc: "130 Community Service" },
  { title: "Ανούσιο Chat", desc: "100 Community Service" },
  { title: "Third Party", desc: "140 Community Service" },
  { title: "Cop Baiting / Baiting", desc: "180 Community Service" },
  { title: "0 Value of Life", desc: "200 Community Service" },
  { title: "Meta Gaming", desc: "200 Community Service" },
  { title: "Power Gaming", desc: "200 Community Service" },
  { title: "Combat Log", desc: "250 Community Service έως 24 ώρες ban" },
  { title: "NLR", desc: "180 Community Service" },
  { title: "Bug Abuse / Exploit", desc: "300 Community Service" },
  { title: "Προσωπικές Προσβολές", desc: "600 Community Service έως Permanent Ban" },
  { title: "Ανάρμοστη Συμπεριφορά", desc: "600 Community Service έως Permanent Ban" },
  { title: "Trolling", desc: "550 Community Service έως Permanent Ban" },
  { title: "Cheating", desc: "Permanent Ban" }
];

const MODS_RULES = {
  allowed: [
    "Infinity Stamina",
    "Better Movement",
    "Reshade",
    "Crosshair",
    "Λοιπά visual / QoL mods που δεν επηρεάζουν το gameplay"
  ],
  forbidden: [
    "Cheats / hacks / trainers",
    "Mods που δίνουν πλεονέκτημα (π.χ. aim assist, wallhack)",
    "Exploits / abuse bugs",
    "Μη εγκεκριμένα third-party προγράμματα"
  ],
  sanctions: [
    { rule: "Χρήση απαγορευμένου mod", penalty: "3 ημέρες ban" },
    { rule: "Χρήση cheats / hacks", penalty: "Permanent ban" },
    { rule: "Abuse bugs / exploits", penalty: "2–7 ημέρες ban" },
    { rule: "Επαναλαμβανόμενες παραβάσεις", penalty: "Permanent ban" }
  ],
  notes: [
    "Όλοι οι παίκτες υπόκεινται σε ελέγχους από το Anti-Cheat Team",
    "Η άγνοια των κανόνων δεν αποτελεί δικαιολογία"
  ]
};

const AccordionItem = ({ title, children, isOpen, onToggle }: { title: string, children: React.ReactNode, isOpen: boolean, onToggle: () => void }) => {
  return (
    <div className="border border-white/10 bg-white/5 rounded-sm overflow-hidden mb-2">
      <button 
        onClick={onToggle}
        className="w-full flex justify-between items-center p-4 text-left hover:bg-white/5 transition-colors focus:outline-none"
      >
        <span className="font-bold text-sm text-white uppercase">{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-light-cyan"><path d="m6 9 6 6 6-6"/></svg>
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 border-t border-white/10 text-gray-300 text-sm leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Rules({ onClose }: { onClose: () => void }) {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 z-[100] bg-dark-black/95 backdrop-blur-xl overflow-y-auto"
    >
      <div className="relative min-h-screen py-16 dot-grid">
        <button 
          onClick={onClose}
          className="fixed top-8 right-8 p-3 bg-white/5 hover:bg-red-500/20 hover:text-red-500 text-white border border-white/10 rounded-sm transition-colors z-[110]"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="container mx-auto px-6 max-w-6xl mt-8">
          
          <div className="text-center mb-16 relative">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent -z-10" />
            <div className="inline-block bg-dark-black px-8">
               <h2 className="heading-massive text-5xl md:text-7xl mb-4 text-white">
                  SERVER <span className="text-light-cyan">RULES</span>
               </h2>
               <p className="font-technical text-soft-gray uppercase tracking-[0.2em] text-sm">
                 Read carefully before playing. Ignorance is no excuse.
               </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 pb-16">
            {/* Sidebar / Quick Links */}
            <div className="w-full md:w-64 shrink-0 space-y-4 md:sticky md:top-8 md:self-start">
               {/* Mobile Dropdown */}
               <div className="md:hidden">
                 <label className="text-xs text-soft-gray font-black tracking-widest uppercase mb-2 block">Quick Links</label>
                 <select 
                   value={activeCategory} 
                   onChange={(e) => setActiveCategory(e.target.value)}
                   className="w-full bg-white/5 border border-white/10 text-white text-sm p-3 rounded-sm uppercase font-bold focus:border-light-cyan focus:outline-none"
                 >
                   {CATEGORIES.map(c => (
                     <option key={c.id} value={c.id} className="bg-dark-black">{c.title}</option>
                   ))}
                 </select>
               </div>

               {/* Desktop Buttons */}
               <div className="hidden md:block space-y-2">
                 <div className="text-xs text-soft-gray font-black tracking-widest uppercase mb-4 pl-2">Quick Links</div>
                 {CATEGORIES.map(category => {
                   const Icon = category.icon;
                   const isActive = activeCategory === category.id;
                   return (
                     <button
                       key={category.id}
                       onClick={() => setActiveCategory(category.id)}
                       className={`w-full flex items-center justify-start gap-4 p-4 text-left font-black uppercase text-xs transition-colors border-l-2 ${isActive ? 'border-light-cyan text-light-cyan bg-light-cyan/10' : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'}`}
                     >
                       <Icon className="w-5 h-5" />
                       {category.title}
                     </button>
                   )
                 })}
               </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 min-h-[500px]">
               {activeCategory === 'police' && (
                 <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                   <div className="mb-6 p-4 border border-light-cyan/20 bg-light-cyan/5 rounded-sm">
                     <h3 className="text-light-cyan font-black uppercase tracking-widest text-sm mb-2 flex items-center gap-2"><Shield className="w-4 h-4"/> General Police Guidelines</h3>
                     <p className="text-xs text-gray-400">Rules governing the interaction between law enforcement and citizens/criminals.</p>
                   </div>
                   <div className="grid grid-cols-1 gap-4">
                     {POLICE_RULES.map((rule, idx) => (
                       <AccordionItem 
                         key={idx} 
                         title={rule.title} 
                         isOpen={!!openItems[`police-${idx}`]} 
                         onToggle={() => toggleItem(`police-${idx}`)}
                       >
                         {rule.desc}
                       </AccordionItem>
                     ))}
                   </div>
                 </motion.div>
               )}

               {activeCategory === 'openup' && (
                 <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                   <div className="mb-6 p-4 border border-red-500/20 bg-red-500/5 rounded-sm">
                     <h3 className="text-red-500 font-black uppercase tracking-widest text-sm mb-2 flex items-center gap-2"><Crosshair className="w-4 h-4"/> Active Crisis & Raids</h3>
                     <p className="text-xs text-gray-400">Policies for massive gang vs police raids (Open Up).</p>
                   </div>
                   <div className="grid grid-cols-1 gap-4">
                     {OPEN_UP_RULES.map((rule, idx) => (
                       <AccordionItem 
                         key={idx} 
                         title={rule.title} 
                         isOpen={!!openItems[`openup-${idx}`]} 
                         onToggle={() => toggleItem(`openup-${idx}`)}
                       >
                         {rule.desc}
                       </AccordionItem>
                     ))}
                   </div>
                 </motion.div>
               )}

               {activeCategory === 'punishments' && (
                 <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                   <div className="mb-6 p-4 border border-yellow-500/20 bg-yellow-500/5 rounded-sm">
                     <h3 className="text-yellow-500 font-black uppercase tracking-widest text-sm mb-2 flex items-center gap-2"><AlertTriangle className="w-4 h-4"/> Standard Punishments Table</h3>
                     <p className="text-xs text-gray-400">Common rulebreaks and their designated Community Service / Ban thresholds.</p>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {PUNISHMENTS.map((item, idx) => (
                       <div key={idx} className="flex justify-between items-center bg-white/5 border border-white/10 p-4 rounded-sm">
                         <span className="text-white font-bold text-sm uppercase">{item.title}</span>
                         <span className="text-light-cyan text-xs font-mono">{item.desc}</span>
                       </div>
                     ))}
                   </div>
                 </motion.div>
               )}

               {activeCategory === 'mods' && (
                 <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="border border-green-500/20 bg-green-500/5 p-6 rounded-sm">
                       <h4 className="text-green-500 font-black uppercase font-display text-lg mb-4 flex items-center gap-2">
                         <span className="w-2 h-2 rounded-full bg-green-500"></span> Επιτρέπονται
                       </h4>
                       <ul className="space-y-2 text-sm text-gray-300">
                         {MODS_RULES.allowed.map((mod, i) => (
                           <li key={i} className="flex items-start gap-2">
                             <span className="text-green-500 mt-1">✔</span> {mod}
                           </li>
                         ))}
                       </ul>
                     </div>

                     <div className="border border-red-500/20 bg-red-500/5 p-6 rounded-sm">
                       <h4 className="text-red-500 font-black uppercase font-display text-lg mb-4 flex items-center gap-2">
                         <span className="w-2 h-2 rounded-full bg-red-500"></span> Απαγορεύονται
                       </h4>
                       <ul className="space-y-2 text-sm text-gray-300">
                         {MODS_RULES.forbidden.map((mod, i) => (
                           <li key={i} className="flex items-start gap-2">
                             <span className="text-red-500 mt-1">❌</span> {mod}
                           </li>
                         ))}
                       </ul>
                     </div>
                   </div>

                   <div className="border border-white/10 bg-white/5 p-6 rounded-sm">
                     <h4 className="text-white font-black uppercase font-display text-lg mb-4 tracking-widest border-b border-white/10 pb-4">
                       Κυρώσεις Αντι-Cheat
                     </h4>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {MODS_RULES.sanctions.map((s, i) => (
                         <div key={i} className="bg-dark-black p-3 border border-red-500/20 rounded-sm flex justify-between items-center text-sm">
                           <span className="text-gray-300">{s.rule}</span>
                           <span className="text-red-500 font-black ml-4 text-right">{s.penalty}</span>
                         </div>
                       ))}
                     </div>
                   </div>

                   <div className="border-l-4 border-yellow-500 bg-yellow-500/5 p-4 text-sm text-yellow-200">
                     <ul className="space-y-1">
                       {MODS_RULES.notes.map((note, i) => (
                         <li key={i}>• {note}</li>
                       ))}
                     </ul>
                   </div>

                 </motion.div>
               )}
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}