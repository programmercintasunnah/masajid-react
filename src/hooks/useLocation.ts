import { useState, useEffect, useCallback, useRef } from "react";
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

const CACHE_KEY = "masajid_location_cache";
const CACHE_TTL_MS = 30 * 60 * 1000;

interface LocationCache {
  data: Location;
  timestamp: number;
}

function saveLocationCache(location: Location): void {
  try {
    const cache: LocationCache = { data: location, timestamp: Date.now() };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch { }
}

function loadLocationCache(): Location | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cache: LocationCache = JSON.parse(raw);

    if (!cache.data?.cityCode) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    if (Date.now() - cache.timestamp > CACHE_TTL_MS) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    return cache.data;
  } catch {
    return null;
  }
}

function getTimezoneFromLongitude(longitude: number): "wib" | "wita" | "wit" {
  if (longitude >= 135) return "wit";
  if (longitude >= 105) return "wita";
  return "wib";
}

function getCityCodeFromTimezone(timezone: "wib" | "wita" | "wit"): string {
  switch (timezone) {
    case "wit": return "3000";
    case "wita": return "2000";
    default: return "0412";
  }
}

function getCityNameFromTimezone(timezone: "wib" | "wita" | "wit"): string {
  switch (timezone) {
    case "wit": return "Papua";
    case "wita": return "Sulawesi";
    default: return "Pekanbaru";
  }
}

async function getCityCodeFromCoordinates(
  _latitude: number,
  longitude: number
): Promise<{ city: string; district: string; cityCode: string }> {
  const timezone = getTimezoneFromLongitude(longitude);
  const cityCode = getCityCodeFromTimezone(timezone);
  const city = getCityNameFromTimezone(timezone);
  
  console.log("[Location] Using timezone:", timezone, "cityCode:", cityCode);
  
  return { city, district: "", cityCode };
}

export function useLocation() {
  const [state, setState] = useState<LocationState>(() => {
    const cached = loadLocationCache();
    if (cached) {
      return { location: cached, loading: false, permissionDenied: false };
    }
    return { location: null, loading: true, permissionDenied: false };
  });

  const hasRequestedRef = useRef(false);

  const requestLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      console.warn("[Location] Geolocation not supported");
      setState({ location: null, loading: false, permissionDenied: true });
      return;
    }

    setState((prev) => ({ ...prev, loading: true, permissionDenied: false }));

    try {
      const position = await getCurrentLocation();
      const { latitude, longitude } = position.coords;
      console.log("[Location] Got position:", latitude, longitude);

      const { city, district, cityCode } = await getCityCodeFromCoordinates(latitude, longitude);

      if (!cityCode) {
        console.warn("[Location] cityCode not found");
        localStorage.removeItem(CACHE_KEY);
        setState({
          location: null,
          loading: false,
          permissionDenied: false,
        });
        return;
      }

      const location: Location = { latitude, longitude, city, district, cityCode };
      console.log("[Location] Final result:", location);

      saveLocationCache(location);
      setState({ location, loading: false, permissionDenied: false });
    } catch (error: unknown) {
      console.error("[Location] Geolocation error:", error);

      const isPermissionDenied =
        error instanceof GeolocationPositionError &&
        error.code === GeolocationPositionError.PERMISSION_DENIED;

      setState({
        location: null,
        loading: false,
        permissionDenied: isPermissionDenied,
      });
    }
  }, []);

  useEffect(() => {
    if (hasRequestedRef.current) return;
    hasRequestedRef.current = true;

    const cached = loadLocationCache();
    if (cached) {
      console.log("[Location] Using cached location:", cached.city);
      return;
    }

    requestLocation();
  }, [requestLocation]);

  return { ...state, requestLocation };
}
