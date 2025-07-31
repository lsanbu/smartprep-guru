
-- Generated Mock Tests
CREATE TABLE mock_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_name TEXT NOT NULL,
  test_type TEXT DEFAULT 'full_mock', -- 'full_mock', 'subject_wise', 'chapter_wise'
  total_questions INTEGER DEFAULT 180,
  physics_questions INTEGER DEFAULT 45,
  chemistry_questions INTEGER DEFAULT 45,
  biology_questions INTEGER DEFAULT 90,
  generated_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  metadata JSONB -- Store generation parameters
);

-- Generated Questions (Cache from OpenAI)
CREATE TABLE generated_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mock_test_id UUID REFERENCES mock_tests(id) ON DELETE CASCADE,
  question_number INTEGER NOT NULL,
  subject TEXT NOT NULL CHECK (subject IN ('Physics', 'Chemistry', 'Biology')),
  question_text TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer CHAR(1) NOT NULL CHECK (correct_answer IN ('A','B','C','D')),
  explanation TEXT,
  difficulty_level INTEGER CHECK (difficulty_level BETWEEN 1 AND 5),
  source_context TEXT, -- FAISS retrieval context used
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(mock_test_id, question_number)
);

-- Student Test Attempts
CREATE TABLE test_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  mock_test_id UUID REFERENCES mock_tests(id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  submitted_at TIMESTAMPTZ,
  total_score INTEGER,
  physics_score INTEGER,
  chemistry_score INTEGER,
  biology_score INTEGER,
  time_spent_minutes INTEGER,
  status TEXT DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'abandoned'))
);

-- Individual Question Responses
CREATE TABLE question_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id UUID REFERENCES test_attempts(id) ON DELETE CASCADE,
  question_id UUID REFERENCES generated_questions(id) ON DELETE CASCADE,
  selected_answer CHAR(1),
  is_correct BOOLEAN,
  time_spent_seconds INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE mock_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE generated_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_responses ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view active mock tests" ON mock_tests
  FOR SELECT USING (is_active = true);

CREATE POLICY "Anyone can view questions for active tests" ON generated_questions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM mock_tests 
      WHERE mock_tests.id = generated_questions.mock_test_id 
      AND mock_tests.is_active = true
    )
  );

CREATE POLICY "Users can manage their own attempts" ON test_attempts
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own responses" ON question_responses
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM test_attempts 
      WHERE test_attempts.id = question_responses.attempt_id 
      AND test_attempts.user_id = auth.uid()
    )
  );
