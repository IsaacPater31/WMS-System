import React, { Component } from "react";
import CategoriaList from "./CategoriaList";
import CategoriaForm from "./CategoriaForm";
import { Box, Button, Typography, useTheme, useMediaQuery } from "@mui/material";
import { Add } from "@mui/icons-material";

export default class Categoria extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formOpen: false,
      editingCategoria: null,
    };
  }

  handleAddCategoria = () => {
    this.setState({
      formOpen: true,
      editingCategoria: null,
    });
  };

  handleEditCategoria = (categoria) => {
    this.setState({
      formOpen: true,
      editingCategoria: categoria,
    });
  };

  handleCloseForm = () => {
    this.setState({
      formOpen: false,
      editingCategoria: null,
    });
  };

  handleSaveCategoria = (categoriaData) => {
    // Aquí se implementaría la lógica para guardar en la base de datos
    console.log("Guardando categoría:", categoriaData);
    
    // Por ahora, solo cerramos el formulario
    this.handleCloseForm();
    
    // En una implementación real, aquí se haría una llamada a la API
    // y se actualizaría la lista de categorías
  };

  render() {
    return (
      <ResponsiveCategoria 
        onAddCategoria={this.handleAddCategoria}
        onEditCategoria={this.handleEditCategoria}
        onCloseForm={this.handleCloseForm}
        onSaveCategoria={this.handleSaveCategoria}
        formOpen={this.state.formOpen}
        editingCategoria={this.state.editingCategoria}
      />
    );
  }
}

// Componente funcional para manejar la responsividad
function ResponsiveCategoria({ 
  onAddCategoria, 
  onEditCategoria, 
  onCloseForm, 
  onSaveCategoria, 
  formOpen, 
  editingCategoria 
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
          variant={isMobile ? "h5" : "h4"} 
          fontWeight="bold" 
          color="primary.main"
          sx={{ 
            textAlign: isMobile ? 'center' : 'left',
            mb: isMobile ? 1 : 0
          }}
        >
          Categorías
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={onAddCategoria}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            px: isMobile ? 2 : 3,
            py: isMobile ? 1.5 : 1,
            width: isMobile ? '100%' : 'auto',
            minWidth: isMobile ? 'auto' : 150
          }}
        >
          Nueva Categoría
        </Button>
      </Box>
      
      <CategoriaList 
        onEditCategoria={onEditCategoria}
        isMobile={isMobile}
        isTablet={isTablet}
      />
      
      <CategoriaForm
        open={formOpen}
        onClose={onCloseForm}
        categoria={editingCategoria}
        onSave={onSaveCategoria}
        isMobile={isMobile}
      />
    </Box>
  );
}
