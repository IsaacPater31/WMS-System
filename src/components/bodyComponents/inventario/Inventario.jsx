import React, { Component } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
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
    const { activeTab } = this.state;

    return (
      <Box sx={{ m: 0, p: 3, width: "100%" }}>
        <Typography variant="h4" fontWeight="bold" color="primary.main" sx={{ mb: 3 }}>
          Gestión de Inventario
        </Typography>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs 
            value={activeTab} 
            onChange={this.handleTabChange}
            aria-label="inventory management tabs"
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 'medium',
                minHeight: 48,
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
}
