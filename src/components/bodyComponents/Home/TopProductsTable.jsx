import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip
} from "@mui/material";
import { productos } from "../producto/Productos";
import { existencias } from "../existencia/Existencias";

export default function TopProductsTable() {
  // Calcular productos con más existencias
  const productsWithStock = productos.map(producto => {
    const existenciasProducto = existencias.filter(ex => ex.PRODUCTO_idProducto === producto.idProducto);
    const totalExistencias = existenciasProducto.length;
    
    // Agrupar existencias por bodega
    const existenciasPorBodega = existenciasProducto.reduce((acc, ex) => {
      const bodegaNombre = ex.bodega?.nombre || "Sin bodega";
      acc[bodegaNombre] = (acc[bodegaNombre] || 0) + 1;
      return acc;
    }, {});
    
    // Obtener la bodega principal (con más existencias)
    const bodegaPrincipal = Object.entries(existenciasPorBodega)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || "Sin bodega";
    
         return {
       name: producto.nombre,
       categoria: producto.categoria?.nombre || "Sin categoría",
       existencias: totalExistencias,
       bodega: bodegaPrincipal,
       distribucionBodegas: existenciasPorBodega
     };
  })
  .filter(p => p.existencias > 0)
  .sort((a, b) => b.existencias - a.existencias)
  .slice(0, 8);

  const getStockColor = (stock) => {
    if (stock > 50) return "success";
    if (stock > 20) return "warning";
    return "error";
  };

  return (
    <Box
      sx={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: 3,
        height: "100%",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        animation: "slideInFromBottom 0.8s ease-out 1.1s both",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)"
        }
      }}
    >
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: "#333" }}>
        Productos con Más Existencias
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: "bold", fontSize: "14px" }}>Producto</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "14px" }}>Categoría</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "14px" }}>Existencias</TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "14px" }}>Bodega</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {productsWithStock.map((product, index) => (
              <TableRow 
                key={index}
                sx={{ 
                  '&:hover': { 
                    backgroundColor: '#f8f9fa',
                    cursor: 'pointer'
                  }
                }}
              >
                <TableCell sx={{ fontWeight: 500 }}>
                  {product.name}
                </TableCell>
                <TableCell>
                  <Chip 
                    label={product.categoria} 
                    size="small" 
                    variant="outlined"
                    color="primary"
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={product.existencias} 
                    size="small" 
                    color={getStockColor(product.existencias)}
                    sx={{ fontWeight: "bold" }}
                  />
                </TableCell>
                <TableCell sx={{ fontSize: "13px", color: "#666" }}>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {product.bodega}
                    </Typography>
                    {Object.keys(product.distribucionBodegas).length > 1 && (
                      <Typography variant="caption" sx={{ color: "#888" }}>
                        +{Object.keys(product.distribucionBodegas).length - 1} bodegas más
                      </Typography>
                    )}
                  </Box>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
