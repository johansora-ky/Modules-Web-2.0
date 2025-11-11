"use client";

import { useEffect, useState } from "react";
import "../countdown-navidad.css";

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

export default function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [countdown, setCountdown] = useState<CountdownState>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isComplete: false,
  });

  useEffect(() => {
    const calculateCountdown = () => {
      // Create target date at midnight local time
      const [datePart] = targetDate.split("T");
      const [year, month, day] = datePart.split("-").map(Number);
      const target = new Date(year, month - 1, day, 0, 0, 0, 0).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isComplete: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setCountdown({
        days,
        hours,
        minutes,
        seconds,
        isComplete: false,
      });
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (countdown.isComplete) {
    return (
      <div className="countdown_navidad_complete_container">
        <h2 className="countdown_navidad_complete_title">
          ¡Llegó el gran día!
        </h2>
        <p className="countdown_navidad_complete_text">
          Descubre lo nuevo de KrediYa
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="countdown_navidad_timer_grid">
        {[
          { value: countdown.days, label: "Días", key: "days" },
          { value: countdown.hours, label: "Horas", key: "hours" },
          { value: countdown.minutes, label: "Minutos", key: "minutes" },
          { value: countdown.seconds, label: "Segundos", key: "seconds" },
        ].map((item) => (
          <CountdownBox key={item.key} value={item.value} label={item.label} />
        ))}
      </div>
    </div>
  );
}

function CountdownBox({ value, label }: { value: number; label: string }) {
  const [prevValue, setPrevValue] = useState(value);

  useEffect(() => {
    if (prevValue !== value) {
      setPrevValue(value);
    }
  }, [value, prevValue]);

  const hasChanged = prevValue !== value;

  return (
    <div className="countdown_navidad_box_container">
      <div className="countdown_navidad_box_glow"></div>

      <div className="countdown_navidad_box">
        {/* Top gradient accent */}
        <div className="countdown_navidad_box_top_accent"></div>

        {/* Background accent circles */}
        <div className="countdown_navidad_box_circle_top"></div>
        <div className="countdown_navidad_box_circle_bottom"></div>

        {/* Content */}
        <div className="countdown_navidad_box_content">
          <div
            className={`countdown_navidad_box_value ${
              hasChanged ? "scale_110" : "scale_100"
            }`}
          >
            {String(value).padStart(2, "0")}
          </div>

          {/* Label with enhanced styling */}
          <p className="countdown_navidad_box_label">{label}</p>
        </div>

        {/* Bottom accent line on hover */}
        <div className="countdown_navidad_box_bottom_accent"></div>
      </div>
    </div>
  );
}
