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
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Edit, Visibility } from "@mui/icons-material";
import { customers } from "./Customers";
import CustomerDetailsModal from "./CustomerDetailsModal";

export default class CustomerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCustomer: null,
      modalOpen: false,
      windowWidth: typeof window !== 'undefined' ? window.innerWidth : 1280,
    };
  }

  componentDidMount() {
    // Listen to resize to enable responsive behavior on desktop sizes
    this._resizeRunning = false;
    this._handleResize = () => {
      if (this._resizeRunning) return;
      this._resizeRunning = true;
      window.requestAnimationFrame(() => {
        this.setState({ windowWidth: window.innerWidth });
        this._resizeRunning = false;
      });
    };
    window.addEventListener('resize', this._handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._handleResize);
  }

  handleRowClick = (params) => {
    this.setState({
      selectedCustomer: params.row,
      modalOpen: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      modalOpen: false,
      selectedCustomer: null,
    });
  };

  handleEditCustomer = (customer) => {
    if (this.props.onEditCustomer) {
      this.props.onEditCustomer(customer);
    }
  };

  render() {
    const width = this.state.windowWidth;
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    const isDesktop = width >= 1024; // target: responsive behavior for desktop

    const columns = [
      {
        field: "nombre",
        headerName: "Nombre",
        minWidth: 160,
        flex: 1,
        description: "Nombre del cliente",
        renderCell: (params) => {
          return (
            <>
              <Avatar
                alt={params.row.nombre}
                variant="square"
                sx={{ 
                  borderRadius: 1, 
                  width: isMobile ? 25 : 30, 
                  height: isMobile ? 25 : 30,
                  fontSize: isMobile ? '0.75rem' : '1rem'
                }}
              >
                {params.row.nombre.charAt(0)}
              </Avatar>
              <Typography 
                variant={isMobile ? "caption" : "subtitle2"} 
                sx={{ 
                  mx: isMobile ? 1 : 3,
                  fontSize: isMobile ? '0.75rem' : 'inherit'
                }}
              >
                {params.row.nombre}
              </Typography>
            </>
          );
        },
      },
      {
        field: "razon_social",
        headerName: "Razón Social",
        minWidth: 180,
        flex: 1.2,
        description: "Razón social de la empresa",
      },
      {
        field: "nit",
        headerName: "NIT",
        minWidth: 120,
        flex: 0.8,
        description: "Número de Identificación Tributaria",
      },
      {
        field: "representante_legal",
        headerName: "Representante Legal",
        minWidth: 160,
        flex: 1,
        description: "Nombre del representante legal",
      },
      {
        field: "email",
        headerName: "Correo Electrónico",
        minWidth: 180,
        flex: 1.2,
        description: "Correo electrónico del cliente",
      },
      {
        field: "telefono",
        headerName: "Teléfono",
        minWidth: 130,
        flex: 0.8,
        description: "Número de teléfono",
      },
      {
        field: "encargado",
        headerName: "Encargado",
        minWidth: 140,
        flex: 0.9,
        description: "Nombre de la persona encargada",
      },
      {
        field: "tel_encargado",
        headerName: "Tel. Encargado",
        minWidth: 140,
        flex: 0.8,
        description: "Teléfono de la persona encargada",
      },
      {
        field: "direccion",
        headerName: "Dirección",
        minWidth: 220,
        flex: 1.4,
        description: "Dirección del cliente",
      },
    ];

    const rows = customers.map(customer => ({
      ...customer,
      id: customer.idCliente // DataGrid necesita un campo 'id' único
    }));

  // Renderizado responsivo (mobile / tablet handled, but main focus is desktop)
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
            Gestión de Clientes
          </Typography>
          
          <Grid container spacing={2}>
            {customers.map((customer) => (
              <Grid item xs={12} key={customer.idCliente}>
                <Card 
                  sx={{ 
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow: 3,
                      transform: 'translateY(-2px)',
                      transition: 'all 0.2s ease-in-out'
                    }
                  }}
                  onClick={() => this.handleRowClick({ row: customer })}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Avatar
                        alt={customer.nombre}
                        variant="square"
                        sx={{ 
                          borderRadius: 1, 
                          width: 40, 
                          height: 40,
                          mr: 2
                        }}
                      >
                        {customer.nombre.charAt(0)}
                      </Avatar>
                      <Typography variant="h6" fontWeight="bold">
                        {customer.nombre}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      <strong>Razón Social:</strong> {customer.razon_social}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      <strong>NIT:</strong> {customer.nit}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      <strong>Email:</strong> {customer.email}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Chip 
                        label={`ID: ${customer.idCliente}`} 
                        size="small" 
                        variant="outlined" 
                      />
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            this.handleRowClick({ row: customer });
                          }}
                        >
                          <Visibility fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            this.handleEditCustomer(customer);
                          }}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                      </Box>
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
      <Box
        sx={{
          margin: isTablet ? 1 : 3,
          bgcolor: "white",
          borderRadius: 2,
          padding: isTablet ? 2 : 3,
          height: "100%",
          overflow: "hidden",
          // allow horizontal shrink on narrower desktop widths
          overflowX: 'auto'
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
          Gestión de Clientes
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
        
        <CustomerDetailsModal
          open={this.state.modalOpen}
          onClose={this.handleCloseModal}
          customer={this.state.selectedCustomer}
          onEdit={this.handleEditCustomer}
          isMobile={isMobile}
        />
      </Box>
    );
  }
}
