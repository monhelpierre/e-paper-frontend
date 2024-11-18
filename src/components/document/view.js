import React, { useState, useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { signInWithGoogle } from "../../../lib/firebaseAuth";

import { getUserData, addUserData } from "../../../service/e-paper-api";

export default function DocumentView() {
  const { user, setDocuments, setIsLoading } = useAppContext();

  useEffect(() => {}, [user]);

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

  return <></>;
}
