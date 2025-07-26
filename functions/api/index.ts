// Auto-generated index.ts for Pages Functions routing
import type { Request } from 'itty-router';

import { ResumeGeneratorBackendHandler } from './ResumeGeneratorBackend';
import { ContentSuggestionAPIHandler } from './ContentSuggestionAPI';
import { TemplateLibraryBackendHandler } from './TemplateLibraryBackend';
import { InteractiveGuidanceBackendHandler } from './InteractiveGuidanceBackend';

export async function onRequest({ request }: { request: Request }): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path === "/api/ResumeGeneratorBackend") return ResumeGeneratorBackendHandler(request);
  if (path === "/api/ContentSuggestionAPI") return ContentSuggestionAPIHandler(request);
  if (path === "/api/TemplateLibraryBackend") return TemplateLibraryBackendHandler(request);
  if (path === "/api/InteractiveGuidanceBackend") return InteractiveGuidanceBackendHandler(request);

  return new Response("Not found", { status: 404 });
}
