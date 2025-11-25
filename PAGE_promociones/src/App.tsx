import { PromotionsGrid } from "@/components/PromotionsGrid";
import { promotionsData } from "@/data/promotions";
import "./styles.css";
import type { CardInfo } from "@/lib/types";

export default function App({ cards }: { cards?: CardInfo[] }) {
  const allCards = cards ? [...promotionsData.card_info, ...cards] : promotionsData.card_info;

  return (
    <div id="app_container_page_promociones">
      <div id="app_content_page_promociones">
        <header id="app_header_page_promociones">
          <h1 id="app_title_page_promociones">
            Promociones KrediYA
          </h1>
          <p id="app_subtitle_page_promociones">
            Descubre las mejores ofertas y promociones exclusivas que tenemos para ti
          </p>
        </header>

        <PromotionsGrid cards={allCards} />
      </div>
      <span id="app_gradient_page_promociones" />
    </div>
  );
};

