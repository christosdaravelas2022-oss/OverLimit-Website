import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { db, auth } from '../lib/firebase';
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User, signOut } from 'firebase/auth';
import { Check, X, Bell, ArrowLeft, Clock, UserCheck, LogIn, Lock as LockIcon, LogOut } from 'lucide-react';

interface AdminPortalProps {
  docId: string | null;
  category: string | null;
}

export default function AdminPortal({ docId, category }: AdminPortalProps) {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [applications, setApplications] = useState<any[]>([]);
  const [selectedApp, setSelectedApp] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'pending' | 'history'>('pending');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Sign in error:", error);
      alert("Αποτυχία σύνδεσης.");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const fetchApplications = async () => {
    if (!user) return;

    try {
      setLoading(true);
      if (category) {
        const q = query(collection(db, "applications"), where("jobTitle", "==", category));
        const querySnapshot = await getDocs(q);
        const apps = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        apps.sort((a: any, b: any) => {
          const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : Date.now();
          const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : Date.now();
          return timeB - timeA;
        });
        setApplications(apps);

        if (docId) {
          const found = apps.find(a => a.id === docId);
          if (found) {
            setSelectedApp(found);
            setActiveTab((found as any).status === 'pending' ? 'pending' : 'history');
          }
        }
      } else if (docId) {
        const docRef = doc(db, 'applications', docId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSelectedApp({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError('Application not found');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Error fetching applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && !user.isAnonymous) {
      fetchApplications();
    }
  }, [docId, category, user]);

  const handleAction = async (status: 'accepted' | 'rejected') => {
    if (!user) {
      alert("Παρακαλώ συνδεθείτε πρώτα.");
      return;
    }
    
    if (!selectedApp) return;

    try {
      setLoading(true);
      const chiefName = user.displayName || user.email || 'Admin';
      
      const docRef = doc(db, 'applications', selectedApp.id);
      const handledAt = new Date().toISOString();
      await updateDoc(docRef, { 
        status,
        handledBy: chiefName,
        handledAt: handledAt
      });
      
      const updatedApp = { ...selectedApp, status, handledBy: chiefName, handledAt };
      setSelectedApp(updatedApp);
      setApplications(prev => prev.map(a => a.id === selectedApp.id ? updatedApp : a));
      setActionSuccess(`Η αίτηση έχει ${status === 'accepted' ? 'εγκριθεί' : 'απορριφθεί'}.`);

      const defaultWebhook = (import.meta as any).env.VITE_DISCORD_WEBHOOK_URL;
      
      const responsesEmsWebhook = "https://discord.com/api/webhooks/1502957847938465935/T-IvyXe07qMQK7eLtnzwT7ZsqI3717jfRTeXQmLClFCMJ43vCWDuYdBjsHiKgOp_1695";
      const responsesStaffWebhook = "https://discord.com/api/webhooks/1502957060701159454/K3xYXrxOjMeQebJx0Vt3oeQNSlgnULjjLyNaS_tlUxOKutcjYvmx3MGs3ZihHs0VUFLU";
      const responsesPoliceWebhook = "https://discord.com/api/webhooks/1502957278880337930/LuUqPwwczpfpjRpbqUMGmldzH_CiqnboPN9S0-wTwDjhQJq48d6-N_QX-hEEzIuVQgj4";
      const responsesAgrofylakiWebhook = "https://discord.com/api/webhooks/1502957504005406841/HW9Oz8uG4fWAz8bk4gApms4dpUCuvce2Guf53u-_i-2X3RVeN8OGLvjklqbaGPzoYCbj";
      const responsesArmyWebhook = "https://discord.com/api/webhooks/1502957584695689286/AvUj93KRrWaSboYSyKiOloDBJxWXaItkY9xuncDoG865rXa3ju9c00OWUn5tyYHY0wP_";
      const responsesDimarxeioWebhook = "https://discord.com/api/webhooks/1502957641557610526/R3zFQqAuoAxu5HqPpOq4Tjw599H1kIZLvYrTdCPJCTjDfAHyEUg5lJiczhg3W2mN46za";
      const responsesCoastguardWebhook = "https://discord.com/api/webhooks/1502957707639128094/G1NfunQBNmKlTFz2hquDpTjxkOwg8IsACmwaRzbVItviGS4ypvBGbWBw1LZxESu79Zhd";
      const responsesFbiWebhook = "https://discord.com/api/webhooks/1502957758704779374/xCZsnXXOSuNHU9E48Z74V0PzcfNWeyUBJgVXeMbFI-JGO-hv-3rWmGe-W4YOVbZ6IGW0";
      const responsesOwnershipWebhook = "https://discord.com/api/webhooks/1502957798902857789/SKj3QZlWc2J2gFiaxtRaDXCFmNmJ3ZkJOVt4jWo9ZfjovQQ-lHrW-feErkmN7eMvoJOV";

      let responsesWebhook = defaultWebhook;
      
      const jobTitleLower = selectedApp.jobTitle?.toLowerCase() || '';
      
      if (jobTitleLower.includes('εκαβ')) {
        responsesWebhook = responsesEmsWebhook;
      } else if (jobTitleLower.includes('staff')) {
        responsesWebhook = responsesStaffWebhook;
      } else if (jobTitleLower.includes('αστυνομία') || jobTitleLower.includes('police')) {
        responsesWebhook = responsesPoliceWebhook;
      } else if (jobTitleLower.includes('αγροφυλακή')) {
        responsesWebhook = responsesAgrofylakiWebhook;
      } else if (jobTitleLower.includes('στρατός') || jobTitleLower.includes('army')) {
        responsesWebhook = responsesArmyWebhook;
      } else if (jobTitleLower.includes('δημαρχείο')) {
        responsesWebhook = responsesDimarxeioWebhook;
      } else if (jobTitleLower.includes('λιμενικό')) {
        responsesWebhook = responsesCoastguardWebhook;
      } else if (jobTitleLower.includes('fbi')) {
        responsesWebhook = responsesFbiWebhook;
      } else if (jobTitleLower.includes('ownership')) {
        responsesWebhook = responsesOwnershipWebhook;
      } else {
        responsesWebhook = defaultWebhook;
      }

      if (responsesWebhook) {
        const color = status === 'accepted' ? 3066993 : 15158332;
        const emoji = status === 'accepted' ? '✅' : '❌';
        await fetch(responsesWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `**Ενημέρωση Αίτησης για: ${selectedApp.discordTag}**`,
            embeds: [{
              title: `${emoji} Αποτελέσματα Αίτησης: ${status === 'accepted' ? 'ΕΓΚΡΙΘΗΚΕ' : 'ΑΠΟΡΡΙΦΘΗΚΕ'}`,
              description: `Η αίτησή σας για τη θέση **${selectedApp.jobTitle}** έχει **${status === 'accepted' ? 'ΕΓΚΡΙΘΕΙ' : 'ΑΠΟΡΡΙΦΘΕΙ'}**.\n\nΌνομα στο Discord: \`${selectedApp.discordTag}\`\nΕπεξεργάστηκε από: \`${chiefName}\`\n\n${status === 'accepted' ? 'Συγχαρητήρια! Παρακαλούμε περιμένετε τυχόν προσωπικό μήνυμα (DM) από το αρμόδιο Staff, ή επικοινωνήστε μέσω Ticket.' : 'Δυστυχώς η αίτησή σας απορρίφθηκε.'}`,
              color: color,
              timestamp: new Date().toISOString()
            }]
          })
        });
      }

    } catch (err: any) {
      setError(err.message || 'Error updating application');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center text-white bg-dark-black"><div className="animate-spin w-8 h-8 border-4 border-light-cyan border-t-transparent rounded-full" /></div>;
  }

  if (!user || user.isAnonymous) {
    return (
      <div className="min-h-screen bg-dark-black text-white p-6 md:p-12 font-sans flex items-center justify-center">
        <div className="bg-graphite border border-white/10 rounded-xl p-10 max-w-md w-full text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-light-cyan/20 blur-[120px] pointer-events-none" />
          
          <div className="relative z-10 block">
            <div className="w-20 h-20 bg-dark-black rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl border border-white/5">
              <LockIcon className="w-8 h-8 text-light-cyan" />
            </div>
            <h2 className="text-3xl font-display font-black text-white uppercase mb-4 tracking-tight">ΑΠΑΙΤΕΙΤΑΙ<br/>ΣΥΝΔΕΣΗ</h2>
            <p className="text-soft-gray mb-8 text-sm leading-relaxed">Πρέπει να συνδεθείτε με τον λογαριασμό σας στο Google για να έχετε πρόσβαση στο Portal Διαχείρισης Αιτήσεων.</p>
            
            <button 
              onClick={handleSignIn}
              className="w-full py-4 bg-white text-dark-black font-black uppercase text-sm rounded-lg flex items-center justify-center gap-3 hover:bg-gray-200 transition-all shadow-lg active:scale-95"
            >
              <LogIn className="w-5 h-5" /> ΣΥΝΔΕΣΗ ΜΕ GOOGLE
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading && applications.length === 0 && !selectedApp) {
    return <div className="min-h-screen flex items-center justify-center text-white bg-dark-black"><div className="animate-spin w-8 h-8 border-4 border-light-cyan border-t-transparent rounded-full" /></div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500 bg-dark-black">{error}</div>;
  }

  const filteredApps = applications.filter(a => {
    const status = a.status || 'pending';
    if (activeTab === 'pending') return status === 'pending';
    return status === 'accepted' || status === 'rejected';
  });

  return (
    <div className="min-h-screen bg-dark-black text-white flex flex-col md:flex-row overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -right-[5%] w-[600px] h-[600px] bg-light-cyan/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -left-[10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[150px]" />
      </div>

      <aside className="w-full md:w-80 bg-white/5 border-r border-white/10 backdrop-blur-xl flex flex-col p-6 z-10 shrink-0 md:h-screen md:overflow-y-auto">
        <div className="mb-10">
          <h1 className="text-2xl font-display font-black tracking-tighter uppercase text-white">
            Overlimit<span className="text-light-cyan">Portal</span>
          </h1>
          <p className="text-xs text-soft-gray uppercase tracking-widest mt-2 bg-dark-black/50 px-2 py-1 rounded inline-block">Management System</p>
        </div>

        <div className="flex-1">
          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-widest text-soft-gray mb-4 px-2">Πλοήγηση</h3>
            <nav className="flex flex-col gap-2">
              <button
                onClick={() => { setActiveTab('pending'); setSelectedApp(null); setActionSuccess(null); }}
                className={`py-3 px-4 text-left rounded-lg font-bold text-sm transition-all flex items-center justify-between ${activeTab === 'pending' && !selectedApp ? 'bg-light-cyan/20 text-light-cyan border border-light-cyan/30 shadow-[0_0_15px_rgba(0,255,255,0.1)]' : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'}`}
              >
                Εκκρεμούν
                <span className={`px-2 py-0.5 rounded-full text-xs font-mono bg-dark-black/50 ${activeTab === 'pending' && !selectedApp ? 'text-light-cyan' : 'text-gray-500'}`}>
                  {applications.filter(a => (a.status || 'pending') === 'pending').length}
                </span>
              </button>
              <button
                onClick={() => { setActiveTab('history'); setSelectedApp(null); setActionSuccess(null); }}
                className={`py-3 px-4 text-left rounded-lg font-bold text-sm transition-all flex items-center justify-between ${activeTab === 'history' && !selectedApp ? 'bg-light-cyan/20 text-light-cyan border border-light-cyan/30 shadow-[0_0_15px_rgba(0,255,255,0.1)]' : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'}`}
              >
                Ιστορικό
                <span className={`px-2 py-0.5 rounded-full text-xs font-mono bg-dark-black/50 ${activeTab === 'history' && !selectedApp ? 'text-light-cyan' : 'text-gray-500'}`}>
                  {applications.filter(a => (a.status === 'accepted' || a.status === 'rejected')).length}
                </span>
              </button>
            </nav>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-soft-gray mb-4 px-2">Πληροφορίες</h3>
            <div className="bg-dark-black/40 border border-white/5 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-light-cyan/20 flex items-center justify-center border border-light-cyan/30 text-light-cyan">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-bold text-white truncate">{user.displayName || 'Admin'}</p>
                  <p className="text-xs text-soft-gray truncate">{user.email}</p>
                </div>
              </div>
              <button 
                onClick={handleSignOut}
                className="w-full py-2.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 border border-red-500/20"
              >
                <LogOut className="w-4 h-4" /> Αποσύνδεση
              </button>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 z-10 overflow-y-auto max-h-screen relative dot-grid">
        {!selectedApp ? (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-display font-black text-white uppercase tracking-tight drop-shadow-lg">
                {category || "Διαχείριση"}
              </h2>
              <p className="text-sm text-soft-gray mt-2">
                Προβολή αιτήσεων • {activeTab === 'pending' ? 'Σε αναμονή' : 'Ιστορικό'}
              </p>
            </div>

            <AnimatePresence mode="popLayout">
              <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
                {filteredApps.map((app) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={app.id} 
                    onClick={() => setSelectedApp(app)}
                    className="bg-dark-black/60 backdrop-blur-md rounded-2xl border border-white/10 p-6 cursor-pointer hover:border-light-cyan/50 hover:bg-white/5 transition-all group flex flex-col justify-between h-48 relative overflow-hidden shadow-xl"
                  >
                    <div className={`absolute -top-10 -right-10 w-32 h-32 blur-[40px] opacity-20 pointer-events-none transition-colors ${app.status === 'accepted' ? 'bg-green-500' : app.status === 'rejected' ? 'bg-red-500' : 'bg-light-cyan'}`} />
                    
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <span className="text-xl font-bold text-white truncate pr-4">{app.discordTag}</span>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest border ${app.status === 'accepted' ? 'bg-green-500/10 border-green-500/30 text-green-400' : app.status === 'rejected' ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-light-cyan/10 border-light-cyan/30 text-light-cyan'}`}>
                          {app.status || 'pending'}
                        </span>
                      </div>
                      <p className="text-xs text-soft-gray flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> {app.createdAt?.toDate ? app.createdAt.toDate().toLocaleString('el-GR') : 'Άγνωστο'}</p>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-4">
                      {app.handledAt ? (
                        <div className="text-xs text-soft-gray flex items-center gap-2 bg-dark-black/50 px-3 py-1.5 rounded-full"><UserCheck className="w-3.5 h-3.5 text-light-cyan" /> {app.handledBy}</div>
                      ) : (
                        <div className="text-xs text-light-cyan font-bold uppercase tracking-widest bg-light-cyan/10 px-3 py-1.5 rounded-full">Εκκρεμεί έλεγχος</div>
                      )}
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowLeft className="w-4 h-4 rotate-180" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              {filteredApps.length === 0 && (
                <div className="w-full flex flex-col items-center justify-center p-20 text-soft-gray border border-white/5 bg-dark-black/40 backdrop-blur-md rounded-2xl">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                    <Clock className="w-8 h-8 text-soft-gray" />
                  </div>
                  <div className="text-sm font-bold uppercase tracking-widest">Καμία Διαθέσιμη Αίτηση</div>
                  <div className="text-xs mt-2 text-gray-500">Δεν βρέθηκαν εγγραφές για αυτή την κατηγορία.</div>
                </div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <button 
              onClick={() => {
                setSelectedApp(null);
                setActionSuccess(null);
              }}
              className="flex items-center gap-2 text-soft-gray hover:text-white uppercase text-xs font-bold tracking-widest mb-8 transition-colors bg-dark-black/50 px-4 py-2 rounded-full border border-white/10"
            >
              <ArrowLeft className="w-4 h-4" /> Επιστροφή στη Λίστα
            </button>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-dark-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-10 relative overflow-hidden shadow-2xl"
            >
              <div className={`absolute top-0 right-0 w-[500px] h-[500px] opacity-10 blur-[150px] pointer-events-none ${selectedApp.status === 'accepted' ? 'bg-green-500' : selectedApp.status === 'rejected' ? 'bg-red-500' : 'bg-light-cyan'}`} />

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-10 pb-8 border-b border-white/10 relative z-10">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 mb-4">
                    <div className="w-2 h-2 rounded-full bg-light-cyan" />
                    <span className="text-light-cyan uppercase text-xs font-bold tracking-widest">{selectedApp.jobTitle}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-display font-black text-white uppercase tracking-tight break-all">{selectedApp.discordTag}</h2>
                  <div className="text-xs text-soft-gray mt-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Υποβλήθηκε: {selectedApp.createdAt?.toDate ? selectedApp.createdAt.toDate().toLocaleString('el-GR') : 'Άγνωστο'}
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-xl border flex flex-col items-center justify-center min-w-[120px] ${selectedApp.status === 'accepted' ? 'bg-green-500/10 border-green-500/30 text-green-400' : selectedApp.status === 'rejected' ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-light-cyan/10 border-light-cyan/30 text-light-cyan'}`}>
                  <span className="text-[10px] uppercase tracking-widest opacity-80 mb-1">Status</span>
                  <span className="font-black uppercase text-sm">{selectedApp.status || 'pending'}</span>
                </div>
              </div>

              <div className="space-y-6 mb-12 relative z-10">
                <div className="grid grid-cols-1 gap-6">
                  {selectedApp.formData && Object.entries(selectedApp.formData).filter(([k]) => k !== 'discordTag').map(([key, value]: any) => (
                    <div key={key} className="bg-dark-black p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors text-left shadow-lg">
                      <div className="text-light-cyan/80 text-xs font-bold uppercase tracking-widest mb-3 pr-4 border-b border-white/5 pb-3">ΕΡΩΤΗΣΗ: {key}</div>
                      <div className="text-gray-200 text-sm whitespace-pre-wrap leading-relaxed">
                        {value ? value : <span className="text-gray-600 italic">Δεν δόθηκε απάντηση</span>}
                      </div>
                    </div>
                  ))}
                </div>

                {(selectedApp.status === 'accepted' || selectedApp.status === 'rejected') && (
                  <div className="mt-10 p-6 bg-dark-black/50 border border-white/10 rounded-xl">
                    <div className="flex items-center gap-2 mb-4 text-white text-xs font-bold uppercase tracking-widest"><UserCheck className="w-4 h-4 text-light-cyan"/> Στοιχεία Επεξεργασίας</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                      <div className="bg-white/5 p-4 rounded-lg">
                        <span className="text-soft-gray block mb-1 text-xs uppercase tracking-widest">Ελεγκτής</span>
                        <span className="font-bold text-white">{selectedApp.handledBy || '-'}</span>
                      </div>
                      <div className="bg-white/5 p-4 rounded-lg">
                        <span className="text-soft-gray block mb-1 text-xs uppercase tracking-widest">Ημερομηνία Ολοκλήρωσης</span>
                        <span className="font-bold text-white">{selectedApp.handledAt ? new Date(selectedApp.handledAt).toLocaleString('el-GR') : '-'}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {actionSuccess && (
                <div className="mb-8 p-4 bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-bold rounded-xl flex items-center gap-3 relative z-10 shadow-lg">
                  <div className="bg-green-500/20 p-2 rounded-full"><Check className="w-4 h-4" /></div>
                  {actionSuccess}
                </div>
              )}

              {(selectedApp.status === 'pending' || !selectedApp.status) && (
                <div className="relative z-10 border-t border-white/10 pt-8 mt-8">
                  <div className="mb-8 p-5 bg-light-cyan/5 border border-light-cyan/20 rounded-xl flex items-start gap-4">
                    <div className="bg-light-cyan/10 p-2 rounded-full mt-0.5"><Bell className="w-5 h-5 text-light-cyan" /></div>
                    <div>
                      <div className="text-white font-bold mb-1">Προσοχή: Ενέργεια Διαχειριστή</div>
                      <div className="text-sm text-soft-gray">
                        Είστε έτοιμος να επεξεργαστείτε αυτή την αίτηση. Θα ειδοποιηθεί ο χρήστης μέσω Discord webhook και η ενέργεια δεν μπορεί να αναιρεθεί από αυτό το πάνελ.
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={() => handleAction('accepted')}
                      disabled={loading}
                      className="flex-1 py-4 bg-green-500 text-dark-black font-black uppercase tracking-wider text-sm rounded-xl flex items-center justify-center gap-3 hover:bg-green-400 transition-colors shadow-[0_0_20px_rgba(34,197,94,0.3)] disabled:opacity-50"
                    >
                      <Check className="w-5 h-5" /> ΕΓΚΡΙΣΗ ΑΙΤΗΣΗΣ
                    </button>
                    <button 
                      onClick={() => handleAction('rejected')}
                      disabled={loading}
                      className="flex-1 py-4 bg-dark-black border border-red-500 text-red-500 font-black uppercase tracking-wider text-sm rounded-xl flex items-center justify-center gap-3 hover:bg-red-500 hover:text-white transition-colors disabled:opacity-50"
                    >
                      <X className="w-5 h-5" /> ΑΠΟΡΡΙΨΗ ΑΙΤΗΣΗΣ
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
}


