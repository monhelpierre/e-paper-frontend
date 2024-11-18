"use client";

import React, { useState, useEffect } from "react";
import {
  MainContainer,
  TopBar,
  PageContent,
  MenuBarContainer,
  EPaperBox,
  EPaperText,
  SolutionIcon,
  UserArea,
  UserInfo,
  UserName,
  OrganizationName,
  ChevronWrapper,
  NotificationArea,
} from "./styles";

import Navbar from "../../components/home/navbar";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, Avatar } from "@mui/material";
import LoginWithGoogle from "../../components/auth/login";
import { useUser } from "../../context/userContext";
import TelegramIcon from "@mui/icons-material/Telegram";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { getDocuments } from "../../service/a-paper-api";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Home() {
  const { user, setDocuments } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [navbarIsOpen, setNavbarIsOpen] = useState(true);
  const [currentmenu, setCurrentMenu] = useState("doclist");
  const toggleNavbar = () => {
    setNavbarIsOpen(!navbarIsOpen);
  };

  useEffect(() => {
    if (user) {
      user
        .getIdToken(false)
        .then((JWT: any) => {
          return getDocuments(JWT);
        })
        .then((res: any) => {
          setDocuments(res.data);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [user]);

  return (
    <>
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
        <MainContainer>
          <TopBar>
            <MenuBarContainer onClick={toggleNavbar}>
              <MenuIcon />
            </MenuBarContainer>
            <EPaperBox style={{ marginLeft: "80px" }}>
              <TelegramIcon style={{ color: "green", fontSize: "40px" }} />
              <EPaperText>e-paper</EPaperText>
            </EPaperBox>
            <SolutionIcon />
            <span
              style={{
                position: "absolute",
                marginTop: "27px",
                marginLeft: "10px",
              }}
            >
              Soluções
            </span>

            <NotificationArea>
              <NotificationsOutlinedIcon sx={{ fontSize: "24px" }} />
            </NotificationArea>

            <UserArea>
              <Avatar
                alt="User Profile"
                src={user ? user.photoURL : "/profile.png"}
              />

              <UserInfo>
                <UserName>{user.displayName.split(" ")[0]}</UserName>
                <OrganizationName>Organização</OrganizationName>
              </UserInfo>

              <ChevronWrapper>
                <IconButton>
                  <KeyboardArrowDownOutlinedIcon />
                </IconButton>
              </ChevronWrapper>
            </UserArea>
          </TopBar>

          <PageContent>
            <Navbar setCurrentMenu={setCurrentMenu} currentmenu={currentmenu} />
          </PageContent>
        </MainContainer>
      )}
    </>
  );
}
