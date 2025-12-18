# Rekhali Fashion Store

## Overview
A Next.js 16 e-commerce fashion store application with PostgreSQL database. The site sells traditional Indian clothing (kurtis, kurtas) with an admin dashboard for product management.

## Recent Changes
- 2024-12-18: Migrated from Supabase to Replit's built-in PostgreSQL database
- Set up local authentication with session cookies
- Initialized database schema with admin_users, products, and settings tables
- Configured Next.js to allow Replit dev origins

## Project Architecture
- **Framework**: Next.js 16 with React 19 (App Router)
- **Styling**: Tailwind CSS 4 with shadcn/ui components
- **Database**: PostgreSQL (Replit built-in)
- **ORM**: Drizzle ORM
- **Language**: TypeScript
- **Authentication**: Session-based with cookies

### Directory Structure
- `app/` - Next.js App Router pages
  - `page.tsx` - Homepage with hero section
  - `products/` - Product listing and detail pages
  - `about/` - About page
  - `admin/` - Admin dashboard and login
  - `api/auth/` - Authentication API routes
- `components/` - React components
  - `ui/` - shadcn/ui base components
  - `public/` - Public-facing components (header, footer, product cards)
  - `admin/` - Admin dashboard components
- `lib/` - Utility functions (db-init.ts for database initialization)
- `server/` - Server-side code (db.ts for database connection)
- `shared/` - Shared types and schema (schema.ts with Drizzle ORM models)
- `public/` - Static assets (images, icons)

### Database Schema
- **admin_users**: Stores admin credentials (email, password hash)
- **products**: Stores product information (name, price, images, sizes, etc.)
- **settings**: Stores app settings (WhatsApp number, etc.)

### Key Files
- `next.config.mjs` - Next.js configuration with allowed dev origins
- `server/db.ts` - PostgreSQL connection setup with Drizzle ORM
- `shared/schema.ts` - Drizzle ORM schema definitions
- `app/api/auth/login/route.ts` - Login API endpoint
- `app/layout.tsx` - Root layout with database initialization
- `lib/db-init.ts` - Database seeding function

## Environment Variables
Automatically configured by Replit:
- `DATABASE_URL` - PostgreSQL connection string
- `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE` - PostgreSQL credentials

## Admin Login
- **URL**: /admin/login
- **Email**: admin@rekhali.com
- **Password**: Rekhali@2024

## Product Management Features
The admin dashboard now includes:
- **Image Upload**: Upload hero image and multiple product images
- **Image Numbering**: Automatically numbered (1, 2, 3...) for each product
- **Hero Image Selection**: Set a main display image for the product
- **Product Story**: Add a detailed story/narrative for each product
- **Product Gallery**: Upload and manage multiple product images with visual preview
- **Product Details**: Name, price, sizes, fabric, care instructions, stock status, featured flag

### Adding Products
1. Go to /admin/dashboard
2. Click "Add Product"
3. Fill in product details including:
   - Product name, price, original price
   - Description and product story
   - Upload hero image (main image)
   - Upload gallery images (numbered automatically)
   - Sizes, fabric type, care instructions
   - Mark as in-stock or featured
4. Submit to add product to database

All images are stored as base64 data URLs in the database.

## Product Editing
- Click "Edit" button next to any product to modify it
- All fields can be updated including images
- Submit to save changes

## Display on Main Website
Products automatically appear on:
- `/products` - Main product listing page
- `/` - Featured products on homepage (if marked as featured)

## Development
The dev server runs on port 5000 with:
```
npm run dev -- -p 5000 -H 0.0.0.0
```

## Database Management
Initialize/update database schema:
```
npm run db:push
```

## Production
Build and start with:
```
npm run build && npm run start -- -p 5000 -H 0.0.0.0
```
