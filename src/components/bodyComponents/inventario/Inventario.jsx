import React, { Component } from "react";
import { Box, Tabs, Tab, Typography, useTheme, useMediaQuery } from "@mui/material";
import { Inventory, Storage } from "@mui/icons-material";
import Producto from "../producto/Producto";
import Existencia from "../existencia/Existencia";

export default class Inventario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
    };
  }

  handleTabChange = (event, newValue) => {
    this.setState({ activeTab: newValue });
  };

  render() {
    return (
      <ResponsiveInventario 
        activeTab={this.state.activeTab}
        onTabChange={this.handleTabChange}
      />
    );
  }
}

// Componente funcional para manejar la responsividad
function ResponsiveInventario({ activeTab, onTabChange }) {
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
      <Typography 
        variant={isMobile ? "h5" : "h4"} 
        fontWeight="bold" 
        color="primary.main" 
        sx={{ 
          mb: 3,
          textAlign: isMobile ? 'center' : 'left'
        }}
      >
        Gestión de Inventario
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={onTabChange}
          aria-label="inventory management tabs"
          variant={isMobile ? "fullWidth" : "standard"}
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 'medium',
              minHeight: isMobile ? 56 : 48,
              fontSize: isMobile ? '0.875rem' : '1rem',
            },
          }}
        >
          <Tab 
            icon={<Inventory />} 
            label="Productos" 
            iconPosition="start"
          />
          <Tab 
            icon={<Storage />} 
            label="Existencias" 
            iconPosition="start"
          />
        </Tabs>
      </Box>
      
      {activeTab === 0 && <Producto />}
      {activeTab === 1 && <Existencia />}
    </Box>
  );
}
