/// <reference types="vite/client" />

declare module "islamic-date" {
  interface HijriDate {
    day: number;
    month: string;
    monthNumber: number;
    year: number;
    format: string;
    formatted: string;
  }
  
  interface IslamicDateModule {
    getCurrentHijriDate(date?: Date): HijriDate;
    getHijriDateWithEvents(date?: Date): HijriDate & { events: string[] };
    gregorianToHijri(date: Date): HijriDate;
    getIslamicEvents(): { name: string; date: string; description: string }[];
    getEventsForDate(date: Date): string[];
    (date?: Date, format?: string, offset?: number): string;
  }
  
  const islamicDate: IslamicDateModule;
  export default islamicDate;
  export { HijriDate, getCurrentHijriDate, getHijriDateWithEvents, gregorianToHijri, getIslamicEvents, getEventsForDate };
}
