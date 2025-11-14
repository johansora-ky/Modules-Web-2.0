"use client";

import { useEffect, useRef } from "react";
import { FloatingCubesContainer } from "./floating-cubes-container/FloatingCubesContainer";
import "./HeroBanner_mas_alla_del_cielo.css";

export function HeroBanner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Draw animated cosmic cubes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Create floating cube positions - spread across entire banner
    const updateCubes = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      return Array.from({ length: 15 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 30 + Math.random() * 50,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        opacity: 0.15 + Math.random() * 0.2, // More diffused (lower opacity)
        floatSpeed: 0.3 + Math.random() * 1.0,
        floatDistance: 15 + Math.random() * 30,
        offsetX: Math.random() * 100 - 50,
        offsetY: 0,
      }));
    };

    // Create stars for galactic background - reduced count for performance
    const createStars = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      return Array.from({ length: 100 }, () => ({
        // Reduced from 200 to 100
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
      }));
    };

    // Create nebula clouds - pre-create gradients for performance
    const createNebulas = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      return Array.from({ length: 3 }, () => ({
        // Reduced from 4 to 3
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 100 + Math.random() * 150,
        opacity: 0.1 + Math.random() * 0.15,
        color: Math.random() > 0.5 ? "rgba(139, 92, 246," : "rgba(79, 70, 229,",
        gradient: null as CanvasGradient | null, // Will be created once
      }));
    };

    let cubes = updateCubes();
    let stars = createStars();
    let nebulas = createNebulas();

    // Set canvas size to match container
    const updateCanvasSize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      // Regenerate on resize to maintain distribution
      cubes = updateCubes();
      stars = createStars();
      nebulas = createNebulas();
    };
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    let animationId: number;
    let frameCount = 0;

    const animate = () => {
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      // Clear with dark space background
      ctx.fillStyle = "rgba(5, 10, 30, 0.1)";
      ctx.fillRect(0, 0, width, height);

      frameCount++;

      // Draw nebula clouds - use cached gradients for performance
      nebulas.forEach((nebula) => {
        // Create gradient only once, reuse it
        if (!nebula.gradient) {
          nebula.gradient = ctx.createRadialGradient(
            nebula.x,
            nebula.y,
            0,
            nebula.x,
            nebula.y,
            nebula.radius
          );
          nebula.gradient.addColorStop(0, `${nebula.color}${nebula.opacity})`);
          nebula.gradient.addColorStop(
            0.5,
            `${nebula.color}${nebula.opacity * 0.5})`
          );
          nebula.gradient.addColorStop(1, `${nebula.color}0)`);
        }

        ctx.fillStyle = nebula.gradient;
        ctx.beginPath();
        ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw twinkling stars - optimized without expensive shadowBlur
      stars.forEach((star) => {
        const twinkle =
          Math.sin(frameCount * star.twinkleSpeed + star.twinklePhase) * 0.3 +
          0.7;
        const currentOpacity = star.opacity * twinkle;

        // Use fillStyle with glow effect instead of shadowBlur (much faster)
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Add subtle glow for larger stars (smaller circles, no shadowBlur)
        if (star.size > 1.2) {
          ctx.fillStyle = `rgba(200, 220, 255, ${currentOpacity * 0.3})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 1.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw bright stars with cross pattern
        if (star.size > 1.5) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${currentOpacity * 0.6})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(star.x - star.size * 2, star.y);
          ctx.lineTo(star.x + star.size * 2, star.y);
          ctx.moveTo(star.x, star.y - star.size * 2);
          ctx.lineTo(star.x, star.y + star.size * 2);
          ctx.stroke();
        }
      });

      // Draw cubes
      cubes.forEach((cube) => {
        cube.rotation += cube.rotationSpeed;
        cube.offsetY =
          Math.sin(frameCount * 0.01 + cube.x) * cube.floatDistance;
        cube.offsetX =
          Math.cos(frameCount * 0.008 + cube.y) * cube.floatDistance * 0.5;

        const x = cube.x + cube.offsetX;
        const y = cube.y + cube.offsetY;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(cube.rotation);

        const s = cube.size / 2;

        // Outer glow - removed expensive shadowBlur, use simpler approach
        ctx.strokeStyle = `rgba(100, 200, 255, ${cube.opacity * 0.5})`; // Lower opacity
        ctx.lineWidth = 2;

        // Front face
        ctx.strokeRect(-s, -s, cube.size, cube.size);

        // Back face
        ctx.strokeRect(-s + 10, -s + 10, cube.size, cube.size);

        // Connecting lines
        ctx.beginPath();
        ctx.moveTo(-s, -s);
        ctx.lineTo(-s + 10, -s + 10);
        ctx.moveTo(s, -s);
        ctx.lineTo(s + 10, -s + 10);
        ctx.moveTo(-s, s);
        ctx.lineTo(-s + 10, s + 10);
        ctx.moveTo(s, s);
        ctx.lineTo(s + 10, s + 10);
        ctx.stroke();

        ctx.strokeStyle = `rgba(200, 100, 255, ${cube.opacity * 0.3})`; // Lower opacity
        ctx.lineWidth = 1;
        ctx.strokeRect(-s, -s, cube.size, cube.size);

        ctx.restore();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

  return (
    <div id="hero-banner-container_mas_alla_del_cielo">
      {/* Animated background canvas */}
      <canvas ref={canvasRef} id="hero-banner-canvas_mas_alla_del_cielo" />

      <div id="hero-banner-gradient-overlay-1_mas_alla_del_cielo" />
      <div
        id="hero-banner-gradient-overlay-2_mas_alla_del_cielo"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 30%, rgba(139, 92, 246, 0.4) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(79, 70, 229, 0.35) 0%, transparent 60%), radial-gradient(ellipse at 50% 50%, rgba(100, 200, 255, 0.15) 0%, transparent 70%)",
        }}
      />
      {/* Additional galactic glow layers */}
      <div
        id="hero-banner-gradient-overlay-3_mas_alla_del_cielo"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 20%, rgba(200, 100, 255, 0.2) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(100, 150, 255, 0.2) 0%, transparent 40%)",
        }}
      />

      {/* Main content container */}
      <div id="hero-banner-content-container_mas_alla_del_cielo">
        <div id="hero-banner-grid_mas_alla_del_cielo">
          {/* Mobile: Mas Allá del Cielo logo (first in mobile) */}
          <div id="hero-banner-logo-mobile_mas_alla_del_cielo">
            <img
              src="https://www.krediya.com/hubfs/Mas%20Alla%20del%20Cielo/LOGO%20-%20MAS%20ALLA%20DEL%20CIELO.png?width=860&t=1763056731686"
              alt="Mas Allá del Cielo"
              id="hero-banner-logo-mobile-img_mas_alla_del_cielo"
            />
          </div>

          {/* Mobile: Astronaut animation (second in mobile) */}
          <div id="hero-banner-astronaut-mobile_mas_alla_del_cielo">
            <div id="hero-banner-astronaut-mobile-inner_mas_alla_del_cielo">
              {/* Floating cubes container */}
              <FloatingCubesContainer />

              {/* Astronaut image in the center */}
              <div id="hero-banner-astronaut-mobile-center_mas_alla_del_cielo">
                <img
                  src="https://www.krediya.com/hubfs/Mas%20Alla%20del%20Cielo/ASTRONAUTA.png?width=860&t=1763049512589"
                  alt="Astronaut"
                  id="hero-banner-astronaut-mobile-img_mas_alla_del_cielo"
                  style={{
                    filter: "drop-shadow(0 0 20px rgba(100, 200, 255, 0.5))",
                    animation: "float 6s ease-in-out infinite",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Desktop: Left section / Mobile: Bottom section - Title and CTA */}
          <div id="hero-banner-text-section_mas_alla_del_cielo">
            {/* Main headline */}
            <div id="hero-banner-headline-container_mas_alla_del_cielo">
              <h1 id="hero-banner-headline_mas_alla_del_cielo">
                ¡Accede a un universo de opciones!
              </h1>
              <p id="hero-banner-subtitle_mas_alla_del_cielo">
                Descubre los cubos cósmicos y explora una amplia variedad de
                productos
              </p>
            </div>

            {/* CTA Button */}
            <div id="hero-banner-cta-container_mas_alla_del_cielo">
              <button id="hero-banner-cta-button_mas_alla_del_cielo">
                Haz clic y conoce más
              </button>
            </div>

            {/* Footer disclaimer */}
            <p id="hero-banner-disclaimer_mas_alla_del_cielo">
              Válido hasta noviembre de 2025. Aplican T&C.
            </p>
          </div>

          {/* Desktop: Right section - Logo Mas Allá del Cielo + Astronaut animation */}
          <div id="hero-banner-desktop-section_mas_alla_del_cielo">
            {/* Logo Mas Allá del Cielo - absolute positioned to align with title */}
            <div id="hero-banner-logo-desktop_mas_alla_del_cielo">
              <img
                src="https://www.krediya.com/hubfs/Mas%20Alla%20del%20Cielo/LOGO%20-%20MAS%20ALLA%20DEL%20CIELO.png?width=860&t=1763056731686"
                alt="Mas Allá del Cielo"
                id="hero-banner-logo-desktop-img_mas_alla_del_cielo"
              />
            </div>

            {/* Astronaut animation */}
            <div id="hero-banner-astronaut-desktop_mas_alla_del_cielo">
              <div id="hero-banner-astronaut-desktop-inner_mas_alla_del_cielo">
                {/* Floating cubes container */}
                <FloatingCubesContainer />

                {/* Astronaut image in the center */}
                <div id="hero-banner-astronaut-desktop-center_mas_alla_del_cielo">
                  <img
                    src="https://www.krediya.com/hubfs/Mas%20Alla%20del%20Cielo/ASTRONAUTA.png?width=860&t=1763049512589"
                    alt="Astronaut"
                    id="hero-banner-astronaut-desktop-img_mas_alla_del_cielo"
                    style={{
                      filter: "drop-shadow(0 0 20px rgba(100, 200, 255, 0.5))",
                      animation: "float 6s ease-in-out infinite",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div id="hero-banner-bottom-gradient_mas_alla_del_cielo" />
    </div>
  );
}
