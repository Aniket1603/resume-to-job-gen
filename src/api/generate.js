import OpenAI from 'openai';

// Vercel environment variables se API key access karein
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Request body se data extract karein
    const { resumeText, jobDescription } = await request.body;

    if (!resumeText || !jobDescription) {
      return response.status(400).json({ error: 'Missing resumeText or jobDescription' });
    }

    // OpenAI Chat API ko call karein
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an expert career coach and professional resume writer. Your task is to analyze a given resume and job description to create a perfectly tailored resume and a compelling cover letter. The output should be a single JSON object with two keys: "resume" and "cover_letter". Both values should be strings formatted in Markdown. Do not include any extra text outside of the JSON object.',
        },
        {
          role: 'user',
          content: `Here is the resume: \n\n"""${resumeText}"""\n\nHere is the job description: \n\n"""${jobDescription}"""`,
        },
      ],
      response_format: { type: "json_object" },
    });

    // OpenAI se generated JSON string ko parse karein
    const output = JSON.parse(chatCompletion.choices[0].message.content);

    // Frontend ko JSON response bhejein
    return response.status(200).json(output);

  } catch (error) {
    console.error('Error in API handler:', error);
    return response.status(500).json({ error: 'Failed to generate application', details: error.message });
  }
}