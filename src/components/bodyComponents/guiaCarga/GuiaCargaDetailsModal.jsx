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
  LocalShipping,
  Business,
  Scale,
  Inventory,
  Assignment,
  Edit,
  Close,
  DateRange,
  Receipt,
  PictureAsPdf,
  Visibility,
} from "@mui/icons-material";
import { unidadesCarga } from "./UnidadesCarga"; // Assuming this is still needed for data

export default function GuiaCargaDetailsModal({ 
  open, 
  onClose, 
  guia, 
  onEdit,
  isMobile = false 
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  if (!guia) return null;

  const handleEdit = () => {
    onEdit(guia);
    onClose();
  };

  const handleViewDocument = () => {
    if (guia.documento_carga) {
      window.open(guia.documento_carga, '_blank');
    }
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
            <LocalShipping sx={{ fontSize: { xs: 20, sm: 24 } }} />
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
              Guía de Carga #{guia.idGuia}
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
              {guia.factura_comercial}
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
          {/* Información Principal - Destacada */}
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
                    Factura Comercial
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
                    {guia.factura_comercial}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, mb: 0.5 }}>
                    Fecha de Ingreso
                  </Typography>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: '600',
                      fontSize: { xs: '1rem', sm: '1.125rem' },
                      color: 'text.primary'
                    }}
                  >
                    {new Date(guia.fecha_ingreso).toLocaleDateString('es-ES')}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Información del Cliente */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: { xs: 2, sm: 3 }, height: '100%', borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.06)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Business sx={{ color: 'primary.main', mr: 1, fontSize: { xs: 20, sm: 24 } }} />
                <Typography variant="h6" sx={{ fontWeight: '600', fontSize: { xs: '1rem', sm: '1.125rem' } }}>
                  Información del Cliente
                </Typography>
              </Box>
              <Divider sx={{ mb: 2, opacity: 0.3 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, mb: 0.5 }}>
                      Cliente
                    </Typography>
                    <Typography variant="body1" fontWeight="500" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                      {guia.cliente?.nombre || "N/A"}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, mb: 0.5 }}>
                      NIT
                    </Typography>
                    <Typography variant="body1" fontWeight="500" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                      {guia.cliente?.nit || "N/A"}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, mb: 0.5 }}>
                      Email
                    </Typography>
                    <Typography variant="body1" fontWeight="500" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                      {guia.cliente?.email || "N/A"}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Información de Carga */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: { xs: 2, sm: 3 }, height: '100%', borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.06)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Scale sx={{ color: 'primary.main', mr: 1, fontSize: { xs: 20, sm: 24 } }} />
                <Typography variant="h6" sx={{ fontWeight: '600', fontSize: { xs: '1rem', sm: '1.125rem' } }}>
                  Información de Carga
                </Typography>
              </Box>
              <Divider sx={{ mb: 2, opacity: 0.3 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, mb: 0.5 }}>
                      Unidades de Carga
                    </Typography>
                    <Typography variant="body1" fontWeight="500" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                      {guia.unidades_carga}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, mb: 0.5 }}>
                      Unidades de Producto
                    </Typography>
                    <Typography variant="body1" fontWeight="500" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                      {guia.unidades_producto}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, mb: 0.5 }}>
                      Peso Total
                    </Typography>
                    <Typography variant="body1" fontWeight="500" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                      {guia.peso_total} kg
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, mb: 0.5 }}>
                      Contenedores
                    </Typography>
                    <Typography variant="body1" fontWeight="500" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                      {guia.contenedores}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, mb: 0.5 }}>
                      Espacio Ocupado
                    </Typography>
                    <Typography variant="body1" fontWeight="500" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                      {guia.espacio_ocupado} m²
                    </Typography>
                  </Box>
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
              
              {guia.documento_carga ? (
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  p: 2, 
                  border: '1px solid rgba(0, 0, 0, 0.12)', 
                  borderRadius: 2,
                  backgroundColor: 'rgba(76, 175, 80, 0.04)'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PictureAsPdf sx={{ color: 'success.main', mr: 1 }} />
                    <Typography variant="body1" fontWeight="500">
                      Documento PDF disponible
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Visibility />}
                      onClick={handleViewDocument}
                      sx={{
                        fontWeight: '500',
                        borderRadius: 2,
                        textTransform: 'none',
                        letterSpacing: '0.025em',
                        borderWidth: 1.5
                      }}
                    >
                      Ver
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  p: 2, 
                  border: '1px solid rgba(0, 0, 0, 0.12)', 
                  borderRadius: 2,
                  backgroundColor: 'rgba(0, 0, 0, 0.02)'
                }}>
                  <PictureAsPdf sx={{ color: 'text.secondary', mr: 1 }} />
                  <Typography variant="body1" color="text.secondary">
                    No hay documento PDF asociado a esta guía
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Unidades de Carga */}
          <Grid item xs={12}>
            <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.06)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Inventory sx={{ color: 'primary.main', mr: 1, fontSize: { xs: 20, sm: 24 } }} />
                <Typography variant="h6" sx={{ fontWeight: '600', fontSize: { xs: '1rem', sm: '1.125rem' } }}>
                  Unidades de Carga Asociadas
                </Typography>
              </Box>
              <Divider sx={{ mb: 2, opacity: 0.3 }} />
              
              {guia.unidadesCarga && guia.unidadesCarga.length > 0 ? (
                <Grid container spacing={2}>
                  {guia.unidadesCarga.map((unidad) => (
                    <Grid item xs={12} md={6} lg={4} key={unidad.idUnidad}>
                      <Paper sx={{ 
                        p: 2, 
                        borderRadius: 2, 
                        border: '1px solid rgba(0, 0, 0, 0.06)',
                        bgcolor: 'rgba(0, 0, 0, 0.02)'
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2" fontWeight="600" color="primary.main">
                            #{unidad.idUnidad}
                          </Typography>
                          <Chip 
                            label={unidad.tipo_unidad}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: '0.75rem' }}
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
                          Peso: {unidad.peso_bruto} kg
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                          {unidad.descripcion}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Box sx={{ textAlign: 'center', py: 3 }}>
                  <Inventory sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    No hay unidades de carga asociadas
                  </Typography>
                </Box>
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
          Editar Guía
        </Button>
      </DialogActions>
    </Dialog>
  );
}
