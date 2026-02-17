import { Sunrise, Sun, Cloud, Sunset, Moon, MapPin } from "lucide-react";
import { useLocation } from "../../hooks/useLocation";
import { usePrayerTimes, getNextPrayer } from "../../hooks/usePrayerTimes";
import { useTime } from "../../hooks/useTime";

export function RightPanel() {
  const { location, loading: locationLoading, requestLocation } = useLocation();
  const { prayerTimes, hijriDate, loading: prayerLoading } = usePrayerTimes();

  const hasValidLocation = location?.cityCode && prayerTimes.Fajr !== "-";
  const nextPrayer = hasValidLocation ? getNextPrayer(prayerTimes) : null;

  const now = useTime();

  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const gregorian = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const prayerList = [
    { name: "Subuh", time: prayerTimes.Fajr || "-" },
    { name: "Dzuhur", time: prayerTimes.Dhuhr || "-" },
    { name: "Ashar", time: prayerTimes.Asr || "-" },
    { name: "Maghrib", time: prayerTimes.Maghrib || "-" },
    { name: "Isya", time: prayerTimes.Isha || "-" },
  ];

  const prayerIcons: Record<string, any> = {
    Subuh: Sunrise,
    Dzuhur: Sun,
    Ashar: Cloud,
    Maghrib: Sunset,
    Isya: Moon,
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
      <div className="text-center mb-4">
        <span className="text-4xl font-black text-[#0b3d2e] dark:text-white">{hours}:{minutes}</span>
        {hasValidLocation && nextPrayer && (
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {nextPrayer.minutesLeft} menit ke {nextPrayer.name}
          </div>
        )}
      </div>

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

      {/* Lokasi */}
      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <MapPin className="w-3 h-3" />
        {hasValidLocation ? (
          <span>{location?.city} ({location?.cityCode})</span>
        ) : (
          <span>Lokasi belum diatur</span>
        )}
      </div>
    </div>
  );
}
