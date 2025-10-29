/*
  # Create Quizzes and Questions Tables

  ## Overview
  Creates tables for quizzes, questions, and user quiz attempts.

  ## New Tables
  
  ### `quizzes`
  - `id` (uuid, primary key)
  - `lesson_id` (uuid) - References lessons table
  - `title` (text) - Quiz title
  - `description` (text) - Quiz description
  - `passing_score` (integer) - Minimum score to pass (percentage)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `questions`
  - `id` (uuid, primary key)
  - `quiz_id` (uuid) - References quizzes table
  - `question_text` (text) - The question
  - `option_a` (text) - First option
  - `option_b` (text) - Second option
  - `option_c` (text) - Third option
  - `option_d` (text) - Fourth option
  - `correct_answer` (text) - Correct answer (a, b, c, or d)
  - `points` (integer) - Points for correct answer
  - `order_index` (integer) - Display order
  - `created_at` (timestamptz)

  ### `quiz_attempts`
  - `id` (uuid, primary key)
  - `user_id` (uuid) - References auth.users
  - `quiz_id` (uuid) - References quizzes table
  - `score` (integer) - Score achieved
  - `total_points` (integer) - Maximum possible points
  - `answers` (jsonb) - User's answers {question_id: selected_answer}
  - `completed_at` (timestamptz)
  - `created_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Public can view quizzes and questions
  - Users can view own quiz attempts
  - Users can insert own quiz attempts
*/

CREATE TABLE IF NOT EXISTS quizzes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid REFERENCES lessons(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text DEFAULT '',
  passing_score integer DEFAULT 70,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id uuid REFERENCES quizzes(id) ON DELETE CASCADE,
  question_text text NOT NULL,
  option_a text NOT NULL,
  option_b text NOT NULL,
  option_c text NOT NULL,
  option_d text NOT NULL,
  correct_answer text NOT NULL CHECK (correct_answer IN ('a', 'b', 'c', 'd')),
  points integer DEFAULT 1,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS quiz_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  quiz_id uuid REFERENCES quizzes(id) ON DELETE CASCADE,
  score integer NOT NULL,
  total_points integer NOT NULL,
  answers jsonb DEFAULT '{}',
  completed_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view quizzes"
  ON quizzes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can view questions"
  ON questions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can view own quiz attempts"
  ON quiz_attempts FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quiz attempts"
  ON quiz_attempts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER update_quizzes_updated_at
  BEFORE UPDATE ON quizzes
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();
