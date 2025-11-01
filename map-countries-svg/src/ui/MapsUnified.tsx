"use client";

import { useState } from "react";
import InteractiveMaps from "./Maps";
import InteractiveMapsAsia from "./MapsAsia";
import "../styles/map-countries-svg.css";

type TabType = "global" | "asia";

export default function MapsUnified() {
    const [activeTab, setActiveTab] = useState<TabType>("global");

    return (
        <div id="container_unified_map-countries-svg" className="show-header">
            {/* Header */}
            <div id="header_unified_map-countries-svg">
                <h1 id="header-title_unified_map-countries-svg">
                    Nuestra Presencia Global
                </h1>
                <p id="header-description_unified_map-countries-svg">
                    Descubre nuestras operaciones en mercados clave alrededor del mundo
                </p>
            </div>

            {/* Tabs */}
            <div id="tabs-container_map-countries-svg">
                <div id="tabs-wrapper_map-countries-svg">
                    <button
                        id="tab-button-global_map-countries-svg"
                        className={`tab-button_map-countries-svg ${activeTab === "global" ? "active" : ""}`}
                        onClick={() => setActiveTab("global")}
                    >
                        Global
                    </button>
                    <button
                        id="tab-button-asia_map-countries-svg"
                        className={`tab-button_map-countries-svg ${activeTab === "asia" ? "active" : ""}`}
                        onClick={() => setActiveTab("asia")}
                    >
                        Asia
                    </button>
                </div>
            </div>

            {/* Map Content */}
            <div id="tabs-content_map-countries-svg">
                {activeTab === "global" && (
                    <div className="animate-fade-in-up_map-countries-svg">
                        <InteractiveMaps hideHeader={true} />
                    </div>
                )}
                {activeTab === "asia" && (
                    <div className="animate-fade-in-up_map-countries-svg">
                        <InteractiveMapsAsia hideHeader={true} />
                    </div>
                )}
            </div>
        </div>
    );
}

