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
  Alert,
  Chip,
  Paper,
  useTheme,
  useMediaQuery,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  InputAdornment,
  Switch,
  FormControlLabel,
  Tooltip,
  RadioGroup,
  Radio,
  FormControlLabel as MuiFormControlLabel,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import {
  Inventory,
  Category,
  Warehouse,
  Scale,
  Close,
  Save,
  Info,
  Add,
  Remove,
  ContentCopy,
  CheckCircle,
  Warning,
  CalendarToday,
  LocationOn,
  Numbers,
  Description,
  AttachMoney,
  Business,
  AddCircle,
  RemoveCircle,
  LocalShipping,
  Assignment,
  Receipt,
} from "@mui/icons-material";
import { categorias } from "./Categorias";
import { bodegas } from "./Bodegas";
import { unidadesCarga } from "../guiaCarga/UnidadesCarga";
import { guiasCarga } from "../guiaCarga/GuiasCarga";

export default function ProductoForm({ open, onClose, producto = null, onSave }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    // Información del producto (solo campos básicos)
    nombre: "",
    referencia: "",
    descripcion: "",
    peso: "",
    categoria: null,
    bodega: null,
    UNIDAD_DE_CARGA_idUnidad: "",
    
    // Configuración de existencias
    modo_existencias: "no_detallado", // "no_detallado" o "detallado"
    cantidad_total: 1,
    
    // Existencias detalladas
    existencias_detalladas: [],
  });

  const [errors, setErrors] = useState({});

  const steps = [
    'Información del Producto',
    'Agregar Existencias'
  ];

  // Función para obtener las guías de carga asociadas a una unidad de carga
  const getGuiasCargaByUnidad = (unidadId) => {
    if (!unidadId) return [];
    
    const unidad = unidadesCarga.find(u => u.idUnidad === unidadId);
    if (!unidad) return [];
    
    return guiasCarga.filter(guia => guia.idGuia === unidad.GUIA_DE_CARGA_idGuia);
  };

  // Obtener las guías de carga asociadas a la unidad seleccionada
  const guiasAsociadas = getGuiasCargaByUnidad(formData.UNIDAD_DE_CARGA_idUnidad);

  useEffect(() => {
    if (producto) {
      setFormData({
        idProducto: producto.idProducto,
        nombre: producto.nombre || "",
        referencia: producto.referencia || "",
        descripcion: producto.descripcion || "",
        peso: producto.peso || "",
        categoria: producto.categoria || null,
        bodega: producto.bodega || null,
        UNIDAD_DE_CARGA_idUnidad: producto.UNIDAD_DE_CARGA_idUnidad || "",
        modo_existencias: "no_detallado",
        cantidad_total: producto.cantidad || 1,
        existencias_detalladas: [],
      });
    } else {
      setFormData({
        nombre: "",
        referencia: "",
        descripcion: "",
        peso: "",
        categoria: null,
        bodega: null,
        UNIDAD_DE_CARGA_idUnidad: "",
        modo_existencias: "no_detallado",
        cantidad_total: 1,
        existencias_detalladas: [],
      });
    }
    setErrors({});
    setActiveStep(0);
  }, [producto, open]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const generateReference = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    const newRef = `REF-${timestamp}-${random}`.toUpperCase();
    handleChange("referencia", newRef);
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 0: // Información del producto
        if (!formData.nombre.trim()) {
          newErrors.nombre = "El nombre del producto es requerido";
        }
        if (!formData.referencia.trim()) {
          newErrors.referencia = "La referencia es requerida";
        }
        if (!formData.descripcion.trim()) {
          newErrors.descripcion = "La descripción es requerida";
        }
        if (!formData.peso || parseFloat(formData.peso) <= 0) {
          newErrors.peso = "El peso debe ser mayor a 0";
        }
        if (!formData.categoria) {
          newErrors.categoria = "La categoría es requerida";
        }
        if (!formData.bodega) {
          newErrors.bodega = "La bodega es requerida";
        }
        break;
      
      case 1: // Agregar existencias
        if (formData.modo_existencias === "no_detallado") {
          if (!formData.cantidad_total || parseInt(formData.cantidad_total) <= 0) {
            newErrors.cantidad_total = "La cantidad debe ser mayor a 0";
          }
        } else {
          if (formData.existencias_detalladas.length === 0) {
            newErrors.existencias_detalladas = "Debe agregar al menos una existencia";
          }
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    if (validateStep(activeStep)) {
      onSave(formData);
    }
  };

  const handleClose = () => {
    onClose();
  };

  const estadosExistencias = [
    { value: "NACIONALIZADO", label: "Nacionalizado", color: "success" },
    { value: "NO NACIONALIZADO", label: "No Nacionalizado", color: "warning" },
  ];

  const addExistenciaDetallada = () => {
    const nuevaExistencia = {
      id: Date.now(),
      cantidad: 1,
      estado: "NACIONALIZADO",
      ubicacion: "",
      fecha_vencimiento: "",
      lote: "",
      nacionalizada: true,
      factura_guia: "",
      observaciones: "",
    };
    
    setFormData(prev => ({
      ...prev,
      existencias_detalladas: [...prev.existencias_detalladas, nuevaExistencia]
    }));
  };

  const removeExistenciaDetallada = (id) => {
    setFormData(prev => ({
      ...prev,
      existencias_detalladas: prev.existencias_detalladas.filter(ex => ex.id !== id)
    }));
  };

  const updateExistenciaDetallada = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      existencias_detalladas: prev.existencias_detalladas.map(ex => 
        ex.id === id ? { ...ex, [field]: value } : ex
      )
    }));
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            {/* Información Principal */}
            <Grid item xs={12}>
              <Card sx={{ borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.06)' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Inventory sx={{ mr: 1, fontSize: 24, color: 'primary.main' }} />
                    <Typography variant="h6" fontWeight="600">
                      Información Principal
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 3, opacity: 0.3 }} />
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                      <TextField
                        fullWidth
                        label="Nombre del Producto"
                        value={formData.nombre}
                        onChange={(e) => handleChange("nombre", e.target.value)}
                        error={!!errors.nombre}
                        helperText={errors.nombre || "Nombre completo del producto"}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            backgroundColor: 'white'
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        label="Referencia"
                        value={formData.referencia}
                        onChange={(e) => handleChange("referencia", e.target.value)}
                        error={!!errors.referencia}
                        helperText={errors.referencia}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip title="Generar referencia automática">
                                <IconButton onClick={generateReference} size="small">
                                  <Add />
                                </IconButton>
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            backgroundColor: 'white'
                          }
                        }}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Descripción */}
            <Grid item xs={12}>
              <Card sx={{ borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.06)' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Description sx={{ mr: 1, fontSize: 24, color: 'primary.main' }} />
                    <Typography variant="h6" fontWeight="600">
                      Descripción
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 3, opacity: 0.3 }} />
                  
                  <TextField
                    fullWidth
                    label="Descripción"
                    multiline
                    rows={3}
                    value={formData.descripcion}
                    onChange={(e) => handleChange("descripcion", e.target.value)}
                    error={!!errors.descripcion}
                    helperText={errors.descripcion || "Descripción detallada del producto"}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        backgroundColor: 'white'
                      }
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>

            {/* Características */}
            <Grid item xs={12}>
              <Card sx={{ borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.06)' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Scale sx={{ mr: 1, fontSize: 24, color: 'primary.main' }} />
                    <Typography variant="h6" fontWeight="600">
                      Características
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 3, opacity: 0.3 }} />
                  
                  <TextField
                    fullWidth
                    type="number"
                    label="Peso (kg)"
                    value={formData.peso}
                    onChange={(e) => handleChange("peso", e.target.value)}
                    error={!!errors.peso}
                    helperText={errors.peso}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><Scale /></InputAdornment>,
                      endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        backgroundColor: 'white'
                      }
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>

            {/* Clasificación */}
            <Grid item xs={12}>
              <Card sx={{ borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.06)' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Category sx={{ mr: 1, fontSize: 24, color: 'primary.main' }} />
                    <Typography variant="h6" fontWeight="600">
                      Clasificación
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 3, opacity: 0.3 }} />
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth error={!!errors.categoria}>
                        <InputLabel>Categoría</InputLabel>
                        <Select
                          value={formData.categoria ? formData.categoria.idCategoria : ""}
                          onChange={(e) => {
                            const categoria = categorias.find(c => c.idCategoria === e.target.value);
                            handleChange("categoria", categoria);
                          }}
                          label="Categoría"
                          sx={{
                            borderRadius: 2,
                            backgroundColor: 'white'
                          }}
                        >
                          {categorias.map((categoria) => (
                            <MenuItem key={categoria.idCategoria} value={categoria.idCategoria}>
                              <Box>
                                <Typography variant="body1" fontWeight="500">
                                  {categoria.nombre}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {categoria.descripcion}
                                </Typography>
                              </Box>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth error={!!errors.bodega}>
                        <InputLabel>Bodega</InputLabel>
                        <Select
                          value={formData.bodega ? formData.bodega.idBodega : ""}
                          onChange={(e) => {
                            const bodega = bodegas.find(b => b.idBodega === e.target.value);
                            handleChange("bodega", bodega);
                          }}
                          label="Bodega"
                          sx={{
                            borderRadius: 2,
                            backgroundColor: 'white'
                          }}
                        >
                          {bodegas.map((bodega) => (
                            <MenuItem key={bodega.idBodega} value={bodega.idBodega}>
                              <Box>
                                <Typography variant="body1" fontWeight="500">
                                  {bodega.nombre}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {bodega.capacidad} m² • {bodega.estado}
                                </Typography>
                              </Box>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel>Unidad de Carga</InputLabel>
                        <Select
                          value={formData.UNIDAD_DE_CARGA_idUnidad}
                          onChange={(e) => handleChange("UNIDAD_DE_CARGA_idUnidad", e.target.value)}
                          label="Unidad de Carga"
                          sx={{
                            borderRadius: 2,
                            backgroundColor: 'white'
                          }}
                        >
                          {unidadesCarga.map((unidad) => (
                            <MenuItem key={unidad.idUnidad} value={unidad.idUnidad}>
                              <Box>
                                <Typography variant="body1" fontWeight="500">
                                  {unidad.tipo_unidad} #{unidad.idUnidad}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {unidad.descripcion}
                                </Typography>
                              </Box>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Guías de Carga Asociadas */}
            {formData.UNIDAD_DE_CARGA_idUnidad && guiasAsociadas.length > 0 && (
              <Grid item xs={12}>
                <Card sx={{ borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.06)' }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <LocalShipping sx={{ mr: 1, fontSize: 24, color: 'primary.main' }} />
                      <Typography variant="h6" fontWeight="600">
                        Guías de Carga Asociadas
                      </Typography>
                    </Box>
                    <Divider sx={{ mb: 3, opacity: 0.3 }} />
                    
                    <List sx={{ p: 0 }}>
                      {guiasAsociadas.map((guia) => (
                        <ListItem key={guia.idGuia} sx={{ 
                          border: '1px solid rgba(0, 0, 0, 0.08)', 
                          borderRadius: 2, 
                          mb: 1,
                          backgroundColor: 'rgba(25, 118, 210, 0.02)'
                        }}>
                          <ListItemIcon>
                            <Assignment sx={{ color: 'primary.main' }} />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Box>
                                <Typography variant="subtitle1" fontWeight="600">
                                  Guía #{guia.idGuia} - {guia.factura_comercial}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Cliente: {guia.cliente?.nombre || 'N/A'} • Fecha: {guia.fecha_ingreso}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                                  <Chip 
                                    label={`${guia.unidades_carga} unidades`} 
                                    size="small" 
                                    color="primary" 
                                    variant="outlined"
                                  />
                                  <Chip 
                                    label={`${guia.peso_total} kg`} 
                                    size="small" 
                                    color="secondary" 
                                    variant="outlined"
                                  />
                                  <Chip 
                                    label={`${guia.espacio_ocupado} m²`} 
                                    size="small" 
                                    color="info" 
                                    variant="outlined"
                                  />
                                </Box>
                              </Box>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                    
                    <Alert severity="info" sx={{ mt: 2 }}>
                      Esta unidad de carga está asociada a {guiasAsociadas.length} guía(s) de carga
                    </Alert>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            {/* Selección de Modo */}
            <Grid item xs={12}>
              <Card sx={{ borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.06)' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <AddCircle sx={{ mr: 1, fontSize: 24, color: 'primary.main' }} />
                    <Typography variant="h6" fontWeight="600">
                      Modo de Agregar Existencias
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 3, opacity: 0.3 }} />
                  
                  <RadioGroup
                    value={formData.modo_existencias}
                    onChange={(e) => handleChange("modo_existencias", e.target.value)}
                  >
                    <MuiFormControlLabel
                      value="no_detallado"
                      control={<Radio />}
                      label={
                        <Box>
                          <Typography variant="body1" fontWeight="500">
                            No Detallado
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Mismo estado para todas las existencias (ej: 100 existencias nacionalizadas)
                          </Typography>
                        </Box>
                      }
                    />
                    <MuiFormControlLabel
                      value="detallado"
                      control={<Radio />}
                      label={
                        <Box>
                          <Typography variant="body1" fontWeight="500">
                            Detallado
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Una por una con estados diferentes
                          </Typography>
                        </Box>
                      }
                    />
                  </RadioGroup>
                </CardContent>
              </Card>
            </Grid>

            {/* Modo No Detallado */}
            {formData.modo_existencias === "no_detallado" && (
              <Grid item xs={12}>
                <Card sx={{ borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.06)' }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Numbers sx={{ mr: 1, fontSize: 24, color: 'primary.main' }} />
                      <Typography variant="h6" fontWeight="600">
                        Existencias No Detalladas
                      </Typography>
                    </Box>
                    <Divider sx={{ mb: 3, opacity: 0.3 }} />
                    
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          type="number"
                          label="Cantidad Total"
                          value={formData.cantidad_total}
                          onChange={(e) => handleChange("cantidad_total", e.target.value)}
                          error={!!errors.cantidad_total}
                          helperText={errors.cantidad_total || "Número total de existencias"}
                          InputProps={{
                            startAdornment: <InputAdornment position="start"><Numbers /></InputAdornment>,
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              backgroundColor: 'white'
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                          <InputLabel>Estado de las Existencias</InputLabel>
                          <Select
                            value={formData.estado_existencias || "NACIONALIZADO"}
                            onChange={(e) => handleChange("estado_existencias", e.target.value)}
                            label="Estado de las Existencias"
                            sx={{
                              borderRadius: 2,
                              backgroundColor: 'white'
                            }}
                          >
                            {estadosExistencias.map((estado) => (
                              <MenuItem key={estado.value} value={estado.value}>
                                {estado.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    
                    <Alert severity="info" sx={{ mt: 2 }}>
                      Se crearán {formData.cantidad_total} existencias con el estado: {formData.estado_existencias || "NACIONALIZADO"}
                    </Alert>
                  </CardContent>
                </Card>
              </Grid>
            )}

            {/* Modo Detallado */}
            {formData.modo_existencias === "detallado" && (
              <Grid item xs={12}>
                <Card sx={{ borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.06)' }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AddCircle sx={{ mr: 1, fontSize: 24, color: 'primary.main' }} />
                        <Typography variant="h6" fontWeight="600">
                          Existencias Detalladas
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={addExistenciaDetallada}
                        sx={{ borderRadius: 2 }}
                      >
                        Agregar Existencia
                      </Button>
                    </Box>
                    <Divider sx={{ mb: 3, opacity: 0.3 }} />
                    
                    {formData.existencias_detalladas.length === 0 ? (
                      <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="body1" color="text.secondary">
                          No hay existencias agregadas. Haz clic en &quot;Agregar Existencia&quot; para comenzar.
                        </Typography>
                      </Box>
                    ) : (
                      <Grid container spacing={2}>
                        {formData.existencias_detalladas.map((existencia, index) => (
                          <Grid item xs={12} key={existencia.id}>
                            <Card sx={{ border: '1px solid rgba(0, 0, 0, 0.08)', borderRadius: 2 }}>
                              <CardContent sx={{ p: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                                  <Typography variant="subtitle1" fontWeight="600">
                                    Existencia #{index + 1}
                                  </Typography>
                                  <IconButton
                                    onClick={() => removeExistenciaDetallada(existencia.id)}
                                    color="error"
                                    size="small"
                                  >
                                    <RemoveCircle />
                                  </IconButton>
                                </Box>
                                
                                <Grid container spacing={2}>
                                  <Grid item xs={12} md={6}>
                                    <TextField
                                      fullWidth
                                      size="small"
                                      type="number"
                                      label="Cantidad"
                                      value={existencia.cantidad}
                                      onChange={(e) => updateExistenciaDetallada(existencia.id, "cantidad", e.target.value)}
                                      InputProps={{
                                        startAdornment: <InputAdornment position="start"><Numbers /></InputAdornment>,
                                      }}
                                    />
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    <FormControl fullWidth size="small">
                                      <InputLabel>Estado</InputLabel>
                                      <Select
                                        value={existencia.estado}
                                        onChange={(e) => updateExistenciaDetallada(existencia.id, "estado", e.target.value)}
                                        label="Estado"
                                      >
                                        {estadosExistencias.map((estado) => (
                                          <MenuItem key={estado.value} value={estado.value}>
                                            {estado.label}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    </FormControl>
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    <TextField
                                      fullWidth
                                      size="small"
                                      label="Ubicación"
                                      value={existencia.ubicacion}
                                      onChange={(e) => updateExistenciaDetallada(existencia.id, "ubicacion", e.target.value)}
                                      placeholder="Ej: Estante A-1, Nivel 2"
                                    />
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    <TextField
                                      fullWidth
                                      size="small"
                                      label="Lote"
                                      value={existencia.lote}
                                      onChange={(e) => updateExistenciaDetallada(existencia.id, "lote", e.target.value)}
                                      placeholder="Ej: LOT-2024-001"
                                    />
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    <TextField
                                      fullWidth
                                      size="small"
                                      type="date"
                                      label="Fecha de Vencimiento"
                                      value={existencia.fecha_vencimiento}
                                      onChange={(e) => updateExistenciaDetallada(existencia.id, "fecha_vencimiento", e.target.value)}
                                      InputLabelProps={{ shrink: true }}
                                    />
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    <FormControlLabel
                                      control={
                                        <Switch
                                          checked={existencia.nacionalizada}
                                          onChange={(e) => updateExistenciaDetallada(existencia.id, "nacionalizada", e.target.checked)}
                                          color="primary"
                                          size="small"
                                        />
                                      }
                                      label="Nacionalizada"
                                    />
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    <TextField
                                      fullWidth
                                      size="small"
                                      label="Factura/Guía"
                                      value={existencia.factura_guia}
                                      onChange={(e) => updateExistenciaDetallada(existencia.id, "factura_guia", e.target.value)}
                                      placeholder="Ej: FC-2024-001"
                                    />
                                  </Grid>
                                  <Grid item xs={12}>
                                    <TextField
                                      fullWidth
                                      size="small"
                                      label="Observaciones"
                                      value={existencia.observaciones}
                                      onChange={(e) => updateExistenciaDetallada(existencia.id, "observaciones", e.target.value)}
                                      multiline
                                      rows={2}
                                    />
                                  </Grid>
                                </Grid>
                              </CardContent>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    )}
                    
                    {errors.existencias_detalladas && (
                      <Alert severity="error" sx={{ mt: 2 }}>
                        {errors.existencias_detalladas}
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>
        );

      default:
        return null;
    }
  };

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
            <Inventory sx={{ fontSize: { xs: 20, sm: 24 } }} />
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
              {producto ? "Editar Producto" : "Nuevo Producto"}
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
              {producto ? `Referencia: ${producto.referencia}` : "Crear nuevo producto con existencias"}
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

      {/* Stepper */}
      {!isMobile && (
        <Box sx={{ p: { xs: 2, sm: 3 }, backgroundColor: 'rgba(0, 0, 0, 0.01)' }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      )}

      <DialogContent sx={{ 
        pt: { xs: 2, sm: 3 },
        px: { xs: 2, sm: 3 },
        pb: { xs: 2, sm: 3 },
        backgroundColor: 'rgba(0, 0, 0, 0.01)'
      }}>
        {renderStepContent(activeStep)}
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
        
        {activeStep > 0 && (
          <Button 
            onClick={handleBack} 
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
            Atrás
          </Button>
        )}
        
        {activeStep < steps.length - 1 ? (
          <Button 
            onClick={handleNext} 
            variant="contained" 
            color="primary"
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
            Siguiente
          </Button>
        ) : (
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
        )}
      </DialogActions>
    </Dialog>
  );
}
