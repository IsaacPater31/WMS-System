import React, { Component } from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { Settings as SettingsIcon } from "@mui/icons-material";

export default class Setting extends Component {
  render() {
    return <ResponsiveSetting />;
  }
}

// Componente funcional para manejar la responsividad
function ResponsiveSetting() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Box sx={{ 
      m: 0, 
      p: isMobile ? 2 : 3, 
      width: "100%",
      maxWidth: "100%",
      overflow: "hidden",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh'
    }}>
      <Box sx={{ 
        textAlign: 'center',
        p: 4,
        borderRadius: 3,
        backgroundColor: 'rgba(25, 118, 210, 0.04)',
        border: '1px solid rgba(25, 118, 210, 0.12)'
      }}>
        <SettingsIcon 
          sx={{ 
            fontSize: isMobile ? 48 : 64, 
            color: 'primary.main', 
            mb: 2 
          }} 
        />
        <Typography 
          variant={isMobile ? "h5" : "h4"} 
          fontWeight="bold" 
          color="primary.main"
          sx={{ mb: 1 }}
        >
          Configuración
        </Typography>
        <Typography 
          variant={isMobile ? "body2" : "body1"} 
          color="text.secondary"
          sx={{ 
            maxWidth: isMobile ? '100%' : '400px',
            lineHeight: 1.6
          }}
        >
          Panel de configuración del sistema. Aquí podrás gestionar las opciones generales de la aplicación.
        </Typography>
      </Box>
    </Box>
  );
}
