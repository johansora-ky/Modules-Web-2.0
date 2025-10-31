# ⚡ Inicio Rápido - 3 Minutos

## 🎯 Lo Básico en 30 Segundos

Este módulo muestra **mapas interactivos** de Latinoamérica y Asia con marcadores clicables.

**Colores:** 🔴 Rojo (`#e60026`) para Latinoamérica | 🔵 Azul (`#004ebc`) para Asia

---

## 🚀 Ejecutar el Proyecto

```bash
# 1. Entrar al directorio
cd map-countries-svg

# 2. Instalar dependencias (si no están instaladas)
npm install

# 3. Iniciar servidor
npm run dev

# 4. Abrir en navegador
# http://localhost:5173
```

**¡Listo!** El módulo ya está funcionando. 🎉

---

## 📱 Cómo Interactuar

1. **Cambiar región**: Click en tabs "Latinoamérica" o "Asia"
2. **Ver información**: Click en cualquier marcador (📍)
3. **Cerrar modal**: Click fuera, botón "Cerrar", o tecla ESC

---

## ✏️ Editar Rápido

### Agregar un nuevo marcador

**Archivo:** `src/data/markers.ts`

```typescript
export const latinAmericaMarkers: MarkerData[] = [
  // ... marcadores existentes
  {
    name: "Venezuela",
    coordinates: [-66.9036, 10.4806], // [longitud, latitud]
    info: "Nueva Oficina",
    description: "Descripción completa aquí",
  },
];
```

### Cambiar colores

**Archivo:** `src/components/InteractiveMap.tsx`

Buscar y reemplazar:

- `#e60026` → `#TU_COLOR_ROJO`
- `#004ebc` → `#TU_COLOR_AZUL`

### Cambiar título

**Archivo:** `src/components/InteractiveMap.tsx` (línea ~55)

```tsx
<h1 className="text-4xl font-bold text-gray-900 mb-2">
  Tu Título Aquí {/* ← Cambiar esto */}
</h1>
```

---

## 📁 Archivos Importantes

```
src/
├── components/
│   ├── InteractiveMap.tsx    ← Componente principal
│   └── Modal.tsx              ← Ventana de información
└── data/
    └── markers.ts             ← EDITAR AQUÍ para agregar ubicaciones
```

---

## 🎨 Personalización Común

### 1. Agregar Europa

```typescript
// En markers.ts
export const europaMarkers: MarkerData[] = [
  {
    name: "España",
    coordinates: [-3.7038, 40.4168],
    info: "Oficina Madrid",
    description: "...",
  },
];

// En InteractiveMap.tsx
type Region = "latinamerica" | "asia" | "europa";

const geoUrls = {
  // ... existentes
  europa:
    "https://raw.githubusercontent.com/deldersveld/topojson/master/continents/europe.json",
};

// Agregar botón de tab en el JSX
```

### 2. Cambiar número de ubicaciones mostradas

Editar directamente el array en `markers.ts`:

- Agregar más objetos = más marcadores
- Quitar objetos = menos marcadores

### 3. Cambiar zoom del mapa

**Archivo:** `src/components/InteractiveMap.tsx` (línea ~28)

```typescript
const mapCenters = {
  latinamerica: { center: [-60, -15], zoom: 1.5 }, // ← Aumentar o disminuir
  asia: { center: [100, 30], zoom: 1.2 }, // ← Aumentar o disminuir
};
```

---

## 🔍 Encontrar Coordenadas

Usa [LatLong.net](https://www.latlong.net/) para obtener coordenadas de cualquier ciudad.

**Formato requerido:** `[longitud, latitud]` ← **Importante:** longitud primero!

Ejemplo:

- Lima, Perú: `-77.0428, -12.0464`
- En el código: `[-77.0428, -12.0464]`

---

## 🐛 Problemas Comunes

### El mapa no se ve

```bash
# Verificar que react-simple-maps esté instalado
npm list react-simple-maps

# Si no está, instalar
npm install react-simple-maps
```

### Los marcadores están en el lugar incorrecto

- ✅ Verificar que sea `[longitud, latitud]`
- ❌ NO usar `[latitud, longitud]`

### El modal no abre

- Revisar consola del navegador (F12)
- Verificar que el marcador tenga datos válidos

---

## 📚 Documentación Completa

- **Guía de Uso Detallada:** `USAGE_GUIDE.md`
- **Resumen de Implementación:** `IMPLEMENTATION_SUMMARY.md`
- **Estructura de Componentes:** `COMPONENT_STRUCTURE.md`
- **Documentación Técnica:** `README_MAP_MODULE.md`

---

## 🎯 Próximos Pasos

1. ✅ Ejecutar proyecto (`npm run dev`)
2. ✅ Probar interacción (tabs, markers, modal)
3. ✅ Agregar tus propios marcadores en `markers.ts`
4. ✅ Personalizar colores y textos
5. ✅ Leer documentación completa para más opciones

---

## 💡 Tips Rápidos

- **Responsive:** Ya funciona en móvil, tablet y desktop
- **Animaciones:** Suaves y automáticas, no requieren configuración
- **TypeScript:** Todo está tipado para evitar errores
- **Modular:** Fácil de integrar en proyectos existentes

---

## 🎉 ¡Eso es Todo!

Tienes un módulo de mapa **profesional y listo para usar**.

Para personalizaciones avanzadas, consulta `USAGE_GUIDE.md`.

**¡Diviértete construyendo!** 🚀
