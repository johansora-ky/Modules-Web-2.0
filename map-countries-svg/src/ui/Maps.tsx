"use client";

import { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { X } from "lucide-react";
import { useIsMobile } from "../hooks/useIsMobile";
import "../styles/map-countries-svg.css";

interface Location {
  name: string;
  nameInWorldAtlas: string;
  coordinates: [number, number];
  description: string;
  imageUrlDesktop?: string;
  imageUrlMobile?: string;
  link?: string;
  flag: string;
}

const locations: Location[] = [
  {
    name: "Colombia",
    nameInWorldAtlas: "Colombia",
    coordinates: [-74.2973, 4.5709],
    description:
      "Economía emergente con fuerte sector tecnológico y financiero en expansión.",
    imageUrlDesktop:
      "https://www-krediya-com.sandbox.hs-sites.com/hs-fs/hubfs/82c57f2a9c2fcb5eb1c8d115f1fd3e7402d25d9b-1.png?width=1920&name=82c57f2a9c2fcb5eb1c8d115f1fd3e7402d25d9b-1.png",
    imageUrlMobile:
      "https://www-krediya-com.sandbox.hs-sites.com/hs-fs/hubfs/23e9bb4541260ea22a16175d73515b34c8a9a2a6.png?width=1080&name=23e9bb4541260ea22a16175d73515b34c8a9a2a6.png",
    flag: "//app.hubspot.com/api/filemanager/api/v3/files/thumbnail-redirect/200084837775?size=thumb&portalId=22317019&errorOnPlaceholder=true&t=1763475830272&hs_static_app=FileManagerDashboard&hs_static_app_version=static-1.37748",
  },
  {
    name: "Estados Unidos",
    nameInWorldAtlas: "United States of America",
    coordinates: [-95.7129, 37.0902],
    description:
      "La economía más grande del mundo con un sector financiero altamente desarrollado.",
    flag: "//app.hubspot.com/api/filemanager/api/v3/files/thumbnail-redirect/200085666323?size=medium&portalId=22317019&errorOnPlaceholder=true&t=1763475593685&hs_static_app=FileManagerDashboard&hs_static_app_version=static-1.37748",
    imageUrlDesktop:
      "https://www-krediya-com.sandbox.hs-sites.com/hs-fs/hubfs/Remesa_panama_EEUU_Tabla_POPUP_horz.png?width=1920&name=Remesa_panama_EEUU_Tabla_POPUP_horz.png",
    imageUrlMobile:
      "https://www-krediya-com.sandbox.hs-sites.com/hs-fs/hubfs/Remesa_panama_EEUU_Tabla_POPUP_VERT.png?width=1080&name=Remesa_panama_EEUU_Tabla_POPUP_VERT.png",
  },
  {
    name: "Nicaragua",
    nameInWorldAtlas: "Nicaragua",
    coordinates: [-85.2072, 12.8654],
    description:
      "Mercado en crecimiento con oportunidades en servicios financieros.",
    flag: "//app.hubspot.com/api/filemanager/api/v3/files/thumbnail-redirect/200084581510?size=thumb&portalId=22317019&errorOnPlaceholder=true&t=1763475886595&hs_static_app=FileManagerDashboard&hs_static_app_version=static-1.37748",
    imageUrlDesktop:
      "https://www-krediya-com.sandbox.hs-sites.com/hs-fs/hubfs/Remesa_panama_nicaragua_Tabla_POPUP_horz.png?width=1920&name=Remesa_panama_nicaragua_Tabla_POPUP_horz.png",
    imageUrlMobile:
      "https://www-krediya-com.sandbox.hs-sites.com/hs-fs/hubfs/Remesa_panama_nicaragua_Tabla_POPUP_VERT.png?width=1080&name=Remesa_panama_nicaragua_Tabla_POPUP_VERT.png",
  },
  {
    name: "República Dominicana",
    nameInWorldAtlas: "Dominican Rep.",
    coordinates: [-70.1627, 18.7357],
    description:
      "Economía caribeña en crecimiento con oportunidades en servicios financieros y turismo.",
    imageUrlDesktop:
      "https://www-krediya-com.sandbox.hs-sites.com/hs-fs/hubfs/Remesa_panama_R.DOM_Tabla_POPUP_horz.png?width=1920&name=Remesa_panama_R.DOM_Tabla_POPUP_horz.png",
    imageUrlMobile:
      "https://www-krediya-com.sandbox.hs-sites.com/hs-fs/hubfs/Remesa_panama_R.DOMI_Tabla_POPUP_VERT.png?width=1080&name=Remesa_panama_R.DOMI_Tabla_POPUP_VERT.png",
    flag: "//app.hubspot.com/api/filemanager/api/v3/files/thumbnail-redirect/200084424313?size=thumb&portalId=22317019&errorOnPlaceholder=true&t=1763475823360&hs_static_app=FileManagerDashboard&hs_static_app_version=static-1.37748",
  },
  {
    name: "Costa Rica",
    nameInWorldAtlas: "Costa Rica",
    coordinates: [-84.0907, 9.7489],
    description:
      "Economía estable con alto desarrollo en tecnología y servicios.",
    flag: "//app.hubspot.com/api/filemanager/api/v3/files/thumbnail-redirect/200084600414?size=thumb&portalId=22317019&errorOnPlaceholder=true&t=1763475911832&hs_static_app=FileManagerDashboard&hs_static_app_version=static-1.37748",
    imageUrlDesktop:
      "https://www-krediya-com.sandbox.hs-sites.com/hs-fs/hubfs/Remesa_panama_costa%20rica_Tabla_POPUP_horz.png?width=1920&name=Remesa_panama_costa%20rica_Tabla_POPUP_horz.png",
    imageUrlMobile:
      "https://www-krediya-com.sandbox.hs-sites.com/hs-fs/hubfs/Remesa_panama_costa%20rica_Tabla_POPUP_VERT.png?width=1080&name=Remesa_panama_costa%20rica_Tabla_POPUP_VERT.png",
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
  "Dominican Rep.", // República Dominicana en world-atlas (abreviado)
  "Costa Rica",
];

interface InteractiveMapsProps {
  hideHeader?: boolean;
}

export default function InteractiveMaps({
  hideHeader = false,
}: InteractiveMapsProps) {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );

  // Use custom hook to detect mobile device (640px breakpoint)
  const isMobile = useIsMobile(640);

  // Responsive projection config state
  const [projectionConfig, setProjectionConfig] = useState({
    center: [-95, 20] as [number, number],
    scale: 700,
  });

  // Update projection config when screen size changes
  useEffect(() => {
    if (isMobile) {
      // Mobile configuration: zoomed out more to see the whole map
      setProjectionConfig({
        center: [-85, 25],
        scale: 1300,
      });
    } else {
      // Desktop configuration: original values
      setProjectionConfig({
        center: [-95, 20],
        scale: 700,
      });
    }
  }, [isMobile]);

  const searchLocation = (name: string) => {
    const location = locations.find((loc) => loc.nameInWorldAtlas === name);

    if (location) {
      setSelectedLocation(location);
    } else {
      console.log("Location not found");
    }
  };

  return (
    <div
      id="container_map-countries-svg"
      className={hideHeader ? "hide-header" : "show-header"}
    >
      {/* Map Container */}
      <div id="map-container_map-countries-svg">
        <div id="map-wrapper_map-countries-svg">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={projectionConfig}
            id="map_composable_map-countries-svg"
          >
            <defs>
              <linearGradient
                id="countryGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#004ebc" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient
                id="countryGradientHover"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#004ebc" stopOpacity="1" />
              </linearGradient>
              <radialGradient id="markerGradient" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#ff6b6b" />
                <stop offset="100%" stopColor="#e60026" />
              </radialGradient>
              <filter id="markerShadow">
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
                      fill={isHighlighted ? "url(#countryGradient)" : "#D1D5DB"}
                      fillOpacity={isHighlighted ? 1 : 0.5}
                      stroke={isHighlighted ? "#004ebc" : "#9CA3AF"}
                      strokeWidth={isHighlighted ? 1.5 : 0.5}
                      strokeOpacity={isHighlighted ? 0.8 : 0.4}
                      style={{
                        default: { outline: "none" },
                        hover: {
                          outline: "none",
                          fill: isHighlighted
                            ? "url(#countryGradientHover)"
                            : "#D1D5DB",
                          fillOpacity: isHighlighted ? 1 : 0.6,
                        },
                        pressed: { outline: "none" },
                      }}
                      onClick={() => searchLocation(geo.properties.name)}
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
              <Marker
                key={location.name}
                coordinates={location.coordinates}
                onClick={() => setSelectedLocation(location)}
              >
                <g
                  className="cursor-pointer_map-countries-svg marker-group_map-countries-svg"
                  style={{ transformOrigin: "center bottom" }}
                >
                  {/* Static outer glow */}
                  <circle r={9} fill="#e60026" opacity="0.15" />
                  {/* Pin shape - top circle with subtle pulse */}
                  <circle
                    cy={-12}
                    r={8}
                    fill="url(#markerGradient)"
                    stroke="white"
                    strokeWidth={2}
                    filter="url(#markerShadow)"
                    className="animate-subtle-pulse_map-countries-svg"
                  />
                  {/* Inner highlight on pin */}
                  <circle cy={-12} r={4} fill="white" opacity="0.3" />
                  {/* Pin point - triangle */}
                  <path
                    d="M -6 0 L 0 8 L 6 0 Z"
                    fill="#e60026"
                    stroke="white"
                    strokeWidth={1.5}
                    filter="url(#markerShadow)"
                  />
                  {/* Flag with bounce animation - no background */}
                  <g className="animate-bounce-flag_map-countries-svg">
                    <image
                      href={location.flag}
                      x={isMobile ? -30 : -20}
                      y={isMobile ? -45 : -27}
                      width={isMobile ? 60 : 38}
                      height={isMobile ? 52 : 30}
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
          id="modal-backdrop_map-countries-svg"
          className="modal-backdrop_map-countries-svg animate-fade-in_map-countries-svg"
          onClick={() => setSelectedLocation(null)}
        >
          <div
            id="modal-content_map-countries-svg"
            className="modal-content_map-countries-svg animate-scale-in_map-countries-svg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              id="modal-header_map-countries-svg"
              className="modal-header_map-countries-svg"
            >
              <div
                id="modal-header-content_map-countries-svg"
                className="modal-header-content_map-countries-svg"
              >
                <div
                  id="modal-header-left_map-countries-svg"
                  className="modal-header-left_map-countries-svg"
                >
                  <img
                    src={selectedLocation.flag}
                    alt={`Flag of ${selectedLocation.name}`}
                    id="modal-flag_map-countries-svg"
                    className="modal-flag_map-countries-svg"
                  />
                  <h2
                    id="modal-title_map-countries-svg"
                    className="modal-title_map-countries-svg"
                  >
                    {selectedLocation.name}
                  </h2>
                </div>
                <button
                  id="modal-close-button_map-countries-svg"
                  className="modal-close-button_map-countries-svg"
                  onClick={() => setSelectedLocation(null)}
                  aria-label="Cerrar modal"
                >
                  <X
                    id="modal-close-icon_map-countries-svg"
                    className="modal-close-icon_map-countries-svg"
                  />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div
              id="modal-body_map-countries-svg"
              className="modal-body_map-countries-svg"
            >
              {(selectedLocation.imageUrlDesktop ||
                selectedLocation.imageUrlMobile) && (
                  <img
                    src={
                      isMobile
                        ? selectedLocation.imageUrlMobile ||
                        selectedLocation.imageUrlDesktop ||
                        "/placeholder.svg"
                        : selectedLocation.imageUrlDesktop ||
                        selectedLocation.imageUrlMobile ||
                        "/placeholder.svg"
                    }
                    alt={selectedLocation.name}
                    id="modal-image_map-countries-svg"
                    className="modal-image_map-countries-svg"
                  />
                )}
              {selectedLocation.link && (
                <a
                  href={selectedLocation.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="modal-link_map-countries-svg"
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
