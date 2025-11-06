"use client";

import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Subtle floating animation
    const animation = setInterval(() => {
      if (phoneRef.current) {
        phoneRef.current.style.transform = "translateY(0px)";
        setTimeout(() => {
          if (phoneRef.current) {
            phoneRef.current.style.transform = "translateY(-10px)";
          }
        }, 1000);
      }
    }, 2000);

    return () => clearInterval(animation);
  }, []);

  return (
    <section id="hero_section_landing_app_krediya">
      {/* Background decoration */}
      <div id="hero_bg_decoration_1_landing_app_krediya" />
      <div id="hero_bg_decoration_2_landing_app_krediya" />

      <div id="hero_content_landing_app_krediya">
        <div id="hero_badge_landing_app_krediya">
          <span id="hero_badge_text_landing_app_krediya">
            La revolución fintech
          </span>
        </div>

        <h1 id="hero_title_landing_app_krediya">
          Descubre la nueva app de KrediYA
        </h1>

        <p id="hero_subtitle_landing_app_krediya">
          Tu portafolio financiero en un solo lugar
        </p>

        <div id="hero_badges_container_landing_app_krediya">
          <a
            href="https://apps.apple.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hero_badge_link_landing_app_krediya"
          >
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="Download on the App Store"
              className="hero_badge_img_landing_app_krediya"
            />
          </a>
          <a
            href="https://play.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hero_badge_link_landing_app_krediya"
          >
            <img
              src="https://www.krediya.com/hubfs/sourceweb/Kredicash/GetItOnGooglePlay_Badge_Web_color_Spanish-LATAM.png?width=860&t=1762376828528"
              alt="Get it on Google Play"
              className="hero_badge_img_landing_app_krediya"
            />
          </a>
        </div>

        {/* Phone Mockup */}
        <div id="hero_phone_container_landing_app_krediya">
          <div ref={phoneRef} id="hero_phone_animation_landing_app_krediya">
            <img
              src="https://www.krediya.com/hubfs/Im%C3%A1genes%20optimizadas%20en%20web%20-%20Nuevos%20sitios/MOCKUPS_CELULARES_3-removebg-preview.png?width=860&t=1761771570834"
              alt="KrediYa App Mockup"
              id="hero_phone_img_landing_app_krediya"
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div id="hero_scroll_indicator_landing_app_krediya">
        <ChevronDown id="hero_scroll_icon_landing_app_krediya" size={24} />
      </div>
    </section>
  );
}
