"use client";

import { useEffect, useRef, useState } from "react";
import "./FloatingCube_mas_alla_del_cielo.css";

interface FloatingCubeProps {
  imageUrl: string;
  initialX: number;
  initialY: number;
  size: number;
  floatSpeed: number;
  floatDistance: number;
  rotationSpeed: number;
  isRoulette?: boolean; // Roulette animation for mobile
  initialAngle?: number; // Initial angle for roulette animation
  centerX?: number; // Center X for roulette
  centerY?: number; // Center Y for roulette
  radius?: number; // Radius for roulette
}

export function FloatingCube({
  imageUrl,
  initialX,
  initialY,
  size,
  floatSpeed,
  floatDistance,
  rotationSpeed,
  isRoulette = false,
  initialAngle = 0,
  centerX = 50,
  centerY = 50,
  radius = 45,
}: FloatingCubeProps) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [rotation, setRotation] = useState(0);
  const animationRef = useRef<number | undefined>(undefined);
  const frameRef = useRef(0);

  useEffect(() => {
    const animate = () => {
      frameRef.current += 1;
      const time = frameRef.current * 0.01;

      if (isRoulette) {
        // Roulette animation: circular rotation around center
        const angle = initialAngle + time * floatSpeed;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        setPosition({ x, y });
        // Rotate the cube itself as it moves
        setRotation(frameRef.current * rotationSpeed);
      } else {
        // Original floating animation
        const offsetX =
          Math.cos(time * floatSpeed + initialX * 0.01) * floatDistance;
        const offsetY =
          Math.sin(time * floatSpeed + initialY * 0.01) * floatDistance;

        setPosition({
          x: initialX + offsetX,
          y: initialY + offsetY,
        });

        // Rotation animation
        setRotation(frameRef.current * rotationSpeed);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [
    initialX,
    initialY,
    floatSpeed,
    floatDistance,
    rotationSpeed,
    isRoulette,
    initialAngle,
    centerX,
    centerY,
    radius,
  ]);

  return (
    <div
      id="floating-cube-container_mas_alla_del_cielo"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <img
        id="floating-cube-image_mas_alla_del_cielo"
        src={imageUrl}
        alt="Floating cube"
        style={{
          filter: "drop-shadow(0 0 10px rgba(100, 200, 255, 0.6))",
        }}
      />
    </div>
  );
}
