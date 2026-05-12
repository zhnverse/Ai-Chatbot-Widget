import "./index.css";
import ChatWidget from "./components/ChatWidget";

// Demo page — replace this with any real page/site content
export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col items-center justify-center px-4">
      {/* Demo hero */}
      <div className="max-w-2xl w-full text-center py-20">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
          AI Chatbot Widget Demo
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight mb-4">
          Your Business,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
            Powered by AI
          </span>
        </h1>
        <p className="text-slate-500 text-lg mb-10 leading-relaxed">
          A plug-and-play AI chatbot widget that learns your business and answers customer questions 24/7. Click the bubble in the <strong>bottom-right</strong> corner to try it!
        </p>

        {/* Feature badges */}
        <div className="flex flex-wrap justify-center gap-3">
          {[
            "💬 Smart Conversations",
            "⚡ Groq-Powered",
            "🎨 Fully Brandable",
            "📱 Mobile Responsive",
            "🔧 Easy to Customize",
          ].map((f) => (
            <span
              key={f}
              className="bg-white border border-slate-200 text-slate-700 text-sm px-4 py-2 rounded-full shadow-sm font-medium"
            >
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* Chat Widget always mounted — floats over everything */}
      <ChatWidget />
    </div>
  );
}
