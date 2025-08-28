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
} from "@mui/material";
import {
  Inventory,
  Category,
  Warehouse,
  Scale,
  Close,
  Save,
} from "@mui/icons-material";
import { categorias } from "./Categorias";
import { bodegas } from "./Bodegas";

export default function ProductoForm({ open, onClose, producto = null, onSave }) {
  const [formData, setFormData] = useState({
    nombre: "",
    referencia: "",
    serial: "",
    estado: "DISPONIBLE",
    peso: "",
    observacion: "",
    UNIDAD_DE_CARGA_idUnidad: "",
    BODEGA_idBodega: "",
    CATEGORIA_idCategoria: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (producto) {
      setFormData({
        idProducto: producto.idProducto,
        nombre: producto.nombre || "",
        referencia: producto.referencia || "",
        serial: producto.serial || "",
        estado: producto.estado || "DISPONIBLE",
        peso: producto.peso || "",
        observacion: producto.observacion || "",
        UNIDAD_DE_CARGA_idUnidad: producto.UNIDAD_DE_CARGA_idUnidad || "",
        BODEGA_idBodega: producto.BODEGA_idBodega || "",
        CATEGORIA_idCategoria: producto.CATEGORIA_idCategoria || "",
      });
    } else {
      setFormData({
        nombre: "",
        referencia: "",
        serial: "",
        estado: "DISPONIBLE",
        peso: "",
        observacion: "",
        UNIDAD_DE_CARGA_idUnidad: "",
        BODEGA_idBodega: "",
        CATEGORIA_idCategoria: "",
      });
    }
    setErrors({});
  }, [producto, open]);

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
      newErrors.nombre = "El nombre del producto es requerido";
    }

    if (!formData.referencia.trim()) {
      newErrors.referencia = "La referencia es requerida";
    }

    if (!formData.serial.trim()) {
      newErrors.serial = "El serial es requerido";
    }

    if (!formData.peso.trim()) {
      newErrors.peso = "El peso es requerido";
    } else if (isNaN(formData.peso) || parseFloat(formData.peso) <= 0) {
      newErrors.peso = "Debe ser un número mayor a 0";
    }

    if (!formData.CATEGORIA_idCategoria) {
      newErrors.CATEGORIA_idCategoria = "La categoría es requerida";
    }

    if (!formData.BODEGA_idBodega) {
      newErrors.BODEGA_idBodega = "La bodega es requerida";
    }

    if (!formData.UNIDAD_DE_CARGA_idUnidad) {
      newErrors.UNIDAD_DE_CARGA_idUnidad = "La unidad de carga es requerida";
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
          <Inventory sx={{ mr: 2 }} />
          <Typography variant="h6">
            {producto ? "Editar Producto" : "Nuevo Producto"}
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
              <Inventory sx={{ mr: 1 }} />
              Información Principal
            </Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Nombre del Producto"
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
              label="Referencia"
              value={formData.referencia}
              onChange={handleChange("referencia")}
              error={!!errors.referencia}
              helperText={errors.referencia}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Serial"
              value={formData.serial}
              onChange={handleChange("serial")}
              error={!!errors.serial}
              helperText={errors.serial}
              required
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
                <MenuItem value="DISPONIBLE">Disponible</MenuItem>
                <MenuItem value="RESERVADO">Reservado</MenuItem>
                <MenuItem value="VENDIDO">Vendido</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Peso (kg)"
              type="number"
              value={formData.peso}
              onChange={handleChange("peso")}
              error={!!errors.peso}
              helperText={errors.peso}
              required
            />
          </Grid>

          {/* Información de Clasificación */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, mt: 2, display: 'flex', alignItems: 'center' }}>
              <Category sx={{ mr: 1 }} />
              Clasificación y Ubicación
            </Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth error={!!errors.CATEGORIA_idCategoria}>
              <InputLabel>Categoría</InputLabel>
              <Select
                value={formData.CATEGORIA_idCategoria}
                label="Categoría"
                onChange={handleChange("CATEGORIA_idCategoria")}
              >
                {categorias.map((categoria) => (
                  <MenuItem key={categoria.idCategoria} value={categoria.idCategoria}>
                    {categoria.nombre} - {categoria.descripcion}
                  </MenuItem>
                ))}
              </Select>
              {errors.CATEGORIA_idCategoria && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                  {errors.CATEGORIA_idCategoria}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth error={!!errors.BODEGA_idBodega}>
              <InputLabel>Bodega</InputLabel>
              <Select
                value={formData.BODEGA_idBodega}
                label="Bodega"
                onChange={handleChange("BODEGA_idBodega")}
              >
                {bodegas.map((bodega) => (
                  <MenuItem key={bodega.idBodega} value={bodega.idBodega}>
                    {bodega.nombre} - {bodega.capacidad} m² ({bodega.estado})
                  </MenuItem>
                ))}
              </Select>
              {errors.BODEGA_idBodega && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                  {errors.BODEGA_idBodega}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth error={!!errors.UNIDAD_DE_CARGA_idUnidad}>
              <InputLabel>Unidad de Carga</InputLabel>
              <Select
                value={formData.UNIDAD_DE_CARGA_idUnidad}
                label="Unidad de Carga"
                onChange={handleChange("UNIDAD_DE_CARGA_idUnidad")}
              >
                {Array.from({ length: 18 }, (_, i) => i + 1).map((id) => (
                  <MenuItem key={id} value={id}>
                    Unidad #{id}
                  </MenuItem>
                ))}
              </Select>
              {errors.UNIDAD_DE_CARGA_idUnidad && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                  {errors.UNIDAD_DE_CARGA_idUnidad}
                </Typography>
              )}
            </FormControl>
          </Grid>

          {/* Observaciones */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, mt: 2, display: 'flex', alignItems: 'center' }}>
              <Warehouse sx={{ mr: 1 }} />
              Observaciones
            </Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Observaciones"
              multiline
              rows={4}
              value={formData.observacion}
              onChange={handleChange("observacion")}
              placeholder="Descripción detallada del producto..."
            />
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
          {producto ? "Actualizar" : "Guardar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
