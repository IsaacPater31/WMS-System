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
  SwapHoriz,
  Assignment,
  Business,
  Close,
  Save,
  CalendarToday,
} from "@mui/icons-material";
import { productos } from "../producto/Productos";
import { guiasCarga } from "../guiaCarga/GuiasCarga";

export default function MovimientoForm({ open, onClose, movimiento = null, onSave }) {
  const [formData, setFormData] = useState({
    tipo: "INGRESO",
    cantidad: "",
    fecha_movimiento: "",
    observacion: "",
    GUIA_DE_CARGA_idGuia: "",
    GUIA_DE_CARGA_CLIENTE_idCliente: "",
    PRODUCTO_idProducto: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (movimiento) {
      setFormData({
        idMovimiento: movimiento.idMovimiento,
        tipo: movimiento.tipo || "INGRESO",
        cantidad: movimiento.cantidad || "",
        fecha_movimiento: movimiento.fecha_movimiento || "",
        observacion: movimiento.observacion || "",
        GUIA_DE_CARGA_idGuia: movimiento.GUIA_DE_CARGA_idGuia || "",
        GUIA_DE_CARGA_CLIENTE_idCliente: movimiento.GUIA_DE_CARGA_CLIENTE_idCliente || "",
        PRODUCTO_idProducto: movimiento.PRODUCTO_idProducto || "",
      });
    } else {
      // Establecer fecha actual por defecto
      const today = new Date().toISOString().split('T')[0];
      setFormData({
        tipo: "INGRESO",
        cantidad: "",
        fecha_movimiento: today,
        observacion: "",
        GUIA_DE_CARGA_idGuia: "",
        GUIA_DE_CARGA_CLIENTE_idCliente: "",
        PRODUCTO_idProducto: "",
      });
    }
    setErrors({});
  }, [movimiento, open]);

  const handleChange = (field) => (event) => {
    const newValue = event.target.value;
    setFormData({
      ...formData,
      [field]: newValue,
    });
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: "",
      });
    }

    // Validación en tiempo real para productos no nacionalizados
    if (field === "PRODUCTO_idProducto" || field === "tipo") {
      const tipoMovimiento = field === "tipo" ? newValue : formData.tipo;
      const productoId = field === "PRODUCTO_idProducto" ? newValue : formData.PRODUCTO_idProducto;
      
      if (tipoMovimiento === "SALIDA" && productoId) {
        const productoSeleccionado = productos.find(p => p.idProducto === parseInt(productoId));
        if (productoSeleccionado && productoSeleccionado.estado === "NO NACIONALIZADO") {
          setErrors({
            ...errors,
            tipo: "Los productos no nacionalizados no pueden hacer salidas",
          });
        } else {
          // Limpiar error si el producto es nacionalizado
          if (errors.tipo && errors.tipo.includes("no nacionalizados")) {
            setErrors({
              ...errors,
              tipo: "",
            });
          }
        }
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.cantidad.trim()) {
      newErrors.cantidad = "La cantidad es requerida";
    } else if (isNaN(formData.cantidad) || parseInt(formData.cantidad) === 0) {
      newErrors.cantidad = "Debe ser un número diferente de 0";
    }

    if (!formData.fecha_movimiento.trim()) {
      newErrors.fecha_movimiento = "La fecha es requerida";
    }

    if (!formData.GUIA_DE_CARGA_idGuia) {
      newErrors.GUIA_DE_CARGA_idGuia = "La guía de carga es requerida";
    }

    if (!formData.PRODUCTO_idProducto) {
      newErrors.PRODUCTO_idProducto = "El producto es requerido";
    }

    // Validación: Productos no nacionalizados no pueden hacer salidas
    if (formData.tipo === "SALIDA" && formData.PRODUCTO_idProducto) {
      const productoSeleccionado = productos.find(p => p.idProducto === parseInt(formData.PRODUCTO_idProducto));
      if (productoSeleccionado && productoSeleccionado.estado === "NO NACIONALIZADO") {
        newErrors.tipo = "Los productos no nacionalizados no pueden hacer salidas";
      }
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
          <SwapHoriz sx={{ mr: 2 }} />
          <Typography variant="h6">
            {movimiento ? "Editar Movimiento" : "Nuevo Movimiento"}
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
              <SwapHoriz sx={{ mr: 1 }} />
              Información Principal
            </Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth error={!!errors.tipo}>
              <InputLabel>Tipo de Movimiento</InputLabel>
              <Select
                value={formData.tipo}
                label="Tipo de Movimiento"
                onChange={handleChange("tipo")}
              >
                <MenuItem value="INGRESO">Ingreso</MenuItem>
                <MenuItem value="SALIDA">Salida</MenuItem>
                <MenuItem value="TRANSFERENCIA">Transferencia</MenuItem>
                <MenuItem value="AJUSTE">Ajuste</MenuItem>
              </Select>
              {errors.tipo && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                  {errors.tipo}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Cantidad"
              type="number"
              value={formData.cantidad}
              onChange={handleChange("cantidad")}
              error={!!errors.cantidad}
              helperText={errors.cantidad}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Fecha del Movimiento"
              type="date"
              value={formData.fecha_movimiento}
              onChange={handleChange("fecha_movimiento")}
              error={!!errors.fecha_movimiento}
              helperText={errors.fecha_movimiento}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Observación"
              value={formData.observacion}
              onChange={handleChange("observacion")}
              placeholder="Descripción del movimiento..."
            />
          </Grid>

          {/* Información de Producto */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, mt: 2, display: 'flex', alignItems: 'center' }}>
              <Business sx={{ mr: 1 }} />
              Producto
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
                    {producto.nombre} - {producto.referencia} ({producto.estado})
                  </MenuItem>
                ))}
              </Select>
              {errors.PRODUCTO_idProducto && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                  {errors.PRODUCTO_idProducto}
                </Typography>
              )}
              {formData.PRODUCTO_idProducto && formData.tipo === "SALIDA" && (() => {
                const productoSeleccionado = productos.find(p => p.idProducto === parseInt(formData.PRODUCTO_idProducto));
                if (productoSeleccionado && productoSeleccionado.estado === "NO NACIONALIZADO") {
                  return (
                    <Typography variant="caption" color="warning.main" sx={{ mt: 0.5, ml: 1.5, fontWeight: 'bold' }}>
                      ⚠️ Este producto no está nacionalizado y no puede hacer salidas
                    </Typography>
                  );
                }
                return null;
              })()}
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
            <FormControl fullWidth>
              <InputLabel>Cliente de la Guía</InputLabel>
              <Select
                value={formData.GUIA_DE_CARGA_CLIENTE_idCliente}
                label="Cliente de la Guía"
                onChange={handleChange("GUIA_DE_CARGA_CLIENTE_idCliente")}
              >
                {guiasCarga.map((guia) => (
                  <MenuItem key={guia.idGuia} value={guia.CLIENTE_idCliente}>
                    {guia.cliente?.nombre} - {guia.factura_comercial}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Información Adicional */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, mt: 2, display: 'flex', alignItems: 'center' }}>
              <CalendarToday sx={{ mr: 1 }} />
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
                • <strong>Ingreso:</strong> Aumenta el inventario del producto
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                • <strong>Salida:</strong> Disminuye el inventario del producto
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                • <strong>Transferencia:</strong> Reubica productos entre ubicaciones
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                • <strong>Ajuste:</strong> Corrige discrepancias en el inventario
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                • La cantidad puede ser positiva o negativa según el tipo de movimiento
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
          {movimiento ? "Actualizar" : "Guardar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
