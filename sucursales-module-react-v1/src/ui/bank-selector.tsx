"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  animate,
  useMotionValueEvent,
} from "framer-motion";
import BankCard from "./bank-card";
import BankDetail from "./bank-detail";
import { banks } from "@/lib/banks-data";

export default function BankSelector() {
  const [selectedBankId, setSelectedBankId] = useState<string>(banks[0].id);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);

  const selectedBank = banks.find((bank) => bank.id === selectedBankId);

  // Calculate slider dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (sliderRef.current) {
        const width = sliderRef.current.offsetWidth;
        setSliderWidth(width);
        // Each item takes 25% of width (4 items visible) + gap
        const gap = 12; // gap-3 = 12px
        setItemWidth((width - gap * 3) / 4);
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Update current slide index when x changes
  useMotionValueEvent(x, "change", (latest) => {
    if (itemWidth > 0) {
      const index = Math.round(
        Math.max(0, Math.min(banks.length - 4, -latest / (itemWidth + 12)))
      );
      setCurrentSlideIndex(index);
    }
  });

  // Calculate max drag (total width - visible width)
  const maxDrag =
    itemWidth > 0
      ? -(itemWidth * banks.length + 12 * (banks.length - 1) - sliderWidth)
      : 0;

  // Snap to nearest item
  const snapToItem = (currentX: number) => {
    if (itemWidth === 0) return;
    const itemIndex = Math.round(-currentX / (itemWidth + 12));
    const clampedIndex = Math.max(0, Math.min(itemIndex, banks.length - 4));
    const targetX = -clampedIndex * (itemWidth + 12);
    animate(x, targetX, { type: "spring", stiffness: 300, damping: 30 });
  };

  const totalSlides = Math.max(1, banks.length - 3); // 4 visible, so slides = total - 3

  const goToSlide = (index: number) => {
    if (itemWidth === 0) return;
    const targetX = -index * (itemWidth + 12);
    animate(x, targetX, { type: "spring", stiffness: 300, damping: 30 });
  };

  return (
    <div id="grid_container_sucursales_module_react">
      {/* Columna izquierda: Cards de bancos */}
      <div id="left_column_sucursales_module_react">
        <h2 id="title_institutions_sucursales_module_react">Instituciones</h2>
        {/* Mobile: Slider deslizable */}
        <div id="mobile_slider_container_sucursales_module_react">
          <div
            ref={sliderRef}
            id="slider_wrapper_sucursales_module_react"
            style={{ touchAction: "pan-x" }}
          >
            <motion.div
              drag="x"
              dragConstraints={{ left: maxDrag, right: 0 }}
              dragElastic={0.1}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={(_, { offset, velocity }) => {
                setIsDragging(false);
                const currentX = x.get() + offset.x;
                if (Math.abs(velocity.x) > 500) {
                  // Fast swipe - move to next/prev
                  const direction = velocity.x > 0 ? -1 : 1;
                  const newIndex = Math.max(
                    0,
                    Math.min(banks.length - 4, currentSlideIndex + direction)
                  );
                  goToSlide(newIndex);
                } else {
                  // Slow drag - snap to nearest
                  snapToItem(currentX);
                }
              }}
              style={{ x }}
              id="slider_track_sucursales_module_react"
            >
              {banks.map((bank) => (
                <div
                  key={bank.id}
                  id="slider_item_wrapper_sucursales_module_react"
                  style={{ width: itemWidth }}
                >
                  <BankCard
                    bank={bank}
                    isSelected={bank.id === selectedBankId}
                    onClick={() => {
                      if (!isDragging) {
                        setSelectedBankId(bank.id);
                      }
                    }}
                  />
                </div>
              ))}
            </motion.div>
          </div>
          {/* Dots navigation */}
          <div id="dots_container_sucursales_module_react">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`dot_button_sucursales_module_react ${
                  currentSlideIndex === index
                    ? "dot_button_active_sucursales_module_react"
                    : "dot_button_inactive_sucursales_module_react"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        {/* Desktop: Lista vertical */}
        <div id="desktop_list_sucursales_module_react">
          {banks.map((bank) => (
            <BankCard
              key={bank.id}
              bank={bank}
              isSelected={bank.id === selectedBankId}
              onClick={() => setSelectedBankId(bank.id)}
            />
          ))}
        </div>
      </div>

      {/* Columna derecha: Detalle del banco */}
      <div id="right_column_sucursales_module_react">
        <motion.div
          key={selectedBankId}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{ height: "100%" }}
        >
          {selectedBank ? (
            <BankDetail bank={selectedBank} />
          ) : (
            <div id="empty_state_container_sucursales_module_react">
              <p id="empty_state_text_sucursales_module_react">
                Selecciona un banco para ver detalles
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
