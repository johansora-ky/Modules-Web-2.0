export interface Root {
  card_info: CardInfo[];
  type: string;
}

export interface CardInfo {
  descripcion_simple: string;
  field_group: FieldGroup;
  imagen_card: ImagenCard;
  pop_up_info: PopUpInfo;
  text_field: string;
  titulo?: string;
  url_field: UrlField;
}

export interface FieldGroup {
  banner_desktop: BannerDesktop;
  banner_mobile: BannerMobile;
}

export interface BannerDesktop {
  alt: string | null;
  loading: "eager" | "lazy";
  size_type: string;
  src: string;
  height?: number;
  width?: number;
  max_height?: number;
  max_width?: number;
}

export interface BannerMobile {
  alt: string | null;
  loading: "eager" | "lazy";
  size_type: string;
  src: string;
  height?: number;
  width?: number;
  max_height?: number;
  max_width?: number;
}

export interface ImagenCard {
  alt: string | null;
  loading: "eager" | "lazy";
  size_type: string;
  src: string;
}

export interface PopUpInfo {
  descripcion_completa: string;
  t_c: string;
  banner_desktop: BannerDesktop;
  banner_mobile: BannerMobile;
}

export interface UrlField {
  content_id: number;
  href: string;
  href_with_scheme: string | null;
  type: string;
}
