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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Warehouse,
  Storage,
  Person,
  Edit,
  Close,
  Assignment,
  Business,
  CheckCircle,
  Cancel,
  Warning,
} from "@mui/icons-material";


export default function BodegaDetailsModal({ open, onClose, bodega, onEdit }) {
  if (!bodega) return null;

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'ACTIVA':
        return 'success';
      case 'INACTIVA':
        return 'error';
      case 'MANTENIMIENTO':
        return 'warning';
      default:
        return 'default';
    }
  };

  const handleEdit = () => {
    onEdit(bodega);
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
          <Warehouse sx={{ mr: 2 }} />
          <Typography variant="h6">Detalles de la Bodega</Typography>
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
                B
              </Avatar>
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  {bodega.nombre}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Bodega #{bodega.idBodega}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Información de la Bodega */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Warehouse sx={{ mr: 1 }} />
              Información de la Bodega
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <Business color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="ID de Bodega"
                  secondary={bodega.idBodega}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Warehouse color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Nombre"
                  secondary={bodega.nombre}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Storage color="primary" />
                </ListItemIcon>
                                 <ListItemText 
                   primary="Capacidad"
                   secondary={`${bodega.capacidad.toLocaleString()} m²`}
                 />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  {bodega.estado === 'ACTIVA' ? <CheckCircle color="success" /> : 
                   bodega.estado === 'INACTIVA' ? <Cancel color="error" /> : 
                   <Warning color="warning" />}
                </ListItemIcon>
                <ListItemText 
                  primary="Estado"
                  secondary={
                    <Chip 
                      label={bodega.estado} 
                      size="small" 
                      color={getEstadoColor(bodega.estado)}
                      variant="outlined"
                    />
                  }
                />
              </ListItem>
            </List>
          </Grid>

          {/* Información de Usuario Responsable */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Person sx={{ mr: 1 }} />
              Información del Sistema
            </Typography>
            <Box sx={{ pl: 2 }}>
              <Typography variant="body2" color="text.secondary">
                ID de Bodega: {bodega.idBodega}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Estado del Sistema: {bodega.estado}
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
                <strong>Productos Asociados:</strong> 
                <Chip 
                  label="Ver Productos" 
                  size="small" 
                  color="primary"
                  variant="outlined"
                  sx={{ ml: 1, cursor: 'pointer' }}
                  onClick={() => console.log("Ver productos de bodega:", bodega.idBodega)}
                />
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Existencias:</strong> 
                <Chip 
                  label="Ver Existencias" 
                  size="small" 
                  color="secondary"
                  variant="outlined"
                  sx={{ ml: 1, cursor: 'pointer' }}
                  onClick={() => console.log("Ver existencias de bodega:", bodega.idBodega)}
                />
              </Typography>
            </Box>
          </Grid>

          {/* Información Adicional */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Storage sx={{ mr: 1 }} />
              Información Adicional
            </Typography>
            <Box sx={{ pl: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Estado Operativo:</strong> 
                {bodega.estado === 'ACTIVA' ? 'La bodega está operativa y disponible para almacenamiento' :
                 bodega.estado === 'INACTIVA' ? 'La bodega no está disponible para almacenamiento' :
                 'La bodega está en mantenimiento'}
              </Typography>
                             <Typography variant="body2" sx={{ mb: 1 }}>
                 <strong>Capacidad de Almacenamiento:</strong> 
                 {bodega.capacidad >= 4000 ? 'Alta capacidad (≥4,000 m²)' :
                  bodega.capacidad >= 2000 ? 'Capacidad media (2,000-3,999 m²)' : 'Capacidad baja (<2,000 m²)'}
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
          Editar Bodega
        </Button>
      </DialogActions>
    </Dialog>
  );
}
