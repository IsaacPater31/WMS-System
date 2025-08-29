import { Component } from "react";
import { 
  Avatar, 
  Box, 
  Typography, 
  Chip, 
  Card, 
  CardContent, 
  Grid, 
  IconButton, 
  useTheme, 
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Edit, Visibility, PictureAsPdf } from "@mui/icons-material";
import { movimientos } from "./Movimientos";
import MovimientoDetailsModal from "./MovimientoDetailsModal";

export default class MovimientoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMovimiento: null,
      modalOpen: false,
    };
  }

  handleRowClick = (params) => {
    this.setState({
      selectedMovimiento: params.row,
      modalOpen: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      modalOpen: false,
      selectedMovimiento: null,
    });
  };

  handleEditMovimiento = (movimiento) => {
    if (this.props.onEditMovimiento) {
      this.props.onEditMovimiento(movimiento);
    }
  };

  handleViewDocument = (movimiento) => {
    if (movimiento.documento_movimiento) {
      window.open(movimiento.documento_movimiento, '_blank');
    }
  };

  getTipoColor = (tipo) => {
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

  formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };

  render() {
    const { isMobile, isTablet } = this.props;
    
    const columns = [
      {
        field: "tipo",
        headerName: "Tipo",
        width: 100,
        description: "Tipo de movimiento",
        renderCell: (params) => (
          <Chip 
            label={params.value} 
            size="small" 
            color={this.getTipoColor(params.value)}
            variant="outlined"
            sx={{ fontWeight: '500', fontSize: '0.75rem' }}
          />
        ),
      },
      {
        field: "cantidad",
        headerName: "Cantidad",
        width: 80,
        description: "Cantidad del movimiento",
        type: 'number',
        renderCell: (params) => (
          <Typography 
            variant="body2" 
            color={params.value >= 0 ? 'success.main' : 'error.main'}
            fontWeight="500"
          >
            {params.value > 0 ? `+${params.value}` : params.value}
          </Typography>
        ),
      },
      {
        field: "fecha_movimiento",
        headerName: "Fecha",
        width: 100,
        description: "Fecha del movimiento",
        valueGetter: (params) => this.formatDate(params.row.fecha_movimiento),
      },
      {
        field: "producto",
        headerName: "Producto",
        width: 180,
        description: "Producto asociado",
        renderCell: (params) => {
          const producto = params.row.producto;
          return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                sx={{ 
                  width: 24, 
                  height: 24, 
                  mr: 1,
                  backgroundColor: 'rgba(25, 118, 210, 0.08)',
                  color: 'primary.main',
                  fontSize: '0.75rem',
                  borderRadius: 1
                }}
              >
                {producto?.nombre?.charAt(0) || 'P'}
              </Avatar>
              <Typography variant="body2" sx={{ maxWidth: 130 }}>
                {producto?.nombre || 'N/A'}
              </Typography>
            </Box>
          );
        },
      },
      {
        field: "guiaCarga",
        headerName: "Guía de Carga",
        width: 130,
        description: "Guía de carga asociada",
        renderCell: (params) => {
          const guia = params.row.guiaCarga;
          return (
            <Typography variant="body2" sx={{ maxWidth: 100 }}>
              {guia?.factura_comercial || 'N/A'}
            </Typography>
          );
        },
      },
      {
        field: "documento_movimiento",
        headerName: "Documento",
        width: 100,
        description: "Documento del movimiento",
        sortable: false,
        renderCell: (params) => {
          const hasDocument = params.row.documento_movimiento;
          return (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {hasDocument ? (
                <Tooltip title="Ver documento">
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={(e) => { e.stopPropagation(); this.handleViewDocument(params.row); }}
                    sx={{
                      backgroundColor: 'rgba(25, 118, 210, 0.08)',
                      '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.12)' }
                    }}
                  >
                    <Visibility sx={{ fontSize: 16 }} />
                  </IconButton>
                </Tooltip>
              ) : (
                <Chip
                  label="Sin documento"
                  size="small"
                  variant="outlined"
                  color="default"
                  icon={<PictureAsPdf />}
                  sx={{ fontSize: '0.75rem' }}
                />
              )}
            </Box>
          );
        },
      },
      {
        field: "acciones",
        headerName: "Acciones",
        width: 80,
        description: "Acciones disponibles",
        sortable: false,
        renderCell: (params) => (
          <Tooltip title="Editar">
            <IconButton
              size="small"
              color="secondary"
              onClick={(e) => { e.stopPropagation(); this.handleEditMovimiento(params.row); }}
              sx={{
                backgroundColor: 'rgba(156, 39, 176, 0.08)',
                '&:hover': { backgroundColor: 'rgba(156, 39, 176, 0.12)' }
              }}
            >
              <Edit sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
        ),
      },
    ];

    const rows = movimientos.map(movimiento => ({ ...movimiento, id: movimiento.idMovimiento }));

    if (isMobile) {
      return (
        <Box sx={{ width: '100%', p: 1 }}>
          <Grid container spacing={2}>
            {movimientos.map((movimiento) => (
              <Grid item xs={12} key={movimiento.idMovimiento}>
                <Card 
                  onClick={() => this.handleRowClick({ row: movimiento })}
                  sx={{ 
                    borderRadius: 3, 
                    border: '1px solid rgba(0, 0, 0, 0.06)', 
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)', 
                    transition: 'all 0.2s ease-in-out', 
                    cursor: 'pointer',
                    '&:hover': { 
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', 
                      transform: 'translateY(-2px)' 
                    } 
                  }}
                >
                  <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          sx={{ 
                            width: 32, 
                            height: 32, 
                            mr: 1,
                            backgroundColor: 'rgba(25, 118, 210, 0.08)',
                            color: 'primary.main',
                            borderRadius: 1
                          }}
                        >
                          <Typography variant="body2" fontWeight="600">
                            #{movimiento.idMovimiento}
                          </Typography>
                        </Avatar>
                        <Chip 
                          label={movimiento.tipo} 
                          color={this.getTipoColor(movimiento.tipo)}
                          size="small"
                          variant="outlined"
                          sx={{ fontWeight: '500', fontSize: '0.75rem' }}
                        />
                      </Box>
                      <Typography 
                        variant="body1" 
                        color={movimiento.cantidad >= 0 ? 'success.main' : 'error.main'}
                        fontWeight="600"
                      >
                        {movimiento.cantidad > 0 ? `+${movimiento.cantidad}` : movimiento.cantidad}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
                        Producto
                      </Typography>
                      <Typography variant="body1" fontWeight="500" sx={{ fontSize: '0.875rem' }}>
                        {movimiento.producto?.nombre || 'N/A'}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
                        Guía de Carga
                      </Typography>
                      <Typography variant="body1" fontWeight="500" sx={{ fontSize: '0.875rem' }}>
                        {movimiento.guiaCarga?.factura_comercial || 'N/A'}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 0.5 }}>
                        Fecha
                      </Typography>
                      <Typography variant="body1" fontWeight="500" sx={{ fontSize: '0.875rem' }}>
                        {this.formatDate(movimiento.fecha_movimiento)}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 1, borderTop: '1px solid rgba(0, 0, 0, 0.06)' }}>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {movimiento.documento_movimiento ? (
                          <Tooltip title="Ver documento">
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={(e) => { e.stopPropagation(); this.handleViewDocument(movimiento); }}
                              sx={{ color: 'text.secondary', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)', color: 'text.primary' } }}
                            >
                              <Visibility sx={{ fontSize: 16 }} />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <Chip
                            label="Sin documento"
                            size="small"
                            variant="outlined"
                            color="default"
                            icon={<PictureAsPdf />}
                            sx={{ fontSize: '0.75rem' }}
                          />
                        )}
                      </Box>
                      <Tooltip title="Editar">
                        <IconButton
                          size="small"
                          color="secondary"
                          onClick={(e) => { e.stopPropagation(); this.handleEditMovimiento(movimiento); }}
                          sx={{ color: 'text.secondary', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)', color: 'text.primary' } }}
                        >
                          <Edit sx={{ fontSize: 16 }} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      );
    }

    return (
      <Box sx={{ 
        margin: isTablet ? 1 : 3,
        height: 700,
        '& .MuiDataGrid-root': {
          border: '1px solid rgba(0, 0, 0, 0.06)',
          borderRadius: 3,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
        },
        '& .MuiDataGrid-cell': {
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)'
        },
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)'
        },
        '& .MuiDataGrid-row:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.02)'
        }
      }}>
        <DataGrid
          sx={{ 
            fontSize: isTablet ? '0.875rem' : 'inherit',
            '& .MuiDataGrid-cell:focus': {
              outline: 'none'
            }
          }}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: isMobile ? 8 : isTablet ? 15 : 20 }
            }
          }}
          pageSizeOptions={isMobile ? [8, 15] : isTablet ? [15, 25] : [20, 30, 50]}
          onRowClick={this.handleRowClick}
          disableRowSelectionOnClick
        />
        <MovimientoDetailsModal
          open={this.state.modalOpen}
          onClose={this.handleCloseModal}
          movimiento={this.state.selectedMovimiento}
          onEdit={this.handleEditMovimiento}
          isMobile={isMobile}
        />
      </Box>
    );
  }
}
