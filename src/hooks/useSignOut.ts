import { useState } from "react";
import { signOut as _signOut } from "firebase/auth";
import { auth } from "@/firebase";

export function useSignOut() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  const signOut = async () => {
    setLoading(true);
    return await _signOut(auth)
      .then(() => {})
      .catch((e) => {
        setError(e instanceof Error ? e : Error("unecpected error!"));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    signOut,
    loading,
    error,
  };
}
