"use client";

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
  NavBar,
  OGText,
  GridViewMenu,
  DocumentMenu,
  TextFieldsMenu,
  FormatListMenu,
} from "./styles";

import React, { useState, useEffect } from "react";
import { IconButton, Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppContext } from "../context/appContext";
import TelegramIcon from "@mui/icons-material/Telegram";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import DocumentList from "../components/document/list";

export default function Home() {
  const { user, setDocuments, isLoading, setIsLoading, loadDocuments } =
    useAppContext();
  const [currentmenu, setCurrentMenu] = useState("document");
  const [navbarIsOpen, setNavbarIsOpen] = useState(true);

  const toggleNavbar = () => {
    setNavbarIsOpen(!navbarIsOpen);
  };

  return (
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
        <NavBar style={{ display: navbarIsOpen ? "flex" : "none" }}>
          <OGText>OG</OGText>
          <GridViewMenu
            currentmenu={currentmenu}
            onClick={() => setCurrentMenu("grid")}
          ></GridViewMenu>
          <DocumentMenu
            currentmenu={currentmenu}
            onClick={() => setCurrentMenu("document")}
          ></DocumentMenu>
          <TextFieldsMenu
            currentmenu={currentmenu}
            onClick={() => setCurrentMenu("text")}
          ></TextFieldsMenu>
          <FormatListMenu
            currentmenu={currentmenu}
            onClick={() => setCurrentMenu("format")}
          ></FormatListMenu>
        </NavBar>

        {currentmenu === "document" && <DocumentList />}
      </PageContent>
    </MainContainer>
  );
}
