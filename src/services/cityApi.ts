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

export async function findCityCodeByName(
  cityName: string,
  cities: City[]
): Promise<string | null> {
  if (!cityName || !cities.length) return null;

  const normalizedCityName = cityName.toLowerCase().replace(/kota\s+/i, "").trim();
  
  for (const city of cities) {
    const normalizedLokasi = city.lokasi.toLowerCase().replace(/kota\s+/i, "").trim();
    
    if (
      normalizedLokasi.includes(normalizedCityName) ||
      normalizedCityName.includes(normalizedLokasi)
    ) {
      return city.id;
    }
  }
  
  return null;
}
