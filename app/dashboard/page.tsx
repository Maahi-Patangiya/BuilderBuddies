"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/utils/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import Link from "next/link";
import Image from "next/image";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push("/login");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  async function handleLogout() {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  if (loading) {
    return <div style={{ minHeight: "100vh", backgroundColor: "#1A56DB" }} />;
  }

  const navItems = [
    { label: "Find my closest clinic", icon: "📍", href: "/clinic-map" },
    { label: "Resources", icon: "ℹ️", href: "/resource" },
    { label: "Frequently Asked Questions", icon: "❓", href: "/faq" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F5F5F5",
        fontFamily: "'Segoe UI', Arial, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: "#1A56DB",
          padding: "16px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        {/* Left: home + logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Link href="/dashboard">
            <button
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: "28px",
              }}
            >
              🏠
            </button>
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Image src="/logo.svg" alt="Builder Buddies" width={60} height={60} priority />
            <div>
              <h1 style={{ color: "white", margin: 0, fontSize: "22px", fontWeight: 800, lineHeight: 1 }}>
                Builder Buddies
              </h1>
              <p style={{ color: "rgba(255,255,255,0.8)", margin: 0, fontSize: "13px", fontWeight: 600 }}>
                Dashboard
              </p>
            </div>
          </div>
        </div>

        {/* Right: language + logout */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "transparent",
              border: "2px solid white",
              borderRadius: "8px",
              color: "white",
              padding: "8px 14px",
              fontWeight: 600,
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            🌐 English ✓
          </button>

          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#F59E0B",
              border: "none",
              borderRadius: "8px",
              color: "white",
              padding: "8px 16px",
              fontWeight: 600,
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div
        style={{
          padding: "40px 5%",
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <p style={{ color: "#666", fontSize: "16px", marginBottom: "32px", fontWeight: 500 }}>
          Welcome, {user?.email}
        </p>

        {/* Responsive card grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "24px",
          }}
        >
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} style={{ textDecoration: "none" }}>
              <button
                style={{
                  width: "100%",
                  padding: "32px 24px",
                  backgroundColor: "white",
                  border: "none",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  transition: "all 0.2s ease",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#1a1a1a",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(26,86,219,0.15)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.borderLeft = "4px solid #1A56DB";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderLeft = "none";
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    backgroundColor: "#EEF2FF",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "28px",
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                {item.label}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}