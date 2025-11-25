import { useState } from "react";
import { PromoCard } from "./PromoCard";
import { PromoModal } from "./PromoModal";
import type { CardInfo } from "@/lib/types";

interface PromotionsGridProps {
  cards: CardInfo[];
}

export const PromotionsGrid = ({ cards }: PromotionsGridProps) => {
  const [selectedCard, setSelectedCard] = useState<CardInfo | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  console.log(cards);

  const handleCardClick = (card: CardInfo) => {
    setSelectedCard(card);
    setModalOpen(true);
  };

  return (
    <>
      <div id="grid_container_page_promociones">
        <div id="grid_wrapper_page_promociones">
          {cards.map((card, index) => (
            <PromoCard
              key={card.url_field?.content_id || index}
              card={card}
              onClick={() => handleCardClick(card)}
            />
          ))}
        </div>
      </div>

      <PromoModal
        card={selectedCard}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  );
};
