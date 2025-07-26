export async function InteractiveGuidanceBackendHandler(req: Request): Promise<Response> {
  try {
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const contentType = req.headers.get('Content-Type');
    if (!contentType || contentType !== 'application/json') {
      return new Response(JSON.stringify({ error: 'Invalid content type' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const body = await req.json();
    const validationResult = validateRequestBody(body);
    if (!validationResult.isValid) {
      return new Response(JSON.stringify({ error: validationResult.errorMessage }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const guidance = generateInteractiveGuidance(body);
    return new Response(JSON.stringify({ guidance }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

function validateRequestBody(body: any): { isValid: boolean, errorMessage?: string } {
  if (typeof body !== 'object' || body === null) {
    return { isValid: false, errorMessage: 'Invalid JSON body' };
  }
  if (!body.jobTitle || typeof body.jobTitle !== 'string') {
    return { isValid: false, errorMessage: 'Missing or invalid job title' };
  }
  if (!body.industry || typeof body.industry !== 'string') {
    return { isValid: false, errorMessage: 'Missing or invalid industry' };
  }
  return { isValid: true };
}

function generateInteractiveGuidance(body: { jobTitle: string, industry: string }): any {
  // Placeholder for AI-driven guidance generation based on jobTitle and industry
  return {
    suggestions: [
      `Consider highlighting your leadership skills for a ${body.jobTitle} role in ${body.industry}.`,
      `Ensure your resume includes industry-specific keywords to pass automated screenings.`
    ],
    tips: [
      'Use action verbs to start bullet points.',
      'Tailor your resume to each job application.'
    ]
  };
}
