import { Component } from "react";
import { Avatar, Box, Typography, Chip, IconButton, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Edit, Visibility, Inventory, QrCode, LocalShipping, Assignment, Inventory2 } from "@mui/icons-material";
import { existencias } from "./Existencias";
import { unidadesCarga } from "../guiaCarga/UnidadesCarga";
import ExistenciaDetailsModal from "./ExistenciaDetailsModal";

export default class ExistenciaList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedExistencia: null,
      modalOpen: false,
    };
  }

  handleRowClick = (params) => {
    this.setState({
      selectedExistencia: params.row,
      modalOpen: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      modalOpen: false,
      selectedExistencia: null,
    });
  };

  handleEditExistencia = (existencia) => {
    if (this.props.onEditExistencia) {
      this.props.onEditExistencia(existencia);
    }
  };

  getEstadoColor = (estado) => {
    switch (estado) {
      case 'NACIONALIZADO':
        return 'success';
      case 'NO_NACIONALIZADO':
        return 'warning';
      default:
        return 'default';
    }
  };

  render() {
    const columns = [
      {
        field: "serial",
        headerName: "Serial",
        width: 200,
        description: "Serial único de la unidad",
        renderCell: (params) => {
          return (
            <>
              <Avatar
                alt="Existencia"
                variant="square"
                sx={{ borderRadius: 1, width: 30, height: 30, backgroundColor: 'primary.main' }}
              >
                <QrCode sx={{ fontSize: 16 }} />
              </Avatar>
              <Typography variant="subtitle2" sx={{ mx: 3, fontFamily: 'monospace' }}>
                {params.value}
              </Typography>
            </>
          );
        },
      },
      {
        field: "producto",
        headerName: "Producto",
        width: 200,
        description: "Producto asociado",
        renderCell: (params) => {
          const producto = params.row.producto;
          return (
            <Typography variant="subtitle2" fontWeight="medium">
              {producto?.nombre || "N/A"}
            </Typography>
          );
        },
      },
      {
        field: "estado",
        headerName: "Estado",
        width: 130,
        description: "Estado de nacionalización",
        renderCell: (params) => {
          const color = this.getEstadoColor(params.value);
          return (
            <Chip
              label={params.value?.replace('_', ' ') || "Sin estado"}
              color={color}
              size="small"
              variant="filled"
              sx={{ fontWeight: 'medium' }}
            />
          );
        },
      },
      {
        field: "cliente",
        headerName: "Cliente",
        width: 180,
        description: "Cliente propietario",
        renderCell: (params) => {
          const cliente = params.row.cliente;
          return (
            <Typography variant="body2">
              {cliente?.razon_social || "N/A"}
            </Typography>
          );
        },
      },
      {
        field: "bodega",
        headerName: "Bodega",
        width: 150,
        description: "Bodega donde se almacena",
        renderCell: (params) => {
          const bodega = params.row.bodega;
          return (
            <Typography variant="body2">
              {bodega?.nombre || "N/A"}
            </Typography>
          );
        },
      },
                 {
               field: "unidadCarga",
               headerName: "Unidad de Carga",
               width: 140,
               description: "Unidad de carga asociada",
               renderCell: (params) => {
                   const unidadCarga = params.row.UNIDAD_DE_CARGA_idUnidad 
                       ? unidadesCarga.find(u => u.idUnidad === params.row.UNIDAD_DE_CARGA_idUnidad)
                       : null;
                   
                   return (
                       <Box sx={{ display: 'flex', alignItems: 'center' }}>
                           <Inventory2 sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                           <Typography variant="body2">
                               {unidadCarga ? unidadCarga.idUnidad : "N/A"}
                           </Typography>
                       </Box>
                   );
               },
           },
      {
        field: "guiaCarga",
        headerName: "Guía de Carga",
        width: 150,
        description: "Guía de carga asociada",
        renderCell: (params) => {
          const guia = params.row.guiaCarga;
          return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Assignment sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2">
                {guia?.factura_comercial || "N/A"}
              </Typography>
            </Box>
          );
        },
      },
      {
        field: "actions",
        headerName: "Acciones",
        width: 120,
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
                sx={{ 
                  color: 'text.secondary',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    color: 'text.primary'
                  }
                }}
              >
                <Visibility />
              </IconButton>
            </Tooltip>
            <Tooltip title="Editar">
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  this.handleEditExistencia(params.row);
                }}
                sx={{ 
                  color: 'text.secondary',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    color: 'text.primary'
                  }
                }}
              >
                <Edit />
              </IconButton>
            </Tooltip>
          </Box>
        ),
      },
    ];

    const rows = existencias.map(existencia => ({
      ...existencia,
      id: existencia.idExistencia
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
          Gestión de Existencias
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
            sorting: {
              sortModel: [{ field: 'idExistencia', sort: 'desc' }],
            },
          }}
          pageSizeOptions={[10, 15, 20, 30]}
          rowSelection={false}
          disableRowSelectionOnClick
          autoHeight
          onRowClick={this.handleRowClick}

        />
        
        <ExistenciaDetailsModal
          open={this.state.modalOpen}
          onClose={this.handleCloseModal}
          existencia={this.state.selectedExistencia}
          onEdit={this.handleEditExistencia}
        />
      </Box>
    );
  }
}
