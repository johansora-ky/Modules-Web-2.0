"use client";

import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Michael Liñan",
    role: "Asesor",
    text: "Me aprobaron un monto de dinero para mi proyecto musical sin tener historial y fue muy fácil recibirlo.",
    rating: 5,
  },
  {
    name: "Vanesa Bermudez",
    role: "Empleada",
    text: "Sentí que la plata me ayudó en un momento difícil y me encantó que el Cash fuera de uso libre.",
    rating: 5,
  },
  {
    name: "Carlos Méndez",
    role: "Independiente",
    text: "Necesitaba dinero para un viaje y me lo aprobaron en minutos. Todo fue digital y sin papeleo.",
    rating: 5,
  },
  {
    name: "Laura Torres",
    role: "Técnico en mantenimiento",
    text: "Con KrediCash pude arreglar mi moto sin complicaciones. Me encantó que todo se hace desde el celular.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section id="testimonials_section_landing_app_krediya">
      <div id="testimonials_container_landing_app_krediya">
        <div id="testimonials_header_landing_app_krediya">
          <h2 id="testimonials_title_landing_app_krediya">
            Lo que dicen nuestros usuarios
          </h2>
          <p id="testimonials_subtitle_landing_app_krediya">
            Descubre cómo KrediYa está transformando vidas
          </p>
        </div>

        {/* Carousel Container */}
        <div
          id="testimonials_carousel_container_landing_app_krediya"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Carousel */}
          <div id="testimonials_carousel_landing_app_krediya">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <div id="testimonials_card_landing_app_krediya">
                  {/* Stars */}
                  <div id="testimonials_stars_landing_app_krediya">
                    {[...Array(testimonials[currentIndex].rating)].map(
                      (_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className="testimonials_star_yellow_landing_app_krediya"
                        />
                      )
                    )}
                  </div>

                  <p id="testimonials_text_landing_app_krediya">
                    "{testimonials[currentIndex].text}"
                  </p>

                  <div id="testimonials_author_landing_app_krediya">
                    <p id="testimonials_name_landing_app_krediya">
                      {testimonials[currentIndex].name}
                    </p>
                    <p id="testimonials_role_landing_app_krediya">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            id="testimonials_nav_prev_landing_app_krediya"
            aria-label="Previous testimonial"
          >
            <ChevronLeft
              size={24}
              id="testimonials_nav_icon_landing_app_krediya"
            />
          </button>

          <button
            onClick={goToNext}
            id="testimonials_nav_next_landing_app_krediya"
            aria-label="Next testimonial"
          >
            <ChevronRight
              size={24}
              id="testimonials_nav_icon_landing_app_krediya"
              className="testimonials_nav_icon_landing_app_krediya"
            />
          </button>

          {/* Dots Indicator */}
          <div id="testimonials_dots_landing_app_krediya">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`testimonials_dot_landing_app_krediya ${
                  index === currentIndex
                    ? "testimonials_dot_active_landing_app_krediya"
                    : "testimonials_dot_inactive_landing_app_krediya"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
