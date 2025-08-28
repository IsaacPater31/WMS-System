import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
  Box,
  Avatar,
  Chip,
  Divider,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Inventory,
  Category,
  Warehouse,
  Scale,
  Edit,
  Close,
  Assignment,
  QrCode,
  LocationOn,
  LocalShipping,
  Inventory2,
} from "@mui/icons-material";
import { unidadesCarga } from "../guiaCarga/UnidadesCarga";

export default function ExistenciaDetailsModal({ open, onClose, existencia, onEdit }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!existencia) return null;

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'NACIONALIZADO':
        return 'success';
      case 'NO_NACIONALIZADO':
        return 'warning';
      default:
        return 'default';
    }
  };

  // Buscar la unidad de carga asociada
  const unidadCarga = existencia.UNIDAD_DE_CARGA_idUnidad 
    ? unidadesCarga.find(u => u.idUnidad === existencia.UNIDAD_DE_CARGA_idUnidad)
    : null;

  const handleEdit = () => {
    onEdit(existencia);
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="lg" 
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
          <Avatar
            sx={{ 
              width: { xs: 40, sm: 48 }, 
              height: { xs: 40, sm: 48 }, 
              backgroundColor: 'rgba(25, 118, 210, 0.08)',
              color: 'primary.main',
              mr: { xs: 1, sm: 2 },
              borderRadius: 2
            }}
          >
            <QrCode sx={{ fontSize: { xs: 20, sm: 24 } }} />
          </Avatar>
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
              {existencia.producto?.nombre || "Existencia"}
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
              Serial: {existencia.serial}
            </Typography>
          </Box>
        </Box>
        <Button
          onClick={onClose}
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
          {/* Estado y Serial - Destacado */}
          <Grid item xs={12}>
            <Paper sx={{ 
              p: { xs: 2, sm: 3 }, 
              mb: { xs: 2, sm: 3 }, 
              bgcolor: 'white',
              borderRadius: 3,
              border: '1px solid rgba(0, 0, 0, 0.06)',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, mb: 0.5 }}>
                    Estado Actual
                  </Typography>
                  <Chip 
                    label={existencia.estado?.replace('_', ' ') || "Sin estado"}
                    color={getEstadoColor(existencia.estado)}
                    variant="outlined"
                    size={isMobile ? "small" : "medium"}
                    sx={{ 
                      fontWeight: '600',
                      borderWidth: 2,
                      fontSize: { xs: '0.75rem', sm: '0.875rem' }
                    }}
                  />
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, mb: 0.5 }}>
                    Serial Único
                  </Typography>
                  <Typography 
                    variant="h6" 
                    fontFamily="monospace"
                    sx={{ 
                      fontWeight: '600',
                      fontSize: { xs: '1rem', sm: '1.125rem' },
                      color: 'primary.main',
                      letterSpacing: '0.025em'
                    }}
                  >
                    {existencia.serial}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Información del Producto */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: { xs: 2, sm: 3 }, height: '100%', borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.06)' }}>
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
                  Producto
                </Typography>
              </Box>
              <Divider sx={{ mb: 2, opacity: 0.3 }} />
              
              <Box sx={{ space: 2 }}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, mb: 0.5 }}>
                    Nombre
                  </Typography>
                  <Typography variant="body1" fontWeight="500" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                    {existencia.producto?.nombre || "N/A"}
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, mb: 0.5 }}>
                    Referencia
                  </Typography>
                  <Typography variant="body1" fontWeight="500" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                    {existencia.producto?.referencia || "N/A"}
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, mb: 0.5 }}>
                    Categoría
                  </Typography>
                  <Typography variant="body1" fontWeight="500" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                    {existencia.producto?.categoria?.nombre || "Sin categoría"}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, mb: 0.5 }}>
                    Peso Unitario
                  </Typography>
                  <Typography variant="body1" fontWeight="500" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                    {existencia.producto?.peso || 0} kg
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Información de Ubicación */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: { xs: 2, sm: 3 }, height: '100%', borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.06)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOn sx={{ mr: 1, fontSize: { xs: 20, sm: 24 }, color: 'primary.main' }} />
                <Typography 
                  variant={isMobile ? "h6" : "h5"} 
                  sx={{ 
                    fontWeight: '600',
                    fontSize: { xs: '1.125rem', sm: '1.25rem' },
                    letterSpacing: '-0.025em'
                  }}
                >
                  Ubicación
                </Typography>
              </Box>
              <Divider sx={{ mb: 2, opacity: 0.3 }} />
              
              <Box sx={{ space: 2 }}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, mb: 0.5 }}>
                    Bodega
                  </Typography>
                  <Typography variant="body1" fontWeight="500" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                    {existencia.bodega?.nombre || "N/A"}
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, mb: 0.5 }}>
                    Capacidad
                  </Typography>
                  <Typography variant="body1" fontWeight="500" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                    {existencia.bodega?.capacidad || 0} m²
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, mb: 0.5 }}>
                    Cliente Propietario
                  </Typography>
                  <Typography variant="body1" fontWeight="500" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                    {existencia.cliente?.razon_social || "N/A"}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, mb: 0.5 }}>
                    NIT
                  </Typography>
                  <Typography variant="body1" fontWeight="500" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                    {existencia.cliente?.nit || "Sin NIT"}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Información de Carga */}
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
                  Información de Carga
                </Typography>
              </Box>
              <Divider sx={{ mb: 2, opacity: 0.3 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, mb: 0.5 }}>
                      Guía de Carga
                    </Typography>
                    <Typography variant="body1" fontWeight="500" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                      {existencia.guiaCarga?.factura_comercial || "N/A"}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, mb: 0.5 }}>
                      Peso Total Guía
                    </Typography>
                    <Typography variant="body1" fontWeight="500" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                      {existencia.guiaCarga?.peso_total || 0} kg
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, mb: 0.5 }}>
                      Fecha de Ingreso
                    </Typography>
                    <Typography variant="body1" fontWeight="500" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                      {existencia.guiaCarga?.fecha_ingreso ? 
                        new Date(existencia.guiaCarga.fecha_ingreso).toLocaleDateString('es-ES') : 
                        "N/A"
                      }
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Información de Unidad de Carga */}
          {unidadCarga && (
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
                  <Grid item xs={12} md={3}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, mb: 0.5 }}>
                        ID Unidad
                      </Typography>
                      <Typography variant="body1" fontWeight="500" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                        {unidadCarga.idUnidad}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, mb: 0.5 }}>
                        Tipo de Unidad
                      </Typography>
                      <Typography variant="body1" fontWeight="500" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                        {unidadCarga.tipo_unidad}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, mb: 0.5 }}>
                        Peso Bruto
                      </Typography>
                      <Typography variant="body1" fontWeight="500" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                        {unidadCarga.peso_bruto} kg
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, mb: 0.5 }}>
                        Descripción
                      </Typography>
                      <Typography variant="body1" fontWeight="500" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                        {unidadCarga.descripcion}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          )}
        </Grid>
      </DialogContent>

      <DialogActions sx={{ 
        p: { xs: 2, sm: 3 },
        borderTop: '1px solid rgba(0, 0, 0, 0.06)',
        backgroundColor: 'rgba(0, 0, 0, 0.02)',
        gap: 1
      }}>
        <Button 
          onClick={onClose} 
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
          Cerrar
        </Button>
        <Button 
          onClick={handleEdit} 
          variant="contained" 
          color="primary"
          startIcon={<Edit />}
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
          Editar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
