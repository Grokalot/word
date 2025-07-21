// OpenAI API integration for LexCell vocabulary app
// Uses GPT-3.5-turbo to score user definitions against real definitions

const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY || '';
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

interface ScoringResponse {
  score: number;
  explanation: string;
}

export const scoreDefinition = async (
  userDefinition: string,
  word: string,
  realDefinition: string
): Promise<{ score: number; explanation: string; ai_definition?: string }> => {
  try {
    // Check if API key is available
    if (!OPENAI_API_KEY) {
      console.error('OpenAI API key not found. Please set EXPO_PUBLIC_OPENAI_API_KEY in your environment variables.');
      return { score: 0, explanation: "API key not configured. Please check your environment variables." };
    }

    const systemMessage = `You are a vocabulary assessment assistant for LexCell, a vocabulary learning app. Your task is to score user-submitted definitions against official definitions.

SCORING CRITERIA:
- 90-100: Excellent understanding, captures all key aspects
- 80-89: Very good understanding, minor omissions
- 70-79: Good understanding, some important aspects missing
- 60-69: Fair understanding, significant gaps
- 50-59: Basic understanding, major aspects missing
- 40-49: Poor understanding, mostly incorrect
- 30-39: Very poor understanding, mostly wrong
- 20-29: Minimal understanding, mostly incorrect
- 10-19: Very minimal understanding, mostly wrong
- 0-9: No understanding or completely incorrect

RESPONSE FORMAT:
Respond ONLY with a valid JSON object in this exact format:
{
  "score": [number between 0-100],
  "explanation": "[brief explanation of the score, 1-2 sentences]",
  "ai_definition": "[your own best concise definition of the word]"
}

Be fair but strict in your assessment. Consider accuracy, completeness, and clarity.`;

    const userMessage = `WORD: "${word}"
REAL DEFINITION: "${realDefinition}"
USER DEFINITION: "${userDefinition}"

Please score the user's definition against the real definition and provide your own best concise definition of the word.`;

    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: userMessage }
        ],
        temperature: 0.3, // Lower temperature for more consistent scoring
        max_tokens: 250, // Allow a bit more room for the definition
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', response.status, errorData);
      return { 
        score: 0, 
        explanation: `API error: ${response.status}. Please try again.` 
      };
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      console.error('No content in OpenAI response:', data);
      return { score: 0, explanation: "Invalid response from scoring service." };
    }

    // Try to parse the JSON response
    try {
      const parsedResponse = JSON.parse(content);
      // Validate the response
      if (typeof parsedResponse.score !== 'number' || 
          parsedResponse.score < 0 || 
          parsedResponse.score > 100) {
        throw new Error('Invalid score value');
      }
      if (typeof parsedResponse.explanation !== 'string' || 
          parsedResponse.explanation.trim().length === 0) {
        throw new Error('Invalid explanation');
      }
      // ai_definition is optional but should be a string if present
      if (parsedResponse.ai_definition && typeof parsedResponse.ai_definition !== 'string') {
        throw new Error('Invalid ai_definition');
      }
      return parsedResponse;
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', content, parseError);
      return { 
        score: 0, 
        explanation: "Error processing scoring response. Please try again." 
      };
    }

  } catch (error) {
    console.error('Error in scoreDefinition:', error);
    return { 
      score: 0, 
      explanation: "Network error. Please check your connection and try again." 
    };
  }
};

// Test function to verify the integration
export const testScoring = async () => {
  console.log('Testing OpenAI integration...');
  
  const testResult = await scoreDefinition(
    "A feeling of great happiness and joy",
    "elation",
    "A feeling of great happiness and triumph"
  );
  
  console.log('Test result:', testResult);
  return testResult;
}; 