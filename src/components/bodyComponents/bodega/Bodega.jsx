import React, { Component } from "react";
import BodegaList from "./BodegaList";
import BodegaForm from "./BodegaForm";
import { Box, Button, Typography, useTheme, useMediaQuery } from "@mui/material";
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
      <ResponsiveBodega 
        onAddBodega={this.handleAddBodega}
        onEditBodega={this.handleEditBodega}
        onCloseForm={this.handleCloseForm}
        onSaveBodega={this.handleSaveBodega}
        formOpen={this.state.formOpen}
        editingBodega={this.state.editingBodega}
      />
    );
  }
}

// Componente funcional para manejar la responsividad
function ResponsiveBodega({ 
  onAddBodega, 
  onEditBodega, 
  onCloseForm, 
  onSaveBodega, 
  formOpen, 
  editingBodega 
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
          Bodegas
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={onAddBodega}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            px: isMobile ? 2 : 3,
            py: isMobile ? 1.5 : 1,
            width: isMobile ? '100%' : 'auto',
            minWidth: isMobile ? 'auto' : 150
          }}
        >
          Nueva Bodega
        </Button>
      </Box>
      
      <BodegaList 
        onEditBodega={onEditBodega}
        isMobile={isMobile}
        isTablet={isTablet}
      />
      
      <BodegaForm
        open={formOpen}
        onClose={onCloseForm}
        bodega={editingBodega}
        onSave={onSaveBodega}
        isMobile={isMobile}
      />
    </Box>
  );
}
