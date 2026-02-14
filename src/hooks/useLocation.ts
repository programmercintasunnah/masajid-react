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

const CACHE_KEY = "masajid_location_cache";
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 menit

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
    if (Date.now() - cache.timestamp > CACHE_TTL_MS) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    return cache.data;
  } catch {
    return null;
  }
}

// ─── City loading dengan proper mutex ────────────────────────────────────────
let cachedCities: City[] | null = null;
let citiesPromise: Promise<City[]> | null = null;

async function loadCities(): Promise<City[]> {
  if (cachedCities) return cachedCities;

  // Pakai satu promise yang di-share — tidak pakai polling loop
  if (!citiesPromise) {
    citiesPromise = getAllCities()
      .then((cities) => {
        cachedCities = cities;
        return cities;
      })
      .catch((error) => {
        console.error("[Location] Failed to load cities:", error);
        citiesPromise = null; // reset supaya bisa retry
        return [];
      });
  }

  return citiesPromise;
}

// ─── Normalisasi nama ─────────────────────────────────────────────────────────
function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\bkota\b\s*/gi, "")
    .replace(/\bkab\.?\b\s*/gi, "")
    .replace(/\bkabupaten\b\s*/gi, "")
    .replace(/\bkec\.?\b\s*/gi, "")
    .replace(/\bkecamatan\b\s*/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Hitung similarity sederhana untuk fuzzy matching
function similarity(a: string, b: string): number {
  if (a === b) return 1;
  if (a.includes(b) || b.includes(a)) return 0.9;
  // Hitung karakter yang sama
  const longer = a.length > b.length ? a : b;
  const shorter = a.length > b.length ? b : a;
  let matches = 0;
  for (const char of shorter) {
    if (longer.includes(char)) matches++;
  }
  return matches / longer.length;
}

const SPECIAL_CITY_MAP: Record<string, string> = {
  "north jakarta": "1301",
  "south jakarta": "1301",
  "west jakarta": "1301",
  "east jakarta": "1301",
  "central jakarta": "1301",
  jakarta: "1301",
};

async function findBestCityCode(
  cityName: string,
  districtName: string,
  stateName: string,
  cities: City[]
): Promise<string | null> {
  if (!cities.length) return null;

  const normCity = normalizeName(cityName);
  const normDistrict = normalizeName(districtName);
  const normState = normalizeName(stateName);

  // 1. Special map (Jakarta, dll)
  if (SPECIAL_CITY_MAP[normCity]) return SPECIAL_CITY_MAP[normCity];

  // 2. Exact / substring match pada nama kota
  for (const city of cities) {
    const normLokasi = normalizeName(city.lokasi);
    if (normLokasi === normCity || normLokasi.includes(normCity) || normCity.includes(normLokasi)) {
      return city.id;
    }
  }

  // 3. Fallback ke district name
  if (normDistrict) {
    for (const city of cities) {
      const normLokasi = normalizeName(city.lokasi);
      if (normLokasi.includes(normDistrict) || normDistrict.includes(normLokasi)) {
        return city.id;
      }
    }
  }

  // 4. Fallback ke state/province (ambil yang paling mirip)
  if (normState) {
    let bestScore = 0;
    let bestId: string | null = null;
    for (const city of cities) {
      const normLokasi = normalizeName(city.lokasi);
      const score = similarity(normState, normLokasi);
      if (score > bestScore && score > 0.7) {
        bestScore = score;
        bestId = city.id;
      }
    }
    if (bestId) return bestId;
  }

  return null;
}

// ─── Nominatim reverse geocode dengan CORS proxy ─────────────────────────────────
async function getCityCodeFromCoordinates(
  latitude: number,
  longitude: number
): Promise<{ city: string; district: string; cityCode: string }> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=id`;
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(nominatimUrl)}`;

  try {
    const response = await fetch(proxyUrl, {
      headers: { "User-Agent": "MasajidApp/1.0" },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    const addr = data.address ?? {};

    const city: string =
      addr.city || addr.town || addr.municipality || addr.county || addr.state_district || addr.state || "Unknown";

    const district: string =
      addr.village || addr.neighbourhood || addr.suburb || addr.hamlet || addr.quarter || "";

    const state: string = addr.state || "";

    console.log("[Location] Nominatim result:", { city, district, state });

    const cities = await loadCities();

    if (!cities.length) {
      console.warn("[Location] No cities loaded, cannot match cityCode");
      return { city, district, cityCode: "" };
    }

    const cityCode = await findBestCityCode(city, district, state, cities);

    console.log("[Location] Matched cityCode:", cityCode, "for city:", city, "district:", district);

    return { city, district, cityCode: cityCode ?? "" };
  } catch (error) {
    clearTimeout(timeoutId);
    if ((error as Error).name === "AbortError") {
      console.error("[Location] Nominatim timeout");
    } else {
      console.error("[Location] Nominatim/CORS error:", error);
    }
    return { city: "", district: "", cityCode: "" };
  }
}

// ─── Hook utama ───────────────────────────────────────────────────────────────
export function useLocation() {
  const [state, setState] = useState<LocationState>(() => {
    // Inisialisasi dari cache supaya tidak flash loading di setiap mount
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
        // cityCode tidak ketemu bukan berarti permission denied!
        // Tetap simpan koordinat mentah supaya bisa retry atau ditampilkan sebagian
        console.warn("[Location] cityCode not found for", city, district);
        setState({
          location: null,
          loading: false,
          permissionDenied: false, // ← FIX: bukan permission denied, tapi kota tidak ditemukan
        });
        return;
      }

      const location: Location = { latitude, longitude, city, district, cityCode };
      console.log("[Location] Final result:", location);

      saveLocationCache(location);
      setState({ location, loading: false, permissionDenied: false });
    } catch (error: unknown) {
      console.error("[Location] Geolocation error:", error);

      // Bedakan error permission denied vs error lainnya
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

    // Kalau sudah ada cache valid, tidak perlu request ulang
    const cached = loadLocationCache();
    if (cached) {
      console.log("[Location] Using cached location:", cached.city);
      return;
    }

    requestLocation();
  }, [requestLocation]);

  return { ...state, requestLocation };
}