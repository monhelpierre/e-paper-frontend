"use client";

import Box from "@mui/material/Box";
import { Snackbar, Alert, Backdrop } from "@mui/material";
import { getDocuments } from "../../service/e-paper-api";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useState, useEffect, useContext, createContext } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [documents, setDocuments] = useState();
  const [isLoading, setIsLoading] = useState();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar({ ...snackbar, open: false });
  };

  const loadDocuments = () => {
    setIsLoading(documents);
    getDocuments().then((res) => {
      setDocuments(res.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  return (
    <AppContext.Provider
      value={{
        documents,
        setDocuments,
        isLoading,
        setIsLoading,
        showSnackbar,
        loadDocuments,
      }}
    >
      {!documents || isLoading ? (
        <Box>
          <Backdrop
            sx={{
              color: "#05C151",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={open}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Box>
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
