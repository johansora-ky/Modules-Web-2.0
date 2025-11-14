"use client";

import { useEffect, useState } from "react";
import { ProductCarousel } from "./product-carousel";
import "./dynamic-banner_nuestros_aliados.css";

export function DynamicBanner() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div id="dynamic-banner-container_nuestros_aliados">
      {/* Watermark Logo Background */}
      <div id="dynamic-banner-watermark_nuestros_aliados">
        <div id="dynamic-banner-watermark-text_nuestros_aliados">YA</div>
      </div>

      {/* Radial Glow Effect */}
      <div id="dynamic-banner-radial-glow_nuestros_aliados"></div>

      {/* Mobile Carousel - visible on small screens */}
      <div id="dynamic-banner-mobile-carousel_nuestros_aliados">
        <ProductCarousel />
      </div>

      {/* Content Container */}
      <div id="dynamic-banner-content-container_nuestros_aliados">
        <div id="dynamic-banner-grid_nuestros_aliados">
          {/* Left Section - Text */}
          <div
            id="dynamic-banner-left-section_nuestros_aliados"
            className="animate-fade-in_nuestros_aliados"
          >
            <h1 id="dynamic-banner-h1_nuestros_aliados">
              Compra todo lo que sueñas
            </h1>
            <h2 id="dynamic-banner-h2_nuestros_aliados">
              Lo financiamos al instante
            </h2>
            <button id="dynamic-banner-button_nuestros_aliados">
              Comenzar
            </button>
          </div>

          {/* Right Section - Product Carousel */}
          <div id="dynamic-banner-right-section_nuestros_aliados">
            <ProductCarousel />
          </div>
        </div>
      </div>
    </div>
  );
}
