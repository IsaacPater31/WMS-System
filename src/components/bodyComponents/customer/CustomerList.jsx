import { Component } from "react";
import { Avatar, Box, Typography, Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { customers } from "./Customers";
import CustomerDetailsModal from "./CustomerDetailsModal";

export default class CustomerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCustomer: null,
      modalOpen: false,
    };
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
    const columns = [
      {
        field: "nombre",
        headerName: "Nombre",
        width: 200,
        description: "Nombre del cliente",
        renderCell: (params) => {
          return (
            <>
              <Avatar
                alt={params.row.nombre}
                variant="square"
                sx={{ borderRadius: 1, width: 30, height: 30 }}
              >
                {params.row.nombre.charAt(0)}
              </Avatar>
              <Typography variant="subtitle2" sx={{ mx: 3 }}>
                {params.row.nombre}
              </Typography>
            </>
          );
        },
      },
      {
        field: "razon_social",
        headerName: "Razón Social",
        width: 200,
        description: "Razón social de la empresa",
      },
      {
        field: "nit",
        headerName: "NIT",
        width: 150,
        description: "Número de Identificación Tributaria",
      },
      {
        field: "representante_legal",
        headerName: "Representante Legal",
        width: 180,
        description: "Nombre del representante legal",
      },
      {
        field: "email",
        headerName: "Correo Electrónico",
        width: 200,
        description: "Correo electrónico del cliente",
      },
      {
        field: "telefono",
        headerName: "Teléfono",
        width: 150,
        description: "Número de teléfono",
      },
      {
        field: "encargado",
        headerName: "Encargado",
        width: 150,
        description: "Nombre de la persona encargada",
      },
      {
        field: "tel_encargado",
        headerName: "Tel. Encargado",
        width: 150,
        description: "Teléfono de la persona encargada",
      },
      {
        field: "direccion",
        headerName: "Dirección",
        width: 250,
        description: "Dirección del cliente",
      },
    ];

    const rows = customers.map(customer => ({
      ...customer,
      id: customer.idCliente // DataGrid necesita un campo 'id' único
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
          Gestión de Clientes
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
        
        <CustomerDetailsModal
          open={this.state.modalOpen}
          onClose={this.handleCloseModal}
          customer={this.state.selectedCustomer}
          onEdit={this.handleEditCustomer}
        />
      </Box>
    );
  }
}
