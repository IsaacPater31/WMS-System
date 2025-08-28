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
      title: "Bodegas",
      route: "/bodegas",
      component: <Warehouse fontSize="medium" color="primary" />,
    },
    {
      title: "Movimientos",
      route: "/movimientos",
      component: <SwapHoriz fontSize="medium" color="primary" />,
    },
    {
      title: "Configuración",
      route: "/configuracion",
      component: <SettingsOutlined fontSize="medium" color="primary" />,
    },
  ];

  const handleItemClick = (index, route) => {
    setSelected(index);
    navigate(route);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <List>
        {sideBarComponent.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              selected={location.pathname === item.route}
              onClick={() => handleItemClick(index, item.route)}
              sx={{ mb: 1 }}
            >
              <ListItemIcon>
                <IconButton>{item.component}</IconButton>
              </ListItemIcon>
              <ListItemText 
                primary={item.title}
                primaryTypographyProps={{
                  fontSize: "medium",
                  fontWeight: location.pathname === item.route ? "bold" : "normal",
                  color: location.pathname === item.route ? "primary.main" : "inherit",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
