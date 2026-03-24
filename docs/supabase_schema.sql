-- Execute this in the Supabase SQL Editor to construct the table

CREATE TABLE recommendations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  place_name text NOT NULL,
  location text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  safety text NOT NULL,
  recommended_by integer DEFAULT 1,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable Row Level Security (RLS) and create permissive policies for anon users to allow frontend queries
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous read access" ON recommendations FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anonymous insert access" ON recommendations FOR INSERT TO anon WITH CHECK (true);

-- ==========================================
-- SURVEY RESPONSES TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS survey_responses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  answer_one text,
  answer_two text,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS and add policies for survey_responses
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow anonymous insert" ON survey_responses;

CREATE POLICY "Allow anonymous insert"
ON survey_responses
FOR INSERT
TO anon
WITH CHECK (true);
