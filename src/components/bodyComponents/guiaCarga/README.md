# Sistema de Gestión de Unidades de Carga

## Descripción

Este sistema permite gestionar las unidades de carga dentro de las guías de carga de manera individual, con la capacidad de agregar, editar y eliminar unidades de carga una por una.

## Características Principales

### 1. Gestión Individual de Unidades de Carga
- **Agregar unidades**: Se pueden agregar unidades de carga una por una durante la creación o edición de una guía de carga
- **Editar unidades**: Cada unidad de carga puede ser editada individualmente
- **Eliminar unidades**: Se pueden eliminar unidades de carga específicas

### 2. Campos de Unidades de Carga
Cada unidad de carga incluye los siguientes campos:
- **ID único**: Generado automáticamente con formato "UC-XXX" (ej: UC-001, UC-002)
- **Tipo de unidad**: Pallet, Caja, Contenedor, Contenedor Refrigerado, Saco, Tambor, Bidón, Otro
- **Peso bruto**: Peso en kilogramos
- **Descripción**: Descripción detallada del contenido
- **Relación con guía**: Cada unidad está asociada a una guía de carga específica

### 3. Cálculos Automáticos
- **Número de unidades de carga**: Se calcula automáticamente basado en las unidades agregadas
- **Peso total**: Se calcula automáticamente sumando el peso de todas las unidades
- **Resumen por tipo**: Muestra estadísticas de los tipos de unidades agregadas

## Componentes Principales

### UnidadCargaForm.jsx
Formulario para crear y editar unidades de carga individuales.

**Funcionalidades:**
- Generación automática de IDs únicos
- Validación de campos requeridos
- Opciones para editar y eliminar unidades existentes

### UnidadesCargaList.jsx
Componente que muestra la lista de unidades de carga dentro del formulario de guías de carga.

**Funcionalidades:**
- Tabla con todas las unidades de carga
- Botones para agregar, editar y eliminar
- Resumen de estadísticas
- Cálculo automático de peso total

### GuiaCargaForm.jsx
Formulario principal de guías de carga que integra el sistema de unidades de carga.

**Funcionalidades:**
- Sección dedicada a la gestión de unidades de carga
- Cálculos automáticos de unidades y peso total
- Validación que requiere al menos una unidad de carga

## Flujo de Trabajo

1. **Crear nueva guía de carga**:
   - Llenar información básica de la guía
   - Agregar unidades de carga una por una
   - Los cálculos se actualizan automáticamente
   - Guardar la guía completa

2. **Editar guía existente**:
   - Modificar información básica si es necesario
   - Agregar, editar o eliminar unidades de carga
   - Los cambios se reflejan inmediatamente en los cálculos

3. **Ver unidades de carga**:
   - Desde la lista de guías, hacer clic en "Unidades"
   - Ver todas las unidades asociadas a esa guía
   - Opción para ver productos específicos de cada unidad

## Estructura de Datos

### Unidad de Carga
```javascript
{
  idUnidad: "UC-001",           // ID único generado automáticamente
  tipo_unidad: "Pallet",        // Tipo de unidad de carga
  peso_bruto: "7.5",           // Peso en kilogramos
  descripcion: "Descripción...", // Descripción del contenido
  GUIA_DE_CARGA_idGuia: 1      // ID de la guía asociada
}
```

### Guía de Carga
```javascript
{
  idGuia: 1,
  factura_comercial: "FC-2024-001",
  // ... otros campos de la guía
  unidadesCarga: [              // Array de unidades de carga
    { /* unidad 1 */ },
    { /* unidad 2 */ }
  ]
}
```

## Validaciones

- **Campos requeridos**: Tipo de unidad, peso bruto, descripción
- **Peso válido**: Debe ser un número mayor a 0
- **Al menos una unidad**: Cada guía debe tener al menos una unidad de carga
- **ID único**: Los IDs se generan automáticamente para evitar duplicados

## Beneficios

1. **Flexibilidad**: Permite agregar unidades de carga de diferentes tipos
2. **Precisión**: Cálculos automáticos basados en datos reales
3. **Trazabilidad**: Cada unidad tiene un ID único para seguimiento
4. **Usabilidad**: Interfaz intuitiva para gestión individual
5. **Escalabilidad**: Sistema preparado para manejar múltiples tipos de unidades
