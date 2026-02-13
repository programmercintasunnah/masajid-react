export type Page = "beranda" | "favorit" | "infaq" | "amal" | "profil";
export type FavTab = "masjid" | "ustadz" | "kajian";

export interface PrayerTime {
  name: string;
  time: string;
  icon: string;
  active?: boolean;
}

export interface MenuItem {
  icon: string;
  label: string;
  bg: string;
}

export interface MasjidNearby {
  name: string;
  jarak: string;
  kajian: number;
  bg: string;
}

export interface Kajian {
  icon: string;
  bg: string;
  title: string;
  tags: string[];
  date: string;
  time?: string;
  harga?: string;
}

export interface FavMasjid {
  name: string;
  alamat: string;
  bg: string;
  chips: string[];
}

export interface FavUstadz {
  name: string;
  meta: string;
  bg: string;
}

export interface Campaign {
  Masjid: string;
  title: string;
  icon: string;
  pct: number;
  raised: string;
  target: string;
  urgent: boolean;
  bg: string;
}

export interface AmalItem {
  name: string;
  count: string;
  done: boolean;
}

export interface AmalSection {
  icon: string;
  label: string;
  items: AmalItem[];
}

export interface TagStyle {
  free: string;
  paid: string;
  kids: string;
  quiz: string;
  dauroh: string;
  online: string;
  tahsin: string;
}

export interface NavItem {
  id: Page;
  icon: string;
  label: string;
}

export interface ProfileActivity {
  icon: string;
  bg: string;
  label: string;
  sub: string;
}

export interface InfaqHistory {
  label: string;
  val: string;
}
