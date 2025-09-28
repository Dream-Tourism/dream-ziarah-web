import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Check for invalid tour routes
  if (pathname.startsWith('/tour/')) {
    const slug = pathname.replace('/tour/', '');

    // Valid tour patterns - add your actual valid tour slugs here
    const validTourPatterns = [
      'large-group-makkah-ziyarat-tour-minibus-15',
      'makkah-private-ziyarat-tour-luxury-car',
      'small-group-makkah-ziyarat-tour-luxury-van',
      'family-makkah-ziyarat-tour-private-car',
      'large-group-madinah-ziyarat-tour-minibus',
      'family-madinah-ziyarat-tour-private-car-5-seater',
      'private-madinah-ziyarat-tour-luxury-car',
      'small-group-madinah-ziyarat-tour-luxury-van',
      'day-trip-makkah-to-taif-private-car-3',
      'day-trip-makkah-to-taif-family-car-5',
      'day-trip-makkah-to-taif-luxury-van-10',
      'day-trip-makkah-to-taif-minibus-15',
      'day-trip-makkah-to-jeddah-private-luxury-car',
      'day-trip-makkah-to-jeddah-family-5-seater',
      'day-trip-makkah-to-jeddah-luxury-van-10',
      'day-trip-makkah-to-jeddah-minibus-15'
    ];

    if (!validTourPatterns.includes(slug)) {
      return new NextResponse(
        `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>410 - Gone | Dream Ziarah</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      margin: 0;
      padding: 0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
      color: white;
    }
    .container {
      text-align: center;
      max-width: 500px;
      padding: 2rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      backdrop-filter: blur(10px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    }
    h1 {
      font-size: 4rem;
      margin: 0 0 1rem 0;
      font-weight: bold;
    }
    h2 {
      font-size: 2rem;
      margin: 0 0 1rem 0;
      font-weight: 600;
    }
    p {
      font-size: 1.1rem;
      margin: 0 0 2rem 0;
      opacity: 0.9;
      line-height: 1.6;
    }
    .btn {
      display: inline-block;
      padding: 12px 24px;
      background: #ffffff;
      color: #ff6b6b;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>410</h1>
    <h2>Gone Forever</h2>
    <p>The requested tour is no longer available and will not be available again.</p>
    <a href="/" class="btn">Return to Home</a>
  </div>
</body>
</html>`,
        {
          status: 410,
          headers: {
            'Content-Type': 'text/html',
            'Cache-Control': 'public, max-age=31536000',
          },
        }
      );
    }
  }

  // Check for invalid destination routes
  if (pathname.startsWith('/destinations/')) {
    const slug = pathname.replace('/destinations/', '');
    const validDestinations = ['makkah', 'madinah', 'jeddah', 'taif'];

    if (!validDestinations.includes(slug)) {
      return new NextResponse(
        `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>410 - Gone | Dream Ziarah</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      margin: 0;
      padding: 0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
      color: white;
    }
    .container {
      text-align: center;
      max-width: 500px;
      padding: 2rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      backdrop-filter: blur(10px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    }
    h1 {
      font-size: 4rem;
      margin: 0 0 1rem 0;
      font-weight: bold;
    }
    h2 {
      font-size: 2rem;
      margin: 0 0 1rem 0;
      font-weight: 600;
    }
    p {
      font-size: 1.1rem;
      margin: 0 0 2rem 0;
      opacity: 0.9;
      line-height: 1.6;
    }
    .btn {
      display: inline-block;
      padding: 12px 24px;
      background: #ffffff;
      color: #ff6b6b;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>410</h1>
    <h2>Gone Forever</h2>
    <p>The requested destination is no longer available and will not be available again.</p>
    <a href="/" class="btn">Return to Home</a>
  </div>
</body>
</html>`,
        {
          status: 410,
          headers: {
            'Content-Type': 'text/html',
            'Cache-Control': 'public, max-age=31536000',
          },
        }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/tour/:path*',
    '/destinations/:path*'
  ]
};