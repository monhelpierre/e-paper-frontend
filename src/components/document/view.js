import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  DialogActions,
} from "@mui/material";
import React, { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { getFilePath } from "../../../service/e-paper-api";

export default function DocumentView({ doc, setIsViewing }) {
  const handleClose = (event, reason) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      return;
    }
    setIsViewing(false);
  };

  useEffect(() => {
    if (!doc.path) {
      getFilePath(doc).then((response) => {
        doc.path = response;
      });
    }
  }, []);

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      aria-labelledby="file-viewer-title"
    >
      <DialogTitle
        id="file-viewer-title"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ color: "#3A424E", fontWeight: "bold", fontSize: "18px" }}>
          Pré-visualização do arquivo
          <div
            style={{ color: "#6B7280", fontWeight: "normal", fontSize: "14px" }}
          >
            {doc.name}
          </div>
        </div>
        <IconButton onClick={handleClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {doc.path && doc.path.endsWith(".pdf") && (
          <iframe
            src={doc.fileUrl}
            height="410px"
            style={{ border: "none" }}
            title="File Viewer"
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color="error"
          style={{
            textTransform: "none",
            border: "1px solid #2222",
            color: "#fff",
            backgroundColor: "#05C151",
            fontWeight: "bold",
          }}
        >
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
