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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  useTheme,
  useMediaQuery,
  Input,
  Chip,
} from "@mui/material";
import {
  SwapHoriz,
  Assignment,
  Business,
  Close,
  Save,
  CalendarToday,
  PictureAsPdf,
  Upload,
} from "@mui/icons-material";
import { productos } from "../producto/Productos";
import { guiasCarga } from "../guiaCarga/GuiasCarga";

export default function MovimientoForm({ open, onClose, movimiento = null, onSave, isMobile = false }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [formData, setFormData] = useState({
    tipo: "INGRESO",
    cantidad: "",
    fecha_movimiento: "",
    observacion: "",
    documento_movimiento: "",
    GUIA_DE_CARGA_idGuia: "",
    GUIA_DE_CARGA_CLIENTE_idCliente: "",
    PRODUCTO_idProducto: "",
  });

  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (movimiento) {
      setFormData({
        idMovimiento: movimiento.idMovimiento,
        tipo: movimiento.tipo || "INGRESO",
        cantidad: movimiento.cantidad || "",
        fecha_movimiento: movimiento.fecha_movimiento || "",
        observacion: movimiento.observacion || "",
        documento_movimiento: movimiento.documento_movimiento || "",
        GUIA_DE_CARGA_idGuia: movimiento.GUIA_DE_CARGA_idGuia || "",
        GUIA_DE_CARGA_CLIENTE_idCliente: movimiento.GUIA_DE_CARGA_CLIENTE_idCliente || "",
        PRODUCTO_idProducto: movimiento.PRODUCTO_idProducto || "",
      });
      if (movimiento.documento_movimiento) {
        setFileName(movimiento.documento_movimiento.split('/').pop());
      } else {
        setFileName("");
      }
    } else {
      // Establecer fecha actual por defecto
      const today = new Date().toISOString().split('T')[0];
      setFormData({
        tipo: "INGRESO",
        cantidad: "",
        fecha_movimiento: today,
        observacion: "",
        documento_movimiento: "",
        GUIA_DE_CARGA_idGuia: "",
        GUIA_DE_CARGA_CLIENTE_idCliente: "",
        PRODUCTO_idProducto: "",
      });
      setFileName("");
    }
    setErrors({});
  }, [movimiento, open]);

  const handleChange = (field) => (event) => {
    const newValue = event.target.value;
    setFormData({
      ...formData,
      [field]: newValue,
    });
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: "",
      });
    }

    // Validación en tiempo real para productos no nacionalizados
    if (field === "PRODUCTO_idProducto" || field === "tipo") {
      const tipoMovimiento = field === "tipo" ? newValue : formData.tipo;
      const productoId = field === "PRODUCTO_idProducto" ? newValue : formData.PRODUCTO_idProducto;
      
      if (tipoMovimiento === "SALIDA" && productoId) {
        const productoSeleccionado = productos.find(p => p.idProducto === parseInt(productoId));
        if (productoSeleccionado && productoSeleccionado.estado === "NO NACIONALIZADO") {
          setErrors({
            ...errors,
            tipo: "Los productos no nacionalizados no pueden hacer salidas",
          });
        } else {
          // Limpiar error si el producto es nacionalizado
          if (errors.tipo && errors.tipo.includes("no nacionalizados")) {
            setErrors({
              ...errors,
              tipo: "",
            });
          }
        }
      }
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setErrors({
          ...errors,
          documento_movimiento: "Solo se permiten archivos PDF"
        });
        return;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB
        setErrors({
          ...errors,
          documento_movimiento: "El archivo no puede ser mayor a 10MB"
        });
        return;
      }
      setSelectedFile(file);
      setFileName(file.name);
      setFormData({
        ...formData,
        documento_movimiento: URL.createObjectURL(file)
      });
      setErrors({
        ...errors,
        documento_movimiento: ""
      });
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFileName("");
    setFormData({
      ...formData,
      documento_movimiento: ""
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.tipo.trim()) {
      newErrors.tipo = "El tipo de movimiento es requerido";
    }

    if (!formData.cantidad.trim()) {
      newErrors.cantidad = "La cantidad es requerida";
    } else if (isNaN(formData.cantidad) || parseInt(formData.cantidad) <= 0) {
      newErrors.cantidad = "La cantidad debe ser un número mayor a 0";
    }

    if (!formData.fecha_movimiento.trim()) {
      newErrors.fecha_movimiento = "La fecha de movimiento es requerida";
    }

    if (!formData.observacion.trim()) {
      newErrors.observacion = "La observación es requerida";
    }

    if (!formData.GUIA_DE_CARGA_idGuia) {
      newErrors.GUIA_DE_CARGA_idGuia = "La guía de carga es requerida";
    }

    if (!formData.PRODUCTO_idProducto) {
      newErrors.PRODUCTO_idProducto = "El producto es requerido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const updatedFormData = {
        ...formData,
        GUIA_DE_CARGA_idGuia: parseInt(formData.GUIA_DE_CARGA_idGuia),
        GUIA_DE_CARGA_CLIENTE_idCliente: parseInt(formData.GUIA_DE_CARGA_CLIENTE_idCliente),
        PRODUCTO_idProducto: parseInt(formData.PRODUCTO_idProducto),
        cantidad: parseInt(formData.cantidad),
      };
      onSave(updatedFormData);
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
  };

  const tiposMovimiento = ["INGRESO", "SALIDA", "TRANSFERENCIA", "AJUSTE"];

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
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: { xs: 2, sm: 3 },
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
          backgroundColor: 'rgba(0, 0, 0, 0.02)'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SwapHoriz sx={{ color: 'primary.main', mr: 2, fontSize: { xs: 24, sm: 28 } }} />
          <Typography variant="h5" sx={{ fontWeight: '600', fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
            {movimiento ? "Editar Movimiento" : "Nuevo Movimiento"}
          </Typography>
        </Box>
        <IconButton
          onClick={handleClose}
          sx={{
            color: 'text.secondary',
            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: { xs: 2, sm: 3 }, overflow: 'auto' }}>
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {/* Información del Movimiento */}
          <Grid item xs={12}>
            <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.06)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SwapHoriz sx={{ color: 'primary.main', mr: 1, fontSize: { xs: 20, sm: 24 } }} />
                <Typography variant="h6" sx={{ fontWeight: '600', fontSize: { xs: '1rem', sm: '1.125rem' } }}>
                  Información del Movimiento
                </Typography>
              </Box>
              <Divider sx={{ mb: 2, opacity: 0.3 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth error={!!errors.tipo}>
                    <InputLabel>Tipo de Movimiento</InputLabel>
                    <Select
                      value={formData.tipo}
                      label="Tipo de Movimiento"
                      onChange={handleChange("tipo")}
                      size={fullScreen ? "large" : "medium"}
                      sx={{
                        borderRadius: 2,
                        '& .MuiOutlinedInput-notchedOutline': {
                          '&:hover': { borderColor: 'primary.main' }
                        }
                      }}
                    >
                      {tiposMovimiento.map((tipo) => (
                        <MenuItem key={tipo} value={tipo}>
                          {tipo}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.tipo && (
                      <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                        {errors.tipo}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Cantidad"
                    type="number"
                    value={formData.cantidad}
                    onChange={handleChange("cantidad")}
                    error={!!errors.cantidad}
                    helperText={errors.cantidad || "Cantidad de productos"}
                    variant="outlined"
                    size={fullScreen ? "large" : "medium"}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': { borderColor: 'primary.main' }
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Fecha de Movimiento"
                    type="date"
                    value={formData.fecha_movimiento}
                    onChange={handleChange("fecha_movimiento")}
                    error={!!errors.fecha_movimiento}
                    helperText={errors.fecha_movimiento || "Fecha del movimiento"}
                    variant="outlined"
                    size={fullScreen ? "large" : "medium"}
                    InputProps={{
                      startAdornment: <CalendarToday sx={{ mr: 1, color: 'text.secondary' }} />
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': { borderColor: 'primary.main' }
                      }
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Información de Relaciones */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.06)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Assignment sx={{ color: 'primary.main', mr: 1, fontSize: { xs: 20, sm: 24 } }} />
                <Typography variant="h6" sx={{ fontWeight: '600', fontSize: { xs: '1rem', sm: '1.125rem' } }}>
                  Guía de Carga
                </Typography>
              </Box>
              <Divider sx={{ mb: 2, opacity: 0.3 }} />
              <FormControl fullWidth error={!!errors.GUIA_DE_CARGA_idGuia}>
                <InputLabel>Guía de Carga</InputLabel>
                <Select
                  value={formData.GUIA_DE_CARGA_idGuia}
                  label="Guía de Carga"
                  onChange={handleChange("GUIA_DE_CARGA_idGuia")}
                  size={fullScreen ? "large" : "medium"}
                  sx={{
                    borderRadius: 2,
                    '& .MuiOutlinedInput-notchedOutline': {
                      '&:hover': { borderColor: 'primary.main' }
                    }
                  }}
                >
                  {guiasCarga.map((guia) => (
                    <MenuItem key={guia.idGuia} value={guia.idGuia}>
                      {guia.factura_comercial} - {guia.cliente?.nombre}
                    </MenuItem>
                  ))}
                </Select>
                {errors.GUIA_DE_CARGA_idGuia && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                    {errors.GUIA_DE_CARGA_idGuia}
                  </Typography>
                )}
              </FormControl>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.06)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Business sx={{ color: 'primary.main', mr: 1, fontSize: { xs: 20, sm: 24 } }} />
                <Typography variant="h6" sx={{ fontWeight: '600', fontSize: { xs: '1rem', sm: '1.125rem' } }}>
                  Producto
                </Typography>
              </Box>
              <Divider sx={{ mb: 2, opacity: 0.3 }} />
              <FormControl fullWidth error={!!errors.PRODUCTO_idProducto}>
                <InputLabel>Producto</InputLabel>
                <Select
                  value={formData.PRODUCTO_idProducto}
                  label="Producto"
                  onChange={handleChange("PRODUCTO_idProducto")}
                  size={fullScreen ? "large" : "medium"}
                  sx={{
                    borderRadius: 2,
                    '& .MuiOutlinedInput-notchedOutline': {
                      '&:hover': { borderColor: 'primary.main' }
                    }
                  }}
                >
                  {productos.map((producto) => (
                    <MenuItem key={producto.idProducto} value={producto.idProducto}>
                      {producto.nombre} - {producto.referencia}
                    </MenuItem>
                  ))}
                </Select>
                {errors.PRODUCTO_idProducto && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                    {errors.PRODUCTO_idProducto}
                  </Typography>
                )}
              </FormControl>
            </Paper>
          </Grid>

          {/* Documento del Movimiento */}
          <Grid item xs={12}>
            <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.06)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PictureAsPdf sx={{ color: 'primary.main', mr: 1, fontSize: { xs: 20, sm: 24 } }} />
                <Typography variant="h6" sx={{ fontWeight: '600', fontSize: { xs: '1rem', sm: '1.125rem' } }}>
                  Documento del Movimiento
                </Typography>
              </Box>
              <Divider sx={{ mb: 2, opacity: 0.3 }} />
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={8}>
                  {fileName ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', p: 2, border: '1px solid rgba(0, 0, 0, 0.12)', borderRadius: 2, backgroundColor: 'rgba(76, 175, 80, 0.04)' }}>
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
                    <Box>
                      <input
                        accept=".pdf"
                        style={{ display: 'none' }}
                        id="documento-movimiento"
                        type="file"
                        onChange={handleFileChange}
                      />
                      <label htmlFor="documento-movimiento">
                        <Button
                          variant="outlined"
                          component="span"
                          startIcon={<Upload />}
                          sx={{
                            borderRadius: 2,
                            borderWidth: 1.5,
                            textTransform: 'none',
                            fontWeight: '500'
                          }}
                        >
                          Seleccionar PDF
                        </Button>
                      </label>
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                    Máximo 10MB • Solo archivos PDF
                  </Typography>
                </Grid>
              </Grid>
              {errors.documento_movimiento && (
                <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                  {errors.documento_movimiento}
                </Typography>
              )}
            </Paper>
          </Grid>

          {/* Observación */}
          <Grid item xs={12}>
            <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.06)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Assignment sx={{ color: 'primary.main', mr: 1, fontSize: { xs: 20, sm: 24 } }} />
                <Typography variant="h6" sx={{ fontWeight: '600', fontSize: { xs: '1rem', sm: '1.125rem' } }}>
                  Observación
                </Typography>
              </Box>
              <Divider sx={{ mb: 2, opacity: 0.3 }} />
              <TextField
                fullWidth
                label="Observación del Movimiento"
                value={formData.observacion}
                onChange={handleChange("observacion")}
                error={!!errors.observacion}
                helperText={errors.observacion || "Descripción detallada del movimiento"}
                variant="outlined"
                multiline
                rows={4}
                size={fullScreen ? "large" : "medium"}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': { borderColor: 'primary.main' }
                  }
                }}
              />
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions
        sx={{
          p: { xs: 2, sm: 3 },
          borderTop: '1px solid rgba(0, 0, 0, 0.06)',
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
          gap: 1
        }}
      >
        <Button
          onClick={handleClose}
          variant="outlined"
          size={fullScreen ? "large" : "medium"}
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
          size={fullScreen ? "large" : "medium"}
          sx={{
            fontWeight: '500',
            borderRadius: 2,
            textTransform: 'none',
            letterSpacing: '0.025em',
            minWidth: 120,
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            '&:hover': { boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)' }
          }}
        >
          {movimiento ? "Actualizar" : "Crear"} Movimiento
        </Button>
      </DialogActions>
    </Dialog>
  );
}
