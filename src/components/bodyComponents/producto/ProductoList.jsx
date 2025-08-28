import { Component } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { productos } from "./Productos";
import ProductoDetailsModal from "./ProductoDetailsModal";

export default class ProductoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProducto: null,
      modalOpen: false,
    };
  }

  handleRowClick = (params) => {
    this.setState({
      selectedProducto: params.row,
      modalOpen: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      modalOpen: false,
      selectedProducto: null,
    });
  };

  handleEditProducto = (producto) => {
    if (this.props.onEditProducto) {
      this.props.onEditProducto(producto);
    }
  };

  render() {
    const columns = [
      {
        field: "nombre",
        headerName: "Nombre del Producto",
        width: 250,
        description: "Nombre del producto",
        renderCell: (params) => {
          return (
            <>
              <Avatar
                alt="Producto"
                variant="square"
                sx={{ borderRadius: 1, width: 30, height: 30, backgroundColor: 'primary.main' }}
              >
                P
              </Avatar>
              <Typography variant="subtitle2" sx={{ mx: 3 }}>
                {params.row.nombre}
              </Typography>
            </>
          );
        },
      },
      {
        field: "referencia",
        headerName: "Referencia",
        width: 150,
        description: "Código de referencia del producto",
      },
      {
        field: "cantidad",
        headerName: "Cantidad Total",
        width: 130,
        description: "Cantidad total del producto",
        type: 'number',
        renderCell: (params) => (
          <Typography variant="body2" fontWeight="bold" color="primary.main">
            {params.value || 0}
          </Typography>
        ),
      },
      {
        field: "cantidad_nacionalizado",
        headerName: "Nacionalizado",
        width: 120,
        description: "Cantidad nacionalizada",
        type: 'number',
        renderCell: (params) => (
          <Typography variant="body2" color="success.main" fontWeight="medium">
            {params.value || 0}
          </Typography>
        ),
      },
      {
        field: "cantidad_no_nacionalizado",
        headerName: "No Nacionalizado",
        width: 140,
        description: "Cantidad no nacionalizada",
        type: 'number',
        renderCell: (params) => (
          <Typography variant="body2" color="warning.main" fontWeight="medium">
            {params.value || 0}
          </Typography>
        ),
      },
      {
        field: "peso",
        headerName: "Peso (kg)",
        width: 120,
        description: "Peso del producto en kilogramos",
        type: 'number',
        valueGetter: (params) => `${params.row.peso} kg`,
      },
      {
        field: "categoria",
        headerName: "Categoría",
        width: 150,
        description: "Categoría del producto",
        valueGetter: (params) => params.row.categoria?.nombre || "N/A",
      },
      {
        field: "bodega",
        headerName: "Bodega",
        width: 150,
        description: "Bodega donde se almacena el producto",
        valueGetter: (params) => params.row.bodega?.nombre || "N/A",
      },
      {
        field: "UNIDAD_DE_CARGA_idUnidad",
        headerName: "Unidad de Carga",
        width: 140,
        description: "ID de la unidad de carga asociada",
        type: 'number',
      },
    ];

    const rows = productos.map(producto => ({
      ...producto,
      id: producto.idProducto // DataGrid necesita un campo 'id' único
    }));

    return (
      <Box
        sx={{
          margin: 3,
          bgcolor: "white",
          borderRadius: 2,
          padding: 3,
          height: "100%",
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", color: "primary.main" }}>
          Gestión de Productos
        </Typography>
        <DataGrid
          sx={{
            borderLeft: 0,
            borderRight: 0,
            borderRadius: 0,
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #e0e0e0",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f5f5f5",
              borderBottom: "2px solid #e0e0e0",
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
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 15, 20, 30]}
          rowSelection={false}
          disableRowSelectionOnClick
          autoHeight
          onRowClick={this.handleRowClick}
        />
        
        <ProductoDetailsModal
          open={this.state.modalOpen}
          onClose={this.handleCloseModal}
          producto={this.state.selectedProducto}
          onEdit={this.handleEditProducto}
        />
      </Box>
    );
  }
}
