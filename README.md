# AI-Job-Analyzer

This is a full-stack web dashboard that helps visualize job indexing logs from MongoDB. The app provides tools for filtering, sorting, and analyzing job indexing metrics per client, country, and date.

## 🚀 Features

- 🌐 Dashboard to explore logs and trends
- 📄 Filter logs by client, country, and date range
- 📈 Interactive charts for jobs over time, failures, and averages
- 🧠 AI Assistant that answers questions and generates queries using Gemini

## 📦 Technologies

- **Frontend**: React + TypeScript + Tailwind CSS + Recharts
- **Backend**: Node.js + Express + TypeScript + MongoDB
- **AI**: Gemini API for AI Assistant
- **Icons**: Lucide-react

## 🛠️ Setup Instructions

1. **Clone the repo**

bash:
git clone https://github.com/yonatan62862/ai-job-analyzer.git

1. Install server dependencies:
cd server
npm install

2. Set up environment variables

3. Create a .env file in /server:
PORT=4000
MONGODB_URI=mongodb://localhost:27017/your-db-name
GEMINI_API_KEY=your-api-key

4.Run the server
npm run dev

5. Install client dependencies
cd ../client
npm install

6. Run the client
npm run dev

7. Open your browser at: http://localhost:5173

📁 Folder Structure:
client/
 src
├── App.css
├── App.tsx
├── assets
│   └── react.svg
├── components
│   ├── DashboardCharts.tsx
│   ├── DashboardTable.tsx
│   ├── FiltersBar.tsx
│   ├── KpiCards.tsx
│   └── Navbar.tsx
├── hooks
│   └── useDashboardAggregations.ts
├── index.css
├── main.tsx
├── pages
│   ├── Assistant.tsx
│   └── Dashboard.tsx
├── services
│   └── logService.ts
├── types.ts
└── vite-env.d.ts

server/
src
├── app.ts
├── controllers
│   ├── assistantController.ts
│   ├── dashboardController.ts
│   └── kpiController.ts
├── index.ts
├── models
│   └── logModel.ts
├── prompts
│   └── logAnalyzerPrompt.ts
├── routes
│   ├── assistantRoute.ts
│   ├── dashboardRoute.ts
│   └── kpiRoute.ts
└── services
    └── geminiService.ts


