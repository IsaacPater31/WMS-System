import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  Inventory,
  Scale,
  Close,
  Assignment,
} from "@mui/icons-material";
import { unidadesCarga } from "./UnidadesCarga";
import { productos } from "../producto/Productos";
import ProductosUnidadModal from "./ProductosUnidadModal";

export default function UnidadesCargaModal({ open, onClose, guia }) {
  const [productosModalOpen, setProductosModalOpen] = useState(false);
  const [selectedUnidad, setSelectedUnidad] = useState(null);

  if (!guia) return null;

  // Usar las unidades de carga asociadas a la guía
  const unidadesDeEstaGuia = guia.unidadesCarga || [];

  const handleVerProductos = (unidad) => {
    setSelectedUnidad(unidad);
    setProductosModalOpen(true);
  };

  const handleCloseProductos = () => {
    setProductosModalOpen(false);
    setSelectedUnidad(null);
  };

  const getTipoUnidadColor = (tipo) => {
    switch (tipo.toLowerCase()) {
      case 'pallet':
        return 'primary';
      case 'caja':
        return 'secondary';
      default:
        return 'default';
    }
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
            Unidades de Carga - {guia.factura_comercial}
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
        {/* Información de la Guía */}
        <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
            <Assignment sx={{ mr: 1 }} />
            Guía de Carga #{guia.idGuia}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Factura:</strong> {guia.factura_comercial} | 
            <strong> Cliente:</strong> {guia.cliente?.nombre} | 
            <strong> Total Unidades:</strong> {unidadesDeEstaGuia.length}
          </Typography>
        </Box>

        {/* Tabla de Unidades de Carga */}
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.main' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  ID Unidad
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Tipo de Unidad
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Peso Bruto
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {unidadesDeEstaGuia.length > 0 ? (
                unidadesDeEstaGuia.map((unidad) => (
                  <TableRow key={unidad.idUnidad} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          sx={{ 
                            width: 30, 
                            height: 30, 
                            mr: 1,
                            backgroundColor: 'primary.main',
                            fontSize: '0.8rem'
                          }}
                        >
                          U
                        </Avatar>
                        <Typography variant="body2">
                          {unidad.idUnidad}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={unidad.tipo_unidad}
                        color={getTipoUnidadColor(unidad.tipo_unidad)}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Scale sx={{ mr: 1, fontSize: '1rem', color: 'text.secondary' }} />
                        <Typography variant="body2">
                          {unidad.peso_bruto} kg
                        </Typography>
                      </Box>
                    </TableCell>
                                         <TableCell>
                       <Button
                         size="small"
                         variant="outlined"
                         color="primary"
                         onClick={() => handleVerProductos(unidad)}
                       >
                         Ver Productos
                       </Button>
                     </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                    <Typography variant="body2" color="text.secondary">
                      No hay unidades de carga registradas para esta guía
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Resumen */}
        {unidadesDeEstaGuia.length > 0 && (
          <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Resumen de Unidades
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Chip 
                label={`Pallets: ${unidadesDeEstaGuia.filter(u => u.tipo_unidad === 'Pallet').length}`}
                color="primary"
                variant="outlined"
              />
              <Chip 
                label={`Cajas: ${unidadesDeEstaGuia.filter(u => u.tipo_unidad === 'Caja').length}`}
                color="secondary"
                variant="outlined"
              />
              <Chip 
                label={`Total: ${unidadesDeEstaGuia.length} unidades`}
                color="default"
                variant="outlined"
              />
            </Box>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} variant="outlined">
          Cerrar
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            // Aquí se podría abrir un formulario para agregar nuevas unidades
            console.log("Agregar nueva unidad de carga");
          }}
          disabled
        >
          Agregar Unidad (Solo en edición)
        </Button>
       </DialogActions>

       {/* Modal de Productos de la Unidad */}
       <ProductosUnidadModal
         open={productosModalOpen}
         onClose={handleCloseProductos}
         unidad={selectedUnidad}
       />
     </Dialog>
   );
 }
