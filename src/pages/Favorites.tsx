import { useState } from "react";
import type { FavTab, FeedItem } from "../types";
import { Heart, Landmark, User, MessageCircle, Share2, MoreHorizontal, Smile } from "lucide-react";

const FEED_DATA: FeedItem[] = [
  {
    id: "1",
    type: "kajian",
    author: { name: "Masjid Al-Ikhlas", avatar: undefined },
    content: "Kajian Kitab Tauhid\nSabtu, 22 Februari 2026\n08:00 - 10:00 WIB\n\n Bersama Ust. Abdurrahman, Lc.",
    image: "https://images.unsplash.com/photo-1564769624456-ddd98b816dbb?w=800&h=400&fit=crop",
    likes: 24,
    comments: 8,
    shares: 3,
    timestamp: "2 jam yang lalu",
    tags: ["#Tauhid", "#Kajian"],
  },
  {
    id: "2",
    type: "twitter",
    author: { name: "Ust. Abdurrahman", username: "@ust_abdurrahman" },
    content: "Barangsiapa yang menginginkan dunia maka harus dengan ilmu, dan siapa yang menginginkan akhirat maka harus dengan ilmu, dan siapa yang menginginkan keduanya maka harus dengan ilmu. — Imam Malik",
    likes: 156,
    comments: 23,
    shares: 45,
    timestamp: "5 jam yang lalu",
    tags: ["#Ilmu", "#Hikmah"],
  },
  {
    id: "3",
    type: "facebook",
    author: { name: "Komunitas Muslim Pekanbaru" },
    content: "Alhamdulillah yesterday kita successfully ngadain pengajian umum di Masjid At-Taqwa. Terima kasih buat semua Jamaah yang hadir! Matur suwun 🙏\n\nSemangat menuntut ilmu yaa南京天课清真寺",
    likes: 342,
    comments: 67,
    shares: 28,
    timestamp: "1 hari yang lalu",
  },
  {
    id: "4",
    type: "threads",
    author: { name: "Ustadzah Fatimah", username: "ustadzah.fatimah" },
    content: "Nahwu itu pintu gerbang belajar agama. Tanpa nahwu, kita akan kesulitan memahami Al-Quran dan hadits. Yuk sama-sama belajar! 📚\n\nSiap join kelas nahwu dasar bulan depan?",
    likes: 89,
    comments: 15,
    shares: 12,
    timestamp: "2 hari yang lalu",
    tags: ["#Nahwu", "#BahasaArab"],
  },
  {
    id: "5",
    type: "kajian",
    author: { name: "Masjid Ar-Rahman" },
    content: "Dauroh Al-Quran 3 Hari\n15-17 Maret 2026\nMeng Khatam Al-Quran & Tilawah\n\n ust. Muhammad Faiz",
    image: "https://images.unsplash.com/photo-1548048026-5a1a941d93d3?w=800&h=400&fit=crop",
    likes: 56,
    comments: 12,
    shares: 8,
    timestamp: "3 hari yang lalu",
    tags: ["#Dauroh", "#AlQuran"],
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
        <p className="text-[12px] text-white/55">Update kajian & status terbaru</p>
      </div>

      <div className="flex bg-white border-b border-black/[0.07] flex-shrink-0 overflow-x-auto">
        {[
          { id: "all" as FavTab, label: "Semua" },
          { id: "kajian" as FavTab, label: "Kajian" },
          { id: "twitter" as FavTab, label: "Twitter" },
          { id: "facebook" as FavTab, label: "Facebook" },
          { id: "threads" as FavTab, label: "Threads" },
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
          <FeedCard key={feed.id} feed={feed} />
        ))}
        <div className="h-6" />
      </div>
    </>
  );
}

function FeedCard({ feed }: { feed: FeedItem }) {
  return (
    <div className="mx-0 sm:mx-5 my-3 bg-white rounded-none sm:rounded-2xl shadow-sm border-b sm:border border-black/[0.04]">
      {feed.type === "kajian" && (
        <KajianFeed feed={feed} />
      )}
      {feed.type === "twitter" && (
        <TwitterFeed feed={feed} />
      )}
      {feed.type === "facebook" && (
        <FacebookFeed feed={feed} />
      )}
      {feed.type === "threads" && (
        <ThreadsFeed feed={feed} />
      )}
    </div>
  );
}

function KajianFeed({ feed }: { feed: FeedItem }) {
  return (
    <>
      {feed.image && (
        <div className="relative">
          <img src={feed.image} alt="Poster" className="w-full h-48 object-cover" />
          <div className="absolute top-2 left-2 bg-[#0b3d2e] text-white text-[10px] font-bold px-2 py-1 rounded-lg">
            KAJIAN
          </div>
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
            <Landmark className="w-4 h-4 text-[#0b3d2e]" />
          </div>
          <div>
            <div className="text-[13px] font-bold text-gray-900">{feed.author.name}</div>
            <div className="text-[11px] text-gray-400">{feed.timestamp}</div>
          </div>
        </div>
        <div className="text-[13px] text-gray-700 whitespace-pre-line mb-3">{feed.content}</div>
        {feed.tags && (
          <div className="flex gap-2 flex-wrap mb-3">
            {feed.tags.map((tag, i) => (
              <span key={i} className="text-[11px] text-[#0b3d2e] font-medium">{tag}</span>
            ))}
          </div>
        )}
        <FeedActions likes={feed.likes} comments={feed.comments} shares={feed.shares} />
      </div>
    </>
  );
}

function TwitterFeed({ feed }: { feed: FeedItem }) {
  return (
    <div className="p-4">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
          <User className="w-5 h-5 text-gray-500" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 mb-0.5">
            <span className="text-[14px] font-bold text-gray-900 truncate">{feed.author.name}</span>
            <span className="text-[12px] text-gray-400 truncate">{feed.author.username}</span>
            <span className="text-[12px] text-gray-400">· {feed.timestamp}</span>
          </div>
          <div className="text-[15px] text-gray-800 whitespace-pre-line mb-3 leading-normal">{feed.content}</div>
          {feed.tags && (
            <div className="flex gap-2 flex-wrap mb-3">
              {feed.tags.map((tag, i) => (
                <span key={i} className="text-[13px] text-[#0b3d2e]">{tag}</span>
              ))}
            </div>
          )}
          <FeedActions likes={feed.likes} comments={feed.comments} shares={feed.shares} />
        </div>
      </div>
    </div>
  );
}

function FacebookFeed({ feed }: { feed: FeedItem }) {
  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
          <span className="text-lg">👍</span>
        </div>
        <div>
          <div className="text-[14px] font-bold text-gray-900">{feed.author.name}</div>
          <div className="text-[11px] text-gray-400">{feed.timestamp} · 🌎</div>
        </div>
        <button className="ml-auto text-gray-400">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
      <div className="text-[14px] text-gray-800 whitespace-pre-line mb-3 leading-relaxed">{feed.content}</div>
      <div className="flex items-center justify-between text-[12px] text-gray-400 mb-2 pb-2 border-b border-gray-100">
        <span>{feed.likes} suka</span>
        <span>{feed.comments} komentar · {feed.shares} dibagikan</span>
      </div>
      <div className="flex justify-around pt-1">
        <button className="flex items-center gap-1.5 px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg">
          <Smile className="w-4 h-4" />
          <span className="text-[13px] font-semibold">Suka</span>
        </button>
        <button className="flex items-center gap-1.5 px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg">
          <MessageCircle className="w-4 h-4" />
          <span className="text-[13px] font-semibold">Komentar</span>
        </button>
        <button className="flex items-center gap-1.5 px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg">
          <Share2 className="w-4 h-4" />
          <span className="text-[13px] font-semibold">Bagikan</span>
        </button>
      </div>
    </div>
  );
}

function ThreadsFeed({ feed }: { feed: FeedItem }) {
  return (
    <div className="p-4">
      <div className="flex gap-3">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
            <User className="w-5 h-5 text-pink-600" />
          </div>
          <div className="w-0.5 flex-1 bg-gray-200 mt-2" />
          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mt-2">
            <Smile className="w-3 h-3 text-gray-500" />
          </div>
        </div>
        <div className="flex-1 pb-3">
          <div className="flex items-center justify-between mb-1">
            <div>
              <span className="text-[14px] font-bold text-gray-900">{feed.author.name}</span>
              <span className="text-[12px] text-gray-400 ml-1">@{feed.author.username}</span>
            </div>
            <span className="text-[12px] text-gray-400">{feed.timestamp}</span>
          </div>
          <div className="text-[14px] text-gray-800 whitespace-pre-line mb-3 leading-relaxed">{feed.content}</div>
          {feed.tags && (
            <div className="flex gap-2 flex-wrap mb-3">
              {feed.tags.map((tag, i) => (
                <span key={i} className="text-[13px] text-black">{tag}</span>
              ))}
            </div>
          )}
          <div className="flex items-center gap-6 text-gray-500">
            <button className="flex items-center gap-1.5">
              <Heart className="w-4 h-4" />
              <span className="text-[12px]">{feed.likes}</span>
            </button>
            <button className="flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4" />
              <span className="text-[12px]">{feed.comments}</span>
            </button>
            <button className="flex items-center gap-1.5">
              <Share2 className="w-4 h-4" />
              <span className="text-[12px]">{feed.shares}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeedActions({ likes, comments, shares }: { likes: number; comments: number; shares: number }) {
  return (
    <div className="flex items-center justify-between text-gray-400 text-[12px] pt-2 border-t border-gray-100">
      <div className="flex items-center gap-1">
        <Heart className="w-4 h-4" />
        <span>{likes}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1">
          <MessageCircle className="w-4 h-4" />
          {comments}
        </span>
        <span className="flex items-center gap-1">
          <Share2 className="w-4 h-4" />
          {shares}
        </span>
      </div>
    </div>
  );
}
