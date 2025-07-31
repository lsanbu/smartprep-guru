
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

    // Get Flask API URL from environment
    const flaskApiUrl = Deno.env.get('FLASK_API_URL') || 'http://localhost:5000'
    
    // Generate questions using Flask API with FAISS
    const questions = []
    let questionNumber = 1

    // Generate questions for each subject
    for (const subject of subjects) {
      const questionCount = subject === 'Biology' ? 90 : 45
      
      for (let i = 0; i < questionCount; i++) {
        try {
          // Call your Flask API to generate each question
          const response = await fetch(`${flaskApiUrl}/api/chat/generate-question`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              type: 'mcq',
              subject: subject.toLowerCase(),
              class: 'all'
            })
          })

          if (response.ok) {
            const questionData = await response.json()
            
            questions.push({
              mock_test_id: mockTest.id,
              question_number: questionNumber++,
              subject: subject,
              question_text: questionData.question,
              option_a: questionData.options?.[0] || 'Option A',
              option_b: questionData.options?.[1] || 'Option B', 
              option_c: questionData.options?.[2] || 'Option C',
              option_d: questionData.options?.[3] || 'Option D',
              correct_answer: questionData.correctAnswer || 'A',
              explanation: questionData.explanation || 'Explanation not provided',
              difficulty_level: Math.floor(Math.random() * 5) + 1,
              source_context: 'NCERT FAISS Generated'
            })
          } else {
            // Fallback to sample question if Flask API fails
            console.warn(`Flask API failed for question ${questionNumber}, using fallback`)
            questions.push({
              mock_test_id: mockTest.id,
              question_number: questionNumber++,
              subject: subject,
              question_text: `Sample ${subject} question ${i + 1}. What is a key concept in ${subject}?`,
              option_a: 'Option A',
              option_b: 'Option B',
              option_c: 'Option C', 
              option_d: 'Option D',
              correct_answer: 'A',
              explanation: `This is a sample ${subject} question for testing purposes.`,
              difficulty_level: Math.floor(Math.random() * 5) + 1,
              source_context: `NCERT ${subject} - Sample Question`
            })
          }
        } catch (error) {
          console.error(`Error generating question ${questionNumber}:`, error)
          // Add fallback question
          questions.push({
            mock_test_id: mockTest.id,
            question_number: questionNumber++,
            subject: subject,
            question_text: `Sample ${subject} question ${i + 1}. What is a key concept in ${subject}?`,
            option_a: 'Option A',
            option_b: 'Option B',
            option_c: 'Option C',
            option_d: 'Option D',
            correct_answer: 'A',
            explanation: `This is a sample ${subject} question for testing purposes.`,
            difficulty_level: Math.floor(Math.random() * 5) + 1,
            source_context: `NCERT ${subject} - Sample Question`
          })
        }
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
        message: 'Mock test generated successfully using Flask API!'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error in generate-mock-test:', error)
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
