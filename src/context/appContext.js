"use client";

import { Snackbar, Alert, Button } from "@mui/material";

import React, { useState, useEffect, useContext, createContext } from "react";
import { logout } from "../../lib/firebaseAuth";
import { useRouter, usePathname } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { getDocuments } from "../../service/e-paper-api";

import LoginWithGoogle from "../components/auth/login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../lib/firebase";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState();
  const [documents, setDocuments] = useState();
  const [isLoading, setIsLoading] = useState();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const userLogout = () => {
    logout().then((r) => {
      setUser(null);
    });
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar({ ...snackbar, open: false });
  };

  const loadDocuments = () => {
    setIsLoading(user);
    user &&
      user
        .getIdToken(false)
        .then((JWT) => {
          return getDocuments(JWT);
        })
        .then((res) => {
          setDocuments(res.data);
          setIsLoading(false);
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

  useEffect(() => {
    loadDocuments();
  }, [user]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        documents,
        setDocuments,
        isLoading,
        setIsLoading,
        showSnackbar,
        loadDocuments,
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
        <>
          <Snackbar
            open={snackbar.open}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <Alert
              onClose={handleClose}
              severity={snackbar.severity}
              sx={{ width: "100%" }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
          {children}
        </>
      )}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
