# 🎓 AlumniConnect — Intelligent University CSE Alumni Networking & Career Development Web Application

AlumniConnect is an enterprise-ready, full-stack **Intelligent Career Development & University CSE Alumni Networking Application**. It bridges CSE Students, Alumni Industry Professionals, and System Administrators through real-time career intelligence, AI resume optimization, compatible alumni mentorship matching, and an interactive Q&A community platform.

> **Core Value Proposition**: AlumniConnect empowers university CSE students to identify career goals, compute mathematical readiness scores, analyze technical skill gaps, follow personalized 4-phase roadmaps, connect with verified alumni mentors, optimize resumes with AI, and participate in a real-time community discussion network.

---

## 🚀 Key Modules & System Architecture

```text
                                ALUMNICONNECT
                                      │
       ┌──────────────────────────────┼──────────────────────────────┐
       │                              │                              │
    STUDENT                        ALUMNI                          ADMIN
 (Career Readiness,           (Mentorship Pool,            (Governance, Weights,
  Community Questions)         Answers & Advice)             Community Moderation)
       │                              │                              │
       └──────────────────────────────┼──────────────────────────────┘
                                      │
       ┌──────────────────────────────┼──────────────────────────────┐
       ▼                              ▼                              ▼
CAREER INTELLIGENCE          ALUMNI MENTORSHIP              COMMUNITY NETWORK
       │                              │                              │
 ├── Skill Gap Engine        ├── 5-Factor Match Score       ├── Discussion Feed
 ├── 4-Phase Roadmap         ├── Student Profile Modal      ├── Accepted Answers
 ├── Readiness Meter (%)     ├── Mentorship Applications    ├── 1-Level Replies
 └── AI CV Reviewer          └── AI Note Pitcher            └── Real-time Updates
```

---

## 🌟 Primary Feature Suite

### 1. 💬 AlumniConnect Community Platform (`/community`)
- **University Q&A Newsfeed**: Inspired by Quora and Reddit interaction models, students ask questions and alumni share real-world engineering experiences.
- **4 Feed Sorting Algorithms**:
  - **Latest**: Chronological newest discussions first.
  - **Popular**: Popularity score formula:
    $$\text{Popularity Score} = (\text{Upvotes} \times 3) + (\text{Answers} \times 5) + \frac{100}{\text{AgeInHours} + 2}$$
  - **Unanswered**: Open questions with 0 answers.
  - **My Feed**: Relevance score formula:
    $$\text{Relevance Score} = (\text{DeptMatch} \times 30) + (\text{CareerMatch} \times 30) + (\text{SkillTagMatch} \times 25) + (\text{CategoryMatch} \times 15)$$
- **✓ Accepted Answer System**: Question authors can mark one answer as the verified accepted answer.
- **Single-Level Nested Replies**: Interactive replies under answers without deep comment clutter.
- **Upvoting & Saving**: 1-click upvotes with duplicate vote protection and bookmarked discussions (`/community/saved`).
- **Supabase Realtime**: Live updates for questions, answers, and replies without page refreshing.
- **✨ AI Question Assistant**: Improves grammar, structure, and title clarity with user preview control.
- **🛡️ Admin Moderation Center (`/admin/community`)**: Admin dashboard for hiding, restoring, or deleting content and resolving flagged reports.

---

### 2. 🎯 Career Intelligence & Readiness Engine (`/career/assessment` & `/career/analysis`)
- **Target Specializations**: *Frontend Developer*, *Backend Developer*, *Full Stack*, *Data Analyst*, *UI/UX*, *Cybersecurity*.
- **Skill Proficiency Levels ($p_i$)**: `Not Learned` ($0.0$), `Beginner` ($0.25$), `Intermediate` ($0.50$), `Advanced` ($0.75$), `Expert` ($1.00$).
- **Mathematical Readiness Formula**:
  $$\text{Readiness Score } (\%) = \left( \frac{\sum (w_i \times p_i)}{\sum w_i} \right) \times 100$$
- **Skill Classification**: Strong Areas ($p_i \ge 0.75$), Developing ($0.25 \le p_i < 0.75$), and Skill Gaps ($p_i < 0.25$).

---

### 3. 🗺️ Interactive 4-Phase Career Roadmap (`/career/roadmap`)
- **4 Sequential Phases**: *Phase 1: Web Fundamentals*, *Phase 2: Modern Frameworks*, *Phase 3: Professional Tools & APIs*, *Phase 4: Capstone Projects*.
- **Live Progress Tracking**: Checking off skill milestones dynamically recalculates readiness score percentages in real time.

---

### 4. 🤝 Smart Alumni Mentor Matcher (`/mentorship/preferences` & `/mentorship/matches`)
- **5-Factor Compatibility Algorithm**:
  $$\text{Match Score} = (0.35 \times S) + (0.25 \times C) + (0.15 \times I) + (0.15 \times A) + (0.10 \times L)$$
  *Where $S=$ Skills, $C=$ Career Path, $I=$ Industry, $A=$ Availability, $L=$ Format/Location.*
- **Student Profile Capability Inspection**: Alumni mentors can inspect student readiness scores, 1-5 skill matrices, portfolio projects, and CV summaries before accepting mentorship applications.
- **✨ AI Suggested Pitch Generator**: 1-click pitch generator crafting tailored mentorship application notes.

---

### 5. ✨ AI CV Improvement Assistant (`/cv/ai-review`)
- **Hybrid Rule Scoring**:
  $$\text{CV Score} = (\text{Profile} \times 15\%) + (\text{Summary} \times 15\%) + (\text{Experience} \times 20\%) + (\text{Skills} \times 15\%) + (\text{Projects} \times 20\%) + (\text{Education} \times 10\%) + (\text{Contact} \times 5\%)$$
- **Section-by-Section AI Rewriter**: Real-time side-by-side comparison of **Current Text** vs **✨ AI Suggestion** with instant score updates.
- **A4 PDF Export**: Multi-template printable CV generator powered by `html2canvas` and `jspdf`.

---

## 👥 Current Active Roles (3 Roles Only)

1. 🎓 **Student**:
   - Accesses Career Readiness Engine, Roadmap, Mentor Matches, AI CV Reviewer, Community Feed, Ask Question, My Questions, and Saved Discussions.
2. 💼 **Alumni**:
   - Manages Mentorship Requests, evaluates candidate readiness profiles via `StudentProfileModal`, answers student questions, upvotes, and posts community discussions.
3. 🛡️ **Admin**:
   - System Governance, manages Career Skill Weights ($w_i = 1 \dots 10$), Admin Community Moderation Panel (`/admin/community`), hides/restores content, and resolves flagged reports.

*(Note: Faculty and Employer roles have been fully removed from the codebase).*

---

## 🎨 Design System & Aesthetic Tokens
- **Theme Palette**: Light Warm Canvas (`#f8f6f0`), Electric Orange Accent (`#ff5500`), Pitch Black (`#0a0a0a`), Clean Slate Cards (`#ffffff`).
- **Micro-Interactions**: Micro-sheen hover highlights, active scaling (`active:scale-[0.98]`), dynamic badges.
- **Map Visualization**: Global alumni hubs rendered via **MapLibre GL** and **OpenFreeMap**.

---

## 🛠️ Technology Stack
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide Icons.
- **Backend & Database**: Supabase (PostgreSQL, Realtime, Storage).
- **PDF & Canvas**: `jspdf`, `html2canvas`.
- **Geospatial**: `maplibre-gl`.

---

## 🚀 Local Development Setup

### 1. Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher
- **Git**

### 2. Clone Repository
```bash
git clone https://github.com/shshantoo/AlumniConnect.git
cd AlumniConnect
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=https://zhikurpgjuqsdalmdcjr.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_OsNMkEz3H6GwOtoJmozgmg_zbQYQMgw
```

### 5. Supabase Database Setup
Execute database migrations in your [Supabase SQL Editor](https://supabase.com/dashboard):
- Copy and run [`supabase/schema.sql`](./supabase/schema.sql) to set up PostgreSQL tables, database indexes, and Row Level Security policies.

### 6. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Production Build & Deployment

### Run Production Build
```bash
npm run build
```

Automated production deployment is configured via GitHub Actions:
- **Live URL**: [https://shshantoo.github.io/AlumniConnect/](https://shshantoo.github.io/AlumniConnect/)
