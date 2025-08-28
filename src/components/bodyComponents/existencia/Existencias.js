import { productos } from "../producto/Productos";
import { guiasCarga } from "../guiaCarga/GuiasCarga";
import { bodegas } from "../producto/Bodegas";
import { customers } from "../customer/Customers";

const existencias = [
  // Jeans Hombre - Existencia en bodega (datos de la imagen)
  {
    idExistencia: 1,
    cantidad: 4000,
    cantidad_nacionalizado: 2750,
    cantidad_no_nacionalizado: 1250,
    espacio_ocupado: 200.0,
    GUIA_DE_CARGA_idGuia: 1,
    GUIA_DE_CARGA_CLIENTE_idCliente: 1,
    PRODUCTO_idProducto: 1,
    PRODUCTO_BODEGA_idBodega: 1,
    producto: productos.find(p => p.idProducto === 1),
    guiaCarga: guiasCarga.find(g => g.idGuia === 1),
    bodega: bodegas.find(b => b.idBodega === 1),
    cliente: customers.find(c => c.idCliente === 1)
  },
  // Mouse Logitech - Existencia en bodega
  {
    idExistencia: 2,
    cantidad: 30,
    cantidad_nacionalizado: 20,
    cantidad_no_nacionalizado: 10,
    espacio_ocupado: 3.0,
    GUIA_DE_CARGA_idGuia: 1,
    GUIA_DE_CARGA_CLIENTE_idCliente: 1,
    PRODUCTO_idProducto: 2,
    PRODUCTO_BODEGA_idBodega: 1,
    producto: productos.find(p => p.idProducto === 2),
    guiaCarga: guiasCarga.find(g => g.idGuia === 1),
    bodega: bodegas.find(b => b.idBodega === 1),
    cliente: customers.find(c => c.idCliente === 1)
  },
  // Teclado Mecánico - Existencia en bodega
  {
    idExistencia: 3,
    cantidad: 100,
    cantidad_nacionalizado: 75,
    cantidad_no_nacionalizado: 25,
    espacio_ocupado: 20.0,
    GUIA_DE_CARGA_idGuia: 2,
    GUIA_DE_CARGA_CLIENTE_idCliente: 2,
    PRODUCTO_idProducto: 3,
    PRODUCTO_BODEGA_idBodega: 2,
    producto: productos.find(p => p.idProducto === 3),
    guiaCarga: guiasCarga.find(g => g.idGuia === 2),
    bodega: bodegas.find(b => b.idBodega === 2),
    cliente: customers.find(c => c.idCliente === 2)
  },
  // Monitor Samsung - Existencia en bodega
  {
    idExistencia: 4,
    cantidad: 25,
    cantidad_nacionalizado: 15,
    cantidad_no_nacionalizado: 10,
    espacio_ocupado: 50.0,
    GUIA_DE_CARGA_idGuia: 2,
    GUIA_DE_CARGA_CLIENTE_idCliente: 2,
    PRODUCTO_idProducto: 4,
    PRODUCTO_BODEGA_idBodega: 2,
    producto: productos.find(p => p.idProducto === 4),
    guiaCarga: guiasCarga.find(g => g.idGuia === 2),
    bodega: bodegas.find(b => b.idBodega === 2),
    cliente: customers.find(c => c.idCliente === 2)
  },
  // Producto Refrigerado - Existencia en bodega refrigerada
  {
    idExistencia: 5,
    cantidad: 200,
    cantidad_nacionalizado: 150,
    cantidad_no_nacionalizado: 50,
    espacio_ocupado: 100.0,
    GUIA_DE_CARGA_idGuia: 3,
    GUIA_DE_CARGA_CLIENTE_idCliente: 3,
    PRODUCTO_idProducto: 5,
    PRODUCTO_BODEGA_idBodega: 6,
    producto: productos.find(p => p.idProducto === 5),
    guiaCarga: guiasCarga.find(g => g.idGuia === 3),
    bodega: bodegas.find(b => b.idBodega === 6),
    cliente: customers.find(c => c.idCliente === 3)
  },
  // Producto Lácteo - Existencia en bodega refrigerada
  {
    idExistencia: 6,
    cantidad: 150,
    cantidad_nacionalizado: 100,
    cantidad_no_nacionalizado: 50,
    espacio_ocupado: 75.0,
    GUIA_DE_CARGA_idGuia: 3,
    GUIA_DE_CARGA_CLIENTE_idCliente: 3,
    PRODUCTO_idProducto: 6,
    PRODUCTO_BODEGA_idBodega: 6,
    producto: productos.find(p => p.idProducto === 6),
    guiaCarga: guiasCarga.find(g => g.idGuia === 3),
    bodega: bodegas.find(b => b.idBodega === 6),
    cliente: customers.find(c => c.idCliente === 3)
  },
  // Herramienta Industrial - Existencia en bodega industrial
  {
    idExistencia: 7,
    cantidad: 75,
    cantidad_nacionalizado: 60,
    cantidad_no_nacionalizado: 15,
    espacio_ocupado: 30.0,
    GUIA_DE_CARGA_idGuia: 4,
    GUIA_DE_CARGA_CLIENTE_idCliente: 4,
    PRODUCTO_idProducto: 7,
    PRODUCTO_BODEGA_idBodega: 4,
    producto: productos.find(p => p.idProducto === 7),
    guiaCarga: guiasCarga.find(g => g.idGuia === 4),
    bodega: bodegas.find(b => b.idBodega === 4),
    cliente: customers.find(c => c.idCliente === 4)
  },
  // Destornillador - Existencia en bodega industrial
  {
    idExistencia: 8,
    cantidad: 200,
    cantidad_nacionalizado: 180,
    cantidad_no_nacionalizado: 20,
    espacio_ocupado: 10.0,
    GUIA_DE_CARGA_idGuia: 4,
    GUIA_DE_CARGA_CLIENTE_idCliente: 4,
    PRODUCTO_idProducto: 8,
    PRODUCTO_BODEGA_idBodega: 4,
    producto: productos.find(p => p.idProducto === 8),
    guiaCarga: guiasCarga.find(g => g.idGuia === 4),
    bodega: bodegas.find(b => b.idBodega === 4),
    cliente: customers.find(c => c.idCliente === 4)
  },
  // Producto Automotriz - Existencia en bodega automotriz
  {
    idExistencia: 9,
    cantidad: 50,
    cantidad_nacionalizado: 40,
    cantidad_no_nacionalizado: 10,
    espacio_ocupado: 40.0,
    GUIA_DE_CARGA_idGuia: 5,
    GUIA_DE_CARGA_CLIENTE_idCliente: 5,
    PRODUCTO_idProducto: 9,
    PRODUCTO_BODEGA_idBodega: 5,
    producto: productos.find(p => p.idProducto === 9),
    guiaCarga: guiasCarga.find(g => g.idGuia === 5),
    bodega: bodegas.find(b => b.idBodega === 5),
    cliente: customers.find(c => c.idCliente === 5)
  },
  // Filtro de Aire - Existencia en bodega automotriz
  {
    idExistencia: 10,
    cantidad: 300,
    cantidad_nacionalizado: 250,
    cantidad_no_nacionalizado: 50,
    espacio_ocupado: 15.0,
    GUIA_DE_CARGA_idGuia: 5,
    GUIA_DE_CARGA_CLIENTE_idCliente: 5,
    PRODUCTO_idProducto: 10,
    PRODUCTO_BODEGA_idBodega: 5,
    producto: productos.find(p => p.idProducto === 10),
    guiaCarga: guiasCarga.find(g => g.idGuia === 5),
    bodega: bodegas.find(b => b.idBodega === 5),
    cliente: customers.find(c => c.idCliente === 5)
  },
  // Juguete Educativo - Existencia en bodega general
  {
    idExistencia: 11,
    cantidad: 500,
    cantidad_nacionalizado: 400,
    cantidad_no_nacionalizado: 100,
    espacio_ocupado: 60.0,
    GUIA_DE_CARGA_idGuia: 6,
    GUIA_DE_CARGA_CLIENTE_idCliente: 6,
    PRODUCTO_idProducto: 11,
    PRODUCTO_BODEGA_idBodega: 3,
    producto: productos.find(p => p.idProducto === 11),
    guiaCarga: guiasCarga.find(g => g.idGuia === 6),
    bodega: bodegas.find(b => b.idBodega === 3),
    cliente: customers.find(c => c.idCliente === 6)
  },
  // Videojuego - Existencia en bodega general
  {
    idExistencia: 12,
    cantidad: 200,
    cantidad_nacionalizado: 150,
    cantidad_no_nacionalizado: 50,
    espacio_ocupado: 20.0,
    GUIA_DE_CARGA_idGuia: 6,
    GUIA_DE_CARGA_CLIENTE_idCliente: 6,
    PRODUCTO_idProducto: 12,
    PRODUCTO_BODEGA_idBodega: 3,
    producto: productos.find(p => p.idProducto === 12),
    guiaCarga: guiasCarga.find(g => g.idGuia === 6),
    bodega: bodegas.find(b => b.idBodega === 3),
    cliente: customers.find(c => c.idCliente === 6)
  },
  // Producto Hogar - Existencia en bodega hogar
  {
    idExistencia: 13,
    cantidad: 150,
    cantidad_nacionalizado: 120,
    cantidad_no_nacionalizado: 30,
    espacio_ocupado: 45.0,
    GUIA_DE_CARGA_idGuia: 7,
    GUIA_DE_CARGA_CLIENTE_idCliente: 7,
    PRODUCTO_idProducto: 13,
    PRODUCTO_BODEGA_idBodega: 7,
    producto: productos.find(p => p.idProducto === 13),
    guiaCarga: guiasCarga.find(g => g.idGuia === 7),
    bodega: bodegas.find(b => b.idBodega === 7),
    cliente: customers.find(c => c.idCliente === 7)
  },
  // Artículo Deportivo - Existencia en bodega deportiva
  {
    idExistencia: 14,
    cantidad: 100,
    cantidad_nacionalizado: 80,
    cantidad_no_nacionalizado: 20,
    espacio_ocupado: 30.0,
    GUIA_DE_CARGA_idGuia: 8,
    GUIA_DE_CARGA_CLIENTE_idCliente: 8,
    PRODUCTO_idProducto: 15,
    PRODUCTO_BODEGA_idBodega: 2,
    producto: productos.find(p => p.idProducto === 15),
    guiaCarga: guiasCarga.find(g => g.idGuia === 8),
    bodega: bodegas.find(b => b.idBodega === 2),
    cliente: customers.find(c => c.idCliente === 8)
  }
];

export { existencias };
