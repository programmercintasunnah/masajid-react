import { useState, useEffect } from "react";
import { getAllCities, findCityCodeByName, City } from "@/services/cityApi";
import { getCurrentLocation } from "@/services/locationApi";

interface Location {
  latitude: number;
  longitude: number;
  city: string;
  cityCode: string;
  error?: string;
}

const DEFAULT_LOCATION: Location = {
  latitude: 0.5074,
  longitude: 101.4478,
  city: "Kota Pekanbaru",
  cityCode: "0412",
};

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
    console.log("[Location] Loaded cities:", cachedCities.length);
    return cachedCities;
  } catch (error) {
    console.error("[Location] Failed to load cities:", error);
    return [];
  } finally {
    citiesLoading = false;
  }
}

async function getCityCodeFromCoordinates(
  latitude: number,
  longitude: number
): Promise<{ city: string; cityCode: string }> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
      { headers: { "User-Agent": "MasajidApp/1.0" } }
    );
    const data = await response.json();
    const city =
      data.address.city ||
      data.address.town ||
      data.address.village ||
      data.address.county ||
      "Unknown";

    console.log("[Location] Nominatim city:", city);

    const cities = await loadCities();
    
    if (!cities.length) {
      console.warn("[Location] No cities loaded, using default");
      return { city, cityCode: DEFAULT_LOCATION.cityCode };
    }

    const cityCode = await findCityCodeByName(city, cities);
    
    console.log("[Location] Matched cityCode:", cityCode, "for city:", city);
    
    return {
      city,
      cityCode: cityCode || DEFAULT_LOCATION.cityCode,
    };
  } catch (error) {
    console.error("[Location] Error getting city code:", error);
    return {
      city: DEFAULT_LOCATION.city,
      cityCode: DEFAULT_LOCATION.cityCode,
    };
  }
}

export function useLocation() {
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      if (!navigator.geolocation) {
        console.warn("[Location] Geolocation not supported");
        setLocation({ ...DEFAULT_LOCATION, error: "Geolocation tidak didukung" });
        setLoading(false);
        return;
      }

      try {
        const position = await getCurrentLocation();
        const { latitude, longitude } = position.coords;
        console.log("[Location] Got position:", latitude, longitude);
        
        const { city, cityCode } = await getCityCodeFromCoordinates(latitude, longitude);
        console.log("[Location] Final result:", { city, cityCode });
        
        setLocation({ latitude, longitude, city, cityCode });
      } catch (error) {
        console.error("[Location] Geolocation error:", error);
        setLocation(DEFAULT_LOCATION);
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  return { location, loading };
}
