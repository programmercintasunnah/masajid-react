/**
 * Format tanggal ke "YYYY-MM-DD" menggunakan local time.
 *
 * ⚠️ JANGAN pakai date.toISOString().split("T")[0] — di timezone WIB (UTC+7),
 * sebelum jam 07:00 pagi toISOString() akan mengembalikan tanggal KEMARIN
 * karena mengkonversi ke UTC terlebih dahulu.
 *
 * Digunakan untuk: getHijriDate (format YYYY-MM-DD)
 */
export function formatDateForApiHijri(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`; // contoh: "2026-02-14"
}

/**
 * Format tanggal ke "YYYY/MM/DD" menggunakan local time.
 *
 * Digunakan untuk: getPrayerTimes — endpoint myquran.com memakai slash
 * contoh: /sholat/jadwal/0412/2026/02/14
 */
export function formatDateForApi(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}/${m}/${d}`; // contoh: "2026/02/14"
}