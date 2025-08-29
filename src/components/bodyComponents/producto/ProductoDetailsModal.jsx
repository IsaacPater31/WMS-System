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
} from "@mui/icons-material";
import ExistenciasModal from "./ExistenciasModal";

export default function ProductoDetailsModal({ open, onClose, producto, onEdit, isMobile = false }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  
  const [existenciasModalOpen, setExistenciasModalOpen] = React.useState(false);
  const [tipoFiltroExistencias, setTipoFiltroExistencias] = React.useState("TODAS");

  if (!producto) return null;

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'DISPONIBLE':
        return 'success';
      case 'RESERVADO':
        return 'warning';
      case 'VENDIDO':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleEdit = () => {
    onEdit(producto);
    onClose();
  };

  const handleCantidadClick = (tipo) => {
    setTipoFiltroExistencias(tipo);
    setExistenciasModalOpen(true);
  };

  const handleCloseExistenciasModal = () => {
    setExistenciasModalOpen(false);
  };

  return (
    <>
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
            <Inventory sx={{ fontSize: { xs: 20, sm: 24 } }} />
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
              {producto.nombre}
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
              Referencia: {producto.referencia}
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
                    Referencia
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
                    {producto.referencia}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, mb: 0.5 }}>
                    ID Producto
                  </Typography>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: '600',
                      fontSize: { xs: '1rem', sm: '1.125rem' },
                      color: 'text.primary'
                    }}
                  >
                    #{producto.idProducto}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Información del Producto */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: { xs: 2, sm: 3 }, height: '100%', borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.06)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Inventory sx={{ color: 'primary.main', mr: 1, fontSize: { xs: 20, sm: 24 } }} />
                <Typography variant="h6" sx={{ fontWeight: '600', fontSize: { xs: '1rem', sm: '1.125rem' } }}>
                  Información del Producto
                </Typography>
              </Box>
              <Divider sx={{ mb: 2, opacity: 0.3 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, mb: 0.5 }}>
                      Nombre
                    </Typography>
                    <Typography variant="body1" fontWeight="500" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                      {producto.nombre}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, mb: 0.5 }}>
                      Categoría
                    </Typography>
                    <Typography variant="body1" fontWeight="500" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                      {producto.categoria?.nombre || "N/A"}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, mb: 0.5 }}>
                      Bodega
                    </Typography>
                    <Typography variant="body1" fontWeight="500" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                      {producto.bodega?.nombre || "N/A"}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, mb: 0.5 }}>
                      Peso
                    </Typography>
                    <Typography variant="body1" fontWeight="500" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                      {producto.peso} kg
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, mb: 0.5 }}>
                      Unidad de Carga
                    </Typography>
                    <Typography variant="body1" fontWeight="500" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                      {producto.UNIDAD_DE_CARGA_idUnidad || "N/A"}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Información de Inventario */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: { xs: 2, sm: 3 }, height: '100%', borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.06)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Scale sx={{ color: 'primary.main', mr: 1, fontSize: { xs: 20, sm: 24 } }} />
                <Typography variant="h6" sx={{ fontWeight: '600', fontSize: { xs: '1rem', sm: '1.125rem' } }}>
                  Información de Inventario
                </Typography>
              </Box>
              <Divider sx={{ mb: 2, opacity: 0.3 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Box 
                    onClick={() => handleCantidadClick("TODAS")}
                    sx={{ 
                      cursor: 'pointer',
                      p: 1,
                      borderRadius: 1,
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        backgroundColor: 'rgba(25, 118, 210, 0.04)',
                        transform: 'translateY(-1px)'
                      }
                    }}
                  >
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, mb: 0.5 }}>
                      Cantidad Total
                    </Typography>
                    <Typography variant="body1" fontWeight="500" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' }, color: 'primary.main' }}>
                      {producto.cantidad || 0}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box 
                    onClick={() => handleCantidadClick("NACIONALIZADO")}
                    sx={{ 
                      cursor: 'pointer',
                      p: 1,
                      borderRadius: 1,
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        backgroundColor: 'rgba(76, 175, 80, 0.04)',
                        transform: 'translateY(-1px)'
                      }
                    }}
                  >
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, mb: 0.5 }}>
                      Nacionalizado
                    </Typography>
                    <Typography variant="body1" fontWeight="500" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' }, color: 'success.main' }}>
                      {producto.cantidad_nacionalizado || 0}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box 
                    onClick={() => handleCantidadClick("NO_NACIONALIZADO")}
                    sx={{ 
                      cursor: 'pointer',
                      p: 1,
                      borderRadius: 1,
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 152, 0, 0.04)',
                        transform: 'translateY(-1px)'
                      }
                    }}
                  >
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, mb: 0.5 }}>
                      No Nacionalizado
                    </Typography>
                    <Typography variant="body1" fontWeight="500" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' }, color: 'warning.main' }}>
                      {producto.cantidad_no_nacionalizado || 0}
                    </Typography>
                  </Box>
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
          Editar Producto
        </Button>
      </DialogActions>
    </Dialog>

    {/* Modal de Existencias */}
    <ExistenciasModal
      open={existenciasModalOpen}
      onClose={handleCloseExistenciasModal}
      producto={producto}
      tipoFiltro={tipoFiltroExistencias}
      isMobile={isMobile}
    />
    </>
  );
}
