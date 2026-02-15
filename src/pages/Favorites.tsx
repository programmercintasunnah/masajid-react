import { useState } from "react";
import type { FavTab, FeedItem } from "../types";
import { Heart, MessageCircle, Repeat2, Share2, MoreHorizontal, User, Landmark } from "lucide-react";

const FEED_DATA: FeedItem[] = [
  {
    id: "1",
    type: "masjid",
    author: { name: "Masjid Raudhatul Jannah", username: "masjid_rj", isVerified: true },
    content: `🔉Merapat Anak Muda..
Yuk.. Persiapan Ramadhan Dengan Mengikuti Kajian Spesial Menyambut Ramadhan Bersama Kaula Muda Di Masjid Raudhatul Jannah..

Masa Muda itu waktunya bersiap, bukan menunda..
Ramadhan semakin dekat. Jangan sampai kita masuk bulan suci tanpa bekal ilmu tentang puasa.

InsyaAllah akan dilaksanakan *Kajian Spesial Fiqih Ramadhan* bersama:
🎙 *Ustadz Ade Agustian, Lc.* _Hafidzahullahuta'ala_ 
📅 *Sabtu* , 26 Sya'ban 1447 H / 14 Februari 2026
⏰ *Ba'da Ashar* s.d selesai
📍 Masjid Raudhatul Jannah Pekanbaru

📝Kajian ini penting untuk diikuti agar kita memahami hukum-hukum puasa, adab Ramadhan, serta hal-hal yang sering keliru dalam praktiknya.

🌿Yuk hadir dan ajak teman-teman.
Masuk Ramadhan dengan ilmu, bukan sekadar kebiasaan.

Barakallahufiikum`,
    image: "/photo_2026-02-15_11-22-55.jpg",
    likes: 24,
    comments: 8,
    shares: 3,
    timestamp: "2 jam yang lalu",
    mentionedUstadz: ["Ustadz Ade Agustian"],
  },
  {
    id: "2",
    type: "masjid",
    author: { name: "Masjid Raudhatul Jannah", username: "masjid_rj", isVerified: true },
    content: `*PROGRAM TAHSIN AL-QUR'AN KHUSUS MUSLIMAH DI BULAN RAMADHAN*

Alhamdulillah kembali dibuka Tahsin Al-Qur'an *kelas Tilawah & kelas Murojaah hafalan juz 29 dan juz 30* di bulan Ramadhan khusus Muslimah :

🗓️ Waktu belajar:
Tanggal 1-20 Ramadhan 1447 H
⏰ Pukul: 08.00 - 10.00 WIB

🖊️ *Ketentuan:*
Bersedia ikut tes pengelompokan pada hari Senin, 16 Februari 2026
Pukul 10.00 - 11.30 WIB

*Infaq Rp. 200.000,-/Peserta*

*Format Pendaftaran*
Ketikan nama / usia / pilihan kelas
Kirim ke : 082386961405`,
    likes: 45,
    comments: 12,
    shares: 5,
    timestamp: "5 jam yang lalu",
  },
  {
    id: "3",
    type: "masjid",
    author: { name: "Masjid Raudhatul Jannah", username: "masjid_rj", isVerified: true },
    content: `*📝 4 Agenda Kajian & Dauroh Ilmiyyah*
Jangan lewatkan kesempatan emas untuk menimba ilmu agama langsung di Masjid Raudhatul Jannah.

📌
1. *Materi: Kitab Majelis Syahr Ramadhan* > _(Materi ke-27)_
* 📝 _Pembahasan: Jenis Kedua Dari sebab Masuk neraka_
* 👤 Pemateri: Ustadz *Syamsurijal* _Hafidzahullah_
* 🕡 Waktu: *Ba'da Maghrib* s.d. Selesai
* 🗓️ Hari *Jum'at* , 13 Feb 26

📌
2. *Materi: Kitab Tauhid* - Bab ke-37 
* 📝Pembahasan Termasuk syirik: _Motivasi Seseorang Dalam Amalnya Kepentingan Duniawi_
* 👤 Pemateri: *Ustadz Maududi Abdullah, Lc.* _Hafidzahullah_
* 🕡 Waktu: *Ba'da Shubuh* s.d. Selesai
* 🗓️ Hari *Sabtu* , 14 Feb 26

📌
3. *DAUROH PERSIAPAN RAMADHAN* 
* 📝Pembahasan: _Persiapan Ramadhan Dengan Iman & Imun_
* 👉🏽 Ada Cek Kesehatan Gratis (Kuota Terbatas)
* 👤 Pemateri: *Ustadz Khailid Abdus Shamad, M.A.* _Hafidzahullah_
* 🗓️ Hari *Sabtu* , 14 Feb 26

📍Lokasi: Masjid Raudhatul Jannah, Pekanbaru
📡 Live: YouTube erje.tv
 umum

✅ Terbuka untuk🤍 Yuk, ikut ambil bagian dalam kebaikan Ramadhan.`,
    image: "/photo_2026-02-15_11-23-53.jpg",
    likes: 67,
    comments: 23,
    shares: 12,
    timestamp: "1 hari yang lalu",
    mentionedUstadz: ["Ustadz Samsurijal", "Ustadz Maududi Abdullah", "Ustadz Khailid Abdus Shamad"],
  },
  {
    id: "4",
    type: "masjid",
    author: { name: "Masjid Al-Ikhlas", username: "masjid_alikhlas", isVerified: true },
    content: "Assalamu'alaikum Jamaah...\n\nAkan mengadakan kajian kitab Tauhid tomorrow night. Yuk ramaikan! 🔥\n\n📅 Sabtu, 22 Februari 2026\n⏰ 19.30 WIB\n📍 Masjid Al-Ikhlas",
    image: "/photo_2026-02-15_11-23-24.jpg",
    likes: 24,
    comments: 8,
    shares: 3,
    timestamp: "2 jam yang lalu",
  },
  {
    id: "5",
    type: "masjid",
    author: { name: "Masjid Al-Ikhlas", username: "masjid_alikhlas", isVerified: true },
    content: "Assalamu'alaikum Jamaah sekalian...\n\nBerikut info infaq bulan ini:\n- Kebutuhan: Rp 5.000.000\n- Sudah terkumpul: Rp 2.500.000\n\nJazakumullah khairal jaza untuk Jamaah yang sudah berinfaq. Yang belum, tunggu apa lagi? 😊",
    likes: 15,
    comments: 5,
    shares: 1,
    timestamp: "3 hari yang lalu",
  },
  {
    id: "6",
    type: "jamaah",
    author: { name: "Ahmad Fauzan", username: "ahmad_fauzan" },
    repostedBy: { name: "Masjid Raudhatul Jannah", username: "masjid_rj" },
    content: "Alangkah pentingnya menuntut ilmu agama. Yuk gas kajian! 📚",
    likes: 12,
    comments: 2,
    shares: 1,
    timestamp: "3 jam yang lalu",
  },
  {
    id: "7",
    type: "jamaah",
    author: { name: "Fatimah Zahra", username: "fatimah_zahra" },
    repostedBy: { name: "Ustadz Ade Agustian", username: "ust_adagustian" },
    content: "Alondissement kajian tadi malam begitu menggetarkan hati. Terus semangat menuntut ilmu! 📚",
    likes: 8,
    comments: 1,
    shares: 0,
    timestamp: "1 hari yang lalu",
  },
];

export function PageFavorites() {
  const [tab, setTab] = useState<FavTab>("all");
  const [feeds] = useState<FeedItem[]>(FEED_DATA);

  const filteredFeeds = feeds.filter(f => {
    if (tab === "all") return true;
    if (tab === "masjid") return f.type === "masjid";
    if (tab === "ustadz") return f.type === "masjid" && f.mentionedUstadz && f.mentionedUstadz.length > 0;
    if (tab === "jamaah") return f.type === "jamaah";
    return false;
  });

  return (
    <>
      <div className="flex-shrink-0 px-5 pt-10 pb-4" style={{ background: "linear-gradient(160deg,#0b3d2e 0%,#1a6b4a 70%)" }}>
        <h2 className="text-xl font-black text-white mb-0.5 flex items-center gap-2">
          <Heart className="w-5 h-5" />
          Favorit
        </h2>
        <p className="text-[12px] text-white/55">Update terbaru dari Masjid & Ustadz</p>
      </div>

      <div className="flex bg-white border-b border-black/[0.07] flex-shrink-0 overflow-x-auto">
        {[
          { id: "all" as FavTab, label: "Semua" },
          { id: "masjid" as FavTab, label: "Masjid" },
          { id: "ustadz" as FavTab, label: "Ustadz" },
          { id: "jamaah" as FavTab, label: "Jamaah" },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`py-3 px-4 text-[12px] font-bold border-b-2 transition-all whitespace-nowrap ${tab === t.id ? "text-[#0b3d2e] border-[#0b3d2e]" : "text-gray-400 border-transparent"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto bg-[#f5f7f5]">
        {filteredFeeds.map((feed) => (
          <ThreadCard key={feed.id} feed={feed} />
        ))}
        <div className="h-6" />
      </div>
    </>
  );
}

function ThreadCard({ feed }: { feed: FeedItem }) {
  const [liked, setLiked] = useState(false);
  const [reposted, setReposted] = useState(false);

  const hasImage = feed.image || (feed.images && feed.images.length > 0);
  const isMasjid = feed.type === "masjid";

  return (
    <div className="mx-0 sm:mx-5 my-3 bg-white rounded-none sm:rounded-2xl shadow-sm border-b sm:border border-black/[0.04]">
      {hasImage && (
        <div className="relative">
          <img 
            src={feed.image || feed.images?.[0]} 
            alt="Post" 
            className="w-full h-auto" 
          />
          {isMasjid && (
            <div className="absolute top-2 left-2 bg-[#0b3d2e] text-white text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1">
              <Landmark className="w-3 h-3" />
              Masjid
            </div>
          )}
        </div>
      )}

      <div className="p-4">
        <div className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isMasjid ? 'bg-emerald-100' : 'bg-gray-200'}`}>
              {isMasjid ? (
                <Landmark className="w-5 h-5 text-[#0b3d2e]" />
              ) : (
                <User className="w-5 h-5 text-gray-500" />
              )}
            </div>
            {feed.repostedBy && (
              <>
                <div className="w-0.5 flex-1 bg-gray-200 mt-2" />
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mt-2">
                  <Repeat2 className="w-3 h-3 text-gray-500" />
                </div>
              </>
            )}
          </div>

          <div className="flex-1 pb-3">
            <div className="flex items-center justify-between mb-1">
              <div>
                <span className="text-[14px] font-bold text-gray-900">{feed.author.name}</span>
                {feed.author.isVerified && (
                  <span className="text-[12px] text-blue-400 ml-1">✓</span>
                )}
                <span className="text-[12px] text-gray-400 ml-1">@{feed.author.username}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-gray-400">{feed.timestamp}</span>
                <button className="text-gray-400">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            {feed.repostedBy && (
              <div className="text-[12px] text-gray-400 mb-1">
                <Repeat2 className="w-3 h-3 inline mr-1" />
                Reposted by @{feed.repostedBy.username}
              </div>
            )}

            {feed.mentionedUstadz && feed.mentionedUstadz.length > 0 && (
              <div className="text-[12px] text-purple-600 mb-2 flex flex-wrap gap-1">
                🎙 Mentioned: {feed.mentionedUstadz.map((ustadz, i) => (
                  <span key={i} className="font-medium">@{ustadz}</span>
                ))}
              </div>
            )}

            <div className="text-[14px] text-gray-800 whitespace-pre-line mb-3 leading-relaxed">{feed.content}</div>

            {feed.tags && (
              <div className="flex gap-2 flex-wrap mb-3">
                {feed.tags.map((tag, i) => (
                  <span key={i} className="text-[13px] text-black font-medium">{tag}</span>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between text-gray-500 pt-2 border-t border-gray-100">
              <button 
                onClick={() => setLiked(!liked)}
                className={`flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-gray-100 ${liked ? 'text-red-500' : ''}`}
              >
                <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                <span className="text-[12px]">{feed.likes}</span>
              </button>
              
              <button className="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-gray-100">
                <MessageCircle className="w-4 h-4" />
                <span className="text-[12px]">{feed.comments}</span>
              </button>
              
              <button 
                onClick={() => setReposted(!reposted)}
                className={`flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-gray-100 ${reposted ? 'text-green-500' : ''}`}
              >
                <Repeat2 className={`w-4 h-4 ${reposted ? 'fill-current' : ''}`} />
                <span className="text-[12px]">{feed.shares}</span>
              </button>
              
              <button className="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-gray-100">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
