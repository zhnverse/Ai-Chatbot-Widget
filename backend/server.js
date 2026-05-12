require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Groq = require("groq-sdk");
const businessConfig = require("./businessConfig");

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Groq Client ─────────────────────────────────────────────────────────────
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// ─── Build System Prompt from Business Config ─────────────────────────────────
function buildSystemPrompt(config) {
  const faqList = config.faqs.map((f, i) => `  ${i + 1}. ${f}`).join("\n");
  return `You are a helpful and friendly AI assistant for "${config.businessName}".

About the business:
${config.description}

Important information you should know and use when answering questions:
${faqList}

Guidelines:
- Be concise, warm, and professional.
- Answer only questions related to this business or its services.
- If a question is outside your knowledge, politely say you don't have that information and suggest they call or visit.
- Never make up information.
- Keep responses short and easy to read (3–5 sentences max unless detail is needed).
- Greet users warmly if this is the start of the conversation.`;
}

// ─── Expose Config to Frontend ────────────────────────────────────────────────
app.get("/api/config", (req, res) => {
  const { businessName, primaryColor } = businessConfig;
  res.json({ businessName, primaryColor });
});

// ─── Chat Endpoint ────────────────────────────────────────────────────────────
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "messages array is required." });
  }

  try {
    const systemPrompt = buildSystemPrompt(businessConfig);

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 512,
    });

    const reply = completion.choices[0]?.message?.content ?? "Sorry, I couldn't generate a response.";
    res.json({ reply });
  } catch (err) {
    console.error("Groq API error:", err?.message ?? err);
    res.status(500).json({ error: "Failed to get a response from the AI." });
  }
});

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get("/health", (req, res) => res.json({ status: "ok" }));

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅  Chatbot backend running → http://localhost:${PORT}`);
  console.log(`📋  Business: ${businessConfig.businessName}`);
});
