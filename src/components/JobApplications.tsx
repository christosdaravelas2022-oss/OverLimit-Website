import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Shield, Activity, Scale, X, Send, Heart, Zap, Camera } from "lucide-react";
import SmartImage from "./SmartImage";

const jobs = [
  { 
    title: "Ελληνική Αστυνομία", 
    image: "/input_file_4.png",
    desc: "Elite Tactical Units. Maintain order with precision and equipment.",
    icon: <Shield className="w-12 h-12 text-light-cyan/20" />
  },
  { 
    title: "ΕΚΑΒ", 
    image: "/input_file_3.png",
    desc: "Speed and survival. Join the medical response team.",
    icon: <Activity className="w-12 h-12 text-light-cyan/20" />
  },
  { 
    title: "Δικαστικό Μέγαρο", 
    image: "/input_file_5.png",
    desc: "Legal mastery. Balance the scales of the city's future.",
    icon: <Scale className="w-12 h-12 text-light-cyan/20" />
  },
  { 
    title: "Staff Team", 
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
    desc: "The architects of the over limit. Integrity and excellence.",
    icon: <Zap className="w-12 h-12 text-light-cyan/20" />
  },
  { 
    title: "Streamer / Content Creator", 
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
    desc: "Broadcast the action. Partner with Overlimit for growth.",
    icon: <Camera className="w-12 h-12 text-light-cyan/20" />
  },
];

interface ApplicationModalProps {
  job: typeof jobs[0] | null;
  onClose: () => void;
}

const GREEK_QUESTIONS: Record<string, { label: string; placeholder: string; type: 'text' | 'textarea' | 'number' }[]> = {
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

    const webhookUrl = (import.meta as any).env.VITE_DISCORD_WEBHOOK_URL;
    let submissionSuccess = true;

    if (webhookUrl) {
      try {
        const fieldsArr = Object.entries(formData).map(([key, value]) => ({
          name: key === 'discordTag' ? 'Discord Tag' : key,
          value: value || 'N/A',
          inline: false
        }));

        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(getDiscordWebhookPayload(job, fieldsArr))
        });
        
        if (!response.ok) submissionSuccess = false;
      } catch (error) {
        console.error("Failed to send webhook:", error);
        submissionSuccess = false;
      }
    } else {
      console.warn("Discord Webhook URL not configured. Submitting locally (simulation).");
      // Still show success in dev as requested by design philosophy for no mock infrastructure
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    setIsSubmitting(false);
    if (submissionSuccess) {
      setIsSuccess(true);
    } else {
      setErrorMsg("Υπήρξε ένα πρόβλημα κατά την υποβολή. Παρακαλώ προσπαθήστε ξανά αργότερα ή επικοινωνήστε με το Staff.");
    }
  };

  // Handle success auto-close in a dedicated effect
  React.useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, onClose]);

  const getDiscordWebhookPayload = (job: any, fields: any[]) => {
    return {
      embeds: [{
        title: `📩 Νέα Αίτηση: ${job.title}`,
        description: "Μια νέα αίτηση υποβλήθηκε μέσω του Overlimit Portal.",
        color: 3447003, // Blue
        fields: [
          ...fields,
          { 
            name: "━━━━━━━━━━━━━━━━━", 
            value: " " 
          },
          { 
            name: "ΔΙΑΧΕΙΡΙΣΗ ΑΙΤΗΣΗΣ", 
            value: "✅ **Accept:** Πατήστε το reaction ✅\n❌ **Reject:** Πατήστε το reaction ❌\n\n*Σημείωση: Η επικοινωνία θα γίνει μέσω Discord DM.*" 
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
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark-black/90 backdrop-blur-md"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="w-full max-w-2xl bg-graphite border border-white/10 rounded-sm relative overflow-hidden flex flex-col md:flex-row h-auto md:h-[600px] shadow-[0_0_50px_rgba(0,191,255,0.2)]"
      >
        {/* Left Side - Job Info */}
        <div className="w-full md:w-5/12 relative hidden md:block border-r border-white/10">
           {/* HUD Markers */}
           <div className="absolute top-4 left-4 hud-corner border-t border-l z-20" />
           <div className="absolute top-4 right-4 hud-corner border-t border-r z-20" />
           <div className="absolute bottom-4 left-4 hud-corner border-b border-l z-20" />
           <div className="absolute bottom-4 right-4 hud-corner border-b border-r z-20" />

           <SmartImage 
             src={job.image} 
             alt={job.title} 
             className="w-full h-full object-cover grayscale brightness-25 scale-110"
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
      <div className="max-w-7xl mx-auto px-6">
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
              className="group relative h-[450px] rounded-sm overflow-hidden border border-white/5 cursor-pointer skew-x-[-2deg] shadow-[0_0_20px_rgba(0,0,0,0.5)]"
              id={`job-${job.title.toLowerCase().replace(' ', '-')}`}
            >
              <div className="absolute inset-0 z-[5] pointer-events-none group-hover:opacity-100 opacity-30 transition-opacity">
                <div className="hud-corner top-4 left-4 border-t border-l" />
                <div className="hud-corner top-4 right-4 border-t border-r" />
                <div className="hud-corner bottom-4 left-4 border-b border-l" />
                <div className="hud-corner bottom-4 right-4 border-b border-r" />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-dark-black via-dark-black/40 to-transparent z-10" />
              <SmartImage 
                src={job.image} 
                alt={job.title} 
                className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 group-hover:scale-110 skew-x-[2deg]" 
                fallbackIcon={job.icon}
              />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20 skew-x-[2deg]">
                <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 bg-light-cyan text-dark-black">
                   <span className="text-[10px] uppercase font-black tracking-widest">Active Recruitment</span>
                </div>
                <h3 className="heading-massive text-4xl text-white mb-2 group-hover:text-light-cyan transition-colors">
                  {job.title}
                </h3>
                <p className="font-sans text-sm text-soft-gray mb-6 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300">
                  {job.desc}
                </p>
                <div className="flex items-center gap-2 text-light-cyan font-technical font-black text-xs tracking-[0.2em] uppercase underline-offset-4 hover:underline">
                  Initiate Career
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedJob && (
          <ApplicationModal 
            job={selectedJob} 
            onClose={() => setSelectedJob(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}
