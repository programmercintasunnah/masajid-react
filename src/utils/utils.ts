/**
 * Format date to "YYYY-MM-DD" using local time.
 *
 * ⚠️ DO NOT use date.toISOString().split("T")[0] — in WIB timezone (UTC+7),
 * before 07:00 AM toISOString() will return YESTERDAY
 * because it converts to UTC first.
 *
 * Used for: getHijriDate (format YYYY-MM-DD)
 */
export function formatDateForApiHijri(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`; // example: "2026-02-14"
}

/**
 * Format date to "YYYY/MM/DD" using local time.
 *
 * Used for: getPrayerTimes — myquran.com endpoint uses slash
 * example: /sholat/jadwal/0412/2026/02/14
 */
export function formatDateForApi(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}/${m}/${d}`; // example: "2026/02/14"
}
