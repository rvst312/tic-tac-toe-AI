# 🎮 Tic Tac Toe – Full Stack App

Classic Tic Tac Toe game built with **Next.js**, **Tailwind CSS**, and **ShadCN UI**. Features a clean UI, simple AI logic via API, and a persistent match ranking system.

---

## 🧪 Tech Stack

* **Next.js (App Router)** – React Framework for Full Stack apps
* **Tailwind CSS** – Utility-first styling
* **ShadCN UI** – Accessible, customizable component library
* **MongoDB** – Database to store match results
* **TypeScript** – Type-safe JavaScript
* **Vercel / Node.js API Routes** – For AI logic & ranking system

---

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/your-username/tic-tac-toe.git
cd tic-tac-toe

# 2. Install dependencies
npm install

# 3. Add environment variables
cp .env.example .env.local
# Then update MONGODB_URI with your connection string

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to play.

---

## 📁 Project Structure

```bash
tic-tac-toe/
├── app/
│   ├── page.tsx              # Game UI
│   ├── api/
│   │   ├── move/route.ts     # POST: IA next move
│   │   └── ranking/route.ts  # GET/POST: match results
│   └── layout.tsx            # Global layout & theme
├── components/
│   ├── Board.tsx             # 3x3 grid
│   ├── Status.tsx            # Turn & game state
│   ├── Ranking.tsx           # Match results table
│   └── ui/                   # ShadCN components
├── lib/
│   ├── game.ts               # Game logic (win, draw, next move)
│   └── db.ts                 # MongoDB connection
├── styles/
│   └── globals.css
├── public/
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## 🧠 Architecture Overview

```plaintext
               CLIENT (Next.js App)
               ┌──────────────────────────┐
               │  UI: page.tsx       │
               │  Board / Status /   │
               │  Ranking Components │
               └────────────────┘
                        │
         ┌──────────────────────────────┐
         │       API Routes (App)      │
         │   /api/move      /api/ranking
         └────────────────────────┘
                  │
         ┌──────────────────┐
         │  Game Logic     │  ← checkWinner(), getNextMove()
         │  lib/game.ts    │
         └────────────────┘
                  │
         ┌───────────────────┐
         │    Database (DB)   │  ← MongoDB Atlas (or local)
         │ lib/db.ts          │
         └───────────────────┘
```

---

## 📡 API Endpoints

### `POST /api/move`

Returns the AI's next move based on the current board.

**Request body:**

```json
{
  "board": ["X", null, "O", null, "X", null, null, null, null]
}
```

**Response:**

```json
{
  "index": 5
}
```

---

### `GET /api/ranking`

Returns the total number of wins, draws, and losses.

```json
{
  "player": { "wins": 2, "losses": 3, "draws": 1 },
  "machine": { "wins": 3, "losses": 2, "draws": 1 }
}
```

---

### `POST /api/ranking`

Stores the result of a match.

**Request body:**

```json
{
  "result": "draw" | "player" | "machine"
}
```

---

## 📌 Notes

* AI logic is basic (not unbeatable), just good enough for a fun match.
* Game state, validation, and outcome calculation are done server-side.
* Responsive UI via Tailwind + ShadCN ensures smooth experience across devices.

---

## 🧠 Why This Stack?

> **Next.js App Router** gives full flexibility for UI + API in one place.
> **Tailwind + ShadCN** ensures fast, accessible, polished UI.
> **MongoDB** is fast to set up and perfect for storing simple match stats.

---

## 🧼 Clean Code & Commit History

Git history shows incremental decisions and progress. Each commit reflects small, focused improvements — from UI layout to server routes and game logic isolation.

---

## 📄 License

MIT – feel free to fork, modify and build on it 🚀
