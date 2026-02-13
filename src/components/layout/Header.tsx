import { useState, useEffect } from "react";
import { Bell, Sunrise, Sun, Cloud, Sunset, Moon } from "lucide-react";

interface HeaderProps {
  userName?: string;
  userPhoto?: string;
}

const HEADER_BG = "linear-gradient(160deg,#0b3d2e 0%,#1a6b4a 55%,#1f8a5e 100%)";

const PRAYER_TIMES = [
  { name: "Subuh", time: "05:10", icon: Sunrise },
  { name: "Dzuhur", time: "12:32", icon: Sun },
  { name: "Ashar", time: "15:50", icon: Cloud },
  { name: "Maghrib", time: "18:34", icon: Sunset },
  { name: "Isya", time: "19:45", icon: Moon },
];

function getHijriDate(): { day: number; month: string; year: number } {
  return { day: 25, month: "Sha'ban", year: 1447 };
}

function getGregorianDate(date: Date): string {
  const days = ["Ahad", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function getNextPrayer(): { name: string; minutesLeft: number } {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  
  const prayerMinutes = PRAYER_TIMES.map(p => {
    const [h, m] = p.time.split(":").map(Number);
    return h * 60 + m;
  });

  for (let i = 0; i < prayerMinutes.length; i++) {
    if (currentMinutes < prayerMinutes[i]) {
      return { name: PRAYER_TIMES[i].name, minutesLeft: prayerMinutes[i] - currentMinutes };
    }
  }
  return { name: "Subuh", minutesLeft: (24 * 60 - currentMinutes) + prayerMinutes[0] };
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
  const hijri = getHijriDate();
  const gregorian = getGregorianDate(time);
  const nextPrayer = getNextPrayer();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");

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
              src="/masajid_logo_landscape.png" 
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
          <span>{hijri.day} {hijri.month} {hijri.year}H</span>
        </div>
        <div className="text-center mb-1.5">
          <span className="text-[64px] font-black text-white leading-none tracking-[-3px]" style={{ textShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>{hours}:{minutes}</span>
        </div>
        <div className="text-center text-[12px] text-white/60 mb-4">
          ± {formatCountdown(nextPrayer.minutesLeft)} lagi menuju waktu <strong className="text-amber-300">{nextPrayer.name}</strong>
        </div>
        <div className="flex justify-between items-center bg-black/20 backdrop-blur-sm rounded-2xl px-3 py-2.5 border border-white/10">
          {PRAYER_TIMES.map((p, i) => {
            const isActive = nextPrayer.name === p.name;
            const Icon = p.icon;
            return (
              <div key={i} className={`flex flex-col items-center gap-1 flex-1 ${i > 0 ? "border-l border-white/10" : ""}`}>
                <Icon className={`w-[17px] h-[17px] ${isActive ? "text-amber-300" : "text-white/70"}`} />
                <span className={`text-[10px] font-medium ${isActive ? "text-amber-300" : "text-white/55"}`}>{p.name}</span>
                <span className={`text-[12px] font-bold ${isActive ? "text-amber-300" : "text-white"}`}>{p.time}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
