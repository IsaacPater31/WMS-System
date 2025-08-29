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
  useTheme,
  useMediaQuery,
  Grid,
  Card,
  CardContent,
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
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  
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

  const calcularPesoTotal = () => {
    return productosDeEstaUnidad.reduce((total, producto) => {
      const peso = parseFloat(producto.peso) || 0;
      return total + peso;
    }, 0);
  };

  const getCategoriasUnicas = () => {
    return new Set(productosDeEstaUnidad.map(p => p.categoria?.nombre).filter(Boolean));
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
      {/* Header Minimalista */}
      <DialogTitle sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0, 0, 0, 0.02)',
        color: 'text.primary',
        padding: { xs: 2, sm: 3 },
        borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
        minHeight: fullScreen ? 64 : 80
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
          <Box
            sx={{ 
              width: { xs: 40, sm: 48 }, 
              height: { xs: 40, sm: 48 }, 
              backgroundColor: 'rgba(25, 118, 210, 0.08)',
              color: 'primary.main',
              mr: { xs: 1, sm: 2 },
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Inventory sx={{ fontSize: { xs: 20, sm: 24 } }} />
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography 
              variant={fullScreen ? "h6" : "h5"} 
              sx={{ 
                fontWeight: "600",
                fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.5rem' },
                letterSpacing: '-0.025em',
                lineHeight: 1.2
              }}
            >
              Productos de la Unidad
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                opacity: 0.7,
                fontSize: { xs: '0.875rem', sm: '1rem' },
                color: 'text.secondary',
                mt: 0.5
              }}
            >
              Unidad: {unidad.idUnidad} • {productosDeEstaUnidad.length} productos
            </Typography>
          </Box>
        </Box>
        <Button
          onClick={onClose}
          sx={{ 
            color: 'text.secondary', 
            minWidth: 'auto',
            p: { xs: 1, sm: 1.5 },
            borderRadius: 2,
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)'
            }
          }}
        >
          <Close sx={{ fontSize: { xs: 20, sm: 24 } }} />
        </Button>
      </DialogTitle>

      <DialogContent sx={{ 
        pt: { xs: 2, sm: 3 },
        px: { xs: 2, sm: 3 },
        pb: { xs: 2, sm: 3 },
        backgroundColor: 'rgba(0, 0, 0, 0.01)'
      }}>
        {/* Información de la Unidad */}
        <Paper sx={{ 
          p: { xs: 2, sm: 3 }, 
          mb: { xs: 2, sm: 3 }, 
          bgcolor: 'white',
          borderRadius: 3,
          border: '1px solid rgba(0, 0, 0, 0.06)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Inventory sx={{ color: 'primary.main', mr: 1, fontSize: { xs: 20, sm: 24 } }} />
            <Typography variant="h6" sx={{ fontWeight: '600', fontSize: { xs: '1rem', sm: '1.125rem' } }}>
              Información de la Unidad
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
                ID de Unidad
              </Typography>
              <Typography variant="body1" fontWeight="500" sx={{ fontSize: '0.875rem', color: 'primary.main' }}>
                {unidad.idUnidad}
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
                Tipo de Unidad
              </Typography>
              <Typography variant="body1" fontWeight="500" sx={{ fontSize: '0.875rem' }}>
                {unidad.tipo_unidad}
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
                Peso Bruto
              </Typography>
              <Typography variant="body1" fontWeight="500" sx={{ fontSize: '0.875rem', color: 'primary.main' }}>
                {unidad.peso_bruto} kg
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
                Total Productos
              </Typography>
              <Typography variant="body1" fontWeight="500" sx={{ fontSize: '0.875rem', color: 'primary.main' }}>
                {productosDeEstaUnidad.length}
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Lista de Productos */}
        {productosDeEstaUnidad.length === 0 ? (
          <Paper sx={{ 
            p: { xs: 3, sm: 4 }, 
            textAlign: 'center', 
            borderRadius: 3,
            border: '1px solid rgba(0, 0, 0, 0.06)',
            bgcolor: 'rgba(0, 0, 0, 0.02)'
          }}>
            <Inventory sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              No hay productos asignados
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Esta unidad de carga no tiene productos asignados. Los productos se asignan desde el módulo de inventario.
            </Typography>
          </Paper>
        ) : fullScreen ? (
          // Vista de tarjetas para móvil
          <Grid container spacing={2}>
            {productosDeEstaUnidad.map((producto) => (
              <Grid item xs={12} key={producto.idProducto}>
                <Card sx={{ 
                  borderRadius: 3, 
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    transform: 'translateY(-2px)'
                  }
                }}>
                  <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    {/* Header de la tarjeta */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            backgroundColor: 'rgba(25, 118, 210, 0.08)',
                            color: 'primary.main',
                            mr: 1,
                            borderRadius: 1
                          }}
                        >
                          <Inventory sx={{ fontSize: 16 }} />
                        </Avatar>
                        <Typography variant="body2" fontWeight="600" color="primary.main">
                          {producto.idProducto}
                        </Typography>
                      </Box>
                      <Chip
                        label={producto.estado}
                        color={getEstadoColor(producto.estado)}
                        size="small"
                        variant="outlined"
                        sx={{ fontWeight: '500', fontSize: '0.75rem' }}
                      />
                    </Box>

                    {/* Información del producto */}
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
                        Nombre del Producto
                      </Typography>
                      <Typography variant="body1" fontWeight="500" sx={{ fontSize: '0.875rem' }}>
                        {producto.nombre}
                      </Typography>
                    </Box>

                    {/* Referencia */}
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
                        Referencia
                      </Typography>
                      <Typography variant="body1" fontWeight="500" sx={{ fontSize: '0.875rem' }}>
                        {producto.referencia}
                      </Typography>
                    </Box>

                    {/* Peso y Categoría */}
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
                          Peso
                        </Typography>
                        <Typography variant="body1" fontWeight="500" sx={{ fontSize: '0.875rem', color: 'primary.main' }}>
                          {producto.peso} kg
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
                          Categoría
                        </Typography>
                        <Typography variant="body1" fontWeight="500" sx={{ fontSize: '0.875rem' }}>
                          {producto.categoria?.nombre || 'N/A'}
                        </Typography>
                      </Grid>
                    </Grid>

                    {/* Bodega */}
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
                        Bodega
                      </Typography>
                      <Typography variant="body1" fontWeight="500" sx={{ fontSize: '0.875rem' }}>
                        {producto.bodega?.nombre || 'N/A'}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          // Vista de tabla para desktop
          <TableContainer component={Paper} sx={{ 
            borderRadius: 3, 
            border: '1px solid rgba(0, 0, 0, 0.06)',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
          }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}>
                  <TableCell sx={{ fontWeight: '600', fontSize: '0.875rem' }}>ID Producto</TableCell>
                  <TableCell sx={{ fontWeight: '600', fontSize: '0.875rem' }}>Nombre</TableCell>
                  <TableCell sx={{ fontWeight: '600', fontSize: '0.875rem' }}>Referencia</TableCell>
                  <TableCell sx={{ fontWeight: '600', fontSize: '0.875rem' }}>Estado</TableCell>
                  <TableCell sx={{ fontWeight: '600', fontSize: '0.875rem' }}>Peso (kg)</TableCell>
                  <TableCell sx={{ fontWeight: '600', fontSize: '0.875rem' }}>Categoría</TableCell>
                  <TableCell sx={{ fontWeight: '600', fontSize: '0.875rem' }}>Bodega</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productosDeEstaUnidad.map((producto) => (
                  <TableRow 
                    key={producto.idProducto}
                    sx={{ 
                      '&:hover': { 
                        backgroundColor: 'rgba(0, 0, 0, 0.02)' 
                      } 
                    }}
                  >
                    <TableCell>
                      <Typography variant="body2" fontWeight="600" color="primary.main">
                        {producto.idProducto}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="500" sx={{ maxWidth: 150 }}>
                        {producto.nombre}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ maxWidth: 120 }}>
                        {producto.referencia}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={producto.estado}
                        color={getEstadoColor(producto.estado)}
                        size="small"
                        variant="outlined"
                        sx={{ fontWeight: '500', fontSize: '0.75rem' }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="500" color="primary.main">
                        {producto.peso}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={producto.categoria?.nombre || "N/A"}
                        size="small"
                        color="secondary"
                        variant="outlined"
                        sx={{ fontWeight: '500', fontSize: '0.75rem' }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ maxWidth: 120 }}>
                        {producto.bodega?.nombre || "N/A"}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Resumen */}
        {productosDeEstaUnidad.length > 0 && (
          <Paper sx={{ 
            p: { xs: 2, sm: 3 }, 
            mt: { xs: 2, sm: 3 }, 
            bgcolor: 'white',
            borderRadius: 3,
            border: '1px solid rgba(0, 0, 0, 0.06)',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Scale sx={{ color: 'primary.main', mr: 1, fontSize: { xs: 20, sm: 24 } }} />
              <Typography variant="h6" sx={{ fontWeight: '600', fontSize: { xs: '1rem', sm: '1.125rem' } }}>
                Resumen de Productos
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
                  Total Productos
                </Typography>
                <Typography variant="body1" fontWeight="500" sx={{ fontSize: '0.875rem', color: 'primary.main' }}>
                  {productosDeEstaUnidad.length}
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
                  Peso Total
                </Typography>
                <Typography variant="body1" fontWeight="500" sx={{ fontSize: '0.875rem', color: 'primary.main' }}>
                  {calcularPesoTotal().toFixed(2)} kg
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
                  Categorías Únicas
                </Typography>
                <Typography variant="body1" fontWeight="500" sx={{ fontSize: '0.875rem', color: 'primary.main' }}>
                  {getCategoriasUnicas().size}
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
                  Estados
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {Object.entries(
                    productosDeEstaUnidad.reduce((acc, producto) => {
                      acc[producto.estado] = (acc[producto.estado] || 0) + 1;
                      return acc;
                    }, {})
                  ).map(([estado, cantidad]) => (
                    <Chip
                      key={estado}
                      label={`${estado}: ${cantidad}`}
                      color={getEstadoColor(estado)}
                      size="small"
                      variant="outlined"
                      sx={{ fontWeight: '500', fontSize: '0.75rem' }}
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        )}
      </DialogContent>

      <DialogActions sx={{ 
        p: { xs: 2, sm: 3 },
        borderTop: '1px solid rgba(0, 0, 0, 0.06)',
        backgroundColor: 'rgba(0, 0, 0, 0.02)',
        gap: 1
      }}>
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
      </DialogActions>
    </Dialog>
  );
}
