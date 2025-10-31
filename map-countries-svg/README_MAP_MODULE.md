# 🗺️ Interactive Map Module

Módulo React interactivo que muestra mapas de Latinoamérica y Asia con marcadores clicables y modales informativos.

## 🚀 Características

- ✅ Dos mapas interactivos: Latinoamérica y Asia
- ✅ Sistema de tabs para cambiar entre regiones
- ✅ Marcadores animados con efecto hover
- ✅ Modal con información detallada al hacer clic en marcadores
- ✅ Animaciones suaves y transiciones fluidas
- ✅ Diseño responsive y moderno
- ✅ Colores corporativos: rojo #e60026 (Latinoamérica) y azul #004ebc (Asia)

## 📁 Estructura de Archivos

```
src/
├── components/
│   ├── InteractiveMap.tsx    # Componente principal del mapa
│   └── Modal.tsx              # Componente del modal informativo
├── data/
│   └── markers.ts             # Datos de marcadores (países y coordenadas)
├── App.tsx                    # Componente raíz
└── index.css                  # Estilos globales y animaciones
```

## 🎨 Componentes

### InteractiveMap

Componente principal que maneja:

- Renderizado del mapa usando `react-simple-maps`
- Sistema de tabs para cambiar entre regiones
- Gestión del estado de marcadores seleccionados
- Animaciones de transición entre tabs

### Modal

Componente reutilizable que muestra:

- Información del país/ubicación
- Descripción detallada
- Botón de cierre
- Cierre al hacer clic fuera o presionar ESC

### Markers Data

Archivo de configuración con los marcadores:

- `name`: Nombre del país/ciudad
- `coordinates`: [longitud, latitud]
- `info`: Información breve
- `description`: Descripción detallada (opcional)

## 🎯 Uso

El componente se integra automáticamente en `App.tsx`:

```tsx
import InteractiveMap from "./components/InteractiveMap";

function App() {
  return <InteractiveMap />;
}
```

## ✏️ Personalización

### Agregar nuevos marcadores

Edita `src/data/markers.ts`:

```typescript
export const latinAmericaMarkers: MarkerData[] = [
  {
    name: "País",
    coordinates: [longitud, latitud],
    info: "Descripción breve",
    description: "Descripción detallada (opcional)",
  },
  // ... más marcadores
];
```

### Cambiar colores

Los colores principales se pueden modificar en:

- `InteractiveMap.tsx`: Clases de Tailwind con colores hex
- Rojo Latinoamérica: `#e60026`
- Azul Asia: `#004ebc`

### Agregar nuevas regiones

1. Agrega la URL del TopoJSON en `geoUrls`
2. Define el centro y zoom en `mapCenters`
3. Crea un array de marcadores en `markers.ts`
4. Agrega el botón del tab en el componente

## 🌐 URLs de TopoJSON

Actualmente usa:

- Latinoamérica: South America TopoJSON
- Asia: Asia TopoJSON

Fuente: [topojson by deldersveld](https://github.com/deldersveld/topojson)

## 🎭 Animaciones

- **Tabs**: Fade in/out al cambiar de región
- **Marcadores**: Efecto ping continuo + hover con escala
- **Modal**: Fade in con slide up desde abajo
- **Backdrop**: Fade in suave

## 📱 Responsive Design

El módulo es completamente responsive:

- Layout adaptable a móviles, tablets y desktop
- Mapa escalable según el viewport
- Botones y modales optimizados para touch

## 🛠️ Tecnologías

- **React 19** con Functional Components y Hooks
- **react-simple-maps** para renderizado de mapas
- **Tailwind CSS** para estilos
- **lucide-react** para iconos
- **TypeScript** para type safety

## 📦 Dependencias

```json
{
  "react-simple-maps": "^3.0.0",
  "lucide-react": "^0.548.0",
  "tailwindcss": "^4.1.16"
}
```

## 🚀 Desarrollo

```bash
# Instalar dependencias (si no están instaladas)
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build
```

## 💡 Notas Técnicas

- Los mapas usan proyección Mercator
- Las coordenadas son [longitud, latitud] (no latitud, longitud)
- ZoomableGroup permite zoom y pan en los mapas
- El modal usa portal pattern para renderizado fuera del DOM tree principal
- Animaciones CSS personalizadas definidas en `index.css`

## 🎓 Mejoras Futuras

- [ ] Agregar zoom controls
- [ ] Implementar búsqueda de ubicaciones
- [ ] Agregar tooltips al hover sobre marcadores
- [ ] Soporte para más regiones (Europa, África, etc.)
- [ ] Modo oscuro
- [ ] Exportar vista del mapa como imagen

---

**Creado con React + react-simple-maps + Tailwind CSS** ❤️
