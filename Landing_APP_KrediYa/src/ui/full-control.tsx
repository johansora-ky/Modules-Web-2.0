"use client";

import { useEffect, useRef } from "react";

export default function FullControl() {
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
    <section id="full_control_section_landing_app_krediya">
      <div id="full_control_container_landing_app_krediya">
        <div id="full_control_grid_landing_app_krediya">
          {/* Left Content */}
          <div id="full_control_content_landing_app_krediya">
            <div id="full_control_header_landing_app_krediya">
              <span id="full_control_badge_landing_app_krediya">
                Control Total
              </span>
              <h2 id="full_control_title_landing_app_krediya">
                Todo desde tu celular
              </h2>
              <p id="full_control_description_landing_app_krediya">
                Administra créditos, pagos y saldo desde un solo lugar. Más
                control, menos complicaciones.
              </p>
            </div>

            <div id="full_control_list_landing_app_krediya">
              {[
                "Pide hasta $500 USD y recíbelos en  menos de 24 horas.",
                "Envía, recibe dinero y compra con aprobación inmediata en mas de 100 comercios.",
                "Controla tus pagos y movimientos al instante.",
                "Aprende a manejar mejor tu dinero.",
              ].map((item, index) => (
                <div
                  key={index}
                  className="full_control_list_item_landing_app_krediya"
                >
                  <div id="full_control_list_icon_landing_app_krediya">✓</div>
                  <span id="full_control_list_text_landing_app_krediya">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Phone Mockup */}
          <div id="full_control_phone_container_landing_app_krediya">
            <div
              ref={phoneRef}
              id="full_control_phone_animation_landing_app_krediya"
            >
              <img
                src="https://www-krediya-com.sandbox.hs-sites.com/hs-fs/hubfs/MOCKUPS%20CELULARES.jpg?width=338&height=511&name=MOCKUPS%20CELULARES.jpg"
                alt="KrediYa App Mockup"
                id="full_control_phone_img_landing_app_krediya"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
