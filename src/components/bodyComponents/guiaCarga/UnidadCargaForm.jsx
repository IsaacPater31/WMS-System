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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Paper,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Inventory,
  Close,
  Save,
  Scale,
} from "@mui/icons-material";

export default function UnidadCargaForm({ 
  open, 
  onClose, 
  unidad = null, 
  onSave, 
  guiaId,
  existingUnidades = []
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  
  const [formData, setFormData] = useState({
    idUnidad: "",
    tipo_unidad: "",
    peso_bruto: "",
    descripcion: "",
    GUIA_DE_CARGA_idGuia: guiaId,
  });

  const [errors, setErrors] = useState({});

  // Generar ID único automáticamente
  const generateUniqueId = () => {
    if (existingUnidades.length === 0) {
      return "UC-001";
    }
    
    // Extraer números de los IDs existentes
    const numbers = existingUnidades
      .map(u => {
        const match = u.idUnidad.match(/UC-(\d+)/);
        return match ? parseInt(match[1]) : 0;
      })
      .filter(num => !isNaN(num));
    
    const maxNumber = Math.max(...numbers, 0);
    const nextNumber = maxNumber + 1;
    
    return `UC-${nextNumber.toString().padStart(3, '0')}`;
  };

  useEffect(() => {
    if (unidad) {
      // Modo edición
      setFormData({
        idUnidad: unidad.idUnidad,
        tipo_unidad: unidad.tipo_unidad || "",
        peso_bruto: unidad.peso_bruto || "",
        descripcion: unidad.descripcion || "",
        GUIA_DE_CARGA_idGuia: guiaId,
      });
    } else {
      // Modo creación
      setFormData({
        idUnidad: generateUniqueId(),
        tipo_unidad: "",
        peso_bruto: "",
        descripcion: "",
        GUIA_DE_CARGA_idGuia: guiaId,
      });
    }
    setErrors({});
  }, [unidad, open, guiaId, existingUnidades]);

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.idUnidad.trim()) {
      newErrors.idUnidad = "El ID de unidad es requerido";
    }

    if (!formData.tipo_unidad.trim()) {
      newErrors.tipo_unidad = "El tipo de unidad es requerido";
    }

    if (!formData.peso_bruto.trim()) {
      newErrors.peso_bruto = "El peso bruto es requerido";
    } else if (isNaN(formData.peso_bruto) || parseFloat(formData.peso_bruto) <= 0) {
      newErrors.peso_bruto = "El peso debe ser un número mayor a 0";
    }

    if (!formData.descripcion.trim()) {
      newErrors.descripcion = "La descripción es requerida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  const tiposUnidad = [
    "Pallet",
    "Caja",
    "Contenedor",
    "Contenedor Refrigerado",
    "Tambor",
    "Saco",
    "Otro"
  ];

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
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
            <Inventory sx={{ fontSize: { xs: 20, sm: 24 } }} />
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography 
              variant={fullScreen ? "h6" : "h5"} 
              sx={{ 
                fontWeight: "600",
                fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.5rem' },
                letterSpacing: '-0.025em',
                lineHeight: 1.2
              }}
            >
              {unidad ? "Editar Unidad de Carga" : "Nueva Unidad de Carga"}
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
              {unidad ? "Modifica la información de la unidad" : "Completa la información de la nueva unidad"}
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
                <Inventory sx={{ color: 'primary.main', mr: 1, fontSize: { xs: 20, sm: 24 } }} />
                <Typography variant="h6" sx={{ fontWeight: '600', fontSize: { xs: '1rem', sm: '1.125rem' } }}>
                  Información de la Unidad
                </Typography>
              </Box>
              <Divider sx={{ mb: 2, opacity: 0.3 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="ID de Unidad"
                    value={formData.idUnidad}
                    onChange={handleChange("idUnidad")}
                    error={!!errors.idUnidad}
                    helperText={errors.idUnidad || "Identificador único de la unidad"}
                    variant="outlined"
                    size={fullScreen ? "large" : "medium"}
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
                  <FormControl fullWidth error={!!errors.tipo_unidad}>
                    <InputLabel>Tipo de Unidad</InputLabel>
                    <Select
                      value={formData.tipo_unidad}
                      label="Tipo de Unidad"
                      onChange={handleChange("tipo_unidad")}
                      size={fullScreen ? "large" : "medium"}
                      sx={{
                        borderRadius: 2,
                        '& .MuiOutlinedInput-notchedOutline': {
                          '&:hover': {
                            borderColor: 'primary.main',
                          },
                        },
                      }}
                    >
                      {tiposUnidad.map((tipo) => (
                        <MenuItem key={tipo} value={tipo}>
                          {tipo}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.tipo_unidad && (
                      <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                        {errors.tipo_unidad}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Información de Peso */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: { xs: 2, sm: 3 }, height: '100%', borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.06)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Scale sx={{ color: 'primary.main', mr: 1, fontSize: { xs: 20, sm: 24 } }} />
                <Typography variant="h6" sx={{ fontWeight: '600', fontSize: { xs: '1rem', sm: '1.125rem' } }}>
                  Información de Peso
                </Typography>
              </Box>
              <Divider sx={{ mb: 2, opacity: 0.3 }} />
              
              <TextField
                fullWidth
                label="Peso Bruto (kg)"
                type="number"
                value={formData.peso_bruto}
                onChange={handleChange("peso_bruto")}
                error={!!errors.peso_bruto}
                helperText={errors.peso_bruto || "Peso en kilogramos"}
                variant="outlined"
                size={fullScreen ? "large" : "medium"}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Paper>
          </Grid>

          {/* Información de Descripción */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: { xs: 2, sm: 3 }, height: '100%', borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.06)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Inventory sx={{ color: 'primary.main', mr: 1, fontSize: { xs: 20, sm: 24 } }} />
                <Typography variant="h6" sx={{ fontWeight: '600', fontSize: { xs: '1rem', sm: '1.125rem' } }}>
                  Descripción
                </Typography>
              </Box>
              <Divider sx={{ mb: 2, opacity: 0.3 }} />
              
              <TextField
                fullWidth
                label="Descripción de la Unidad"
                value={formData.descripcion}
                onChange={handleChange("descripcion")}
                error={!!errors.descripcion}
                helperText={errors.descripcion || "Describe el contenido o características de la unidad"}
                variant="outlined"
                multiline
                rows={4}
                size={fullScreen ? "large" : "medium"}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
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
            '&:hover': {
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)'
            }
          }}
        >
          {unidad ? "Actualizar" : "Crear"} Unidad
        </Button>
      </DialogActions>
    </Dialog>
  );
}
