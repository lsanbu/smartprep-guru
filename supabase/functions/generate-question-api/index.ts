
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { type, subject = "all", class: classLevel = "all" } = await req.json()

    if (!["mcq", "explanation"].includes(type)) {
      return new Response(
        JSON.stringify({ error: "Invalid 'type' field. Must be 'mcq' or 'explanation'." }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400
        }
      )
    }

    // Get Flask API URL from environment
    const flaskApiUrl = Deno.env.get('FLASK_API_URL') || 'http://localhost:5000'
    
    // Forward request to Flask API
    const response = await fetch(`${flaskApiUrl}/api/chat/generate-question`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        type, 
        subject, 
        class: classLevel 
      })
    })

    if (!response.ok) {
      throw new Error(`Flask API error: ${response.status}`)
    }

    const data = await response.json()

    return new Response(
      JSON.stringify(data),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    )

  } catch (error) {
    console.error('Error in generate-question-api function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})
