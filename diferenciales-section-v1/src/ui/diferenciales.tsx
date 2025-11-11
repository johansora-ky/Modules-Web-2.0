"use client"

import type React from "react"

import { motion } from "framer-motion"
import { CheckCircle, Zap, CreditCard, Shield, TrendingUp, Smartphone } from "lucide-react"

interface DiferencialCard {
  id: number
  icon: React.ReactNode
  title: string
  description: string
}

const diferencialesData: DiferencialCard[] = [
  {
    id: 1,
    icon: <Zap className="w-8 h-8" />,
    title: "Aprobación inmediata",
    description: "Obtén tu respuesta en minutos sin trámites complicados",
  },
  {
    id: 2,
    icon: <CreditCard className="w-8 h-8" />,
    title: "Compra y paga a tu ritmo",
    description: "Flexibilidad total en tus pagos con opciones personalizadas",
  },
  {
    id: 3,
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Sin interés por mora",
    description: "Paga sin preocupaciones adicionales por retrasos",
  },
  {
    id: 4,
    icon: <Smartphone className="w-8 h-8" />,
    title: "Solo con cédula",
    description: "Documentación mínima para comenzar tu trámite",
  },
  {
    id: 5,
    icon: <Shield className="w-8 h-8" />,
    title: "No necesitas score crediticio",
    description: "Acceso sin barreras de historial crediticio tradicional",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  hover: {
    y: -8,
    boxShadow: "0 20px 40px rgba(0, 78, 188, 0.15)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
}

export function Diferenciales() {
  return (
    <section className="w-full bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-black mb-4">Conoce nuestros diferenciales</h2>
          <p className="text-lg text-gray-600">Beneficios que hacen la diferencia en tu experiencia con KrediYa.</p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {diferencialesData.map((item) => (
            <motion.div key={item.id} className="group relative" variants={cardVariants} whileHover="hover">
              <div className="h-full p-8 rounded-2xl border-2 border-gray-100 bg-white transition-all duration-300 hover:border-[#004EBC] cursor-pointer">
                {/* Icon Container */}
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-blue-50 text-[#004EBC] group-hover:bg-[#004EBC] group-hover:text-white transition-all duration-300">
                    {item.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-black mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>

                {/* Accent Line */}
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#004EBC] to-[#E60026] rounded-full w-0 group-hover:w-full transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative Element */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-[#004EBC]/20">
            <CheckCircle className="w-5 h-5 text-[#004EBC]" />
            <span className="text-sm font-medium text-[#004EBC]">Más de 50,000 clientes satisfechos</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
