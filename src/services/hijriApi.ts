import { HijriDate } from "@/types";

const DEFAULT_HIJRI: HijriDate = {
  day: 0,
  month: "-",
  year: 0,
};

interface AlAdhanHijriResponse {
  code: number;
  status: string;
  data: {
    hijri: {
      date: string;
      month: {
        number: number;
        en: string;
      };
      year: string;
    };
  };
}

export async function getHijriDate(date: string): Promise<HijriDate> {
  try {
    // Format: DD-MM-YYYY
    const [year, month, day] = date.split("/");
    const formattedDate = `${day}-${month}-${year}`;
    
    const response = await fetch(
      `https://api.aladhan.com/v1/gToH?date=${formattedDate}`
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data: AlAdhanHijriResponse = await response.json();

    if (data.code !== 200 || !data.data?.hijri) {
      console.warn("[Hijri] Invalid API response");
      return DEFAULT_HIJRI;
    }

    const hijri = data.data.hijri;

    return {
      day: parseInt(hijri.date.split("-")[0], 10),
      month: hijri.month.en,
      year: parseInt(hijri.year, 10),
    };
  } catch (error) {
    console.error("[Hijri] Error fetching hijri date:", error);
    return DEFAULT_HIJRI;
  }
}