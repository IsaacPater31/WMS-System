import React, { Component } from "react";
import MovimientoList from "./MovimientoList";
import MovimientoForm from "./MovimientoForm";
import { Box, Button, Typography, useTheme, useMediaQuery } from "@mui/material";
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
      <ResponsiveMovimiento
        onAddMovimiento={this.handleAddMovimiento}
        onEditMovimiento={this.handleEditMovimiento}
        onCloseForm={this.handleCloseForm}
        onSaveMovimiento={this.handleSaveMovimiento}
        formOpen={this.state.formOpen}
        editingMovimiento={this.state.editingMovimiento}
      />
    );
  }
}

function ResponsiveMovimiento({ 
  onAddMovimiento, 
  onEditMovimiento, 
  onCloseForm, 
  onSaveMovimiento, 
  formOpen, 
  editingMovimiento 
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Box sx={{ 
      m: 0, 
      p: { xs: 1, sm: 2, md: 3 }, 
      width: "100%" 
    }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: { xs: 2, sm: 3 },
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Typography 
          variant={isMobile ? "h5" : "h4"} 
          fontWeight="bold" 
          color="primary.main"
          sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' } }}
        >
          Movimientos
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={onAddMovimiento}
          size={isMobile ? "large" : "medium"}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            px: { xs: 2, sm: 3 },
            py: { xs: 1, sm: 1 },
            fontWeight: '500',
            letterSpacing: '0.025em',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            '&:hover': { boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)' }
          }}
        >
          Nuevo Movimiento
        </Button>
      </Box>
      
      <MovimientoList 
        onEditMovimiento={onEditMovimiento}
        isMobile={isMobile}
        isTablet={isTablet}
      />
      
      <MovimientoForm
        open={formOpen}
        onClose={onCloseForm}
        movimiento={editingMovimiento}
        onSave={onSaveMovimiento}
        isMobile={isMobile}
      />
    </Box>
  );
}
