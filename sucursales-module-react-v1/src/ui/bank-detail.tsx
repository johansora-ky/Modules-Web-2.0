"use client";

// import Image from "next/image"
import { motion } from "framer-motion";
import { CreditCard, Building2 } from "lucide-react";

interface BankDetailProps {
  bank: {
    id: string;
    name: string;
    logo: string;
    description: string;
    website: string;
    color: string;
    isAccountRegular: boolean;
    isSucursales?: boolean;
    AccountDetails?: {
      accountNumber: string;
      accountName: string;
      accountType: string;
    };
  };
}

export default function BankDetail({ bank }: BankDetailProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      id="bank_detail_card_sucursales_module_react"
    >
      {/* Header con gradiente inline */}
      <div
        id="bank_detail_header_sucursales_module_react"
        style={{
          background: `linear-gradient(180deg, ${bank.color} 0%, #Fff 100%)`,
        }}
      >
        <div id="bank_detail_header_pattern_sucursales_module_react"></div>
      </div>

      {/* Logo y contenido */}
      <div id="bank_detail_content_sucursales_module_react">
        {/* Logo grande */}
        <motion.div
          variants={itemVariants}
          id="bank_detail_logo_container_sucursales_module_react"
        >
          <div id="bank_detail_logo_wrapper_sucursales_module_react">
            <img
              src={bank.logo || "/placeholder.svg"}
              alt={bank.name}
              id="bank_detail_logo_image_sucursales_module_react"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* Nombre y descripción */}
        <motion.div
          variants={itemVariants}
          id="bank_detail_title_container_sucursales_module_react"
        >
          <h1 id="bank_detail_title_sucursales_module_react">{bank.name}</h1>
          <p id="bank_detail_description_sucursales_module_react">
            {bank.description}
          </p>
        </motion.div>

        {/* Grid de información */}
        {bank.isSucursales && (
          <motion.div
            variants={itemVariants}
            id="bank_sucursales_section_sucursales_module_react"
          >
            <div id="bank_info_item_sucursales_module_react">
              <div id="bank_info_icon_container_sucursales_module_react">
                <Building2 id="bank_info_icon_sucursales_module_react" />
              </div>
              <p id="bank_info_label_sucursales_module_react">Sucursales</p>
              <a
                href={bank.website}
                target="_blank"
                rel="noopener noreferrer"
                id="bank_link_sucursales_module_react"
              >
                Visita nuestras sucursales
              </a>
            </div>
          </motion.div>
        )}

        {/* Detalles de la cuenta */}
        {bank.isAccountRegular && bank.AccountDetails && (
          <motion.div
            variants={itemVariants}
            id="account_details_grid_sucursales_module_react"
          >
            <div id="bank_info_item_sucursales_module_react">
              <div id="bank_info_icon_container_sucursales_module_react">
                <CreditCard id="bank_info_icon_sucursales_module_react" />
              </div>
              <p id="bank_info_label_sucursales_module_react">
                Nombre de la cuenta
              </p>
              <p id="account_detail_value_sucursales_module_react">
                {bank.AccountDetails.accountName}
              </p>
            </div>

            <div id="bank_info_item_sucursales_module_react">
              <div id="bank_info_icon_container_sucursales_module_react">
                <CreditCard id="bank_info_icon_sucursales_module_react" />
              </div>
              <p id="bank_info_label_sucursales_module_react">Tipo de cuenta</p>
              <p id="account_detail_value_sucursales_module_react">
                {bank.AccountDetails.accountType}
              </p>
            </div>

            <div id="bank_info_item_sucursales_module_react">
              <div id="bank_info_icon_container_sucursales_module_react">
                <CreditCard id="bank_info_icon_sucursales_module_react" />
              </div>
              <p id="bank_info_label_sucursales_module_react">
                Número de cuenta
              </p>
              <p
                id="account_detail_value_sucursales_module_react"
                className="account_detail_value_number_sucursales_module_react"
              >
                {bank.AccountDetails.accountNumber}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
