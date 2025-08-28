import React, { Component } from "react";
import MovimientoList from "./MovimientoList";
import MovimientoForm from "./MovimientoForm";
import { Box, Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";

export default class Movimiento extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formOpen: false,
      editingMovimiento: null,
    };
  }

  handleAddMovimiento = () => {
    this.setState({
      formOpen: true,
      editingMovimiento: null,
    });
  };

  handleEditMovimiento = (movimiento) => {
    this.setState({
      formOpen: true,
      editingMovimiento: movimiento,
    });
  };

  handleCloseForm = () => {
    this.setState({
      formOpen: false,
      editingMovimiento: null,
    });
  };

  handleSaveMovimiento = (movimientoData) => {
    // Aquí se implementaría la lógica para guardar en la base de datos
    console.log("Guardando movimiento:", movimientoData);
    
    // Por ahora, solo cerramos el formulario
    this.handleCloseForm();
    
    // En una implementación real, aquí se haría una llamada a la API
    // y se actualizaría la lista de movimientos
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
            Movimientos
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={this.handleAddMovimiento}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
              py: 1,
            }}
          >
            Nuevo Movimiento
          </Button>
        </Box>
        
        <MovimientoList 
          onEditMovimiento={this.handleEditMovimiento}
        />
        
        <MovimientoForm
          open={this.state.formOpen}
          onClose={this.handleCloseForm}
          movimiento={this.state.editingMovimiento}
          onSave={this.handleSaveMovimiento}
        />
      </Box>
    );
  }
}
