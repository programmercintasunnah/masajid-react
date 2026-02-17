import { Sunrise, Sun, Cloud, Sunset, Moon, MapPin } from "lucide-react";
import { useLocation } from "../../hooks/useLocation";
import { usePrayerTimes } from "../../hooks/usePrayerTimes";
import { usePrayerInfo } from "../../hooks/usePrayerInfo";
import { useTime } from "../../hooks/useTime";
import { useDeviceHeading } from "../../hooks/useDeviceHeading";

export function RightPanel() {
  const { location, loading: locationLoading, requestLocation } = useLocation();
  const { prayerTimes, hijriDate, loading: prayerLoading } = usePrayerTimes();
  const { nextPrayer, gregorian, prayerList } = usePrayerInfo();
  const { heading: deviceHeading } = useDeviceHeading();
  
  const now = useTime();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");

  const prayerIcons: Record<string, any> = {
    Subuh: Sunrise,
    Dzuhur: Sun,
    Ashar: Cloud,
    Maghrib: Sunset,
    Isya: Moon,
  };

  const hasValidLocation = location?.cityCode && prayerTimes.Fajr !== "-";

  const getQiblaDirection = (lat: number, lng: number): number => {
    const kaabaLat = 21.4225;
    const kaabaLng = 39.8262;
    const rad = Math.PI / 180;
    const dLng = (kaabaLng - lng) * rad;
    const lat1 = lat * rad;
    const lat2 = kaabaLat * rad;
    const y = Math.sin(dLng);
    const x = Math.cos(lat1) * Math.tan(lat2) - Math.sin(lat1) * Math.cos(dLng);
    let qibla = Math.atan2(y, x) * (180 / Math.PI);
    qibla = (qibla + 360) % 360;
    return Math.round(qibla);
  };

  const qiblaDirection = location?.latitude && location?.longitude
    ? getQiblaDirection(location.latitude, location.longitude)
    : null;

  const formatTime = (h: number, m: number) => `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;

  const getOtherTimes = () => {
    if (!hasValidLocation || !prayerTimes.Sunrise) return null;
    
    const [srH, srM] = prayerTimes.Sunrise.split(":").map(Number);
    const [magH, magM] = prayerTimes.Maghrib.split(":").map(Number);
    const [fajrH, fajrM] = prayerTimes.Fajr.split(":").map(Number);
    
    if (isNaN(srH) || isNaN(magH) || isNaN(fajrH)) return null;
    
    const syuruqMins = srH * 60 + srM + 15;
    const syuruqH = Math.floor(syuruqMins / 60) % 24;
    const syuruqMin = syuruqMins % 60;
    
    const maghribMins = magH * 60 + magM;
    const fajrMins = fajrH * 60 + fajrM;
    const midnightMins = maghribMins + (24 * 60 - maghribMins + fajrMins) / 2;
    const midnightH = Math.floor(midnightMins / 60) % 24;
    const midnightMin = Math.floor(midnightMins % 60);
    
    const lastThirdStart = maghribMins + (24 * 60 - maghribMins + fajrMins) * 2 / 3;
    const lastThirdH = Math.floor(lastThirdStart / 60) % 24;
    const lastThirdMin = Math.floor(lastThirdStart % 60);
    
    return [
      { name: "Syuruq", time: formatTime(syuruqH, syuruqMin), desc: "Matahari naik 15 menit" },
      { name: "Tengah Malam", time: formatTime(midnightH, midnightMin), desc: "Separuh malam" },
      { name: "1/3 Malam", time: formatTime(lastThirdH, lastThirdMin), desc: "Waktu mustajab" },
    ];
  };

  const otherTimes = getOtherTimes();

  const formatCountdown = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h > 0) return `${h}j ${m}m`;
    return `${m} menit`;
  };

  return (
    <div className="hidden lg:flex flex-col w-[300px] bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 p-4 flex-shrink-0">
      {/* Akun Gmail */}
      <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl mb-4">
        <div className="w-10 h-10 rounded-full bg-[#0b3d2e] flex items-center justify-center text-white font-bold">
          Z
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-gray-900 dark:text-white">Zakie Alelm</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">zakie.alelm@gmail.com</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">+62822xxx</div>
        </div>
      </div>

      {/* Tanggal & Waktu */}
      <div className="mb-4">
        <div className="text-xs text-gray-500 dark:text-gray-400">{gregorian}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400">{hijriDate.day} {hijriDate.month} {hijriDate.year}H</div>
      </div>

      {/* Waktu Saat Ini */}
      <div className="text-center mb-2">
        <span className="text-4xl font-black text-[#0b3d2e] dark:text-white">{hours}:{minutes}</span>
        {hasValidLocation && nextPrayer && (
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {formatCountdown(nextPrayer.minutesLeft)} menuju {nextPrayer.name}
          </div>
        )}
      </div>

      {/* Lokasi */}
      {hasValidLocation && (
        <div className="flex items-center justify-center gap-1 text-xs text-gray-500 dark:text-gray-400 mb-4">
          <MapPin className="w-3 h-3" />
          <span>
            {location?.district ? `${location.district}, ` : ""}{location?.city}
          </span>
        </div>
      )}

      {/* Jadwal Sholat */}
      <div className="mb-4">
        <h3 className="text-sm font-bold text-[#0b3d2e] dark:text-white mb-2">Jadwal Sholat</h3>
        {prayerLoading || locationLoading ? (
          <div className="text-xs text-gray-400">Memuat...</div>
        ) : hasValidLocation ? (
          <div className="space-y-2">
            {prayerList.map((p, i) => {
              const isActive = nextPrayer?.name === p.name;
              const Icon = prayerIcons[p.name];
              return (
                <div
                  key={i}
                  className={`flex items-center justify-between p-2 rounded-lg ${
                    isActive ? "bg-[#0b3d2e]" : "bg-gray-50 dark:bg-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${isActive ? "text-amber-300" : "text-gray-400 dark:text-gray-500"}`} />
                    <span className={`text-xs font-medium ${isActive ? "text-white" : "text-gray-600 dark:text-gray-300"}`}>
                      {p.name}
                    </span>
                  </div>
                  <span className={`text-xs font-bold ${isActive ? "text-white" : "text-gray-700 dark:text-gray-300"}`}>
                    {p.time}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <button
            onClick={requestLocation}
            className="text-xs text-[#0b3d2e] dark:text-white underline"
          >
            Aktifkan lokasi
          </button>
        )}
      </div>

      {/* Waktu Lainnya */}
      {otherTimes && (
        <div className="mb-4">
          <h3 className="text-sm font-bold text-[#0b3d2e] dark:text-white mb-2">Waktu Lainnya</h3>
          <div className="space-y-2">
            {otherTimes.map((t, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-700"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-300">{t.name}</span>
                  <span className="text-[10px] text-gray-400">{t.desc}</span>
                </div>
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{t.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Arah Kiblat */}
      {qiblaDirection !== null && (
        <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-sm font-medium text-[#0b3d2e] dark:text-white">Arah Kiblat</span>
          </div>
          
          {/* Compass */}
          <div className="flex justify-center mb-2">
            <div className="relative w-20 h-20 rounded-full border-4 border-[#0b3d2e] dark:border-white flex items-center justify-center overflow-hidden">
              {/* Dial rotates with device heading */}
              <div 
                className="absolute inset-0 flex items-center justify-center transition-transform duration-100"
                style={{ 
                  transform: deviceHeading !== null ? `rotate(${deviceHeading}deg)` : 'none'
                }}
              >
                {/* North marker */}
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[10px] border-l-transparent border-r-transparent border-b-[#ef4444]" />
                {/* Kibla indicator - always points to kibla relative to north */}
                <div 
                  className="absolute w-1 h-8 bg-green-500 rounded-full"
                  style={{ 
                    transform: `rotate(${-qiblaDirection}deg)`,
                    transformOrigin: 'center bottom',
                    bottom: '50%'
                  }}
                />
              </div>
              {/* Center dot */}
              <div className="relative z-10 w-3 h-3 rounded-full bg-[#0b3d2e] dark:bg-white" />
            </div>
          </div>
          
          <div className="text-center">
            <span className="text-2xl font-bold text-[#0b3d2e] dark:text-white">{qiblaDirection}°</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">dari Utara</span>
          </div>
          {deviceHeading !== null && (
            <div className="text-center text-[10px] text-gray-400 mt-1">
              Putar device ke arah kiblat
            </div>
          )}
        </div>
      )}

    </div>
  );
}
