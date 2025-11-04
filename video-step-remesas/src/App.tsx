import StepTimeline from "@/ui/step-timeline";
import ReactPlayer from "react-player";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function App() {
  const steps = [
    {
      number: 1,
      title: "Encuentra tu agente remesador más cercano",
      description:
        "Localiza el punto autorizado más próximo y comienza tu envío en minutos.",
    },
    {
      number: 2,
      title: "Registra tus datos de forma segura",
      description:
        "Ingresa tu información básica — rápido, confiable y protegido.",
    },
    {
      number: 3,
      title: "Presenta tu documento y el monto a transferir",
      description: "Entrega tu identificación y define cuánto deseas enviar.",
    },
    {
      number: 4,
      title: "Envía y recibe al instante",
      description:
        "Tu dinero llega en segundos, sin complicaciones y con total respaldo",
    },
  ];

  const isMobile = useIsMobile(1024);

  return (
    <div
      className={`min-h-screen bg-white text-gray-900 ${
        isMobile ? "py-8 px-4" : "py-16 px-4 w-[70%] mx-auto"
      }`}
    >
      <div className="mx-auto">
        {/* Desktop Layout */}
        {!isMobile && (
          <div className="flex gap-10">
            <div
              className={`w-[60%] transition-opacity duration-700 ease-in-out flex items-center justify-center`}
              style={{ animation: "fadeIn 0.7s ease-in-out" }}
            >
              <StepTimeline
                steps={steps}
                primaryColor="#E10623"
                secondaryColor="#004EBC"
                autoProgress={true}
                progressInterval={3000}
              />
            </div>
            <div className="flex justify-center w-[40%] items-center relative overflow-hidden rounded-2xl">
              <ReactPlayer
                src="https://22317019.fs1.hubspotusercontent-na1.net/hubfs/22317019/remesas%202.mp4"
                loop
                playing={true}
                width="auto"
                height="auto"
              />
            </div>
          </div>
        )}

        {/* Mobile Layout */}
        {isMobile && (
          <div className="flex flex-col">
            <div className="w-full overflow-hidden rounded-2xl mb-4">
              <ReactPlayer
                src="https://22317019.fs1.hubspotusercontent-na1.net/hubfs/22317019/remesas%202.mp4"
                width="100%"
                height="auto"
                controls={true}
              />
            </div>

            <StepTimeline
              steps={steps}
              primaryColor="#E10623"
              secondaryColor="#004EBC"
              autoProgress={true}
              progressInterval={3000}
            />
          </div>
        )}
      </div>
    </div>
  );
}
