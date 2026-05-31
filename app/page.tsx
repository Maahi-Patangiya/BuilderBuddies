"use client"; // Forces Next.js to render this page directly inside the browser for Firebase Auth

import React, { useState, useEffect } from 'react';
import { auth, db } from './utils/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  onSnapshot 
} from 'firebase/firestore';

export default function Home() {
  // Authentication States
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [authError, setAuthError] = useState('');

  // Application Feature Functional States
  const [portalMode, setPortalMode] = useState('worker'); // Switching between 'worker' and 'expert' views
  const [newQuestion, setNewQuestion] = useState('');
  const [submittedQuestions, setSubmittedQuestions] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);

  // Stream listener monitoring authentication profile updates
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthError('');
    });
    return () => unsubscribe();
  }, []);

  // Real-time listener streaming worker queries live out of Firestore
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "queries"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSubmittedQuestions(items);
    });
    return () => unsubscribe();
  }, [user]);

  // Pull static baseline seed values from the FAQ collection block
  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "faqs"));
        if (querySnapshot.empty) {
          // Hardcoded layout baseline placeholders with strict string IDs
          setFaqs([
            { id: "1", q: "What should I do if I get injured at the worksite?", a: "Inform your supervisor immediately and seek medical attention. Your employer is legally required to report the accident to MOM within 10 days." },
            { id: "2", q: "Can my employer cancel my Work Permit unfairly?", a: "Employers can cancel permits, but if you have an active salary or injury claim, MOM will issue a Special Pass keeping you secure in Singapore." }
          ]);
        } else {
          setFaqs(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        }
      } catch (error) {
        console.log("FAQ loading bypass active", error);
      }
    };
    fetchFAQs();
  }, [user]);

  // Handlers managing Login / Registration logic forms
  const handleAuthAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      setAuthError(err.message.replace("Firebase: ", ""));
    }
  };

  const handleLogout = () => signOut(auth);

  // Push new helper tickets up into the database cluster
  const submitWorkerQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    
    if (!user) {
      alert("Authentication error: Session not detected.");
      return;
    }

    try {
      await addDoc(collection(db, "queries"), {
        userEmail: user.email || "anonymous@worker.org",
        text: newQuestion,
        timestamp: String(new Date().toISOString()),
        status: "Pending Expert Review"
      });
      setNewQuestion('');
      alert("Your message has been securely piped straight into our support database!");
    } catch (err: any) {
      console.error("Firestore submission anomaly: ", err);
    }
  };

  // Auth Guard Screen View
  if (!user) {
    return (
      <div style={{ maxWidth: '420px', margin: '120px auto', padding: '30px', border: '1px solid #e2e8f0', borderRadius: '16px', fontFamily: 'system-ui', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
        <h2 style={{ textAlign: 'center', color: '#1e3a8a', marginBottom: '5px' }}>👷 Builder Buddies</h2>
        <p style={{ textAlign: 'center', color: '#64748b', marginTop: 0, fontSize: '14px' }}>Milestone 1 Core Gatekeeper PoC</p>
        
        <form onSubmit={handleAuthAction} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '25px' }}>
          <div>
            <label style={{ fontSize: '14px', fontWeight: '500', color: '#334155' }}>Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
          </div>
          <div>
            <label style={{ fontSize: '14px', fontWeight: '500', color: '#334155' }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
          </div>
          {authError && <p style={{ color: '#ef4444', fontSize: '13px', margin: 0 }}>{authError}</p>}
          <button type="submit" style={{ padding: '12px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', marginTop: '10px' }}>
            {isRegistering ? "Create System Account" : "Access Secure Core"}
          </button>
        </form>
        <button onClick={() => setIsRegistering(!isRegistering)} style={{ width: '100%', background: 'none', border: 'none', color: '#2563eb', marginTop: '20px', cursor: 'pointer', textDecoration: 'underline', fontSize: '14px' }}>
          {isRegistering ? "Already registered? Sign In instead" : "New to the system? Spin up an Account"}
        </button>
      </div>
    );
  }

  // Active Authenticated Application UI Canvas View
  return (
    <div style={{ fontFamily: 'system-ui', maxWidth: '1200px', margin: '0 auto', padding: '30px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #f1f5f9', paddingBottom: '20px' }}>
        <div>
          <h1 style={{ margin: 0, color: '#1e3a8a', fontSize: '28px' }}>👷 Builder Buddies Engine</h1>
          <span style={{ color: '#64748b', fontSize: '14px' }}>Session Node: <strong style={{ color: '#334155' }}>{user.email}</strong></span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => setPortalMode('worker')} style={{ padding: '10px 18px', background: portalMode === 'worker' ? '#2563eb' : '#f1f5f9', color: portalMode === 'worker' ? 'white' : '#334155', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', transition: 'all 0.2s' }}>Migrant Worker Panel</button>
          <button onClick={() => setPortalMode('expert')} style={{ padding: '10px 18px', background: portalMode === 'expert' ? '#10b981' : '#f1f5f9', color: portalMode === 'expert' ? 'white' : '#334155', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', transition: 'all 0.2s' }}>Administrator Portal</button>
          <button onClick={handleLogout} style={{ padding: '10px 14px', background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}>Log Out</button>
        </div>
      </header>

      {portalMode === 'worker' ? (
        <main style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginTop: '35px' }}>
          {/* Ask Question Interface Column */}
          <section style={{ background: '#f8fafc', padding: '30px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <h2 style={{ marginTop: 0, color: '#1e293b' }}>📋 Ask a Support Ticket Question</h2>
            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>Need assistance with salaries, housing conditions, or injury reports? File a question directly to live queues below.</p>
            <form onSubmit={submitWorkerQuery} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <textarea value={newQuestion} onChange={e => setNewQuestion(e.target.value)} placeholder="Type out your question or situation details thoroughly..." rows={5} required style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '15px', fontFamily: 'inherit' }} />
              <button type="submit" style={{ padding: '14px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '15px' }}>Submit Question</button>
            </form>
          </section>

          {/* Database FAQ Reference Column */}
          <section>
            <h2 style={{ marginTop: 0, color: '#1e293b' }}>📚 Frequently Asked Questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
              {faqs.map((faq: any) => (
                <div key={faq.id || faq.q} style={{ border: '1px solid #e2e8f0', padding: '20px', borderRadius: '12px', background: '#ffffff', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
                  <h4 style={{ margin: '0 0 8px 0', color: '#1e3a8a', fontSize: '16px' }}>❓ {faq.q}</h4>
                  <p style={{ margin: 0, color: '#475569', fontSize: '14px', lineHeight: '1.5' }}>💡 {faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      ) : (
        <main style={{ marginTop: '35px' }}>
          {/* Expert Realtime Monitoring Triage Console */}
          <div style={{ background: '#f0fdf4', padding: '25px', borderRadius: '16px', border: '1px solid #bbf7d0', marginBottom: '30px' }}>
            <h2 style={{ marginTop: 0, color: '#166534' }}>🛠️ Live NGO Helpdesk</h2>
            <p style={{ margin: 0, color: '#14532d', fontSize: '15px' }}>This feed updates automatically whenever a user enters a support query.</p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <h3 style={{ color: '#1e293b', margin: '0 0 5px 0' }}>Unanswered Questions ({submittedQuestions.length})</h3>
            {submittedQuestions.length === 0 ? (
              <p style={{ color: '#94a3b8', fontStyle: 'italic', padding: '20px', textAlign: 'center', background: '#f8fafc', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>No active incoming questions recorded inside Firestore data buckets yet.</p>
            ) : (
              submittedQuestions.map((item: any) => (
                <div key={item.id || item.text} style={{ border: '1px solid #e2e8f0', padding: '20px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)' }}>
                  <div>
                    <p style={{ margin: '0 0 6px 0', fontSize: '16px', fontWeight: '600', color: '#1e293b' }}>"{item.text}"</p>
                    <small style={{ color: '#64748b', fontSize: '13px' }}>User Context: <strong>{item.userEmail}</strong> | Logged Timestamp: {item.timestamp}</small>
                  </div>
                  <span style={{ padding: '6px 14px', background: '#fef3c7', color: '#d97706', borderRadius: '9999px', fontSize: '12px', fontWeight: '700', letterSpacing: '0.05em' }}>{item.status}</span>
                </div>
              ))
            )}
          </div>
        </main>
      )}
    </div>
  );
}
