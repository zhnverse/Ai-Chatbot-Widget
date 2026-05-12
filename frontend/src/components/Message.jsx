export default function Message({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex items-end gap-2 msg-enter ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {/* Avatar */}
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shrink-0 mb-0.5">
          <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
          </svg>
        </div>
      )}

      {/* Bubble */}
      <div
        className={`
          max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm
          ${isUser
            ? "bg-blue-600 text-white rounded-br-sm"
            : "bg-white border border-slate-200 text-slate-800 rounded-bl-sm"
          }
        `}
        style={isUser ? { backgroundColor: "var(--primary-color)" } : {}}
      >
        <p className="m-0 whitespace-pre-wrap">{message.content}</p>
      </div>

      {/* User avatar */}
      {isUser && (
        <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center shrink-0 mb-0.5">
          <svg className="w-3.5 h-3.5 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </div>
  );
}
