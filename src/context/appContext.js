"use client";

import React, { useState, useEffect, useContext, createContext } from "react";
import { logout } from "../../lib/firebaseAuth";
import { useRouter, usePathname } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import LoginWithGoogle from "../components/auth/login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../lib/firebase";

const AppContext = createContext();

export function AppProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState();
  const [documents, setDocuments] = useState();
  const [isLoading, setIsLoading] = useState();

  const userLogout = () => {
    logout().then((r) => {
      setUser(null);
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        documents,
        setDocuments,
        isLoading,
        setIsLoading,
      }}
    >
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#f9f9f9",
          }}
        >
          <CircularProgress
            sx={{
              color: "#05C151",
            }}
          />
        </Box>
      ) : !user ? (
        <LoginWithGoogle />
      ) : (
        children
      )}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
