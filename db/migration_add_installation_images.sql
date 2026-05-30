-- Migration: Add installation_images column to portfolio table
-- Run this to add the new column for gallery image support

-- Check if column exists, if not add it
-- SQLite doesn't support IF NOT EXISTS for columns, so we use a workaround
-- This script should be run manually or during deployment

-- For SQLite, we need to:
-- 1. Create a new table with the desired schema
-- 2. Copy data from old table to new table
-- 3. Drop old table
-- 4. Rename new table to old table name

-- Step 1: Create new table with installation_images column
CREATE TABLE IF NOT EXISTS portfolio_new (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  category          TEXT NOT NULL DEFAULT 'signage',
  project_name_th   TEXT NOT NULL,
  project_name_en   TEXT,
  client_name_th    TEXT,
  client_name_en    TEXT,
  work_description  TEXT,
  image_url         TEXT,
  completion_date   TEXT,
  is_featured       INTEGER DEFAULT 0,
  highlights        TEXT DEFAULT '[]',
  installation_images TEXT DEFAULT '[]',
  sort_order        INTEGER DEFAULT 0,
  is_active         INTEGER DEFAULT 1,
  created_at        TEXT DEFAULT (datetime('now')),
  updated_at        TEXT DEFAULT (datetime('now'))
);

-- Step 2: Copy existing data
INSERT INTO portfolio_new (id, category, project_name_th, project_name_en, client_name_th, client_name_en, work_description, image_url, completion_date, is_featured, highlights, sort_order, is_active, created_at, updated_at)
SELECT id, category, project_name_th, project_name_en, client_name_th, client_name_en, work_description, image_url, completion_date, is_featured, highlights, sort_order, is_active, created_at, updated_at
FROM portfolio;

-- Step 3: Drop old table
DROP TABLE portfolio;

-- Step 4: Rename new table
ALTER TABLE portfolio_new RENAME TO portfolio;
