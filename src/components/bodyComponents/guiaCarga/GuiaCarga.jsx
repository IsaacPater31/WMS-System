import React, { Component } from "react";
import GuiaCargaList from "./GuiaCargaList";
import GuiaCargaForm from "./GuiaCargaForm";
import { Box, Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { guiasCarga } from "./GuiasCarga";
import { customers } from "../customer/Customers";

export default class GuiaCarga extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formOpen: false,
      editingGuia: null,
      guias: [], // Lista de guías de carga
    };
  }

  componentDidMount() {
    // Cargar las guías de carga iniciales
    this.loadGuias();
  }

  loadGuias = () => {
    // En una implementación real, esto sería una llamada a la API
    // Por ahora, usamos los datos estáticos
    this.setState({ guias: guiasCarga });
  };

  handleAddGuia = () => {
    this.setState({
      formOpen: true,
      editingGuia: null,
    });
  };

  handleEditGuia = (guia) => {
    this.setState({
      formOpen: true,
      editingGuia: guia,
    });
  };

  handleCloseForm = () => {
    this.setState({
      formOpen: false,
      editingGuia: null,
    });
  };

  handleSaveGuia = (guiaData) => {
    // Aquí se implementaría la lógica para guardar en la base de datos
    console.log("Guardando guía de carga:", guiaData);
    
    // Encontrar el cliente seleccionado (manejar tanto string como number)
    const clienteId = parseInt(guiaData.CLIENTE_idCliente, 10);
    const clienteSeleccionado = customers.find(c => c.idCliente === clienteId);

    if (!clienteSeleccionado) {
      // Si no encontramos el cliente no continuamos
      return;
    }
    
    if (this.state.editingGuia) {
      // Editar guía existente
      const updatedGuias = this.state.guias.map(guia => 
        guia.idGuia === this.state.editingGuia.idGuia 
          ? { 
              ...guiaData, 
              idGuia: guia.idGuia,
              cliente: clienteSeleccionado // Incluir la información del cliente
            }
          : guia
      );
      this.setState({ guias: updatedGuias });
    } else {
      // Agregar nueva guía
      const newGuia = {
        ...guiaData,
        idGuia: Math.max(...this.state.guias.map(g => g.idGuia)) + 1,
        cliente: clienteSeleccionado // Incluir la información del cliente
      };
      this.setState({ guias: [...this.state.guias, newGuia] });
    }
    
    this.handleCloseForm();
  };

  render() {
    return (
      <Box sx={{ m: 0, p: 3, width: "100%" }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 3 
        }}>
          <Typography variant="h4" fontWeight="bold" color="primary.main">
            Guías de Carga
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={this.handleAddGuia}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
              py: 1,
            }}
          >
            Nueva Guía
          </Button>
        </Box>
        
        <GuiaCargaList 
          onEditGuia={this.handleEditGuia}
          guias={this.state.guias}
        />
        
        <GuiaCargaForm
          open={this.state.formOpen}
          onClose={this.handleCloseForm}
          guia={this.state.editingGuia}
          onSave={this.handleSaveGuia}
        />
      </Box>
    );
  }
}
