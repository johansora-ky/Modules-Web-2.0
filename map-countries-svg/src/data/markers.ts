export interface MarkerData {
  name: string;
  coordinates: [number, number];
  info: string;
  description?: string;
}

export const latinAmericaMarkers: MarkerData[] = [
  {
    name: "Colombia",
    coordinates: [-74.0721, 4.711],
    info: "Oficina Principal",
    description:
      "Nuestra sede principal en Colombia, ubicada en Bogotá. Centro de operaciones para toda la región andina con más de 500 empleados.",
  },
  {
    name: "México",
    coordinates: [-99.1332, 19.4326],
    info: "Sucursal Norte",
    description:
      "Oficina regional en Ciudad de México. Punto estratégico para operaciones en Norteamérica con enfoque en expansión y desarrollo comercial.",
  },
  {
    name: "Brasil",
    coordinates: [-47.8825, -15.7942],
    info: "Centro de Innovación",
    description:
      "Hub tecnológico en Brasília. Centro de investigación y desarrollo con equipos especializados en innovación digital.",
  },
  {
    name: "Argentina",
    coordinates: [-58.3816, -34.6037],
    info: "Oficina Regional Sur",
    description:
      "Sede en Buenos Aires, gestionando operaciones del Cono Sur. Especializada en servicios financieros y consultoría empresarial.",
  },
  {
    name: "Chile",
    coordinates: [-70.6693, -33.4489],
    info: "Centro de Operaciones",
    description:
      "Oficina en Santiago de Chile. Centro logístico y de operaciones para la región del Pacífico Sur.",
  },
  {
    name: "Perú",
    coordinates: [-77.0428, -12.0464],
    info: "Sucursal Andina",
    description:
      "Ubicada en Lima, ofrece servicios especializados para el mercado peruano y países andinos vecinos.",
  },
];

export const asiaMarkers: MarkerData[] = [
  {
    name: "Japón",
    coordinates: [139.6917, 35.6895],
    info: "Oficina Asiática Principal",
    description:
      "Sede principal en Tokio. Centro de operaciones para Asia-Pacífico con enfoque en tecnología avanzada y automatización.",
  },
  {
    name: "Singapur",
    coordinates: [103.8198, 1.3521],
    info: "Hub de Innovación",
    description:
      "Centro de innovación y desarrollo en Singapur. Especializado en fintech y soluciones digitales de vanguardia.",
  },
  {
    name: "China",
    coordinates: [116.4074, 39.9042],
    info: "Centro de Desarrollo",
    description:
      "Oficina en Beijing. Centro de desarrollo y manufactura con capacidad para grandes proyectos industriales.",
  },
  {
    name: "India",
    coordinates: [77.209, 28.6139],
    info: "Centro Tecnológico",
    description:
      "Hub tecnológico en Nueva Delhi. Equipo especializado en desarrollo de software y servicios de TI.",
  },
  {
    name: "Corea del Sur",
    coordinates: [126.978, 37.5665],
    info: "Centro de I+D",
    description:
      "Centro de investigación en Seúl. Enfocado en innovación tecnológica y desarrollo de productos de siguiente generación.",
  },
  {
    name: "Tailandia",
    coordinates: [100.5018, 13.7563],
    info: "Oficina Regional",
    description:
      "Ubicada en Bangkok, gestiona operaciones del sudeste asiático con énfasis en logística y distribución.",
  },
];
