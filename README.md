# AI Chatbot Widget 🤖

A full-stack, plug-and-play AI chatbot widget for businesses — built with **React + Tailwind CSS** (frontend) and **Node.js + Express + Groq** (backend).

### 🌍 [Live Demo →](https://ai-chatbot-widget-nine.vercel.app)

---

## ✨ Features

| Feature | Detail |
|---|---|
| Floating chat bubble | Bottom-right, animates open/close |
| Unread badge | Shows when chat is closed |
| Typing indicator | Animated bouncing dots |
| Message history | Full conversation preserved in session |
| Business-aware AI | System prompt built from your config |
| Clear chat | One-click conversation reset |
| Mobile responsive | Works on all screen sizes |
| Brandable | Colors driven by `primaryColor` config |

---

## 🚀 Quick Start

### 1. Clone / enter the project

```bash
cd ai-chatbot-widget
```

### 2. Set up the Backend

```bash
cd backend
cp .env.example .env
# Edit .env and add your Groq API key
npm install
npm start
# → Runs on http://localhost:5000
```

### 3. Set up the Frontend

```bash
cd ../frontend
npm install
npm run dev
# → Runs on http://localhost:5173
```

Open **http://localhost:5173** — click the bubble in the bottom-right corner!

---

## 🔑 Get a Groq API Key

1. Go to [https://console.groq.com](https://console.groq.com)
2. Sign up (free)
3. Create an API key
4. Paste it into `backend/.env` as `GROQ_API_KEY=gsk_...`

---

## 🎨 Customizing for a New Client

All client configuration lives in **one file**:

```
backend/businessConfig.js
```

Edit it like this:

```js
const businessConfig = {
  businessName: "Dhaka Dental Clinic",       // ← Shown in chat header
  description: "Dental clinic in Dhaka...",  // ← Tells AI about the business
  faqs: [                                    // ← Key facts the AI should know
    "Open 9am-6pm Sat-Thu",
    "Call 01700-000000 to book",
    "We accept cash and bKash",
  ],
  primaryColor: "#2563eb",                   // ← Brand color (any hex)
};
```

**That's it.** Restart the backend (`npm start`) and the chatbot is fully customized.

### Color Examples

| Business Type | Suggested Color |
|---|---|
| Medical / Dental | `#2563eb` (blue) |
| Restaurant | `#dc2626` (red) |
| Spa / Wellness | `#7c3aed` (purple) |
| Real Estate | `#059669` (green) |
| Tech Startup | `#0f172a` (dark) |

---

## 📁 Project Structure

```
ai-chatbot-widget/
├── backend/
│   ├── server.js           # Express API + Groq integration
│   ├── businessConfig.js   # ← CLIENT CONFIG (edit this)
│   ├── .env.example        # Copy to .env and add API key
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ChatWidget.jsx      # Main floating widget
    │   │   ├── Message.jsx         # Individual message bubble
    │   │   ├── ChatInput.jsx       # Textarea + send button
    │   │   └── TypingIndicator.jsx # Animated dots
    │   ├── hooks/
    │   │   └── useChat.js          # Chat state & API calls
    │   ├── App.jsx                 # Demo page
    │   ├── main.jsx                # React entry point
    │   └── index.css               # Tailwind + animations
    ├── index.html
    └── vite.config.js
```

---

## 🔧 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/config` | Returns `businessName` and `primaryColor` |
| `POST` | `/api/chat` | Sends messages, returns AI reply |
| `GET` | `/health` | Health check |

### POST `/api/chat` payload

```json
{
  "messages": [
    { "role": "user", "content": "What are your opening hours?" }
  ]
}
```

### Response

```json
{
  "reply": "We are open 9am–6pm, Saturday to Thursday. ..."
}
```

---

## 🛠️ Environment Variables

### Backend (Render)

| Variable | Required | Description |
|---|---|---|
| `GROQ_API_KEY` | ✅ Yes | Your Groq API key |
| `PORT` | Optional | Backend port (default: `5000`) |
| `CORS_ORIGIN` | Optional | Allowed frontend origin (default: `*`) |

### Frontend (Vercel)

| Variable | Required | Description |
|---|---|---|
| `VITE_API_URL` | ✅ Yes | Full URL of the deployed backend |

---

## 🌐 Live Deployment

This project is deployed for free using:

| Service | Platform | URL |
|---|---|---|
| Frontend | Vercel | [ai-chatbot-widget-nine.vercel.app](https://ai-chatbot-widget-nine.vercel.app) |
| Backend | Render | [ai-chatbot-widget-xvzf.onrender.com](https://ai-chatbot-widget-xvzf.onrender.com) |

### Deploy Your Own

**Backend → [Render](https://render.com)** (Free Tier)
1. Import this repo → set **Root Directory** to `backend`
2. **Build Command:** `npm install` · **Start Command:** `node server.js`
3. Add env vars: `GROQ_API_KEY`, `CORS_ORIGIN` (your Vercel URL)

**Frontend → [Vercel](https://vercel.com)** (Free Tier)
1. Import this repo → set **Root Directory** to `frontend`
2. Add env var: `VITE_API_URL` (your Render backend URL)
3. Deploy — done!

---

## 📄 License

MIT — free to use for client projects.
