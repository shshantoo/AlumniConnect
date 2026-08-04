# 🎓 AlumniConnect — CSE Department Alumni & Career Network

AlumniConnect is a startup-quality **CSE Web Application** designed to seamlessly connect Students, Alumni tech leaders, Corporate Hiring Employers, and Department Faculty.

Built with **React 19**, **Vite**, **TypeScript**, **Tailwind CSS**, **Supabase**, **MapLibre GL + OpenFreeMap**, **Recharts**, and **Framer Motion**.

---

## 🎨 Visual Identity & Taste System
- **Theme**: Light Paper & Taste Skill Aesthetic (Shades of Warm White `#f8f6f0`, Electric Orange `#ff5500`, and Pitch Black `#0a0a0a`).
- **Interactive Map**: Global Alumni Hubs rendered via **OpenFreeMap** and **MapLibre GL**.
- **Role Portals**: Instant persona switching between **Student**, **Alumni**, **Employer**, **Faculty**, and **Admin**.

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

### 6. Run the Local Development Server
Start the Vite development server:
```bash
npm run dev
```
Open your browser and navigate to:
```text
http://localhost:5173
```

---

### 7. Build for Production
To generate an optimized production bundle:
```bash
npm run build
```
The output files will be generated inside the `dist/` folder.

---

## 🛠️ Project Architecture

```
AlumniConnect/
├── .env                        # Supabase environment configuration
├── index.html                  # HTML entry with MapLibre GL OpenFreeMap scripts
├── package.json                # Dependencies & npm scripts
├── vite.config.ts              # Vite config with path aliases & maplibre-gl optimizer rules
├── tailwind.config.js          # Custom theme tokens (Cream, Taste Orange, Pitch Black)
├── supabase/
│   └── schema.sql              # Complete 20+ tables SQL schema & RLS policies
└── src/
    ├── main.tsx                # Entry point
    ├── App.tsx                 # Root component with Supabase client test
    ├── context/
    │   └── AuthContext.tsx     # Role state, Supabase auth & interactive demo switcher
    ├── features/
    │   ├── auth/               # Unified Auth page & 1-click demo logins
    │   ├── dashboard/          # Student, Alumni, Employer, Faculty, Admin dashboards
    │   ├── directory/          # Alumni directory & OpenFreeMap vector map
    │   ├── jobs/               # Job & Internship hub & application modals
    │   ├── mentorship/         # 1-on-1 advisory session requests
    │   ├── events/             # Hackathons, webinars & RSVP registration
    │   ├── appointments/       # Faculty counseling scheduler
    │   └── profile/            # User profile view & edit modal
    ├── components/
    │   ├── layout/             # DemoRoleBar, Navbar, Sidebar, Footer
    │   └── common/             # PageTransition (Framer Motion wrapper)
    └── styles/
        └── globals.css         # Tailwind directives & Taste skill design tokens
```

---

## 📜 License
Developed for CSE Web Application Project.
