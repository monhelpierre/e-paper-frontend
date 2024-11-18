import React, { useState, useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  TableSortLabel,
  Menu,
  MenuItem,
  FormControl,
  Select,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
  TableFooter,
  TablePagination,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";

import AddIcon from "@mui/icons-material/Add";

import { DocumentAdd } from "./add";
import { DocumentView } from "./view";

import {
  ListContainer,
  TopContent,
  PageTitle,
  PageSubTitle,
  SearchAndFilterArea,
  LineUnder,
  FilterIconAndText,
  ElementOverTable,
  TypeAndOrginField,
  FieldAndLabel,
  SaveButton,
  TableArea,
  LabelStyle,
  TableFooterTitle,
  TableFooterContent,
  TableRowLabel,
} from "./styles";
import { removeDocument, getDocuments } from "../../../service/e-paper-api";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PreviewOutlinedIcon from "@mui/icons-material/PreviewOutlined";

export default function DocumentList() {
  const { user, documents, setDocuments } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);
  const [docOrigin, setDocOrigin] = useState("digitalizado");
  const [docType, setDocType] = useState("nota_fiscal");

  const [rows, setRows] = useState(documents);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [selected, setSelected] = useState([]);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [menuRow, setMenuRow] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChange = (event) => {
    setIsAdding(true);
  };

  const handleAddNewDocument = (event) => {
    setValue(event.target.value);
  };

  const handleVisualizeDocument = (doc) => {
    handleMenuClose();
  };

  useEffect(() => {}, [user]);

  const handleRemoveDocument = (doc) => {
    handleMenuClose();
    return;
    user
      .getIdToken(false)
      .then((JWT) => {
        return removeDocument(JWT, doc);
      })
      .then((response) => {
        if (response) {
          user
            .getIdToken(false)
            .then((JWT) => {
              return removeDocument(JWT, user);
            })
            .then((response) => {
              setDocuments(response.data);
            });
        }
      });
  };

  const handleSort = (column) => {
    const isAsc = orderBy === column && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(column);
    const sortedRows = [...rows].sort((a, b) => {
      if (a[column] < b[column]) return isAsc ? -1 : 1;
      if (a[column] > b[column]) return isAsc ? 1 : -1;
      return 0;
    });
    setRows(sortedRows);
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allIds = rows.map((row) => row.id);
      setSelected(allIds);
    } else {
      setSelected([]);
    }
  };

  const handleSelect = (id) => {
    setSelected((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  const handleMenuOpen = (event, row) => {
    setMenuAnchor(event.currentTarget);
    setMenuRow(row);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setMenuRow(null);
  };

  const formatDate = (firestoreDate) => {
    const seconds = firestoreDate._seconds;
    const date = new Date(seconds * 1000);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <ListContainer>
      <TopContent>
        <PageTitle>
          Documentos
          <PageSubTitle>Crie, gerencie e visualize os documentos</PageSubTitle>
          <LineUnder />
        </PageTitle>
        <SearchAndFilterArea>
          <TextField
            placeholder="Buscar documentos"
            variant="outlined"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {" "}
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <FilterIconAndText>
            <FilterAltOutlinedIcon /> Filtrar
          </FilterIconAndText>
        </SearchAndFilterArea>

        <ElementOverTable>
          <TypeAndOrginField>
            <FormControl variant="outlined">
              <FieldAndLabel>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <LabelStyle>Origem do documento</LabelStyle>
                  <Tooltip title="Origem do documento" arrow>
                    <IconButton size="small" sx={{ marginLeft: 1 }}>
                      <HelpOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </div>
                <Select
                  value={docOrigin}
                  labelId="dropdown-label"
                  onChange={() => setDocOrigin(e.target.value)}
                  style={{ minWidth: "320px" }}
                >
                  <MenuItem value="digitalizado">Digitalizado</MenuItem>
                  <MenuItem value="eletronicao">Eletrônico</MenuItem>
                </Select>
              </FieldAndLabel>
            </FormControl>

            <FormControl variant="outlined">
              <FieldAndLabel>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <LabelStyle>Tipo documental</LabelStyle>
                  <Tooltip title="tipo de documento" arrow>
                    <IconButton size="small" sx={{ marginLeft: 1 }}>
                      <HelpOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </div>
                <Select
                  value={docType}
                  labelId="dropdown-label"
                  onChange={() => setDocOrigin(e.target.value)}
                  style={{ minWidth: "320px" }}
                >
                  <MenuItem value="nota_fiscal">
                    Nota fiscal de serviço
                  </MenuItem>
                </Select>
              </FieldAndLabel>
            </FormControl>
          </TypeAndOrginField>
          <SaveButton onClick={handleAddNewDocument} startIcon={<AddIcon />}>
            Novo documento
          </SaveButton>
        </ElementOverTable>

        <TableArea>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="advanced table">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={
                        selected.length > 0 && selected.length < rows.length
                      }
                      checked={selected.length === rows.length}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  {[
                    { id: "name", label: "Nome de documento" },
                    { id: "emittor", label: "Emitente" },
                    { id: "attr_value", label: "Volor dos tributos" },
                    { id: "liquid_value", label: "Valor líquido" },
                    { id: "created_at", label: "Data de criação" },
                    { id: "updated_at", label: "Ultima atualização" },
                  ].map((column) => (
                    <TableCell
                      key={column.id}
                      sortDirection={orderBy === column.id ? order : false}
                    >
                      <TableSortLabel
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? order : "asc"}
                        onClick={() => handleSort(column.id)}
                      >
                        <TableRowLabel>{column.label}</TableRowLabel>
                      </TableSortLabel>
                    </TableCell>
                  ))}
                  <TableCell />
                </TableRow>
              </TableHead>

              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selected.includes(row.id)}
                        onChange={() => handleSelect(row.id)}
                      />
                    </TableCell>
                    <TableCell
                      style={{ display: "flex", flexDirection: "row" }}
                    >
                      <DescriptionOutlinedIcon
                        style={{
                          color: "green",
                          fontSize: "32",
                          marginTop: "10px",
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          color: "#6B7280",
                          fontSize: "12px",
                        }}
                      >
                        Cód. {row.id}
                        <div style={{ color: "#191E29", fontSize: "21px" }}>
                          {row.name}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{row.emittor}</TableCell>
                    <TableCell>{row.attr_value}</TableCell>
                    <TableCell>{row.liquid_value}</TableCell>
                    <TableCell>{formatDate(row.created_at)}</TableCell>
                    <TableCell>
                      {formatDate(row.updated_at)}
                      <IconButton
                        onClick={(event) => handleMenuOpen(event, row)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

              <TableFooter style={{ backgroundColor: "#2222" }}>
                <TableRow>
                  <TableCell />
                  <TableCell>
                    <TableFooterTitle>Total</TableFooterTitle>
                    <TableFooterContent>
                      {rows.length} documentos
                    </TableFooterContent>
                  </TableCell>
                  <TableCell>
                    <TableFooterTitle>no de emitentes</TableFooterTitle>
                    <TableFooterContent>
                      {rows.length} emitentes
                    </TableFooterContent>
                  </TableCell>
                  <TableCell>
                    <TableFooterTitle>Total de tributos</TableFooterTitle>
                    <TableFooterContent>
                      R$
                      {rows.reduce(
                        (sum, row) => sum + parseInt(row.attr_value),
                        0
                      )}
                    </TableFooterContent>
                  </TableCell>
                  <TableCell>
                    <TableFooterTitle>Total valor líquido</TableFooterTitle>
                    <TableFooterContent>
                      R$
                      {rows.reduce(
                        (sum, row) => sum + parseInt(row.liquid_value),
                        0
                      )}
                    </TableFooterContent>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell />
                </TableRow>
              </TableFooter>
            </Table>

            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={handleMenuClose}
              style={{ display: "flex", flexDirection: "row" }}
            >
              <MenuItem onClick={() => handleVisualizeDocument(menuRow)}>
                <PreviewOutlinedIcon />
                Visualizar
              </MenuItem>
              <MenuItem onClick={() => handleRemoveDocument(menuRow)}>
                <DeleteOutlineOutlinedIcon /> Excluir documento
              </MenuItem>
            </Menu>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            />
          </TableContainer>
        </TableArea>
      </TopContent>
    </ListContainer>
  );
}
