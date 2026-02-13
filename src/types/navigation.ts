export type Page = "beranda" | "favorit" | "infaq" | "amal" | "profil";

export interface NavItem {
  id: Page;
  icon: string;
  label: string;
}

export type FavTab = "masjid" | "ustadz" | "kajian";
