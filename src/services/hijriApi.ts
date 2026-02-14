import { apiClient } from "./apiClient";
import { HijriDate } from "@/types";

const DEFAULT_HIJRI: HijriDate = {
  day: 0,
  month: "-",
  year: 0,
};

// Response shape dari api.myquran.com/v2/hijri/gToH/{date}
interface HijriApiResponse {
  status: boolean;
  data: {
    result: {
      tanggal: string | number; // tanggal Hijri (bukan hari dalam minggu!)
      bulan: {
        angka: number;
        nama: string;
        arab: string;
      };
      tahun: number;
      hari: {
        angka: number; // ini hari dalam minggu (1=Ahad, dst), BUKAN tanggal
        nama: string;
      };
    };
  };
}

export async function getHijriDate(date: string): Promise<HijriDate> {
  try {
    const response = await apiClient<HijriApiResponse>(`/hijri/gToH/${date}`);

    if (!response?.status || !response?.data?.result) {
      console.warn("[Hijri] Invalid API response, using default");
      return DEFAULT_HIJRI;
    }

    const hijri = response.data.result;

    return {
      day: Number(hijri.tanggal),
      month: hijri.bulan.nama,
      year: hijri.tahun,
    };
  } catch (error) {
    console.error("[Hijri] Error fetching hijri date:", error);
    return DEFAULT_HIJRI;
  }
}