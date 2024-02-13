import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
export const useSignup = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const signupPost = async (email, password) => {
    setIsLoading(true);
    setError(null);
    console.log("eeeee");
    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));

      setIsLoading(false);
      dispatch({ type: "LOGIN", payload: json });
    }
  };
  return { signupPost, isLoading, error };
};
