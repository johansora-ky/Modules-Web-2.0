"use client"

import { useEffect, useState } from "react"

interface Product {
  id: string
  name: string
  image: string
}

const PRODUCTS: Product[] = [
  { id: "1", name: "Smartphone", image: "/premium-smartphone.jpg" },
  { id: "2", name: "Laptop", image: "/modern-laptop.png" },
  { id: "3", name: "Headphones", image: "/wireless-headphones.png" },
  { id: "4", name: "Tablet", image: "/digital-tablet.jpg" },
  { id: "5", name: "Camera", image: "/professional-camera.png" },
  { id: "6", name: "Watch", image: "/smartwatch-lifestyle.png" },
]

export function ProductCarousel() {
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([])

  useEffect(() => {
    // Generate sparkles randomly
    const interval = setInterval(() => {
      const newSparkle = {
        id: Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
      }
      setSparkles((prev) => [...prev, newSparkle])

      // Remove sparkle after animation
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id))
      }, 1500)
    }, 300)

    return () => clearInterval(interval)
  }, [])

  // Duplicate products for seamless loop
  const extendedProducts = [...PRODUCTS, ...PRODUCTS]

  return (
    <div className="w-full max-w-2xl mx-auto relative">
      {/* Sparkle Effects */}
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute pointer-events-none animate-sparkle"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: "8px",
            height: "8px",
            background: "#fff",
            borderRadius: "50%",
            opacity: 0.8,
          }}
        />
      ))}

      {/* Row 1 - Left to Right */}
      <div className="mb-4 overflow-hidden rounded-lg relative">
        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#e10623] to-transparent z-10 pointer-events-none rounded-l-lg"></div>
        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#e10623] to-transparent z-10 pointer-events-none rounded-r-lg"></div>
        <div className="flex animate-scroll-left gap-4">
          {extendedProducts.map((product, idx) => (
            <ProductCard key={`row1-${idx}`} product={product} />
          ))}
        </div>
      </div>

      {/* Row 2 - Right to Left */}
      <div className="mb-4 overflow-hidden rounded-lg relative">
        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#e10623] to-transparent z-10 pointer-events-none rounded-l-lg"></div>
        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#e10623] to-transparent z-10 pointer-events-none rounded-r-lg"></div>
        <div className="flex animate-scroll-right gap-4">
          {extendedProducts.map((product, idx) => (
            <ProductCard key={`row2-${idx}`} product={product} />
          ))}
        </div>
      </div>

      {/* Row 3 - Left to Right */}
      <div className="overflow-hidden rounded-lg relative">
        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#e10623] to-transparent z-10 pointer-events-none rounded-l-lg"></div>
        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#e10623] to-transparent z-10 pointer-events-none rounded-r-lg"></div>
        <div className="flex animate-scroll-left gap-4">
          {extendedProducts.map((product, idx) => (
            <ProductCard key={`row3-${idx}`} product={product} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scrollRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes sparkle {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(0.8);
          }
          100% {
            opacity: 0;
            transform: scale(0);
          }
        }

        .animate-scroll-left {
          animation: scrollLeft 30s linear infinite;
        }

        .animate-scroll-right {
          animation: scrollRight 30s linear infinite;
        }

        .animate-sparkle {
          animation: sparkle 1.5s ease-in-out forwards;
        }
      `}</style>
    </div>
  )
}

interface ProductCardProps {
  product: Product
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <div
      className="flex-shrink-0 w-40 h-40 rounded-xl p-4 flex items-center justify-center transition-all duration-300 hover:shadow-2xl group cursor-pointer"
      style={{
        background: "rgba(255, 255, 255, 0.50)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
      }}
    >
      <div className="w-full h-full flex flex-col items-center justify-center">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-28 h-28 object-contain mb-2 transition-transform group-hover:scale-110 duration-300"
        />
        <p className="text-sm font-semibold text-white text-center drop-shadow-md">{product.name}</p>
      </div>
    </div>
  )
}
