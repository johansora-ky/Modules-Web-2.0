"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Users, Globe, CreditCard, Store } from "lucide-react"

interface Metric {
  id: string
  value: number
  prefix: string
  suffix: string
  label: string
  icon: React.ReactNode
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
    icon: <Globe />,
    color: "red",
    delay: 100,
  },
  {
    id: "clients",
    value: 2000000,
    prefix: "+",
    suffix: "M",
    label: "Créditos desembolsados",
    icon: <Users />,
    color: "blue",
    delay: 0,
  },
  {
    id: "credits",
    value: 4000,
    prefix: "+",
    suffix: "K",
    label: "Aliados estratégicos",
    icon: <CreditCard />,
    color: "red",
    delay: 200,
  },
  {
    id: "merchants",
    value: 10000,
    prefix: "+",
    suffix: "K",
    label: "Comercios aliados",
    icon: <Store />,
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
                  {metric.icon}
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
