"use client"

import { useEffect, useRef, useState } from "react"

interface Metric {
  id: string
  value: number
  prefix: string
  suffix: string
  label: string
  icon: string
  color: "blue" | "red"
  delay: number
}

const metrics: Metric[] = [
  {
    id: "countries",
    value: 7,
    prefix: "",
    suffix: "",
    label: "Presencia en países",
    icon: "https://www.krediya.com/hubfs/Iconos%203D/ICONO%2010%20300X300Px-1.png?width=860&t=1763656601127",
    color: "red",
    delay: 100,
  },
  {
    id: "clients",
    value: 2000000,
    prefix: "+",
    suffix: "M",
    label: "Créditos desembolsados",
    icon: "https://www.krediya.com/hubfs/Iconos%203D/Mejor%20tarifario%20de%20env%C3%ADos%20300X300PX.png?width=860&t=1763654898351",
    color: "blue",
    delay: 0,
  },
  {
    id: "credits",
    value: 4000,
    prefix: "+",
    suffix: "K",
    label: "Aliados estratégicos",
    icon: "https://www.krediya.com/hubfs/Iconos%203D/M%C3%A1s%20de%204000%20Aliados%20estrat%C3%A9gicos%20300X300PX%20MAG.png?width=860&t=1763654898264",
    color: "red",
    delay: 200,
  },
  {
    id: "merchants",
    value: 10000,
    prefix: "+",
    suffix: "K",
    label: "Comercios aliados",
    icon: "https://www.krediya.com/hubfs/Iconos%203D/M%C3%A1s%20de%2010.000%20Comercios%20aliados%20300X300PX.png?width=860&t=1763654898193",
    color: "blue",
    delay: 300,
  },
]

function AnimatedCounter({
  value,
  prefix,
  suffix,
  duration = 2000,
}: {
  value: number
  prefix: string
  suffix: string
  duration?: number
}) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(easeOutQuart * value)

      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [isVisible, value, duration])

  const formatNumber = (num: number) => {
    if (suffix === "M") {
      return (num / 1000000).toFixed(1)
    }
    if (suffix === "K") {
      return (num / 1000).toFixed(0)
    }
    return num.toString()
  }

  return (
    <div ref={ref} id="counter_value_counter_modern_krdy">
      {prefix}
      {formatNumber(count)}
      {suffix}
    </div>
  )
}

export function ModernMetrics() {
  return (
    <section id="hero_counter_modern_krdy">
      <div id="hero_line_counter_modern_krdy" />

      <div id="container_counter_modern_krdy">
        <div id="header_counter_modern_krdy">
          <h2 id="title_counter_modern_krdy">
            <span id="title_gradient_counter_modern_krdy">Impulsando el futuro financiero</span>
          </h2>
          <p id="subtitle_counter_modern_krdy">
            Únete a la mayor red de aliados comerciales de todo el país y aumenta tus ventas
          </p>
        </div>

        <div id="grid_counter_modern_krdy">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className={`metric_card_counter_modern_krdy metric_${metric.color}_counter_modern_krdy`}
              style={{ animationDelay: `${metric.delay}ms` }}
            >
              <div className="metric_card_overlay_counter_modern_krdy" />

              <div id="card_inner_counter_modern_krdy">
                <div className="metric_icon_wrap_counter_modern_krdy">
                  <img src={metric.icon} alt={metric.label} />
                </div>

                <div className={`metric_value_counter_modern_krdy metric_${metric.color}_counter_modern_krdy`}>
                  <AnimatedCounter value={metric.value} prefix={metric.prefix} suffix={metric.suffix} />
                </div>

                <p className="metric_label_counter_modern_krdy">{metric.label}</p>

                <div className="metric_separator_counter_modern_krdy" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
