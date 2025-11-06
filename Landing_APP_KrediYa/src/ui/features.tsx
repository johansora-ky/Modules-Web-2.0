"use client";

import { Card } from "./Card";

const cardsData = [
  {
    text_field: "Kredicash",
    richtext_field:
      "<p style='text-align: center;'>Pide hasta $500 USD y recíbelos en tu cuenta bancaria en menos de 12 horas</p>",
    image_field: {
      src: "https://www-krediya-com.sandbox.hs-sites.com/hubfs/Iconos_Mesa%20de%20trabajo%201.jpg",
      alt: "Kredicash",
      width: 100,
      height: 100,
    },
  },
  {
    text_field: "Remesas",
    richtext_field:
      "<p style='text-align: center;'>Te prestamos para productos de tecnología, electrodomésticos y más; con aprobación al instante</p>",
    image_field: {
      src: "https://www-krediya-com.sandbox.hs-sites.com/hubfs/Iconos-04.jpg",
      alt: "Remesas",
      width: 100,
      height: 100,
    },
  },
  {
    text_field: "Billetera Digital",
    richtext_field:
      "<p style='text-align: center;'>Gestiona y controla tu saldo, tus fechas de pago y la ayuda que necesitas en cualquier momento.</p>",
    image_field: {
      src: "https://www-krediya-com.sandbox.hs-sites.com/hubfs/Iconos-05.jpg",
      alt: "Billetera Digital",
      width: 100,
      height: 100,
    },
  },
  {
    text_field: "Educación financiera",
    richtext_field:
      "<p style='text-align: center;'>Mejora tu vida con tips y cursos financieros digitales.</p>",
    image_field: {
      src: "https://www-krediya-com.sandbox.hs-sites.com/hubfs/Iconos-06.jpg",
      alt: "Educación financiera",
      width: 100,
      height: 100,
    },
  },
];

export default function Features() {
  return (
    <section id="features_section_landing_app_krediya">
      <div id="features_container_landing_app_krediya">
        <div id="features_header_landing_app_krediya">
          <h2 id="features_title_landing_app_krediya">
            Servicios de la App KrediYA
          </h2>
          <p id="features_subtitle_landing_app_krediya">
            Descubre todo lo que puedes hacer con la app y lleva tus finanzas al
            siguiente nivel.
          </p>
        </div>
        <div id="features_grid_landing_app_krediya">
          {cardsData.map((card: any, index: number) => (
            <Card
              key={index}
              text_field={card.text_field}
              richtext_field={card.richtext_field}
              image_field={card.image_field}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
