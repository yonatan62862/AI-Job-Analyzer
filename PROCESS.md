# PROCESS.md

## Architecture and Key Design Choices

The system follows a clear modular architecture with three main layers:

- **Frontend (React + TypeScript + TailwindCSS)**: Built with reusable components for Filters, KPI Cards, Charts, and Tables. Routing is handled by `react-router-dom`.
- **Backend (Node.js + Express + TypeScript)**: Provides REST API endpoints for fetching logs and metrics with support for filtering, sorting, and pagination.
- **AI Assistant (Gemini API)**: Accepts user questions and returns answers using structured JSON output, parsing job indexing logs from MongoDB.

The frontend and backend are clearly separated, with clean communication over HTTP. The AI Assistant is encapsulated in its own route and service module for clarity and scalability.

## AI Prompts and Iterations

We used a structured prompt to guide the AI assistant to generate JSON responses from logs:

```
You are an AI assistant that analyzes job indexing logs stored in MongoDB...

Format:
{
  "response": "Short summary of the answer in English",
  "query": { ... }
}
```

Iterations included:
- Enforcing ISO date format in strings.
- Preventing usage of `ObjectId()` or `ISODate()`.
- Making output strictly JSON and not Markdown or other formats.
- Asking follow-up questions like “What clients had the most failures?”

## Use of AI Tools During the Task

We leveraged **ChatGPT** throughout the development for:
- Designing reusable components (FiltersBar, KpiCards, Charts).
- Troubleshooting `Recharts` display issues.
- Optimizing pagination and filtering logic.
- Improving visual design (center alignment, icon replacement via `lucide-react`).
- Writing markdown documentation (`README.md` and this `PROCESS.md` file).

We also used ChatGPT to validate TypeScript types, suggest better chart configurations, and brainstorm UX improvements.

AI helped reduce development time, improve consistency, and resolve edge cases quickly.

---

This document summarizes key development decisions and AI-assisted reasoning.
