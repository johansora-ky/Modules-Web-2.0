"use client"

import "./hover-cards.css"

interface Card {
  id: number
  imageUrl: string
  title: string
  description: string
}

const cards: Card[] = [
  {
    id: 1,
    imageUrl: "https://www.krediya.com/hubfs/Im%C3%A1genes%20optimizadas%20en%20web%20-%20Nuevos%20sitios/Gemini_Generated_Image_vsrui3vsrui3vsru.png?width=860&t=1763220266005",
    title: "Aprobación inmediata",
    description:
      "Obtén tu respuesta en minutos sin trámites complicados. Procesos ágiles que respetan tu tiempo y necesidades.",
  },
  {
    id: 2,
    imageUrl: "https://www.krediya.com/hubfs/Im%C3%A1genes%20optimizadas%20en%20web%20-%20Nuevos%20sitios/Gemini_Generated_Image_ok5y3rok5y3rok5y.png?width=860&t=1763220266062",
    title: "Compra y paga a tu ritmo",
    description:
      "Flexibilidad total en tus pagos con opciones personalizadas. Adapta tu plan de pago a tu realidad financiera.",
  },
  {
    id: 3,
    imageUrl: "https://www.krediya.com/hubfs/Im%C3%A1genes%20optimizadas%20en%20web%20-%20Nuevos%20sitios/Gemini_Generated_Image_tmqe3ntmqe3ntmqe.png?width=860&t=1763653109136",
    title: "Sin interés por mora",
    description: "Paga sin preocupaciones adicionales por retrasos. Somos flexibles y comprensivos con tu situación.",
  },
  {
    id: 4,
    imageUrl: "https://www.krediya.com/hubfs/Im%C3%A1genes%20optimizadas%20en%20web%20-%20Nuevos%20sitios/Gemini_Generated_Image_9dn9jc9dn9jc9dn9.png?width=860&t=1763220265884",
    title: "Solo con cédula",
    description: "Documentación mínima para comenzar tu trámite. Sin papeleos innecesarios, tan simple como debe ser.",
  },
  {
    id: 5,
    imageUrl: "https://www.krediya.com/hubfs/Im%C3%A1genes%20optimizadas%20en%20web%20-%20Nuevos%20sitios/Score.png?width=860&t=1763653644781",
    title: "No necesitas score crediticio",
    description:
      "Acceso sin barreras de historial crediticio tradicional. Te evaluamos de manera justa y transparente.",
  },
]

export function HoverCards() {
  return (
    <section id="section_diferenciales_section">
      <div id="container_diferenciales_section">
        <div id="cards_wrapper_diferenciales_section">
          {cards.map((card) => (
            <div key={card.id} className="card-container_diferenciales_section">
              <div className="card_diferenciales_section">
                {/* Background Image with Dark Overlay */}
                <div
                  className="card_bg_image_diferenciales_section"
                  style={{ backgroundImage: `url(${card.imageUrl})` }}
                >
                  <div className="card_overlay_diferenciales_section" />
                </div>

                <div className="front-content_diferenciales_section">
                  <p>{card.title}</p>
                </div>
                <div className="content_diferenciales_section">
                  <p className="heading_diferenciales_section">{card.title}</p>
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
