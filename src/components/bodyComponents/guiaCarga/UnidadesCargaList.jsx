import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Avatar,
  Divider,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  Inventory,
  Scale,
} from "@mui/icons-material";
import UnidadCargaForm from "./UnidadCargaForm";

export default function UnidadesCargaList({ 
  unidades = [], 
  onUnidadesChange, 
  guiaId,
  disabled = false 
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [unidadFormOpen, setUnidadFormOpen] = useState(false);
  const [editingUnidad, setEditingUnidad] = useState(null);

  const handleAddUnidad = () => {
    setEditingUnidad(null);
    setUnidadFormOpen(true);
  };

  const handleEditUnidad = (unidad) => {
    setEditingUnidad(unidad);
    setUnidadFormOpen(true);
  };

  const handleDeleteUnidad = (idUnidad) => {
    const updatedUnidades = unidades.filter(u => u.idUnidad !== idUnidad);
    onUnidadesChange(updatedUnidades);
  };

  const handleSaveUnidad = (unidadData) => {
    if (editingUnidad) {
      // Editar unidad existente
      const updatedUnidades = unidades.map(u => 
        u.idUnidad === editingUnidad.idUnidad ? unidadData : u
      );
      onUnidadesChange(updatedUnidades);
    } else {
      // Agregar nueva unidad
      onUnidadesChange([...unidades, unidadData]);
    }
  };

  const handleCloseUnidadForm = () => {
    setUnidadFormOpen(false);
    setEditingUnidad(null);
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
    return unidades.reduce((total, unidad) => {
      const peso = parseFloat(unidad.peso_bruto) || 0;
      return total + peso;
    }, 0);
  };

  return (
    <Box>
      {/* Header con estadísticas */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3,
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: '600', mb: 1 }}>
            Unidades de Carga ({unidades.length})
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Peso total: {calcularPesoTotal().toFixed(2)} kg
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddUnidad}
          disabled={disabled}
          size={isMobile ? "large" : "medium"}
          sx={{
            fontWeight: '500',
            borderRadius: 2,
            textTransform: 'none',
            letterSpacing: '0.025em',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)'
            }
          }}
        >
          Agregar Unidad
        </Button>
      </Box>

      {unidades.length === 0 ? (
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
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Agrega unidades de carga para comenzar a gestionar tu guía
          </Typography>
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={handleAddUnidad}
            disabled={disabled}
            size={isMobile ? "large" : "medium"}
            sx={{
              fontWeight: '500',
              borderRadius: 2,
              textTransform: 'none',
              letterSpacing: '0.025em',
              borderWidth: 1.5
            }}
          >
            Agregar Primera Unidad
          </Button>
        </Paper>
      ) : isMobile ? (
        // Vista de tarjetas para móvil
        <Grid container spacing={2}>
          {unidades.map((unidad) => (
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
                      {unidad.descripcion}
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
                    <IconButton
                      size="small"
                      onClick={() => handleEditUnidad(unidad)}
                      disabled={disabled}
                      sx={{
                        color: 'text.secondary',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.04)',
                          color: 'text.primary'
                        }
                      }}
                    >
                      <Edit sx={{ fontSize: 16 }} />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteUnidad(unidad.idUnidad)}
                      disabled={disabled}
                      sx={{
                        color: 'text.secondary',
                        '&:hover': {
                          backgroundColor: 'rgba(211, 47, 47, 0.04)',
                          color: 'error.main'
                        }
                      }}
                    >
                      <Delete sx={{ fontSize: 16 }} />
                    </IconButton>
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
                <TableCell sx={{ fontWeight: '600', fontSize: '0.875rem' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: '600', fontSize: '0.875rem' }}>Tipo</TableCell>
                <TableCell sx={{ fontWeight: '600', fontSize: '0.875rem' }}>Descripción</TableCell>
                <TableCell sx={{ fontWeight: '600', fontSize: '0.875rem' }}>Peso (kg)</TableCell>
                <TableCell sx={{ fontWeight: '600', fontSize: '0.875rem' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {unidades.map((unidad) => (
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
                      {unidad.descripcion}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="500" color="primary.main">
                      {unidad.peso_bruto}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleEditUnidad(unidad)}
                        disabled={disabled}
                        sx={{
                          color: 'text.secondary',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                            color: 'text.primary'
                          }
                        }}
                      >
                        <Edit sx={{ fontSize: 16 }} />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteUnidad(unidad.idUnidad)}
                        disabled={disabled}
                        sx={{
                          color: 'text.secondary',
                          '&:hover': {
                            backgroundColor: 'rgba(211, 47, 47, 0.04)',
                            color: 'error.main'
                          }
                        }}
                      >
                        <Delete sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Modal de formulario de unidad */}
      <UnidadCargaForm
        open={unidadFormOpen}
        onClose={handleCloseUnidadForm}
        unidad={editingUnidad}
        onSave={handleSaveUnidad}
        guiaId={guiaId}
        existingUnidades={unidades}
      />
    </Box>
  );
}
