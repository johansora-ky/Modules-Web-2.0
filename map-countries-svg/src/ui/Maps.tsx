"use client";

import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { X } from "lucide-react";

interface Location {
  name: string;
  coordinates: [number, number];
  description: string;
  imageUrl?: string;
  link?: string;
  flag: string;
}

const locations: Location[] = [
  {
    name: "Colombia",
    coordinates: [-74.2973, 4.5709],
    description:
      "Economía emergente con fuerte sector tecnológico y financiero en expansión.",
    imageUrl: "/bogota-colombia-skyline.jpg",
    flag: "🇨🇴",
  },
  {
    name: "Estados Unidos",
    coordinates: [-95.7129, 37.0902],
    description:
      "La economía más grande del mundo con un sector financiero altamente desarrollado.",
    flag: "🇺🇸",
  },
  {
    name: "Nicaragua",
    coordinates: [-85.2072, 12.8654],
    description:
      "Mercado en crecimiento con oportunidades en servicios financieros.",
    flag: "🇳🇮",
  },
  {
    name: "Panamá",
    coordinates: [-80.7821, 8.538],
    description:
      "Centro financiero internacional y hub logístico de las Américas.",
    flag: "🇵🇦",
  },
  {
    name: "Costa Rica",
    coordinates: [-84.0907, 9.7489],
    description:
      "Economía estable con alto desarrollo en tecnología y servicios.",
    flag: "🇨🇷",
  },
  {
    name: "China",
    coordinates: [104.1954, 35.8617],
    description:
      "Potencia económica global con rápida innovación en tecnología financiera.",
    flag: "🇨🇳",
  },
];

// URL del mundo completo (funciona según documentación oficial)
const geoUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-50m.json";

// Nombres de países según world-atlas dataset
const highlightedCountries = [
  "Colombia",
  "United States of America", // EEUU en world-atlas
  "Nicaragua",
  "Panama", // world-atlas usa "Panama" sin tilde
  "Costa Rica",
];

export default function InteractiveMaps() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Nuestra Presencia Global
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Descubre nuestras operaciones en mercados clave alrededor del mundo
        </p>
      </div>

      {/* Map Container */}
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <div className="relative w-full" style={{ height: "80dvh" }}>
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              center: [-95, 20],
              scale: 800,
            }}
            className="w-full h-full"
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) => {
                // Console log para ver los nombres de los países en consola
                // geographies.forEach(geo => console.log(geo.properties.name));

                return geographies.map((geo) => {
                  const isHighlighted = highlightedCountries.includes(
                    geo.properties.name
                  );

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={isHighlighted ? "#004ebc" : "#D1D5DB"}
                      fillOpacity={isHighlighted ? 0.4 : 0.5}
                      stroke={isHighlighted ? "#004ebc" : "#9CA3AF"}
                      strokeWidth={isHighlighted ? 1.5 : 0.5}
                      strokeOpacity={isHighlighted ? 0.6 : 0.4}
                      style={{
                        default: { outline: "none" },
                        hover: {
                          outline: "none",
                          fill: isHighlighted ? "#004ebc" : "#D1D5DB",
                          fillOpacity: isHighlighted ? 0.6 : 0.6,
                        },
                        pressed: { outline: "none" },
                      }}
                    />
                  );
                });
              }}
            </Geographies>
            {locations.map((location) => (
              <Marker key={location.name} coordinates={location.coordinates}>
                <g
                  onClick={() => setSelectedLocation(location)}
                  className="cursor-pointer"
                  style={{ transformOrigin: "center" }}
                >
                  <circle
                    r={8}
                    fill="#e60026"
                    stroke="white"
                    strokeWidth={2}
                    className="animate-pulse"
                  />
                  <circle r={12} fill="#e60026" fillOpacity={0.2} />
                  <text
                    textAnchor="middle"
                    y={-18}
                    style={{ fontSize: "20px", pointerEvents: "none" }}
                  >
                    {location.flag}
                  </text>
                </g>
              </Marker>
            ))}
          </ComposableMap>
        </div>
      </div>

      {/* Modal */}
      {selectedLocation && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in"
          onClick={() => setSelectedLocation(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 text-white bg-[#e60026]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{selectedLocation.flag}</span>
                  <h2 className="text-2xl font-bold">
                    {selectedLocation.name}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedLocation(null)}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Cerrar modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {selectedLocation.imageUrl && (
                <img
                  src={selectedLocation.imageUrl || "/placeholder.svg"}
                  alt={selectedLocation.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <p className="text-gray-700 leading-relaxed mb-4">
                {selectedLocation.description}
              </p>
              {selectedLocation.link && (
                <a
                  href={selectedLocation.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 rounded-lg text-white font-semibold transition-all hover:shadow-lg bg-[#e60026] hover:bg-[#cc0022]"
                >
                  Más información
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
