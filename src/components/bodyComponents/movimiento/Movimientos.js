import { productos } from "../producto/Productos";
import { guiasCarga } from "../guiaCarga/GuiasCarga";

import { bodegas } from "../producto/Bodegas";

const movimientos = [
  {
    idMovimiento: 1,
    tipo: "INGRESO",
    cantidad: 3, // 3 laptops individuales
    fecha_movimiento: "2024-01-15",
    observacion: "Ingreso inicial de laptops HP Pavilion",
    GUIA_DE_CARGA_idGuia: 1,
    GUIA_DE_CARGA_CLIENTE_idCliente: 1,
    PRODUCTO_idProducto: 1,
    BODEGA_idBodega: 1,
    producto: productos.find(p => p.idProducto === 1),
    guiaCarga: guiasCarga.find(g => g.idGuia === 1),
    bodega: bodegas.find(b => b.idBodega === 1)
  },
  {
    idMovimiento: 2,
    tipo: "INGRESO",
    cantidad: 2, // 2 mouses individuales
    fecha_movimiento: "2024-01-15",
    observacion: "Ingreso de mouses Logitech",
    GUIA_DE_CARGA_idGuia: 1,
    GUIA_DE_CARGA_CLIENTE_idCliente: 1,
    PRODUCTO_idProducto: 2,
    BODEGA_idBodega: 1,
    
    producto: productos.find(p => p.idProducto === 2),
    guiaCarga: guiasCarga.find(g => g.idGuia === 1),
    bodega: bodegas.find(b => b.idBodega === 1),
    
  },
  {
    idMovimiento: 3,
    tipo: "SALIDA",
    cantidad: -1, // 1 laptop vendida (cantidad negativa)
    fecha_movimiento: "2024-01-16",
    observacion: "Venta de laptop a cliente",
    GUIA_DE_CARGA_idGuia: 1,
    GUIA_DE_CARGA_CLIENTE_idCliente: 1,
    PRODUCTO_idProducto: 1,
    BODEGA_idBodega: 1,
    
    producto: productos.find(p => p.idProducto === 1),
    guiaCarga: guiasCarga.find(g => g.idGuia === 1),
    bodega: bodegas.find(b => b.idBodega === 1),
    
  },
  {
    idMovimiento: 4,
    tipo: "INGRESO",
    cantidad: 3, // 3 teclados individuales
    fecha_movimiento: "2024-01-17",
    observacion: "Ingreso de teclados mecánicos",
    GUIA_DE_CARGA_idGuia: 2,
    GUIA_DE_CARGA_CLIENTE_idCliente: 2,
    PRODUCTO_idProducto: 3,
    BODEGA_idBodega: 2,
    
    producto: productos.find(p => p.idProducto === 3),
    guiaCarga: guiasCarga.find(g => g.idGuia === 2),
    bodega: bodegas.find(b => b.idBodega === 2),
    
  },
  {
    idMovimiento: 5,
    tipo: "INGRESO",
    cantidad: 2, // 2 monitores individuales
    fecha_movimiento: "2024-01-17",
    observacion: "Ingreso de monitores Samsung",
    GUIA_DE_CARGA_idGuia: 2,
    GUIA_DE_CARGA_CLIENTE_idCliente: 2,
    PRODUCTO_idProducto: 4,
    BODEGA_idBodega: 2,
    
    producto: productos.find(p => p.idProducto === 4),
    guiaCarga: guiasCarga.find(g => g.idGuia === 2),
    bodega: bodegas.find(b => b.idBodega === 2),
    
  },
  {
    idMovimiento: 6,
    tipo: "INGRESO",
    cantidad: 3, // 3 productos refrigerados individuales
    fecha_movimiento: "2024-01-19",
    observacion: "Ingreso de productos refrigerados",
    GUIA_DE_CARGA_idGuia: 3,
    GUIA_DE_CARGA_CLIENTE_idCliente: 3,
    PRODUCTO_idProducto: 5,
    BODEGA_idBodega: 6,
    
    producto: productos.find(p => p.idProducto === 5),
    guiaCarga: guiasCarga.find(g => g.idGuia === 3),
    bodega: bodegas.find(b => b.idBodega === 6),
    
  },
  {
    idMovimiento: 7,
    tipo: "INGRESO",
    cantidad: 2, // 2 productos lácteos individuales
    fecha_movimiento: "2024-01-19",
    observacion: "Ingreso de productos lácteos",
    GUIA_DE_CARGA_idGuia: 3,
    GUIA_DE_CARGA_CLIENTE_idCliente: 3,
    PRODUCTO_idProducto: 6,
    BODEGA_idBodega: 6,
    
    producto: productos.find(p => p.idProducto === 6),
    guiaCarga: guiasCarga.find(g => g.idGuia === 3),
    bodega: bodegas.find(b => b.idBodega === 6),
    
  },
  {
    idMovimiento: 8,
    tipo: "SALIDA",
    cantidad: -1, // 1 producto refrigerado vendido (cantidad negativa)
    fecha_movimiento: "2024-01-20",
    observacion: "Venta de producto refrigerado",
    GUIA_DE_CARGA_idGuia: 3,
    GUIA_DE_CARGA_CLIENTE_idCliente: 3,
    PRODUCTO_idProducto: 5,
    BODEGA_idBodega: 6,
    
    producto: productos.find(p => p.idProducto === 5),
    guiaCarga: guiasCarga.find(g => g.idGuia === 3),
    bodega: bodegas.find(b => b.idBodega === 6),
    
  },
  {
    idMovimiento: 9,
    tipo: "INGRESO",
    cantidad: 2, // 2 herramientas individuales
    fecha_movimiento: "2024-01-21",
    observacion: "Ingreso de herramientas industriales",
    GUIA_DE_CARGA_idGuia: 4,
    GUIA_DE_CARGA_CLIENTE_idCliente: 4,
    PRODUCTO_idProducto: 7,
    BODEGA_idBodega: 4,
    
    producto: productos.find(p => p.idProducto === 7),
    guiaCarga: guiasCarga.find(g => g.idGuia === 4),
    bodega: bodegas.find(b => b.idBodega === 4),
    
  },
  {
    idMovimiento: 10,
    tipo: "INGRESO",
    cantidad: 2, // 2 destornilladores individuales
    fecha_movimiento: "2024-01-21",
    observacion: "Ingreso de destornilladores",
    GUIA_DE_CARGA_idGuia: 4,
    GUIA_DE_CARGA_CLIENTE_idCliente: 4,
    PRODUCTO_idProducto: 8,
    BODEGA_idBodega: 4,
    
    producto: productos.find(p => p.idProducto === 8),
    guiaCarga: guiasCarga.find(g => g.idGuia === 4),
    bodega: bodegas.find(b => b.idBodega === 4),
    
  },
  {
    idMovimiento: 11,
    tipo: "AJUSTE",
    cantidad: -1, // 1 herramienta dañada (cantidad negativa)
    fecha_movimiento: "2024-01-22",
    observacion: "Ajuste de inventario por daños",
    GUIA_DE_CARGA_idGuia: 4,
    GUIA_DE_CARGA_CLIENTE_idCliente: 4,
    PRODUCTO_idProducto: 7,
    BODEGA_idBodega: 4,
    
    producto: productos.find(p => p.idProducto === 7),
    guiaCarga: guiasCarga.find(g => g.idGuia === 4),
    bodega: bodegas.find(b => b.idBodega === 4),
    
  },
  {
    idMovimiento: 12,
    tipo: "INGRESO",
    cantidad: 2, // 2 productos automotrices individuales
    fecha_movimiento: "2024-01-23",
    observacion: "Ingreso de productos automotrices",
    GUIA_DE_CARGA_idGuia: 5,
    GUIA_DE_CARGA_CLIENTE_idCliente: 5,
    PRODUCTO_idProducto: 9,
    BODEGA_idBodega: 5,
    
    producto: productos.find(p => p.idProducto === 9),
    guiaCarga: guiasCarga.find(g => g.idGuia === 5),
    bodega: bodegas.find(b => b.idBodega === 5),
    
  },
  {
    idMovimiento: 13,
    tipo: "INGRESO",
    cantidad: 2, // 2 filtros individuales
    fecha_movimiento: "2024-01-23",
    observacion: "Ingreso de filtros de aire",
    GUIA_DE_CARGA_idGuia: 5,
    GUIA_DE_CARGA_CLIENTE_idCliente: 5,
    PRODUCTO_idProducto: 10,
    BODEGA_idBodega: 5,
    
    producto: productos.find(p => p.idProducto === 10),
    guiaCarga: guiasCarga.find(g => g.idGuia === 5),
    bodega: bodegas.find(b => b.idBodega === 5),
    
  },
  {
    idMovimiento: 14,
    tipo: "SALIDA",
    cantidad: -1, // 1 producto automotriz vendido (cantidad negativa)
    fecha_movimiento: "2024-01-24",
    observacion: "Venta de producto automotriz",
    GUIA_DE_CARGA_idGuia: 5,
    GUIA_DE_CARGA_CLIENTE_idCliente: 5,
    PRODUCTO_idProducto: 9,
    BODEGA_idBodega: 5,
    
    producto: productos.find(p => p.idProducto === 9),
    guiaCarga: guiasCarga.find(g => g.idGuia === 5),
    bodega: bodegas.find(b => b.idBodega === 5),
    
  },
  {
    idMovimiento: 15,
    tipo: "INGRESO",
    cantidad: 2, // 2 juguetes individuales
    fecha_movimiento: "2024-01-25",
    observacion: "Ingreso de juguetes educativos",
    GUIA_DE_CARGA_idGuia: 6,
    GUIA_DE_CARGA_CLIENTE_idCliente: 6,
    PRODUCTO_idProducto: 11,
    BODEGA_idBodega: 3,
    
    producto: productos.find(p => p.idProducto === 11),
    guiaCarga: guiasCarga.find(g => g.idGuia === 6),
    bodega: bodegas.find(b => b.idBodega === 3),
    
  },
  {
    idMovimiento: 16,
    tipo: "INGRESO",
    cantidad: 2, // 2 videojuegos individuales
    fecha_movimiento: "2024-01-25",
    observacion: "Ingreso de videojuegos",
    GUIA_DE_CARGA_idGuia: 6,
    GUIA_DE_CARGA_CLIENTE_idCliente: 6,
    PRODUCTO_idProducto: 12,
    BODEGA_idBodega: 3,
    
    producto: productos.find(p => p.idProducto === 12),
    guiaCarga: guiasCarga.find(g => g.idGuia === 6),
    bodega: bodegas.find(b => b.idBodega === 3),
    
  },
  {
    idMovimiento: 17,
    tipo: "TRANSFERENCIA",
    cantidad: -1, // 1 juguete transferido (cantidad negativa - salida de bodega origen)
    fecha_movimiento: "2024-01-26",
    observacion: "Transferencia de juguete entre bodegas",
    GUIA_DE_CARGA_idGuia: 6,
    GUIA_DE_CARGA_CLIENTE_idCliente: 6,
    PRODUCTO_idProducto: 11,
    BODEGA_idBodega: 3,
    
    producto: productos.find(p => p.idProducto === 11),
    guiaCarga: guiasCarga.find(g => g.idGuia === 6),
    bodega: bodegas.find(b => b.idBodega === 3),
    
  },
  {
    idMovimiento: 18,
    tipo: "INGRESO",
    cantidad: 2, // 2 productos hogar individuales
    fecha_movimiento: "2024-01-27",
    observacion: "Ingreso de productos para el hogar",
    GUIA_DE_CARGA_idGuia: 7,
    GUIA_DE_CARGA_CLIENTE_idCliente: 7,
    PRODUCTO_idProducto: 13,
    BODEGA_idBodega: 7,
    
    producto: productos.find(p => p.idProducto === 13),
    guiaCarga: guiasCarga.find(g => g.idGuia === 7),
    bodega: bodegas.find(b => b.idBodega === 7),
    
  },
  {
    idMovimiento: 19,
    tipo: "SALIDA",
    cantidad: -1, // 1 producto hogar vendido (cantidad negativa)
    fecha_movimiento: "2024-01-28",
    observacion: "Venta de producto para el hogar",
    GUIA_DE_CARGA_idGuia: 7,
    GUIA_DE_CARGA_CLIENTE_idCliente: 7,
    PRODUCTO_idProducto: 13,
    BODEGA_idBodega: 7,
    
    producto: productos.find(p => p.idProducto === 13),
    guiaCarga: guiasCarga.find(g => g.idGuia === 7),
    bodega: bodegas.find(b => b.idBodega === 7),
    
  },
  {
    idMovimiento: 20,
    tipo: "INGRESO",
    cantidad: 3, // 3 artículos deportivos individuales
    fecha_movimiento: "2024-01-29",
    observacion: "Ingreso de artículos deportivos",
    GUIA_DE_CARGA_idGuia: 8,
    GUIA_DE_CARGA_CLIENTE_idCliente: 8,
    PRODUCTO_idProducto: 15,
    BODEGA_idBodega: 2,
    
    producto: productos.find(p => p.idProducto === 15),
    guiaCarga: guiasCarga.find(g => g.idGuia === 8),
    bodega: bodegas.find(b => b.idBodega === 2),
    
  },
  {
    idMovimiento: 21,
    tipo: "AJUSTE",
    cantidad: -1, // 1 artículo deportivo dañado (cantidad negativa)
    fecha_movimiento: "2024-01-30",
    observacion: "Ajuste por artículo deportivo dañado",
    GUIA_DE_CARGA_idGuia: 8,
    GUIA_DE_CARGA_CLIENTE_idCliente: 8,
    PRODUCTO_idProducto: 15,
    BODEGA_idBodega: 2,
    
    producto: productos.find(p => p.idProducto === 15),
    guiaCarga: guiasCarga.find(g => g.idGuia === 8),
    bodega: bodegas.find(b => b.idBodega === 2),
    
  }
];

export { movimientos };
