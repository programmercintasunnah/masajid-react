import { apiClient } from "./apiClient";
import { HijriDate } from "@/types";

interface HijriApiResponse {
  status: boolean;
  data: {
    result: {
      tanggal: string;
     bulan: {          angka: number;
        nama: string;
        arab: string;
      };
      tahun: number;
      hari: {
        angka: number;
        nama: string;
      };
    };
  };
}

export async function getHijriDate(date: string): Promise<HijriDate> {
  const response = await apiClient<HijriApiResponse>(`/hijri/gToH/${date}`);
  
  if (!response.status || !response.data) {
    throw new Error("Invalid API response");
  }
  
  const hijri = response.data.result;
  
  return {
    day: hijri.hari.angka,
    month: hijri.bulan.nama,
    year: hijri.tahun,
  };
}
