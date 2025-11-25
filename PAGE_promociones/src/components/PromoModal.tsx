import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { CardInfo } from "@/lib/types";
import { X } from "lucide-react";

interface PromoModalProps {
    card: CardInfo | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const PromoModal = ({ card, open, onOpenChange }: PromoModalProps) => {
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onOpenChange(false);
            }
        };

        if (open) {
            document.addEventListener("keydown", handleEscape);
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [open, onOpenChange]);

    if (!card || !open || !mounted) return null;

    // Determine which banner to use based on screen size - use pop_up_info banners
    const bannerSrc = isMobile
        ? card.pop_up_info.banner_mobile.src
        : card.pop_up_info.banner_desktop.src;

    const bannerAlt = isMobile
        ? card.pop_up_info.banner_mobile.alt
        : card.pop_up_info.banner_desktop.alt;

    const bannerLoading = isMobile
        ? card.pop_up_info.banner_mobile.loading
        : card.pop_up_info.banner_desktop.loading;

    return createPortal(
        <>
            <div
                className="modal_overlay_page_promociones"
                onClick={() => onOpenChange(false)}
            />
            <div
                className="modal_content_page_promociones"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Banner Section */}
                <div className="modal_banner_page_promociones">
                    <img
                        src={bannerSrc}
                        alt={bannerAlt || card.text_field || card.titulo || ""}
                        loading={bannerLoading as "eager" | "lazy"}
                        className="modal_banner_image_page_promociones"
                    />
                </div>

                {/* Close Button */}
                <button
                    className="modal_close_button_page_promociones"
                    onClick={() => onOpenChange(false)}
                >
                    <X className="modal_close_icon_page_promociones" />
                    <span className="sr_only_page_promociones">Close</span>
                </button>

                {/* Content Section */}
                <div className="modal_scroll_area_page_promociones">
                    <div className="modal_scroll_content_page_promociones">
                        <div className="modal_header_page_promociones">
                            <h2 className="modal_title_page_promociones">
                                {card.titulo || card.text_field}
                            </h2>
                        </div>

                        <div className="modal_body_page_promociones">
                            {/* Full Description */}
                            <div className="modal_section_page_promociones">
                                <h4 className="modal_section_title_page_promociones">
                                    Descripción
                                </h4>
                                <span className="modal_section_text_page_promociones" dangerouslySetInnerHTML={{ __html: card.pop_up_info.descripcion_completa }} />
                            </div>

                            {/* Terms and Conditions */}
                            <div className="modal_section_page_promociones modal_terms_section_page_promociones">
                                <h4 className="modal_section_title_page_promociones">
                                    Términos y Condiciones
                                </h4>
                                <span className="modal_terms_text_page_promociones" dangerouslySetInnerHTML={{ __html: card.pop_up_info.t_c }} />
                            </div>

                            {/* CTA Button */}
                            <div className="modal_cta_container_page_promociones">
                                {card.url_field?.href ? (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            window.open(card.url_field.href, '_blank', 'noopener,noreferrer');
                                            onOpenChange(false);
                                        }}
                                        className="button_page_promociones button_primary_page_promociones button_full_page_promociones"
                                    >
                                        Ir YA
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => onOpenChange(false)}
                                        className="button_page_promociones button_primary_page_promociones button_full_page_promociones"
                                    >
                                        Cerrar
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>,
        document.body
    );
};

