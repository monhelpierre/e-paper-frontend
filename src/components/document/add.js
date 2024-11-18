import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  FormControl,
  MenuItem,
  Select,
  LinearProgress,
} from "@mui/material";
import DocumentView from "./view";
import { LabelStyle } from "./styles";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useAppContext } from "../../context/appContext";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { saveDocument, getDocuments } from "../../../service/e-paper-api";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";

export default function DocumentAdd({ setIsAdding }) {
  const { user, setIsLoading, documents, setDocuments, showSnackbar } =
    useAppContext();
  const [files, setFiles] = useState([]);
  const [isViewing, setIsViewing] = useState(false);

  function uniqueId() {
    let uniqueId;
    do {
      const randomId = Math.floor(Math.random() * 10000);
      uniqueId = randomId.toString().padStart(4, "0");
    } while (
      documents &&
      Object.values(documents).some((doc) => doc.id === uniqueId)
    );

    return uniqueId;
  }

  const [formData, setFormData] = useState({
    id: uniqueId(),
    document_origin: "",
    document_type: "",
    emittor: user.displayName,
    file: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "application/pdf",
    multiple: false,
  });

  const handleClose = (event, reason) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      return;
    }
    setFiles([]);
    setIsAdding(false);
  };

  const handleUpload = () => {
    if (!files) return;

    setIsLoading(true);

    const data = new FormData();
    data.append("id", formData.id);
    data.append("document_origin", formData.document_origin);
    data.append("document_type", formData.document_type);
    data.append("emittor", formData.emittor);
    data.append("attr_value", 200);
    data.append("liquid_value", 2000);
    data.append("file", files[0]);

    user
      .getIdToken(false)
      .then((JWT) => {
        return saveDocument(JWT, data);
      })
      .then((response) => {
        console.log(response);
        if ("message" in response) {
          user
            .getIdToken(false)
            .then((JWT) => {
              return getDocuments(JWT);
            })
            .then((res) => {
              setDocuments(res.data);
              setIsLoading(false);
              setIsAdding(false);
              showSnackbar("Documento salvo com sucesso!");
            });
        } else {
          showSnackbar("Error ao salvar o documento!", "error");
        }
      });
  };

  return (
    <>
      {isViewing && <DocumentView doc={files[0]} setIsViewing={setIsViewing} />}

      <Dialog
        open={true}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        style={{
          minHeight: "580px",
          minWidth: "580px",
        }}
      >
        <DialogTitle>
          Criar novo documento
          <div
            style={{
              fontSize: "14px",
              color: "#6B7280",
              fontWeight: "normal",
              marginBottom: "15px",
            }}
          >
            Insira os dados necessários para criar{" "}
          </div>
          <span
            style={{
              fontSize: "14px",
              color: "#6B7280",
              fontWeight: "bold",
              border: "1px solid #2222",
              borderRadius: "40%",
              width: "80px",
              height: "30px",
              padding: "10px",
              backgroundColor: "#2222",
              marginBottom: "15px",
            }}
          >
            {formData.id}
          </span>
        </DialogTitle>
        <DialogContent>
          <Box style={{ marginBottom: "10px" }}>
            <Typography variant="subtitle2">
              <LabelStyle> Origem do documento</LabelStyle>
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                name="document_origin"
                value={formData.document_origin}
                onChange={handleChange}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Selecionar a origem do documento
                </MenuItem>
                <MenuItem value="digitalizado">Digitalizado</MenuItem>
                <MenuItem value="eletronico">Eletrônico</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box style={{ marginBottom: "10px" }}>
            <Typography variant="subtitle2">
              <LabelStyle> Tipo de documento</LabelStyle>
            </Typography>

            <FormControl fullWidth size="small">
              <Select
                name="document_type"
                value={formData.document_type}
                onChange={handleChange}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Selecionar o tipo de documento
                </MenuItem>
                <MenuItem value="contrato_prestacao">
                  Contrato de prestação de serviço
                </MenuItem>
                <MenuItem value="nota_fiscal">Nota fiscal de serviço</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <div
            {...getRootProps()}
            style={{
              border: "2px dashed #05C151",
              padding: "20px",
              textAlign: "center",
              borderRadius: "8px",
              backgroundColor: isDragActive ? "#f0f0f0" : "#fff",
              cursor: "pointer",
              minHeight: "120px",
              maxHeight: "120px",
              alignContent: "center",
            }}
          >
            <input {...getInputProps()} />
            <UploadFileOutlinedIcon
              style={{ marginTop: "-30px", fontSize: "32px", color: "#05C151" }}
            />
            <Typography variant="body1" style={{ marginTop: "10px" }}>
              Arraste e solte aqui ou selecione o arquivo para upload
            </Typography>
            <Typography
              variant="body1"
              style={{
                marginTop: "15px",
              }}
            >
              <span
                style={{
                  border: "1px solid #2222",
                  width: "auto",
                  padding: "10px 10px",
                  backgroundColor: "#fff",
                  color: "#191E29",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                Procurar e selecionar arquivo
              </span>
            </Typography>
            <Typography
              variant="body1"
              style={{ marginTop: "20px", color: "#9CA3AF", fontSize: "12px" }}
            >
              Tamnaho max. 10MB
            </Typography>
          </div>

          {files && files.length > 0 && (
            <>
              <div style={{ marginTop: "20px", border: "1px solid #2222" }}>
                <ul key={"mytest"}>
                  {files.map((file, index) => (
                    <span
                      style={{ display: "flex", flexDirection: "row" }}
                      key={file.name}
                    >
                      {file.size / (1024 * 1024) > 10 ? (
                        <UploadFileOutlinedIcon
                          style={{
                            fontSize: "24px",
                            borderRadius: "50%",
                            marginRight: "10px",
                            marginLeft: "-10px",
                            padding: "18px",
                          }}
                        />
                      ) : (
                        <TaskOutlinedIcon
                          style={{
                            fontSize: "24px",
                            backgroundColor: "#F9FAFB",
                            color: "#05C151",
                            borderRadius: "50%",
                            marginRight: "10px",
                            marginLeft: "-10px",
                            padding: "18px",
                          }}
                        />
                      )}

                      <div
                        style={{
                          marginTop: "7px",
                          fontSize: "14px",
                          color: "#3A424E",
                          fontWeight: "bold",
                        }}
                      >
                        {file.name}
                        <CloseOutlinedIcon
                          style={{
                            position: "absolute",
                            marginTop: "-4px",
                            marginRight: "45px",
                            fontSize: "20px",
                            color: "#6B7280",
                            cursor: "pointer",
                            right: "0",
                          }}
                          onClick={() => setFiles([])}
                        />
                        <div
                          style={{
                            marginTop: "7px",
                            fontSize: "12px",
                            color: "#9CA3AF",
                            fontWeight: "normal",
                          }}
                        >
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </div>
                        <LinearProgress
                          variant="determinate"
                          value={(file.size / (1024 * 1024) / 10) * 100}
                          sx={{
                            height: 8,
                            marginTop: "5px",
                            minWidth: "425px",
                            borderRadius: 2,
                            backgroundColor: "#2222",
                            color: "#05C151",
                            "& .MuiLinearProgress-bar": {
                              backgroundColor:
                                file.size / (1024 * 1024) > 10
                                  ? "#d32f2f"
                                  : "#4caf50",
                            },
                          }}
                          style={{
                            color: "#05C151",
                          }}
                        />
                      </div>
                    </span>
                  ))}
                </ul>
              </div>

              <div
                style={{
                  marginTop: "10px",
                  color: "#05C151",
                  fontSize: "14px",
                  fontWeight: "normal",
                  cursor: "pointer",
                }}
                onClick={() => setIsViewing(true)}
              >
                Pré-visualizar
              </div>

              <hr
                style={{
                  marginTop: "20px",
                  fontWeight: "normal",
                  border: "1px solid #2222",
                }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="error"
            style={{
              textTransform: "none",
              border: "1px solid #2222",
              color: "#3A424E",
              fontWeight: "bold",
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleUpload}
            color="primary"
            variant="contained"
            disabled={
              files.length === 0 ||
              !formData.document_origin ||
              !formData.document_type ||
              (files.length > 0 && files[0].size / (1024 * 1024) > 10)
            }
            style={{
              textTransform: "none",
              backgroundColor: "#05C151",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            Criar documento <ArrowForwardOutlinedIcon />
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
