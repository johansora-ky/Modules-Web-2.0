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
    <div className="relative w-full lg:max-w-3xl mx-auto lg:px-0 px-2">
      {/* Vertical progress line */}
      <div className="absolute lg:left-6 left-4 top-0 bottom-0 lg:w-1 w-0.5 bg-gradient-to-b from-[#E10623] via-[#E10623] to-[#004EBC] opacity-30" />
      <div
        className="absolute lg:left-6 left-4 top-0 lg:w-1 w-0.5 bg-gradient-to-b from-[#E10623] to-[#004EBC] transition-all duration-1000 ease-in-out"
        style={{
          height: `${((activeStep + 1) / steps.length) * 100}%`,
        }}
      />

      {/* Steps container */}
      <div className="lg:space-y-8 space-y-4">
        {steps.map((step, index) => {
          const isActive = index === activeStep;
          const isEvenStep = step.number % 2 === 0;
          const stepColor = isEvenStep ? secondaryColor : primaryColor;
          const isRed = !isEvenStep;

          const bgGradient = isRed
            ? "bg-gradient-to-br from-red-50 to-red-100/50"
            : "bg-gradient-to-br from-blue-50 to-blue-100/50";

          return (
            <div
              key={step.number}
              className={`relative flex lg:gap-6 gap-3 items-start transition-all duration-500 ${
                isActive ? "opacity-100" : "opacity-40"
              }`}
              onClick={() => setActiveStep(index)}
              role="button"
              tabIndex={0}
            >
              {/* Number circle */}
              <div className="relative z-10 flex-shrink-0">
                <div
                  className={`lg:w-14 lg:h-14 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold lg:text-lg text-sm shadow-lg lg:ring-4 ring-2 ring-white transition-all duration-500 ${
                    isActive
                      ? "lg:scale-125 scale-110 lg:shadow-2xl shadow-xl"
                      : "scale-100 opacity-50"
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

              {/* Content card */}
              <div
                className={`flex-1 lg:p-6 p-3 lg:rounded-2xl rounded-xl border-2 transition-all duration-500 ${
                  isActive
                    ? `border-[${stepColor}] ${bgGradient} lg:shadow-xl shadow-lg`
                    : "border-gray-200 bg-gray-100 shadow-sm"
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
                <h3
                  className={`lg:text-2xl text-base font-bold lg:mb-2 mb-1 transition-all duration-500 ${
                    isActive ? "scale-105" : "scale-95"
                  }`}
                  style={{
                    color: isActive ? stepColor : "#9ca3af",
                    transformOrigin: "left",
                  }}
                >
                  Step {step.number}: {step.title}
                </h3>
                <p
                  className={`lg:text-base text-sm transition-all duration-500 ${
                    isActive ? "text-gray-700" : "text-gray-400"
                  }`}
                >
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress indicators - only on desktop */}
      <div className="lg:flex hidden justify-center gap-2 mt-12">
        {steps.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveStep(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeStep ? "w-8 bg-[#E10623]" : "w-2 bg-gray-300"
            }`}
            aria-label={`Go to step ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
