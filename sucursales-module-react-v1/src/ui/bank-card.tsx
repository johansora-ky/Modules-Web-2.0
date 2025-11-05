"use client";

import { motion } from "framer-motion";
// import Image from "next/image"

interface BankCardProps {
  bank: {
    id: string;
    name: string;
    logo: string;
  };
  isSelected: boolean;
  onClick: () => void;
}

export default function BankCard({ bank, isSelected, onClick }: BankCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02, translateY: -2 }}
      whileTap={{ scale: 0.98 }}
      id={`bank_card_button_${bank.id}_sucursales_module_react`}
      className={`bank_card_button_base_sucursales_module_react ${
        isSelected
          ? "bank_card_button_selected_sucursales_module_react"
          : "bank_card_button_unselected_sucursales_module_react"
      }`}
    >
      <div
        id={`bank_logo_container_${bank.id}_sucursales_module_react`}
        className={`bank_logo_container_base_sucursales_module_react ${
          isSelected
            ? "bank_logo_container_selected_sucursales_module_react"
            : ""
        }`}
      >
        <img
          src={bank.logo || "/placeholder.svg"}
          alt={bank.name}
          className="bank_logo_image_sucursales_module_react"
          loading="lazy"
        />
      </div>
      {/* Desktop: Nombre y checkmark */}
      <div className="bank_name_container_sucursales_module_react">
        <p className="bank_name_text_sucursales_module_react">{bank.name}</p>
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="checkmark_container_sucursales_module_react"
          >
            <svg
              className="checkmark_svg_sucursales_module_react"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </motion.div>
        )}
      </div>
    </motion.button>
  );
}
