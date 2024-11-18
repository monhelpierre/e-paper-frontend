import styled from "styled-components";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

export const MainContainer = styled.div`
  background-color: #ffffe;
  font-family: "Roboto", sans-serif;
  color: #3a424e;
  overflow: hidden;
`;

export const PageContent = styled.div`
  display: flex;
`;

export const TopBar = styled.div`
  height: 72px;
  margin-right: 15px;
  border-bottom: 1px solid #2222;
`;

export const MenuBarContainer = styled.div`
  position: absolute;
  margin-top: 23px;
  min-width: 64px;
  max-width: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

export const EPaperBox = styled.div`
  position: absolute;
  min-width: 64px;
  max-width: 150px;
  display: flex;
  margin-top: 14px;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  border-right: 1px solid #2222;
`;

export const EPaperText = styled.span`
  font-size: 19px;
  font-weight: bold;
  margin-right: 33px;
`;

export const SolutionIcon = styled(GridViewOutlinedIcon)`
  margin-top: 23px;
  margin-left: 270px;
`;

export const NavBar = styled.div`
  min-width: 64px;
  max-width: 64px;
  display: flex;
  border-right: 1px solid #2222;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

export const ListContent = styled.section`
  padding: 50px;
  border: 1px solid #2222;
  border-bottom: 1px solid #fff;
`;

export const HLine = styled.hr`
  border: 1px solid #2222;
  width: 100vw;
  color: #2222;
  margin-top: 40px;
  margin-bottom: 40px;
`;

export const PageTitle = styled.hr`
  width: 100vw;
`;

export const OGText = styled.div`
  border-radius: 50%;
  border: 1px solid #2222;
  width: 32px;
  height: 30px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0fff0;
`;

export const NotificationArea = styled.div`
  position: absolute;
  top: 40px;
  height: 48px;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 290px;
  justify-content: center;
`;

export const UserArea = styled.div`
  position: absolute;
  top: 40px;
  min-width: 200px;
  height: 48px;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 10px;
  justify-content: center;
  border: 1px solid #2222;
  padding: 5px;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 10px;
`;

export const UserName = styled.span`
  font-weight: bold;
  font-size: 16px;
  margin-left: 6px;
`;

export const OrganizationName = styled.span`
  font-size: 14px;
  color: gray;
  margin-left: 6px;
`;

export const ChevronWrapper = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

export const GridViewMenu = styled(GridViewOutlinedIcon)`
  font-size: 30;
  margin-bottom: 40px;
  cursor: pointer;
  background-color: ${(props) =>
    props.currentmenu === "grid" ? "#caffd6" : "#fff"};
  padding: ${(props) => (props.currentmenu === "grid" ? "5px 5px" : "")};

  &:hover {
    background-color: #caffd6;
    padding: 5px 5px;
  }
`;

export const DocumentMenu = styled(DescriptionOutlinedIcon)`
  font-size: 20;
  margin-bottom: 40px;
  cursor: pointer;
  background-color: ${(props) =>
    props.currentmenu === "document" ? "#caffd6" : "#fff"};
  padding: ${(props) => (props.currentmenu === "document" ? "5px 5px" : "")};

  &:hover {
    background-color: #caffd6;
    padding: 5px 5px;
  }
`;

export const TextFieldsMenu = styled(TextFieldsIcon)`
  font-size: 20;
  margin-bottom: 40px;
  cursor: pointer;
  background-color: ${(props) =>
    props.currentmenu === "text" ? "#caffd6" : "#fff"};
  padding: ${(props) => (props.currentmenu === "text" ? "5px 5px" : "")};
  &:hover {
    background-color: #caffd6;
    padding: 5px 5px;
  }
`;

export const FormatListMenu = styled(FormatListBulletedIcon)`
  font-size: 10;
  margin-bottom: 40px;
  cursor: pointer;
  background-color: ${(props) =>
    props.currentmenu === "format" ? "#caffd6" : "#fff"};
  padding: ${(props) => (props.currentmenu === "format" ? "5px 5px" : "")};
  &:hover {
    background-color: #caffd6;
    padding: 5px 5px;
  }
`;
