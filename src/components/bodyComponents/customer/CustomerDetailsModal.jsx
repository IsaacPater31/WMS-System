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
  Business,
  Person,
  Email,
  Phone,
  LocationOn,
  Close,
  Edit,
} from "@mui/icons-material";

export default function CustomerDetailsModal({ open, onClose, customer, onEdit }) {
  if (!customer) return null;

  const handleEdit = () => {
    onEdit(customer);
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
          <Business sx={{ mr: 2 }} />
          <Typography variant="h6">Detalles del Cliente</Typography>
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
                {customer.nombre.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  {customer.nombre}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {customer.razon_social}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Información de Contacto */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Person sx={{ mr: 1 }} />
              Información de Contacto
            </Typography>
            <Box sx={{ pl: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Representante Legal:</strong> {customer.representante_legal}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Encargado:</strong> {customer.encargado}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Email:</strong> {customer.email}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Teléfono:</strong> {customer.telefono}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Tel. Encargado:</strong> {customer.tel_encargado}
              </Typography>
            </Box>
          </Grid>

          {/* Información Fiscal y Ubicación */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Business sx={{ mr: 1 }} />
              Información Fiscal
            </Typography>
            <Box sx={{ pl: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>NIT:</strong> {customer.nit}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Razón Social:</strong> {customer.razon_social}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Dirección:</strong> {customer.direccion}
              </Typography>
            </Box>
          </Grid>

          {/* Información Adicional */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <LocationOn sx={{ mr: 1 }} />
              Información Adicional
            </Typography>
            <Box sx={{ pl: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>ID Cliente:</strong> {customer.idCliente}
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
          Editar Cliente
        </Button>
      </DialogActions>
    </Dialog>
  );
}
