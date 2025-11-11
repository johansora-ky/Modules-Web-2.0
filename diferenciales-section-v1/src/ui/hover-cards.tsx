"use client"

interface Card {
  label: string
  title: string
  description: string
}

const cards: Card[] = [
  {
    label: "⚡",
    title: "Aprobación inmediata",
    description:
      "Obtén tu respuesta en minutos sin trámites complicados. Procesos ágiles que respetan tu tiempo y necesidades.",
  },
  {
    label: "🛍️",
    title: "Compra y paga a tu ritmo",
    description:
      "Flexibilidad total en tus pagos con opciones personalizadas. Adapta tu plan de pago a tu realidad financiera.",
  },
  {
    label: "💳",
    title: "Sin interés por mora",
    description: "Paga sin preocupaciones adicionales por retrasos. Somos flexibles y comprensivos con tu situación.",
  },
  {
    label: "📱",
    title: "Solo con cédula",
    description: "Documentación mínima para comenzar tu trámite. Sin papeleos innecesarios, tan simple como debe ser.",
  },
  {
    label: "🎯",
    title: "No necesitas score crediticio",
    description:
      "Acceso sin barreras de historial crediticio tradicional. Te evaluamos de manera justa y transparente.",
  },
]

export function HoverCards() {
  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Nuestros Diferenciales</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Beneficios diseñados pensando en ti. Acceso financiero justo, rápido y sin barreras.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {cards.map((card, index) => (
            <div key={index} className="card-container">
              <div className="card">
                <div className="front-content">
                  <p>{card.label}</p>
                </div>
                <div className="content">
                  <p className="heading">{card.title}</p>
                  <p>{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
