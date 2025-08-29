import { categorias } from "../categoria/Categorias";
import { bodegas } from "./Bodegas";
import { unidadesCarga } from "../guiaCarga/UnidadesCarga";

export const productos = [
  {
    idProducto: 1,
    nombre: "Laptop HP Pavilion",
    referencia: "HP-PAV-001",
    descripcion: "Laptop HP Pavilion 15.6 pulgadas, Intel i5, 8GB RAM, 512GB SSD",
    peso: 2.5,
    precio: 899.99, // Precio en USD
    estado: "NACIONALIZADO",
    categoria: categorias.find(c => c.idCategoria === 1),
    bodega: bodegas.find(b => b.idBodega === 1),
    UNIDAD_DE_CARGA_idUnidad: 1,
    cantidad: 8, // Coincide con existencia: 8 unidades
    cantidad_nacionalizado: 8,
    cantidad_no_nacionalizado: 0
  },
  {
    idProducto: 2,
    nombre: "Mouse Logitech G502",
    referencia: "LOG-MOU-002",
    descripcion: "Mouse gaming Logitech G502 HERO con sensor de 25,600 DPI",
    peso: 0.121,
    precio: 49.99, // Precio en USD
    estado: "NACIONALIZADO",
    categoria: categorias.find(c => c.idCategoria === 1),
    bodega: bodegas.find(b => b.idBodega === 1),
    UNIDAD_DE_CARGA_idUnidad: 2,
    cantidad: 12, // Coincide con existencia: 12 unidades
    cantidad_nacionalizado: 12,
    cantidad_no_nacionalizado: 0
  },
  {
    idProducto: 3,
    nombre: "Destornillador Phillips",
    referencia: "DES-PHI-003",
    descripcion: "Destornillador Phillips profesional, mango ergonómico",
    peso: 0.3,
    precio: 12.50, // Precio en USD
    estado: "NACIONALIZADO",
    categoria: categorias.find(c => c.idCategoria === 2),
    bodega: bodegas.find(b => b.idBodega === 3),
    UNIDAD_DE_CARGA_idUnidad: 3,
    cantidad: 15, // Coincide con existencia: 15 unidades
    cantidad_nacionalizado: 15,
    cantidad_no_nacionalizado: 0
  },
  {
    idProducto: 4,
    nombre: "Café Colombiano Premium",
    referencia: "CAF-PRE-004",
    descripcion: "Café colombiano premium, grano entero, 1kg",
    peso: 1.0,
    precio: 24.99, // Precio en USD
    estado: "NACIONALIZADO",
    categoria: categorias.find(c => c.idCategoria === 3),
    bodega: bodegas.find(b => b.idBodega === 4),
    UNIDAD_DE_CARGA_idUnidad: 4,
    cantidad: 20, // Coincide con existencia: 20 unidades
    cantidad_nacionalizado: 20,
    cantidad_no_nacionalizado: 0
  },
  {
    idProducto: 5,
    nombre: "Camisetas Algodón Orgánico",
    referencia: "CAM-ALG-005",
    descripcion: "Camisetas de algodón orgánico, tallas S-XXL, varios colores",
    peso: 0.2,
    precio: 18.99, // Precio en USD
    estado: "NACIONALIZADO",
    categoria: categorias.find(c => c.idCategoria === 4),
    bodega: bodegas.find(b => b.idBodega === 5),
    UNIDAD_DE_CARGA_idUnidad: 5,
    cantidad: 25, // Coincide con existencia: 25 unidades
    cantidad_nacionalizado: 25,
    cantidad_no_nacionalizado: 0
  },
  {
    idProducto: 6,
    nombre: "Aceite de Oliva Extra Virgen",
    referencia: "ACE-OLI-006",
    descripcion: "Aceite de oliva extra virgen, 500ml, importado de España",
    peso: 0.5,
    precio: 15.99, // Precio en USD
    estado: "NO NACIONALIZADO",
    categoria: categorias.find(c => c.idCategoria === 3),
    bodega: bodegas.find(b => b.idBodega === 4),
    UNIDAD_DE_CARGA_idUnidad: 6,
    cantidad: 18, // Coincide con existencia: 18 unidades
    cantidad_nacionalizado: 0,
    cantidad_no_nacionalizado: 18
  },
  {
    idProducto: 7,
    nombre: "Smartphone Samsung Galaxy",
    referencia: "SAM-GAL-007",
    descripcion: "Smartphone Samsung Galaxy S23, 128GB, importado de Corea",
    peso: 0.2,
    precio: 699.99, // Precio en USD
    estado: "NO NACIONALIZADO",
    categoria: categorias.find(c => c.idCategoria === 1),
    bodega: bodegas.find(b => b.idBodega === 1),
    UNIDAD_DE_CARGA_idUnidad: 7,
    cantidad: 10, // Coincide con existencia: 10 unidades
    cantidad_nacionalizado: 0,
    cantidad_no_nacionalizado: 10
  }
];
