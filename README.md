# 🎓 AlumniConnect — Intelligent Career Development & Alumni Mentorship Platform

AlumniConnect is an enterprise-ready **Intelligent Career Development & Alumni Mentorship Platform** designed to seamlessly bridge University Students, Alumni leaders, Corporate Hiring Employers, University Faculty, and Career Services Administrators.

> **Core Value Proposition**: AlumniConnect helps students identify their career goals, analyze their technical skills, discover critical skill gaps, generate a personalized multi-phase roadmap, connect with the most compatible alumni mentors, and optimize their ATS CV with AI.

Built with **React 19**, **Vite**, **TypeScript**, **Tailwind CSS**, **Supabase (PostgreSQL & Storage)**, **MapLibre GL + OpenFreeMap**, `html2canvas` + `jspdf`, and **Framer Motion**.

---

## 🏛️ Overall System & Product Architecture

```text
                               ALUMNICONNECT
                                     │
      ┌──────────────────────────────┼──────────────────────────────┐
      │                              │                              │
   Student                        Alumni                         Admin
(Career Assessment &           (Mentorship Status &          (Career Paths &
   Skill Roadmap)               Reverse Matching)             Skill Weights)
      │                              │                              │
      └──────────────────────────────┼──────────────────────────────┘
                                     │
                     ┌───────────────┴───────────────┐
                     ▼                               ▼
           CAREER INTELLIGENCE               ALUMNI MENTORSHIP
                     │                               │
         ├── Career Assessment             ├── Smart Mentor Matching
         ├── Skill Gap Analysis            ├── 5-Factor Compatibility
         ├── Career Readiness Score        ├── AI Request Generator
         └── Personalized Roadmap          └── Mentorship Requests
                     │                               │
                     └───────────────┬───────────────┘
                                     │
                                     ▼
                        AI CV IMPROVEMENT ASSISTANT
                                     │
                         ├── Hybrid Score Engine
                         ├── Section AI Rewriter
                         └── Career Skill Integration
```

---

## 🌟 Key Unique Features & Application Logic

### 1. 🎯 Career Path Analyzer & Readiness Engine (`/career/assessment` & `/career/analysis`)
The student selects a target career goal (*Frontend Developer*, *Backend Developer*, *Full Stack*, *Data Analyst*, *UI/UX*, *Cybersecurity*) and rates their skill proficiencies:
- **Proficiency Values ($p_i$)**: `Not Learned` ($0.0$), `Beginner` ($0.25$), `Intermediate` ($0.50$), `Advanced` ($0.75$), `Expert` ($1.00$).
- **Mathematical Readiness Score Formula**:
  $$\text{Readiness Score } (\%) = \left( \frac{\sum (w_i \times p_i)}{\sum w_i} \right) \times 100$$
- **Skill Categorization**:
  - **Strong Areas**: $p_i \ge 0.75$
  - **Developing**: $0.25 \le p_i < 0.75$
  - **Skill Gaps**: $p_i < 0.25$

---

### 2. 🗺️ Interactive 4-Phase Career Roadmap (`/career/roadmap`)
- **Dynamic Phases**: *Phase 1: Web Fundamentals*, *Phase 2: Modern Frameworks*, *Phase 3: Professional Tools & APIs*, *Phase 4: Capstone Projects*.
- **Interactive Checkboxes**: Marking skills as completed dynamically recalculates the student's readiness score in real-time and unlocks upcoming phase milestones.

---

### 3. 🤝 Smart Alumni Mentor Matching Engine (`/mentorship/preferences` & `/mentorship/matches`)
- **5-Factor Compatibility Algorithm**:
  $$\text{Match Score} = (0.35 \times S) + (0.25 \times C) + (0.15 \times I) + (0.15 \times A) + (0.10 \times L)$$
  *Where $S=$ Skills, $C=$ Career Path, $I=$ Industry, $A=$ Availability, $L=$ Format/Location.*
- **Explainable Results**: Generates human-readable *"Why this mentor?"* reasoning and breakdown percentages.
- **✨ AI Suggested Request Note**: 1-click generator crafting personalized, professional mentorship pitches combining mentor role, company, and student goals.

---

### 4. ✨ AI CV Improvement Assistant (`/cv/ai-review`)
- **Hybrid Rule-Based Scoring**:
  $$\text{CV Score} = (\text{Profile} \times 15\%) + (\text{Summary} \times 15\%) + (\text{Experience} \times 20\%) + (\text{Skills} \times 15\%) + (\text{Projects} \times 20\%) + (\text{Education} \times 10\%) + (\text{Contact} \times 5\%)$$
- **Section-by-Section AI Analysis**: Analyzes summary, experience, projects, and contact links separately.
- **User Control**: Side-by-side **Current Text** vs **✨ AI Suggestion** with `[ Accept ]` and `[ Reject ]` buttons. Recalculates CV score upon application (*e.g. 68 → 78*).

---

### 5. 👥 Multi-Tenant Role Portals
- **Student Portal**: Highlights target career goal, readiness score %, next priority step, top mentor match, and roadmap progress.
- **Alumni Portal**: Mentorship status toggle, active mentee tracker (2/3), pending student applications, impact stats, and reverse student recommendations.
- **Admin Control Center**: Manage Career Paths, Skills Library, and Skill Importance Weights ($w_i = 1 \dots 10$).

---

## 🎨 Visual Identity & Taste System
- **Theme**: Light Paper & Taste Skill Aesthetic (Warm White `#f8f6f0`, Electric Orange `#ff5500`, Pitch Black `#0a0a0a`).
- **Spatial Map**: Global Alumni Hubs rendered via **OpenFreeMap** and **MapLibre GL**.

---

## 🚀 Quick Start & Local Setup

### 1. Prerequisites
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
```bash
npm install
```

---

### 4. Configure Environment Variables
Create or verify `.env` in the root directory:
```env
VITE_SUPABASE_URL=https://zhikurpgjuqsdalmdcjr.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_OsNMkEz3H6GwOtoJmozgmg_zbQYQMgw
```

---

### 5. Supabase Database Setup
Initialize the 26+ PostgreSQL database tables in your Supabase project:
1. Log in to [Supabase Dashboard](https://supabase.com/dashboard).
2. Go to **SQL Editor** (`>_`).
3. Copy all content from [`supabase/schema.sql`](./supabase/schema.sql) and click **Run**.

---

### 6. Run the Application Locally
Launch Vite development server:
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

---

## 📦 Production Deployment (GitHub Pages)

Automated deployment is configured via GitHub Actions (`.github/workflows/deploy.yml`):
- **Live URL**: [https://shshantoo.github.io/AlumniConnect/](https://shshantoo.github.io/AlumniConnect/)
