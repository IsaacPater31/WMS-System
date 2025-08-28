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
} from "@mui/material";
import {
  Business,
  Person,
  Email,
  Phone,
  LocationOn,
  Close,
  Save,
} from "@mui/icons-material";

export default function CustomerForm({ open, onClose, customer = null, onSave }) {
  const [formData, setFormData] = useState({
    nombre: "",
    razon_social: "",
    nit: "",
    direccion: "",
    representante_legal: "",
    email: "",
    telefono: "",
    encargado: "",
    tel_encargado: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (customer) {
      setFormData({
        idCliente: customer.idCliente,
        nombre: customer.nombre || "",
        razon_social: customer.razon_social || "",
        nit: customer.nit || "",
        direccion: customer.direccion || "",
        representante_legal: customer.representante_legal || "",
        email: customer.email || "",
        telefono: customer.telefono || "",
        encargado: customer.encargado || "",
        tel_encargado: customer.tel_encargado || "",
      });
    } else {
      setFormData({
        nombre: "",
        razon_social: "",
        nit: "",
        direccion: "",
        representante_legal: "",
        email: "",
        telefono: "",
        encargado: "",
        tel_encargado: "",
      });
    }
    setErrors({});
  }, [customer, open]);

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
      newErrors.nombre = "El nombre es requerido";
    }

    if (!formData.razon_social.trim()) {
      newErrors.razon_social = "La razón social es requerida";
    }

    if (!formData.nit.trim()) {
      newErrors.nit = "El NIT es requerido";
    } else if (!/^\d{9,10}-\d$/.test(formData.nit)) {
      newErrors.nit = "Formato de NIT inválido (ej: 123456789-0)";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Formato de email inválido";
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = "El teléfono es requerido";
    }

    if (!formData.representante_legal.trim()) {
      newErrors.representante_legal = "El representante legal es requerido";
    }

    if (!formData.encargado.trim()) {
      newErrors.encargado = "El encargado es requerido";
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
          <Business sx={{ mr: 2 }} />
          <Typography variant="h6">
            {customer ? "Editar Cliente" : "Nuevo Cliente"}
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
              <Business sx={{ mr: 1 }} />
              Información Principal
            </Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Nombre del Cliente"
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
              label="Razón Social"
              value={formData.razon_social}
              onChange={handleChange("razon_social")}
              error={!!errors.razon_social}
              helperText={errors.razon_social}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="NIT"
              value={formData.nit}
              onChange={handleChange("nit")}
              error={!!errors.nit}
              helperText={errors.nit || "Formato: 123456789-0"}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Representante Legal"
              value={formData.representante_legal}
              onChange={handleChange("representante_legal")}
              error={!!errors.representante_legal}
              helperText={errors.representante_legal}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Dirección"
              value={formData.direccion}
              onChange={handleChange("direccion")}
              multiline
              rows={2}
            />
          </Grid>

          {/* Información de Contacto */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, mt: 2, display: 'flex', alignItems: 'center' }}>
              <Person sx={{ mr: 1 }} />
              Información de Contacto
            </Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Encargado"
              value={formData.encargado}
              onChange={handleChange("encargado")}
              error={!!errors.encargado}
              helperText={errors.encargado}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange("email")}
              error={!!errors.email}
              helperText={errors.email}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Teléfono"
              value={formData.telefono}
              onChange={handleChange("telefono")}
              error={!!errors.telefono}
              helperText={errors.telefono}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Teléfono del Encargado"
              value={formData.tel_encargado}
              onChange={handleChange("tel_encargado")}
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
          {customer ? "Actualizar" : "Guardar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
