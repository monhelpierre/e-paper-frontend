import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, Button } from "@mui/material";

import { EPaperBox, EPaperText } from "./styles";

import { useAppContext } from "../../context/appContext";
import GoogleIcon from "@mui/icons-material/Google";
import TelegramIcon from "@mui/icons-material/Telegram";
import { signInWithGoogle } from "../../../lib/firebaseAuth";

import { getUserData, addUserData } from "../../../service/e-paper-api";

export default function LoginWithGoogle() {
  const { user, setUser, setDocuments, setIsLoading } = useAppContext();

  useEffect(() => {}, [user]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleConnectGoogle = () => {
    signInWithGoogle().then((authUser) => {
      if (authUser) {
        authUser
          .getIdToken(false)
          .then((JWT) => {
            return getUserData(JWT, authUser);
          })
          .then((response) => {
            if ("error" in response) {
              authUser
                .getIdToken(false)
                .then((JWT) => {
                  return addUserData(JWT, authUser);
                })
                .then((response) => {
                  setUser(authUser);
                });
            } else {
              setUser(authUser);
            }
          });
      }
    });
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogContent
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <EPaperBox>
          <TelegramIcon
            style={{ color: "green", fontSize: "40px", marginTop: "-9px" }}
          />
          <EPaperText>e-paper</EPaperText>
        </EPaperBox>

        <Button
          variant="contained"
          startIcon={<GoogleIcon />}
          onClick={handleConnectGoogle}
          fullWidth
          style={{ backgroundColor: "green" }}
        >
          Conexão com Google
        </Button>
      </DialogContent>
    </Dialog>
  );
}
