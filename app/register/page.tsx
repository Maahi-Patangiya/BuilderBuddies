"use client";

import { useState, useEffect } from "react";
import { db, auth } from "@/utils/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, getDocs, doc, setDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";

export function useUserData() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Wait for auth to resolve first
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const ref = doc(db, "users", user.uid);
        const unsubscribeSnapshot = onSnapshot(ref, (snap) => {
          setUserData(snap.data() || null);
        });
        return unsubscribeSnapshot; // cleans up snapshot listener on auth change
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  return userData;
}

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save extra user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        accountType: accountType,   // "administrator" or "user"
        createdAt: new Date(),
      });

      alert("Account created!");
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created!");
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#1A56DB",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "24px 16px",
        fontFamily: "'Segoe UI', Arial, sans-serif",
      }}
    >
      {/* Language selector */}
      {/* <div style={{ alignSelf: "flex-end", marginBottom: "16px" }}>
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
            fontSize: "15px",
            cursor: "pointer",
          }}
        >
          🌐 English ✓
        </button>
      </div> */}

      {/* Logo */}
      <div style={{ marginBottom: "40px", marginTop: "8px" }}>
        <Image
          src="/logo.svg"
          alt="Builder Buddies Logo"
          width={200}
          height={200}
          priority
        />
      </div>

      {/* Heading */}
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
        Create Your Account
      </h1>

      {/* Form */}
      <form
        onSubmit={handleRegister}
        style={{
          width: "100%",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
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

        {/* Account type dropdown */}
        <select
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
          style={{
            width: "100%",
            padding: "18px 20px",
            fontSize: "16px",
            fontWeight: 600,
            color: accountType ? "white" : "rgba(255,255,255,0.7)",
            backgroundColor: "transparent",
            border: "2px solid rgba(255,255,255,0.6)",
            borderRadius: "10px",
            outline: "none",
            boxSizing: "border-box",
            appearance: "none",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpolyline points='8 12 12 16 16 12'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 16px center",
            backgroundSize: "22px",
            cursor: "pointer",
          }}
        >
          <option value="" disabled style={{ color: "#333", backgroundColor: "white" }}>
            Account type
          </option>
          <option value="administrator" style={{ color: "#1A56DB", backgroundColor: "white", fontWeight: 600 }}>
            Administrator
          </option>
          <option value="user" style={{ color: "#1A56DB", backgroundColor: "white", fontWeight: 600 }}>
            User
          </option>
        </select>

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
          Register
        </button>
      </form>

      {/* Footer link */}
      <div
        style={{
          marginTop: "28px",
          textAlign: "center",
          color: "white",
          fontSize: "15px",
          fontWeight: 600,
        }}
      >
        Already have an account?{" "}
        <Link
          href="/login"
          style={{
            color: "white",
            textDecoration: "underline",
            fontWeight: 700,
          }}
        >
          Log in
        </Link>
      </div>
    </div>
  );
}