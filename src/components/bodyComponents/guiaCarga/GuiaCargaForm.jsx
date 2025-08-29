import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Typography,
  Box,
  IconButton,
  Divider,
  Paper,
  MenuItem,
  useTheme,
  useMediaQuery,
  Input,
  InputLabel,
  FormControl,
} from "@mui/material";
import {
  LocalShipping,
  Business,
  Scale,
  Inventory,
  Close,
  Save,
  Add,
  PictureAsPdf,
  Upload,
} from "@mui/icons-material";
import { customers } from "../customer/Customers";
import UnidadesCargaList from "./UnidadesCargaList";

export default function GuiaCargaForm({ open, onClose, guia = null, onSave, isMobile = false }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  
  const [formData, setFormData] = useState({
    factura_comercial: "",
    fecha_ingreso: "",
    unidades_carga: "",
    unidades_producto: "",
    peso_total: "",
    contenedores: "",
    espacio_ocupado: "",
    CLIENTE_idCliente: "",
    documento_carga: "",
  });

  const [unidadesCarga, setUnidadesCarga] = useState([]);
  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (guia) {
      setFormData({
        idGuia: guia.idGuia,
        factura_comercial: guia.factura_comercial || "",
        fecha_ingreso: guia.fecha_ingreso || "",
        unidades_carga: guia.unidades_carga || "",
        unidades_producto: guia.unidades_producto || "",
        peso_total: guia.peso_total || "",
        contenedores: guia.contenedores || "",
        espacio_ocupado: guia.espacio_ocupado || "",
        CLIENTE_idCliente: guia.CLIENTE_idCliente || "",
      });
      // Cargar unidades de carga existentes si las hay
      if (guia.unidadesCarga) {
        setUnidadesCarga(guia.unidadesCarga);
      } else {
        setUnidadesCarga([]);
      }
    } else {
      setFormData({
        factura_comercial: "",
        fecha_ingreso: new Date().toISOString().split('T')[0],
        unidades_carga: "",
        unidades_producto: "",
        peso_total: "",
        contenedores: "",
        espacio_ocupado: "",
        CLIENTE_idCliente: "",
      });
      setUnidadesCarga([]);
    }
    setErrors({});
  }, [guia, open]);

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: "",
      });
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validar que sea un PDF
      if (file.type !== 'application/pdf') {
        alert('Por favor selecciona un archivo PDF');
        return;
      }
      
      // Validar tamaño (máximo 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('El archivo es demasiado grande. Máximo 10MB');
        return;
      }

      setSelectedFile(file);
      setFileName(file.name);
      
      // Crear URL temporal para previsualización
      const fileUrl = URL.createObjectURL(file);
      setFormData({
        ...formData,
        documento_carga: fileUrl,
      });
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFileName("");
    setFormData({
      ...formData,
      documento_carga: "",
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.factura_comercial.trim()) {
      newErrors.factura_comercial = "La factura comercial es requerida";
    }

    if (!formData.fecha_ingreso) {
      newErrors.fecha_ingreso = "La fecha de ingreso es requerida";
    }

    if (!formData.unidades_producto.trim()) {
      newErrors.unidades_producto = "El número de unidades de producto es requerido";
    } else if (isNaN(formData.unidades_producto) || parseInt(formData.unidades_producto) <= 0) {
      newErrors.unidades_producto = "Debe ser un número mayor a 0";
    }

    if (!formData.contenedores.trim()) {
      newErrors.contenedores = "El número de contenedores es requerido";
    } else if (isNaN(formData.contenedores) || parseInt(formData.contenedores) <= 0) {
      newErrors.contenedores = "Debe ser un número mayor a 0";
    }

    if (!formData.espacio_ocupado.trim()) {
      newErrors.espacio_ocupado = "El espacio ocupado es requerido";
    } else if (isNaN(formData.espacio_ocupado) || parseFloat(formData.espacio_ocupado) <= 0) {
      newErrors.espacio_ocupado = "Debe ser un número mayor a 0";
    }

    if (!formData.CLIENTE_idCliente) {
      newErrors.CLIENTE_idCliente = "El cliente es requerido";
    }

    // Validar que haya al menos una unidad de carga
    if (unidadesCarga.length === 0) {
      newErrors.unidadesCarga = "Debe agregar al menos una unidad de carga";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Actualizar el número de unidades de carga basado en las unidades agregadas
      const updatedFormData = {
        ...formData,
        CLIENTE_idCliente: parseInt(formData.CLIENTE_idCliente),
        unidades_carga: unidadesCarga.length.toString(),
        peso_total: calcularPesoTotalUnidades().toString(),
        unidadesCarga: unidadesCarga, // Incluir las unidades de carga en los datos
      };
      onSave(updatedFormData);
      onClose();
    }
  };

  const calcularPesoTotalUnidades = () => {
    return unidadesCarga.reduce((total, unidad) => {
      const peso = parseFloat(unidad.peso_bruto) || 0;
      return total + peso;
    }, 0);
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="lg"
      fullWidth
      fullScreen={fullScreen}
      PaperProps={{
        sx: {
          borderRadius: fullScreen ? 0 : 4,
          maxHeight: fullScreen ? '100vh' : '90vh',
          margin: fullScreen ? 0 : '32px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          overflow: 'hidden'
        }
      }}
    >
      {/* Header Minimalista */}
      <DialogTitle sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0, 0, 0, 0.02)',
        color: 'text.primary',
        padding: { xs: 2, sm: 3 },
        borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
        minHeight: fullScreen ? 64 : 80
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
          <Box
            sx={{ 
              width: { xs: 40, sm: 48 }, 
              height: { xs: 40, sm: 48 }, 
              backgroundColor: 'rgba(25, 118, 210, 0.08)',
              color: 'primary.main',
              mr: { xs: 1, sm: 2 },
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <LocalShipping sx={{ fontSize: { xs: 20, sm: 24 } }} />
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography 
              variant={isMobile ? "h6" : "h5"} 
              sx={{ 
                fontWeight: "600",
                fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.5rem' },
                letterSpacing: '-0.025em',
                lineHeight: 1.2
              }}
            >
              {guia ? "Editar Guía de Carga" : "Nueva Guía de Carga"}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                opacity: 0.7,
                fontSize: { xs: '0.875rem', sm: '1rem' },
                color: 'text.secondary',
                mt: 0.5
              }}
            >
              {guia ? "Modifica la información de la guía" : "Completa la información de la nueva guía"}
            </Typography>
          </Box>
        </Box>
        <Button
          onClick={handleClose}
          sx={{ 
            color: 'text.secondary', 
            minWidth: 'auto',
            p: { xs: 1, sm: 1.5 },
            borderRadius: 2,
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)'
            }
          }}
        >
          <Close sx={{ fontSize: { xs: 20, sm: 24 } }} />
        </Button>
      </DialogTitle>

      <DialogContent sx={{ 
        pt: { xs: 2, sm: 3 },
        px: { xs: 2, sm: 3 },
        pb: { xs: 2, sm: 3 },
        backgroundColor: 'rgba(0, 0, 0, 0.01)'
      }}>
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {/* Información Principal */}
          <Grid item xs={12}>
            <Paper sx={{ 
              p: { xs: 2, sm: 3 }, 
              mb: { xs: 2, sm: 3 }, 
              bgcolor: 'white',
              borderRadius: 3,
              border: '1px solid rgba(0, 0, 0, 0.06)',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocalShipping sx={{ color: 'primary.main', mr: 1, fontSize: { xs: 20, sm: 24 } }} />
                <Typography variant="h6" sx={{ fontWeight: '600', fontSize: { xs: '1rem', sm: '1.125rem' } }}>
                  Información Principal
                </Typography>
              </Box>
              <Divider sx={{ mb: 2, opacity: 0.3 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Factura Comercial"
                    value={formData.factura_comercial}
                    onChange={handleChange("factura_comercial")}
                    error={!!errors.factura_comercial}
                    helperText={errors.factura_comercial}
                    variant="outlined"
                    size={isMobile ? "large" : "medium"}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Fecha de Ingreso"
                    type="date"
                    value={formData.fecha_ingreso}
                    onChange={handleChange("fecha_ingreso")}
                    error={!!errors.fecha_ingreso}
                    helperText={errors.fecha_ingreso}
                    variant="outlined"
                    size={isMobile ? "large" : "medium"}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    select
                    label="Cliente"
                    value={formData.CLIENTE_idCliente}
                    onChange={handleChange("CLIENTE_idCliente")}
                    error={!!errors.CLIENTE_idCliente}
                    helperText={errors.CLIENTE_idCliente}
                    variant="outlined"
                    size={isMobile ? "large" : "medium"}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                  >
                    {customers.map((customer) => (
                      <MenuItem key={customer.idCliente} value={customer.idCliente}>
                        {customer.nombre} - {customer.nit}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Información de Carga */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: { xs: 2, sm: 3 }, height: '100%', borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.06)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Inventory sx={{ color: 'primary.main', mr: 1, fontSize: { xs: 20, sm: 24 } }} />
                <Typography variant="h6" sx={{ fontWeight: '600', fontSize: { xs: '1rem', sm: '1.125rem' } }}>
                  Información de Carga
                </Typography>
              </Box>
              <Divider sx={{ mb: 2, opacity: 0.3 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Unidades de Carga"
                    type="number"
                    value={unidadesCarga.length}
                    InputProps={{
                      readOnly: true,
                    }}
                    helperText="Calculado automáticamente según las unidades agregadas"
                    variant="outlined"
                    size={isMobile ? "large" : "medium"}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        backgroundColor: 'rgba(0, 0, 0, 0.02)',
                        '&:hover fieldset': {
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Unidades de Producto"
                    type="number"
                    value={formData.unidades_producto}
                    onChange={handleChange("unidades_producto")}
                    error={!!errors.unidades_producto}
                    helperText={errors.unidades_producto}
                    variant="outlined"
                    size={isMobile ? "large" : "medium"}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Contenedores"
                    type="number"
                    value={formData.contenedores}
                    onChange={handleChange("contenedores")}
                    error={!!errors.contenedores}
                    helperText={errors.contenedores}
                    variant="outlined"
                    size={isMobile ? "large" : "medium"}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Información de Peso y Espacio */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: { xs: 2, sm: 3 }, height: '100%', borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.06)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Scale sx={{ color: 'primary.main', mr: 1, fontSize: { xs: 20, sm: 24 } }} />
                <Typography variant="h6" sx={{ fontWeight: '600', fontSize: { xs: '1rem', sm: '1.125rem' } }}>
                  Peso y Espacio
                </Typography>
              </Box>
              <Divider sx={{ mb: 2, opacity: 0.3 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Peso Total (kg)"
                    type="number"
                    value={calcularPesoTotalUnidades()}
                    InputProps={{
                      readOnly: true,
                    }}
                    helperText="Calculado automáticamente según las unidades agregadas"
                    variant="outlined"
                    size={isMobile ? "large" : "medium"}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        backgroundColor: 'rgba(0, 0, 0, 0.02)',
                        '&:hover fieldset': {
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Espacio Ocupado (m²)"
                    type="number"
                    value={formData.espacio_ocupado}
                    onChange={handleChange("espacio_ocupado")}
                    error={!!errors.espacio_ocupado}
                    helperText={errors.espacio_ocupado}
                    variant="outlined"
                    size={isMobile ? "large" : "medium"}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Documento de Carga */}
          <Grid item xs={12}>
            <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.06)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PictureAsPdf sx={{ color: 'primary.main', mr: 1, fontSize: { xs: 20, sm: 24 } }} />
                <Typography variant="h6" sx={{ fontWeight: '600', fontSize: { xs: '1rem', sm: '1.125rem' } }}>
                  Documento de Carga
                </Typography>
              </Box>
              <Divider sx={{ mb: 2, opacity: 0.3 }} />
              
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={8}>
                  {fileName ? (
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      p: 2, 
                      border: '1px solid rgba(0, 0, 0, 0.12)', 
                      borderRadius: 2,
                      backgroundColor: 'rgba(76, 175, 80, 0.04)'
                    }}>
                      <PictureAsPdf sx={{ color: 'success.main', mr: 1 }} />
                      <Typography variant="body2" sx={{ flex: 1, fontWeight: '500' }}>
                        {fileName}
                      </Typography>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={handleRemoveFile}
                        sx={{ ml: 1 }}
                      >
                        <Close sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Box>
                  ) : (
                    <FormControl fullWidth>
                      <InputLabel htmlFor="documento-carga">Seleccionar PDF</InputLabel>
                      <Input
                        id="documento-carga"
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        startAdornment={
                          <Upload sx={{ mr: 1, color: 'text.secondary' }} />
                        }
                        sx={{
                          '& .MuiInputBase-input': {
                            padding: '12px 14px',
                          },
                        }}
                      />
                    </FormControl>
                  )}
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                    Máximo 10MB • Solo archivos PDF
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Sección de Unidades de Carga */}
          <Grid item xs={12}>
            <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.06)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Inventory sx={{ color: 'primary.main', mr: 1, fontSize: { xs: 20, sm: 24 } }} />
                  <Typography variant="h6" sx={{ fontWeight: '600', fontSize: { xs: '1rem', sm: '1.125rem' } }}>
                    Gestión de Unidades de Carga
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ mb: 2, opacity: 0.3 }} />
              
              <UnidadesCargaList
                unidades={unidadesCarga}
                onUnidadesChange={setUnidadesCarga}
                guiaId={formData.idGuia || 'nueva'}
              />
              {errors.unidadesCarga && (
                <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                  {errors.unidadesCarga}
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ 
        p: { xs: 2, sm: 3 },
        borderTop: '1px solid rgba(0, 0, 0, 0.06)',
        backgroundColor: 'rgba(0, 0, 0, 0.02)',
        gap: 1
      }}>
        <Button 
          onClick={handleClose} 
          variant="outlined"
          size={isMobile ? "large" : "medium"}
          sx={{
            fontWeight: '500',
            borderWidth: 1.5,
            borderRadius: 2,
            textTransform: 'none',
            letterSpacing: '0.025em',
            minWidth: 100
          }}
        >
          Cancelar
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          color="primary"
          startIcon={<Save />}
          size={isMobile ? "large" : "medium"}
          sx={{
            fontWeight: '500',
            borderRadius: 2,
            textTransform: 'none',
            letterSpacing: '0.025em',
            minWidth: 120,
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)'
            }
          }}
        >
          {guia ? "Actualizar" : "Crear"} Guía
        </Button>
      </DialogActions>
    </Dialog>
  );
}
