import { useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  IconButton,
  Box,
} from "@mui/material";
import {
  HomeOutlined,
  Inventory,
  Warehouse,
  SettingsOutlined,
  PeopleAltOutlined,
  Assignment,
  SwapHoriz,
  Category,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

export default function SideBarComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState(0);

  const sideBarComponent = [
    {
      title: "Inicio",
      route: "/",
      component: <HomeOutlined fontSize="medium" color="primary" />,
    },
    {
      title: "Clientes",
      route: "/clientes",
      component: <PeopleAltOutlined fontSize="medium" color="primary" />,
    },
    {
      title: "Guías de Carga",
      route: "/guias-carga",
      component: <Assignment fontSize="medium" color="primary" />,
    },
    {
      title: "Inventario",
      route: "/inventario",
      component: <Inventory fontSize="medium" color="primary" />,
    },
    {
      title: "Categorías",
      route: "/categorias",
      component: <Category fontSize="medium" color="primary" />,
    },
    {
      title: "Bodegas",
      route: "/bodegas",
      component: <Warehouse fontSize="medium" color="primary" />,
    },
    {
      title: "Movimientos",
      route: "/movimientos",
      component: <SwapHoriz fontSize="medium" color="primary" />,
    },
  ];

  const handleItemClick = (index, route) => {
    setSelected(index);
    navigate(route);
  };

  const handleConfigClick = () => {
    navigate("/configuracion");
  };

  return (
    <Box sx={{ 
      width: '100%', 
      bgcolor: 'white',
      borderRight: '1px solid rgba(0, 0, 0, 0.06)',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Menú principal */}
      <Box sx={{ flex: 1 }}>
        <List>
          {sideBarComponent.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                selected={location.pathname === item.route}
                onClick={() => handleItemClick(index, item.route)}
                sx={{ 
                  mb: 1,
                  mx: 1,
                  borderRadius: 2,
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(25, 118, 210, 0.08)',
                    '&:hover': {
                      backgroundColor: 'rgba(25, 118, 210, 0.12)',
                    },
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <ListItemIcon>
                  <IconButton sx={{ 
                    color: location.pathname === item.route ? 'primary.main' : 'text.secondary',
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                  }}>
                    {item.component}
                  </IconButton>
                </ListItemIcon>
                <ListItemText 
                  primary={item.title}
                  primaryTypographyProps={{
                    fontSize: "medium",
                    fontWeight: location.pathname === item.route ? "600" : "500",
                    color: location.pathname === item.route ? "primary.main" : "text.primary",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Configuración en la parte inferior */}
      <Box sx={{ 
        borderTop: '1px solid rgba(0, 0, 0, 0.06)',
        p: 1
      }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              selected={location.pathname === "/configuracion"}
              onClick={handleConfigClick}
              sx={{ 
                borderRadius: 2,
                '&.Mui-selected': {
                  backgroundColor: 'rgba(25, 118, 210, 0.08)',
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.12)',
                  },
                },
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              <ListItemIcon>
                <IconButton sx={{ 
                  color: location.pathname === "/configuracion" ? 'primary.main' : 'text.secondary',
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                }}>
                  <SettingsOutlined fontSize="medium" color="primary" />
                </IconButton>
              </ListItemIcon>
              <ListItemText 
                primary="Configuración"
                primaryTypographyProps={{
                  fontSize: "medium",
                  fontWeight: location.pathname === "/configuracion" ? "600" : "500",
                  color: location.pathname === "/configuracion" ? "primary.main" : "text.primary",
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}
