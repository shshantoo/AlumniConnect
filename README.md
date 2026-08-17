# 🎓 AlumniConnect — University Alumni, Career & Placement Management Platform

AlumniConnect is a comprehensive, enterprise-ready **University Alumni, Career & Placement Management Platform** designed to seamlessly bridge Students, Alumni leaders, Corporate Hiring Employers, University Faculty, and Career Services Administrators.

Built with **React 19**, **Vite**, **TypeScript**, **Tailwind CSS**, **Supabase (PostgreSQL & Storage)**, **MapLibre GL + OpenFreeMap**, `html2canvas` + `jspdf`, and **Framer Motion**.

---

## 🏛️ Overall System & Product Architecture

AlumniConnect operates as **6 interconnected ecosystems** serving the entire university lifecycle from academic study to career placement and global alumni networking:

```
                         AlumniConnect
                              │
       ┌──────────────┬───────┼────────┬──────────────┐
       │              │       │        │              │
    Alumni         Student  Employer  Faculty       Admin
       │              │       │        │              │
       └──────────────┴───────┼────────┴──────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
              Career Center       Alumni Network
                    │                   │
              Jobs/Internships      Directory
              Applications          Mentorship
              Counseling            Alumni Map
              Resume/CV             Events
                    │                   │
                    └─────────┬─────────┘
                              │
                         Notifications
                              │
                           Analytics
```

---

## 🎨 Visual Identity & Taste System
- **Theme**: Light Paper & Taste Skill Aesthetic (Shades of Warm White `#f8f6f0`, Electric Orange `#ff5500`, and Pitch Black `#0a0a0a`).
- **Interactive Spatial Map**: Global Alumni Hubs rendered via **OpenFreeMap** and **MapLibre GL**.
- **Role Portals**: Role-based access control for **Student**, **Alumni**, **Employer**, **Faculty**, and **Admin**.

---

## 🚀 Quick Start & Initialization Guide

### 1. Prerequisites
Ensure you have the following installed on your machine:
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher
- **Git**

---

### 2. Clone the Repository
```bash
git clone https://github.com/shshantoo/AlumniConnect.git
cd AlumniConnect
```

---

### 3. Install Dependencies
Run the command below to install all frontend & Supabase packages:
```bash
npm install
```

---

### 4. Configure Environment Variables
Create or verify the `.env` file in the root directory:
```env
VITE_SUPABASE_URL=https://zhikurpgjuqsdalmdcjr.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_OsNMkEz3H6GwOtoJmozgmg_zbQYQMgw
```

---

### 5. Supabase Database Migration Setup
To initialize the 20+ PostgreSQL database tables in your Supabase project:
1. Log in to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Select your project (**`zhikurpgjuqsdalmdcjr`**).
3. Go to **SQL Editor** (`>_`) in the left menu.
4. Click **+ New query**.
5. Copy all content from [`supabase/schema.sql`](./supabase/schema.sql) and paste it into the query window.
6. Click **Run** (`Ctrl + Enter`).

---

### 6. Run the Application Locally
Launch the Vite development server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

---

## 📦 Production Deployment (GitHub Pages)
The application is configured to automatically deploy to GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`):
- **Live URL**: [https://shshantoo.github.io/AlumniConnect/](https://shshantoo.github.io/AlumniConnect/)
