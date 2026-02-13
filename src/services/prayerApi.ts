import { apiClient } from "./apiClient";
import { PrayerTimes } from "@/types";

interface PrayerApiResponse {
  status: boolean;
  data: {
    id: number;
    lokasi: string;
    daerah: string;
    jadwal: {
      tanggal: string;
      imsak: string;
      subuh: string;
      terbit: string;
      dhuha: string;
      dzuhur: string;
      ashar: string;
      maghrib: string;
      isya: string;
      date: string;
    };
  };
}

export async function getPrayerTimes(
  cityCode: string,
  date: string
): Promise<PrayerTimes> {
  const response = await apiClient<PrayerApiResponse>(`/sholat/jadwal/${cityCode}/${date}`);
  
  if (!response.status || !response.data) {
    throw new Error("Invalid API response");
  }
  
  const jadwal = response.data.jadwal;
  
  return {
    Fajr: jadwal.subuh,
    Sunrise: jadwal.terbit,
    Dhuhr: jadwal.dzuhur,
    Asr: jadwal.ashar,
    Maghrib: jadwal.maghrib,
    Isha: jadwal.isya,
  };
}
