import { Location } from "@/types";

interface NominatimResponse {
  address: {
    city?: string;
    town?: string;
    village?: string;
    county?: string;
  };
}

export async function getCityFromCoordinates(
  latitude: number,
  longitude: number
): Promise<string> {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
    {
      headers: { "User-Agent": "MasajidApp/1.0" },
    }
  );
  
  const data: NominatimResponse = await response.json();
  return (
    data.address.city ||
    data.address.town ||
    data.address.village ||
    data.address.county ||
    "Unknown"
  );
}

export function getCurrentLocation(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation tidak didukung"));
      return;
    }
    
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export function createLocationFromPosition(position: GeolocationPosition): Omit<Location, "city"> {
  return {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };
}
