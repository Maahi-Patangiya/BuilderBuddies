"use client";

import { useState } from "react";
import { auth } from "@/utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Account created!");
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  }

  return (
    <form onSubmit={handleRegister}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button type="submit">
        Create Account
      </button>
      <Link href="/login">Already have an account? Log in </Link>
    </form>
  );
}