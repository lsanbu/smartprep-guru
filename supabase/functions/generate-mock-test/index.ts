
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    const { testName, testType = 'full_mock', subjects = ['Physics', 'Chemistry', 'Biology'] } = await req.json()

    // Create mock test record
    const { data: mockTest, error: testError } = await supabaseClient
      .from('mock_tests')
      .insert({
        test_name: testName,
        test_type: testType,
        total_questions: testType === 'full_mock' ? 180 : 90,
        physics_questions: subjects.includes('Physics') ? 45 : 0,
        chemistry_questions: subjects.includes('Chemistry') ? 45 : 0,
        biology_questions: subjects.includes('Biology') ? 90 : 0,
        metadata: {
          subjects,
          generated_by: 'ai',
          source: 'ncert_faiss'
        }
      })
      .select()
      .single()

    if (testError) {
      throw testError
    }

    // Here you would integrate with your Flask API to generate questions
    // For now, we'll create sample questions to demonstrate the structure
    const questions = []
    let questionNumber = 1

    // Generate Physics questions
    if (subjects.includes('Physics')) {
      for (let i = 0; i < 45; i++) {
        questions.push({
          mock_test_id: mockTest.id,
          question_number: questionNumber++,
          subject: 'Physics',
          question_text: `Sample Physics question ${i + 1}. What is the unit of force?`,
          option_a: 'Newton',
          option_b: 'Joule',
          option_c: 'Watt',
          option_d: 'Pascal',
          correct_answer: 'A',
          explanation: 'Newton is the SI unit of force, named after Sir Isaac Newton.',
          difficulty_level: Math.floor(Math.random() * 5) + 1,
          source_context: 'NCERT Physics Chapter 5: Laws of Motion'
        })
      }
    }

    // Generate Chemistry questions
    if (subjects.includes('Chemistry')) {
      for (let i = 0; i < 45; i++) {
        questions.push({
          mock_test_id: mockTest.id,
          question_number: questionNumber++,
          subject: 'Chemistry',
          question_text: `Sample Chemistry question ${i + 1}. What is the atomic number of Carbon?`,
          option_a: '6',
          option_b: '8',
          option_c: '12',
          option_d: '14',
          correct_answer: 'A',
          explanation: 'Carbon has 6 protons in its nucleus, giving it an atomic number of 6.',
          difficulty_level: Math.floor(Math.random() * 5) + 1,
          source_context: 'NCERT Chemistry Chapter 2: Structure of Atom'
        })
      }
    }

    // Generate Biology questions
    if (subjects.includes('Biology')) {
      for (let i = 0; i < 90; i++) {
        questions.push({
          mock_test_id: mockTest.id,
          question_number: questionNumber++,
          subject: 'Biology',
          question_text: `Sample Biology question ${i + 1}. Which organelle is known as the powerhouse of the cell?`,
          option_a: 'Nucleus',
          option_b: 'Mitochondria',
          option_c: 'Ribosome',
          option_d: 'Endoplasmic Reticulum',
          correct_answer: 'B',
          explanation: 'Mitochondria produce ATP through cellular respiration, earning the title "powerhouse of the cell".',
          difficulty_level: Math.floor(Math.random() * 5) + 1,
          source_context: 'NCERT Biology Chapter 8: Cell - The Unit of Life'
        })
      }
    }

    // Insert all questions
    const { error: questionsError } = await supabaseClient
      .from('generated_questions')
      .insert(questions)

    if (questionsError) {
      throw questionsError
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        mockTest,
        questionsGenerated: questions.length,
        message: 'Mock test generated successfully!'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
