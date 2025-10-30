"use client"

import { useEffect, useState } from "react"
import { Zap, Shield } from "lucide-react"
import { Button } from "../components/ui/button"

export function WhyChooseKrediYa({
    phrases = [
        "Compra en más de 1000 comercios aliados",
        "Solicita crédito solo con tu cédula",
        "Crédito rápido y seguro"
    ],
}: { phrases?: string[] }) {
    const [displayedText, setDisplayedText] = useState("")
    const [isDeleting, setIsDeleting] = useState(false)
    const [phraseIndex, setPhraseIndex] = useState(0)

    useEffect(() => {
        const currentPhrase = phrases[phraseIndex % phrases.length] || ""
        const typingSpeed = isDeleting ? 50 : 100
        const pauseTime = 1200

        if (!isDeleting && displayedText === currentPhrase) {
            const pauseTimeout = setTimeout(() => setIsDeleting(true), pauseTime)
            return () => clearTimeout(pauseTimeout)
        }

        if (isDeleting && displayedText === "") {
            setIsDeleting(false)
            setPhraseIndex((prev) => (prev + 1) % phrases.length)
            return
        }

        const timeout = setTimeout(() => {
            setDisplayedText((prev) => {
                if (isDeleting) {
                    return currentPhrase.substring(0, prev.length - 1)
                }
                return currentPhrase.substring(0, prev.length + 1)
            })
        }, typingSpeed)

        return () => clearTimeout(timeout)
    }, [displayedText, isDeleting, phraseIndex, phrases])

    return (
        <section id="hero_banner_autowritting">
            <div id="container_banner_autowritting">
                <div id="grid_banner_autowritting">
                    <div id="left_banner_autowritting">
                        <h1 id="title_banner_autowritting">
                            ¿Por qué elegir KrediYa?
                        </h1>

                        <div id="subtitle_wrap_banner_autowritting">
                            <p id="subtitle_text_banner_autowritting">
                                {displayedText}
                                <span id="subtitle_cursor_banner_autowritting">|</span>
                            </p>
                        </div>

                        <p id="secondary_phrase_banner_autowritting">Fácil, rápido y al instante</p>

                        <div id="cta_wrap_banner_autowritting">
                            <Button
                                size="lg"
                                id="cta_button_banner_autowritting"
                            >
                                Obtén tu crédito Ya
                            </Button>
                        </div>

                        <div id="trust_banner_autowritting">
                            <div className="trust_item_banner_autowritting">
                                <div id="icon_circle_banner_autowritting">
                                    <Zap />
                                </div>
                                <div>
                                    <p className="trust_title_banner_autowritting">Aprobación</p>
                                    <p className="trust_subtitle_banner_autowritting">En minutos</p>
                                </div>
                            </div>
                            <div className="trust_item_banner_autowritting">
                                <div id="icon_circle_banner_autowritting">
                                    <Shield />
                                </div>
                                <div>
                                    <p className="trust_title_banner_autowritting">100% Seguro</p>
                                    <p className="trust_subtitle_banner_autowritting">Datos protegidos</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="right_banner_autowritting">
                        <img id="img_phone_banner_autowritting" src="https://www.krediya.com/hubfs/Im%C3%A1genes%20optimizadas%20en%20web%20-%20Nuevos%20sitios/MOCKUPS_CELULARES_3-removebg-preview.png?width=860&t=1761771570834" alt="Why Choose KrediYa" />
                    </div>
                </div>
            </div>
        </section>
    )
}
