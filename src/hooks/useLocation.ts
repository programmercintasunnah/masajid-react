import { useState, useEffect, useCallback, useRef } from "react";
import { getAllCities, City } from "@/services/cityApi";
import { getCurrentLocation } from "@/services/locationApi";

export interface Location {
  latitude: number;
  longitude: number;
  city: string;
  district: string;
  cityCode: string;
  error?: string;
}

interface LocationState {
  location: Location | null;
  loading: boolean;
  permissionDenied: boolean;
}

let cachedCities: City[] | null = null;
let citiesLoading = false;

async function loadCities(): Promise<City[]> {
  if (cachedCities) return cachedCities;
  if (citiesLoading) {
    while (citiesLoading) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    return cachedCities || [];
  }
  
  citiesLoading = true;
  try {
    cachedCities = await getAllCities();
    return cachedCities;
  } catch (error) {
    console.error("[Location] Failed to load cities:", error);
    return [];
  } finally {
    citiesLoading = false;
  }
}

function normalizeCityName(name: string): string {
  return name
    .toLowerCase()
    .replace(/kota\s+/i, "")
    .replace(/kab\.?\s*/i, "")
    .replace(/kabupaten\s+/i, "")
    .trim();
}

function normalizeDistrictName(name: string): string {
  return name
    .toLowerCase()
    .replace(/kec\.?\s*/i, "")
    .replace(/kecamatan\s+/i, "")
    .trim();
}

async function findBestCityCode(
  cityName: string,
  districtName: string,
  cities: City[]
): Promise<string | null> {
  if (!cityName || !cities.length) return null;

  const normalizedCityName = normalizeCityName(cityName);
  const normalizedDistrictName = normalizeDistrictName(districtName);

  const specialCityMap: Record<string, string> = {
    "north jakarta": "1301",
    "south jakarta": "1301",
    "west jakarta": "1301",
    "east jakarta": "1301",
    "central jakarta": "1301",
    "jakarta": "1301",
  };

  const cityKey = normalizedCityName.toLowerCase();
  if (specialCityMap[cityKey]) {
    return specialCityMap[cityKey];
  }

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

  for (const city of cities) {
    const normalizedLokasi = normalizeCityName(city.lokasi);
    if (
      normalizedLokasi.includes(normalizedDistrictName) ||
      normalizedDistrictName.includes(normalizedLokasi)
    ) {
      return city.id;
    }
  }
  
  return null;
}

async function getCityCodeFromCoordinates(
  latitude: number,
  longitude: number
): Promise<{ city: string; district: string; cityCode: string }> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
      { headers: { "User-Agent": "MasajidApp/1.0" } }
    );
    const data = await response.json();
    
    const city =
      data.address.city ||
      data.address.town ||
      data.address.county ||
      data.address.state ||
      "Unknown";
    
    const district =
      data.address.village ||
      data.address.neighbourhood ||
      data.address.suburb ||
      data.address.hamlet ||
      "";

    console.log("[Location] Nominatim result:", { city, district });

    const cities = await loadCities();
    
    if (!cities.length) {
      console.warn("[Location] No cities loaded");
      return { city, district, cityCode: "" };
    }

    const cityCode = await findBestCityCode(city, district, cities);
    
    console.log("[Location] Matched cityCode:", cityCode, "for city:", city, "district:", district);
    
    return {
      city,
      district,
      cityCode: cityCode || "",
    };
  } catch (error) {
    console.error("[Location] Error getting city code:", error);
    return { city: "", district: "", cityCode: "" };
  }
}

export function useLocation() {
  const [state, setState] = useState<LocationState>({
    location: null,
    loading: true,
    permissionDenied: false,
  });
  
  const hasRequestedRef = useRef(false);

  const requestLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setState({
        location: null,
        loading: false,
        permissionDenied: true,
      });
      return;
    }

    setState(prev => ({ ...prev, loading: true, permissionDenied: false }));

    try {
      const position = await getCurrentLocation();
      const { latitude, longitude } = position.coords;
      console.log("[Location] Got position:", latitude, longitude);
      
      const { city, district, cityCode } = await getCityCodeFromCoordinates(latitude, longitude);
      
      if (!cityCode) {
        setState({
          location: null,
          loading: false,
          permissionDenied: true,
        });
        return;
      }
      
      console.log("[Location] Final result:", { city, district, cityCode });
      
      setState({
        location: { latitude, longitude, city, district, cityCode },
        loading: false,
        permissionDenied: false,
      });
    } catch (error) {
      console.error("[Location] Geolocation error:", error);
      setState({
        location: null,
        loading: false,
        permissionDenied: true,
      });
    }
  }, []);

  useEffect(() => {
    if (hasRequestedRef.current) return;
    hasRequestedRef.current = true;
    
    requestLocation();
  }, [requestLocation]);

  return { ...state, requestLocation };
}
