"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

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
              src="/logo.svg"
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
                Builder
              </h1>
              <h1
                style={{
                  color: "white",
                  margin: 0,
                  fontSize: "22px",
                  fontWeight: 800,
                  lineHeight: 1,
                }}
              >
                Buddies
              </h1>
              <p
                style={{
                  color: "rgba(255,255,255,0.8)",
                  margin: 0,
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                {/* Change this to match the page: "Clinic Map" | "Resources" | "FAQ" */}
                FAQ
              </p>
            </div>
          </div>
        </div>

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