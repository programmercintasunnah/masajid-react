import { Location } from "@/types";

interface NominatimResponse {
  address: {
    city?: string;
    town?: string;
    village?: string;
    county?: string;
    municipality?: string;
    suburb?: string;
    neighbourhood?: string;
    district?: string;
  };
}

export async function getCityFromCoordinates(
  latitude: number,
  longitude: number
): Promise<{ city: string; district: string }> {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
    {
      headers: { "User-Agent": "MasajidApp/1.0" },
    }
  );
  
  const data: NominatimResponse = await response.json();
  const city = data.address.city || data.address.town || data.address.village || data.address.county || data.address.municipality || "Unknown";
  const district = data.address.suburb || data.address.neighbourhood || data.address.district || "";
  
  return { city, district };
}

export function getCurrentLocation(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported"));
      return;
    }
    
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export function createLocationFromPosition(position: GeolocationPosition): Omit<Location, "city" | "district" | "cityCode"> {
  return {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };
}
