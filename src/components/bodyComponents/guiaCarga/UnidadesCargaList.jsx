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
        mb: 2 
      }}>
        <Box>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
            <Inventory sx={{ mr: 1 }} />
            Unidades de Carga
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {unidades.length} unidad{unidades.length !== 1 ? 'es' : ''} | 
            Peso total: {calcularPesoTotal().toFixed(2)} kg
          </Typography>
        </Box>
        {!disabled && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleAddUnidad}
            size="small"
          >
            Agregar Unidad
          </Button>
        )}
      </Box>

      {/* Tabla de unidades */}
      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.main' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '80px' }}>
                ID
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                Tipo
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                Peso
              </TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                Descripción
              </TableCell>
              {!disabled && (
                <TableCell sx={{ color: 'white', fontWeight: 'bold', width: '120px' }}>
                  Acciones
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {unidades.length > 0 ? (
              unidades.map((unidad) => (
                <TableRow key={unidad.idUnidad} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        sx={{ 
                          width: 24, 
                          height: 24, 
                          mr: 1,
                          backgroundColor: 'primary.main',
                          fontSize: '0.7rem'
                        }}
                      >
                        {unidad.idUnidad}
                      </Avatar>
                      <Typography variant="body2" fontWeight="bold">
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
                    <Typography variant="body2" sx={{ 
                      maxWidth: 200, 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {unidad.descripcion}
                    </Typography>
                  </TableCell>
                  {!disabled && (
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleEditUnidad(unidad)}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteUnidad(unidad.idUnidad)}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={disabled ? 4 : 5} align="center" sx={{ py: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    {disabled 
                      ? "No hay unidades de carga registradas" 
                      : "No hay unidades de carga. Haz clic en 'Agregar Unidad' para comenzar."
                    }
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Resumen de tipos */}
      {unidades.length > 0 && (
        <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Resumen por tipo:
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {Object.entries(
              unidades.reduce((acc, unidad) => {
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
              />
            ))}
          </Box>
        </Box>
      )}

      {/* Modal de formulario de unidad */}
      <UnidadCargaForm
        open={unidadFormOpen}
        onClose={handleCloseUnidadForm}
        unidad={editingUnidad}
        onSave={handleSaveUnidad}
        onDelete={handleDeleteUnidad}
        guiaId={guiaId}
        existingUnidades={unidades}
      />
    </Box>
  );
}
