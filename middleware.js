// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();

  // 设置安全头部
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  let csp;

  if (process.env.NODE_ENV === 'development') {
    csp =
      "default-src 'self'; script-src 'self' 'unsafe-eval' static.cloudflareinsights.com;connect-src 'self' wss://mainnet-full.deeper.network/; object-src 'none'; style-src 'self' 'unsafe-inline'; img-src 'self' https://upload50g20210622.deeper.network/ data:;";
  } else {
    csp =
      "default-src 'self'; script-src 'self' static.cloudflareinsights.com;connect-src 'self' wss://mainnet-full.deeper.network/; object-src 'none'; style-src 'self' 'unsafe-inline'; img-src 'self' https://upload50g20210622.deeper.network/ data:;";
  }

  response.headers.set('Content-Security-Policy', csp);

  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Referrer-Policy', 'no-referrer-when-downgrade');
  response.headers.set('Cross-Origin-Resource-Policy', 'same-origin');

  return response;
}
