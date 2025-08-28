import React, { Component } from "react";
import ExistenciaList from "./ExistenciaList";
import ExistenciaForm from "./ExistenciaForm";
import { Box, Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";

export default class Existencia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formOpen: false,
      editingExistencia: null,
    };
  }

  handleAddExistencia = () => {
    this.setState({
      formOpen: true,
      editingExistencia: null,
    });
  };

  handleEditExistencia = (existencia) => {
    this.setState({
      formOpen: true,
      editingExistencia: existencia,
    });
  };

  handleCloseForm = () => {
    this.setState({
      formOpen: false,
      editingExistencia: null,
    });
  };

  handleSaveExistencia = (existenciaData) => {
    // Aquí se implementaría la lógica para guardar en la base de datos
    console.log("Guardando existencia:", existenciaData);
    
    // Por ahora, solo cerramos el formulario
    this.handleCloseForm();
    
    // En una implementación real, aquí se haría una llamada a la API
    // y se actualizaría la lista de existencias
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
            Existencias
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={this.handleAddExistencia}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
              py: 1,
            }}
          >
            Nueva Existencia
          </Button>
        </Box>
        
        <ExistenciaList 
          onEditExistencia={this.handleEditExistencia}
        />
        
        <ExistenciaForm
          open={this.state.formOpen}
          onClose={this.handleCloseForm}
          existencia={this.state.editingExistencia}
          onSave={this.handleSaveExistencia}
        />
      </Box>
    );
  }
}
