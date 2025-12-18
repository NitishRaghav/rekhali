-- =====================================================
-- ADMIN USER CREATION SCRIPT
-- Run this AFTER running 001_init_database.sql
-- =====================================================

-- Step 1: Create auth user through Supabase Dashboard
-- Go to: Supabase Dashboard > Authentication > Users > Add User
-- Email: admin@rekhali.com
-- Password: Rekhali@2024
-- Then copy the user's UUID from the dashboard

-- Step 2: Insert into admin_users table with that UUID
-- Replace '5f48dbf7-90e9-47db-be43-12adb3762180' with the actual UUID from step 1

-- Example (uncomment and replace UUID after creating auth user):
-- INSERT INTO admin_users (id, email)
-- VALUES ('Y5f48dbf7-90e9-47db-be43-12adb3762180', 'admin@rekhali.com')
-- ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- QUICK SETUP INSTRUCTIONS:
-- =====================================================
-- 1. Go to your Supabase Dashboard
-- 2. Click "Authentication" in the sidebar
-- 3. Click "Users" tab
-- 4. Click "Add User" button
-- 5. Enter:
--    Email: admin@rekhali.com
--    Password: Rekhali@2024
-- 6. Click "Create User"
-- 7. Copy the UUID shown in the users list
-- 8. Run this SQL (replace the UUID):
--
--    INSERT INTO admin_users (id, email)
--    VALUES ('paste-uuid-here', 'admin@rekhali.com');
--
-- 9. Login at /admin/login with:
--    Email: admin@rekhali.com
--    Password: Rekhali@2024
-- =====================================================
