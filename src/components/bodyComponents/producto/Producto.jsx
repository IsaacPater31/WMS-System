import React, { Component } from "react";
import ProductoList from "./ProductoList";
import ProductoForm from "./ProductoForm";
import { Box, Button, Typography } from "@mui/material";
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
      <Box sx={{ m: 0, p: 3, width: "100%" }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 3 
        }}>
          <Typography variant="h5" fontWeight="bold" color="primary.main">
            Lista de Productos
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={this.handleAddProducto}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
              py: 1,
            }}
          >
            Nuevo Producto
          </Button>
        </Box>
        
        <ProductoList 
          onEditProducto={this.handleEditProducto}
        />
        
        <ProductoForm
          open={this.state.formOpen}
          onClose={this.handleCloseForm}
          producto={this.state.editingProducto}
          onSave={this.handleSaveProducto}
        />
      </Box>
    );
  }
}
