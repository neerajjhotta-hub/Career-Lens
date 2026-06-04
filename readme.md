# CareerLens

"Where does your career go next?" — AI-powered talent diagnostic tool.

CareerLens is a talent diagnostic application built for freshers and experienced folks to predict their realistic salary ceiling (CTC/LPA), AI replacement risk, and future demand. It also shares a growth roadmap and recommends high-growth pivots (like AI Engineer or Platform Engineer).

---

## Key Features

1. **CTC/Salary Ceiling Prediction:** Predicts realistic package ceilings based on country and seniority (e.g., in Lakhs/Crores LPA for Indian developers, USD/EUR for others).
2. **AI Automation Risk Assessment:** Calculates the probability score of your job being automated by AI.
3. **Recommended Skillset:** Suggests critical skills you need to acquire to hit that top salary bracket.
4. **Strategic Pivots:** Recommends high-paying roles that leverage your existing tech stack.
5. **Growth Roadmap:** Clear milestone timeline (0-6 months, 6-12 months, etc.) to upgrade yourself.

---

## Tech Stack

- **Frontend:** React + Vite (Vanilla CSS styling with premium dark/light mode toggle)
- **Backend:** Express.js hosted as a Vercel Serverless Function
- **AI Engine:** Google Gemini AI API (gemini-1.5-flash)

---

## How to Run the App (Local Setup)

Kindly follow the below steps to run this project on your system.

### Step 1: Set up the Backend Server
1. Go to the server directory first:
   ```bash
   cd server
   ```
2. Install the node packages:
   ```bash
   npm install
   ```
3. Create a .env file in the root directory (or parent of the server directory) and put your API key inside:
   ```env
   GEMINI_API_KEY="your_actual_gemini_api_key"
   ```
4. Start the server:
   ```bash
   npm run dev
   ```
   *Your server will start listening on port 3001 only.*

### Step 2: Set up the Frontend Client
1. Open another terminal and go to the client directory:
   ```bash
   cd client
   ```
2. Install client-side dependencies:
   ```bash
   npm install
   ```
3. Start the Vite dev server:
   ```bash
   npm run dev
   ```
   *The client will start running on http://localhost:5173/.*

---

## Vercel Deployment

We have already added the vercel.json file in the root directory to handle serverless function mapping automatically.

### Important steps for production deployment:
1. **Environment Variables:** Kindly add the GEMINI_API_KEY on your Vercel Dashboard under Project Settings > Environment Variables. Do not upload the .env file directly.
2. **API Rewrites:** All API requests going to /api/* are automatically routed to api/index.js which behaves as a Serverless Function on Vercel.

