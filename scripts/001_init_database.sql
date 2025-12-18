-- =====================================================
-- REKHALI STORE - DATABASE SETUP
-- Run this script in Supabase SQL Editor
-- =====================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- =====================================================
-- Products table
-- =====================================================
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),
  images TEXT[] DEFAULT '{}',
  sizes TEXT[] DEFAULT ARRAY['S', 'M', 'L', 'XL'],
  fabric VARCHAR(255),
  care_instructions TEXT,
  in_stock BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- Settings table (for WhatsApp number etc.)
-- =====================================================
CREATE TABLE IF NOT EXISTS settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key VARCHAR(255) UNIQUE NOT NULL,
  value TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- Admin users table (links to Supabase Auth)
-- =====================================================
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- Default settings
-- =====================================================
INSERT INTO settings (key, value)
VALUES ('whatsapp_number', '+919876543210')
ON CONFLICT (key) DO NOTHING;

-- =====================================================
-- Enable Row Level Security
-- =====================================================
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- DROP EXISTING POLICIES (safe for re-runs)
-- =====================================================
DROP POLICY IF EXISTS "Products are viewable by everyone" ON products;
DROP POLICY IF EXISTS "Only admins can insert products" ON products;
DROP POLICY IF EXISTS "Only admins can update products" ON products;
DROP POLICY IF EXISTS "Only admins can delete products" ON products;

DROP POLICY IF EXISTS "Settings are viewable by everyone" ON settings;
DROP POLICY IF EXISTS "Only admins can insert settings" ON settings;
DROP POLICY IF EXISTS "Only admins can update settings" ON settings;

DROP POLICY IF EXISTS "Admin users can view themselves" ON admin_users;

-- =====================================================
-- Products policies
-- =====================================================
CREATE POLICY "Products are viewable by everyone"
ON products FOR SELECT USING (true);

CREATE POLICY "Only admins can insert products"
ON products FOR INSERT
WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "Only admins can update products"
ON products FOR UPDATE
USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "Only admins can delete products"
ON products FOR DELETE
USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- =====================================================
-- Settings policies
-- =====================================================
CREATE POLICY "Settings are viewable by everyone"
ON settings FOR SELECT USING (true);

CREATE POLICY "Only admins can insert settings"
ON settings FOR INSERT
WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "Only admins can update settings"
ON settings FOR UPDATE
USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- =====================================================
-- Admin users policies
-- =====================================================
CREATE POLICY "Admin users can view themselves"
ON admin_users FOR SELECT
USING (auth.uid() = id);

-- =====================================================
-- SETUP COMPLETE!
-- 
-- NEXT STEPS:
-- 1. Go to Supabase Dashboard > Authentication > Users
-- 2. Click "Add User"
-- 3. Email: admin@rekhali.com
-- 4. Password: Rekhali@2024
-- 5. Copy the user's UUID after creation
-- 6. Run: INSERT INTO admin_users (id, email) VALUES ('YOUR-UUID', 'admin@rekhali.com');
-- 7. Login at /admin/login
-- =====================================================
