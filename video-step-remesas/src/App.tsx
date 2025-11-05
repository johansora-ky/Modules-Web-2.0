import StepTimeline from "@/ui/step-timeline";
// import ReactPlayer from "react-player";
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
      id={
        isMobile
          ? "app_mobile_video_step_remesas"
          : "app_desktop_video_step_remesas"
      }
    >
      <div id="container_video_step_remesas">
        {!isMobile && (
          <div id="layout_desktop_video_step_remesas">
            <div
              id="timeline_col_video_step_remesas"
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
            <div
              id="video_col_video_step_remesas"
              style={{ animation: "fadeIn 0.7s ease-in-out" }}
            >
              <video
                src="https://22317019.fs1.hubspotusercontent-na1.net/hubfs/22317019/remesas%202.mp4"
                loop
                autoPlay
                controls
                playsInline
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>
        )}

        {isMobile && (
          <div id="layout_mobile_video_step_remesas">
            <div id="video_mobile_wrapper_video_step_remesas">
              <video
                src="https://22317019.fs1.hubspotusercontent-na1.net/hubfs/22317019/remesas%202.mp4"
                controls
                playsInline
                style={{ width: "100%", height: "auto" }}
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
