import { Component } from "react";
import { Avatar, Box, Typography, Chip, Button, IconButton, Tooltip, Grid, Card, CardContent } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Inventory, PictureAsPdf, Visibility } from "@mui/icons-material";
// import { guiasCarga } from "./GuiasCarga"; // Ya no necesitamos importar los datos estáticos
import GuiaCargaDetailsModal from "./GuiaCargaDetailsModal";
import UnidadesCargaModal from "./UnidadesCargaModal";

export default class GuiaCargaList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGuia: null,
      modalOpen: false,
      unidadesModalOpen: false,
      selectedGuiaForUnidades: null,
      windowWidth: typeof window !== 'undefined' ? window.innerWidth : 1280,
    };
  }

  componentDidMount() {
    // update width on resize so DataGrid can adapt on desktop
    this._handleResize = () => this.setState({ windowWidth: window.innerWidth });
    window.addEventListener('resize', this._handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._handleResize);
  }

  handleRowClick = (params) => {
    this.setState({
      selectedGuia: params.row,
      modalOpen: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      modalOpen: false,
      selectedGuia: null,
    });
  };

  handleEditGuia = (guia) => {
    if (this.props.onEditGuia) {
      this.props.onEditGuia(guia);
    }
  };

  handleOpenUnidades = (guia) => {
    this.setState({
      selectedGuiaForUnidades: guia,
      unidadesModalOpen: true,
    });
  };

  handleCloseUnidades = () => {
    this.setState({
      unidadesModalOpen: false,
      selectedGuiaForUnidades: null,
    });
  };

  handleViewDocument = (guia) => {
    if (guia.documento_carga) {
      // Abrir el PDF en una nueva pestaña
      window.open(guia.documento_carga, '_blank');
    }
  };

  formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  render() {
    const width = this.state.windowWidth;
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    const isDesktop = width >= 1024;

    const columns = [
      {
        field: "factura_comercial",
        headerName: "Factura Comercial",
        minWidth: 160,
        flex: 1,
        description: "Número de factura comercial",
        renderCell: (params) => {
          return (
            <>
              <Avatar
                alt="Guía"
                variant="square"
                sx={{ borderRadius: 1, width: 30, height: 30, backgroundColor: 'primary.main' }}
              >
                G
              </Avatar>
              <Typography variant="subtitle2" sx={{ mx: 2 }}>
                {params.row.factura_comercial}
              </Typography>
            </>
          );
        },
      },
      {
        field: "cliente",
        headerName: "Cliente",
        minWidth: 180,
        flex: 1.3,
        description: "Cliente asociado a la guía",
        valueGetter: (params) => params.row.cliente?.nombre || "N/A",
      },
      {
        field: "fecha_ingreso",
        headerName: "Fecha Ingreso",
        minWidth: 120,
        flex: 0.9,
        description: "Fecha de ingreso de la guía",
        valueGetter: (params) => this.formatDate(params.row.fecha_ingreso),
      },
      {
        field: "unidades_carga",
        headerName: "Unidades Carga",
        minWidth: 120,
        flex: 0.8,
        description: "Número de unidades de carga",
        type: 'number',
      },
      {
        field: "unidades_producto",
        headerName: "Unidades Producto",
        minWidth: 130,
        flex: 0.8,
        description: "Número de unidades de producto",
        type: 'number',
      },
      {
        field: "peso_total",
        headerName: "Peso Total (kg)",
        minWidth: 120,
        flex: 0.9,
        description: "Peso total de la carga",
        type: 'number',
        valueGetter: (params) => `${params.row.peso_total} kg`,
      },
      {
        field: "contenedores",
        headerName: "Contenedores",
        minWidth: 110,
        flex: 0.7,
        description: "Número de contenedores",
        type: 'number',
        renderCell: (params) => (
          <Chip 
            label={params.value} 
            size="small" 
            color="primary" 
            variant="outlined"
          />
        ),
      },
      {
        field: "espacio_ocupado",
        headerName: "Espacio Ocupado (m²)",
        minWidth: 140,
        flex: 0.9,
        description: "Espacio ocupado en metros cuadrados",
        type: 'number',
        valueGetter: (params) => `${params.row.espacio_ocupado} m²`,
      },
      {
        field: "documento_carga",
        headerName: "Documento de Carga",
        minWidth: 140,
        flex: 0.9,
        description: "Documento PDF asociado a la guía",
        sortable: false,
        renderCell: (params) => {
          const hasDocument = params.row.documento_carga;
          return (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {hasDocument ? (
                <>
                  <Tooltip title="Ver documento">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        this.handleViewDocument(params.row);
                      }}
                      sx={{ 
                        backgroundColor: 'rgba(25, 118, 210, 0.08)',
                        '&:hover': {
                          backgroundColor: 'rgba(25, 118, 210, 0.12)'
                        }
                      }}
                    >
                      <Visibility sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Tooltip>
                </>
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
        minWidth: 140,
        flex: 1,
        description: "Acciones disponibles",
        sortable: false,
        renderCell: (params) => (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              size="small"
              variant="outlined"
              color="primary"
              startIcon={<Inventory />}
              onClick={(e) => {
                e.stopPropagation();
                this.handleOpenUnidades(params.row);
              }}
            >
              Unidades
            </Button>
          </Box>
        ),
      },
    ];

    const guias = this.props.guias || [];
    const rows = guias.map(guia => ({
      ...guia,
      id: guia.idGuia // DataGrid necesita un campo 'id' único
    }));

    // Renderizado responsivo para móvil
    if (isMobile) {
      return (
        <Box sx={{ width: '100%', p: 1 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 2, 
              fontWeight: "bold", 
              color: "primary.main",
              textAlign: 'center'
            }}
          >
            Gestión de Guías de Carga
          </Typography>
          
          {/* Vista simplificada para móvil */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {guias.map((guia) => (
              <Box
                key={guia.idGuia}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: '1px solid #e0e0e0',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: 2,
                    transform: 'translateY(-1px)',
                    transition: 'all 0.2s ease-in-out'
                  }
                }}
                onClick={() => this.handleRowClick({ row: guia })}
              >
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                  {guia.factura_comercial}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  <strong>Cliente:</strong> {guia.cliente?.nombre || "N/A"}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  <strong>Fecha:</strong> {this.formatDate(guia.fecha_ingreso)}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  <strong>Unidades:</strong> {guia.unidades_carga} carga, {guia.unidades_producto} producto
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Chip 
                    label={`${guia.contenedores} contenedores`} 
                    size="small" 
                    variant="outlined" 
                  />
                  <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      this.handleOpenUnidades(guia);
                    }}
                  >
                    Ver Unidades
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      );
    }

    return (
      <Box
        sx={{
          margin: isTablet ? 1 : 3,
          bgcolor: "white",
          borderRadius: 2,
          padding: isTablet ? 2 : 3,
          height: "100%",
          overflow: "hidden",
          overflowX: 'auto',
        }}
      >
        <Typography 
          variant={isTablet ? "h6" : "h5"} 
          sx={{ 
            mb: 3, 
            fontWeight: "bold", 
            color: "primary.main",
            textAlign: isTablet ? 'center' : 'left'
          }}
        >
          Gestión de Guías de Carga
        </Typography>
        <DataGrid
          sx={{
            borderLeft: 0,
            borderRight: 0,
            borderRadius: 0,
            fontSize: isTablet ? '0.875rem' : 'inherit',
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #e0e0e0",
              fontSize: isTablet ? '0.875rem' : 'inherit',
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f5f5f5",
              borderBottom: "2px solid #e0e0e0",
              fontSize: isTablet ? '0.875rem' : 'inherit',
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#f5f5f5",
              cursor: "pointer",
            },
          }}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: isDesktop ? (width >= 1280 ? 15 : 10) : isTablet ? 8 : 5 },
            },
          }}
          pageSizeOptions={isDesktop ? [10, 15, 20] : isTablet ? [8, 15] : [5, 10]}
          rowSelection={false}
          disableRowSelectionOnClick
          autoHeight
          onRowClick={this.handleRowClick}
        />
        
                 <GuiaCargaDetailsModal
           open={this.state.modalOpen}
           onClose={this.handleCloseModal}
           guia={this.state.selectedGuia}
           onEdit={this.handleEditGuia}
         />
         
         <UnidadesCargaModal
           open={this.state.unidadesModalOpen}
           onClose={this.handleCloseUnidades}
           guia={this.state.selectedGuiaForUnidades}
         />
      </Box>
    );
  }
}
