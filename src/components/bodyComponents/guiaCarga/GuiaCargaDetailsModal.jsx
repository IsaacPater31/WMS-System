import React, { useState } from "react";
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
  Assignment,
  Business,
  CalendarToday,
  Scale,
  Storage,
  Close,
  Edit,
  Inventory,
} from "@mui/icons-material";
import UnidadesCargaModal from "./UnidadesCargaModal";

export default function GuiaCargaDetailsModal({ open, onClose, guia, onEdit }) {
  const [unidadesModalOpen, setUnidadesModalOpen] = useState(false);

  if (!guia) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleEdit = () => {
    onEdit(guia);
    onClose();
  };

  const handleOpenUnidades = () => {
    setUnidadesModalOpen(true);
  };

  const handleCloseUnidades = () => {
    setUnidadesModalOpen(false);
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
          <Assignment sx={{ mr: 2 }} />
          <Typography variant="h6">Detalles de la Guía de Carga</Typography>
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
                G
              </Avatar>
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  {guia.factura_comercial}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Guía de Carga #{guia.idGuia}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Información de la Guía */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Assignment sx={{ mr: 1 }} />
              Información de la Guía
            </Typography>
            <Box sx={{ pl: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>ID Guía:</strong> {guia.idGuia}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Factura Comercial:</strong> {guia.factura_comercial}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Fecha de Ingreso:</strong> {formatDate(guia.fecha_ingreso)}
              </Typography>
            </Box>
          </Grid>

          {/* Información del Cliente */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Business sx={{ mr: 1 }} />
              Cliente Asociado
            </Typography>
            <Box sx={{ pl: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Cliente:</strong> {guia.cliente?.nombre || "N/A"}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>NIT:</strong> {guia.cliente?.nit || "N/A"}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Razón Social:</strong> {guia.cliente?.razon_social || "N/A"}
              </Typography>
            </Box>
          </Grid>

                     {/* Información de Carga */}
           <Grid item xs={12} md={6}>
             <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
               <Storage sx={{ mr: 1 }} />
               Información de Carga
             </Typography>
             <Box sx={{ pl: 2 }}>
               <Typography variant="body2" sx={{ mb: 1 }}>
                 <strong>Unidades de Carga:</strong> {guia.unidades_carga}
               </Typography>
               <Typography variant="body2" sx={{ mb: 1 }}>
                 <strong>Unidades de Producto:</strong> {guia.unidades_producto}
               </Typography>
               <Typography variant="body2" sx={{ mb: 1 }}>
                 <strong>Contenedores:</strong> 
                 <Chip 
                   label={guia.contenedores} 
                   size="small" 
                   color="primary"
                   sx={{ ml: 1 }}
                 />
               </Typography>
               <Button
                 variant="outlined"
                 color="primary"
                 size="small"
                 startIcon={<Inventory />}
                 onClick={handleOpenUnidades}
                 sx={{ mt: 1 }}
               >
                 Ver Unidades de Carga
               </Button>
             </Box>
           </Grid>

          {/* Información de Peso y Espacio */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Scale sx={{ mr: 1 }} />
              Peso y Espacio
            </Typography>
            <Box sx={{ pl: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Peso Total:</strong> {guia.peso_total} kg
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Espacio Ocupado:</strong> {guia.espacio_ocupado} m²
              </Typography>
            </Box>
          </Grid>

          {/* Información Adicional */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <CalendarToday sx={{ mr: 1 }} />
              Información Adicional
            </Typography>
            <Box sx={{ pl: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>ID Cliente:</strong> {guia.CLIENTE_idCliente}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Fecha de Registro:</strong> {formatDate(guia.fecha_ingreso)}
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
          Editar Guía
                 </Button>
       </DialogActions>

       {/* Modal de Unidades de Carga */}
       <UnidadesCargaModal
         open={unidadesModalOpen}
         onClose={handleCloseUnidades}
         guia={guia}
       />
     </Dialog>
   );
 }
