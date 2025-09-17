# Ocean Notes – Next.js Frontend

Modern, ocean-inspired personal notes manager UI with authentication and full CRUD. Built with Next.js App Router and Tailwind.

## Quick Start

1) Copy env:
- cp .env.example .env
- Set NEXT_PUBLIC_API_BASE_URL to your notes_database REST base URL.
- Optionally set NEXT_PUBLIC_SITE_URL (used for email redirect fields if backend supports).

2) Install deps and run:
- npm install
- npm run dev
- Visit http://localhost:3000

Login and Signup link to backend endpoints:
- POST /auth/login
- POST /auth/signup
- GET /auth/me
- GET /notes
- POST /notes
- PUT /notes/:id
- DELETE /notes/:id

## Tech
- Next.js 15 App Router
- Tailwind CSS v4
- Context-based state for Auth and Notes
- Ocean Professional theme with blue and amber accents, gradients, rounded corners, and subtle shadows.

## Structure
- src/app/layout.tsx – App frame: header, sidebar, content
- src/app/auth/* – Login & Signup
- src/app/notes/page.tsx – Notes list + editor
- src/components/* – UI components
- src/store/* – Auth and Notes providers
- src/lib/* – API client & token storage
- src/types – Shared types

## Configuration Notes
- Do not hardcode API URLs in code; use env vars. See .env.example.
- Email redirect for signup uses NEXT_PUBLIC_SITE_URL when provided.
