import React, { Component } from "react";
import CustomerList from "./CustomerList";
import CustomerForm from "./CustomerForm";
import { Box, Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";

export default class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formOpen: false,
      editingCustomer: null,
    };
  }

  handleAddCustomer = () => {
    this.setState({
      formOpen: true,
      editingCustomer: null,
    });
  };

  handleEditCustomer = (customer) => {
    this.setState({
      formOpen: true,
      editingCustomer: customer,
    });
  };

  handleCloseForm = () => {
    this.setState({
      formOpen: false,
      editingCustomer: null,
    });
  };

  handleSaveCustomer = (customerData) => {
    // Aquí se implementaría la lógica para guardar en la base de datos
    console.log("Guardando cliente:", customerData);
    
    // Por ahora, solo cerramos el formulario
    this.handleCloseForm();
    
    // En una implementación real, aquí se haría una llamada a la API
    // y se actualizaría la lista de clientes
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
            Clientes
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={this.handleAddCustomer}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
              py: 1,
            }}
          >
            Nuevo Cliente
          </Button>
        </Box>
        
        <CustomerList 
          onEditCustomer={this.handleEditCustomer}
        />
        
        <CustomerForm
          open={this.state.formOpen}
          onClose={this.handleCloseForm}
          customer={this.state.editingCustomer}
          onSave={this.handleSaveCustomer}
        />
      </Box>
    );
  }
}
