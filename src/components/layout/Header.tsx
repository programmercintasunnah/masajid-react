interface HeaderProps {
  userName?: string;
  userPhoto?: string;
}

export function Header({ userName, userPhoto }: HeaderProps) {
  return (
    <div className="flex items-center justify-between px-5 pt-5 pb-3" style={{ background: "linear-gradient(160deg,#0b3d2e,#1a6b4a 60%)" }}>
      <div className="text-[18px] font-black text-white">MasajidApp</div>
      <div className="flex items-center gap-3">
        <button className="relative p-1">
          <div className="w-6 h-6 flex items-center justify-center text-white text-lg">🔔</div>
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-[#1a6b4a]"></span>
        </button>
        <div className="w-9 h-9 rounded-full bg-white/20 overflow-hidden border-2 border-white/30">
          {userPhoto ? (
            <img src={userPhoto} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white text-sm font-bold">
              {userName?.charAt(0).toUpperCase() || "U"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
