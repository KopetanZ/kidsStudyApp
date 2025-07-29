import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  // Add security headers
  const response = NextResponse.next();
  
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  
  // Handle root path
  if (url.pathname === '/') {
    return response;
  }
  
  // Handle subject pages - ensure proper routing
  if (url.pathname.startsWith('/subject/')) {
    const id = url.pathname.split('/subject/')[1];
    if (id && !id.includes('/')) {
      return response;
    }
  }
  
  // Handle level pages - ensure proper routing
  if (url.pathname.startsWith('/level/')) {
    const id = url.pathname.split('/level/')[1];
    if (id && !id.includes('/')) {
      return response;
    }
  }
  
  // Handle static assets
  if (url.pathname.startsWith('/_next') || 
      url.pathname.startsWith('/api') ||
      url.pathname.includes('.') ||
      url.pathname === '/manifest.json' ||
      url.pathname === '/sw.js' ||
      url.pathname === '/favicon.ico') {
    return response;
  }
  
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};