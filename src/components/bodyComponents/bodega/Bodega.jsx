import React, { Component } from "react";
import BodegaList from "./BodegaList";
import BodegaForm from "./BodegaForm";
import { Box, Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";

export default class Bodega extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formOpen: false,
      editingBodega: null,
    };
  }

  handleAddBodega = () => {
    this.setState({
      formOpen: true,
      editingBodega: null,
    });
  };

  handleEditBodega = (bodega) => {
    this.setState({
      formOpen: true,
      editingBodega: bodega,
    });
  };

  handleCloseForm = () => {
    this.setState({
      formOpen: false,
      editingBodega: null,
    });
  };

  handleSaveBodega = (bodegaData) => {
    // Aquí se implementaría la lógica para guardar en la base de datos
    console.log("Guardando bodega:", bodegaData);
    
    // Por ahora, solo cerramos el formulario
    this.handleCloseForm();
    
    // En una implementación real, aquí se haría una llamada a la API
    // y se actualizaría la lista de bodegas
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
            Bodegas
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={this.handleAddBodega}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
              py: 1,
            }}
          >
            Nueva Bodega
          </Button>
        </Box>
        
        <BodegaList 
          onEditBodega={this.handleEditBodega}
        />
        
        <BodegaForm
          open={this.state.formOpen}
          onClose={this.handleCloseForm}
          bodega={this.state.editingBodega}
          onSave={this.handleSaveBodega}
        />
      </Box>
    );
  }
}
