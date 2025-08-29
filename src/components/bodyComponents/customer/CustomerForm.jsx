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
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Business,
  Person,
  Email,
  Phone,
  LocationOn,
  Close,
  Save,
} from "@mui/icons-material";

export default function CustomerForm({ open, onClose, customer = null, onSave, isMobile = false }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  
  const [formData, setFormData] = useState({
    nombre: "",
    razon_social: "",
    nit: "",
    direccion: "",
    representante_legal: "",
    email: "",
    telefono: "",
    encargado: "",
    tel_encargado: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (customer) {
      setFormData({
        idCliente: customer.idCliente,
        nombre: customer.nombre || "",
        razon_social: customer.razon_social || "",
        nit: customer.nit || "",
        direccion: customer.direccion || "",
        representante_legal: customer.representante_legal || "",
        email: customer.email || "",
        telefono: customer.telefono || "",
        encargado: customer.encargado || "",
        tel_encargado: customer.tel_encargado || "",
      });
    } else {
      setFormData({
        nombre: "",
        razon_social: "",
        nit: "",
        direccion: "",
        representante_legal: "",
        email: "",
        telefono: "",
        encargado: "",
        tel_encargado: "",
      });
    }
    setErrors({});
  }, [customer, open]);

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

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
    }

    if (!formData.razon_social.trim()) {
      newErrors.razon_social = "La razón social es requerida";
    }

    if (!formData.nit.trim()) {
      newErrors.nit = "El NIT es requerido";
    } else if (!/^\d{9,10}-\d$/.test(formData.nit)) {
      newErrors.nit = "Formato de NIT inválido (ej: 123456789-0)";
    }

    if (!formData.direccion.trim()) {
      newErrors.direccion = "La dirección es requerida";
    }

    if (!formData.representante_legal.trim()) {
      newErrors.representante_legal = "El representante legal es requerido";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Formato de email inválido";
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = "El teléfono es requerido";
    }

    if (!formData.encargado.trim()) {
      newErrors.encargado = "El encargado es requerido";
    }

    if (!formData.tel_encargado.trim()) {
      newErrors.tel_encargado = "El teléfono del encargado es requerido";
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
            <Business sx={{ fontSize: { xs: 20, sm: 24 } }} />
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
              {customer ? "Editar Cliente" : "Nuevo Cliente"}
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
              {customer ? "Modifica la información del cliente" : "Completa la información del nuevo cliente"}
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
                <Business sx={{ color: 'primary.main', mr: 1, fontSize: { xs: 20, sm: 24 } }} />
                <Typography variant="h6" sx={{ fontWeight: '600', fontSize: { xs: '1rem', sm: '1.125rem' } }}>
                  Información Principal
                </Typography>
              </Box>
              <Divider sx={{ mb: 2, opacity: 0.3 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Nombre de la Empresa"
                    value={formData.nombre}
                    onChange={handleChange("nombre")}
                    error={!!errors.nombre}
                    helperText={errors.nombre}
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
                    label="Razón Social"
                    value={formData.razon_social}
                    onChange={handleChange("razon_social")}
                    error={!!errors.razon_social}
                    helperText={errors.razon_social}
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
                    label="NIT"
                    value={formData.nit}
                    onChange={handleChange("nit")}
                    error={!!errors.nit}
                    helperText={errors.nit || "Formato: 123456789-0"}
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
                    label="Representante Legal"
                    value={formData.representante_legal}
                    onChange={handleChange("representante_legal")}
                    error={!!errors.representante_legal}
                    helperText={errors.representante_legal}
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

          {/* Información de Contacto */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: { xs: 2, sm: 3 }, height: '100%', borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.06)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Person sx={{ color: 'primary.main', mr: 1, fontSize: { xs: 20, sm: 24 } }} />
                <Typography variant="h6" sx={{ fontWeight: '600', fontSize: { xs: '1rem', sm: '1.125rem' } }}>
                  Información de Contacto
                </Typography>
              </Box>
              <Divider sx={{ mb: 2, opacity: 0.3 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange("email")}
                    error={!!errors.email}
                    helperText={errors.email}
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
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Teléfono"
                    value={formData.telefono}
                    onChange={handleChange("telefono")}
                    error={!!errors.telefono}
                    helperText={errors.telefono}
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
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Encargado"
                    value={formData.encargado}
                    onChange={handleChange("encargado")}
                    error={!!errors.encargado}
                    helperText={errors.encargado}
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
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Teléfono del Encargado"
                    value={formData.tel_encargado}
                    onChange={handleChange("tel_encargado")}
                    error={!!errors.tel_encargado}
                    helperText={errors.tel_encargado}
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

          {/* Información de Ubicación */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: { xs: 2, sm: 3 }, height: '100%', borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.06)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOn sx={{ color: 'primary.main', mr: 1, fontSize: { xs: 20, sm: 24 } }} />
                <Typography variant="h6" sx={{ fontWeight: '600', fontSize: { xs: '1rem', sm: '1.125rem' } }}>
                  Información de Ubicación
                </Typography>
              </Box>
              <Divider sx={{ mb: 2, opacity: 0.3 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Dirección"
                    value={formData.direccion}
                    onChange={handleChange("direccion")}
                    error={!!errors.direccion}
                    helperText={errors.direccion}
                    variant="outlined"
                    multiline
                    rows={4}
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
          {customer ? "Actualizar" : "Crear"} Cliente
        </Button>
      </DialogActions>
    </Dialog>
  );
}
