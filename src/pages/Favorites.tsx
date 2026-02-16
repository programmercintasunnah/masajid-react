import { useState } from "react";
import type { FavTab, FeedItem } from "../types";
import { Heart, Repeat2, Share2, MoreHorizontal, User, Landmark, Calendar, Clock, Play } from "lucide-react";

const FOLLOWED_USERS = ["masjid_rj", "masjid_alikhlas", "ust_adagustian", "ahmad_fauzan"];

const LIVE_DATA = [
  { id: "live1", type: "live" as const, title: "Kajian Kitab Tauhid", mosque: "Masjid Al-Ikhlas", ustadz: "Ust. Abdurrahman, Lc.", datetime: "Sabtu, 14 Feb 2026 - 19.30 WIB", youtubeId: "X9CEm2ZTK-8", isLive: true, bg: "from-emerald-200 to-teal-300" },
  { id: "live2", type: "live" as const, title: "Tafsir Al-Quran Juz 30", mosque: "Masjid Nurul Iman", ustadz: "Ust. Ahmad Fauzan", datetime: "Minggu, 15 Feb 2026 - 07.00 WIB", youtubeId: "CpDGDo3NDgg", isLive: true, bg: "from-amber-200 to-yellow-300" },
  { id: "live3", type: "live" as const, title: "Fiqih Shalat", mosque: "Masjid Abu Darda", ustadz: "Ust. Yazid", datetime: "Senin, 16 Feb 2026 - 08.00 WIB", youtubeId: "71iNGcW8yDc", isLive: true, bg: "from-blue-200 to-blue-300" },
  { id: "live4", type: "live" as const, title: "Sirah Nabawiyah", mosque: "Masjid Al-Badr", ustadz: "Ust. Khalid", datetime: "Selasa, 17 Feb 2026 - 20.00 WIB", youtubeId: "QB8CoT7XMmU", isLive: true, bg: "from-purple-200 to-purple-300" },
  { id: "live5", type: "live" as const, title: "Akhlak Mulia", mosque: "Masjid Raudhatul Jannah", ustadz: "Ust. Ade Agustian", datetime: "Rabu, 18 Feb 2026 - 16.00 WIB", youtubeId: "ULmp9aYw5jM", isLive: true, bg: "from-pink-200 to-pink-300" },
];

const VIDEO_DATA = [
  { id: "vid1", title: "3 Amalan Agar Diterima di Bulan Ramadhan", mosque: "Masjid Al-Ikhlas", ustadz: "Ust. Abdurrahman", datetime: "Sabtu, 14 Feb 2026 - 19.30 WIB", youtubeId: "8dHpL_sFwoM" },
  { id: "vid2", title: "Keutamaan Shalat Subuh Berjamaah", mosque: "Masjid Nurul Iman", ustadz: "Ust. Izzuddin Abdissalam", datetime: "Minggu, 15 Feb 2026 - 07.00 WIB", youtubeId: "74oRlKJkJHo" },
  { id: "vid3", title: "Cara Menghilangkan Sifat Riya", mosque: "Masjid Al-Badr", ustadz: "Ust. Yazid", datetime: "Senin, 16 Feb 2026 - 16.00 WIB", youtubeId: "KWkftxVeRZI" },
  { id: "vid4", title: "Niat Puasa: Ini yang Benar!", mosque: "Masjid Raudhatul Jannah", ustadz: "Ust. Khalid", datetime: "Selasa, 17 Feb 2026 - 20.00 WIB", youtubeId: "zyUU-GPYWeo" },
  { id: "vid5", title: "Doa Agar Dimudahkan Rezeki", mosque: "Masjid Al-Hijrah", ustadz: "Ust. El Khuzaimah", datetime: "Rabu, 18 Feb 2026 - 21.00 WIB", youtubeId: "13aBa0jI090" },
  { id: "vid6", title: "Keutamaan Memiliki Anak Perempuan", mosque: "Masjid Abu Darda", ustadz: "Ust. Al Muzani", datetime: "Kamis, 19 Feb 2026 - 18.30 WIB", youtubeId: "Fvcd3QrsAUE" },
];

const JADWAL_DATA: JadwalItem[] = [
  { id: "j1", title: "Kajian Kitab Tauhid", mosque: "Masjid Al-Ikhlas", ustadz: "Ust. Abdurrahman, Lc.", day: "Sabtu", time: "19.30 WIB", type: "online" as const },
  { id: "j2", title: "Tafsir Al-Quran", mosque: "Masjid Nurul Iman", ustadz: "Ust. Ahmad Fauzan", day: "Minggu", time: "07.00 WIB", type: "offline" as const },
  { id: "j3", title: "Fiqih Puasa", mosque: "Masjid Raudhatul Jannah", ustadz: "Ust. Ade Agustian", day: "Senin", time: "16.00 WIB", type: "offline" as const },
  { id: "j4", title: "Sirah Nabawiyah", mosque: "Masjid Al-Badr", ustadz: "Ust. Khalid", day: "Selasa", time: "20.00 WIB", type: "online" as const },
  { id: "j5", title: "Akhlak Mulia", mosque: "Masjid Abu Darda", ustadz: "Ust. Yazid", day: "Rabu", time: "18.30 WIB", type: "offline" as const },
  { id: "j6", title: "Doa & Dzikir", mosque: "Masjid Al-Hijrah", ustadz: "Ust. Faiz", day: "Kamis", time: "21.00 WIB", type: "offline" as const },
];

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

✅ Terbuka untuk umum

🤍 Yuk, ikut ambil bagian dalam kebaikan Ramadhan.`,
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
  {
    id: "8",
    type: "jamaah",
    author: { name: "Muhammad Rijal", username: "muh_rijal" },
    repostedBy: { name: "Masjid Al-Ikhlas", username: "masjid_alikhlas" },
    content: "Subhanallah kajian tadi malam begitu menggetarkan hati. Terus semangat menuntut ilmu! 📚",
    likes: 15,
    comments: 3,
    shares: 2,
    timestamp: "2 hari yang lalu",
  },
  {
    id: "9",
    type: "jamaah",
    author: { name: "Siti Aminah", username: "siti_aminah" },
    repostedBy: { name: "Masjid An-Nur", username: "masjid_annur" },
    content: "Kajian yesterday luar biasa! Jazakallah ustadz 📚",
    likes: 5,
    comments: 1,
    shares: 0,
    timestamp: "4 jam yang lalu",
  },
  {
    id: "10",
    type: "jamaah",
    author: { name: "Budiman", username: "budiman_s" },
    repostedBy: { name: "Ustadz Yazid", username: "ust_yazid" },
    content: "Ilmu yang sangat bermanfaat. Thank you ustadz! 🙏",
    likes: 3,
    comments: 0,
    shares: 0,
    timestamp: "5 jam yang lalu",
  },
];

export function PageFavorites() {
  const [tab, setTab] = useState<FavTab>("all");
  const [feeds] = useState<FeedItem[]>(FEED_DATA);
  const [followedUsers, setFollowedUsers] = useState<string[]>(FOLLOWED_USERS);

  const isFollowed = (username: string) => followedUsers.includes(username);

  const handleFollow = (username: string) => {
    if (!followedUsers.includes(username)) {
      setFollowedUsers([...followedUsers, username]);
    }
  };

  const filteredFeeds = feeds.filter(f => {
    if (tab === "all") return true;
    if (tab === "masjid") return f.type === "masjid";
    if (tab === "asatidz") {
      if (f.type !== "masjid" || !f.mentionedUstadz || f.mentionedUstadz.length === 0) return false;
      const hasFollowedUstadz = f.mentionedUstadz.some(ustadzName => {
        const ustadzUsername = `ust_${ustadzName.toLowerCase().replace(/\s+/g, "_")}`;
        return followedUsers.includes(ustadzUsername);
      });
      return hasFollowedUstadz;
    }
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
        <p className="text-[12px] text-white/55">Update terbaru dari Masjid & Asatidz</p>
      </div>

      <div className="flex bg-white border-b border-black/[0.07] flex-shrink-0 overflow-x-auto">
        {[
          { id: "all" as FavTab, label: "Semua" },
          { id: "masjid" as FavTab, label: "Masjid" },
          { id: "asatidz" as FavTab, label: "Asatidz" },
          { id: "jamaah" as FavTab, label: "Jamaah" },
          { id: "live" as FavTab, label: "Live" },
          { id: "jadwal" as FavTab, label: "Jadwal" },
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

      <div className="flex-1 overflow-y-auto bg-[#f5f7f5] dark:bg-gray-900">
        {tab === "live" ? (
          <div className="py-4">
            <h3 className="text-sm font-bold text-gray-700 px-5 mb-3">Sedang Berlangsung</h3>
            <div className="flex gap-3 px-5 overflow-x-auto scrollbar-none pb-4">
              {LIVE_DATA.filter(l => l.isLive).map((item) => (
                <LiveHorizontalCard key={item.id} item={item} />
              ))}
            </div>
            
            <h3 className="text-sm font-bold text-gray-700 px-5 mb-3 mt-2">Video Kajian</h3>
            <div className="px-5">
              {VIDEO_DATA.map((item) => (
                <VideoCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        ) : tab === "jadwal" ? (
          <div className="px-5 py-4">
            <h3 className="text-sm font-bold text-gray-700 mb-3">Jadwal Kajian Mingguan</h3>
            {JADWAL_DATA.map((item) => (
              <JadwalCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div>
            <div className="py-4">
              <h3 className="text-sm font-bold text-gray-700 px-5 mb-3">Sedang Berlangsung</h3>
              <div className="flex gap-3 px-5 overflow-x-auto scrollbar-none pb-2">
                {LIVE_DATA.filter(l => l.isLive).map((item) => (
                  <LiveHorizontalCard key={item.id} item={item} />
                ))}
              </div>
            </div>
            {filteredFeeds.map((feed) => (
              <ThreadCard 
                key={feed.id} 
                feed={feed} 
                isFollowed={isFollowed}
                onFollow={handleFollow}
              />
            ))}
          </div>
        )}
        <div className="h-6" />
      </div>
    </>
  );
}

function ThreadCard({ feed, isFollowed, onFollow }: { 
  feed: FeedItem; 
  isFollowed: (username: string) => boolean;
  onFollow: (username: string) => void;
}) {
  const [liked, setLiked] = useState(false);
  const [reposted, setReposted] = useState(false);

  const hasImage = feed.image || (feed.images && feed.images.length > 0);
  const isMasjid = feed.type === "masjid";

  return (
    <div className="mx-0 sm:mx-5 my-3 bg-white rounded-none sm:rounded-2xl shadow-sm border-b sm:border border-black/[0.04]">
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
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[12px] text-gray-400">
                  <Repeat2 className="w-3 h-3 inline mr-1" />
                  Reposted by @{feed.repostedBy.username}
                </span>
                {!isFollowed(feed.repostedBy.username) && (
                  <button
                    onClick={() => onFollow(feed.repostedBy!.username)}
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#0b3d2e] text-white hover:bg-[#0a3528]"
                  >
                    Ikuti
                  </button>
                )}
              </div>
            )}

            {feed.mentionedUstadz && feed.mentionedUstadz.length > 0 && (
              <div className="flex items-center flex-wrap gap-2 mb-2">
                <span className="text-[12px] text-purple-600">🎙 Mentioned:</span>
                {feed.mentionedUstadz.map((ustadz, i) => {
                  const ustadzUsername = `ust_${ustadz.toLowerCase().replace(/\s+/g, "_")}`;
                  return (
                    <span key={i} className="flex items-center gap-1">
                      <span className="text-[12px] text-purple-600 font-medium">@{ustadz}</span>
                      {!isFollowed(ustadzUsername) && (
                        <button
                          onClick={() => onFollow(ustadzUsername)}
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#0b3d2e] text-white hover:bg-[#0a3528]"
                        >
                          Ikuti
                        </button>
                      )}
                    </span>
                  );
                })}
              </div>
            )}

            {hasImage && (
              <div className="relative mb-3">
                <img 
                  src={feed.image || feed.images?.[0]} 
                  alt="Post" 
                  className="w-full h-auto rounded-xl" 
                />
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

            <div className="flex items-center gap-1 text-gray-500 pt-2 border-t border-gray-100">
              <button 
                onClick={() => setLiked(!liked)}
                className={`flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-gray-100 ${liked ? 'text-red-500' : ''}`}
              >
                <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                <span className="text-[12px]">{feed.likes}</span>
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

type LiveItem = {
  id: string;
  type: "live";
  title: string;
  mosque: string;
  ustadz: string;
  datetime: string;
  youtubeId: string;
  isLive: boolean;
  bg: string;
};

function LiveHorizontalCard({ item }: { item: LiveItem }) {
  return (
    <div className="min-w-[280px] lg:min-w-[320px] bg-white rounded-xl shadow-sm border border-black/[0.04] overflow-hidden flex-shrink-0">
      <div className="relative pt-[56.25%] bg-black">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${item.youtubeId}`}
          title={item.title}
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        {item.isLive && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            LIVE
          </div>
        )}
      </div>
      <div className="p-3">
        <h4 className="text-sm font-bold text-gray-800 line-clamp-2 mb-1">{item.title}</h4>
        <div className="text-[12px] text-gray-500 truncate">
          <span className="inline-flex items-center gap-1">
            <Landmark className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{item.mosque}</span>
            <span className="flex-shrink-0">•</span>
            <span className="truncate">{item.ustadz}</span>
          </span>
        </div>
        <div className="text-[11px] text-gray-400 mt-1 truncate">
          <span className="inline-flex items-center gap-1">
            <Calendar className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{item.datetime}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

type VideoItem = {
  id: string;
  title: string;
  mosque: string;
  ustadz: string;
  datetime: string;
  youtubeId: string;
};

function VideoCard({ item }: { item: VideoItem }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-black/[0.04] mb-3 overflow-hidden">
      <div className="flex gap-3 p-3">
        <div className="w-24 h-16 rounded-lg flex-shrink-0 bg-gray-200 relative overflow-hidden">
          <img 
            src={`https://img.youtube.com/vi/${item.youtubeId}/mqdefault.jpg`} 
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <Play className="w-6 h-6 text-white/80" fill="currentColor" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-gray-800 line-clamp-2">{item.title}</h4>
          <div className="text-[12px] text-gray-500 mt-1 truncate">
            <span className="inline-flex items-center gap-1">
              <Landmark className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{item.mosque}</span>
            </span>
          </div>
          <div className="text-[11px] text-gray-400 mt-0.5 truncate">
            <span className="inline-flex items-center gap-1 flex-wrap">
              <span className="truncate">{item.ustadz}</span>
              <span className="flex-shrink-0">•</span>
              <span className="flex items-center gap-1 flex-shrink-0">
                <Calendar className="w-3 h-3" />
              </span>
              <span className="truncate">{item.datetime}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

type JadwalItem = {
  id: string;
  title: string;
  mosque: string;
  ustadz: string;
  day: string;
  time: string;
  type: "online" | "offline";
};

function JadwalCard({ item }: { item: JadwalItem }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-black/[0.04] mb-3 p-4">
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-sm font-bold text-gray-800 flex-1">{item.title}</h4>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.type === 'online' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
          {item.type === "online" ? "Online" : "Offline"}
        </span>
      </div>
      <div className="flex items-center gap-3 text-[12px] text-gray-500">
        <span className="flex items-center gap-1">
          <Landmark className="w-3 h-3" />
          {item.mosque}
        </span>
        <span>•</span>
        <span>{item.ustadz}</span>
      </div>
      <div className="flex items-center gap-4 mt-2 text-[12px] text-gray-400">
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {item.day}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {item.time}
        </span>
      </div>
    </div>
  );
}
