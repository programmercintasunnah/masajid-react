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

    if (!cachedCities) {
      cachedCities = await getAllCities();
    }

    const cityCode = await findCityCodeByName(city, cachedCities);
    
    return {
      city,
      cityCode: cityCode || DEFAULT_LOCATION.cityCode,
    };
  } catch {
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
        setLocation({ ...DEFAULT_LOCATION, error: "Geolocation tidak didukung" });
        setLoading(false);
        return;
      }

      try {
        const position = await getCurrentLocation();
        const { latitude, longitude } = position.coords;
        
        const { city, cityCode } = await getCityCodeFromCoordinates(latitude, longitude);
        
        setLocation({ latitude, longitude, city, cityCode });
      } catch (error) {
        console.log("Geolocation error, using default:", error);
        setLocation(DEFAULT_LOCATION);
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  return { location, loading };
}
