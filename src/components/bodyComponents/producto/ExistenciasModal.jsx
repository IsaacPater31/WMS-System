import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
  Box,
  Avatar,
  Chip,
  Divider,
  Paper,
  useTheme,
  useMediaQuery,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Close,
  Visibility,
  Edit,
  QrCode,
  Inventory,
  CheckCircle,
  Warning,
  LocalShipping,
} from "@mui/icons-material";
import { existencias } from "../existencia/Existencias";

export default function ExistenciasModal({ 
  open, 
  onClose, 
  producto, 
  tipoFiltro = "TODAS", // "TODAS", "NACIONALIZADO", "NO_NACIONALIZADO"
  isMobile = false 
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  if (!producto) return null;

  // Filtrar existencias según el tipo
  const existenciasFiltradas = existencias.filter(existencia => {
    if (tipoFiltro === "TODAS") {
      return existencia.PRODUCTO_idProducto === producto.idProducto;
    } else {
      return existencia.PRODUCTO_idProducto === producto.idProducto && 
             existencia.estado === tipoFiltro;
    }
  });

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'NACIONALIZADO':
        return 'success';
      case 'NO_NACIONALIZADO':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getTipoFiltroTitle = () => {
    switch (tipoFiltro) {
      case "NACIONALIZADO":
        return "Nacionalizadas";
      case "NO_NACIONALIZADO":
        return "No Nacionalizadas";
      default:
        return "Todas las Existencias";
    }
  };

  const getTipoFiltroIcon = () => {
    switch (tipoFiltro) {
      case "NACIONALIZADO":
        return <CheckCircle />;
      case "NO_NACIONALIZADO":
        return <Warning />;
      default:
        return <Inventory />;
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="lg" 
      fullWidth
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 4,
          maxHeight: isMobile ? '100vh' : '90vh',
          margin: isMobile ? 0 : '32px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          overflow: 'hidden'
        }
      }}
    >
      {/* Header Minimalista */}
      <DialogTitle sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0, 0, 0, 0.02)',
        color: 'text.primary',
        padding: { xs: 2, sm: 3 },
        borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
        minHeight: isMobile ? 64 : 80
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
          <Avatar
            sx={{ 
              width: { xs: 40, sm: 48 }, 
              height: { xs: 40, sm: 48 }, 
              backgroundColor: 'rgba(25, 118, 210, 0.08)',
              color: 'primary.main',
              mr: { xs: 1, sm: 2 },
              borderRadius: 2
            }}
          >
            {getTipoFiltroIcon()}
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography 
              variant={isMobile ? "h6" : "h5"} 
              sx={{ 
                fontWeight: "600",
                fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.5rem' },
                letterSpacing: '-0.025em',
                lineHeight: 1.2
              }}
            >
              {getTipoFiltroTitle()}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                opacity: 0.7,
                fontSize: { xs: '0.875rem', sm: '1rem' },
                color: 'text.secondary',
                mt: 0.5
              }}
            >
              {producto.nombre} - {existenciasFiltradas.length} unidades
            </Typography>
          </Box>
        </Box>
        <Button
          onClick={onClose}
          sx={{ 
            color: 'text.secondary', 
            minWidth: 'auto',
            p: { xs: 1, sm: 1.5 },
            borderRadius: 2,
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)'
            }
          }}
        >
          <Close sx={{ fontSize: { xs: 20, sm: 24 } }} />
        </Button>
      </DialogTitle>

      <DialogContent sx={{ 
        pt: { xs: 2, sm: 3 },
        px: { xs: 2, sm: 3 },
        pb: { xs: 2, sm: 3 },
        backgroundColor: 'rgba(0, 0, 0, 0.01)'
      }}>
        {existenciasFiltradas.length === 0 ? (
          <Paper sx={{ 
            p: { xs: 3, sm: 4 }, 
            textAlign: 'center',
            borderRadius: 3,
            border: '1px solid rgba(0, 0, 0, 0.06)',
            bgcolor: 'white'
          }}>
            <Inventory sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              No hay existencias
            </Typography>
            <Typography variant="body2" color="text.secondary">
              No se encontraron existencias {tipoFiltro === "TODAS" ? "" : tipoFiltro === "NACIONALIZADO" ? "nacionalizadas" : "no nacionalizadas"} para este producto.
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={{ xs: 2, sm: 3 }}>
            {existenciasFiltradas.map((existencia) => (
              <Grid item xs={12} md={6} lg={4} key={existencia.idExistencia}>
                <Paper sx={{ 
                  p: { xs: 2, sm: 3 }, 
                  borderRadius: 3, 
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                  bgcolor: 'white',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    transform: 'translateY(-2px)'
                  }
                }}>
                  {/* Header de la existencia */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        sx={{ 
                          width: 32, 
                          height: 32, 
                          backgroundColor: 'rgba(25, 118, 210, 0.08)',
                          color: 'primary.main',
                          mr: 1,
                          borderRadius: 1
                        }}
                      >
                        <QrCode sx={{ fontSize: 16 }} />
                      </Avatar>
                      <Typography variant="body2" fontWeight="600" color="text.secondary">
                        #{existencia.idExistencia}
                      </Typography>
                    </Box>
                    <Chip 
                      label={existencia.estado?.replace('_', ' ')}
                      color={getEstadoColor(existencia.estado)}
                      size="small"
                      variant="outlined"
                      sx={{ fontWeight: '500', fontSize: '0.75rem' }}
                    />
                  </Box>

                  {/* Información principal */}
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
                      Serial
                    </Typography>
                    <Typography 
                      variant="body1" 
                      fontWeight="600" 
                      fontFamily="monospace"
                      sx={{ 
                        fontSize: '0.875rem',
                        color: 'primary.main',
                        letterSpacing: '0.025em'
                      }}
                    >
                      {existencia.serial}
                    </Typography>
                  </Box>

                  {/* Información adicional */}
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Bodega
                        </Typography>
                        <Typography variant="body2" fontWeight="500" sx={{ fontSize: '0.75rem' }}>
                          {existencia.bodega?.nombre || "N/A"}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Unidad
                        </Typography>
                        <Typography variant="body2" fontWeight="500" sx={{ fontSize: '0.75rem' }}>
                          {existencia.UNIDAD_DE_CARGA_idUnidad}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Cliente
                        </Typography>
                        <Typography variant="body2" fontWeight="500" sx={{ fontSize: '0.75rem' }}>
                          {existencia.cliente?.nombre || "N/A"}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Guía
                        </Typography>
                        <Typography variant="body2" fontWeight="500" sx={{ fontSize: '0.75rem' }}>
                          #{existencia.GUIA_DE_CARGA_idGuia}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  {/* Acciones */}
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'flex-end', 
                    mt: 2,
                    pt: 1,
                    borderTop: '1px solid rgba(0, 0, 0, 0.06)'
                  }}>
                    <Tooltip title="Ver detalles">
                      <IconButton
                        size="small"
                        sx={{ 
                          color: 'text.secondary',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                            color: 'text.primary'
                          }
                        }}
                      >
                        <Visibility sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Editar">
                      <IconButton
                        size="small"
                        sx={{ 
                          color: 'text.secondary',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                            color: 'text.primary'
                          }
                        }}
                      >
                        <Edit sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </DialogContent>

      <DialogActions sx={{ 
        p: { xs: 2, sm: 3 },
        borderTop: '1px solid rgba(0, 0, 0, 0.06)',
        backgroundColor: 'rgba(0, 0, 0, 0.02)',
        gap: 1
      }}>
        <Button 
          onClick={onClose} 
          variant="outlined"
          size={isMobile ? "large" : "medium"}
          sx={{
            fontWeight: '500',
            borderWidth: 1.5,
            borderRadius: 2,
            textTransform: 'none',
            letterSpacing: '0.025em',
            minWidth: 100
          }}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
