import "./App.css";
import { Card } from "./ui/Card";

// Hardcoded data based on Card props
// const cardsData = [
//   {
//     text_field: "Kredicash",
//     richtext_field:
//       "<p style='text-align: center;'>Pide hasta $500 USD y recíbelos en tu cuenta bancaria en menos de 12 horas</p>",
//     image_field: {
//       src: "https://www-krediya-com.sandbox.hs-sites.com/hubfs/Iconos_Mesa%20de%20trabajo%201.jpg",
//       alt: "Kredicash",
//       width: 100,
//       height: 100,
//     },
//   },
//   {
//     text_field: "Remesas",
//     richtext_field:
//       "<p style='text-align: center;'>Te prestamos para productos de tecnología, electrodomésticos y más; con aprobación al instante</p>",
//     image_field: {
//       src: "https://www-krediya-com.sandbox.hs-sites.com/hubfs/Iconos-04.jpg",
//       alt: "Remesas",
//       width: 100,
//       height: 100,
//     },
//   },
//   {
//     text_field: "Billetera Digital",
//     richtext_field:
//       "<p style='text-align: center;'>Gestiona y controla tu saldo, tus fechas de pago y la ayuda que necesitas en cualquier momento.</p>",
//     image_field: {
//       src: "https://www-krediya-com.sandbox.hs-sites.com/hubfs/Iconos-05.jpg",
//       alt: "Billetera Digital",
//       width: 100,
//       height: 100,
//     },
//   },
//   {
//     text_field: "Educación financiera",
//     richtext_field:
//       "<p style='text-align: center;'>Mejora tu vida con tips y cursos financieros digitales.</p>",
//     image_field: {
//       src: "https://www-krediya-com.sandbox.hs-sites.com/hubfs/Iconos-06.jpg",
//       alt: "Educación financiera",
//       width: 100,
//       height: 100,
//     },
//   },
// ];

function App({ data }: { data: any }) {
  const cards = data.field_group || [];

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-auto p-4">
        {cards.map((card: any, index: number) => (
          <Card
            key={index}
            text_field={card.text_field}
            richtext_field={card.richtext_field}
            image_field={card.image_field}
          />
        ))}
      </div>
    </>
  );
}

export default App;
