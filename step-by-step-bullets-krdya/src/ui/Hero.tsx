"use client";

import { useEffect, useState } from "react";
import { FileText, Zap, DollarSign } from "lucide-react";
import "./Hero.css";

export function HeroSection() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      icon: FileText,
      title: "Solicita en línea",
      step: 1,
    },
    {
      icon: Zap,
      title: "Aprobamos en minutos",
      step: 2,
    },
    {
      icon: DollarSign,
      title: "Recibe tu dinero",
      step: 3,
    },
  ];

  return (
    <section id="section_step_by_step_bullets_krdya">
      <div id="container_step_by_step_bullets_krdya">
        <div id="max_wrapper_step_by_step_bullets_krdya">
          {/* Header */}
          <div id="header_wrapper_step_by_step_bullets_krdya">
            <h1 id="title_step_by_step_bullets_krdya">
              ¿Necesitas un préstamo de Cash?
            </h1>
            <p id="subtitle_step_by_step_bullets_krdya">
              Completa tu solicitud, aprueba al instante y obtén hasta{" "}
              <b>$500</b> en menos de <b>24 horas</b>!
            </p>
          </div>

          {/* Timeline */}
          <div id="timeline_container_step_by_step_bullets_krdya">
            {/* Horizontal timeline (desktop/tablet) */}
            <div id="timeline_horizontal_step_by_step_bullets_krdya">
              <div
                id="timeline_progress_horizontal_step_by_step_bullets_krdya"
                style={{ width: `${((activeStep + 1) / 3) * 100}%` }}
              >
                {/* Glowing effect */}
                <div id="timeline_glow_horizontal_step_by_step_bullets_krdya" />
              </div>
            </div>

            {/* Vertical timeline (mobile) */}
            <div id="timeline_vertical_step_by_step_bullets_krdya">
              <div
                id="timeline_progress_vertical_step_by_step_bullets_krdya"
                style={{ height: `${((activeStep + 1) / 3) * 100}%` }}
              >
                {/* Glowing effect */}
                <div id="timeline_glow_vertical_step_by_step_bullets_krdya" />
              </div>
            </div>

            {/* Steps */}
            <div id="steps_container_step_by_step_bullets_krdya">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index <= activeStep;
                return (
                  <div
                    key={index}
                    id={`step_item_${index + 1}_step_by_step_bullets_krdya`}
                    className="step_item_step_by_step_bullets_krdya"
                  >
                    {/* Icon circle */}
                    <div
                      className={`icon_circle_step_by_step_bullets_krdya ${
                        isActive
                          ? "icon_circle_active_step_by_step_bullets_krdya"
                          : ""
                      }`}
                    >
                      <Icon
                        className={`icon_step_by_step_bullets_krdya ${
                          isActive
                            ? "icon_active_step_by_step_bullets_krdya"
                            : ""
                        }`}
                      />
                      {isActive && (
                        <div className="icon_ping_step_by_step_bullets_krdya" />
                      )}
                    </div>

                    {/* Step text */}
                    <p
                      className={`step_text_step_by_step_bullets_krdya ${
                        isActive
                          ? "step_text_active_step_by_step_bullets_krdya"
                          : "step_text_inactive_step_by_step_bullets_krdya"
                      }`}
                    >
                      {step.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
