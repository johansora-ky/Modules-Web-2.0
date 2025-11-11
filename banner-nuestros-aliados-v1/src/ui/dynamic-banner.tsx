"use client"

import { useEffect, useState } from "react"
import { ProductCarousel } from "./product-carousel"

export function DynamicBanner() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-[#e10623] via-[#d00420] to-[#b4041c]">
      {/* Watermark Logo Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <div className="text-9xl font-black text-white select-none">YA</div>
      </div>

      {/* Radial Glow Effect */}
      <div className="absolute inset-0 radial-gradient opacity-20 pointer-events-none"></div>

      {/* Content Container */}
      <div className="relative z-10 h-screen flex items-center px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl mx-auto items-center">
          {/* Left Section - Text */}
          <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight text-pretty">
              Compra todo lo que sueñas
            </h1>
            <h2 className="text-xl md:text-2xl font-bold text-white/90 mb-8 text-pretty">Lo financiamos al instante</h2>
            <button className="px-8 py-3 bg-white text-[#e10623] font-bold rounded-lg hover:bg-blue-100 transition-colors duration-300 shadow-lg">
              Comenzar
            </button>
          </div>

          {/* Right Section - Product Carousel */}
          <div className="hidden md:flex items-center justify-center">
            <ProductCarousel />
          </div>
        </div>
      </div>

      {/* Mobile Carousel - visible on small screens */}
      <div className="md:hidden relative z-10 px-6 pb-12">
        <ProductCarousel />
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .radial-gradient {
          background: radial-gradient(
            circle at center,
            rgba(255, 255, 255, 0.1) 0%,
            transparent 70%
          );
        }
      `}</style>
    </div>
  )
}
