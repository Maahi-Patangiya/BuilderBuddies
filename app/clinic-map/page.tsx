"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function PlaceholderPage() {
  const router = useRouter();

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
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button
            onClick={() => router.push("/dashboard")}
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "28px",
            }}
          >
            🏠
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Image
              src="/logo.png"
              alt="Builder Buddies"
              width={60}
              height={60}
              priority
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h1
                style={{
                  color: "white",
                  margin: 0,
                  fontSize: "22px",
                  fontWeight: 800,
                  lineHeight: 1,
                }}
              >
                Builder Buddies
              </h1>
              <p
                style={{
                  color: "rgba(255,255,255,0.8)",
                  margin: 0,
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                Clinic Map
              </p>
            </div>
          </div>
        </div>
        <LanguageSwitcher />
      </div>

      {/* Page content goes here */}
      <div
        style={{
          padding: "32px 24px",
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >

      </div>
    </div>
  );
}