export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-2 msg-enter">
      {/* Avatar */}
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shrink-0 mt-1">
        <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 3a1 1 0 011 1v3.586l2.707 2.707a1 1 0 01-1.414 1.414l-3-3A1 1 0 019 10V6a1 1 0 011-1z" />
        </svg>
      </div>
      {/* Bubble */}
      <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex items-center gap-1.5">
        <span className="dot text-slate-400" />
        <span className="dot text-slate-400" />
        <span className="dot text-slate-400" />
      </div>
    </div>
  );
}
