import { productos } from "../producto/Productos";
import { guiasCarga } from "../guiaCarga/GuiasCarga";

export const movimientos = [
  // INGRESOS INICIALES
  {
    idMovimiento: 1,
    tipo: "INGRESO",
    cantidad: 8,
    fecha_movimiento: "2024-01-15",
    observacion: "Ingreso inicial de laptops HP Pavilion desde guía de carga FC-2024-001",
    documento_movimiento: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    GUIA_DE_CARGA_idGuia: 1,
    GUIA_DE_CARGA_CLIENTE_idCliente: 1,
    PRODUCTO_idProducto: 1,
    producto: productos.find(p => p.idProducto === 1),
    guiaCarga: guiasCarga.find(g => g.idGuia === 1)
  },
  {
    idMovimiento: 2,
    tipo: "INGRESO",
    cantidad: 12,
    fecha_movimiento: "2024-01-15",
    observacion: "Ingreso de mouses Logitech G502 desde guía de carga FC-2024-001",
    documento_movimiento: "https://www.africau.edu/images/default/sample.pdf",
    GUIA_DE_CARGA_idGuia: 1,
    GUIA_DE_CARGA_CLIENTE_idCliente: 1,
    PRODUCTO_idProducto: 2,
    producto: productos.find(p => p.idProducto === 2),
    guiaCarga: guiasCarga.find(g => g.idGuia === 1)
  },
  {
    idMovimiento: 3,
    tipo: "INGRESO",
    cantidad: 15,
    fecha_movimiento: "2024-01-20",
    observacion: "Ingreso de destornilladores Phillips desde guía de carga FC-2024-002",
    documento_movimiento: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    GUIA_DE_CARGA_idGuia: 2,
    GUIA_DE_CARGA_CLIENTE_idCliente: 2,
    PRODUCTO_idProducto: 3,
    producto: productos.find(p => p.idProducto === 3),
    guiaCarga: guiasCarga.find(g => g.idGuia === 2)
  },
  {
    idMovimiento: 4,
    tipo: "INGRESO",
    cantidad: 20,
    fecha_movimiento: "2024-01-25",
    observacion: "Ingreso de café colombiano premium desde guía de carga FC-2024-003",
    documento_movimiento: "https://www.africau.edu/images/default/sample.pdf",
    GUIA_DE_CARGA_idGuia: 3,
    GUIA_DE_CARGA_CLIENTE_idCliente: 3,
    PRODUCTO_idProducto: 4,
    producto: productos.find(p => p.idProducto === 4),
    guiaCarga: guiasCarga.find(g => g.idGuia === 3)
  },
  {
    idMovimiento: 5,
    tipo: "INGRESO",
    cantidad: 25,
    fecha_movimiento: "2024-02-01",
    observacion: "Ingreso de camisetas de algodón orgánico desde guía de carga FC-2024-004",
    documento_movimiento: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    GUIA_DE_CARGA_idGuia: 4,
    GUIA_DE_CARGA_CLIENTE_idCliente: 4,
    PRODUCTO_idProducto: 5,
    producto: productos.find(p => p.idProducto === 5),
    guiaCarga: guiasCarga.find(g => g.idGuia === 4)
  },
  {
    idMovimiento: 6,
    tipo: "INGRESO",
    cantidad: 18,
    fecha_movimiento: "2024-02-05",
    observacion: "Ingreso de aceite de oliva extra virgen desde guía de carga FC-2024-005 (NO NACIONALIZADO)",
    documento_movimiento: "https://www.africau.edu/images/default/sample.pdf",
    GUIA_DE_CARGA_idGuia: 5,
    GUIA_DE_CARGA_CLIENTE_idCliente: 5,
    PRODUCTO_idProducto: 6,
    producto: productos.find(p => p.idProducto === 6),
    guiaCarga: guiasCarga.find(g => g.idGuia === 5)
  },
  {
    idMovimiento: 7,
    tipo: "INGRESO",
    cantidad: 10,
    fecha_movimiento: "2024-02-05",
    observacion: "Ingreso de smartphones Samsung Galaxy desde guía de carga FC-2024-005 (NO NACIONALIZADO)",
    documento_movimiento: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    GUIA_DE_CARGA_idGuia: 5,
    GUIA_DE_CARGA_CLIENTE_idCliente: 5,
    PRODUCTO_idProducto: 7,
    producto: productos.find(p => p.idProducto === 7),
    guiaCarga: guiasCarga.find(g => g.idGuia === 5)
  },

  // SALIDAS POR VENTAS
  {
    idMovimiento: 8,
    tipo: "SALIDA",
    cantidad: -3,
    fecha_movimiento: "2024-02-10",
    observacion: "Venta de laptops HP Pavilion a cliente corporativo",
    documento_movimiento: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    GUIA_DE_CARGA_idGuia: 1,
    GUIA_DE_CARGA_CLIENTE_idCliente: 1,
    PRODUCTO_idProducto: 1,
    producto: productos.find(p => p.idProducto === 1),
    guiaCarga: guiasCarga.find(g => g.idGuia === 1)
  },
  {
    idMovimiento: 9,
    tipo: "SALIDA",
    cantidad: -5,
    fecha_movimiento: "2024-02-12",
    observacion: "Venta de mouses Logitech a distribuidor",
    documento_movimiento: "https://www.africau.edu/images/default/sample.pdf",
    GUIA_DE_CARGA_idGuia: 1,
    GUIA_DE_CARGA_CLIENTE_idCliente: 1,
    PRODUCTO_idProducto: 2,
    producto: productos.find(p => p.idProducto === 2),
    guiaCarga: guiasCarga.find(g => g.idGuia === 1)
  },
  {
    idMovimiento: 10,
    tipo: "SALIDA",
    cantidad: -8,
    fecha_movimiento: "2024-02-15",
    observacion: "Venta de destornilladores a ferretería",
    documento_movimiento: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    GUIA_DE_CARGA_idGuia: 2,
    GUIA_DE_CARGA_CLIENTE_idCliente: 2,
    PRODUCTO_idProducto: 3,
    producto: productos.find(p => p.idProducto === 3),
    guiaCarga: guiasCarga.find(g => g.idGuia === 2)
  },
  {
    idMovimiento: 11,
    tipo: "SALIDA",
    cantidad: -10,
    fecha_movimiento: "2024-02-18",
    observacion: "Venta de café colombiano a cadena de restaurantes",
    documento_movimiento: "https://www.africau.edu/images/default/sample.pdf",
    GUIA_DE_CARGA_idGuia: 3,
    GUIA_DE_CARGA_CLIENTE_idCliente: 3,
    PRODUCTO_idProducto: 4,
    producto: productos.find(p => p.idProducto === 4),
    guiaCarga: guiasCarga.find(g => g.idGuia === 3)
  },
  {
    idMovimiento: 12,
    tipo: "SALIDA",
    cantidad: -15,
    fecha_movimiento: "2024-02-20",
    observacion: "Venta de camisetas a tienda de ropa",
    documento_movimiento: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    GUIA_DE_CARGA_idGuia: 4,
    GUIA_DE_CARGA_CLIENTE_idCliente: 4,
    PRODUCTO_idProducto: 5,
    producto: productos.find(p => p.idProducto === 5),
    guiaCarga: guiasCarga.find(g => g.idGuia === 4)
  },

  // TRANSFERENCIAS ENTRE BODEGAS (SOLO PRODUCTOS NACIONALIZADOS)
  {
    idMovimiento: 13,
    tipo: "TRANSFERENCIA",
    cantidad: 2,
    fecha_movimiento: "2024-02-22",
    observacion: "Transferencia de laptops de Bodega Principal a Bodega Secundaria",
    documento_movimiento: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    GUIA_DE_CARGA_idGuia: 1,
    GUIA_DE_CARGA_CLIENTE_idCliente: 1,
    PRODUCTO_idProducto: 1,
    producto: productos.find(p => p.idProducto === 1),
    guiaCarga: guiasCarga.find(g => g.idGuia === 1)
  },
  {
    idMovimiento: 14,
    tipo: "TRANSFERENCIA",
    cantidad: 3,
    fecha_movimiento: "2024-02-25",
    observacion: "Transferencia de destornilladores de Bodega de Herramientas a Bodega Principal",
    documento_movimiento: "https://www.africau.edu/images/default/sample.pdf",
    GUIA_DE_CARGA_idGuia: 2,
    GUIA_DE_CARGA_CLIENTE_idCliente: 2,
    PRODUCTO_idProducto: 3,
    producto: productos.find(p => p.idProducto === 3),
    guiaCarga: guiasCarga.find(g => g.idGuia === 2)
  },
  {
    idMovimiento: 15,
    tipo: "TRANSFERENCIA",
    cantidad: 5,
    fecha_movimiento: "2024-02-28",
    observacion: "Transferencia de camisetas de Bodega de Textiles a Bodega de Distribución",
    documento_movimiento: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    GUIA_DE_CARGA_idGuia: 4,
    GUIA_DE_CARGA_CLIENTE_idCliente: 4,
    PRODUCTO_idProducto: 5,
    producto: productos.find(p => p.idProducto === 5),
    guiaCarga: guiasCarga.find(g => g.idGuia === 4)
  }
];
