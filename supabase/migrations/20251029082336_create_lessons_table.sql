/*
  # Create Lessons Table

  ## Overview
  Creates a lessons table to store video lesson information.

  ## New Tables
  - `lessons`
    - `id` (uuid, primary key)
    - `title` (text) - Lesson title
    - `slug` (text, unique) - URL-friendly identifier
    - `description` (text) - Lesson description
    - `video_url` (text) - YouTube or video URL
    - `thumbnail_url` (text) - Thumbnail image URL
    - `duration` (integer, nullable) - Video duration in seconds
    - `order_index` (integer) - Display order
    - `created_at` (timestamptz) - Creation timestamp
    - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - Enable RLS on lessons table
  - Add policy for anyone to read lessons (public content)
*/

CREATE TABLE IF NOT EXISTS lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  video_url text NOT NULL,
  thumbnail_url text,
  duration integer,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view lessons"
  ON lessons FOR SELECT
  TO authenticated
  USING (true);

CREATE TRIGGER update_lessons_updated_at
  BEFORE UPDATE ON lessons
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();
