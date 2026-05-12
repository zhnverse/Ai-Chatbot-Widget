# AI Chatbot Widget 🤖

A full-stack, plug-and-play AI chatbot widget for businesses — built with **React + Tailwind CSS** (frontend) and **Node.js + Express + Groq** (backend).

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

| Variable | Required | Description |
|---|---|---|
| `GROQ_API_KEY` | ✅ Yes | Your Groq API key |
| `PORT` | Optional | Backend port (default: `5000`) |

---

## 🌐 Deploying to Production

### Backend (e.g. Railway, Render, Fly.io)
1. Set `GROQ_API_KEY` as an environment variable
2. Set start command to `node server.js`

### Frontend (e.g. Vercel, Netlify)
1. Update the `proxy` in `vite.config.js` to point to your deployed backend URL
2. Or set `VITE_API_URL` and update `axios` base URL in `useChat.js`

---

## 📄 License

MIT — free to use for client projects.
