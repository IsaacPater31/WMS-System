import { Component } from "react";
import { Avatar, Box, Typography, Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
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

  render() {
    const columns = [
      {
        field: "tipo",
        headerName: "Tipo",
        width: 120,
        description: "Tipo de movimiento",
        renderCell: (params) => (
          <Chip 
            label={params.value} 
            size="small" 
            color={this.getTipoColor(params.value)}
            variant="outlined"
          />
        ),
      },
      {
        field: "cantidad",
        headerName: "Cantidad",
        width: 100,
        description: "Cantidad del movimiento",
        type: 'number',
        renderCell: (params) => (
          <Typography 
            variant="body2" 
            color={params.value >= 0 ? 'success.main' : 'error.main'}
            fontWeight="medium"
          >
            {params.value > 0 ? `+${params.value}` : params.value}
          </Typography>
        ),
      },
      {
        field: "fecha_movimiento",
        headerName: "Fecha",
        width: 120,
        description: "Fecha del movimiento",
        valueGetter: (params) => {
          const date = new Date(params.row.fecha_movimiento);
          return date.toLocaleDateString('es-ES');
        },
      },
      {
        field: "producto",
        headerName: "Producto",
        width: 250,
        description: "Producto asociado",
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
                {params.row.producto?.nombre || "N/A"}
              </Typography>
            </>
          );
        },
      },
      {
        field: "guiaCarga",
        headerName: "Guía de Carga",
        width: 150,
        description: "Guía de carga asociada",
        valueGetter: (params) => params.row.guiaCarga?.factura_comercial || "N/A",
      },
      {
        field: "observacion",
        headerName: "Observación",
        width: 200,
        description: "Observación del movimiento",
      },
    ];

    const rows = movimientos.map(movimiento => ({
      ...movimiento,
      id: movimiento.idMovimiento // DataGrid necesita un campo 'id' único
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
          Gestión de Movimientos
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
        
        <MovimientoDetailsModal
          open={this.state.modalOpen}
          onClose={this.handleCloseModal}
          movimiento={this.state.selectedMovimiento}
          onEdit={this.handleEditMovimiento}
        />
      </Box>
    );
  }
}
