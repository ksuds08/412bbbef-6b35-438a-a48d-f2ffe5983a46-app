export async function TemplateLibraryBackendHandler(req: Request): Promise<Response> {
  try {
    if (req.method !== 'GET') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
    }

    const url = new URL(req.url);
    const industry = url.searchParams.get('industry');

    if (!industry) {
      return new Response(JSON.stringify({ error: 'Missing industry parameter' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const templates = await getIndustrySpecificTemplates(industry);

    return new Response(JSON.stringify({ templates }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

async function getIndustrySpecificTemplates(industry: string): Promise<string[]> {
  const templates: { [key: string]: string[] } = {
    'tech': ['Tech Resume Template 1', 'Tech Resume Template 2'],
    'healthcare': ['Healthcare Resume Template 1', 'Healthcare Resume Template 2'],
    'finance': ['Finance Resume Template 1', 'Finance Resume Template 2'],
    // Add more industry-specific templates as required
  };

  return templates[industry] || [];
}
