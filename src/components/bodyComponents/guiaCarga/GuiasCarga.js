import { customers } from "../customer/Customers";
import { unidadesCarga } from "./UnidadesCarga";

export const guiasCarga = [
  {
    idGuia: 1,
    factura_comercial: "FC-2024-001",
    fecha_ingreso: "2024-01-15",
    unidades_carga: "2",
    unidades_producto: "20", // 8 (Laptop) + 12 (Mouse) = 20
    peso_total: "31.5", // 25kg (Pallet) + 6.5kg (Caja) = 31.5kg
    contenedores: "1",
    espacio_ocupado: "25.5",
    CLIENTE_idCliente: 1,
    cliente: customers.find(c => c.idCliente === 1),
    documento_carga: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    unidadesCarga: unidadesCarga.filter(u => u.GUIA_DE_CARGA_idGuia === 1)
  },
  {
    idGuia: 2,
    factura_comercial: "FC-2024-002",
    fecha_ingreso: "2024-01-20",
    unidades_carga: "1",
    unidades_producto: "15", // 15 (Destornillador) = 15
    peso_total: "7.5", // 7.5kg (Caja herramientas) = 7.5kg
    contenedores: "1",
    espacio_ocupado: "8.0",
    CLIENTE_idCliente: 2,
    cliente: customers.find(c => c.idCliente === 2),
    documento_carga: "https://www.africau.edu/images/default/sample.pdf",
    unidadesCarga: unidadesCarga.filter(u => u.GUIA_DE_CARGA_idGuia === 2)
  },
  {
    idGuia: 3,
    factura_comercial: "FC-2024-003",
    fecha_ingreso: "2024-01-25",
    unidades_carga: "1",
    unidades_producto: "20", // 20 (Café) = 20
    peso_total: "22.0", // 22kg (Saco) = 22kg
    contenedores: "1",
    espacio_ocupado: "5.0",
    CLIENTE_idCliente: 3,
    cliente: customers.find(c => c.idCliente === 3),
    documento_carga: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    unidadesCarga: unidadesCarga.filter(u => u.GUIA_DE_CARGA_idGuia === 3)
  },
  {
    idGuia: 4,
    factura_comercial: "FC-2024-004",
    fecha_ingreso: "2024-02-01",
    unidades_carga: "1",
    unidades_producto: "25", // 25 (Camisetas) = 25
    peso_total: "7.5", // 7.5kg (Caja) = 7.5kg
    contenedores: "1",
    espacio_ocupado: "6.0",
    CLIENTE_idCliente: 4,
    cliente: customers.find(c => c.idCliente === 4),
    documento_carga: "https://www.africau.edu/images/default/sample.pdf",
    unidadesCarga: unidadesCarga.filter(u => u.GUIA_DE_CARGA_idGuia === 4)
  },
  {
    idGuia: 5,
    factura_comercial: "FC-2024-005",
    fecha_ingreso: "2024-02-05",
    unidades_carga: "2",
    unidades_producto: "28", // 18 (Aceite) + 10 (Smartphone) = 28
    peso_total: "22.0", // 17kg (Tambor) + 5kg (Caja) = 22kg
    contenedores: "1",
    espacio_ocupado: "12.0",
    CLIENTE_idCliente: 5,
    cliente: customers.find(c => c.idCliente === 5),
    documento_carga: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    unidadesCarga: unidadesCarga.filter(u => u.GUIA_DE_CARGA_idGuia === 5)
  }
];
