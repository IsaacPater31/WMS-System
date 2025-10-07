import React, { Component } from "react";
import ProductoList from "./ProductoList";
import ProductoForm from "./ProductoForm";
import { Box, Button, Typography, useTheme, useMediaQuery } from "@mui/material";
import { Add } from "@mui/icons-material";

export default class Producto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formOpen: false,
      editingProducto: null,
    };
  }

  handleAddProducto = () => {
    this.setState({
      formOpen: true,
      editingProducto: null,
    });
  };

  handleEditProducto = (producto) => {
    this.setState({
      formOpen: true,
      editingProducto: producto,
    });
  };

  handleCloseForm = () => {
    this.setState({
      formOpen: false,
      editingProducto: null,
    });
  };

  handleSaveProducto = (productoData) => {
    // Aquí se implementaría la lógica para guardar en la base de datos
    console.log("Guardando producto:", productoData);
    
    // Por ahora, solo cerramos el formulario
    this.handleCloseForm();
    
    // En una implementación real, aquí se haría una llamada a la API
    // y se actualizaría la lista de productos
  };

  render() {
    return (
      <ResponsiveProducto 
        onAddProducto={this.handleAddProducto}
        onEditProducto={this.handleEditProducto}
        onCloseForm={this.handleCloseForm}
        onSaveProducto={this.handleSaveProducto}
        formOpen={this.state.formOpen}
        editingProducto={this.state.editingProducto}
      />
    );
  }
}

// Componente funcional para manejar la responsividad
function ResponsiveProducto({ 
  onAddProducto, 
  onEditProducto, 
  onCloseForm, 
  onSaveProducto, 
  formOpen, 
  editingProducto 
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
          Lista de Productos
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={onAddProducto}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            px: isMobile ? 2 : 3,
            py: isMobile ? 1.5 : 1,
            width: isMobile ? '100%' : 'auto',
            minWidth: isMobile ? 'auto' : 150
          }}
        >
          Nuevo Producto
        </Button>
      </Box>
      
      <ProductoList 
        onEditProducto={onEditProducto}
        isMobile={isMobile}
        isTablet={isTablet}
      />
      
      <ProductoForm
        open={formOpen}
        onClose={onCloseForm}
        producto={editingProducto}
        onSave={onSaveProducto}
        isMobile={isMobile}
      />
    </Box>
  );
}
