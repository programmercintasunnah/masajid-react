export type Page = "home" | "favorites" | "infaq" | "amal" | "profile";

export interface NavItem {
  id: Page;
  icon: string;
  label: string;
}

export type FavTab = "mosque" | "teacher" | "study";
