import { Component } from "react";
import { Avatar, Box, Typography, Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { existencias } from "./Existencias";
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

  render() {
         const columns = [
       {
         field: "guiaCarga",
         headerName: "Guía de Carga",
         width: 180,
         description: "Guía de carga asociada",
         valueGetter: (params) => params.row.guiaCarga?.numero_guia || params.row.guiaCarga?.factura_comercial || "N/A",
       },
       {
         field: "cliente",
         headerName: "Cliente",
         width: 200,
         description: "Cliente propietario",
         valueGetter: (params) => params.row.cliente?.razon_social || params.row.cliente?.nombre || "N/A",
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
         field: "cantidad",
         headerName: "Cantidad Total",
         width: 130,
         description: "Cantidad total de unidades",
         type: 'number',
       },
       {
         field: "cantidad_nacionalizado",
         headerName: "Nacionalizado",
         width: 130,
         description: "Cantidad nacionalizada",
         type: 'number',
       },
       {
         field: "cantidad_no_nacionalizado",
         headerName: "No Nacionalizado",
         width: 140,
         description: "Cantidad no nacionalizada",
         type: 'number',
       },
       {
         field: "espacio_ocupado",
         headerName: "Espacio Ocupado",
         width: 150,
                 description: "Espacio ocupado en m²",
        type: 'number',
        valueGetter: (params) => `${params.value} m²`,
       },
       {
         field: "bodega",
         headerName: "Bodega",
         width: 150,
         description: "Bodega donde se almacena",
         valueGetter: (params) => params.row.bodega?.nombre || "N/A",
       },
     ];

    const rows = existencias.map(existencia => ({
      ...existencia,
      id: existencia.idExistencia // DataGrid necesita un campo 'id' único
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
