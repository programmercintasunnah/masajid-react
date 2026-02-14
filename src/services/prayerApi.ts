import { apiClient } from "./apiClient";
import { PrayerTimes } from "@/types";

// Response shape dari api.myquran.com/v2/sholat/jadwal/{cityCode}/{date}
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
  date: string  // format: "YYYY/MM/DD"
): Promise<PrayerTimes> {
  const response = await apiClient<PrayerApiResponse>(`/sholat/jadwal/${cityCode}/${date}`);

  if (!response?.status || !response?.data?.jadwal) {
    throw new Error("Invalid API response");
  }

  const jadwal = response.data.jadwal;

  // Validasi field penting tidak kosong
  if (!jadwal.subuh || !jadwal.dzuhur) {
    throw new Error("Prayer times data incomplete");
  }

  return {
    Fajr: jadwal.subuh,
    Sunrise: jadwal.terbit,
    Dhuhr: jadwal.dzuhur,
    Asr: jadwal.ashar,
    Maghrib: jadwal.maghrib,
    Isha: jadwal.isya,
  };
}