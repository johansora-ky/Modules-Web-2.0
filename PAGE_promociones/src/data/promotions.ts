import type { Root } from "@/lib/types";

export const promotionsData: Root = {
  type: "promociones",
  card_info: [
    {
      text_field: "Descuento Especial en Préstamos",
      descripcion_simple: "Aprovecha hasta un 30% de descuento en la tasa de interés para nuevos clientes.",
      imagen_card: {
        src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
        alt: null,
        loading: "lazy",
        size_type: "responsive"
      },
      field_group: {
        banner_desktop: {
          src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=400&fit=crop",
          alt: null,
          loading: "lazy",
          size_type: "responsive"
        },
        banner_mobile: {
          src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
          alt: null,
          loading: "lazy",
          size_type: "responsive"
        }
      },
      pop_up_info: {
        descripcion_completa: "Esta promoción especial está diseñada para nuevos clientes que buscan financiamiento. Con nuestro descuento del 30% en la tasa de interés, podrás acceder a préstamos más accesibles y con mejores condiciones. La promoción aplica para préstamos personales, préstamos para vehículos y préstamos para vivienda. No dejes pasar esta oportunidad única de obtener mejores condiciones financieras.",
        t_c: "Términos y Condiciones: Esta promoción es válida únicamente para nuevos clientes que contraten un préstamo entre el 1 de enero y el 31 de enero de 2024. El descuento del 30% aplica sobre la tasa de interés base. El monto mínimo del préstamo es de $5,000 y el máximo de $100,000. La aprobación del préstamo está sujeta a evaluación crediticia. No aplica con otras promociones vigentes. Válido solo en territorio nacional."
      },
      url_field: {
        content_id: 1,
        href: "https://krediya.com/prestamos",
        href_with_scheme: null,
        type: "external"
      }
    },
    {
      text_field: "Cashback en Tu Primera Compra",
      descripcion_simple: "Obtén 5% de cashback en tu primera transacción con nuestra tarjeta de crédito.",
      imagen_card: {
        src: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
        alt: null,
        loading: "lazy",
        size_type: "responsive"
      },
      field_group: {
        banner_desktop: {
          src: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=400&fit=crop",
          alt: null,
          loading: "lazy",
          size_type: "responsive"
        },
        banner_mobile: {
          src: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop",
          alt: null,
          loading: "lazy",
          size_type: "responsive"
        }
      },
      pop_up_info: {
        descripcion_completa: "Disfruta de un cashback del 5% en tu primera compra realizada con nuestra tarjeta de crédito. Este beneficio se acreditará automáticamente en tu cuenta dentro de los primeros 30 días hábiles. Puedes usar tu cashback para pagar futuras compras o solicitar su retiro. La tarjeta incluye además beneficios adicionales como seguro de compras y protección contra fraudes.",
        t_c: "Términos y Condiciones: El cashback del 5% aplica únicamente en la primera compra realizada con la tarjeta de crédito. El monto máximo de cashback es de $500. El beneficio se acredita dentro de 30 días hábiles posteriores a la compra. No aplica para compras de efectivo, transferencias o pagos de servicios. La tarjeta debe estar activa y al día en sus pagos. Válido solo para nuevos titulares de tarjeta."
      },
      url_field: {
        content_id: 2,
        href: "https://krediya.com/tarjeta-credito",
        href_with_scheme: null,
        type: "external"
      }
    },
    {
      text_field: "Sin Comisiones por Un Año",
      descripcion_simple: "Abre tu cuenta y disfruta de cero comisiones por mantenimiento durante 12 meses.",
      imagen_card: {
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        alt: null,
        loading: "lazy",
        size_type: "responsive"
      },
      field_group: {
        banner_desktop: {
          src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=400&fit=crop",
          alt: null,
          loading: "lazy",
          size_type: "responsive"
        },
        banner_mobile: {
          src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
          alt: null,
          loading: "lazy",
          size_type: "responsive"
        }
      },
      pop_up_info: {
        descripcion_completa: "Abre una cuenta nueva con nosotros y disfruta de cero comisiones por mantenimiento durante todo el primer año. Además, tendrás acceso a nuestra plataforma digital, transferencias ilimitadas y atención prioritaria. Esta es la oportunidad perfecta para comenzar a gestionar tus finanzas sin preocuparte por costos adicionales.",
        t_c: "Términos y Condiciones: La promoción de cero comisiones aplica únicamente para nuevas cuentas abiertas entre el 1 de enero y el 31 de enero de 2024. La exención de comisiones es válida por 12 meses consecutivos desde la apertura de la cuenta. Después del período promocional, se aplicarán las comisiones regulares según el tipo de cuenta. Se requiere un depósito inicial mínimo de $100. No aplica para cuentas empresariales."
      },
      url_field: {
        content_id: 3,
        href: "https://krediya.com/cuentas",
        href_with_scheme: null,
        type: "external"
      }
    }
  ]
};
