import { apiClient } from "./apiClient";

export interface City {
  id: string;
  lokasi: string;
}

interface CitiesResponse {
  status: boolean;
  data: City[];
}

export async function getAllCities(): Promise<City[]> {
  const response = await apiClient<CitiesResponse>("/sholat/kota/semua");
  
  if (!response.status || !response.data) {
    throw new Error("Gagal mengambil daftar kota");
  }
  
  return response.data;
}

function normalizeCityName(name: string): string {
  return name
    .toLowerCase()
    .replace(/kota\s+/i, "")
    .replace(/kab\.?\s*/i, "")
    .replace(/kabupaten\s+/i, "")
    .trim();
}

export async function findCityCodeByName(
  cityName: string,
  cities: City[]
): Promise<string | null> {
  if (!cityName || !cities.length) return null;

  const normalizedCityName = normalizeCityName(cityName);
  
  for (const city of cities) {
    const normalizedLokasi = normalizeCityName(city.lokasi);
    
    if (
      normalizedLokasi.includes(normalizedCityName) ||
      normalizedCityName.includes(normalizedLokasi) ||
      normalizedLokasi === normalizedCityName
    ) {
      return city.id;
    }
  }
  
  return null;
}
