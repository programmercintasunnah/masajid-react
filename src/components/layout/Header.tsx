import { useState, useEffect } from "react";
import { Bell, Sunrise, Sun, Cloud, Sunset, Moon, MapPin, Loader2 } from "lucide-react";
import { useLocation } from "../../hooks/useLocation";
import { usePrayerTimes, getNextPrayer } from "../../hooks/usePrayerTimes";
import masajidLogo from "../../assets/masajid_logo.png"
interface HeaderProps {
  userName?: string;
  userPhoto?: string;
}

const HEADER_BG = "linear-gradient(160deg,#0b3d2e 0%,#1a6b4a 55%,#1f8a5e 100%)";

function formatTime(time: string): string {
  const [hours, minutes] = time.split(":");
  return `${hours}:${minutes}`;
}

function getGregorianDate(date: Date): string {
  const days = ["Ahad", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function formatCountdown(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) {
    return `${hours} jam ${mins} menit`;
  }
  return `${mins} menit`;
}

export function Header({ userName, userPhoto }: HeaderProps) {
  const [time, setTime] = useState(new Date());
  const { location, loading: locationLoading } = useLocation();
  const { prayerTimes, hijriDate, loading: prayerLoading } = usePrayerTimes(
    location?.latitude,
    location?.longitude
  );

  const gregorian = getGregorianDate(time);
  const nextPrayer = getNextPrayer(prayerTimes);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");

  const prayerIcons: Record<string, any> = {
    Subuh: Sunrise,
    Dzuhur: Sun,
    Ashar: Cloud,
    Maghrib: Sunset,
    Isya: Moon,
  };

  const prayerList = [
    { name: "Subuh", time: formatTime(prayerTimes.Fajr) },
    { name: "Dzuhur", time: formatTime(prayerTimes.Dhuhr) },
    { name: "Ashar", time: formatTime(prayerTimes.Asr) },
    { name: "Maghrib", time: formatTime(prayerTimes.Maghrib) },
    { name: "Isya", time: formatTime(prayerTimes.Isha) },
  ];

  const isLoading = locationLoading || prayerLoading;

  return (
    <div
      className="relative overflow-hidden flex-shrink-0"
      style={{ background: HEADER_BG }}
    >
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 85% 15%,rgba(201,148,58,0.2) 0%,transparent 55%)" }} />

      {/* Header Content */}
      <div className="relative z-10 flex items-center justify-between px-5 pt-6 pb-3">
        <div className="flex flex-col leading-none gap-0.5">
          <div className="flex items-center gap-1.5">
            <img
              src={masajidLogo}
              alt="MasajidApp"
              className="h-8 w-auto object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                const parent = (e.target as HTMLImageElement).parentElement;
                if (parent) {
                  parent.innerHTML = `<span class="text-[14px] font-black px-2 py-0.5 rounded-md" style="background:#fff;color:#0b3d2e">مساجد</span><span class="text-[14px] font-black text-white">App</span>`;
                }
              }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="relative w-8 h-8 rounded-xl flex items-center justify-center transition-all active:scale-90" style={{ background: "rgba(255,255,255,0.13)", border: "1px solid rgba(255,255,255,0.18)" }}>
            <Bell className="w-4 h-4 text-white" />
            <span className="absolute top-[5px] right-[5px] w-[7px] h-[7px] bg-red-500 rounded-full" style={{ border: "1.5px solid #1a6b4a" }} />
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0" style={{ background: "rgba(255,255,255,0.18)", border: "2px solid rgba(255,255,255,0.4)" }}>
            {userPhoto ? (
              <img src={userPhoto} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white text-[13px] font-bold">
                {userName?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Prayer Time Info */}
      <div className="relative z-10 px-5 pb-5">
        <div className="flex justify-between text-[12px] text-white/60 font-medium mb-3">
          <span>{gregorian}</span>
          <span>{hijriDate.day} {hijriDate.month} {hijriDate.year}H</span>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 text-white/60 animate-spin" />
          </div>
        ) : (
          <>
            <div className="text-center mb-1.5">
              <span className="text-[64px] font-black text-white leading-none tracking-[-3px]" style={{ textShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>{hours}:{minutes}</span>
            </div>
            <div className="text-center text-[12px] text-white/60 mb-4">
              ± {formatCountdown(nextPrayer.minutesLeft)} lagi menuju waktu <strong className="text-amber-300">{nextPrayer.name}</strong>
            </div>
            <div className="flex justify-between items-center bg-black/20 backdrop-blur-sm rounded-2xl px-3 py-2.5 border border-white/10">
              {prayerList.map((p, i) => {
                const isActive = nextPrayer.name === p.name;
                const Icon = prayerIcons[p.name];
                return (
                  <div key={i} className={`flex flex-col items-center gap-1 flex-1 ${i > 0 ? "border-l border-white/10" : ""}`}>
                    <Icon className={`w-[17px] h-[17px] ${isActive ? "text-amber-300" : "text-white/70"}`} />
                    <span className={`text-[10px] font-medium ${isActive ? "text-amber-300" : "text-white/55"}`}>{p.name}</span>
                    <span className={`text-[12px] font-bold ${isActive ? "text-amber-300" : "text-white"}`}>{p.time}</span>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
      <div className="text-[11px] text-white/50 px-5 pt-1 pb-1 flex-shrink-0" style={{ background: "linear-gradient(160deg,#0b3d2e,#1a6b4a 60%)" }}>
        {location ? (
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {location.city}
          </span>
        ) : (
          <span>Kota Pekanbaru</span>
        )}
      </div>
    </div>
  );
}
