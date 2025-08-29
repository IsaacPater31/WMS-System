import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Button,
  Paper,
  Divider,
  Avatar,
  LinearProgress
} from "@mui/material";
import {
  People,
  Inventory,
  LocalShipping,
  TrendingUp,
  Add,
  Visibility,
  Store,
  Assessment,
  SwapHoriz,
  Person,
  Warehouse
} from "@mui/icons-material";
import { movimientos } from "../movimiento/Movimientos";
import { productos } from "../producto/Productos";
import { customers } from "../customer/Customers";
import { guiasCarga } from "../guiaCarga/GuiasCarga";
import { existencias } from "../existencia/Existencias";
import { bodegas } from "../producto/Bodegas";

import MovementsChart from "./MovementsChart";
import ProductsPieChart from "./ProductsPieChart";
import TrendsLineChart from "./TrendsLineChart";
import TopProductsTable from "./TopProductsTable";

function Dashboard() {
  // Calcular estadísticas reales
  const totalClientes = customers.length;
  const totalProductos = productos.length;
  const totalGuiasCarga = guiasCarga.length;
  const movimientosHoy = movimientos.filter(m => {
    const today = new Date().toISOString().split('T')[0];
    return m.fecha_movimiento === today;
  }).length;

  // Obtener movimientos recientes (últimos 5)
  const recentMovements = movimientos
    .slice(-5)
    .reverse()
    .map(m => ({
      id: m.idMovimiento,
      tipo: m.tipo,
      producto: m.producto?.nombre || "Producto no especificado",
      cantidad: m.cantidad,
      fecha: m.fecha_movimiento
    }));

  // Calcular productos con más existencias
  const productosConExistencias = productos.map(producto => {
    const existenciasProducto = existencias.filter(ex => ex.PRODUCTO_idProducto === producto.idProducto);
    
    // Calcular cantidades totales de existencias
    const totalCantidad = existenciasProducto.reduce((sum, ex) => sum + (ex.cantidad || 0), 0);
    const totalNacionalizado = existenciasProducto.reduce((sum, ex) => sum + (ex.cantidad_nacionalizado || 0), 0);
    const totalNoNacionalizado = existenciasProducto.reduce((sum, ex) => sum + (ex.cantidad_no_nacionalizado || 0), 0);
    
    // Agrupar existencias por bodega para mostrar distribución
    const existenciasPorBodega = existenciasProducto.reduce((acc, ex) => {
      const bodegaNombre = ex.bodega?.nombre || "Sin bodega";
      if (!acc[bodegaNombre]) {
        acc[bodegaNombre] = {
          cantidad: 0,
          nacionalizado: 0,
          noNacionalizado: 0
        };
      }
      acc[bodegaNombre].cantidad += ex.cantidad || 0;
      acc[bodegaNombre].nacionalizado += ex.cantidad_nacionalizado || 0;
      acc[bodegaNombre].noNacionalizado += ex.cantidad_no_nacionalizado || 0;
      return acc;
    }, {});
    
    // Obtener la bodega principal (con más existencias)
    const bodegaPrincipal = Object.entries(existenciasPorBodega)
      .sort(([,a], [,b]) => b.cantidad - a.cantidad)[0]?.[0] || "Sin bodega";
    
    return {
      nombre: producto.nombre,
      existencias: totalCantidad,
      nacionalizado: totalNacionalizado,
      noNacionalizado: totalNoNacionalizado,
      bodega: bodegaPrincipal,
      categoria: producto.categoria?.nombre || "Sin categoría",
      distribucionBodegas: existenciasPorBodega,
      referencia: producto.referencia
    };
  }).filter(p => p.existencias > 0)
    .sort((a, b) => b.existencias - a.existencias)
    .slice(0, 5);

  // Calcular estadísticas de movimientos por tipo
  const movimientosPorTipo = movimientos.reduce((acc, m) => {
    acc[m.tipo] = (acc[m.tipo] || 0) + 1;
    return acc;
  }, {});

  // Calcular estadísticas para gráficas
  const totalMovimientos = movimientos.length;

  const stats = [
    { 
      title: "Total Clientes", 
      value: totalClientes.toString(), 
      icon: <People />, 
      color: "#1976d2",
      subtitle: "Clientes registrados"
    },
    { 
      title: "Productos Activos", 
      value: totalProductos.toString(), 
      icon: <Inventory />, 
      color: "#388e3c",
      subtitle: "Productos en inventario"
    },
    { 
      title: "Guías de Carga", 
      value: totalGuiasCarga.toString(), 
      icon: <LocalShipping />, 
      color: "#f57c00",
      subtitle: "Guías procesadas"
    },
    { 
      title: "Movimientos Hoy", 
      value: movimientosHoy.toString(), 
      icon: <TrendingUp />, 
      color: "#d32f2f",
      subtitle: "Actividad del día"
    }
  ];

  const getTipoColor = (tipo) => {
    switch (tipo) {
      case 'INGRESO':
        return 'success';
      case 'SALIDA':
        return 'error';
      case 'TRANSFERENCIA':
        return 'warning';
      case 'AJUSTE':
        return 'info';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <Box sx={{ 
      p: 3,
      background: '#f8f9fa',
      minHeight: '100vh',
      '@keyframes slideInFromTop': {
        '0%': {
          opacity: 0,
          transform: 'translateY(-30px) scale(0.95)'
        },
        '100%': {
          opacity: 1,
          transform: 'translateY(0) scale(1)'
        }
      },
      '@keyframes slideInFromLeft': {
        '0%': {
          opacity: 0,
          transform: 'translateX(-30px) scale(0.95)'
        },
        '100%': {
          opacity: 1,
          transform: 'translateX(0) scale(1)'
        }
      },
      '@keyframes slideInFromRight': {
        '0%': {
          opacity: 0,
          transform: 'translateX(30px) scale(0.95)'
        },
        '100%': {
          opacity: 1,
          transform: 'translateX(0) scale(1)'
        }
      },
      '@keyframes slideInFromBottom': {
        '0%': {
          opacity: 0,
          transform: 'translateY(30px) scale(0.95)'
        },
        '100%': {
          opacity: 1,
          transform: 'translateY(0) scale(1)'
        }
      },
      '@keyframes float': {
        '0%, 100%': {
          transform: 'translateY(0px)'
        },
        '50%': {
          transform: 'translateY(-8px)'
        }
      },
      '@keyframes glow': {
        '0%, 100%': {
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        },
        '50%': {
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)'
        }
      }
    }}>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => {
          const animations = ['slideInFromLeft', 'slideInFromTop', 'slideInFromRight', 'slideInFromBottom'];
          return (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ 
                height: '100%', 
                background: '#ffffff',
                borderRadius: '16px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                animation: `${animations[index]} 0.8s ease-out ${index * 0.15}s both`,
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                  '& .stat-icon': {
                    transform: 'scale(1.1)'
                  }
                }
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography color="textSecondary" gutterBottom variant="h6">
                        {stat.title}
                      </Typography>
                      <Typography variant="h4" component="div" sx={{ color: stat.color, fontWeight: 'bold' }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {stat.subtitle}
                      </Typography>
                    </Box>
                    <Avatar 
                      className="stat-icon"
                      sx={{ 
                        background: stat.color,
                        width: 56, 
                        height: 56,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                    >
                      {stat.icon}
                    </Avatar>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Movements */}
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            height: '100%',
            background: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            animation: 'slideInFromLeft 0.8s ease-out 0.6s both',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)'
            }
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ 
                fontWeight: '600',
                mb: 3,
                color: '#1a1a1a',
                fontSize: '1.1rem'
              }}>
                Movimientos Recientes
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {recentMovements.map((movement) => (
                  <Box
                    key={movement.id}
                    sx={{
                      p: 1.5,
                      borderRadius: '8px',
                      background: '#f8f9fa',
                      border: '1px solid #e9ecef',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        background: '#ffffff',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                        borderColor: '#007AFF'
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="body2" sx={{ 
                          fontWeight: '600', 
                          color: '#1a1a1a',
                          mb: 0.25,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {movement.producto}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box sx={{ 
                            width: 6, 
                            height: 6, 
                            borderRadius: '50%', 
                            backgroundColor: getTipoColor(movement.tipo) === 'success' ? '#28a745' : 
                                             getTipoColor(movement.tipo) === 'error' ? '#dc3545' : 
                                             getTipoColor(movement.tipo) === 'warning' ? '#ffc107' : '#007AFF'
                          }} />
                          <Typography variant="caption" sx={{ 
                            color: '#6c757d',
                            fontSize: '0.7rem',
                            textTransform: 'uppercase',
                            fontWeight: '500'
                          }}>
                            {movement.tipo}
                          </Typography>
                          <Typography variant="caption" sx={{ 
                            color: '#6c757d',
                            fontSize: '0.7rem'
                          }}>
                            • {formatDate(movement.fecha)}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ 
                        textAlign: 'right',
                        ml: 1,
                        minWidth: '50px'
                      }}>
                        <Typography variant="body1" sx={{ 
                          fontWeight: '700',
                          color: movement.cantidad > 0 ? '#28a745' : '#dc3545',
                          lineHeight: 1,
                          fontSize: '0.9rem'
                        }}>
                          {movement.cantidad > 0 ? '+' : ''}{movement.cantidad}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Button 
                  variant="outlined" 
                  startIcon={<Visibility />}
                  size="small"
                >
                  Ver Todos los Movimientos
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Top Products */}
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            height: '100%',
            background: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            animation: 'slideInFromRight 0.8s ease-out 0.7s both',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)'
            }
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ 
                fontWeight: '600',
                mb: 3,
                color: '#1a1a1a',
                fontSize: '1.1rem'
              }}>
                Productos con Más Existencias
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {productosConExistencias.map((product, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 1.5,
                      borderRadius: '8px',
                      background: '#f8f9fa',
                      border: '1px solid #e9ecef',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        background: '#ffffff',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                        borderColor: '#007AFF'
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <Typography variant="body2" sx={{ 
                            fontWeight: '600', 
                            color: '#1a1a1a',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}>
                            {product.nombre}
                          </Typography>
                          <Typography variant="caption" sx={{ 
                            color: '#6c757d',
                            backgroundColor: '#e9ecef',
                            px: 0.75,
                            py: 0.25,
                            borderRadius: '4px',
                            fontSize: '0.65rem',
                            fontWeight: '500'
                          }}>
                            {product.referencia}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Box sx={{ 
                              width: 4, 
                              height: 4, 
                              borderRadius: '50%', 
                              backgroundColor: '#28a745' 
                            }} />
                            <Typography variant="caption" sx={{ 
                              color: '#28a745',
                              fontWeight: '600',
                              fontSize: '0.7rem'
                            }}>
                              {product.nacionalizado} Nac
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Box sx={{ 
                              width: 4, 
                              height: 4, 
                              borderRadius: '50%', 
                              backgroundColor: '#ffc107' 
                            }} />
                            <Typography variant="caption" sx={{ 
                              color: '#ffc107',
                              fontWeight: '600',
                              fontSize: '0.7rem'
                            }}>
                              {product.noNacionalizado} No Nac
                            </Typography>
                          </Box>
                          <Typography variant="caption" sx={{ 
                            color: '#6c757d',
                            fontSize: '0.7rem'
                          }}>
                            • {product.bodega}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ 
                        textAlign: 'right',
                        ml: 1,
                        minWidth: '50px'
                      }}>
                        <Typography variant="body1" sx={{ 
                          fontWeight: '700',
                          color: '#007AFF',
                          lineHeight: 1,
                          fontSize: '0.9rem'
                        }}>
                          {product.existencias}
                        </Typography>
                        <Typography variant="caption" sx={{ 
                          color: '#6c757d',
                          fontSize: '0.65rem'
                        }}>
                          {product.categoria}
                        </Typography>
                      </Box>
                    </Box>
                    
                    {Object.keys(product.distribucionBodegas).length > 1 && (
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 0.5,
                        mt: 0.5
                      }}>
                        <Box sx={{ 
                          width: 4, 
                          height: 4, 
                          borderRadius: '50%', 
                          backgroundColor: '#007AFF' 
                        }} />
                        <Typography variant="caption" sx={{ 
                          color: '#007AFF',
                          fontWeight: '500',
                          fontSize: '0.65rem'
                        }}>
                          Distribuido en {Object.keys(product.distribucionBodegas).length} bodegas
                        </Typography>
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Button 
                  variant="outlined" 
                  startIcon={<Inventory />}
                  size="small"
                >
                  Ver Todos los Productos
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Gráficas Profesionales con ApexCharts */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Gráfica de Barras - Movimientos por Tipo */}
        <Grid item xs={12} lg={8}>
          <MovementsChart />
        </Grid>

        {/* Gráfica de Dona - Productos por Categoría */}
        <Grid item xs={12} lg={4}>
          <ProductsPieChart />
        </Grid>
      </Grid>

      {/* Gráfica de Línea - Tendencias */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <TrendsLineChart />
        </Grid>
      </Grid>

      {/* Tabla de Productos e Información del Sistema */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Tabla de Productos */}
        <Grid item xs={12} lg={8}>
          <TopProductsTable />
        </Grid>

        {/* Información del Sistema */}
        <Grid item xs={12} lg={4}>
          <Card sx={{
            background: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            animation: 'slideInFromBottom 0.8s ease-out 1.2s both',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)'
            },
            height: '100%'
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ 
                fontWeight: '600',
                mb: 3,
                color: '#1a1a1a',
                fontSize: '1.1rem'
              }}>
                Información del Sistema
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{
                  p: 2,
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
                  border: '1px solid #e9ecef',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    borderColor: '#007AFF'
                  }
                }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="subtitle1" sx={{ 
                        fontWeight: '600', 
                        color: '#1a1a1a',
                        mb: 0.5
                      }}>
                        {bodegas.length} Bodegas Activas
                      </Typography>
                      <Typography variant="caption" sx={{ 
                        color: '#6c757d',
                        fontSize: '0.8rem'
                      }}>
                        Ubicaciones de almacenamiento
                      </Typography>
                    </Box>
                    <Box sx={{ 
                      width: 40, 
                      height: 40, 
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #007AFF 0%, #0056CC 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Warehouse sx={{ color: 'white', fontSize: '1.2rem' }} />
                    </Box>
                  </Box>
                </Box>

                <Box sx={{
                  p: 2,
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
                  border: '1px solid #e9ecef',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    borderColor: '#28a745'
                  }
                }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="subtitle1" sx={{ 
                        fontWeight: '600', 
                        color: '#1a1a1a',
                        mb: 0.5
                      }}>
                        {existencias.length} Unidades en Inventario
                      </Typography>
                      <Typography variant="caption" sx={{ 
                        color: '#6c757d',
                        fontSize: '0.8rem'
                      }}>
                        Productos individuales
                      </Typography>
                    </Box>
                    <Box sx={{ 
                      width: 40, 
                      height: 40, 
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #28a745 0%, #1e7e34 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <SwapHoriz sx={{ color: 'white', fontSize: '1.2rem' }} />
                    </Box>
                  </Box>
                </Box>

                <Box sx={{
                  p: 2,
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
                  border: '1px solid #e9ecef',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    borderColor: '#ffc107'
                  }
                }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="subtitle1" sx={{ 
                        fontWeight: '600', 
                        color: '#1a1a1a',
                        mb: 0.5
                      }}>
                        {totalMovimientos} Movimientos Totales
                      </Typography>
                      <Typography variant="caption" sx={{ 
                        color: '#6c757d',
                        fontSize: '0.8rem'
                      }}>
                        Actividad del sistema
                      </Typography>
                    </Box>
                    <Box sx={{ 
                      width: 40, 
                      height: 40, 
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #ffc107 0%, #e0a800 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <TrendingUp sx={{ color: 'white', fontSize: '1.2rem' }} />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Box sx={{ 
        mt: 4,
        animation: 'slideInFromBottom 0.8s ease-out 1.4s both'
      }}>
        <Typography 
          variant="h5" 
          gutterBottom 
          sx={{ 
            fontWeight: '500',
            textAlign: 'center',
            mb: 3,
            color: '#333'
          }}
        >
          Acciones Rápidas
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item>
            <Button 
              variant="contained" 
              startIcon={<Add />} 
              sx={{
                background: '#007AFF',
                borderRadius: '12px',
                px: 3,
                py: 1.5,
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: '500',
                boxShadow: '0 2px 8px rgba(0, 122, 255, 0.2)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 16px rgba(0, 122, 255, 0.3)'
                }
              }}
            >
              Nuevo Cliente
            </Button>
          </Grid>
          <Grid item>
            <Button 
              variant="contained" 
              startIcon={<LocalShipping />} 
              sx={{
                background: '#FF3B30',
                borderRadius: '12px',
                px: 3,
                py: 1.5,
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: '500',
                boxShadow: '0 2px 8px rgba(255, 59, 48, 0.2)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 16px rgba(255, 59, 48, 0.3)'
                }
              }}
            >
              Nueva Guía de Carga
            </Button>
          </Grid>
          <Grid item>
            <Button 
              variant="contained" 
              startIcon={<Inventory />} 
              sx={{
                background: '#34C759',
                borderRadius: '12px',
                px: 3,
                py: 1.5,
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: '500',
                boxShadow: '0 2px 8px rgba(52, 199, 89, 0.2)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 16px rgba(52, 199, 89, 0.3)'
                }
              }}
            >
              Nuevo Producto
            </Button>
          </Grid>
          <Grid item>
            <Button 
              variant="contained" 
              startIcon={<TrendingUp />} 
              sx={{
                background: '#FF9500',
                borderRadius: '12px',
                px: 3,
                py: 1.5,
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: '500',
                boxShadow: '0 2px 8px rgba(255, 149, 0, 0.2)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 16px rgba(255, 149, 0, 0.3)'
                }
              }}
            >
              Nuevo Movimiento
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Dashboard;
