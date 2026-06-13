"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/utils/firebase";
import { onAuthStateChanged, User, signOut} from "firebase/auth";
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  onSnapshot 
} from 'firebase/firestore';


export default function Dashboard() {
    const [user, setUser] = useState<User | null>(null);  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [authError, setAuthError] = useState('');

    const [portalMode, setPortalMode] = useState('worker')
    const [newQuestion, setNewQuestion] = useState('');
    const [submittedQuestions, setSubmittedQuestions] = useState<any[]>([]);
    const [faqs, setFaqs] = useState<any[]>([]);

    const handleLogout = () => signOut(auth);

  
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setAuthError('');
        });
        return () => unsubscribe();
        }, []);

    
    useEffect(() => {
        if (!user) return;
        const q = query(collection(db, "queries"), orderBy("timestamp", "desc")); //
        const unsubscribe = onSnapshot(q, (snapshot) => {
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSubmittedQuestions(items);
        });
        return () => unsubscribe();
    }, [user]);

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
    
    const submitWorkerQuery = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newQuestion.trim()) return;
        
        if (!user) {
        alert("Authentication error: Session not detected.");
        return;
        }

        try { // Firestore submission with user context and timestamp EDIT
            await addDoc(collection(db, "queries"), {
                userEmail: user.email || "anonymous@worker.org",
                text: newQuestion,
                timestamp: String(new Date().toISOString()),
                status: "Pending"
            });
            setNewQuestion('');
            alert("Your message has been submitted and is awaiting a response!");
        } catch (err: any) {
            console.error("Firestore submission anomaly: ", err);
        }
    };

    if (!user) {
        return <p>Please log in.</p>;
    };

    return (
    <div style={{ fontFamily: 'system-ui', maxWidth: '1200px', margin: '0 auto', padding: '30px' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #f1f5f9', paddingBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <img src="/logo.svg" alt="Builder Buddies Logo" style={{ width: '70px', height: '70px' }} />
            <div>
                <h1 style={{ margin: 0, color: '#1e3a8a', fontSize: '28px' }}>👷 Builder Buddies Homepage</h1>
                <span style={{ color: '#64748b', fontSize: '14px' }}>Session Node: <strong style={{ color: '#334155' }}>{user.email}</strong></span>
            </div>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={handleLogout} style={{ padding: '10px 14px', background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}>Log Out</button>
            </div>
        </header>

        {portalMode === 'worker' ? (
            <main style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginTop: '35px' }}>
            {/* Ask Question Interface Column */}
            <section style={{ background: '#f8fafc', padding: '30px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h2 style={{ marginTop: 0, color: '#1e293b' }}>📋 Ask a Question</h2>
                <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>Need assistance with salaries, housing conditions, or injury reports? File a question directly to the queue below.</p>
                <form onSubmit={submitWorkerQuery} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <textarea value={newQuestion} onChange={e => setNewQuestion(e.target.value)} placeholder="Type out your question or situation details thoroughly..." rows={5} required style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '15px', fontFamily: 'inherit' }} />
                <button type="submit" style={{ padding: '14px', background: '#004ec4', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '15px' }}>Submit Question</button>
                </form>
            </section>

            {/* Database FAQ Reference Column */}
            <section>
                <h2 style={{ marginTop: 0, color: '#1e293b' }}>📚 Frequently Asked Questions</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
                {faqs.map((faq: any) => (
                    <div key={faq.id || faq.q} style={{ border: '1px solid #e2e8f0', padding: '20px', borderRadius: '12px', background: '#ffffff', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
                    <h4 style={{ margin: '0 0 8px 0', color: '#1e3a8a', fontSize: '16px' }}>❓ 
                        {faq.q}
                    </h4>
                    <p style={{ margin: 0, color: '#475569', fontSize: '14px', lineHeight: '1.5' }}>💡 {faq.a}</p>
                    </div>
                ))}
                </div>
            </section>
            </main>
        ) : (
            <main style={{ marginTop: '35px' }}>
            {/* Administrator Monitoring Console */}
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