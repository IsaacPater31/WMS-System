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
  Storage,
  Assignment,
  Business,
  Close,
  Save,
} from "@mui/icons-material";
import { productos } from "../producto/Productos";
import { guiasCarga } from "../guiaCarga/GuiasCarga";
import { bodegas } from "../producto/Bodegas";

export default function ExistenciaForm({ open, onClose, existencia = null, onSave }) {
  const [formData, setFormData] = useState({
    cantidad: "",
    cantidad_nacionalizado: "",
    cantidad_no_nacionalizado: "",
    espacio_ocupado: "",
    GUIA_DE_CARGA_idGuia: "",
    GUIA_DE_CARGA_CLIENTE_idCliente: "",
    PRODUCTO_idProducto: "",
    PRODUCTO_BODEGA_idBodega: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (existencia) {
      setFormData({
        idExistencia: existencia.idExistencia,
        cantidad: existencia.cantidad || "",
        cantidad_nacionalizado: existencia.cantidad_nacionalizado || "",
        cantidad_no_nacionalizado: existencia.cantidad_no_nacionalizado || "",
        espacio_ocupado: existencia.espacio_ocupado || "",
        GUIA_DE_CARGA_idGuia: existencia.GUIA_DE_CARGA_idGuia || "",
        GUIA_DE_CARGA_CLIENTE_idCliente: existencia.GUIA_DE_CARGA_CLIENTE_idCliente || "",
        PRODUCTO_idProducto: existencia.PRODUCTO_idProducto || "",
        PRODUCTO_BODEGA_idBodega: existencia.PRODUCTO_BODEGA_idBodega || "",
      });
    } else {
      setFormData({
        cantidad: "",
        cantidad_nacionalizado: "",
        cantidad_no_nacionalizado: "",
        espacio_ocupado: "",
        GUIA_DE_CARGA_idGuia: "",
        GUIA_DE_CARGA_CLIENTE_idCliente: "",
        PRODUCTO_idProducto: "",
        PRODUCTO_BODEGA_idBodega: "",
      });
    }
    setErrors({});
  }, [existencia, open]);

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

    if (!formData.cantidad || formData.cantidad <= 0) {
      newErrors.cantidad = "La cantidad debe ser mayor a 0";
    }

    if (!formData.cantidad_nacionalizado || formData.cantidad_nacionalizado < 0) {
      newErrors.cantidad_nacionalizado = "La cantidad nacionalizada debe ser mayor o igual a 0";
    }

    if (!formData.cantidad_no_nacionalizado || formData.cantidad_no_nacionalizado < 0) {
      newErrors.cantidad_no_nacionalizado = "La cantidad no nacionalizada debe ser mayor o igual a 0";
    }

    // Validar que la suma de nacionalizado + no nacionalizado = cantidad total
    const totalCalculado = parseInt(formData.cantidad_nacionalizado || 0) + parseInt(formData.cantidad_no_nacionalizado || 0);
    const cantidadTotal = parseInt(formData.cantidad || 0);
    
    if (totalCalculado !== cantidadTotal) {
      newErrors.cantidad = "La cantidad total debe ser igual a la suma de nacionalizado + no nacionalizado";
      newErrors.cantidad_nacionalizado = "Verificar cantidades";
      newErrors.cantidad_no_nacionalizado = "Verificar cantidades";
    }

    if (!formData.espacio_ocupado || formData.espacio_ocupado <= 0) {
      newErrors.espacio_ocupado = "El espacio ocupado debe ser mayor a 0";
    }

    if (!formData.GUIA_DE_CARGA_idGuia) {
      newErrors.GUIA_DE_CARGA_idGuia = "La guía de carga es requerida";
    }

    if (!formData.PRODUCTO_idProducto) {
      newErrors.PRODUCTO_idProducto = "El producto es requerido";
    }

    if (!formData.PRODUCTO_BODEGA_idBodega) {
      newErrors.PRODUCTO_BODEGA_idBodega = "La bodega es requerida";
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
            {existencia ? "Editar Existencia" : "Nueva Existencia"}
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

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Cantidad Total"
              type="number"
              value={formData.cantidad}
              onChange={handleChange("cantidad")}
              error={!!errors.cantidad}
              helperText={errors.cantidad}
              required
              InputProps={{
                inputProps: { min: 1 }
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Cantidad Nacionalizado"
              type="number"
              value={formData.cantidad_nacionalizado}
              onChange={handleChange("cantidad_nacionalizado")}
              error={!!errors.cantidad_nacionalizado}
              helperText={errors.cantidad_nacionalizado}
              required
              InputProps={{
                inputProps: { min: 0 }
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Cantidad No Nacionalizado"
              type="number"
              value={formData.cantidad_no_nacionalizado}
              onChange={handleChange("cantidad_no_nacionalizado")}
              error={!!errors.cantidad_no_nacionalizado}
              helperText={errors.cantidad_no_nacionalizado}
              required
              InputProps={{
                inputProps: { min: 0 }
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Espacio Ocupado (m²)"
              type="number"
              value={formData.espacio_ocupado}
              onChange={handleChange("espacio_ocupado")}
              error={!!errors.espacio_ocupado}
              helperText={errors.espacio_ocupado}
              required
              InputProps={{
                inputProps: { min: 0.01, step: 0.01 }
              }}
            />
          </Grid>

          {/* Información de Producto */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, mt: 2, display: 'flex', alignItems: 'center' }}>
              <Business sx={{ mr: 1 }} />
              Producto y Bodega
            </Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth error={!!errors.PRODUCTO_idProducto}>
              <InputLabel>Producto</InputLabel>
              <Select
                value={formData.PRODUCTO_idProducto}
                label="Producto"
                onChange={handleChange("PRODUCTO_idProducto")}
              >
                {productos.map((producto) => (
                  <MenuItem key={producto.idProducto} value={producto.idProducto}>
                    {producto.nombre} - {producto.referencia}
                  </MenuItem>
                ))}
              </Select>
              {errors.PRODUCTO_idProducto && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                  {errors.PRODUCTO_idProducto}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth error={!!errors.PRODUCTO_BODEGA_idBodega}>
              <InputLabel>Bodega</InputLabel>
              <Select
                value={formData.PRODUCTO_BODEGA_idBodega}
                label="Bodega"
                onChange={handleChange("PRODUCTO_BODEGA_idBodega")}
              >
                {bodegas.map((bodega) => (
                  <MenuItem key={bodega.idBodega} value={bodega.idBodega}>
                    {bodega.nombre} - {bodega.capacidad} m²
                  </MenuItem>
                ))}
              </Select>
              {errors.PRODUCTO_BODEGA_idBodega && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                  {errors.PRODUCTO_BODEGA_idBodega}
                </Typography>
              )}
            </FormControl>
          </Grid>

          {/* Información de Guía de Carga */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, mt: 2, display: 'flex', alignItems: 'center' }}>
              <Assignment sx={{ mr: 1 }} />
              Guía de Carga
            </Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth error={!!errors.GUIA_DE_CARGA_idGuia}>
              <InputLabel>Guía de Carga</InputLabel>
              <Select
                value={formData.GUIA_DE_CARGA_idGuia}
                label="Guía de Carga"
                onChange={handleChange("GUIA_DE_CARGA_idGuia")}
              >
                {guiasCarga.map((guia) => (
                  <MenuItem key={guia.idGuia} value={guia.idGuia}>
                    {guia.factura_comercial} - {guia.cliente?.nombre}
                  </MenuItem>
                ))}
              </Select>
              {errors.GUIA_DE_CARGA_idGuia && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                  {errors.GUIA_DE_CARGA_idGuia}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth error={!!errors.CLIENTE_idCliente}>
              <InputLabel>Cliente</InputLabel>
              <Select
                value={formData.CLIENTE_idCliente}
                label="Cliente"
                onChange={handleChange("CLIENTE_idCliente")}
              >
                {guiasCarga.map((guia) => (
                  <MenuItem key={guia.idGuia} value={guia.CLIENTE_idCliente}>
                    {guia.cliente?.nombre} - {guia.factura_comercial}
                  </MenuItem>
                ))}
              </Select>
              {errors.CLIENTE_idCliente && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                  {errors.CLIENTE_idCliente}
                </Typography>
              )}
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
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              <strong>Notas:</strong>
            </Typography>
            <Box sx={{ pl: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                • La cantidad total debe ser igual a la suma de nacionalizado + no nacionalizado
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                • Nacionalizado: mercancía que ha completado el proceso aduanero
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                • No nacionalizado: mercancía en tránsito o pendiente de nacionalización
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                • El espacio ocupado se mide en metros cuadrados (m²)
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                • La existencia debe estar asociada a una guía de carga y producto
              </Typography>
            </Box>
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
          {existencia ? "Actualizar" : "Guardar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
