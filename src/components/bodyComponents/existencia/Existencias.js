import { productos } from "../producto/Productos";
import { bodegas } from "../producto/Bodegas";
import { unidadesCarga } from "../guiaCarga/UnidadesCarga";
import { guiasCarga } from "../guiaCarga/GuiasCarga";
import { customers } from "../customer/Customers";

export const existencias = [
  // Laptop HP Pavilion - 1 existencia con 8 unidades
  {
    idExistencia: 1,
    cantidad: 8,
    estado: "DISPONIBLE",
    ubicacion: "Estante A-1",
    fecha_vencimiento: null,
    lote: "LOT-2024-001",
    PRODUCTO_idProducto: 1,
    BODEGA_idBodega: 1,
    UNIDAD_DE_CARGA_idUnidad: 1,
    producto: productos.find(p => p.idProducto === 1),
    bodega: bodegas.find(b => b.idBodega === 1),
    unidadCarga: unidadesCarga.find(u => u.idUnidad === 1),
    guiaCarga: guiasCarga.find(g => g.idGuia === 1),
    cliente: customers.find(c => c.idCliente === 1),
    factura_guia: "FC-2024-001",
    nombre_cliente: "BHK sas"
  },
  
  // Mouse Logitech G502 - 1 existencia con 12 unidades
  {
    idExistencia: 2,
    cantidad: 12,
    estado: "DISPONIBLE",
    ubicacion: "Estante A-2",
    fecha_vencimiento: null,
    lote: "LOT-2024-002",
    PRODUCTO_idProducto: 2,
    BODEGA_idBodega: 1,
    UNIDAD_DE_CARGA_idUnidad: 2,
    producto: productos.find(p => p.idProducto === 2),
    bodega: bodegas.find(b => b.idBodega === 1),
    unidadCarga: unidadesCarga.find(u => u.idUnidad === 2),
    guiaCarga: guiasCarga.find(g => g.idGuia === 1),
    cliente: customers.find(c => c.idCliente === 1),
    factura_guia: "FC-2024-001",
    nombre_cliente: "BHK sas"
  },
  
  // Destornillador Phillips - 1 existencia con 15 unidades
  {
    idExistencia: 3,
    cantidad: 15,
    estado: "DISPONIBLE",
    ubicacion: "Estante C-1",
    fecha_vencimiento: null,
    lote: "LOT-2024-003",
    PRODUCTO_idProducto: 3,
    BODEGA_idBodega: 3,
    UNIDAD_DE_CARGA_idUnidad: 3,
    producto: productos.find(p => p.idProducto === 3),
    bodega: bodegas.find(b => b.idBodega === 3),
    unidadCarga: unidadesCarga.find(u => u.idUnidad === 3),
    guiaCarga: guiasCarga.find(g => g.idGuia === 2),
    cliente: customers.find(c => c.idCliente === 2),
    factura_guia: "FC-2024-002",
    nombre_cliente: "Distribuidora XYZ"
  },
  
  // Café Colombiano Premium - 1 existencia con 20 unidades
  {
    idExistencia: 4,
    cantidad: 20,
    estado: "DISPONIBLE",
    ubicacion: "Estante D-1",
    fecha_vencimiento: "2025-12-31",
    lote: "LOT-2024-004",
    PRODUCTO_idProducto: 4,
    BODEGA_idBodega: 4,
    UNIDAD_DE_CARGA_idUnidad: 4,
    producto: productos.find(p => p.idProducto === 4),
    bodega: bodegas.find(b => b.idBodega === 4),
    unidadCarga: unidadesCarga.find(u => u.idUnidad === 4),
    guiaCarga: guiasCarga.find(g => g.idGuia === 3),
    cliente: customers.find(c => c.idCliente === 3),
    factura_guia: "FC-2024-003",
    nombre_cliente: "Importadora Delta"
  },
  
  // Camisetas Algodón Orgánico - 1 existencia con 25 unidades
  {
    idExistencia: 5,
    cantidad: 25,
    estado: "DISPONIBLE",
    ubicacion: "Estante E-1",
    fecha_vencimiento: null,
    lote: "LOT-2024-005",
    PRODUCTO_idProducto: 5,
    BODEGA_idBodega: 5,
    UNIDAD_DE_CARGA_idUnidad: 5,
    producto: productos.find(p => p.idProducto === 5),
    bodega: bodegas.find(b => b.idBodega === 5),
    unidadCarga: unidadesCarga.find(u => u.idUnidad === 5),
    guiaCarga: guiasCarga.find(g => g.idGuia === 4),
    cliente: customers.find(c => c.idCliente === 4),
    factura_guia: "FC-2024-004",
    nombre_cliente: "Comercial Omega"
  },
  
  // Aceite de Oliva Extra Virgen - 1 existencia con 18 unidades (NO NACIONALIZADO)
  {
    idExistencia: 6,
    cantidad: 18,
    estado: "NO NACIONALIZADO",
    ubicacion: "Estante D-2",
    fecha_vencimiento: "2025-06-30",
    lote: "LOT-2024-006",
    PRODUCTO_idProducto: 6,
    BODEGA_idBodega: 4,
    UNIDAD_DE_CARGA_idUnidad: 6,
    producto: productos.find(p => p.idProducto === 6),
    bodega: bodegas.find(b => b.idBodega === 4),
    unidadCarga: unidadesCarga.find(u => u.idUnidad === 6),
    guiaCarga: guiasCarga.find(g => g.idGuia === 5),
    cliente: customers.find(c => c.idCliente === 5),
    factura_guia: "FC-2024-005",
    nombre_cliente: "Exportadora Sigma"
  },
  
  // Smartphone Samsung Galaxy - 1 existencia con 10 unidades (NO NACIONALIZADO)
  {
    idExistencia: 7,
    cantidad: 10,
    estado: "NO NACIONALIZADO",
    ubicacion: "Estante A-3",
    fecha_vencimiento: null,
    lote: "LOT-2024-007",
    PRODUCTO_idProducto: 7,
    BODEGA_idBodega: 1,
    UNIDAD_DE_CARGA_idUnidad: 7,
    producto: productos.find(p => p.idProducto === 7),
    bodega: bodegas.find(b => b.idBodega === 1),
    unidadCarga: unidadesCarga.find(u => u.idUnidad === 7),
    guiaCarga: guiasCarga.find(g => g.idGuia === 5),
    cliente: customers.find(c => c.idCliente === 5),
    factura_guia: "FC-2024-005",
    nombre_cliente: "Exportadora Sigma"
  }
];
