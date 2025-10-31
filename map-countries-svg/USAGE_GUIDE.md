# 📖 Guía de Uso - Módulo de Mapa Interactivo

## 🎯 Inicio Rápido

### 1. Instalar dependencias

```bash
npm install
```

### 2. Iniciar el servidor de desarrollo

```bash
npm run dev
```

### 3. Abrir en el navegador

El servidor se iniciará en `http://localhost:5173` (o el puerto que Vite asigne)

## 🎨 Características Visuales

### Colores Principales

- **Latinoamérica**: Rojo `#e60026`
- **Asia**: Azul `#004ebc`

### Animaciones Incluidas

1. **Tabs**: Transición suave con fade (150ms)
2. **Marcadores**:
   - Efecto ping continuo (pulsación)
   - Hover con escala 1.25x
   - Animación de entrada
3. **Modal**:
   - Fade in del backdrop
   - Slide up desde abajo
   - Cierre con animación inversa

## 🗺️ Estructura de Datos

### Formato de Marcadores

```typescript
interface MarkerData {
  name: string; // Nombre del país/ciudad
  coordinates: [number, number]; // [longitud, latitud]
  info: string; // Información breve
  description?: string; // Descripción detallada (opcional)
}
```

### Ejemplo de Marcador

```typescript
{
  name: 'Colombia',
  coordinates: [-74.0721, 4.711], // [lng, lat]
  info: 'Oficina Principal',
  description: 'Nuestra sede principal en Colombia...'
}
```

## ⚙️ Configuración

### Agregar Nuevos Marcadores

Edita `src/data/markers.ts`:

```typescript
export const latinAmericaMarkers: MarkerData[] = [
  // ... marcadores existentes
  {
    name: "Ecuador",
    coordinates: [-78.4678, -0.1807],
    info: "Nueva Oficina",
    description: "Descripción completa de la ubicación",
  },
];
```

### Agregar Nueva Región

1. **Actualizar tipos en InteractiveMap.tsx**:

```typescript
type Region = "latinamerica" | "asia" | "europa"; // Agregar nueva región
```

2. **Agregar URL de TopoJSON**:

```typescript
const geoUrls = {
  latinamerica: "url...",
  asia: "url...",
  europa:
    "https://raw.githubusercontent.com/deldersveld/topojson/master/continents/europe.json",
};
```

3. **Configurar centro y zoom**:

```typescript
const mapCenters = {
  // ... existentes
  europa: { center: [15, 50] as [number, number], zoom: 1.8 },
};
```

4. **Crear array de marcadores en markers.ts**:

```typescript
export const europaMarkers: MarkerData[] = [
  // ... marcadores
];
```

5. **Importar y usar**:

```typescript
import {
  latinAmericaMarkers,
  asiaMarkers,
  europaMarkers,
} from "../data/markers";

// En el componente:
const markers =
  activeTab === "latinamerica"
    ? latinAmericaMarkers
    : activeTab === "asia"
    ? asiaMarkers
    : europaMarkers;
```

6. **Agregar botón de tab**:

```tsx
<button
  onClick={() => handleTabChange("europa")}
  className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
    activeTab === "europa"
      ? "bg-[#28a745] text-white shadow-lg"
      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
  }`}
>
  Europa
</button>
```

### Cambiar Colores

Para cambiar los colores principales, busca y reemplaza en `InteractiveMap.tsx`:

```typescript
// Rojo Latinoamérica
'#e60026' → 'TU_COLOR'

// Azul Asia
'#004ebc' → 'TU_COLOR'
```

### Personalizar Estilos del Mapa

En `InteractiveMap.tsx`, modifica los estilos de `Geography`:

```typescript
<Geography
  geography={geo}
  fill="#E8E8E8" // Color base de países
  stroke="#FFFFFF" // Color de bordes
  strokeWidth={0.5} // Grosor de bordes
  style={{
    hover: {
      fill: "#ffebee", // Color al pasar el mouse
    },
  }}
/>
```

### Personalizar Marcadores

Modifica el componente `Marker` en `InteractiveMap.tsx`:

```tsx
{/* Tamaño del círculo exterior */}
<circle r={12} /* ... */ />

{/* Tamaño del marcador principal */}
<circle r={8} /* ... */ />

{/* Tamaño del punto central */}
<circle r={3} /* ... */ />

{/* Posición y estilo del texto */}
<text
  y={-15}  // Distancia del marcador
  style={{
    fontSize: '12px',
    fontWeight: 'bold',
  }}
>
```

## 📱 Responsive Design

El módulo es responsive por defecto:

- **Mobile**: Vista en columna, tabs apilados
- **Tablet**: Layout intermedio
- **Desktop**: Vista completa con grid de 3 columnas

### Ajustar breakpoints

Usa las clases de Tailwind CSS:

```tsx
className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
```

## 🎭 Animaciones Personalizadas

### Modificar velocidad de transición

```tsx
className = "transition-opacity duration-300"; // 300ms
// Cambiar a:
className = "transition-opacity duration-500"; // 500ms
```

### Deshabilitar animaciones

```tsx
// Quitar clases de animación:
className="animate-ping"        → ""
className="animate-fade-in-up"  → ""
className="transition-all"      → ""
```

## 🔧 Solución de Problemas

### El mapa no se muestra

1. Verifica que `react-simple-maps` esté instalado:

```bash
npm list react-simple-maps
```

2. Revisa la consola del navegador para errores de red (TopoJSON)

### Los marcadores no aparecen en la posición correcta

- Verifica que las coordenadas sean `[longitud, latitud]` (no al revés)
- Ajusta el `center` y `scale` en `mapCenters`

### Las animaciones no funcionan

- Verifica que `index.css` incluya todas las animaciones
- Asegúrate de que Tailwind CSS esté configurado correctamente

### El modal no se cierra

- Verifica que el evento `onClick` del backdrop esté funcionando
- Revisa la consola para errores de JavaScript

## 📊 Ejemplos de Uso

### Ejemplo 1: Integrar en una página existente

```tsx
import InteractiveMap from "./components/InteractiveMap";

function Dashboard() {
  return (
    <div>
      <h1>Mi Dashboard</h1>
      <InteractiveMap />
    </div>
  );
}
```

### Ejemplo 2: Pasar props personalizadas

Si quieres hacer el componente más flexible:

```tsx
// Modificar InteractiveMap.tsx para aceptar props
interface InteractiveMapProps {
  defaultRegion?: Region;
  title?: string;
}

export default function InteractiveMap({
  defaultRegion = "latinamerica",
  title = "Mapa Interactivo",
}: InteractiveMapProps) {
  const [activeTab, setActiveTab] = useState<Region>(defaultRegion);
  // ...
}

// Usar en App.tsx
<InteractiveMap defaultRegion="asia" title="Nuestras Oficinas Globales" />;
```

### Ejemplo 3: Filtrar marcadores

```tsx
// Agregar estado de filtro
const [searchTerm, setSearchTerm] = useState("");

// Filtrar marcadores
const filteredMarkers = markers.filter((m) =>
  m.name.toLowerCase().includes(searchTerm.toLowerCase())
);

// Usar filteredMarkers en lugar de markers
```

## 🚀 Optimización

### Para mejorar el rendimiento:

1. **Lazy loading de mapas**:

```tsx
import { lazy, Suspense } from "react";

const InteractiveMap = lazy(() => import("./components/InteractiveMap"));

function App() {
  return (
    <Suspense fallback={<div>Cargando mapa...</div>}>
      <InteractiveMap />
    </Suspense>
  );
}
```

2. **Memoizar componentes**:

```tsx
import { memo } from 'react';

const Modal = memo(function Modal({ ... }) {
  // ...
});
```

3. **Usar useMemo para datos estáticos**:

```tsx
const markers = useMemo(
  () => (activeTab === "latinamerica" ? latinAmericaMarkers : asiaMarkers),
  [activeTab]
);
```

## 📝 Notas Importantes

1. **Coordenadas**: Siempre en formato `[longitud, latitud]`
2. **TopoJSON**: Los archivos deben ser accesibles vía HTTPS
3. **TypeScript**: El código está tipado para mayor seguridad
4. **Accesibilidad**: Los botones tienen aria-labels apropiados
5. **Keyboard**: El modal se puede cerrar con ESC

## 🎓 Recursos Adicionales

- [react-simple-maps Documentación](https://www.react-simple-maps.io/)
- [TopoJSON Collections](https://github.com/deldersveld/topojson)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Encontrar Coordenadas](https://www.latlong.net/)

---

**¿Necesitas ayuda?** Revisa el código en `src/components/InteractiveMap.tsx` y `src/components/Modal.tsx` para más detalles.
