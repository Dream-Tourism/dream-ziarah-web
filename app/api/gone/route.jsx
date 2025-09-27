import { NextRequest, NextResponse } from "next/server";

export async function GET(request) {
  return new NextResponse(
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>410 - Gone | Dream Tourism Italy</title>
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
    <p>The requested resource is no longer available and will not be available again.</p>
    <a href="/" class="btn">Return to Home</a>
  </div>
</body>
</html>`,
    {
      status: 410,
      headers: {
        "Content-Type": "text/html",
        "Cache-Control": "public, max-age=31536000",
      },
    }
  );
}

export async function POST(request) {
  return GET(request);
}

export async function PUT(request) {
  return GET(request);
}

export async function DELETE(request) {
  return GET(request);
}
