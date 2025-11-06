"use client";

import { Smartphone, Lock, Zap, Check } from "lucide-react";

export default function FinalCTA() {
  return (
    <section id="final_cta_section_landing_app_krediya">
      {/* Decorative elements */}
      <div id="final_cta_bg_1_landing_app_krediya" />
      <div id="final_cta_bg_2_landing_app_krediya" />

      <div id="final_cta_container_landing_app_krediya">
        <h2 id="final_cta_title_landing_app_krediya">
          Descarga hoy la nueva App KrediYa
        </h2>

        <p id="final_cta_subtitle_landing_app_krediya">
          Lleva el control de tus finanzas en tu bolsillo, Fácil rápido y seguro
          con KrediYA.
        </p>

        {/* App Store Buttons */}
        <div id="final_cta_badges_container_landing_app_krediya">
          <a
            href="https://apps.apple.com"
            target="_blank"
            rel="noopener noreferrer"
            className="final_cta_badge_link_landing_app_krediya"
          >
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="Download on the App Store"
              className="final_cta_badge_img_landing_app_krediya"
            />
          </a>
          <a
            href="https://play.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="final_cta_badge_link_landing_app_krediya"
          >
            <img
              src="https://www.krediya.com/hubfs/sourceweb/Kredicash/GetItOnGooglePlay_Badge_Web_color_Spanish-LATAM.png?width=860&t=1762376828528"
              alt="Get it on Google Play"
              className="final_cta_badge_img_landing_app_krediya"
            />
          </a>
        </div>

        {/* App Store Icons */}
        <div id="final_cta_icons_container_landing_app_krediya">
          <div className="final_cta_icon_item_landing_app_krediya">
            <div id="final_cta_icon_wrapper_landing_app_krediya">
              <Smartphone
                size={48}
                className="final_cta_icon_lucide_landing_app_krediya"
              />
            </div>
            <p className="final_cta_icon_text_landing_app_krediya">
              iOS & Android
            </p>
          </div>
          <div className="final_cta_icon_item_landing_app_krediya">
            <div
              id="final_cta_icon_wrapper_landing_app_krediya"
              className="final_cta_icon_wrapper_landing_app_krediya"
            >
              <Lock
                size={48}
                className="final_cta_icon_lucide_landing_app_krediya"
              />
            </div>
            <p className="final_cta_icon_text_landing_app_krediya">
              Seguridad garantizada
            </p>
          </div>
          <div className="final_cta_icon_item_landing_app_krediya">
            <div
              id="final_cta_icon_wrapper_landing_app_krediya"
              className="final_cta_icon_wrapper_landing_app_krediya"
            >
              <Zap
                size={48}
                className="final_cta_icon_lucide_landing_app_krediya"
              />
            </div>
            <p className="final_cta_icon_text_landing_app_krediya">
              Descarga instantánea
            </p>
          </div>
        </div>

        {/* Trust Badge */}
        <div id="final_cta_trust_badge_landing_app_krediya">
          <Check
            size={20}
            className="final_cta_icon_lucide_landing_app_krediya"
          />
          <span id="final_cta_trust_text_landing_app_krediya">
            Más de 500K usuarios confían en KrediYa
          </span>
        </div>
      </div>
    </section>
  );
}
