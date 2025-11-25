import {
  FloatingCommunicationsButton,
  type CommunicationChannel,
} from "@/components/ui/floating-communications-button";

import "./App.css";

const communicationChannels: CommunicationChannel[] = [
  {
    id: "whatsapp",
    title: "WhatsApp",
    description: "Chatea con un asesor y recibe respuesta inmediata",
    icon: "https://www.krediya.com/hubfs/Iconos%203D/Whats.png?width=860&t=1763739475868",
    badge: "Activo",
    type: "link",
    href: "https://wa.me/573001112233?text=Hola%20KrediYa",
  },
  {
    id: "form",
    title: "Formulario",
    description: "Déjanos tus datos y te contactamos en minutos",
    icon: "https://www.krediya.com/hubfs/Iconos%203D/Gemini_Generated_Image_tc4lxgtc4lxgtc4l-removebg-preview.png?width=860&t=1763739475868",
    type: "embed",
    embedMode: "hubspot",
    embedTitle: "Formulario HubSpot",
    hubspot: {
      portalId: "22317019",
      formId: "e5c2007a-9700-49ff-82a3-64386a722151",
      region: "na1",
    },
  },
];

function App() {
  return (
    <FloatingCommunicationsButton
      channels={communicationChannels}
      icon="https://www.krediya.com/hubfs/Iconos%203D/ContactUS.png?width=860&t=1763739476143"
    />
  );
}

export default App;
