import { useState } from "react";

// ============================================================
// TYPES
// ============================================================
type Page = "beranda" | "favorit" | "infaq" | "amal" | "profil";
type FavTab = "masjid" | "ustadz" | "kajian";

// ============================================================
// DATA
// ============================================================
const PRAYER_TIMES = [
    { name: "Subuh", time: "05:10", icon: "🌅" },
    { name: "Dzuhur", time: "12:32", icon: "☀️" },
    { name: "Ashar", time: "15:50", icon: "🌤", active: true },
    { name: "Maghrib", time: "18:34", icon: "🌆" },
    { name: "Isya", time: "19:45", icon: "🌙" },
];

const MENUS = [
    { icon: "📖", label: "Al-Qur'an", bg: "from-emerald-100 to-teal-200" },
    { icon: "🎓", label: "Kajian", bg: "from-blue-100 to-blue-200" },
    { icon: "📜", label: "Hadits", bg: "from-amber-100 to-yellow-200" },
    { icon: "📿", label: "Dzikir & Doa", bg: "from-purple-100 to-purple-200" },
    { icon: "🪙", label: "Infaq", bg: "from-teal-100 to-emerald-200" },
    { icon: "🗣️", label: "Tahsin", bg: "from-pink-100 to-pink-200" },
    { icon: "🕌", label: "Masjid", bg: "from-yellow-100 to-amber-200" },
    { icon: "⋯", label: "Lainnya", bg: "from-slate-100 to-slate-200" },
];

const MASJID_NEARBY = [
    { name: "Masjid Al-Ikhlas", jarak: "340m", kajian: 2, bg: "from-emerald-200 to-teal-300" },
    { name: "Masjid Ar-Rahman", jarak: "800m", kajian: 5, bg: "from-blue-200 to-blue-300" },
    { name: "Masjid Nurul Iman", jarak: "1.2km", kajian: 3, bg: "from-amber-200 to-yellow-300" },
];

const KAJIAN_LIST = [
    { icon: "📚", bg: "bg-emerald-50", title: "Fiqih Puasa Ramadhan — Ust. Abdurrahman", tags: ["free", "online"], date: "Jum'at, 14 Feb", time: "19:30" },
    { icon: "🎓", bg: "bg-amber-50", title: "Dauroh Aqidah Intensif 3 Hari", tags: ["paid", "dauroh", "quiz"], date: "15–17 Feb", harga: "Rp 150k" },
    { icon: "🧒", bg: "bg-pink-50", title: "Tahsin Al-Qur'an Anak (Usia 6–12)", tags: ["kids", "tahsin"], date: "Sabtu, 15 Feb", time: "08:00" },
];

const FAV_MASJID = [
    { name: "Masjid Al-Ikhlas", alamat: "Jl. Sudirman No.12", bg: "from-emerald-200 to-teal-300", chips: ["📚 2 Kajian", "🗣️ Tahsin", "🪙 Infaq"] },
    { name: "Masjid Ar-Rahman", alamat: "Jl. Imam Bonjol No.5", bg: "from-blue-200 to-blue-300", chips: ["🎓 5 Kajian", "🌙 I'tikaf"] },
    { name: "Masjid Nurul Iman", alamat: "Jl. Hang Tuah No.8", bg: "from-amber-200 to-yellow-300", chips: ["📖 Al-Qur'an", "🧒 Kajian Anak"] },
];

const FAV_USTADZ = [
    { name: "Ust. Abdurrahman, Lc.", meta: "12 kajian aktif · Fiqih & Aqidah", bg: "bg-emerald-50" },
    { name: "Ust. Muhammad Faiz", meta: "8 kajian aktif · Tahsin & Tajwid", bg: "bg-blue-50" },
    { name: "Ust. Abdullah Hakim", meta: "5 kajian aktif · Sirah Nabawiyah", bg: "bg-amber-50" },
    { name: "Ustadzah Fatimah", meta: "6 kajian aktif · Kajian Akhwat", bg: "bg-pink-50" },
];

const FAV_KAJIAN = [
    { icon: "📚", bg: "bg-emerald-50", title: "Kitab Tauhid — Ust. Abdurrahman", tags: ["free"], date: "Setiap Ahad", time: "08:00" },
    { icon: "🎓", bg: "bg-amber-50", title: "Fiqih Muamalat Modern", tags: ["paid", "quiz"], date: "Sabtu, 22 Feb", harga: "Rp 200k" },
    { icon: "🎓", bg: "bg-indigo-50", title: "Dauroh Ulumul Hadits", tags: ["dauroh"], date: "1–3 Maret", time: "08:00" },
];

const CAMPAIGNS = [
    { masjid: "Masjid Al-Ikhlas", title: "Pembangunan Lantai 2 & Tempat Wudhu Baru", icon: "🏗️", pct: 68, raised: "Rp 340 juta", target: "Rp 500 juta", urgent: true, bg: "from-emerald-200 to-teal-300" },
    { masjid: "Masjid Ar-Rahman", title: "Penggantian AC & Sound System Masjid", icon: "⚡", pct: 32, raised: "Rp 96 juta", target: "Rp 300 juta", urgent: false, bg: "from-blue-200 to-blue-300" },
    { masjid: "Masjid Nurul Iman", title: "Beasiswa Santri Tahfidz Dhuafa", icon: "📚", pct: 55, raised: "Rp 55 juta", target: "Rp 100 juta", urgent: false, bg: "from-pink-100 to-pink-200" },
];

const AMAL_SECTIONS = [
    {
        icon: "🌅", label: "Dzikir Pagi", items: [
            { name: "Dzikir setelah Subuh", count: "1x", done: true },
            { name: "Membaca Ayat Kursi", count: "1x", done: true },
            { name: "Subhanallah (33x)", count: "33x", done: true },
            { name: "Alhamdulillah (33x)", count: "33x", done: true },
            { name: "Allahu Akbar (34x)", count: "34x", done: false },
        ],
    },
    {
        icon: "🕌", label: "Shalat", items: [
            { name: "Shalat Subuh", count: "2 rakaat", done: true },
            { name: "Shalat Dzuhur", count: "4 rakaat", done: true },
            { name: "Shalat Sunnah Dzuhur", count: "4 rakaat", done: true },
            { name: "Shalat Ashar", count: "4 rakaat", done: false },
            { name: "Shalat Maghrib", count: "3 rakaat", done: false },
        ],
    },
    {
        icon: "✨", label: "Amal Lainnya", items: [
            { name: "Sedekah", count: "1x", done: true },
            { name: "Membaca Hadits harian", count: "1x", done: true },
            { name: "Dzikir Petang", count: "1x", done: false },
            { name: "Shalat Tahajud", count: "2 rakaat", done: false },
            { name: "Dzikir Sebelum Tidur", count: "1x", done: false },
        ],
    },
];

// ============================================================
// SMALL COMPONENTS
// ============================================================

const TAG_STYLES: Record<string, string> = {
    free: "bg-emerald-100 text-emerald-700",
    paid: "bg-amber-100 text-amber-700",
    kids: "bg-pink-100 text-pink-700",
    quiz: "bg-orange-100 text-orange-700",
    dauroh: "bg-red-100 text-red-700",
    online: "bg-indigo-100 text-indigo-700",
    tahsin: "bg-teal-100 text-teal-700",
};

const TAG_LABELS: Record<string, string> = {
    free: "Gratis", paid: "Berbayar", kids: "Anak-anak",
    quiz: "Ada Quiz", dauroh: "Dauroh", online: "Online", tahsin: "Tahsin",
};

function Tag({ type }: { type: string }) {
    return (
        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${TAG_STYLES[type] ?? "bg-gray-100 text-gray-600"}`}>
            {TAG_LABELS[type] ?? type}
        </span>
    );
}

function SectionLabel({ children, extra }: { children: React.ReactNode; extra?: React.ReactNode }) {
    return (
        <div className="flex justify-between items-center px-5 mt-5 mb-3">
            <span className="text-[13px] font-bold text-gray-900">{children}</span>
            {extra && <span className="text-[11px] font-semibold text-emerald-700 cursor-pointer">{extra}</span>}
        </div>
    );
}

function KajianCard({ item }: { item: typeof KAJIAN_LIST[0] }) {
    return (
        <div className="mx-5 mb-2.5 bg-white rounded-2xl p-3 flex gap-3 shadow-sm border border-black/5 hover:translate-x-1 transition-transform cursor-pointer">
            <div className={`w-13 h-13 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${item.bg}`} style={{ width: 52, height: 52 }}>
                {item.icon}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex gap-1 flex-wrap mb-1.5">
                    {item.tags.map(t => <Tag key={t} type={t} />)}
                </div>
                <div className="text-[12px] font-bold text-gray-900 leading-snug mb-1">{item.title}</div>
                <div className="flex gap-3 text-[10px] text-gray-400">
                    <span>📅 {item.date}</span>
                    {"time" in item && item.time && <span>⏰ {item.time}</span>}
                    {"harga" in item && item.harga && <span>💰 {item.harga}</span>}
                </div>
            </div>
        </div>
    );
}

// ============================================================
// BOTTOM NAV
// ============================================================
const NAV_ITEMS: { id: Page; icon: string; label: string }[] = [
    { id: "beranda", icon: "🏠", label: "Beranda" },
    { id: "favorit", icon: "❤️", label: "Favorit" },
    { id: "infaq", icon: "🪙", label: "Infaq" },
    { id: "amal", icon: "☑️", label: "Amal" },
    { id: "profil", icon: "👤", label: "Profil" },
];

function BottomNav({ current, onChange }: { current: Page; onChange: (p: Page) => void }) {
    return (
        <div className="bg-white border-t border-black/[0.06] flex justify-around pt-1.5 pb-6 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] flex-shrink-0">
            {NAV_ITEMS.map(n => (
                <button
                    key={n.id}
                    onClick={() => onChange(n.id)}
                    className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl active:scale-90 transition-transform"
                >
                    <div className={`w-10 h-10 rounded-[14px] flex items-center justify-center text-xl transition-all ${current === n.id ? "bg-[#0b3d2e]" : ""}`}>
                        {n.icon}
                    </div>
                    <span className={`text-[9px] font-semibold tracking-tight ${current === n.id ? "text-[#0b3d2e]" : "text-gray-400"}`}>
                        {n.label}
                    </span>
                </button>
            ))}
        </div>
    );
}

// ============================================================
// PAGE: BERANDA
// ============================================================
function PageBeranda() {
    return (
        <>
            {/* Header */}
            <div className="relative overflow-hidden flex-shrink-0" style={{ background: "linear-gradient(160deg,#0b3d2e 0%,#1a6b4a 55%,#1f8a5e 100%)" }}>
                <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 85% 15%,rgba(201,148,58,0.2) 0%,transparent 55%)" }} />
                <div className="relative z-10 px-5 pt-9 pb-5">
                    <div className="flex justify-between text-[12px] text-white/60 font-medium mb-3">
                        <span>Kamis, 12 Februari 2026</span>
                        <span>24 Sha'ban 1447H</span>
                    </div>
                    <div className="text-center mb-1.5">
                        <span className="text-[64px] font-black text-white leading-none tracking-[-3px]" style={{ textShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>14:17</span>
                    </div>
                    <div className="text-center text-[12px] text-white/60 mb-4">
                        ± 1 jam 32 menit lagi menuju waktu <strong className="text-amber-300">Ashar</strong>
                    </div>
                    <div className="flex justify-between items-center bg-black/20 backdrop-blur-sm rounded-2xl px-3 py-2.5 border border-white/10">
                        {PRAYER_TIMES.map((p, i) => (
                            <div key={i} className={`flex flex-col items-center gap-1 flex-1 ${i > 0 ? "border-l border-white/10" : ""}`}>
                                <span className="text-[17px]">{p.icon}</span>
                                <span className={`text-[10px] font-medium ${p.active ? "text-amber-300" : "text-white/55"}`}>{p.name}</span>
                                <span className={`text-[12px] font-bold ${p.active ? "text-amber-300" : "text-white"}`}>{p.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Location */}
            <div className="text-[11px] text-white/50 px-5 pt-2 pb-0 flex-shrink-0" style={{ background: "linear-gradient(160deg,#0b3d2e,#1a6b4a 60%)" }}>
                📍 Kota Pekanbaru, Riau
            </div>

            {/* Scrollable */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none bg-[#f5f7f5]">
                {/* Menu */}
                <SectionLabel>Menu</SectionLabel>
                <div className="grid grid-cols-4 gap-3 px-5">
                    {MENUS.map((m, i) => (
                        <div key={i} className="flex flex-col items-center gap-1.5 cursor-pointer group">
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${m.bg} flex items-center justify-center text-2xl group-hover:scale-105 transition-transform`}>
                                {m.icon}
                            </div>
                            <span className="text-[10px] font-semibold text-gray-600 text-center leading-tight">{m.label}</span>
                        </div>
                    ))}
                </div>

                {/* Masjid Terdekat */}
                <SectionLabel extra="Lihat semua →">Masjid Terdekat</SectionLabel>
                <div className="flex gap-3 px-5 overflow-x-auto scrollbar-none pb-1">
                    {MASJID_NEARBY.map((m, i) => (
                        <div key={i} className="min-w-[150px] bg-white rounded-2xl overflow-hidden shadow-sm border border-black/[0.04] flex-shrink-0 cursor-pointer hover:-translate-y-0.5 transition-transform">
                            <div className={`h-20 bg-gradient-to-br ${m.bg} flex items-center justify-center text-3xl relative`}>
                                🕌
                                <span className="absolute top-2 right-2 bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">{m.jarak}</span>
                            </div>
                            <div className="p-2.5">
                                <div className="text-[11px] font-bold text-gray-900 mb-0.5">{m.name}</div>
                                <div className="text-[10px] text-gray-400">⭐ 4.8 · {m.kajian} kajian aktif</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Infaq */}
                <SectionLabel>Infaq Terkini</SectionLabel>
                <div className="mx-5 mb-2.5 rounded-2xl p-4 flex justify-between items-center relative overflow-hidden" style={{ background: "linear-gradient(130deg,#0b3d2e,#1a6b4a)" }}>
                    <div className="absolute right-4 bottom-[-6px] text-[50px] opacity-10">🕌</div>
                    <div className="relative z-10">
                        <div className="text-[13px] font-bold text-white mb-1">Pembangunan Masjid At-Taqwa</div>
                        <div className="text-[10px] text-white/60 mb-2">Bantu selesaikan pembangunan lantai 2</div>
                        <div className="w-40 h-[3px] bg-white/20 rounded-full mb-1.5">
                            <div className="h-full w-[68%] bg-amber-300 rounded-full" />
                        </div>
                        <div className="text-[9px] text-amber-300">68% · Rp 340jt dari Rp 500jt</div>
                    </div>
                    <button className="relative z-10 bg-amber-500 text-white text-[12px] font-bold px-4 py-2 rounded-xl">Infaq</button>
                </div>

                {/* Kajian */}
                <SectionLabel extra="Lihat semua →">Kajian Mendatang</SectionLabel>
                {KAJIAN_LIST.map((k, i) => <KajianCard key={i} item={k} />)}
                <div className="h-6" />
            </div>
        </>
    );
}

// ============================================================
// PAGE: FAVORIT
// ============================================================
function PageFavorit() {
    const [tab, setTab] = useState<FavTab>("masjid");

    return (
        <>
            <div className="flex-shrink-0 px-5 pt-10 pb-4" style={{ background: "linear-gradient(160deg,#0b3d2e 0%,#1a6b4a 70%)" }}>
                <h2 className="text-xl font-black text-white mb-0.5">❤️ Favorit</h2>
                <p className="text-[12px] text-white/55">Masjid & ustadz yang kamu ikuti</p>
            </div>

            {/* Tabs */}
            <div className="flex bg-white border-b border-black/[0.07] flex-shrink-0">
                {(["masjid", "ustadz", "kajian"] as FavTab[]).map(t => (
                    <button
                        key={t}
                        onClick={() => setTab(t)}
                        className={`flex-1 py-3 text-[12px] font-bold border-b-2 transition-all ${tab === t ? "text-[#0b3d2e] border-[#0b3d2e]" : "text-gray-400 border-transparent"}`}
                    >
                        {t === "masjid" ? "🕌 Masjid (3)" : t === "ustadz" ? "👳 Ustadz (4)" : "📚 Kajian (3)"}
                    </button>
                ))}
            </div>

            <div className="flex-1 overflow-y-auto bg-[#f5f7f5]">
                {tab === "masjid" && (
                    <>
                        <SectionLabel>Update Terbaru</SectionLabel>
                        {FAV_MASJID.map((m, i) => (
                            <div key={i} className="mx-5 mb-3 bg-white rounded-2xl overflow-hidden shadow-sm border border-black/[0.04] cursor-pointer hover:-translate-y-0.5 transition-transform">
                                <div className={`h-24 bg-gradient-to-br ${m.bg} flex items-center justify-center text-4xl relative`}>🕌</div>
                                <div className="p-3">
                                    <div className="text-[14px] font-black text-gray-900 mb-1">{m.name}</div>
                                    <div className="text-[11px] text-gray-400 mb-2.5">📍 {m.alamat}</div>
                                    <div className="flex gap-1.5 flex-wrap">
                                        {m.chips.map((c, j) => (
                                            <span key={j} className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">{c}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                )}

                {tab === "ustadz" && (
                    <>
                        <SectionLabel>Ustadz Diikuti</SectionLabel>
                        {FAV_USTADZ.map((u, i) => (
                            <div key={i} className="mx-5 mb-2.5 bg-white rounded-2xl p-3.5 flex gap-3 items-center shadow-sm border border-black/[0.04] cursor-pointer">
                                <div className={`w-13 h-13 rounded-full flex items-center justify-center text-2xl border-2 border-emerald-100 flex-shrink-0 ${u.bg}`} style={{ width: 52, height: 52 }}>👳</div>
                                <div className="flex-1">
                                    <div className="text-[13px] font-bold text-gray-900 mb-1">{u.name}</div>
                                    <div className="text-[11px] text-gray-400 mb-2">{u.meta}</div>
                                    <button className="bg-emerald-50 text-emerald-700 text-[11px] font-bold px-3 py-1 rounded-lg">✓ Diikuti</button>
                                </div>
                            </div>
                        ))}
                    </>
                )}

                {tab === "kajian" && (
                    <>
                        <SectionLabel>Kajian Tersimpan</SectionLabel>
                        {FAV_KAJIAN.map((k, i) => <KajianCard key={i} item={k as typeof KAJIAN_LIST[0]} />)}
                    </>
                )}
                <div className="h-6" />
            </div>
        </>
    );
}

// ============================================================
// PAGE: INFAQ
// ============================================================
function PageInfaq() {
    const [filter, setFilter] = useState("Semua");
    const filters = ["Semua", "Pembangunan", "Operasional", "Sosial", "Darurat"];

    return (
        <>
            <div className="flex-shrink-0 px-5 pt-10 pb-5" style={{ background: "linear-gradient(160deg,#0b3d2e 0%,#1a6b4a 70%)" }}>
                <div className="flex justify-between items-start mb-0">
                    <div>
                        <h2 className="text-xl font-black text-white">🪙 Infaq & Sedekah</h2>
                        <p className="text-[12px] text-white/55 mt-0.5">Titip kebaikan lewat masjid</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2.5 border border-white/15 text-center">
                        <div className="text-[11px] text-white/60">Total Infaqmu</div>
                        <div className="text-[20px] font-black text-amber-300 leading-tight">Rp 850k</div>
                    </div>
                </div>
            </div>

            {/* Filter */}
            <div className="flex gap-2 px-5 py-3 overflow-x-auto scrollbar-none bg-white border-b border-black/[0.06] flex-shrink-0">
                {filters.map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap border transition-all ${filter === f ? "bg-[#0b3d2e] text-white border-[#0b3d2e]" : "bg-white text-gray-500 border-black/10"}`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <div className="flex-1 overflow-y-auto bg-[#f5f7f5]">
                <SectionLabel extra="12 campaign →">Campaign Aktif</SectionLabel>
                {CAMPAIGNS.map((c, i) => (
                    <div key={i} className="mx-5 mb-3 bg-white rounded-2xl overflow-hidden shadow-sm border border-black/[0.04] cursor-pointer hover:-translate-y-0.5 transition-transform">
                        <div className={`h-28 bg-gradient-to-br ${c.bg} flex items-center justify-center text-4xl relative`}>
                            {c.icon}
                            {c.urgent && <span className="absolute top-2.5 left-2.5 bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">🔥 Hampir selesai!</span>}
                        </div>
                        <div className="p-3.5">
                            <div className="text-[10px] font-bold text-emerald-700 mb-1">🕌 {c.masjid}</div>
                            <div className="text-[13px] font-black text-gray-900 mb-2 leading-snug">{c.title}</div>
                            <div className="h-1.5 bg-gray-100 rounded-full mb-2">
                                <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" style={{ width: `${c.pct}%` }} />
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="text-[11px] font-bold text-emerald-700">{c.raised}</div>
                                    <div className="text-[10px] text-gray-400">dari target {c.target}</div>
                                </div>
                                <button className="bg-amber-500 text-white text-[11px] font-bold px-4 py-1.5 rounded-xl">Infaq Sekarang</button>
                            </div>
                        </div>
                    </div>
                ))}

                <SectionLabel>Riwayat Infaqmu</SectionLabel>
                <div className="mx-5 mb-3 bg-white rounded-2xl overflow-hidden shadow-sm">
                    {[
                        { label: "Masjid Al-Ikhlas", val: "Rp 100k" },
                        { label: "Beasiswa Santri", val: "Rp 250k" },
                        { label: "Masjid Ar-Rahman", val: "Rp 500k" },
                    ].map((r, i, arr) => (
                        <div key={i} className={`flex justify-between items-center px-4 py-3 ${i < arr.length - 1 ? "border-b border-black/[0.05]" : ""}`}>
                            <span className="text-[12px] font-bold text-gray-900">{r.label}</span>
                            <span className="text-[13px] font-black text-emerald-700">{r.val}</span>
                        </div>
                    ))}
                </div>
                <div className="h-6" />
            </div>
        </>
    );
}

// ============================================================
// PAGE: AMAL HARIAN
// ============================================================
function PageAmal() {
    const [sections, setSections] = useState(AMAL_SECTIONS.map(s => ({
        ...s,
        items: s.items.map(it => ({ ...it })),
    })));

    const total = sections.flatMap(s => s.items).length;
    const done = sections.flatMap(s => s.items).filter(it => it.done).length;
    const pct = Math.round((done / total) * 100);
    const circumference = 2 * Math.PI * 24;
    const offset = circumference - (pct / 100) * circumference;

    function toggle(si: number, ii: number) {
        setSections(prev => prev.map((s, sIdx) => sIdx !== si ? s : {
            ...s,
            items: s.items.map((it, iIdx) => iIdx !== ii ? it : { ...it, done: !it.done }),
        }));
    }

    return (
        <>
            <div className="flex-shrink-0 px-5 pt-10 pb-5" style={{ background: "linear-gradient(160deg,#0b3d2e 0%,#1a6b4a 70%)" }}>
                <h2 className="text-xl font-black text-white mb-3">☑️ Amal Harian</h2>
                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-3.5 border border-white/10">
                    <div className="relative w-16 h-16 flex-shrink-0">
                        <svg className="w-16 h-16 -rotate-90" viewBox="0 0 60 60">
                            <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="5" />
                            <circle cx="30" cy="30" r="24" fill="none" stroke="#f0c96a" strokeWidth="5"
                                strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-[13px] font-black text-white">{pct}%</div>
                    </div>
                    <div>
                        <div className="text-[14px] font-bold text-white mb-1">{done} dari {total} amal selesai</div>
                        <div className="text-[11px] text-white/60">Kamis, 12 Februari 2026</div>
                        <div className="text-[11px] text-amber-300 mt-1">🔥 Streak 7 hari berturut!</div>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto bg-[#f5f7f5]">
                <div className="h-3.5" />

                {/* Quran target */}
                <div className="mx-5 mb-3 bg-white rounded-2xl p-4 shadow-sm">
                    <h4 className="text-[12px] font-bold text-gray-900 mb-2.5">📖 Target Baca Al-Qur'an Hari Ini</h4>
                    <div className="h-2 bg-gray-100 rounded-full mb-2">
                        <div className="h-full w-[45%] bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full" />
                    </div>
                    <div className="flex justify-between text-[11px] text-gray-400">
                        <span>Sudah: <strong className="text-emerald-700">2 halaman</strong></span>
                        <span>Target: <strong className="text-emerald-700">4 halaman</strong></span>
                    </div>
                </div>

                {sections.map((sec, si) => {
                    const doneCount = sec.items.filter(it => it.done).length;
                    return (
                        <div key={si} className="mx-5 mb-3 bg-white rounded-2xl overflow-hidden shadow-sm">
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-black/[0.05]" style={{ background: "linear-gradient(90deg,rgba(30,107,74,0.06),transparent)" }}>
                                <span className="text-base">{sec.icon}</span>
                                <span className="text-[12px] font-bold text-gray-900 flex-1">{sec.label}</span>
                                <span className="text-[10px] text-gray-400">{doneCount}/{sec.items.length} ✓</span>
                            </div>
                            {sec.items.map((it, ii) => (
                                <button
                                    key={ii}
                                    onClick={() => toggle(si, ii)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-left border-b border-black/[0.04] last:border-b-0 hover:bg-black/[0.02] transition-colors`}
                                >
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-[12px] transition-all ${it.done ? "bg-emerald-500 border-emerald-500 text-white" : "border-gray-300"}`}>
                                        {it.done ? "✓" : ""}
                                    </div>
                                    <span className={`text-[12px] font-semibold flex-1 transition-colors ${it.done ? "text-gray-400 line-through" : "text-gray-900"}`}>{it.name}</span>
                                    <span className="text-[11px] text-gray-400">{it.count}</span>
                                </button>
                            ))}
                        </div>
                    );
                })}
                <div className="h-6" />
            </div>
        </>
    );
}

// ============================================================
// PAGE: PROFIL
// ============================================================
function PageProfil() {
    const MENU_ACTIVITY = [
        { icon: "📚", bg: "bg-emerald-50", label: "Riwayat Kajian", sub: "24 kajian diikuti" },
        { icon: "🏆", bg: "bg-amber-50", label: "Sertifikat & Quiz", sub: "7 sertifikat diperoleh" },
        { icon: "🪙", bg: "bg-teal-50", label: "Riwayat Infaq", sub: "Total Rp 850.000" },
        { icon: "☑️", bg: "bg-slate-50", label: "Progress Amal Harian", sub: "Streak 7 hari 🔥" },
    ];

    const MENU_SETTINGS = [
        { icon: "🔔", bg: "bg-purple-50", label: "Notifikasi", sub: "Pengingat shalat & kajian" },
        { icon: "📍", bg: "bg-blue-50", label: "Lokasi", sub: "Kota Pekanbaru, Riau" },
        { icon: "👤", bg: "bg-amber-50", label: "Edit Profil", sub: "Nama, foto, bio" },
        { icon: "🚪", bg: "bg-red-50", label: "Keluar", sub: "Logout dari akun" },
    ];

    return (
        <>
            <div className="flex-shrink-0 text-center px-5 pt-10 pb-6" style={{ background: "linear-gradient(160deg,#0b3d2e 0%,#1a6b4a 70%)" }}>
                <div className="w-18 h-18 rounded-full bg-white/20 flex items-center justify-center text-3xl mx-auto mb-2.5 border-[3px] border-white/30" style={{ width: 72, height: 72 }}>👤</div>
                <div className="text-[18px] font-black text-white mb-1">Ahmad Fauzan</div>
                <div className="text-[12px] text-white/55 mb-4">ahmad.fauzan@email.com</div>
                <div className="flex gap-3 justify-center">
                    {[
                        { val: "24", lbl: "Kajian" },
                        { val: "7", lbl: "Sertifikat" },
                        { val: "🔥7", lbl: "Hari streak" },
                    ].map((s, i) => (
                        <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2.5 text-center border border-white/15">
                            <div className="text-[18px] font-black text-white leading-none">{s.val}</div>
                            <div className="text-[10px] text-white/55 mt-0.5">{s.lbl}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto bg-[#f5f7f5]">
                <SectionLabel>Aktivitas Saya</SectionLabel>
                <div className="mx-5 mb-3 bg-white rounded-2xl overflow-hidden shadow-sm">
                    {MENU_ACTIVITY.map((m, i) => (
                        <div key={i} className={`flex items-center gap-3 px-4 py-3.5 border-b border-black/[0.05] last:border-b-0 cursor-pointer hover:bg-black/[0.02] transition-colors`}>
                            <div className={`w-9 h-9 rounded-[10px] flex items-center justify-center text-[17px] flex-shrink-0 ${m.bg}`}>{m.icon}</div>
                            <div className="flex-1">
                                <div className="text-[13px] font-bold text-gray-900">{m.label}</div>
                                <div className="text-[11px] text-gray-400 mt-0.5">{m.sub}</div>
                            </div>
                            <span className="text-gray-300 text-[14px]">›</span>
                        </div>
                    ))}
                </div>

                <SectionLabel>Pengaturan</SectionLabel>
                <div className="mx-5 mb-3 bg-white rounded-2xl overflow-hidden shadow-sm">
                    {MENU_SETTINGS.map((m, i) => (
                        <div key={i} className={`flex items-center gap-3 px-4 py-3.5 border-b border-black/[0.05] last:border-b-0 cursor-pointer hover:bg-black/[0.02] transition-colors`}>
                            <div className={`w-9 h-9 rounded-[10px] flex items-center justify-center text-[17px] flex-shrink-0 ${m.bg}`}>{m.icon}</div>
                            <div className="flex-1">
                                <div className="text-[13px] font-bold text-gray-900">{m.label}</div>
                                <div className="text-[11px] text-gray-400 mt-0.5">{m.sub}</div>
                            </div>
                            <span className="text-gray-300 text-[14px]">›</span>
                        </div>
                    ))}
                </div>
                <div className="h-6" />
            </div>
        </>
    );
}

// ============================================================
// ROOT APP
// ============================================================
export default function App() {
    const [page, setPage] = useState<Page>("beranda");

    const pages: Record<Page, React.ReactNode> = {
        beranda: <PageBeranda />,
        favorit: <PageFavorit />,
        infaq: <PageInfaq />,
        amal: <PageAmal />,
        profil: <PageProfil />,
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6"
            style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
            <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

            {/* Mobile container — no frame, just width constraint */}
            <div className="w-[390px] h-[844px] flex flex-col overflow-hidden rounded-[2px] shadow-2xl bg-[#f5f7f5]">
                {/* Page content */}
                <div className="flex-1 flex flex-col overflow-hidden" key={page} style={{ animation: "fadeUp 0.22s ease" }}>
                    {pages[page]}
                </div>

                {/* Bottom Nav */}
                <BottomNav current={page} onChange={setPage} />
            </div>

            <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .scrollbar-none { scrollbar-width: none; }
        .scrollbar-none::-webkit-scrollbar { display: none; }
      `}</style>
        </div>
    );
}