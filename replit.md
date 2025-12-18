# Rekhali Fashion Store

## Overview
A Next.js 16 e-commerce fashion store application with Supabase backend integration. The site sells traditional Indian clothing (kurtis, kurtas) with an admin dashboard for product management.

## Recent Changes
- 2024-12-18: Initial project import and Replit environment setup
- Configured Next.js to allow Replit dev origins
- Set up Supabase environment variables

## Project Architecture
- **Framework**: Next.js 16 with React 19 (App Router)
- **Styling**: Tailwind CSS 4 with shadcn/ui components
- **Database**: Supabase (PostgreSQL)
- **Language**: TypeScript

### Directory Structure
- `app/` - Next.js App Router pages
  - `page.tsx` - Homepage with hero section
  - `products/` - Product listing and detail pages
  - `about/` - About page
  - `admin/` - Admin dashboard and login
- `components/` - React components
  - `ui/` - shadcn/ui base components
  - `public/` - Public-facing components (header, footer, product cards)
  - `admin/` - Admin dashboard components
- `lib/` - Utility functions and Supabase client
- `public/` - Static assets (images, icons)
- `scripts/` - Database initialization SQL scripts

### Key Files
- `next.config.mjs` - Next.js configuration
- `lib/supabase/client.ts` - Browser Supabase client
- `lib/supabase/server.ts` - Server Supabase client
- `proxy.ts` - Supabase session middleware

## Environment Variables
Required secrets (stored in Replit Secrets):
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key

## Development
The dev server runs on port 5000 with:
```
npm run dev -- -p 5000 -H 0.0.0.0
```

## Production
Build and start with:
```
npm run build && npm run start -- -p 5000 -H 0.0.0.0
```
