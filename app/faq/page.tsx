"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";
import Image from "next/image";
import { styles } from "@/app/styles/sharedstyles";
import LanguageSwitcher from "@/components/LanguageSwitcher";


interface Question {
  id: string;
  question: string;
  submittedBy: string;
  submittedByEmail: string;
  status: "pending" | "answered";
  answer: string | null;
}

interface Faq {
  id: string;
  question: string;
  answer: string;
}

export default function FaqPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");

  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [pendingQuestions, setPendingQuestions] = useState<Question[]>([]);
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const [newQuestion, setNewQuestion] = useState("");
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [publishDrafts, setPublishDrafts] = useState<Record<string, boolean>>({});

  // Auth check + role lookup
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }
      setUserId(user.uid);
      setUserEmail(user.email || "");

      const userDoc = await getDoc(doc(db, "users", user.uid));
      const accountType = userDoc.data()?.accountType;
      setIsAdmin(accountType === "administrator");
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  // Live FAQ list
  useEffect(() => {
    const q = query(collection(db, "faqs"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setFaqs(
        snapshot.docs.map((d) => ({
          id: d.id,
          question: d.data().question,
          answer: d.data().answer,
        }))
      );
    });
    return () => unsubscribe();
  }, []);

  // Live pending questions (admin only)
  useEffect(() => {
    if (!isAdmin) return;
    const q = query(
      collection(db, "questions"),
      where("status", "==", "pending"),
      orderBy("createdAt", "asc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPendingQuestions(
        snapshot.docs.map((d) => ({
          id: d.id,
          question: d.data().question,
          submittedBy: d.data().submittedBy,
          submittedByEmail: d.data().submittedByEmail,
          status: d.data().status,
          answer: d.data().answer,
        }))
      );
    });
    return () => unsubscribe();
  }, [isAdmin]);

  async function handleSubmitQuestion() {
    if (!newQuestion.trim()) return;

    try {
      await addDoc(collection(db, "questions"), {
        question: newQuestion.trim(),
        submittedBy: userId,
        submittedByEmail: userEmail,
        status: "pending",
        answer: null,
        answeredAt: null,
        createdAt: serverTimestamp(),
      });
      setNewQuestion("");
      alert("Your question has been submitted!");
    } catch (error) {
      console.error(error);
      alert("Failed to submit question. Please try again.");
    }
  }

  async function handleSubmitAnswer(q: Question) {
    const answerText = replyDrafts[q.id]?.trim();
    if (!answerText) return;

    try {
      // 1. Update the question doc
      await updateDoc(doc(db, "questions", q.id), {
        answer: answerText,
        status: "answered",
        answeredAt: serverTimestamp(),
      });

      // 2. Optionally publish to FAQ
      if (publishDrafts[q.id]) {
        await addDoc(collection(db, "faqs"), {
          question: q.question,
          answer: answerText,
          createdAt: serverTimestamp(),
        });
      }

      // 3. Trigger email via the Firebase "Trigger Email" extension
      await addDoc(collection(db, "mail"), {
        to: q.submittedByEmail,
        message: {
          subject: "Your question has been answered — Builder Buddies",
          text: `Your question: "${q.question}"\n\nAnswer: ${answerText}`,
          html: `<p><strong>Your question:</strong> ${q.question}</p><p><strong>Answer:</strong> ${answerText}</p>`,
        },
      });

      // Clear drafts for this question
      setReplyDrafts((prev) => {
        const updated = { ...prev };
        delete updated[q.id];
        return updated;
      });
      setPublishDrafts((prev) => {
        const updated = { ...prev };
        delete updated[q.id];
        return updated;
      });
    } catch (error) {
      console.error(error);
      alert("Failed to submit answer. Please try again.");
    }
  }

  async function handleDeleteQuestion(questionId: string) {
    if (!confirm("Delete this question?")) return;
    try {
      await deleteDoc(doc(db, "questions", questionId));
    } catch (error) {
      console.error(error);
      alert("Failed to delete question.");
    }
  }

  if (loading) {
    return <div style={{ minHeight: "100vh", backgroundColor: "var(--color-primary)" }} />;
  }

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <button style={styles.homeButton} onClick={() => router.push("/dashboard")}>
            🏠
          </button>
          <div style={styles.logoGroup}>
            <Image src="/logo.svg" alt="Builder Buddies" width={60} height={60} priority />
            <div style={styles.titleColumn}>
              <h1 style={styles.titleLine}>Builder Buddies</h1>
              <p style={styles.pageLabel}>FAQ</p>
            </div>
          </div>
        </div>
        <LanguageSwitcher />
      </div>

      <div style={{ padding: "32px 24px", maxWidth: "700px", margin: "0 auto" }}>
        {/* Admin: Unanswered Questions */}
        {isAdmin && (
          <div
            style={{
              backgroundColor: "#EFEFEF",
              borderRadius: "20px",
              padding: "32px",
              marginBottom: "24px",
            }}
          >
            <h2 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "20px", color: "#1a1a1a" }}>
              Unanswered Questions ({pendingQuestions.length})
            </h2>

            {pendingQuestions.length === 0 && (
              <p style={{ color: "#666" }}>No pending questions right now.</p>
            )}

            {pendingQuestions.map((q) => (
              <div key={q.id} style={{ marginBottom: "20px" }}>
                <div
                  style={{
                    backgroundColor: "white",
                    borderRadius: "16px",
                    padding: "18px 24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                    marginBottom: "8px",
                  }}
                >
                  <span style={{ fontSize: "15px", color: "#1a1a1a" }}>
                    Question: {q.question}
                  </span>
                  <button
                    onClick={() => handleDeleteQuestion(q.id)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "20px",
                    }}
                    aria-label="Delete question"
                  >
                    🗑️
                  </button>
                </div>

                <div
                  style={{
                    backgroundColor: "white",
                    borderRadius: "16px",
                    padding: "16px 20px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                  }}
                >
                  <textarea
                    placeholder="Reply..."
                    value={replyDrafts[q.id] || ""}
                    onChange={(e) =>
                      setReplyDrafts((prev) => ({ ...prev, [q.id]: e.target.value }))
                    }
                    rows={3}
                    style={{
                      width: "100%",
                      border: "none",
                      outline: "none",
                      fontSize: "15px",
                      resize: "vertical",
                      fontFamily: "inherit",
                      boxSizing: "border-box",
                      marginBottom: "12px",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "14px",
                        color: "var(--color-primary)",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={publishDrafts[q.id] || false}
                        onChange={(e) =>
                          setPublishDrafts((prev) => ({ ...prev, [q.id]: e.target.checked }))
                        }
                      />
                      Publish to FAQ
                    </label>

                    <button
                      onClick={() => handleSubmitAnswer(q)}
                      style={{
                        backgroundColor: "var(--color-primary)",
                        color: "white",
                        border: "none",
                        borderRadius: "10px",
                        padding: "10px 24px",
                        fontWeight: 700,
                        fontSize: "14px",
                        cursor: "pointer",
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* FAQ List */}
        <div
          style={{
            backgroundColor: "#EFEFEF",
            borderRadius: "20px",
            padding: "32px",
            marginBottom: "24px",
          }}
        >
          <h2 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "20px", color: "#1a1a1a" }}>
            Frequently Asked
            <br />
            Questions
          </h2>

          {faqs.length === 0 && <p style={{ color: "#666" }}>No FAQs published yet.</p>}

          {faqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div key={faq.id} style={{ marginBottom: "12px" }}>
                <button
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  style={{
                    width: "100%",
                    backgroundColor: "white",
                    border: "none",
                    borderRadius: isOpen ? "16px 16px 0 0" : "16px",
                    padding: "18px 24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                    fontSize: "15px",
                    color: "#1a1a1a",
                    textAlign: "left",
                  }}
                >
                  Question: {faq.question}
                  <span style={{ transform: isOpen ? "rotate(180deg)" : "none" }}>⌄</span>
                </button>

                {isOpen && (
                  <div
                    style={{
                      backgroundColor: "#DCE9FB",
                      borderRadius: "0 0 16px 16px",
                      padding: "18px 24px",
                      fontSize: "15px",
                      color: "#1a1a1a",
                      lineHeight: 1.6,
                    }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit new question */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "20px 24px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            marginBottom: "16px",
          }}
        >
          <textarea
            placeholder="Need help with a question that hasn't been answered yet? Type out your question or situation details thoroughly here..."
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            rows={4}
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              fontSize: "15px",
              resize: "vertical",
              fontFamily: "inherit",
              boxSizing: "border-box",
              color: "#1a1a1a",
            }}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={handleSubmitQuestion}
            style={{
              backgroundColor: "var(--color-primary)",
              color: "white",
              border: "none",
              borderRadius: "10px",
              padding: "14px 32px",
              fontWeight: 700,
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Submit Question
          </button>
        </div>
      </div>
    </div>
  );
}