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
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  SwapHoriz,
  Assignment,
  Business,
  Edit,
  Close,
  CalendarToday,
  TrendingUp,
  PictureAsPdf,
  Visibility,
} from "@mui/icons-material";

export default function MovimientoDetailsModal({ open, onClose, movimiento, onEdit, isMobile = false }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  
  if (!movimiento) return null;

  const getTipoColor = (tipo) => {
    switch (tipo) {
      case 'INGRESO':
        return 'success';
      case 'SALIDA':
        return 'error';
      case 'TRANSFERENCIA':
        return 'warning';
      case 'AJUSTE':
        return 'info';
      default:
        return 'default';
    }
  };

  const handleEdit = () => {
    onEdit(movimiento);
    onClose();
  };

  const handleViewDocument = () => {
    if (movimiento.documento_movimiento) {
      window.open(movimiento.documento_movimiento, '_blank');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
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
      <DialogTitle sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        p: { xs: 2, sm: 3 },
        borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
        backgroundColor: 'rgba(0, 0, 0, 0.02)'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SwapHoriz sx={{ color: 'primary.main', mr: 2, fontSize: { xs: 24, sm: 28 } }} />
          <Typography variant="h5" sx={{ fontWeight: '600', fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
            Detalles del Movimiento
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
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
          {/* Información Principal */}
          <Grid item xs={12}>
            <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.06)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  sx={{ 
                    width: 48, 
                    height: 48, 
                    mr: 2,
                    backgroundColor: 'rgba(25, 118, 210, 0.08)',
                    color: 'primary.main',
                    borderRadius: 2
                  }}
                >
                  <SwapHoriz sx={{ fontSize: 24 }} />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: '600', mb: 0.5 }}>
                    Movimiento #{movimiento.idMovimiento}
                  </Typography>
                  <Chip 
                    label={movimiento.tipo} 
                    color={getTipoColor(movimiento.tipo)}
                    variant="outlined"
                    sx={{ fontWeight: '500', fontSize: '0.875rem' }}
                  />
                </Box>
              </Box>
              <Divider sx={{ mb: 2, opacity: 0.3 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
                      Cantidad
                    </Typography>
                    <Typography variant="body1" fontWeight="500" color="primary.main">
                      {movimiento.cantidad} unidades
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
                      Fecha del Movimiento
                    </Typography>
                    <Typography variant="body1" fontWeight="500">
                      {formatDate(movimiento.fecha_movimiento)}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Información del Producto */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.06)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Business sx={{ color: 'primary.main', mr: 1, fontSize: { xs: 20, sm: 24 } }} />
                <Typography variant="h6" sx={{ fontWeight: '600', fontSize: { xs: '1rem', sm: '1.125rem' } }}>
                  Producto
                </Typography>
              </Box>
              <Divider sx={{ mb: 2, opacity: 0.3 }} />
              {movimiento.producto ? (
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Avatar
                      sx={{ 
                        width: 32, 
                        height: 32, 
                        mr: 1,
                        backgroundColor: 'rgba(25, 118, 210, 0.08)',
                        color: 'primary.main',
                        borderRadius: 1
                      }}
                    >
                      <Business sx={{ fontSize: 16 }} />
                    </Avatar>
                    <Typography variant="body1" fontWeight="600" color="primary.main">
                      {movimiento.producto.idProducto}
                    </Typography>
                  </Box>
                  <Typography variant="body1" fontWeight="500" sx={{ mb: 1 }}>
                    {movimiento.producto.nombre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Referencia: {movimiento.producto.referencia}
                  </Typography>
                  <Chip 
                    label={movimiento.producto.estado} 
                    color={movimiento.producto.estado === "NACIONALIZADO" ? "success" : "warning"}
                    size="small"
                    variant="outlined"
                    sx={{ fontWeight: '500', fontSize: '0.75rem' }}
                  />
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Producto no encontrado
                </Typography>
              )}
            </Paper>
          </Grid>

          {/* Información de la Guía de Carga */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, border: '1px solid rgba(0, 0, 0, 0.06)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Assignment sx={{ color: 'primary.main', mr: 1, fontSize: { xs: 20, sm: 24 } }} />
                <Typography variant="h6" sx={{ fontWeight: '600', fontSize: { xs: '1rem', sm: '1.125rem' } }}>
                  Guía de Carga
                </Typography>
              </Box>
              <Divider sx={{ mb: 2, opacity: 0.3 }} />
              {movimiento.guiaCarga ? (
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Avatar
                      sx={{ 
                        width: 32, 
                        height: 32, 
                        mr: 1,
                        backgroundColor: 'rgba(25, 118, 210, 0.08)',
                        color: 'primary.main',
                        borderRadius: 1
                      }}
                    >
                      <Assignment sx={{ fontSize: 16 }} />
                    </Avatar>
                    <Typography variant="body1" fontWeight="600" color="primary.main">
                      {movimiento.guiaCarga.idGuia}
                    </Typography>
                  </Box>
                  <Typography variant="body1" fontWeight="500" sx={{ mb: 1 }}>
                    {movimiento.guiaCarga.factura_comercial}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Cliente: {movimiento.guiaCarga.cliente?.nombre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Fecha: {formatDate(movimiento.guiaCarga.fecha_ingreso)}
                  </Typography>
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Guía de carga no encontrada
                </Typography>
              )}
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
              {movimiento.documento_movimiento ? (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, border: '1px solid rgba(0, 0, 0, 0.12)', borderRadius: 2, backgroundColor: 'rgba(76, 175, 80, 0.04)' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PictureAsPdf sx={{ color: 'success.main', mr: 1 }} />
                    <Typography variant="body1" fontWeight="500">
                      Documento PDF disponible
                    </Typography>
                  </Box>
                  <Tooltip title="Ver documento">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={handleViewDocument}
                      sx={{
                        backgroundColor: 'rgba(25, 118, 210, 0.08)',
                        '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.12)' }
                      }}
                    >
                      <Visibility sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Tooltip>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', p: 2, border: '1px solid rgba(0, 0, 0, 0.12)', borderRadius: 2, backgroundColor: 'rgba(0, 0, 0, 0.02)' }}>
                  <PictureAsPdf sx={{ color: 'text.secondary', mr: 1 }} />
                  <Typography variant="body1" color="text.secondary">
                    No hay documento PDF asociado a este movimiento
                  </Typography>
                </Box>
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
              <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                {movimiento.observacion || "Sin observaciones"}
              </Typography>
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
          onClick={onClose}
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
          Cerrar
        </Button>
        <Button
          onClick={handleEdit}
          variant="contained"
          color="primary"
          startIcon={<Edit />}
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
          Editar Movimiento
        </Button>
      </DialogActions>
    </Dialog>
  );
}
