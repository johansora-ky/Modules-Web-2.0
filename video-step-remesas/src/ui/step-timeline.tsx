"use client";

import { useState, useEffect } from "react";

export interface TimelineStep {
  number: number;
  title: string;
  description: string;
}

interface StepTimelineProps {
  steps: TimelineStep[];
  primaryColor?: string;
  secondaryColor?: string;
  autoProgress?: boolean;
  progressInterval?: number;
}

export default function StepTimeline({
  steps,
  primaryColor = "#E10623",
  secondaryColor = "#004EBC",
  autoProgress = true,
  progressInterval = 3000,
}: StepTimelineProps) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!autoProgress) return;

    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, progressInterval);

    return () => clearInterval(timer);
  }, [autoProgress, progressInterval, steps.length]);

  return (
    <div id="step_timeline_container_video_step_remesas">
      <div className="step_list_video_step_remesas">
        {steps.map((step, index) => {
          const isActive = index === activeStep;
          const isEvenStep = step.number % 2 === 0;
          const stepColor = isEvenStep ? secondaryColor : primaryColor;
          const isRed = !isEvenStep;

          return (
            <div
              key={step.number}
              className={`step_item_video_step_remesas ${
                isActive ? "is_active_video_step_remesas" : ""
              }`}
              onClick={() => setActiveStep(index)}
              role="button"
              tabIndex={0}
            >
              <div className="step_number_wrapper_video_step_remesas">
                <div
                  className={`step_number_video_step_remesas ${
                    isActive ? "is_active_video_step_remesas" : ""
                  }`}
                  style={{
                    backgroundColor: stepColor,
                    boxShadow: isActive
                      ? `0 0 15px ${stepColor}, 0 0 30px ${stepColor}`
                      : undefined,
                  }}
                >
                  {step.number}
                </div>
              </div>
              <div
                className={`step_card_video_step_remesas ${
                  isActive ? "is_active_video_step_remesas" : ""
                }`}
                style={{
                  borderColor: isActive ? stepColor : "#e5e7eb",
                  backgroundColor: isActive
                    ? isRed
                      ? "rgba(225, 6, 35, 0.05)"
                      : "rgba(0, 78, 188, 0.05)"
                    : "#f3f4f6",
                }}
              >
                <span
                  className={`step_title_video_step_remesas ${
                    isActive ? "is_active_video_step_remesas" : ""
                  }`}
                  style={{
                    color: isActive ? stepColor : "#9ca3af",
                    transformOrigin: "left",
                  }}
                >
                  {step.title}
                </span>
                <span
                  className={`step_desc_video_step_remesas ${
                    isActive ? "is_active_video_step_remesas" : ""
                  }`}
                >
                  {step.description}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
