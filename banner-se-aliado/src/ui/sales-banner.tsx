"use client"

import { useState, useEffect } from "react"
import "./sales-banner.css"

export default function SalesBanner() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Banner images - all three images are rendered simultaneously
  const images = [
    "https://www.krediya.com/hubfs/Im%C3%A1genes%20optimizadas%20en%20web%20-%20Nuevos%20sitios/Gemini_Generated_Image_jsgmmkjsgmmkjsgm-removebg-preview.png?width=860&t=1763667089785",
    "https://www.krediya.com/hubfs/Im%C3%A1genes%20optimizadas%20en%20web%20-%20Nuevos%20sitios/Gemini_Generated_Image_5mcggv5mcggv5mcg-removebg-preview.png?width=860&t=1763667089717",
    "https://www.krediya.com/hubfs/Im%C3%A1genes%20optimizadas%20en%20web%20-%20Nuevos%20sitios/Dise%C3%B1o%20sin%20t%C3%ADtulo%20(25).png?width=860&t=1763667089877"
  ]

  // Calculate indices for all images
  const getImageOpacity = (imageIdx: number) => {
    if (isTransitioning) {
      // During transition: current fades out, next fades in
      if (imageIdx === currentImageIndex) return 0 // Fading out
      if (imageIdx === (currentImageIndex + 1) % images.length) return 100 // Fading in
      return 0 // Other images hidden
    } else {
      // Normal state: only current is visible
      if (imageIdx === currentImageIndex) return 100
      return 0
    }
  }

  // Cycle between images every 3 seconds with synchronized parallel transition
  useEffect(() => {
    const TRANSITION_DURATION = 1000 // Duration in milliseconds for smooth transition

    const timer = setInterval(() => {
      // Start transition: current image fades out, next image fades in simultaneously
      setIsTransitioning(true)

      // After transition completes, update index and reset transition state
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length)
        setIsTransitioning(false)
      }, TRANSITION_DURATION)
    }, 3000)

    return () => clearInterval(timer)
  }, [images.length])

  return (
    <section id="section_banner_se_aliado">
      <div id="container_banner_se_aliado">
        <div id="grid_banner_se_aliado">
          {/* Text content */}
          <div id="text_content_banner_se_aliado">
            <h1 id="heading_banner_se_aliado">
              La nueva forma de vender
            </h1>
            <p id="paragraph_banner_se_aliado">
              Haz parte de la red más grande de aliados de Panamá.
            </p>
            <a id="button_banner_se_aliado" href="#hs_cos_wrapper_module_1761328454033_">
              Únete YA
            </a>
          </div>

          {/* Image carousel with fade */}
          <div id="carousel_container_banner_se_aliado">
            {/* Background shape with custom border-radius */}
            <div id="shape_wrapper_banner_se_aliado">
              <div id="background_shape_banner_se_aliado" />
              {/* Image container - all 3 images rendered simultaneously */}
              <div id="image_container_banner_se_aliado">
                {/* Render all 3 images simultaneously with synchronized fade animations */}
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image || "/placeholder.svg"}
                    alt={`Slide ${index + 1}`}
                    className="image_banner_se_aliado"
                    style={{
                      opacity: `${getImageOpacity(index)}%`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
