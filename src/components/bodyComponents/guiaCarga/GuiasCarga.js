import { customers } from "../customer/Customers";
import { unidadesCarga } from "./UnidadesCarga";

const guiasCarga = [
  {
    idGuia: 1,
    factura_comercial: "FC-2024-001",
    fecha_ingreso: "2024-01-15",
    unidades_carga: "2",
    unidades_producto: "5",
    peso_total: "12.5",
    contenedores: "1",
    espacio_ocupado: "4.5",
    CLIENTE_idCliente: 1,
    cliente: customers[0],
    unidadesCarga: unidadesCarga.filter(u => u.GUIA_DE_CARGA_idGuia === 1)
  },
  {
    idGuia: 2,
    factura_comercial: "FC-2024-002",
    fecha_ingreso: "2024-01-16",
    unidades_carga: "2",
    unidades_producto: "3",
    peso_total: "6.0",
    contenedores: "1",
    espacio_ocupado: "3.0",
    CLIENTE_idCliente: 2,
    cliente: customers[1],
    unidadesCarga: unidadesCarga.filter(u => u.GUIA_DE_CARGA_idGuia === 2)
  },
  {
    idGuia: 3,
    factura_comercial: "FC-2024-003",
    fecha_ingreso: "2024-01-17",
    unidades_carga: "2",
    unidades_producto: "3",
    peso_total: "4.5",
    contenedores: "1",
    espacio_ocupado: "2.5",
    CLIENTE_idCliente: 3,
    cliente: customers[2],
    unidadesCarga: unidadesCarga.filter(u => u.GUIA_DE_CARGA_idGuia === 3)
  },
  {
    idGuia: 4,
    factura_comercial: "FC-2024-004",
    fecha_ingreso: "2024-01-18",
    unidades_carga: "2",
    unidades_producto: "2",
    peso_total: "8.0",
    contenedores: "1",
    espacio_ocupado: "3.5",
    CLIENTE_idCliente: 4,
    cliente: customers[3],
    unidadesCarga: unidadesCarga.filter(u => u.GUIA_DE_CARGA_idGuia === 4)
  },
  {
    idGuia: 5,
    factura_comercial: "FC-2024-005",
    fecha_ingreso: "2024-01-19",
    unidades_carga: "2",
    unidades_producto: "2",
    peso_total: "6.0",
    contenedores: "1",
    espacio_ocupado: "2.8",
    CLIENTE_idCliente: 5,
    cliente: customers[4],
    unidadesCarga: unidadesCarga.filter(u => u.GUIA_DE_CARGA_idGuia === 5)
  },
  {
    idGuia: 6,
    factura_comercial: "FC-2024-006",
    fecha_ingreso: "2024-01-20",
    unidades_carga: "2",
    unidades_producto: "2",
    peso_total: "3.0",
    contenedores: "1",
    espacio_ocupado: "1.5",
    CLIENTE_idCliente: 1,
    cliente: customers[0],
    unidadesCarga: unidadesCarga.filter(u => u.GUIA_DE_CARGA_idGuia === 6)
  },
  {
    idGuia: 7,
    factura_comercial: "FC-2024-007",
    fecha_ingreso: "2024-01-21",
    unidades_carga: "1",
    unidades_producto: "2",
    peso_total: "4.0",
    contenedores: "1",
    espacio_ocupado: "2.0",
    CLIENTE_idCliente: 2,
    cliente: customers[1],
    unidadesCarga: unidadesCarga.filter(u => u.GUIA_DE_CARGA_idGuia === 7)
  },
  {
    idGuia: 8,
    factura_comercial: "FC-2024-008",
    fecha_ingreso: "2024-01-22",
    unidades_carga: "1",
    unidades_producto: "3",
    peso_total: "6.0",
    contenedores: "1",
    espacio_ocupado: "3.2",
    CLIENTE_idCliente: 3,
    cliente: customers[2],
    unidadesCarga: unidadesCarga.filter(u => u.GUIA_DE_CARGA_idGuia === 8)
  }
];

export { guiasCarga };
