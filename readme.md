# CareerLens

So basically I built this tool called CareerLens. The idea is simple, you put in your current skills, experience and location, and it tells you honestly where you stand and where you can go. It predicts your realistic salary ceiling, checks how much AI can replace your job, and gives you a proper roadmap to level up.

---

## What all it does

### Salary Ceiling Prediction
It tells you max CTC you can realistically hit, in LPA/Crores if you're in India, or USD/EUR if you're abroad. Based on your current role and seniority.

### AI Replacement Risk
Gives a percentage score of how likely your job gets automated. Better to know now than later, right?

### Skill Recommendations
Lists out the exact skills you need to pick up to reach that top salary bracket. No generic stuff, it's based on your current tech stack.

### Career Pivots
Suggests high-paying roles you can switch to, like AI Engineer or Platform Engineer, using skills you already have. No need to start from scratch.

### Growth Roadmap
Breaks it down milestone by milestone, what to do in 0-6 months, 6-12 months, and so on. Practical, not just gyan.

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React + Vite |
| Backend | Express.js |
| AI | Google Gemini API (gemini-2.5-flash) |

---

## How to run this on your machine

Just two steps.

### Step 1 — Start the backend server

Open a terminal and go to the server folder:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the root (parent folder of server) and add your Gemini API key:
GEMINI_API_KEY="paste_your_key_here"

Start the server:

```bash
npm run dev
```

It will run on port `3001`. Keep this terminal open.

---

### Step 2 — Start the frontend

Open a **new** terminal and go to the client folder:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Run it:

```bash
npm run dev
```

Now open `http://localhost:5173/` in your browser and you're good to go.

---

That's it honestly. If you face any issues, most likely it's the API key or port conflict, check those first.
