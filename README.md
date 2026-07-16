# MedGrowth OS 🏥📈

**MedGrowth OS** is an enterprise Hospital Marketing Management Platform designed to optimize, monitor, and streamline marketing operations across multiple clinical entities.

This platform empowers hospital networks to manage both digital and offline marketing footprints, maintain centralized media libraries, deploy targeted campaigns, monitor vendor disbursements, and track comprehensive marketing-to-patient conversion pipelines with AI-powered insights.

---

## 🚀 How to Export/Push to GitHub Directly from AI Studio

Google AI Studio provides a native, built-in feature to export or push your workspace directly to GitHub with a few clicks:

1. **Locate the Workspace Menu**: Look at the top-right corner of the Google AI Studio interface (near the project status and sharing controls).
2. **Open settings / Export options**: Click on the **Settings** gear icon or the **Export** menu options.
3. **Select "Export to GitHub"**:
   - You will be prompted to authenticate with your GitHub account (if you haven't already).
   - Select your target organization/username.
   - Choose to either **create a new repository** (e.g., `medgrowth-os`) or push to an **existing repository**.
   - Select whether the repository should be **Public** or **Private**.
4. **Initiate Export**: Click **Export**. AI Studio will automatically package your entire updated workspace (including all source files, configurations, and SQL schemas) and commit them to your specified GitHub repository.

---

## 🗄️ Supabase/PostgreSQL Database Integration

This project is fully integrated with a Postgres backend (Supabase). The SQL schema has been modularly prepared for you.

### 1. Database Schema Deployment
To provision your database, copy the full content of the **`supabase_schema.sql`** file in this repository and run it in your Supabase SQL Editor:
1. Go to your **Supabase Dashboard** -> select your project.
2. Click on **SQL Editor** in the left navigation sidebar.
3. Click **New Query**, paste the contents of `supabase_schema.sql`, and click **Run**.
4. This creates your tables (`marketing_activities`, etc.) with built-in Row-Level Security (RLS) policies allowing secure reading, editing, and deleting.

### 2. Connect Your Credentials
Once your database is created, obtain your credentials from the Supabase dashboard (**Project Settings** -> **API**):
- **Project URL** (e.g. `https://yourproject.supabase.co`)
- **Anon Public API Key** (e.g. `eyJhbGciOi...`)

Add these credentials to your environment variables in AI Studio (under the **Settings** or **Secrets** panel) or locally in your `.env` file:
```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_public_key
GEMINI_API_KEY=your_gemini_api_key
```

---

## 🛠️ Local Development & Running the App

The repository is built as a highly performant full-stack Node/React app powered by **Vite** and **Express**.

### Prerequisites
- Node.js (v18+)
- npm, yarn, or bun

### Setup Steps
1. **Clone the repository** (after exporting to GitHub):
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Configure Environment Variables**:
   Create a `.env` file in the root directory based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Add your keys (`SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `GEMINI_API_KEY`).

4. **Run Development Mode**:
   ```bash
   npm run dev
   ```
   This will boot the Express backend proxying live assets and database channels on `http://localhost:3000`.

5. **Build & Start Production Mode**:
   ```bash
   npm run build
   npm start
   ```

---

## 📦 Project Architecture Highlights

- **Vite + React SPA (Frontend)**: Standard, lightning-fast rendering of interactive charts, paginated tables, filtering matrices (categorized by Hospital, Channel Type, Status, and Month), and inline modal dialogs.
- **Express Server (Backend Proxy)**: Keeps your Supabase credentials and Gemini API keys strictly hidden from the client browser. Proxy endpoints (`/api/activities`, `/api/insights`) route requests securely.
- **Robust Schema Fallback**: If no Supabase connection keys are supplied, the server automatically boots an active memory-only storage database initialized with realistic seeds. This allows zero-config preview environments.
