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
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  InputAdornment,
} from "@mui/material";
import {
  Warehouse,
  Storage,
  Person,
  Close,
  Save,
  Add,
} from "@mui/icons-material";


export default function BodegaForm({ open, onClose, bodega = null, onSave }) {
  const [formData, setFormData] = useState({
    nombre: "",
    capacidad: "",
    estado: "ACTIVA",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (bodega) {
      setFormData({
        idBodega: bodega.idBodega,
        nombre: bodega.nombre || "",
        capacidad: bodega.capacidad || "",
        estado: bodega.estado || "ACTIVA",
      });
    } else {
      setFormData({
        nombre: "",
        capacidad: "",
        estado: "ACTIVA",
      });
    }
    setErrors({});
  }, [bodega, open]);

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

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre de la bodega es requerido";
    } else if (formData.nombre.trim().length > 45) {
      newErrors.nombre = "El nombre no puede exceder 45 caracteres";
    }

    if (!formData.capacidad.trim()) {
      newErrors.capacidad = "La capacidad es requerida";
    } else if (isNaN(formData.capacidad) || parseFloat(formData.capacidad) <= 0) {
      newErrors.capacidad = "Debe ser un número mayor a 0";
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

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
          <Warehouse sx={{ mr: 2 }} />
          <Typography variant="h6">
            {bodega ? "Editar Bodega" : "Nueva Bodega"}
          </Typography>
        </Box>
        <IconButton onClick={handleClose} sx={{ color: 'white' }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Grid container spacing={3}>
          {/* Información Principal */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Warehouse sx={{ mr: 1 }} />
              Información Principal
            </Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Nombre de la Bodega"
              value={formData.nombre}
              onChange={handleChange("nombre")}
              error={!!errors.nombre}
              helperText={errors.nombre}
              required
            />
          </Grid>

                     <Grid item xs={12} md={6}>
             <TextField
               fullWidth
               label="Capacidad (metros cuadrados)"
               type="number"
               value={formData.capacidad}
               onChange={handleChange("capacidad")}
               error={!!errors.capacidad}
               helperText={errors.capacidad}
               required
               InputProps={{
                 endAdornment: <InputAdornment position="end">m²</InputAdornment>,
               }}
             />
           </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth error={!!errors.estado}>
              <InputLabel>Estado</InputLabel>
              <Select
                value={formData.estado}
                label="Estado"
                onChange={handleChange("estado")}
              >
                <MenuItem value="ACTIVA">Activa</MenuItem>
                <MenuItem value="INACTIVA">Inactiva</MenuItem>
                <MenuItem value="MANTENIMIENTO">Mantenimiento</MenuItem>
              </Select>
            </FormControl>
          </Grid>



          {/* Información Adicional */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, mt: 2, display: 'flex', alignItems: 'center' }}>
              <Storage sx={{ mr: 1 }} />
              Información Adicional
            </Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>

                     <Grid item xs={12}>
             <Alert severity="info" sx={{ mb: 2 }}>
               <Typography variant="body2">
                 <strong>Información importante:</strong>
               </Typography>
               <Box sx={{ mt: 1 }}>
                 <Typography variant="body2" sx={{ mb: 0.5 }}>
                   • <strong>ACTIVA:</strong> Bodega disponible para almacenamiento
                 </Typography>
                 <Typography variant="body2" sx={{ mb: 0.5 }}>
                   • <strong>INACTIVA:</strong> Bodega no disponible para nuevos ingresos
                 </Typography>
                                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                     • <strong>Capacidad:</strong> Se mide en metros cuadrados (m²)
                   </Typography>

               </Box>
             </Alert>
           </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={handleClose} variant="outlined">
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          startIcon={<Save />}
        >
          {bodega ? "Actualizar" : "Guardar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
