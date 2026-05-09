import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Shield, Activity, Scale, X, Send, Zap, Camera, Lock, Skull } from "lucide-react";
import SmartImage from "./SmartImage";
import { db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth } from "../lib/firebase";

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

const jobs = [
  { 
    title: "Ownership", 
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
    desc: "Διαχείριση και υποδομές. Καθορίστε το μέλλον του Overlimit.",
    icon: <Lock className="w-12 h-12 text-light-cyan/20" />
  },
  { 
    title: "Ελληνική Αστυνομία", 
    image: "https://upload.wikimedia.org/wikipedia/el/thumb/a/ac/Greek_police_logo.svg/1280px-Greek_police_logo.svg.png",
    desc: "Ελίτ τακτικές μονάδες. Διατηρήστε την τάξη με πειθαρχία και εξοπλισμό.",
    icon: <Shield className="w-12 h-12 text-light-cyan/20" />
  },
  { 
    title: "Λιμενικό Σώμα", 
    image: "https://upload.wikimedia.org/wikipedia/el/c/c3/Hellenic_Coast_Guard_coat_of_arms.png",
    desc: "Ναυτική ασφάλεια και επιχειρήσεις διάσωσης. Κυριαρχήστε στις ελληνικές θάλασσες.",
    icon: <Activity className="w-12 h-12 text-light-cyan/20" />
  },
  { 
    title: "ΕΚΑΒ", 
    image: "https://upload.wikimedia.org/wikipedia/el/4/44/EKAB_logo.png",
    desc: "Ταχύτητα και επιβίωση. Γίνετε μέλος της ιατρικής ομάδας άμεσης επέμβασης.",
    icon: <Activity className="w-12 h-12 text-light-cyan/20" />
  },
  { 
    title: "Δικαστικό Μέγαρο", 
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop",
    desc: "Νόμος και δικαιοσύνη. Οι φύλακες του δικαίου στον Overlimit.",
    icon: <Scale className="w-12 h-12 text-light-cyan/20" />
  },
  { 
    title: "Staff Team", 
    image: "file:///C:/Users/chris/Downloads/Logo.png",
    desc: "Οι αρχιτέκτονες του Overlimit. Ακεραιότητα και αριστεία.",
    icon: <Zap className="w-12 h-12 text-light-cyan/20" />
  },
  { 
    title: "FBI", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5UPdTExJSjtYy_3VLJbB4ftA56NmhAqIVCg&s",
    desc: "Ομοσπονδιακή υπηρεσία πληροφοριών. Εξουδετερώστε τις μεγαλύτερες απειλές της πόλης.",
    icon: <Lock className="w-12 h-12 text-light-cyan/20" />
  },
  { 
    title: "Αγροφυλακή", 
    image: "https://www.newsbeast.gr/files/1/2010/07/10/agorfilaki.jpg",
    desc: "Προστασία της υπαίθρου και του περιβάλλοντος. Οι άγρυπνοι φρουροί της φύσης.",
    icon: <Shield className="w-12 h-12 text-light-cyan/20" />
  },
  { 
    title: "Στρατός", 
    image: "https://upload.wikimedia.org/wikipedia/commons/8/85/HellenicArmySeal.svg",
    desc: "Ειδικές δυνάμεις και τακτικές επιχειρήσεις. Η απόλυτη πειθαρχία και ισχύς.",
    icon: <Activity className="w-12 h-12 text-light-cyan/20" />
  },
  { 
    title: "Illegal Organization", 
    image: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?q=80&w=800&auto=format&fit=crop",
    desc: "Δύναμη, σεβασμός και υπόκοσμος. Χτίστε την αυτοκρατορία σας.",
    icon: <Skull className="w-12 h-12 text-light-cyan/20" />
  },
  { 
    title: "Streamer / Content Creator", 
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
    desc: "Μεταδώστε τη δράση. Συνεργαστείτε με τον Overlimit για ανάπτυξη.",
    icon: <Camera className="w-12 h-12 text-light-cyan/20" />
  }
];

interface ApplicationModalProps {
  job: typeof jobs[0] | null;
  onClose: () => void;
}

const GREEK_QUESTIONS: Record<string, { label: string; placeholder: string; type: 'text' | 'textarea' | 'number' }[]> = {
  'Λιμενικό Σώμα': [
    { label: 'Ονοματεπώνυμο Χαρακτήρα / Ηλικία', placeholder: 'π.χ. Ανδρέας Νικολάου / 26', type: 'text' },
    { label: 'Προηγούμενη Εμπειρία στη θάλασσα (RP)', placeholder: 'Έχετε υπάρξει ξανά σε σώμα ασφαλείας;', type: 'textarea' },
    { label: 'Γιατί θέλετε να ενταχθείτε στο Λιμενικό;', placeholder: 'Ποιο είναι το κίνητρό σας;', type: 'textarea' },
    { label: 'Γνώσεις Κανονισμών', placeholder: 'Πόσο καλά γνωρίζετε τους κανόνες πλεύσης και RP;', type: 'textarea' },
  ],
  'FBI': [
    { label: 'Ονοματεπώνυμο / Ηλικία', placeholder: 'π.χ. John Doe / 28', type: 'text' },
    { label: 'Εξειδίκευση (Cyber / Field / Tactical)', placeholder: 'Ποιο είναι το δυνατό σας σημείο;', type: 'text' },
    { label: 'Γιατί FBI και όχι Αστυνομία;', placeholder: 'Τι σας κάνει να ξεχωρίζετε;', type: 'textarea' },
    { label: 'Κανανόηση Διαβαθμισμένων Πληροφοριών', placeholder: 'Πώς διαχειρίζεστε το απόρρητο;', type: 'textarea' },
  ],
  'Αγροφυλακή': [
    { label: 'Ονοματεπώνυμο / Ηλικία', placeholder: 'π.χ. Κώστας Γεωργίου / 32', type: 'text' },
    { label: 'Γνώσεις Χλωρίδας/Πανίδας (RP)', placeholder: 'Πόσο καλά γνωρίζετε την ύπαιθρο;', type: 'textarea' },
    { label: 'Εμπειρία σε οδήγηση Off-road', placeholder: 'Κατέχετε τις απαραίτητες δεξιότητες;', type: 'text' },
    { label: 'Γιατί επιλέξατε την Αγροφυλακή;', placeholder: 'Ποιο είναι το κίνητρό σας;', type: 'textarea' },
  ],
  'Στρατός': [
    { label: 'Ονοματεπώνυμο / Ηλικία', placeholder: 'π.χ. Δημήτρης Μαρκάκης / 24', type: 'text' },
    { label: 'Προηγούμενη θητεία (RP)', placeholder: 'Περιγράψτε το στρατιωτικό σας ιστορικό...', type: 'textarea' },
    { label: 'Ειδικότητα (Ελεύθερος Σκοπευτής / Μηχανικός / κλπ)', placeholder: 'Ποια είναι η ειδικότητά σας;', type: 'text' },
    { label: 'Υπακοή σε διαταγές & Πειθαρχία', placeholder: 'Πώς λειτουργείτε υπό πίεση και ιεραρχία;', type: 'textarea' },
  ],
  'Illegal Organization': [
    { label: 'Όνομα Οργάνωσης', placeholder: 'π.χ. Vagos / Mafia / Cartel', type: 'text' },
    { label: 'Αριθμός Μελών (Minimum 5)', placeholder: 'Πόσα άτομα είστε;', type: 'text' },
    { label: 'Story / Backstory Οργάνωσης', placeholder: 'Πού εδρεύετε; Ποιο είναι το lore σας;', type: 'textarea' },
    { label: 'Γιατί να εγκριθεί η δική σας οργάνωση;', placeholder: 'Τι διαφορετικό θα προσφέρετε στο illegal RP;', type: 'textarea' },
  ],
  'Ελληνική Αστυνομία': [
    { label: 'Ονοματεπώνυμο Χαρακτήρα / Ηλικία', placeholder: 'π.χ. Γιώργος Παππάς / 25', type: 'text' },
    { label: 'Προηγούμενη Εμπειρία', placeholder: 'Περιγράψτε το ιστορικό σας σε παρόμοια τμήματα...', type: 'textarea' },
    { label: 'Τι σημαίνει αυτή η καριέρα για εσάς;', placeholder: 'Κίνητρα & Στόχοι...', type: 'textarea' },
    { label: 'Αντίληψη για την Ιεραρχία & Ανώτερους Βαθμούς', placeholder: 'Εξηγήστε πώς βλέπετε την πειθαρχία και την ιεραρχία...', type: 'textarea' },
  ],
  'ΕΚΑΒ': [
    { label: 'Ονοματεπώνυμο Χαρακτήρα / Ηλικία', placeholder: 'π.χ. Νίκος Στεργίου / 28', type: 'text' },
    { label: 'Ιατρικές Γνώσεις (Roleplay)', placeholder: 'Περιγράψτε τι γνωρίζετε για τις πρώτες βοήθειες...', type: 'textarea' },
    { label: 'Γιατί θέλετε να γίνετε διασώστης;', placeholder: 'Ποιο είναι το κίνητρό σας;', type: 'textarea' },
    { label: 'Προηγούμενη Εμπειρία σε EMS', placeholder: 'Έχετε υπάρξει ξανά στο ΕΚΑΒ;', type: 'textarea' },
  ],
  'Δικαστικό Μέγαρο': [
    { label: 'Ονοματεπώνυμο / Ηλικία', placeholder: 'π.χ. Ελένη Κώστα / 30', type: 'text' },
    { label: 'Γνώση των Νόμων της Πόλης', placeholder: 'Πόσο καλά γνωρίζετε το νομικό πλαίσιο;', type: 'textarea' },
    { label: 'Προηγούμενη εμπειρία σε Νομικά/Δικαστικά', placeholder: 'Έχετε υπάρξει δικηγόρος ή δικαστής;', type: 'textarea' },
    { label: 'Στόχος σας στο Δικαστικό Σώμα', placeholder: 'Πώς θα βοηθήσετε στην απονομή δικαιοσύνης;', type: 'textarea' },
  ],
  'Ownership': [
    { label: 'Ονοματεπώνυμο / Ηλικία', placeholder: 'π.χ. Αλέξανδρος Παππάς / 25', type: 'text' },
    { label: 'Προηγούμενη εμπειρία σε Management', placeholder: 'Έχετε υπάρξει ξανά σε θέση ευθύνης;', type: 'textarea' },
    { label: 'Στόχος σας για τον Server', placeholder: 'Πώς βλέπετε την εξέλιξη του Overlimit;', type: 'textarea' },
    { label: 'Ποιες είναι οι γνώσεις σας σε Infrastructure;', placeholder: 'Περιγράψτε την τεχνική σας εμπειρία αν υπάρχει...', type: 'textarea' },
  ],
  'Staff Team': [
    { label: 'Ονοματεπώνυμο / Ηλικία', placeholder: 'π.χ. Μάριος Ανδρέου / 22', type: 'text' },
    { label: 'Έχετε προηγούμενη εμπειρία ως Staff;', placeholder: 'Περιγράψτε την εμπειρία σας...', type: 'textarea' },
    { label: 'Πόσο καιρό ήσασταν εκεί;', placeholder: 'Διάρκεια προηγούμενης θητείας...', type: 'text' },
    { label: 'Πόσες ώρες μπορείτε να είστε διαθέσιμος/η στην ομάδα;', placeholder: 'Διαθεσιμότητα ανά ημέρα/εβδομάδα...', type: 'text' },
    { label: 'Γιατί να επιλέξουμε εσάς;', placeholder: 'Τι σας κάνει να ξεχωρίζετε;', type: 'textarea' },
  ],
  'Streamer / Content Creator': [
    { label: 'Όνομα Καναλιού', placeholder: 'π.χ. Twitch / YouTube Name', type: 'text' },
    { label: 'Σύνδεσμος Καναλιού', placeholder: 'URL...', type: 'text' },
    { label: 'Μέσος Όρος Θεατών', placeholder: 'Πόσους θεατές έχετε συνήθως;', type: 'text' },
    { label: 'Γιατί θέλετε να γίνετε Partner;', placeholder: 'Περιγράψτε το περιεχόμενό σας...', type: 'textarea' },
  ],
  'default': [
    { label: 'Ονοματεπώνυμο Χαρακτήρα / Ηλικία', placeholder: 'Πλ. Όνομα / Ηλικία', type: 'text' },
    { label: 'Προηγούμενη Εμπειρία', placeholder: 'Περιγράψτε το ιστορικό σας...', type: 'textarea' },
    { label: 'Τι σημαίνει αυτή η καριέρα για εσάς;', placeholder: 'Κίνητρα...', type: 'textarea' },
  ]
};

function ApplicationModal({ job, onClose }: ApplicationModalProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [formData, setFormData] = React.useState<Record<string, string>>({
    discordTag: '',
  });

  if (!job) return null;

  const questions = GREEK_QUESTIONS[job.title] || GREEK_QUESTIONS['default'];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMsg(null);

    const defaultWebhook = (import.meta as any).env.VITE_DISCORD_WEBHOOK_URL;
    const emsWebhook = "https://discord.com/api/webhooks/1502567238064930848/upntstFYv8hmmMjmXnwyOP2gHaCMypLBXJ9HFDH1HAFtcfLZr3w_oTQXKEa8y83MBHHT";
    const staffWebhook = "https://discord.com/api/webhooks/1502569452472897547/6xicgRJoRUDe3fOu9p_ZaM97mFXmRg-QrygBgEaOkklqS50uif69BTYofeZkpC2VC7rS";
    const ownershipWebhook = "https://discord.com/api/webhooks/1502570329917362297/Jb0wIuckVNLG4d9A-3NoE00YciH6VdE09d9QvPAt5GdDe9ELp-j4Edho8MD-g1dI0Mer";
    const coastGuardWebhook = "https://discord.com/api/webhooks/1502583609998184528/KJBZPerQG6Q7HZeXRnNhzjDuHiyZQfhgVfgApTnZZ79K3KEuHdFU4DmENpMRo_Wfg_l5";
    const fbiWebhook = "https://discord.com/api/webhooks/1502584629335560203/knpvN4rl-sajze0OOOnqBTz5ZEKhD0EbjfS89MugkzQxIwSz2PwKohokloAaFfaPG3y0";
    const armyWebhook = "https://discord.com/api/webhooks/1502586387881263115/l9XFeuAw0wXdUQEf4jUWPCxKQ4wemoEs2pGWOq1gcXJhhk1oAsnlqqvSCOhK3WXWNbci";
    const forestCopsWebhook = "https://discord.com/api/webhooks/1502587041605746831/XqXGGsiRPbadiDm_lcWqsPK__DVQ-h_33I_vTWx07gCo9XJYf2K2pk2ldbCS4ghX74cu";

    const webhookUrl = 
      job.title === 'ΕΚΑΒ' ? emsWebhook : 
      job.title === 'Staff Team' ? staffWebhook : 
      job.title === 'Λιμενικό Σώμα' ? coastGuardWebhook : 
      job.title === 'FBI' ? fbiWebhook :
      job.title === 'Στρατός' ? armyWebhook :
      job.title === 'Αγροφυλακή' ? forestCopsWebhook :
      job.title === 'Ownership' ? ownershipWebhook :
      defaultWebhook;
    let submissionSuccess = true;
    let docId = "";

    try {
      // Save to Firestore first
      const docRef = await addDoc(collection(db, "applications"), {
        jobTitle: job.title,
        discordTag: formData.discordTag,
        formData: formData,
        status: "pending",
        createdAt: serverTimestamp()
      });
      docId = docRef.id;
    } catch (error) {
      submissionSuccess = false;
      try {
        handleFirestoreError(error, OperationType.CREATE, "applications");
      } catch (customErr) {
        // Suppress console.error to prevent potential cross-origin cloning issues
      }
    }

    if (submissionSuccess && webhookUrl) {
      try {
        const fieldsArr = Object.entries(formData).map(([key, value]) => ({
          name: key === 'discordTag' ? 'Discord Tag' : key,
          value: value || 'N/A',
          inline: false
        }));

        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(getDiscordWebhookPayload(job, fieldsArr, docId))
        });
        
        if (!response.ok) {
           console.warn("Webhook failed but Firestore saved.");
        }
      } catch (error) {
        // Suppressed console.error webhook failure to prevent clone aborts
      }
    } else if (!webhookUrl && submissionSuccess) {
      console.warn("Discord Webhook URL not configured. Submitting via Firestore only.");
    }

    setIsSubmitting(false);
    if (submissionSuccess) {
      setIsSuccess(true);
    } else {
      setErrorMsg("Υπήρξε ένα πρόβλημα κατά την υποβολή. Παρακαλώ προσπαθήστε ξανά αργότερα ή επικοινωνήστε με το Staff.");
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, onClose]);

  const getDiscordWebhookPayload = (job: any, fields: any[], docId: string) => {
    const adminUrl = `https://over-limit-website.vercel.app/#admin=true&category=${encodeURIComponent(job.title)}&id=portal-${docId}`;
    return {
      embeds: [{
        title: `📩 Νέα Αίτηση: ${job.title}`,
        description: `Μια νέα αίτηση υποβλήθηκε μέσω του Overlimit Portal.\n\n🔗 **[ΔΙΑΧΕΙΡΙΣΗ ΑΙΤΗΣΗΣ ΜΕΣΩ PORTAL](${adminUrl})**`,
        color: 3447003,
        fields: [
          ...fields,
          { 
            name: "━━━━━━━━━━━━━━━━━", 
            value: " " 
          },
          { 
            name: "ΟΔΗΓΙΕΣ", 
            value: "Πατήστε το παραπάνω link για να δείτε την αίτηση στο Portal και να την **ΕΓΚΡΙΝΕΤΕ** ή να την **ΑΠΟΡΡΙΨΕΤΕ**.\n\n*Σημείωση: Απαιτείται πρόσβαση μόνο απο εξουσιοδοτημένο πρωσοπικό.*" 
          }
        ],
        timestamp: new Date().toISOString(),
        footer: { 
          text: "Overlimit Over Limit // Recruitment Portal",
          icon_url: "https://grainy-gradients.vercel.app/noise.svg"
        }
      }]
    };
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-dark-black/90 backdrop-blur-md"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="w-full max-w-2xl bg-graphite border border-white/10 rounded-sm relative overflow-hidden flex flex-col md:flex-row h-auto md:h-[600px] shadow-[0_0_50px_rgba(0,191,255,0.2)]"
      >
        {/* Left Side - Job Info */}
        <div className="w-full md:w-5/12 relative hidden md:block border-r border-white/10">
           <div className="absolute top-4 left-4 hud-corner border-t border-l z-20" />
           <div className="absolute top-4 right-4 hud-corner border-t border-r z-20" />
           <div className="absolute bottom-4 left-4 hud-corner border-b border-l z-20" />
           <div className="absolute bottom-4 right-4 hud-corner border-b border-r z-20" />

           <SmartImage 
             src={job.image} 
             alt={job.title} 
             className="w-full h-full object-cover grayscale brightness-75 scale-110"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-dark-black via-dark-black/60 to-transparent" />
           <div className="absolute bottom-10 left-10 right-10">
              <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 bg-light-cyan/10 border border-light-cyan/30 text-light-cyan">
                 <span className="text-[10px] uppercase font-black tracking-[0.3em]">Sector Registry</span>
              </div>
              <h3 className="heading-massive text-5xl text-white italic drop-shadow-[0_0_20px_rgba(0,191,255,0.4)]">{job.title}</h3>
              <div className="mt-4 hud-line w-full opacity-30" />
           </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 p-8 md:p-12 overflow-y-auto bg-graphite/50 relative">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-soft-gray hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {isSuccess ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-full border-4 border-light-cyan flex items-center justify-center mb-6">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-10 h-10 bg-light-cyan rounded-full"
                />
              </div>
              <h4 className="heading-massive text-3xl text-white mb-2">APPLICATION SENT</h4>
              <p className="text-soft-gray font-sans">Our department superiors will review your profile shortly.</p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <div className="font-technical text-[10px] text-light-cyan uppercase tracking-[0.3em] font-black mb-2 flex items-center gap-2">
                  <Send className="w-3 h-3" /> Σύστημα: Πύλη Αιτήσεων
                </div>
                <h4 className="font-display text-2xl font-black text-white italic uppercase tracking-tighter">Έναρξη Σταδιοδρομίας</h4>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <label className="font-technical text-[10px] text-soft-gray uppercase tracking-widest block font-black">Discord Tag</label>
                  <input 
                    required
                    type="text" 
                    placeholder="User#0000"
                    value={formData.discordTag}
                    onChange={(e) => handleInputChange('discordTag', e.target.value)}
                    className="w-full bg-dark-black border border-white/10 px-4 py-3 text-white font-sans text-sm focus:border-light-cyan focus:outline-none transition-colors rounded-sm"
                  />
                </div>

                {questions.map((q) => (
                  <div key={q.label} className="space-y-1">
                    <label className="font-technical text-[10px] text-soft-gray uppercase tracking-widest block font-black">{q.label}</label>
                    {q.type === 'textarea' ? (
                      <textarea 
                        required
                        rows={3}
                        placeholder={q.placeholder}
                        value={formData[q.label] || ''}
                        onChange={(e) => handleInputChange(q.label, e.target.value)}
                        className="w-full bg-dark-black border border-white/10 px-4 py-3 text-white font-sans text-sm focus:border-light-cyan focus:outline-none transition-colors rounded-sm resize-none"
                      />
                    ) : (
                      <input 
                        required
                        type={q.type}
                        placeholder={q.placeholder}
                        value={formData[q.label] || ''}
                        onChange={(e) => handleInputChange(q.label, e.target.value)}
                        className="w-full bg-dark-black border border-white/10 px-4 py-3 text-white font-sans text-sm focus:border-light-cyan focus:outline-none transition-colors rounded-sm"
                      />
                    )}
                  </div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className="w-full py-4 bg-light-cyan text-dark-black font-display font-black text-sm uppercase tracking-widest skew-btn flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-wait"
                >
                  {isSubmitting ? "ΑΠΟΣΤΟΛΗ..." : (
                    <>
                      <span className="block">ΥΠΟΒΟΛΗ ΑΙΤΗΣΗΣ</span>
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>

                {errorMsg && (
                  <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 text-red-500 text-[10px] font-black uppercase tracking-widest text-center animate-pulse">
                    {errorMsg}
                  </div>
                )}
              </form>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function JobApplications() {
  const [selectedJob, setSelectedJob] = React.useState<typeof jobs[0] | null>(null);

  return (
    <section className="py-24 bg-deep-navy/20 relative" id="jobs">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-0 w-full hud-line -z-10" />
          <div className="inline-block bg-dark-black px-8">
             <h2 className="heading-massive text-5xl md:text-7xl mb-4 text-white">
                JOB <span className="text-light-cyan">APPLICATIONS</span>
             </h2>
          </div>
          <p className="font-sans text-soft-gray max-w-3xl mx-auto mt-4 px-6 py-4 glass-panel border-x-4 border-light-cyan">
            Start your professional journey in Hellas. Join our departments and help maintain the order or balance of the city.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {jobs.map((job, i) => (
            <motion.div
              key={job.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              onClick={() => setSelectedJob(job)}
              className="group relative h-[450px] rounded-sm overflow-hidden border border-white/5 cursor-pointer skew-x-[-2deg]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-dark-black via-dark-black/40 to-transparent z-10" />
              <SmartImage 
                src={job.image} 
                alt={job.title} 
                className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" 
                fallbackIcon={job.icon}
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20 skew-x-[2deg]">
                <h3 className="heading-massive text-4xl text-white mb-2 group-hover:text-light-cyan transition-colors">
                  {job.title}
                </h3>
                <p className="font-sans text-sm text-soft-gray mb-6">
                  {job.desc}
                </p>
                <div className="flex items-center gap-2 text-light-cyan font-technical font-black text-xs tracking-[0.2em] uppercase">
                  Apply Now <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedJob && (
          <ApplicationModal job={selectedJob} onClose={() => setSelectedJob(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
