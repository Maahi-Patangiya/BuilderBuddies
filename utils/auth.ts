import { NextRequest } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { db } from "@/utils/firebaseAdmin";

export interface CurrentUser {
  uid: string;
  email: string;
  role: string;
}

export async function getCurrentUser(req: NextRequest): Promise<CurrentUser | null> {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;

  const idToken = authHeader.slice("Bearer ".length);

  try {
    const decoded = await getAuth().verifyIdToken(idToken);
    if (!decoded.email) return null;

    const userDoc = await db.collection("users").doc(decoded.uid).get();
    const role = userDoc.exists ? userDoc.data()?.role || "user" : "user";

    return { uid: decoded.uid, email: decoded.email, role };
  } catch (err) {
    console.error("Failed to verify Firebase ID token:", err);
    return null;
  }
}
