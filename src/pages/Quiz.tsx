import { CheckSquare } from "lucide-react";

export function PageQuiz() {
  return (
    <>
      <div className="flex-shrink-0 px-5 pt-10 pb-4" style={{ background: "linear-gradient(160deg,#0b3d2e 0%,#1a6b4a 70%)" }}>
        <h2 className="text-xl font-black text-white mb-0.5 flex items-center gap-2">
          <CheckSquare className="w-5 h-5" />
          Quiz
        </h2>
        <p className="text-[12px] text-white/55">Tes pengetahuan agama Islam</p>
      </div>

      <div className="flex-1 overflow-y-auto bg-[#f5f7f5] dark:bg-gray-900 p-5">
        <div className="text-center py-10">
          <div className="text-4xl mb-4">📝</div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Quiz Akan Hadir</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Quiz pasca kajian akan tersedia setelah kajian selesai.
            Nantikan informasi lebih lanjut!
          </p>
        </div>
      </div>
    </>
  );
}
