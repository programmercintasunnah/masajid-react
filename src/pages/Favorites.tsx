import { useState } from "react";
import type { FavTab, FeedItem } from "../types";
import { Heart, MessageCircle, Repeat2, Share2, MoreHorizontal, User, Landmark } from "lucide-react";

const FEED_DATA: FeedItem[] = [
  {
    id: "1",
    type: "masjid",
    author: { name: "Masjid Al-Ikhlas", username: "masjid_alikhlas", isVerified: true },
    content: "Assalamu'alaikum Jamaah...\n\nAkan mengadakan kajian kitab Tauhid tomorrow night. Yuk ramaikan! 🔥\n\n📅 Sabtu, 22 Februari 2026\n⏰ 19.30 WIB\n📍 Masjid Al-Ikhlas",
    image: "https://images.unsplash.com/photo-1564769624456-ddd98b816dbb?w=800&h=400&fit=crop",
    likes: 24,
    comments: 8,
    shares: 3,
    timestamp: "2 jam yang lalu",
    tags: ["#Kajian", "#Tauhid"],
  },
  {
    id: "2",
    type: "masjid",
    author: { name: "Masjid Ar-Rahman", username: "masjid_arrahman", isVerified: true },
    content: "Alhamdulillah kajian kita kemaren berhasil! Jazakumullah khairal jaza всем yang sudah hadir 🙏\n\nMinggu depan kita akan bahas Fiqih Puasa. Stay tuned!",
    likes: 45,
    comments: 12,
    shares: 5,
    timestamp: "5 jam yang lalu",
    tags: ["#Fiqih", "#Puasa"],
  },
  {
    id: "3",
    type: "ustadz",
    author: { name: "Masjid Al-Ikhlas", username: "masjid_alikhlas", isVerified: true },
    content: "Kajian Kitab Tauhid bersama Ust. Abdurrahman, Lc. besok malam!\n\nJangan sampai missed yaa 南京天课清真寺",
    likes: 32,
    comments: 15,
    shares: 8,
    timestamp: "1 hari yang lalu",
    tags: ["#UstAbdurrahman", "#Tauhid"],
  },
  {
    id: "4",
    type: "ustadz",
    author: { name: "Masjid Nurul Iman", username: "masjid_nurul_iman", isVerified: true },
    content: "Dauroh Al-Quran 3 hari bersama Ust. Muhammad Faiz\n\n15-17 Maret 2026\nCP: 0812-xxxx-xxxx",
    image: "https://images.unsplash.com/photo-1548048026-5a1a941d93d3?w=800&h=400&fit=crop",
    likes: 67,
    comments: 23,
    shares: 12,
    timestamp: "2 hari yang lalu",
    tags: ["#UstMuhammadFaiz", "#Dauroh"],
  },
  {
    id: "5",
    type: "jamaah",
    author: { name: "Ahmad Fauzan", username: "ahmad_fauzan" },
    repostedBy: { name: "Ust. Abdurrahman", username: "ust_abdurrahman" },
    content: "Kajian yang sangat bermanfaat sekali. Thank you ustadz 🙏",
    likes: 12,
    comments: 2,
    shares: 1,
    timestamp: "3 jam yang lalu",
  },
  {
    id: "6",
    type: "jamaah",
    author: { name: "Fatimah Zahra", username: "fatimah_zahra" },
    repostedBy: { name: "Ustadzah Fatimah", username: "ustadzah_fatimah" },
    content: "Alhamdulillah habis ngikut dauroh yesterday. Ilmu yang sangat bernilai!",
    likes: 8,
    comments: 1,
    shares: 0,
    timestamp: "1 hari yang lalu",
  },
  {
    id: "7",
    type: "jamaah",
    author: { name: "Muhammad Rijal", username: "muh_rijal" },
    repostedBy: { name: "Masjid Al-Ikhlas", username: "masjid_alikhlas" },
    content: "Subhanallah kajian tadi malam begitu menggetarkan hati. Terus semangat menuntut ilmu! 📚",
    likes: 15,
    comments: 3,
    shares: 2,
    timestamp: "2 hari yang lalu",
  },
];

export function PageFavorites() {
  const [tab, setTab] = useState<FavTab>("all");
  const [feeds] = useState<FeedItem[]>(FEED_DATA);

  const filteredFeeds = tab === "all" 
    ? feeds 
    : feeds.filter(f => f.type === tab);

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

  return (
    <div className="mx-0 sm:mx-5 my-3 bg-white rounded-none sm:rounded-2xl shadow-sm border-b sm:border border-black/[0.04]">
      {feed.image && (
        <div className="relative">
          <img src={feed.image} alt="Post" className="w-full h-48 object-cover" />
          {feed.type === "masjid" && (
            <div className="absolute top-2 left-2 bg-[#0b3d2e] text-white text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1">
              <Landmark className="w-3 h-3" />
              Masjid
            </div>
          )}
          {feed.type === "ustadz" && (
            <div className="absolute top-2 left-2 bg-purple-600 text-white text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1">
              <User className="w-3 h-3" />
              Ustadz
            </div>
          )}
        </div>
      )}

      <div className="p-4">
        <div className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${feed.type === 'masjid' ? 'bg-emerald-100' : feed.type === 'ustadz' ? 'bg-purple-100' : 'bg-gray-200'}`}>
              {feed.type === 'masjid' ? (
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
