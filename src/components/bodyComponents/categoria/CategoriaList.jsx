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
  useMediaQuery
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Edit, Visibility, Delete } from "@mui/icons-material";
import { categorias } from "./Categorias";
import CategoriaDetailsModal from "./CategoriaDetailsModal";

export default class CategoriaList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategoria: null,
      modalOpen: false,
    };
  }

  handleRowClick = (params) => {
    this.setState({
      selectedCategoria: params.row,
      modalOpen: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      modalOpen: false,
      selectedCategoria: null,
    });
  };

  handleEditCategoria = (categoria) => {
    if (this.props.onEditCategoria) {
      this.props.onEditCategoria(categoria);
    }
  };

  render() {
    const { isMobile, isTablet } = this.props;
    
    const columns = [
      {
        field: "nombre",
        headerName: "Nombre",
        width: isMobile ? 120 : 200,
        description: "Nombre de la categoría",
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
        field: "descripcion",
        headerName: "Descripción",
        width: isMobile ? 150 : 300,
        description: "Descripción de la categoría",
        renderCell: (params) => (
          <Typography 
            variant={isMobile ? "caption" : "body2"}
            sx={{ 
              fontSize: isMobile ? '0.7rem' : 'inherit',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {params.row.descripcion}
          </Typography>
        ),
      },
      {
        field: "actions",
        headerName: "Acciones",
        width: isMobile ? 100 : 150,
        sortable: false,
        renderCell: (params) => (
          <Box sx={{ display: 'flex', gap: isMobile ? 0.5 : 1 }}>
            <IconButton
              size={isMobile ? "small" : "medium"}
              onClick={(e) => {
                e.stopPropagation();
                this.handleRowClick(params);
              }}
            >
              <Visibility fontSize={isMobile ? "small" : "medium"} />
            </IconButton>
            <IconButton
              size={isMobile ? "small" : "medium"}
              onClick={(e) => {
                e.stopPropagation();
                this.handleEditCategoria(params.row);
              }}
            >
              <Edit fontSize={isMobile ? "small" : "medium"} />
            </IconButton>
          </Box>
        ),
      },
    ];

    const rows = categorias.map(categoria => ({
      ...categoria,
      id: categoria.idCategoria
    }));

    // Renderizado responsivo
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
            Gestión de Categorías
          </Typography>
          
          <Grid container spacing={2}>
            {categorias.map((categoria) => (
              <Grid item xs={12} key={categoria.idCategoria}>
                <Card 
                  sx={{ 
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow: 3,
                      transform: 'translateY(-2px)',
                      transition: 'all 0.2s ease-in-out'
                    }
                  }}
                  onClick={() => this.handleRowClick({ row: categoria })}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Avatar
                        alt={categoria.nombre}
                        variant="square"
                        sx={{ 
                          borderRadius: 1, 
                          width: 40, 
                          height: 40,
                          mr: 2
                        }}
                      >
                        {categoria.nombre.charAt(0)}
                      </Avatar>
                      <Typography variant="h6" fontWeight="bold">
                        {categoria.nombre}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {categoria.descripcion}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Chip 
                        label={`ID: ${categoria.idCategoria}`} 
                        size="small" 
                        variant="outlined" 
                      />
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            this.handleRowClick({ row: categoria });
                          }}
                        >
                          <Visibility fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            this.handleEditCategoria(categoria);
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
          overflow: "hidden"
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
          Gestión de Categorías
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
              paginationModel: { page: 0, pageSize: isMobile ? 5 : isTablet ? 8 : 10 },
            },
          }}
          pageSizeOptions={isMobile ? [5, 10] : isTablet ? [8, 15] : [10, 15, 20, 30]}
          rowSelection={false}
          disableRowSelectionOnClick
          autoHeight
          onRowClick={this.handleRowClick}
        />
        
        <CategoriaDetailsModal
          open={this.state.modalOpen}
          onClose={this.handleCloseModal}
          categoria={this.state.selectedCategoria}
          onEdit={this.handleEditCategoria}
          isMobile={isMobile}
        />
      </Box>
    );
  }
}
