import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Typography,
  Box,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";
import {
  Inventory,
  Close,
  Save,
  Edit,
  Delete,
} from "@mui/icons-material";

export default function UnidadCargaForm({ 
  open, 
  onClose, 
  unidad = null, 
  onSave, 
  onDelete,
  guiaId,
  existingUnidades = []
}) {
  const [formData, setFormData] = useState({
    idUnidad: "",
    tipo_unidad: "",
    peso_bruto: "",
    descripcion: "",
    GUIA_DE_CARGA_idGuia: guiaId,
  });

  const [errors, setErrors] = useState({});

  // Generar ID único automáticamente
  const generateUniqueId = () => {
    if (existingUnidades.length === 0) {
      return "UC-001";
    }
    
    // Extraer números de los IDs existentes
    const numbers = existingUnidades
      .map(u => {
        const match = u.idUnidad.match(/UC-(\d+)/);
        return match ? parseInt(match[1]) : 0;
      })
      .filter(num => !isNaN(num));
    
    const maxNumber = Math.max(...numbers, 0);
    const nextNumber = maxNumber + 1;
    
    return `UC-${nextNumber.toString().padStart(3, '0')}`;
  };

  useEffect(() => {
    if (unidad) {
      // Modo edición
      setFormData({
        idUnidad: unidad.idUnidad,
        tipo_unidad: unidad.tipo_unidad || "",
        peso_bruto: unidad.peso_bruto || "",
        descripcion: unidad.descripcion || "",
        GUIA_DE_CARGA_idGuia: guiaId,
      });
    } else {
      // Modo creación
      setFormData({
        idUnidad: generateUniqueId(),
        tipo_unidad: "",
        peso_bruto: "",
        descripcion: "",
        GUIA_DE_CARGA_idGuia: guiaId,
      });
    }
    setErrors({});
  }, [unidad, open, guiaId, existingUnidades]);

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.tipo_unidad.trim()) {
      newErrors.tipo_unidad = "El tipo de unidad es requerido";
    }

    if (!formData.peso_bruto.trim()) {
      newErrors.peso_bruto = "El peso bruto es requerido";
    } else if (isNaN(formData.peso_bruto) || parseFloat(formData.peso_bruto) <= 0) {
      newErrors.peso_bruto = "Debe ser un número mayor a 0";
    }

    if (!formData.descripcion.trim()) {
      newErrors.descripcion = "La descripción es requerida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  const handleDelete = () => {
    if (unidad && onDelete) {
      onDelete(unidad.idUnidad);
      onClose();
    }
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  const tiposUnidad = [
    "Pallet",
    "Caja",
    "Contenedor",
    "Contenedor Refrigerado",
    "Saco",
    "Tambor",
    "Bidón",
    "Otro"
  ];

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
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
            {unidad ? "Editar Unidad de Carga" : "Nueva Unidad de Carga"}
          </Typography>
        </Box>
        <IconButton onClick={handleClose} sx={{ color: 'white' }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
              <Typography variant="body2" color="text.secondary">
                <strong>ID de Unidad:</strong> {formData.idUnidad}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Guía de Carga:</strong> #{guiaId}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth error={!!errors.tipo_unidad}>
              <InputLabel>Tipo de Unidad</InputLabel>
              <Select
                value={formData.tipo_unidad}
                label="Tipo de Unidad"
                onChange={handleChange("tipo_unidad")}
              >
                {tiposUnidad.map((tipo) => (
                  <MenuItem key={tipo} value={tipo}>
                    {tipo}
                  </MenuItem>
                ))}
              </Select>
              {errors.tipo_unidad && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                  {errors.tipo_unidad}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Peso Bruto (kg)"
              type="number"
              value={formData.peso_bruto}
              onChange={handleChange("peso_bruto")}
              error={!!errors.peso_bruto}
              helperText={errors.peso_bruto}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descripción"
              multiline
              rows={3}
              value={formData.descripcion}
              onChange={handleChange("descripcion")}
              error={!!errors.descripcion}
              helperText={errors.descripcion}
              required
              placeholder="Describe el contenido de esta unidad de carga..."
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        {unidad && onDelete && (
          <Button 
            onClick={handleDelete} 
            variant="outlined" 
            color="error"
            startIcon={<Delete />}
          >
            Eliminar
          </Button>
        )}
        <Box sx={{ flexGrow: 1 }} />
        <Button onClick={handleClose} variant="outlined">
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          startIcon={unidad ? <Edit /> : <Save />}
        >
          {unidad ? "Actualizar" : "Guardar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
