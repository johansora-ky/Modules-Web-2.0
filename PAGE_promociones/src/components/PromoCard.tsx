import type { CardInfo } from "@/lib/types";

interface PromoCardProps {
  card: CardInfo;
  onClick: () => void;
}

export const PromoCard = ({ card, onClick }: PromoCardProps) => {
  return (
    <div className="card_page_promociones">
      {/* Image Section */}
      <div className="card_image_container_page_promociones">
        <img
          src={card.imagen_card.src}
          alt={card.imagen_card.alt || card.titulo || card.text_field || ""}
          loading={card.imagen_card.loading}
          className="card_image_page_promociones"
        />
      </div>

      {/* Description Section */}
      <div className="card_content_page_promociones">
        <div className="card_text_container_page_promociones">
          <h3 className="card_title_page_promociones">
            {card.text_field}
          </h3>
          <p className="card_description_page_promociones">
            {card.descripcion_simple}
          </p>
        </div>

        <div className="card_buttons_container_page_promociones">
          <button
            onClick={onClick}
            className="button_page_promociones button_ghost_page_promociones button_sm_page_promociones"
          >
            Ver más
          </button>
          {card.url_field?.href && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open(card.url_field.href, '_blank', 'noopener,noreferrer');
              }}
              className="button_page_promociones button_primary_page_promociones button_sm_page_promociones"
            >
              Ir a la landing
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

