import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  Grid,
  Divider,
  Avatar,
} from "@mui/material";
import {
  Inventory,
  LocationOn,
  CalendarToday,
  Business,
  Person,
  Assignment,
  Close,
  QrCode,
  Storage,
} from "@mui/icons-material";

export default function ExistenciaDetailsModal({ open, onClose, existencia }) {
  if (!existencia) return null;

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'DISPONIBLE':
        return 'success';
      case 'RESERVADO':
        return 'warning';
      case 'EN_MANTENIMIENTO':
      case 'EN_REPARACION':
        return 'info';
      case 'VENCIDO':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
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
          <Inventory sx={{ mr: 2 }} />
          <Typography variant="h6">
            Detalles de Unidad
          </Typography>
        </Box>
        <Button
          onClick={onClose}
          sx={{ color: 'white', minWidth: 'auto' }}
        >
          <Close />
        </Button>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        {/* Información Principal */}
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Avatar
            sx={{ 
              width: 80, 
              height: 80, 
              mx: 'auto', 
              mb: 2,
              backgroundColor: 'primary.main',
              fontSize: '2rem'
            }}
          >
            <Inventory />
          </Avatar>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
            Existencia #{existencia.idExistencia}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {existencia.producto?.nombre || "Producto"}
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Información del Producto */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            <Inventory sx={{ mr: 1 }} />
            Información del Producto
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">
                Producto
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {existencia.producto?.nombre || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">
                Categoría
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {existencia.producto?.categoria?.nombre || "Sin categoría"}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">
                Código
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {existencia.producto?.codigo || existencia.producto?.referencia || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">
                Peso
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {existencia.producto?.peso || "N/A"} kg
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Información de Ubicación */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            <LocationOn sx={{ mr: 1 }} />
            Información de Ubicación
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">
                Bodega
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {existencia.bodega?.nombre || `Bodega #${existencia.BODEGA_idBodega}`}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">
                Ubicación
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {existencia.ubicacion || "Sin ubicación"}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">
                Cliente Propietario
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {existencia.cliente?.razon_social || `Cliente #${existencia.CLIENTE_idCliente}`}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">
                Fecha de Ingreso
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {formatDate(existencia.fecha_ingreso)}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Información de Guía de Carga */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            <Assignment sx={{ mr: 1 }} />
            Información de Guía de Carga
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">
                Número de Guía
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {existencia.guiaCarga?.numero_guia || `Guía #${existencia.GUIA_DE_CARGA_idGuia}`}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">
                Cliente de la Guía
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {existencia.guiaCarga?.cliente?.razon_social || `Cliente #${existencia.GUIA_DE_CARGA_CLIENTE_idCliente}`}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Información de Cantidades */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            <Storage sx={{ mr: 1 }} />
            Información de Cantidades
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography variant="body2" color="text.secondary">
                Cantidad Total
              </Typography>
              <Typography variant="h6" fontWeight="bold" color="primary.main">
                {existencia.cantidad || 0} unidades
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="body2" color="text.secondary">
                Nacionalizado
              </Typography>
              <Typography variant="h6" fontWeight="bold" color="success.main">
                {existencia.cantidad_nacionalizado || 0} unidades
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="body2" color="text.secondary">
                No Nacionalizado
              </Typography>
              <Typography variant="h6" fontWeight="bold" color="warning.main">
                {existencia.cantidad_no_nacionalizado || 0} unidades
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">
                Espacio Ocupado
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {existencia.espacio_ocupado || 0} m²
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Información Adicional */}
        <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            <Business sx={{ mr: 1 }} />
            Información Adicional
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            • <strong>ID de Existencia:</strong> {existencia.idExistencia}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            • <strong>Producto:</strong> {existencia.producto?.nombre || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            • <strong>Bodega:</strong> {existencia.bodega?.nombre || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • <strong>Cliente:</strong> {existencia.cliente?.razon_social || "N/A"}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} variant="outlined">
          Cerrar
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<QrCode />}
        >
          Generar QR
        </Button>
      </DialogActions>
    </Dialog>
  );
}
