import React, { Component } from "react";
import ExistenciaList from "./ExistenciaList";
import ExistenciaForm from "./ExistenciaForm";
import { Box, Button, Typography, useTheme, useMediaQuery } from "@mui/material";
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
      <ResponsiveExistencia 
        onAddExistencia={this.handleAddExistencia}
        onEditExistencia={this.handleEditExistencia}
        onCloseForm={this.handleCloseForm}
        onSaveExistencia={this.handleSaveExistencia}
        formOpen={this.state.formOpen}
        editingExistencia={this.state.editingExistencia}
      />
    );
  }
}

// Componente funcional para manejar la responsividad
function ResponsiveExistencia({ 
  onAddExistencia, 
  onEditExistencia, 
  onCloseForm, 
  onSaveExistencia, 
  formOpen, 
  editingExistencia 
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Box sx={{ 
      m: 0, 
      p: isMobile ? 1 : 3, 
      width: "100%",
      maxWidth: "100%",
      overflow: "hidden"
    }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between', 
        alignItems: isMobile ? 'stretch' : 'center', 
        mb: 3,
        gap: isMobile ? 2 : 0
      }}>
        <Typography 
          variant={isMobile ? "h6" : "h5"} 
          fontWeight="bold" 
          color="primary.main"
          sx={{ 
            textAlign: isMobile ? 'center' : 'left',
            mb: isMobile ? 1 : 0
          }}
        >
          Lista de Existencias
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={onAddExistencia}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            px: isMobile ? 2 : 3,
            py: isMobile ? 1.5 : 1,
            width: isMobile ? '100%' : 'auto',
            minWidth: isMobile ? 'auto' : 150
          }}
        >
          Nueva Existencia
        </Button>
      </Box>
      
      <ExistenciaList 
        onEditExistencia={onEditExistencia}
        isMobile={isMobile}
        isTablet={isTablet}
      />
      
      <ExistenciaForm
        open={formOpen}
        onClose={onCloseForm}
        existencia={editingExistencia}
        onSave={onSaveExistencia}
        isMobile={isMobile}
      />
    </Box>
  );
}
