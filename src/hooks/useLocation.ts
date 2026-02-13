import { useState, useEffect } from "react";

interface Location {
  latitude: number;
  longitude: number;
  city: string;
  error?: string;
}

const DEFAULT_LOCATION: Location = {
  latitude: 0.5074,
  longitude: 101.4478,
  city: "Kota Pekanbaru",
};

export function useLocation() {
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation({ ...DEFAULT_LOCATION, error: "Geolocation tidak didukung" });
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
            { headers: { "User-Agent": "MasajidApp/1.0" } }
          );
          const data = await response.json();
          const city = data.address.city || data.address.town || data.address.village || data.address.county || "Unknown";
          
          setLocation({ latitude, longitude, city });
        } catch {
          setLocation({ latitude, longitude, city: "Unknown" });
        }
        setLoading(false);
      },
      (error) => {
        console.log("Geolocation error, using default:", error.message);
        setLocation(DEFAULT_LOCATION);
        setLoading(false);
      }
    );
  }, []);

  return { location, loading };
}
