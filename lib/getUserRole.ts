// lib/getUserRole.ts
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

export async function getUserRole(uid: string): Promise<string | null> {
  const userDoc = await getDoc(doc(db, "users", uid));
  if (userDoc.exists()) {
    return userDoc.data().role || null;
  }
  return null;
}
