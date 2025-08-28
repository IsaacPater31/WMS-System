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
} from "@mui/material";
import {
  SwapHoriz,
  Assignment,
  Business,
  Edit,
  Close,
  CalendarToday,
  TrendingUp,
} from "@mui/icons-material";

export default function MovimientoDetailsModal({ open, onClose, movimiento, onEdit }) {
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
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: '90vh'
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        backgroundColor: 'primary.main',
        color: 'white'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SwapHoriz sx={{ mr: 2 }} />
          <Typography variant="h6">Detalles del Movimiento</Typography>
        </Box>
        <Button
          onClick={onClose}
          sx={{ color: 'white', minWidth: 'auto' }}
        >
          <Close />
        </Button>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Grid container spacing={3}>
          {/* Información Principal */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Avatar
                sx={{ 
                  width: 60, 
                  height: 60, 
                  mr: 2,
                  backgroundColor: 'primary.main',
                  fontSize: '1.5rem'
                }}
              >
                M
              </Avatar>
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  Movimiento #{movimiento.idMovimiento}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {movimiento.producto?.nombre || "Producto no especificado"}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Información del Movimiento */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <SwapHoriz sx={{ mr: 1 }} />
              Información del Movimiento
            </Typography>
            <Box sx={{ pl: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>ID Movimiento:</strong> {movimiento.idMovimiento}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Tipo:</strong> 
                <Chip 
                  label={movimiento.tipo} 
                  size="small" 
                  color={getTipoColor(movimiento.tipo)}
                  sx={{ ml: 1 }}
                />
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Cantidad:</strong> 
                <Chip 
                  label={movimiento.cantidad > 0 ? `+${movimiento.cantidad}` : movimiento.cantidad}
                  size="small" 
                  color={movimiento.cantidad >= 0 ? 'success' : 'error'}
                  sx={{ ml: 1 }}
                />
              </Typography>
            </Box>
          </Grid>

          {/* Información de Fecha */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <CalendarToday sx={{ mr: 1 }} />
              Fecha y Hora
            </Typography>
            <Box sx={{ pl: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Fecha:</strong> {formatDate(movimiento.fecha_movimiento)}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Día de la semana:</strong> {new Date(movimiento.fecha_movimiento).toLocaleDateString('es-ES', { weekday: 'long' })}
              </Typography>
            </Box>
          </Grid>

          {/* Información del Producto */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Business sx={{ mr: 1 }} />
              Producto Asociado
            </Typography>
            <Box sx={{ pl: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Producto:</strong> {movimiento.producto?.nombre || "N/A"}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Referencia:</strong> {movimiento.producto?.referencia || "N/A"}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>ID Producto:</strong> {movimiento.PRODUCTO_idProducto}
              </Typography>
            </Box>
          </Grid>

          {/* Información de Guía de Carga */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Assignment sx={{ mr: 1 }} />
              Guía de Carga
            </Typography>
            <Box sx={{ pl: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Factura:</strong> {movimiento.guiaCarga?.factura_comercial || "N/A"}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Cliente:</strong> {movimiento.guiaCarga?.cliente?.nombre || "N/A"}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>ID Guía:</strong> {movimiento.GUIA_DE_CARGA_idGuia}
              </Typography>
            </Box>
          </Grid>

          {/* Información de Relaciones */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <TrendingUp sx={{ mr: 1 }} />
              Relaciones y Claves Foráneas
            </Typography>
            <Box sx={{ pl: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>GUIA_DE_CARGA_CLIENTE_idCliente:</strong> {movimiento.GUIA_DE_CARGA_CLIENTE_idCliente}
              </Typography>
            </Box>
          </Grid>

          {/* Observaciones */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Assignment sx={{ mr: 1 }} />
              Observaciones
            </Typography>
            <Box sx={{ pl: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Descripción:</strong> {movimiento.observacion}
              </Typography>
            </Box>
          </Grid>

          {/* Resumen del Movimiento */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <SwapHoriz sx={{ mr: 1 }} />
              Resumen del Movimiento
            </Typography>
            <Box sx={{ pl: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Impacto en Inventario:</strong> 
                {movimiento.tipo === 'INGRESO' ? 'Aumenta el inventario' :
                 movimiento.tipo === 'SALIDA' ? 'Disminuye el inventario' :
                 movimiento.tipo === 'TRANSFERENCIA' ? 'Reubica el inventario' :
                 'Ajusta el inventario'}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Estado del Movimiento:</strong> 
                <Chip 
                  label="Completado" 
                  size="small" 
                  color="success"
                  sx={{ ml: 1 }}
                />
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} variant="outlined">
          Cerrar
        </Button>
        <Button 
          onClick={handleEdit} 
          variant="contained" 
          color="primary"
          startIcon={<Edit />}
        >
          Editar Movimiento
        </Button>
      </DialogActions>
    </Dialog>
  );
}
