import React from "react";
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
  Category,
  Warehouse,
  Scale,
  Close,
} from "@mui/icons-material";
import { productos } from "../producto/Productos";

export default function ProductosUnidadModal({ open, onClose, unidad }) {
  if (!unidad) return null;

  // Filtrar los productos que pertenecen a esta unidad
  const productosDeEstaUnidad = productos.filter(
    producto => producto.UNIDAD_DE_CARGA_idUnidad === unidad.idUnidad
  );

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

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="lg" 
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
            Productos - Unidad #{unidad.idUnidad}
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
        {/* Información de la Unidad */}
        <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
            <Inventory sx={{ mr: 1 }} />
            Unidad de Carga #{unidad.idUnidad}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Tipo:</strong> {unidad.tipo_unidad} | 
            <strong> Peso Bruto:</strong> {unidad.peso_bruto} | 
            <strong> Total Productos:</strong> {productosDeEstaUnidad.length}
          </Typography>
        </Box>

        {/* Tabla de Productos */}
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.main' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  ID Producto
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Nombre
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Referencia
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Estado
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Peso
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Categoría
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Bodega
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productosDeEstaUnidad.length > 0 ? (
                productosDeEstaUnidad.map((producto) => (
                  <TableRow key={producto.idProducto} hover>
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
                          P
                        </Avatar>
                        <Typography variant="body2">
                          {producto.idProducto}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {producto.nombre}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {producto.referencia}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={producto.estado}
                        color={getEstadoColor(producto.estado)}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Scale sx={{ mr: 1, fontSize: '1rem', color: 'text.secondary' }} />
                        <Typography variant="body2">
                          {producto.peso} kg
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={producto.categoria?.nombre || "N/A"}
                        size="small"
                        color="secondary"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {producto.bodega?.nombre || "N/A"}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    <Typography variant="body2" color="text.secondary">
                      No hay productos registrados en esta unidad de carga
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Resumen */}
        {productosDeEstaUnidad.length > 0 && (
          <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Resumen de Productos
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Chip 
                label={`Total: ${productosDeEstaUnidad.length} productos`}
                color="primary"
                variant="outlined"
              />
              <Chip 
                label={`Peso Total: ${productosDeEstaUnidad.reduce((sum, p) => sum + p.peso, 0).toFixed(2)} kg`}
                color="secondary"
                variant="outlined"
              />
              <Chip 
                label={`Categorías: ${new Set(productosDeEstaUnidad.map(p => p.categoria?.nombre)).size}`}
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
            // Aquí se podría abrir un formulario para agregar productos a esta unidad
            console.log("Agregar producto a unidad:", unidad.idUnidad);
          }}
        >
          Agregar Producto
        </Button>
      </DialogActions>
    </Dialog>
  );
}
