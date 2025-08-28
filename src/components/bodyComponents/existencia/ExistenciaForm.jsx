import { useState, useEffect } from "react";
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
  Alert,
  Chip,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Inventory,
  Assignment,
  Business,
  Close,
  Save,
  Info,
  QrCode,
  LocalShipping,
  Inventory2,
} from "@mui/icons-material";
import { productos } from "../producto/Productos";
import { guiasCarga } from "../guiaCarga/GuiasCarga";
import { unidadesCarga } from "../guiaCarga/UnidadesCarga";
import { bodegas } from "../producto/Bodegas";
import { customers } from "../customer/Customers";

export default function ExistenciaForm({ open, onClose, existencia = null, onSave }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [formData, setFormData] = useState({
    serial: "",
    estado: "",
    GUIA_DE_CARGA_idGuia: "",
    GUIA_DE_CARGA_CLIENTE_idCliente: "",
    PRODUCTO_idProducto: "",
    PRODUCTO_BODEGA_idBodega: "",
    UNIDAD_DE_CARGA_idUnidad: "",
  });

  const [errors, setErrors] = useState({});
  const [selectedProducto, setSelectedProducto] = useState(null);
  const [selectedGuia, setSelectedGuia] = useState(null);
  const [selectedUnidadCarga, setSelectedUnidadCarga] = useState(null);
  const [unidadesDisponibles, setUnidadesDisponibles] = useState([]);

  useEffect(() => {
    if (existencia) {
      setFormData({
        serial: existencia.serial || "",
        estado: existencia.estado || "",
        GUIA_DE_CARGA_idGuia: existencia.GUIA_DE_CARGA_idGuia || "",
        GUIA_DE_CARGA_CLIENTE_idCliente: existencia.GUIA_DE_CARGA_CLIENTE_idCliente || "",
        PRODUCTO_idProducto: existencia.PRODUCTO_idProducto || "",
        PRODUCTO_BODEGA_idBodega: existencia.PRODUCTO_BODEGA_idBodega || "",
        UNIDAD_DE_CARGA_idUnidad: existencia.UNIDAD_DE_CARGA_idUnidad || "",
      });
      
      // Establecer productos, guías y unidades seleccionadas
      const producto = productos.find(p => p.idProducto === existencia.PRODUCTO_idProducto);
      const guia = guiasCarga.find(g => g.idGuia === existencia.GUIA_DE_CARGA_idGuia);
      const unidad = unidadesCarga.find(u => u.idUnidad === existencia.UNIDAD_DE_CARGA_idUnidad);
      
      setSelectedProducto(producto || null);
      setSelectedGuia(guia || null);
      setSelectedUnidadCarga(unidad || null);
      
      // Filtrar unidades disponibles para la guía seleccionada
      if (guia) {
        const unidades = unidadesCarga.filter(u => u.GUIA_DE_CARGA_idGuia === guia.idGuia);
        setUnidadesDisponibles(unidades);
      }
    } else {
      setFormData({
        serial: "",
        estado: "",
        GUIA_DE_CARGA_idGuia: "",
        GUIA_DE_CARGA_CLIENTE_idCliente: "",
        PRODUCTO_idProducto: "",
        PRODUCTO_BODEGA_idBodega: "",
        UNIDAD_DE_CARGA_idUnidad: "",
      });
      setSelectedProducto(null);
      setSelectedGuia(null);
      setSelectedUnidadCarga(null);
      setUnidadesDisponibles([]);
    }
    setErrors({});
  }, [existencia]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpiar error del campo
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }

    // Auto-completar campos relacionados
    if (field === "PRODUCTO_idProducto") {
      const producto = productos.find(p => p.idProducto === value);
      setSelectedProducto(producto || null);
      if (producto) {
        setFormData(prev => ({
          ...prev,
          PRODUCTO_BODEGA_idBodega: producto.BODEGA_idBodega || "",
        }));
      }
    }

    if (field === "GUIA_DE_CARGA_idGuia") {
      const guia = guiasCarga.find(g => g.idGuia === value);
      setSelectedGuia(guia || null);
      if (guia) {
        setFormData(prev => ({
          ...prev,
          GUIA_DE_CARGA_CLIENTE_idCliente: guia.CLIENTE_idCliente || "",
          UNIDAD_DE_CARGA_idUnidad: "", // Reset unidad de carga
        }));
        setSelectedUnidadCarga(null);
        
        // Filtrar unidades disponibles para la guía seleccionada
        const unidades = unidadesCarga.filter(u => u.GUIA_DE_CARGA_idGuia === guia.idGuia);
        setUnidadesDisponibles(unidades);
      } else {
        setUnidadesDisponibles([]);
      }
    }

    if (field === "UNIDAD_DE_CARGA_idUnidad") {
      const unidad = unidadesCarga.find(u => u.idUnidad === value);
      setSelectedUnidadCarga(unidad || null);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.serial.trim()) {
      newErrors.serial = "El serial es requerido";
    }

    if (!formData.estado) {
      newErrors.estado = "El estado es requerido";
    }

    if (!formData.PRODUCTO_idProducto) {
      newErrors.PRODUCTO_idProducto = "El producto es requerido";
    }

    if (!formData.GUIA_DE_CARGA_idGuia) {
      newErrors.GUIA_DE_CARGA_idGuia = "La guía de carga es requerida";
    }

    if (!formData.UNIDAD_DE_CARGA_idUnidad) {
      newErrors.UNIDAD_DE_CARGA_idUnidad = "La unidad de carga es requerida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleClose = () => {
    onClose();
  };

  const estados = [
    { value: "NACIONALIZADO", label: "Nacionalizado", color: "success" },
    { value: "NO_NACIONALIZADO", label: "No Nacionalizado", color: "warning" },
  ];

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 4,
          maxHeight: isMobile ? '100vh' : '90vh',
          margin: isMobile ? 0 : '32px',
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
        minHeight: isMobile ? 64 : 80
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
          <Box
            sx={{
              width: { xs: 40, sm: 48 },
              height: { xs: 40, sm: 48 },
              backgroundColor: 'rgba(25, 118, 210, 0.08)',
              color: 'primary.main',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: { xs: 1, sm: 2 }
            }}
          >
            <QrCode sx={{ fontSize: { xs: 20, sm: 24 } }} />
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
              {existencia ? "Editar Existencia" : "Nueva Existencia"}
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
              {existencia ? `Serial: ${existencia.serial}` : "Crear nueva unidad de inventario"}
            </Typography>
          </Box>
        </Box>
        <IconButton 
          onClick={handleClose} 
          sx={{ 
            color: 'text.secondary',
            p: { xs: 1, sm: 1.5 },
            borderRadius: 2,
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)'
            }
          }}
        >
          <Close sx={{ fontSize: { xs: 20, sm: 24 } }} />
        </IconButton>
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
            <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.06)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <QrCode sx={{ mr: 1, fontSize: { xs: 20, sm: 24 }, color: 'primary.main' }} />
                <Typography 
                  variant={isMobile ? "h6" : "h5"} 
                  sx={{ 
                    fontWeight: '600',
                    fontSize: { xs: '1.125rem', sm: '1.25rem' },
                    letterSpacing: '-0.025em'
                  }}
                >
                  Información Principal
                </Typography>
              </Box>
              <Divider sx={{ mb: 2, opacity: 0.3 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Serial"
                    value={formData.serial}
                    onChange={(e) => handleChange("serial", e.target.value)}
                    error={!!errors.serial}
                    helperText={errors.serial}
                    size={isMobile ? "medium" : "medium"}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        backgroundColor: 'white'
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth error={!!errors.estado} size={isMobile ? "medium" : "medium"}>
                    <InputLabel>Estado</InputLabel>
                    <Select
                      value={formData.estado}
                      onChange={(e) => handleChange("estado", e.target.value)}
                      label="Estado"
                      sx={{
                        borderRadius: 2,
                        backgroundColor: 'white'
                      }}
                    >
                      {estados.map((estado) => (
                        <MenuItem key={estado.value} value={estado.value}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Chip 
                              label={estado.label} 
                              color={estado.color} 
                              size="small" 
                              variant="outlined"
                              sx={{ mr: 1, fontSize: '0.75rem' }}
                            />
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Información del Producto */}
          <Grid item xs={12}>
            <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.06)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Inventory sx={{ mr: 1, fontSize: { xs: 20, sm: 24 }, color: 'primary.main' }} />
                <Typography 
                  variant={isMobile ? "h6" : "h5"} 
                  sx={{ 
                    fontWeight: '600',
                    fontSize: { xs: '1.125rem', sm: '1.25rem' },
                    letterSpacing: '-0.025em'
                  }}
                >
                  Producto y Bodega
                </Typography>
              </Box>
              <Divider sx={{ mb: 2, opacity: 0.3 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth error={!!errors.PRODUCTO_idProducto} size={isMobile ? "medium" : "medium"}>
                    <InputLabel>Producto</InputLabel>
                    <Select
                      value={formData.PRODUCTO_idProducto}
                      onChange={(e) => handleChange("PRODUCTO_idProducto", e.target.value)}
                      label="Producto"
                      sx={{
                        borderRadius: 2,
                        backgroundColor: 'white'
                      }}
                    >
                      {productos.map((producto) => (
                        <MenuItem key={producto.idProducto} value={producto.idProducto}>
                          <Box>
                            <Typography variant="body2" fontWeight="500">
                              {producto.nombre}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {producto.referencia} - {producto.categoria?.nombre}
                            </Typography>
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Bodega"
                    value={formData.PRODUCTO_BODEGA_idBodega}
                    onChange={(e) => handleChange("PRODUCTO_BODEGA_idBodega", e.target.value)}
                    size={isMobile ? "medium" : "medium"}
                    disabled
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        backgroundColor: 'rgba(0, 0, 0, 0.02)'
                      }
                    }}
                  />
                </Grid>
              </Grid>

              {/* Información del Producto Seleccionado */}
              {selectedProducto && (
                <Alert severity="info" icon={<Info />} sx={{ mt: 2, borderRadius: 2 }}>
                  <Typography variant="subtitle2" fontWeight="600" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                    Producto Seleccionado:
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                    {selectedProducto.nombre} - {selectedProducto.referencia}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                    Categoría: {selectedProducto.categoria?.nombre} | Peso: {selectedProducto.peso} kg
                  </Typography>
                </Alert>
              )}
            </Paper>
          </Grid>

          {/* Información de Guía de Carga */}
          <Grid item xs={12}>
            <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.06)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocalShipping sx={{ mr: 1, fontSize: { xs: 20, sm: 24 }, color: 'primary.main' }} />
                <Typography 
                  variant={isMobile ? "h6" : "h5"} 
                  sx={{ 
                    fontWeight: '600',
                    fontSize: { xs: '1.125rem', sm: '1.25rem' },
                    letterSpacing: '-0.025em'
                  }}
                >
                  Guía de Carga
                </Typography>
              </Box>
              <Divider sx={{ mb: 2, opacity: 0.3 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth error={!!errors.GUIA_DE_CARGA_idGuia} size={isMobile ? "medium" : "medium"}>
                    <InputLabel>Guía de Carga</InputLabel>
                    <Select
                      value={formData.GUIA_DE_CARGA_idGuia}
                      onChange={(e) => handleChange("GUIA_DE_CARGA_idGuia", e.target.value)}
                      label="Guía de Carga"
                      sx={{
                        borderRadius: 2,
                        backgroundColor: 'white'
                      }}
                    >
                      {guiasCarga.map((guia) => (
                        <MenuItem key={guia.idGuia} value={guia.idGuia}>
                          <Box>
                            <Typography variant="body2" fontWeight="500">
                              {guia.factura_comercial}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Cliente: {guia.cliente?.razon_social} | Peso: {guia.peso_total} kg
                            </Typography>
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Cliente"
                    value={formData.GUIA_DE_CARGA_CLIENTE_idCliente}
                    onChange={(e) => handleChange("GUIA_DE_CARGA_CLIENTE_idCliente", e.target.value)}
                    size={isMobile ? "medium" : "medium"}
                    disabled
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        backgroundColor: 'rgba(0, 0, 0, 0.02)'
                      }
                    }}
                  />
                </Grid>
              </Grid>

              {/* Información de Guía de Carga Seleccionada */}
              {selectedGuia && (
                <Alert severity="info" icon={<Info />} sx={{ mt: 2, borderRadius: 2 }}>
                  <Typography variant="subtitle2" fontWeight="600" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                    Guía de Carga Seleccionada:
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                    {selectedGuia.factura_comercial} - Cliente: {selectedGuia.cliente?.razon_social}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                    Fecha: {new Date(selectedGuia.fecha_ingreso).toLocaleDateString('es-ES')} | 
                    Peso: {selectedGuia.peso_total} kg
                  </Typography>
                </Alert>
              )}
            </Paper>
          </Grid>

          {/* Información de Unidad de Carga */}
          <Grid item xs={12}>
            <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.06)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Inventory2 sx={{ mr: 1, fontSize: { xs: 20, sm: 24 }, color: 'primary.main' }} />
                <Typography 
                  variant={isMobile ? "h6" : "h5"} 
                  sx={{ 
                    fontWeight: '600',
                    fontSize: { xs: '1.125rem', sm: '1.25rem' },
                    letterSpacing: '-0.025em'
                  }}
                >
                  Unidad de Carga
                </Typography>
              </Box>
              <Divider sx={{ mb: 2, opacity: 0.3 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth error={!!errors.UNIDAD_DE_CARGA_idUnidad} size={isMobile ? "medium" : "medium"}>
                    <InputLabel>Unidad de Carga</InputLabel>
                    <Select
                      value={formData.UNIDAD_DE_CARGA_idUnidad}
                      onChange={(e) => handleChange("UNIDAD_DE_CARGA_idUnidad", e.target.value)}
                      label="Unidad de Carga"
                      disabled={!formData.GUIA_DE_CARGA_idGuia}
                      sx={{
                        borderRadius: 2,
                        backgroundColor: formData.GUIA_DE_CARGA_idGuia ? 'white' : 'rgba(0, 0, 0, 0.02)'
                      }}
                    >
                      {unidadesDisponibles.length > 0 ? (
                        unidadesDisponibles.map((unidad) => (
                          <MenuItem key={unidad.idUnidad} value={unidad.idUnidad}>
                            <Box>
                              <Typography variant="body2" fontWeight="500">
                                {unidad.idUnidad} - {unidad.tipo_unidad}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Peso: {unidad.peso_bruto} kg | {unidad.descripcion}
                              </Typography>
                            </Box>
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled>
                          <Typography variant="body2" color="text.secondary">
                            {formData.GUIA_DE_CARGA_idGuia ? "No hay unidades disponibles" : "Seleccione una guía primero"}
                          </Typography>
                        </MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              {/* Información de Unidad de Carga Seleccionada */}
              {selectedUnidadCarga && (
                <Alert severity="success" icon={<Inventory2 />} sx={{ mt: 2, borderRadius: 2 }}>
                  <Typography variant="subtitle2" fontWeight="600" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                    Unidad de Carga Seleccionada:
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                    {selectedUnidadCarga.idUnidad} - {selectedUnidadCarga.tipo_unidad}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                    Peso Bruto: {selectedUnidadCarga.peso_bruto} kg | {selectedUnidadCarga.descripcion}
                  </Typography>
                </Alert>
              )}

              {/* Información cuando no hay guía seleccionada */}
              {!formData.GUIA_DE_CARGA_idGuia && (
                <Alert severity="warning" icon={<Info />} sx={{ mt: 2, borderRadius: 2 }}>
                  <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                    Seleccione primero una Guía de Carga para ver las unidades disponibles
                  </Typography>
                </Alert>
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
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
