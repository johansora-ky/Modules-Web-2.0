"use client";

import { useState } from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
} from "react-simple-maps";
import { X } from "lucide-react";
import "../styles/map-countries-svg.css";

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
        name: "China",
        coordinates: [104.1954, 35.8617],
        description:
            "Potencia económica global con rápida innovación en tecnología financiera.",
        flag: "https://flagcdn.com/48x36/cn.png",
    },
];

// URL del mundo completo (funciona según documentación oficial)
const geoUrl =
    "https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-50m.json";

// Nombres de países según world-atlas dataset
const highlightedCountries = [
    "China",
];

interface InteractiveMapsAsiaProps {
    hideHeader?: boolean;
}

export default function InteractiveMapsAsia({ hideHeader = false }: InteractiveMapsAsiaProps) {
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(
        null
    );

    return (
        <div id="container_map-countries-svg" className={hideHeader ? "hide-header" : "show-header"}>
            {/* Header */}
            {!hideHeader && (
                <div id="header_map-countries-svg">
                    <h1 id="header-title_map-countries-svg">
                        Nuestra Presencia en Asia
                    </h1>
                    <p id="header-description_map-countries-svg">
                        Descubre nuestras operaciones en mercados clave de Asia
                    </p>
                </div>
            )}

            {/* Map Container */}
            <div id="map-container_map-countries-svg">
                <div id="map-wrapper_map-countries-svg">
                    <ComposableMap
                        projection="geoMercator"
                        projectionConfig={{
                            center: [104, 30],
                            scale: 800,
                        }}
                        id="map_composable_asia_map-countries-svg"
                    >
                        <defs>
                            <linearGradient id="countryGradientAsia" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.6" />
                                <stop offset="100%" stopColor="#004ebc" stopOpacity="0.8" />
                            </linearGradient>
                            <linearGradient id="countryGradientHoverAsia" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#004ebc" stopOpacity="1" />
                            </linearGradient>
                            <radialGradient id="markerGradientAsia" cx="50%" cy="50%">
                                <stop offset="0%" stopColor="#ff6b6b" />
                                <stop offset="100%" stopColor="#e60026" />
                            </radialGradient>
                            <filter id="markerShadowAsia">
                                <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
                                <feOffset dx="0" dy="2" result="offsetblur" />
                                <feComponentTransfer>
                                    <feFuncA type="linear" slope="0.3" />
                                </feComponentTransfer>
                                <feMerge>
                                    <feMergeNode />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
                        <Geographies geography={geoUrl}>
                            {({ geographies }) => {
                                return geographies.map((geo) => {
                                    const isHighlighted = highlightedCountries.includes(
                                        geo.properties.name
                                    );

                                    const geographyContent = (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            fill={isHighlighted ? "url(#countryGradientAsia)" : "#D1D5DB"}
                                            fillOpacity={isHighlighted ? 1 : 0.5}
                                            stroke={isHighlighted ? "#004ebc" : "#9CA3AF"}
                                            strokeWidth={isHighlighted ? 1.5 : 0.5}
                                            strokeOpacity={isHighlighted ? 0.8 : 0.4}
                                            style={{
                                                default: { outline: "none" },
                                                hover: {
                                                    outline: "none",
                                                    fill: isHighlighted ? "url(#countryGradientHoverAsia)" : "#D1D5DB",
                                                    fillOpacity: isHighlighted ? 1 : 0.6,
                                                },
                                                pressed: { outline: "none" },
                                            }}
                                        />
                                    );

                                    if (isHighlighted) {
                                        return (
                                            <g
                                                key={geo.rsmKey}
                                                className="country-hover-scale_map-countries-svg"
                                                style={{ transformOrigin: "center" }}
                                            >
                                                {geographyContent}
                                            </g>
                                        );
                                    }

                                    return geographyContent;
                                });
                            }}
                        </Geographies>
                        {locations.map((location) => (
                            <Marker key={location.name} coordinates={location.coordinates}>
                                <g
                                    onClick={() => setSelectedLocation(location)}
                                    className="cursor-pointer_map-countries-svg marker-group_map-countries-svg"
                                    style={{ transformOrigin: "center bottom" }}
                                >
                                    {/* Static outer glow */}
                                    <circle
                                        r={9}
                                        fill="#e60026"
                                        opacity="0.15"
                                    />
                                    {/* Pin shape - top circle with subtle pulse */}
                                    <circle
                                        cy={-12}
                                        r={8}
                                        fill="url(#markerGradientAsia)"
                                        stroke="white"
                                        strokeWidth={2}
                                        filter="url(#markerShadowAsia)"
                                        className="animate-subtle-pulse_map-countries-svg"
                                    />
                                    {/* Inner highlight on pin */}
                                    <circle
                                        cy={-12}
                                        r={4}
                                        fill="white"
                                        opacity="0.3"
                                    />
                                    {/* Pin point - triangle */}
                                    <path
                                        d="M -6 0 L 0 8 L 6 0 Z"
                                        fill="#e60026"
                                        stroke="white"
                                        strokeWidth={1.5}
                                        filter="url(#markerShadowAsia)"
                                    />
                                    {/* Flag with bounce animation - no background */}
                                    <g className="animate-bounce-flag_map-countries-svg">
                                        <image
                                            href={location.flag}
                                            x={-16}
                                            y={-44}
                                            width={32}
                                            height={24}
                                            style={{ pointerEvents: "none" }}
                                        />
                                    </g>
                                </g>
                            </Marker>
                        ))}
                    </ComposableMap>
                </div>
            </div>

            {/* Modal */}
            {selectedLocation && (
                <div
                    id="modal-backdrop_asia_map-countries-svg"
                    className="animate-fade-in_map-countries-svg"
                    onClick={() => setSelectedLocation(null)}
                >
                    <div
                        id="modal-content_asia_map-countries-svg"
                        className="animate-scale-in_map-countries-svg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div id="modal-header_asia_map-countries-svg" className="modal-header_map-countries-svg">
                            <div id="modal-header-content_asia_map-countries-svg" className="modal-header-content_map-countries-svg">
                                <div id="modal-header-left_asia_map-countries-svg" className="modal-header-left_map-countries-svg">
                                    <img
                                        src={selectedLocation.flag}
                                        alt={`Flag of ${selectedLocation.name}`}
                                        id="modal-flag_asia_map-countries-svg"
                                        className="modal-flag_map-countries-svg"
                                    />
                                    <h2 id="modal-title_asia_map-countries-svg" className="modal-title_map-countries-svg">
                                        {selectedLocation.name}
                                    </h2>
                                </div>
                                <button
                                    id="modal-close-button_asia_map-countries-svg"
                                    className="modal-close-button_map-countries-svg"
                                    onClick={() => setSelectedLocation(null)}
                                    aria-label="Cerrar modal"
                                >
                                    <X id="modal-close-icon_asia_map-countries-svg" className="modal-close-icon_map-countries-svg" />
                                </button>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div id="modal-body_asia_map-countries-svg" className="modal-body_map-countries-svg">
                            {selectedLocation.imageUrl && (
                                <img
                                    src={selectedLocation.imageUrl || "/placeholder.svg"}
                                    alt={selectedLocation.name}
                                    id="modal-image_asia_map-countries-svg"
                                    className="modal-image_map-countries-svg"
                                />
                            )}
                            {selectedLocation.link && (
                                <a
                                    href={selectedLocation.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    id="modal-link_asia_map-countries-svg"
                                    className="modal-link_map-countries-svg"
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

