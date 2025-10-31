# 🏗️ Estructura de Componentes

## Vista General

```
┌─────────────────────────────────────────────────────────┐
│                   InteractiveMap                        │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │           Header                                │    │
│  │  "Mapa Interactivo"                            │    │
│  │  "Explora nuestras ubicaciones..."             │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  ┌──────────────────┐  ┌──────────────────┐           │
│  │  Latinoamérica   │  │      Asia        │  ← Tabs   │
│  │    (Rojo)        │  │     (Azul)       │           │
│  └──────────────────┘  └──────────────────┘           │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │         Map Container (white box)              │    │
│  │                                                 │    │
│  │  ┌─────────────────────────────────────────┐  │    │
│  │  │      ComposableMap                      │  │    │
│  │  │                                          │  │    │
│  │  │    ┌──────────────────────┐            │  │    │
│  │  │    │   Geographies        │            │  │    │
│  │  │    │   (Países en gris)   │            │  │    │
│  │  │    └──────────────────────┘            │  │    │
│  │  │                                          │  │    │
│  │  │    📍 Marker 1 (con ping)               │  │    │
│  │  │    📍 Marker 2 (con ping)               │  │    │
│  │  │    📍 Marker 3 (con ping)               │  │    │
│  │  │                                          │  │    │
│  │  └─────────────────────────────────────────┘  │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐         │
│  │    6     │  │    2     │  │  🔴 Haz clic │  ← Info │
│  │ Ubicacio.│  │ Regiones │  │  en marcador │         │
│  └──────────┘  └──────────┘  └──────────────┘         │
└─────────────────────────────────────────────────────────┘

                        ↓ Click en marcador

┌─────────────────────────────────────────────────────────┐
│               Modal (overlay + card)                    │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │  🔴 Colombia                              ✕    │    │ ← Header (color)
│  ├────────────────────────────────────────────────┤    │
│  │                                                 │    │
│  │  Información:                                  │    │
│  │  Oficina Principal                             │    │
│  │                                                 │    │
│  │  Descripción:                                  │    │
│  │  Nuestra sede principal en Colombia...        │    │
│  │                                                 │    │
│  │  🔴 Ubicación activa                          │    │
│  │                                                 │    │
│  ├────────────────────────────────────────────────┤    │
│  │                              [ Cerrar ]        │    │ ← Footer
│  └────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

---

## 📁 Árbol de Archivos

```
map-countries-svg/
├── src/
│   ├── components/
│   │   ├── InteractiveMap.tsx    ← Componente principal
│   │   ├── Modal.tsx              ← Modal informativo
│   │   └── LoadingSpinner.tsx     ← Spinner de carga
│   │
│   ├── data/
│   │   └── markers.ts             ← Arrays de ubicaciones
│   │
│   ├── App.tsx                    ← Punto de entrada
│   ├── App.css                    ← Estilos custom
│   ├── index.css                  ← Animaciones
│   └── main.tsx                   ← Bootstrap React
│
├── public/                        ← Assets públicos
│
├── README_MAP_MODULE.md           ← Docs técnicas
├── USAGE_GUIDE.md                 ← Guía de uso
├── IMPLEMENTATION_SUMMARY.md      ← Resumen
├── COMPONENT_STRUCTURE.md         ← Este archivo
│
├── package.json                   ← Dependencias
├── vite.config.ts                 ← Config Vite
└── tsconfig.json                  ← Config TypeScript
```

---

## 🔄 Flujo de Datos

```
┌──────────────────────────────────────────────────────────┐
│                    User Interaction                      │
└──────────────────────────────────────────────────────────┘
                           ↓

┌──────────────────────────────────────────────────────────┐
│            1. Click en Tab "Asia"                        │
│               handleTabChange('asia')                    │
└──────────────────────────────────────────────────────────┘
                           ↓
┌──────────────────────────────────────────────────────────┐
│         2. Estado actualizado                            │
│            - setActiveTab('asia')                        │
│            - setIsAnimating(true)                        │
│            - setIsLoading(true)                          │
└──────────────────────────────────────────────────────────┘
                           ↓
┌──────────────────────────────────────────────────────────┐
│         3. UI responde                                   │
│            - Fade out del mapa actual                    │
│            - Muestra LoadingSpinner azul                 │
└──────────────────────────────────────────────────────────┘
                           ↓
┌──────────────────────────────────────────────────────────┐
│         4. Después de 150ms                              │
│            - Cambia región a 'asia'                      │
│            - Carga nuevos markers (asiaMarkers)          │
│            - Actualiza geoUrl y mapCenter                │
└──────────────────────────────────────────────────────────┘
                           ↓
┌──────────────────────────────────────────────────────────┐
│         5. Después de 500ms adicionales                  │
│            - setIsLoading(false)                         │
│            - Fade in del nuevo mapa                      │
│            - Renderiza markers de Asia                   │
└──────────────────────────────────────────────────────────┘
                           ↓
┌──────────────────────────────────────────────────────────┐
│         6. Click en Marker "Japón"                       │
│            setSelectedMarker(japonMarker)                │
└──────────────────────────────────────────────────────────┘
                           ↓
┌──────────────────────────────────────────────────────────┐
│         7. Modal se abre                                 │
│            - Renderiza Modal component                   │
│            - Muestra info de Japón                       │
│            - Color azul #004ebc                          │
│            - Bloquea scroll del body                     │
└──────────────────────────────────────────────────────────┘
                           ↓
┌──────────────────────────────────────────────────────────┐
│         8. Usuario cierra modal                          │
│            - Click fuera / botón / ESC                   │
│            - setSelectedMarker(null)                     │
│            - Restaura scroll del body                    │
└──────────────────────────────────────────────────────────┘
```

---

## 🎨 Jerarquía de Componentes

```
App
 └── InteractiveMap
      ├── Header (JSX inline)
      ├── Tabs (JSX inline)
      │    ├── Button Latinoamérica
      │    └── Button Asia
      ├── MapContainer (JSX inline)
      │    └── ComposableMap (react-simple-maps)
      │         ├── ZoomableGroup
      │         │    ├── Geographies
      │         │    │    └── Geography (x N países)
      │         │    └── Markers
      │         │         └── Marker (x N ubicaciones)
      │         │              ├── Circle (ping animation)
      │         │              ├── Circle (main marker)
      │         │              ├── Circle (center dot)
      │         │              └── Text (label)
      │         │
      │         └── LoadingSpinner (condicional)
      │
      ├── InfoCards (JSX inline)
      │    ├── Card 1 (ubicaciones activas)
      │    ├── Card 2 (regiones)
      │    └── Card 3 (instrucción)
      │
      └── Modal (condicional)
           ├── Backdrop (click listener)
           └── Card
                ├── Header (color dinámico)
                ├── Content (info + description)
                └── Footer (botón cerrar)
```

---

## 📊 Estado del Componente

```typescript
// InteractiveMap.tsx

// Estados principales
const [activeTab, setActiveTab] = useState<Region>("latinamerica");
// Valores posibles: 'latinamerica' | 'asia'
// Controla qué región mostrar

const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
// null = modal cerrado
// MarkerData = modal abierto con info del marker

const [isAnimating, setIsAnimating] = useState(false);
// true = en transición entre tabs
// false = mapa visible y estable

const [isLoading, setIsLoading] = useState(false);
// true = mostrar LoadingSpinner
// false = mostrar mapa completo
```

---

## 🎭 Props de Componentes

### InteractiveMap

```typescript
// Sin props (componente standalone)
// Puede extenderse para aceptar:
// - defaultRegion?: Region
// - title?: string
// - customMarkers?: Record<Region, MarkerData[]>
```

### Modal

```typescript
interface ModalProps {
  isOpen: boolean; // Controla visibilidad
  onClose: () => void; // Callback para cerrar
  marker: {
    // Datos del marcador
    name: string;
    info: string;
    description?: string;
  };
  color: string; // Color del header (#e60026 o #004ebc)
}
```

### LoadingSpinner

```typescript
interface LoadingSpinnerProps {
  color?: string; // Color del spinner (default: #e60026)
}
```

---

## 🔄 Ciclo de Vida

```
1. Mount
   └── InteractiveMap se monta
       └── activeTab = 'latinamerica' (default)
       └── Carga latinAmericaMarkers
       └── Renderiza mapa de Sudamérica

2. User clicks "Asia" tab
   └── handleTabChange('asia')
       └── isAnimating = true (fade out)
       └── isLoading = true
       └── Después de 150ms:
           └── activeTab = 'asia'
           └── Cambia a asiaMarkers
           └── Cambia geoUrl y mapCenter
       └── Después de 500ms:
           └── isLoading = false (fade in)

3. User clicks marker "Japón"
   └── setSelectedMarker(japonData)
       └── Modal se renderiza
       └── Body scroll bloqueado
       └── Backdrop visible

4. User closes modal
   └── setSelectedMarker(null)
       └── Modal unmount
       └── Body scroll restaurado

5. Unmount
   └── Cleanup de event listeners
   └── Restauración de scroll
```

---

## 🎨 Estilos y Clases

### Tailwind Classes Principales

```css
/* Layout */
min-h-screen bg-gray-50 py-8 px-4
max-w-7xl mx-auto

/* Tabs */
px-8 py-3 rounded-lg font-semibold
transition-all duration-300 transform hover:scale-105

/* Map Container */
bg-white rounded-2xl shadow-xl p-6
transition-opacity duration-300

/* Info Cards */
grid grid-cols-1 md:grid-cols-3 gap-4
bg-white rounded-lg shadow p-4

/* Modal */
fixed inset-0 z-50 flex items-center justify-center
bg-black bg-opacity-50
```

### Custom CSS Classes

```css
/* App.css */
.marker-group:hover circle:nth-child(2) {
  transform: scale(1.25);
  transition: transform 0.3s ease;
}

/* index.css */
.animate-ping {
  ...;
}
.animate-fade-in {
  ...;
}
.animate-fade-in-up {
  ...;
}
.animate-pulse {
  ...;
}
```

---

## 🔧 Configuración

### TopoJSON URLs

```typescript
const geoUrls = {
  latinamerica: "https://raw.githubusercontent.com/.../south-america.json",
  asia: "https://raw.githubusercontent.com/.../asia.json",
};
```

### Map Centers

```typescript
const mapCenters = {
  latinamerica: {
    center: [-60, -15] as [number, number], // [lng, lat]
    zoom: 1.5,
  },
  asia: {
    center: [100, 30] as [number, number],
    zoom: 1.2,
  },
};
```

### Colors

```typescript
// Latinoamérica
"#e60026"; // Rojo

// Asia
"#004ebc"; // Azul

// UI
"#E8E8E8"; // Países (gris claro)
"#FFFFFF"; // Bordes (blanco)
"#374151"; // Texto (gris oscuro)
```

---

## 📝 Tipos TypeScript

```typescript
type Region = "latinamerica" | "asia";

interface MarkerData {
  name: string;
  coordinates: [number, number];
  info: string;
  description?: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  marker: {
    name: string;
    info: string;
    description?: string;
  };
  color: string;
}

interface LoadingSpinnerProps {
  color?: string;
}
```

---

## 🚀 Performance

### Optimizaciones Aplicadas

- ✅ Animaciones CSS (GPU accelerated)
- ✅ Transiciones optimizadas (opacity, transform)
- ✅ Estado mínimo y localizado
- ✅ Event listeners limpios en unmount
- ✅ SVG maps (vector, escalable)
- ✅ Lazy rendering de modales

### Posibles Mejoras Futuras

- [ ] React.memo en componentes hijos
- [ ] useMemo para cálculos pesados
- [ ] useCallback para handlers
- [ ] Code splitting del mapa
- [ ] Lazy loading de TopoJSON
- [ ] Virtual scrolling para muchos markers

---

Esta documentación te ayudará a entender la estructura completa del módulo y cómo todos los componentes trabajan juntos. 🎉
