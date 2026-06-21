"use client";

import { useState } from "react";
import { auth } from "@/utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTranslation } from "react-i18next"; // import hook
import LanguageSwitcher from "@/components/LanguageSwitcher"; // import your component

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { t } = useTranslation(); // initialize translator

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#1a56db",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "24px 16px",
        fontFamily: "'Segoe UI', Arial, sans-serif",
      }}
    >
      {/* use the LanguageSwitcher component here */}
      <div style={{ alignSelf: "flex-end", marginBottom: "16px" }}>
        <LanguageSwitcher />
      </div>

      {/* logo */}
      <div style={{ marginBottom: "40px", marginTop: "8px" }}>
        <Image
          src="/logo.svg"
          alt="Builder Buddies Logo"
          width={200}
          height={200}
          priority
        />
      </div>

      {/* use the t() function for text */}
      <h1
        style={{
          color: "white",
          fontSize: "42px",
          fontWeight: 800,
          textAlign: "center",
          marginBottom: "32px",
          lineHeight: 1.15,
        }}
      >
        {t("welcome")}
      </h1>

      {/* Form */}
      <form
        onSubmit={handleLogin}
        style={{
          width: "100%",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {/* can add t('username') placeholders here later */}
        <input
          type="email"
          placeholder="Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "18px 20px",
            fontSize: "16px",
            fontWeight: 600,
            color: "white",
            backgroundColor: "transparent",
            border: "2px solid rgba(255,255,255,0.6)",
            borderRadius: "10px",
            outline: "none",
            boxSizing: "border-box",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "18px 20px",
            fontSize: "16px",
            fontWeight: 600,
            color: "white",
            backgroundColor: "transparent",
            border: "2px solid rgba(255,255,255,0.6)",
            borderRadius: "10px",
            outline: "none",
            boxSizing: "border-box",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "18px",
            fontSize: "18px",
            fontWeight: 700,
            color: "white",
            backgroundColor: "#F59E0B",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            marginTop: "4px",
          }}
        >
          Log In
        </button>
      </form>
      {/* footer links?? */}
    </div>
  );
}