import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true); // Optional loading state

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false); // Stop loading once the auth state is set
      console.log(user);
    });

    return () => {
      unsub();
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or a loading screen
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
