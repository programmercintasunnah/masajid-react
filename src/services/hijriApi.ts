import { apiClient } from "./apiClient";
import { HijriDate } from "@/types";

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
  const response = await apiClient<HijriApiResponse>(`/hijri/gToH/${date}`);

  if (!response?.status || !response?.data?.result) {
    throw new Error("Invalid API response");
  }

  const hijri = response.data.result;

  return {
    day: Number(hijri.tanggal),   // ← field yang benar untuk tanggal Hijri
    month: hijri.bulan.nama,
    year: hijri.tahun,
  };
}