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
  Inventory,
  Category,
  Warehouse,
  Scale,
  Edit,
  Close,
  Assignment,
} from "@mui/icons-material";

export default function ProductoDetailsModal({ open, onClose, producto, onEdit }) {
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
          <Typography variant="h6">Detalles del Producto</Typography>
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
                P
              </Avatar>
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  {producto.nombre}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Producto #{producto.idProducto}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Información del Producto */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Inventory sx={{ mr: 1 }} />
              Información del Producto
            </Typography>
            <Box sx={{ pl: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>ID Producto:</strong> {producto.idProducto}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Nombre:</strong> {producto.nombre}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Referencia:</strong> {producto.referencia}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Serial:</strong> {producto.serial}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Estado:</strong> 
                <Chip 
                  label={producto.estado} 
                  size="small" 
                  color={getEstadoColor(producto.estado)}
                  sx={{ ml: 1 }}
                />
              </Typography>
            </Box>
          </Grid>

          {/* Información de Categoría y Bodega */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Category sx={{ mr: 1 }} />
              Clasificación y Ubicación
            </Typography>
            <Box sx={{ pl: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Categoría:</strong> {producto.categoria?.nombre || "N/A"}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Descripción Categoría:</strong> {producto.categoria?.descripcion || "N/A"}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Bodega:</strong> {producto.bodega?.nombre || "N/A"}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Capacidad Bodega:</strong> {producto.bodega?.capacidad || "N/A"} m²
              </Typography>
            </Box>
          </Grid>

          {/* Información de Peso y Unidad de Carga */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Scale sx={{ mr: 1 }} />
              Peso y Carga
            </Typography>
            <Box sx={{ pl: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Peso:</strong> {producto.peso} kg
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Unidad de Carga ID:</strong> {producto.UNIDAD_DE_CARGA_idUnidad}
              </Typography>
            </Box>
          </Grid>

          {/* Información de Relaciones */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Assignment sx={{ mr: 1 }} />
              Relaciones
            </Typography>
            <Box sx={{ pl: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>ID Categoría:</strong> {producto.CATEGORIA_idCategoria}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>ID Bodega:</strong> {producto.BODEGA_idBodega}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Estado Bodega:</strong> 
                <Chip 
                  label={producto.bodega?.estado || "N/A"} 
                  size="small" 
                  color={producto.bodega?.estado === 'ACTIVA' ? 'success' : 'error'}
                  sx={{ ml: 1 }}
                />
              </Typography>
            </Box>
          </Grid>

          {/* Observaciones */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Warehouse sx={{ mr: 1 }} />
              Observaciones
            </Typography>
            <Box sx={{ pl: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Descripción:</strong> {producto.observacion}
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
          Editar Producto
        </Button>
      </DialogActions>
    </Dialog>
  );
}
