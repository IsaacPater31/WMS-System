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
  useTheme,
  useMediaQuery,
  Grid,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import {
  Inventory,
  Scale,
  Close,
  Assignment,
  Visibility,
} from "@mui/icons-material";
import { unidadesCarga } from "./UnidadesCarga";
import { productos } from "../producto/Productos";
import ProductosUnidadModal from "./ProductosUnidadModal";

export default function UnidadesCargaModal({ open, onClose, guia }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  
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
      case 'contenedor':
        return 'success';
      case 'contenedor refrigerado':
        return 'info';
      default:
        return 'default';
    }
  };

  const calcularPesoTotal = () => {
    return unidadesDeEstaGuia.reduce((total, unidad) => {
      const peso = parseFloat(unidad.peso_bruto) || 0;
      return total + peso;
    }, 0);
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
              Unidades de Carga
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
              Guía: {guia.factura_comercial} • {unidadesDeEstaGuia.length} unidades
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
        {/* Información de la Guía */}
        <Paper sx={{ 
          p: { xs: 2, sm: 3 }, 
          mb: { xs: 2, sm: 3 }, 
          bgcolor: 'white',
          borderRadius: 3,
          border: '1px solid rgba(0, 0, 0, 0.06)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Assignment sx={{ color: 'primary.main', mr: 1, fontSize: { xs: 20, sm: 24 } }} />
            <Typography variant="h6" sx={{ fontWeight: '600', fontSize: { xs: '1rem', sm: '1.125rem' } }}>
              Información de la Guía
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
                ID de Guía
              </Typography>
              <Typography variant="body1" fontWeight="500" sx={{ fontSize: '0.875rem', color: 'primary.main' }}>
                #{guia.idGuia}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
                Factura Comercial
              </Typography>
              <Typography variant="body1" fontWeight="500" sx={{ fontSize: '0.875rem' }}>
                {guia.factura_comercial}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
                Cliente
              </Typography>
              <Typography variant="body1" fontWeight="500" sx={{ fontSize: '0.875rem' }}>
                {guia.cliente?.nombre || 'N/A'}
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Lista de Unidades */}
        {unidadesDeEstaGuia.length === 0 ? (
          <Paper sx={{ 
            p: { xs: 3, sm: 4 }, 
            textAlign: 'center', 
            borderRadius: 3,
            border: '1px solid rgba(0, 0, 0, 0.06)',
            bgcolor: 'rgba(0, 0, 0, 0.02)'
          }}>
            <Inventory sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              No hay unidades de carga
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Esta guía no tiene unidades de carga registradas
            </Typography>
          </Paper>
        ) : fullScreen ? (
          // Vista de tarjetas para móvil
          <Grid container spacing={2}>
            {unidadesDeEstaGuia.map((unidad) => (
              <Grid item xs={12} key={unidad.idUnidad}>
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
                          {unidad.idUnidad}
                        </Typography>
                      </Box>
                      <Chip
                        label={unidad.tipo_unidad}
                        color={getTipoUnidadColor(unidad.tipo_unidad)}
                        size="small"
                        variant="outlined"
                        sx={{ fontWeight: '500', fontSize: '0.75rem' }}
                      />
                    </Box>

                    {/* Información de la unidad */}
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
                        Descripción
                      </Typography>
                      <Typography variant="body1" fontWeight="500" sx={{ fontSize: '0.875rem' }}>
                        {unidad.descripcion || 'Sin descripción'}
                      </Typography>
                    </Box>

                    {/* Peso */}
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
                        Peso Bruto
                      </Typography>
                      <Typography variant="body1" fontWeight="500" sx={{ fontSize: '0.875rem', color: 'primary.main' }}>
                        {unidad.peso_bruto} kg
                      </Typography>
                    </Box>

                    {/* Acciones */}
                    <Box sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      gap: 1,
                      pt: 1,
                      borderTop: '1px solid rgba(0, 0, 0, 0.06)'
                    }}>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Visibility />}
                        onClick={() => handleVerProductos(unidad)}
                        sx={{
                          fontWeight: '500',
                          borderRadius: 2,
                          textTransform: 'none',
                          letterSpacing: '0.025em',
                          borderWidth: 1.5
                        }}
                      >
                        Ver Productos
                      </Button>
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
                  <TableCell sx={{ fontWeight: '600', fontSize: '0.875rem' }}>ID Unidad</TableCell>
                  <TableCell sx={{ fontWeight: '600', fontSize: '0.875rem' }}>Tipo</TableCell>
                  <TableCell sx={{ fontWeight: '600', fontSize: '0.875rem' }}>Descripción</TableCell>
                  <TableCell sx={{ fontWeight: '600', fontSize: '0.875rem' }}>Peso (kg)</TableCell>
                  <TableCell sx={{ fontWeight: '600', fontSize: '0.875rem' }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {unidadesDeEstaGuia.map((unidad) => (
                  <TableRow 
                    key={unidad.idUnidad}
                    sx={{ 
                      '&:hover': { 
                        backgroundColor: 'rgba(0, 0, 0, 0.02)' 
                      } 
                    }}
                  >
                    <TableCell>
                      <Typography variant="body2" fontWeight="600" color="primary.main">
                        {unidad.idUnidad}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={unidad.tipo_unidad}
                        color={getTipoUnidadColor(unidad.tipo_unidad)}
                        size="small"
                        variant="outlined"
                        sx={{ fontWeight: '500', fontSize: '0.75rem' }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ maxWidth: 200 }}>
                        {unidad.descripcion || 'Sin descripción'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="500" color="primary.main">
                        {unidad.peso_bruto}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Visibility />}
                        onClick={() => handleVerProductos(unidad)}
                        sx={{
                          fontWeight: '500',
                          borderRadius: 2,
                          textTransform: 'none',
                          letterSpacing: '0.025em',
                          borderWidth: 1.5
                        }}
                      >
                        Ver Productos
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Resumen */}
        {unidadesDeEstaGuia.length > 0 && (
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
                Resumen de Unidades
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
                  Total Unidades
                </Typography>
                <Typography variant="body1" fontWeight="500" sx={{ fontSize: '0.875rem', color: 'primary.main' }}>
                  {unidadesDeEstaGuia.length}
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
              <Grid item xs={12} md={6}>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
                  Distribución por Tipo
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {Object.entries(
                    unidadesDeEstaGuia.reduce((acc, unidad) => {
                      acc[unidad.tipo_unidad] = (acc[unidad.tipo_unidad] || 0) + 1;
                      return acc;
                    }, {})
                  ).map(([tipo, cantidad]) => (
                    <Chip
                      key={tipo}
                      label={`${tipo}: ${cantidad}`}
                      color={getTipoUnidadColor(tipo)}
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

      {/* Modal de Productos de la Unidad */}
      <ProductosUnidadModal
        open={productosModalOpen}
        onClose={handleCloseProductos}
        unidad={selectedUnidad}
      />
    </Dialog>
  );
}
