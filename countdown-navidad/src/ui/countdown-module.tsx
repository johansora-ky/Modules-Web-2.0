"use client";

import { useEffect, useState } from "react";
import CountdownTimer from "./countdown-timer";
import OrnamentDecorations from "./ornament-decorations";
import "../countdown-navidad.css";

export default function CountdownModule() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div id="countdown_navidad_main_container">
      {/* Left Magenta Section */}
      <div id="countdown_navidad_left_section"></div>

      {/* Diagonal Torn Paper Effect SVG */}
      <svg id="countdown_navidad_svg_torn_edge" preserveAspectRatio="none">
        <defs>
          <filter id="tornEdgeFine">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.08"
              numOctaves="4"
              result="noise"
              seed="2"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="25"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
        {/* Upper diagonal torn edge */}
        <path
          d="M -5,15% Q 15%,18% 35%,12% T 60%,16% T 100%,10% L 100%,0 L -5,0 Z"
          fill="white"
          filter="url(#tornEdgeFine)"
          className="countdown_navidad_drop_shadow"
        />
        {/* Lower diagonal torn edge */}
        <path
          d="M -5,85% Q 15%,80% 35%,88% T 60%,84% T 100%,90% L 100%,100% L -5,100% Z"
          fill="white"
          filter="url(#tornEdgeFine)"
          className="countdown_navidad_drop_shadow"
        />
      </svg>

      {/* Right White Section with subtle gradient */}
      <div id="countdown_navidad_right_section"></div>

      {/* Ornament decorations */}
      <OrnamentDecorations />

      {/* Main Content Container */}
      <div id="countdown_navidad_content_container">
        <div className="countdown_navidad_grid">
          {/* Left Column - Text on Magenta Background */}
          <div className="countdown_navidad_left_column">
            <div className="countdown_navidad_text_container">
              <h2 className="countdown_navidad_title">
                ¿Qué harías si un regalo pudiera cambiar algo más que tu
                Navidad?
              </h2>

              <p className="countdown_navidad_description">
                Descubre la innovación que transformará tu experiencia con
                KrediYa.
              </p>

              <div className="countdown_navidad_register_section">
                <p className="countdown_navidad_register_text">
                  Regístrate y entérate antes que los demás
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Countdown on White Background */}
          <div className="countdown_navidad_right_column">
            {/* Header with Badge */}
            <div className="countdown_navidad_header_container">
              <div className="countdown_navidad_badge">
                <div className="countdown_navidad_pulse_dot"></div>
                <span className="countdown_navidad_badge_text">
                  Cuenta Regresiva
                </span>
                <div className="countdown_navidad_pulse_dot"></div>
              </div>

              {/* Main Headline with 3D Effect */}
              <div className="countdown_navidad_headline_container">
                {/* Shadow layer for 3D effect */}
                <h3 className="countdown_navidad_headline_shadow">
                  El Gran Día
                </h3>
                {/* Main text */}
                <h3 className="countdown_navidad_headline_main">El Gran Día</h3>
              </div>
            </div>

            <div className="countdown_navidad_timer_container">
              <CountdownTimer targetDate="2025-12-17" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
