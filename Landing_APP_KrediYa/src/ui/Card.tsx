import React from "react";

export interface CardProps {
  image_field: ImageField;
  richtext_field: string;
  text_field: string;
}

export interface ImageField {
  alt: string;
  height: number;
  loading: string;
  max_height: number;
  max_width: number;
  size_type: string;
  src: string;
  width: number;
}

export const Card: React.FC<CardProps> = ({
  text_field,
  richtext_field,
  image_field,
}: CardProps) => {
  return (
    <section className="card-grid-cards-effect-appear">
      <div className="icon-container-grid-cards-effect-appear">
        {image_field ? (
          <img
            src={image_field.src}
            className="card_icon_img_landing_app_krediya"
            alt={image_field.alt}
          />
        ) : (
          <svg
            viewBox="0 0 16 16"
            className="bi bi-image-fill"
            fill="currentColor"
            height="40"
            width="40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V3zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z"></path>
          </svg>
        )}
        <div>
          <p className="card_title_landing_app_krediya">
            {text_field || "Card Title"}
          </p>
        </div>
      </div>

      {/* Clickable indicator - positioned absolutely */}
      <div className="clickable-indicator-grid-cards-effect-appear">
        {/* Desktop SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="transparent"
          stroke="#ffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="hidden md:block pulse-animation"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M3 12l3 0" />
          <path d="M12 3l0 3" />
          <path d="M7.8 7.8l-2.2 -2.2" />
          <path d="M16.2 7.8l2.2 -2.2" />
          <path d="M7.8 16.2l-2.2 2.2" />
          <path d="M12 12l9 3l-4 2l-2 4l-3 -9" />
        </svg>

        {/* Mobile SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="aliceblue"
          stroke="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="block md:hidden pulse-animation text-white"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M8 13v-8.5a1.5 1.5 0 0 1 3 0v7.5" />
          <path d="M11 11.5v-2a1.5 1.5 0 0 1 3 0v2.5" />
          <path d="M14 10.5a1.5 1.5 0 0 1 3 0v1.5" />
          <path d="M17 11.5a1.5 1.5 0 0 1 3 0v4.5a6 6 0 0 1 -6 6h-2h.208a6 6 0 0 1 -5.012 -2.7l-.196 -.3c-.312 -.479 -1.407 -2.388 -3.286 -5.728a1.5 1.5 0 0 1 .536 -2.022a1.867 1.867 0 0 1 2.28 .28l1.47 1.47" />
          <path d="M5 3l-1 -1" />
          <path d="M4 7h-1" />
          <path d="M14 3l1 -1" />
          <path d="M15 6h1" />
        </svg>
      </div>

      <div className="card__content-grid-cards-effect-appear">
        <p className="card__title-grid-cards-effect-appear">
          {text_field || "Card Title"}
        </p>
        <div
          className="card__description-grid-cards-effect-appear"
          dangerouslySetInnerHTML={{
            __html: richtext_field || "Card Description",
          }}
        />
      </div>
    </section>
  );
};
