"use client";
//@typescript-eslint/ban-ts-comment

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
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, Avatar } from "@mui/material";
import DocumentList from "../components/document/list";
import TelegramIcon from "@mui/icons-material/Telegram";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { useAppContext } from "@/context/appContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [currentmenu, setCurrentMenu] = useState<string>("document");
  const { showSnackbar } = useAppContext();
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

        <EPaperBox
          style={{ marginLeft: "80px" }}
          onClick={() => router.push("/")}
        >
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
          <NotificationsOutlinedIcon
            onClick={() => {
              showSnackbar("Nenhuma noticação...", "info");
            }}
            sx={{ fontSize: "24px" }}
            style={{ cursor: "pointer" }}
          />
        </NotificationArea>

        <UserArea>
          <Avatar alt="User Profile" src={"/profile.png"} />

          <UserInfo>
            <UserName>Nome do usuario</UserName>
            <OrganizationName>Organização</OrganizationName>
          </UserInfo>

          <ChevronWrapper
            onClick={() => {
              showSnackbar("Coming soon...", "info");
            }}
          >
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
