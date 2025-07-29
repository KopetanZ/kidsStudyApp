import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  // Handle root path
  if (url.pathname === '/') {
    return NextResponse.next();
  }
  
  // Handle subject pages
  if (url.pathname.startsWith('/subject/')) {
    return NextResponse.next();
  }
  
  // Handle level pages
  if (url.pathname.startsWith('/level/')) {
    return NextResponse.next();
  }
  
  // Handle public assets
  if (url.pathname.startsWith('/manifest.json') || 
      url.pathname.startsWith('/sw.js') ||
      url.pathname.startsWith('/icon') ||
      url.pathname.endsWith('.svg') ||
      url.pathname.endsWith('.png') ||
      url.pathname.endsWith('.ico')) {
    return NextResponse.next();
  }
  
  // Handle Next.js internal routes
  if (url.pathname.startsWith('/_next') || 
      url.pathname.startsWith('/api')) {
    return NextResponse.next();
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};