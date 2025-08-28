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
  Assignment,
  Business,
  CalendarToday,
  Scale,
  Storage,
  Close,
  Save,
} from "@mui/icons-material";
import { customers } from "../customer/Customers";
import UnidadesCargaList from "./UnidadesCargaList";

export default function GuiaCargaForm({ open, onClose, guia = null, onSave }) {
  const [formData, setFormData] = useState({
    factura_comercial: "",
    fecha_ingreso: "",
    unidades_carga: "",
    unidades_producto: "",
    peso_total: "",
    contenedores: "",
    espacio_ocupado: "",
    CLIENTE_idCliente: "",
  });

  const [unidadesCarga, setUnidadesCarga] = useState([]);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (guia) {
      setFormData({
        idGuia: guia.idGuia,
        factura_comercial: guia.factura_comercial || "",
        fecha_ingreso: guia.fecha_ingreso ? guia.fecha_ingreso.split('T')[0] : "",
        unidades_carga: guia.unidades_carga || "",
        unidades_producto: guia.unidades_producto || "",
        peso_total: guia.peso_total || "",
        contenedores: guia.contenedores || "",
        espacio_ocupado: guia.espacio_ocupado || "",
        CLIENTE_idCliente: guia.CLIENTE_idCliente !== undefined && guia.CLIENTE_idCliente !== null ? guia.CLIENTE_idCliente : "",
      });
      // Cargar unidades de carga existentes si las hay
      if (guia.unidadesCarga) {
        setUnidadesCarga(guia.unidadesCarga);
      } else {
        setUnidadesCarga([]);
      }
    } else {
      setFormData({
        factura_comercial: "",
        fecha_ingreso: "",
        unidades_carga: "",
        unidades_producto: "",
        peso_total: "",
        contenedores: "",
        espacio_ocupado: "",
        CLIENTE_idCliente: "",
      });
      setUnidadesCarga([]);
    }
    setErrors({});
  }, [guia, open]);

  const handleChange = (field) => (event) => {
    const newValue = event.target.value;
    console.log(`Campo ${field} cambiado a:`, newValue, "Tipo:", typeof newValue);
    
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
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.factura_comercial.trim()) {
      newErrors.factura_comercial = "La factura comercial es requerida";
    }

    if (!formData.fecha_ingreso.trim()) {
      newErrors.fecha_ingreso = "La fecha de ingreso es requerida";
    }

    if (!formData.unidades_producto.trim()) {
      newErrors.unidades_producto = "Las unidades de producto son requeridas";
    } else if (isNaN(formData.unidades_producto) || parseInt(formData.unidades_producto) <= 0) {
      newErrors.unidades_producto = "Debe ser un número mayor a 0";
    }

    if (!formData.contenedores.trim()) {
      newErrors.contenedores = "El número de contenedores es requerido";
    } else if (isNaN(formData.contenedores) || parseInt(formData.contenedores) <= 0) {
      newErrors.contenedores = "Debe ser un número mayor a 0";
    }

    if (!formData.espacio_ocupado.trim()) {
      newErrors.espacio_ocupado = "El espacio ocupado es requerido";
    } else if (isNaN(formData.espacio_ocupado) || parseFloat(formData.espacio_ocupado) <= 0) {
      newErrors.espacio_ocupado = "Debe ser un número mayor a 0";
    }

    if (!formData.CLIENTE_idCliente) {
      newErrors.CLIENTE_idCliente = "El cliente es requerido";
    }

    // Validar que haya al menos una unidad de carga
    if (unidadesCarga.length === 0) {
      newErrors.unidadesCarga = "Debe agregar al menos una unidad de carga";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Actualizar el número de unidades de carga basado en las unidades agregadas
      const updatedFormData = {
        ...formData,
        CLIENTE_idCliente: parseInt(formData.CLIENTE_idCliente), // Asegurar que sea número
        unidades_carga: unidadesCarga.length.toString(),
        peso_total: calcularPesoTotalUnidades().toString(),
        unidadesCarga: unidadesCarga, // Incluir las unidades de carga en los datos
      };
      console.log("Datos del formulario a guardar:", updatedFormData);
      onSave(updatedFormData);
      onClose();
    }
  };

  const calcularPesoTotalUnidades = () => {
    return unidadesCarga.reduce((total, unidad) => {
      const peso = parseFloat(unidad.peso_bruto) || 0;
      return total + peso;
    }, 0);
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
          <Assignment sx={{ mr: 2 }} />
          <Typography variant="h6">
            {guia ? "Editar Guía de Carga" : "Nueva Guía de Carga"}
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
              <Assignment sx={{ mr: 1 }} />
              Información Principal
            </Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Factura Comercial"
              value={formData.factura_comercial}
              onChange={handleChange("factura_comercial")}
              error={!!errors.factura_comercial}
              helperText={errors.factura_comercial}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Fecha de Ingreso"
              type="date"
              value={formData.fecha_ingreso}
              onChange={handleChange("fecha_ingreso")}
              error={!!errors.fecha_ingreso}
              helperText={errors.fecha_ingreso}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth error={!!errors.CLIENTE_idCliente}>
              <InputLabel>Cliente</InputLabel>
              <Select
                value={formData.CLIENTE_idCliente || ""}
                label="Cliente"
                onChange={handleChange("CLIENTE_idCliente")}
              >
                {customers.map((cliente) => (
                  <MenuItem key={cliente.idCliente} value={cliente.idCliente}>
                    {cliente.nombre} - {cliente.nit}
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

          {/* Información de Carga */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, mt: 2, display: 'flex', alignItems: 'center' }}>
              <Storage sx={{ mr: 1 }} />
              Información de Carga
            </Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Unidades de Carga"
              type="number"
              value={unidadesCarga.length}
              InputProps={{
                readOnly: true,
              }}
              helperText="Calculado automáticamente según las unidades agregadas"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Unidades de Producto"
              type="number"
              value={formData.unidades_producto}
              onChange={handleChange("unidades_producto")}
              error={!!errors.unidades_producto}
              helperText={errors.unidades_producto}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Número de Contenedores"
              type="number"
              value={formData.contenedores}
              onChange={handleChange("contenedores")}
              error={!!errors.contenedores}
              helperText={errors.contenedores}
              required
            />
          </Grid>

          {/* Información de Peso y Espacio */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, mt: 2, display: 'flex', alignItems: 'center' }}>
              <Scale sx={{ mr: 1 }} />
              Peso y Espacio
            </Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Peso Total (kg)"
              type="number"
              value={calcularPesoTotalUnidades()}
              InputProps={{
                readOnly: true,
              }}
              helperText="Calculado automáticamente según las unidades agregadas"
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
            />
          </Grid>

          {/* Sección de Unidades de Carga */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, mt: 2, display: 'flex', alignItems: 'center' }}>
              <Storage sx={{ mr: 1 }} />
              Gestión de Unidades de Carga
            </Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>

          <Grid item xs={12}>
            <UnidadesCargaList
              unidades={unidadesCarga}
              onUnidadesChange={setUnidadesCarga}
              guiaId={formData.idGuia || 'nueva'}
            />
            {errors.unidadesCarga && (
              <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                {errors.unidadesCarga}
              </Typography>
            )}
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
          {guia ? "Actualizar" : "Guardar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
