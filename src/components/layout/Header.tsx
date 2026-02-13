import { useState, useEffect } from "react";

interface HeaderProps {
  userName?: string;
  userPhoto?: string;
}

const HEADER_BG = "linear-gradient(160deg,#0b3d2e 0%,#1a6b4a 55%,#1f8a5e 100%)";

const HIJRI_MONTHS = [
  "Muharram", "Safar", "Rabi'ul Awal", "Rabi'ul Akhir",
  "Jumadil Awal", "Jumadil Akhir", "Rajab", "Sha'ban",
  "Ramadhan", "Syawwal", "Dzulqa'dah", "Dzulhijjah"
];

function getHijriDate(date: Date): { day: number; month: string; year: number } {
  const offset = 7 * 24 * 60 * 60 * 1000;
  const hijriMs = date.getTime() + date.getTimezoneOffset() * 60 * 1000 + offset;
  const day = Math.floor(hijriMs / (24 * 60 * 60 * 1000)) % 30 + 1;
  const monthIndex = Math.floor(((hijriMs / (24 * 60 * 60 * 1000)) % 354) / 29.5);
  const year = 1446 + Math.floor((date.getTime() - new Date("2024-07-07").getTime()) / (354 * 24 * 60 * 60 * 1000));
  return { day, month: HIJRI_MONTHS[monthIndex] || "Sha'ban", year };
}

function getGregorianDate(date: Date): string {
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

export function Header({ userName, userPhoto }: HeaderProps) {
  const [time, setTime] = useState(new Date());
  const hijri = getHijriDate(time);
  const gregorian = getGregorianDate(time);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
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
            <span className="text-[14px] font-black px-2 py-0.5 rounded-md" style={{ background: "#fff", color: "#0b3d2e" }}>Masajid</span>
            <span className="text-[14px] font-black text-white">App</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="relative w-8 h-8 rounded-xl flex items-center justify-center transition-all active:scale-90" style={{ background: "rgba(255,255,255,0.13)", border: "1px solid rgba(255,255,255,0.18)" }}>
            <span className="text-[15px]">🔔</span>
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
          ± 1 jam 32 menit lagi menuju waktu <strong className="text-amber-300">Ashar</strong>
        </div>
        <div className="flex justify-between items-center bg-black/20 backdrop-blur-sm rounded-2xl px-3 py-2.5 border border-white/10">
          {[
            { name: "Subuh", time: "05:10", icon: "🌅" },
            { name: "Dzuhur", time: "12:32", icon: "☀️" },
            { name: "Ashar", time: "15:50", icon: "🌤", active: true },
            { name: "Maghrib", time: "18:34", icon: "🌆" },
            { name: "Isya", time: "19:45", icon: "🌙" },
          ].map((p, i) => (
            <div key={i} className={`flex flex-col items-center gap-1 flex-1 ${i > 0 ? "border-l border-white/10" : ""}`}>
              <span className="text-[17px]">{p.icon}</span>
              <span className={`text-[10px] font-medium ${p.active ? "text-amber-300" : "text-white/55"}`}>{p.name}</span>
              <span className={`text-[12px] font-bold ${p.active ? "text-amber-300" : "text-white"}`}>{p.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
