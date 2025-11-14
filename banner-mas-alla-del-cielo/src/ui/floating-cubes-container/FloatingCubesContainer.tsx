"use client";

import { useEffect, useMemo, useState } from "react";
import { FloatingCube } from "../floating-cube/FloatingCube";
import "./FloatingCubesContainer_mas_alla_del_cielo.css";

const CUBE_IMAGES = [
  "https://www.krediya.com/hubfs/Mas%20Alla%20del%20Cielo/CUBO%20AIRE.png?width=860&t=1763049512920",
  "https://www.krediya.com/hubfs/Mas%20Alla%20del%20Cielo/CUBO%20LAPTOP.png?width=860&t=1763049512903",
  "https://www.krediya.com/hubfs/Mas%20Alla%20del%20Cielo/CUBO%20TELEVISOR.png?width=860&t=1763049512751",
  "https://www.krediya.com/hubfs/Mas%20Alla%20del%20Cielo/CUBO%20LLANTA.png?width=860&t=1763049512749",
  "https://www.krediya.com/hubfs/Mas%20Alla%20del%20Cielo/CUBO%20GAFAS.png?width=860&t=1763049512656",
  "https://www.krediya.com/hubfs/Mas%20Alla%20del%20Cielo/CUBO%20TELEFONOS.png?width=860&t=1763049512648",
];

interface CubeConfig {
  x: number;
  y: number;
  size: number;
  floatSpeed: number;
  floatDistance: number;
  rotationSpeed: number;
  initialAngle?: number;
}

export function FloatingCubesContainer() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Generate positions in a circular pattern around the center
  const generateCubePositions = (): CubeConfig[] => {
    const centerX = 50;
    const centerY = 50;
    // Larger radius for mobile to spread cubes apart
    const radius = isMobile ? 45 : 35;
    const angleStep = (2 * Math.PI) / CUBE_IMAGES.length;

    return CUBE_IMAGES.map((_, index) => {
      const angle = index * angleStep;
      const baseX = centerX + Math.cos(angle) * radius;
      const baseY = centerY + Math.sin(angle) * radius;

      // More randomness for mobile to spread cubes further
      const randomOffsetX = (Math.random() - 0.5) * (isMobile ? 15 : 10);
      const randomOffsetY = (Math.random() - 0.5) * (isMobile ? 15 : 10);

      return {
        x: baseX + randomOffsetX,
        y: baseY + randomOffsetY,
        size: 300 + Math.random() * 40, // Size between 80-120px
        floatSpeed: isMobile ? 0.5 : 0.3 + Math.random() * 0.4, // Consistent speed for roulette on mobile
        floatDistance: isMobile
          ? 15 + Math.random() * 20
          : 8 + Math.random() * 12, // More distance on mobile
        rotationSpeed: 0.1 + Math.random() * 0.2, // Rotation speed between 0.1-0.3
        initialAngle: angle, // Store initial angle for roulette animation
      };
    });
  };

  const cubeConfigs = useMemo(() => generateCubePositions(), [isMobile]);

  return (
    <div id="floating-cubes-container_mas_alla_del_cielo">
      {CUBE_IMAGES.map((imageUrl, index) => (
        <FloatingCube
          key={index}
          imageUrl={imageUrl}
          initialX={cubeConfigs[index].x}
          initialY={cubeConfigs[index].y}
          size={cubeConfigs[index].size}
          floatSpeed={cubeConfigs[index].floatSpeed}
          floatDistance={cubeConfigs[index].floatDistance}
          rotationSpeed={cubeConfigs[index].rotationSpeed}
          isRoulette={isMobile}
          initialAngle={cubeConfigs[index].initialAngle}
          centerX={50}
          centerY={50}
          radius={isMobile ? 45 : 35}
        />
      ))}
    </div>
  );
}
