import styled from "styled-components";
import { Button } from "@mui/material";

export const ListContainer = styled.div`
  margin: 50px;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #fff;
`;

export const TopContent = styled.div`
  height: auto;
`;

export const PageTitle = styled.div`
  font-size: 24px;
  color: #3a424e;
  font-weight: bold;
`;

export const PageSubTitle = styled.div`
  width: 100vw;
  z-index: 1;
  font-size: 14px;
  color: #6b7280;
  font-weight: normal;
  margin-top: 15px;
`;

export const LineUnder = styled.hr`
  width: 100vw;
  margin-top: 30px;
  border: 1px solid #2222;
`;

export const SearchAndFilterArea = styled.div`
  margin-top: -60px;
  position: absolute;
  height: 48px;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 5px;
  margin-right: 30px;
`;

export const FilterIconAndText = styled.div`
  margin-top: 58px;
  height: 43px;
  transform: translateY(-50%);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 5px;
  margin-left: 8px;
  border: 1px solid #2222;
`;

export const ElementOverTable = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TypeAndOrginField = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const FieldAndLabel = styled.div`
  width: 400px;
`;

export const LabelStyle = styled.span`
  color: #3a424e;
  font-weight: bold;
  font-size: 14px;
`;

export const SaveButton = styled(Button)`
  position: absolute;
  right: 0;
  margin-right: 30px;
  text-transform: none;
  background-color: #05c151;
  color: #ffffff;
`;

export const TableArea = styled.div`
  margin-top: 30px;
  margin-right: 160px;
`;

export const TableRowLabel = styled.div`
  font-size: 14px;
  color: #6b7280;
`;

export const TableFooterTitle = styled.div`
  font-size: 18px;
  color: #6b7280;
`;

export const TableFooterContent = styled.div`
  margin-top: 5px;
  font-size: 21px;
  font-weight: bold;
  color: #191e29;
`;
