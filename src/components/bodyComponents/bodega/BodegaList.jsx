import { Component } from "react";
import { Avatar, Box, Typography, Chip, Button, IconButton, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Add, Edit, Visibility, Delete } from "@mui/icons-material";
import { bodegas } from "../producto/Bodegas";

import BodegaDetailsModal from "./BodegaDetailsModal";

export default class BodegaList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBodega: null,
      modalOpen: false,
    };
  }

  handleRowClick = (params) => {
    this.setState({
      selectedBodega: params.row,
      modalOpen: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      modalOpen: false,
      selectedBodega: null,
    });
  };

  handleEditBodega = (bodega) => {
    if (this.props.onEditBodega) {
      this.props.onEditBodega(bodega);
    }
  };

  getEstadoColor = (estado) => {
    switch (estado) {
      case 'ACTIVA':
        return 'success';
      case 'INACTIVA':
        return 'error';
      case 'MANTENIMIENTO':
        return 'warning';
      default:
        return 'default';
    }
  };

  render() {
    const columns = [
      {
        field: "nombre",
        headerName: "Nombre",
        width: 200,
        description: "Nombre único de la bodega",
        renderCell: (params) => {
          return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar
                alt="Bodega"
                variant="square"
                sx={{ borderRadius: 1, width: 30, height: 30, backgroundColor: 'primary.main' }}
              >
                B
              </Avatar>
              <Typography variant="subtitle2">
                {params.row.nombre}
              </Typography>
            </Box>
          );
        },
      },
             {
         field: "capacidad",
         headerName: "Capacidad",
         width: 120,
         description: "Capacidad máxima en metros cuadrados",
         type: 'number',
         valueGetter: (params) => `${params.row.capacidad.toLocaleString()} m²`,
       },
      {
        field: "estado",
        headerName: "Estado",
        width: 120,
        description: "Estado operativo de la bodega",
        renderCell: (params) => (
          <Chip 
            label={params.value} 
            size="small" 
            color={this.getEstadoColor(params.value)}
            variant="outlined"
          />
        ),
      },

      {
        field: "actions",
        headerName: "Acciones",
        width: 150,
        sortable: false,
        filterable: false,
        renderCell: (params) => (
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <Tooltip title="Ver detalles">
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  this.handleRowClick(params);
                }}
              >
                <Visibility fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Editar bodega">
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  this.handleEditBodega(params.row);
                }}
              >
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar bodega">
              <IconButton
                size="small"
                color="error"
                onClick={(e) => {
                  e.stopPropagation();
                  // Aquí iría la lógica para eliminar
                }}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        ),
      },

    ];

    const rows = bodegas.map(bodega => ({
      ...bodega,
      id: bodega.idBodega // DataGrid necesita un campo 'id' único
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
          Gestión de Bodegas
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
        
        <BodegaDetailsModal
          open={this.state.modalOpen}
          onClose={this.handleCloseModal}
          bodega={this.state.selectedBodega}
          onEdit={this.handleEditBodega}
        />
      </Box>
    );
  }
}
