import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { json } from "@remix-run/node";

export const loader = async () => {
  return json({
    ENV: {
      STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    },
  });
};

export const meta = () => {
  return [
    { title: "iDevrCode - Premium Developer Tools & Resources" },
    { name: "description", content: "Discover premium development tools, courses, and resources to accelerate your coding journey. Built by developers, for developers." },
    { name: "keywords", content: "developer tools, coding resources, programming courses, web development, software development" },
    { property: "og:title", content: "iDevrCode - Premium Developer Tools & Resources" },
    { property: "og:description", content: "Discover premium development tools, courses, and resources to accelerate your coding journey." },
    { property: "og:type", content: "website" },
  ];
};

export default function App() {
  const data = useLoaderData();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://cdn.shopify.com/" />
        <link
          rel="stylesheet"
          href="https://cdn.shopify.com/static/fonts/inter/v4/styles.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <Meta />
        <Links />
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --color-primary: #0066cc;
              --color-primary-dark: #0052a3;
              --color-secondary: #00d4aa;
              --color-accent: #ff6b35;
              --color-dark: #1a1a1a;
              --color-dark-secondary: #2d2d2d;
              --color-light: #f8f9fa;
              --color-gray: #6c757d;
              --color-border: #e9ecef;
              --font-mono: 'JetBrains Mono', monospace;
              --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
            }

            * {
              box-sizing: border-box;
            }

            body {
              font-family: var(--font-sans);
              line-height: 1.6;
              color: var(--color-dark);
              margin: 0;
              padding: 0;
              background-color: #ffffff;
            }

            .container {
              max-width: 1200px;
              margin: 0 auto;
              padding: 0 24px;
            }

            .btn {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              padding: 12px 24px;
              border-radius: 8px;
              font-weight: 600;
              text-decoration: none;
              transition: all 0.2s ease;
              border: none;
              cursor: pointer;
              font-size: 14px;
              line-height: 1.4;
            }

            .btn-primary {
              background-color: var(--color-primary);
              color: white;
            }

            .btn-primary:hover {
              background-color: var(--color-primary-dark);
              transform: translateY(-1px);
            }

            .btn-secondary {
              background-color: var(--color-secondary);
              color: var(--color-dark);
            }

            .btn-secondary:hover {
              background-color: #00c49a;
              transform: translateY(-1px);
            }

            .btn-outline {
              background-color: transparent;
              color: var(--color-primary);
              border: 2px solid var(--color-primary);
            }

            .btn-outline:hover {
              background-color: var(--color-primary);
              color: white;
            }

            .card {
              background: white;
              border-radius: 12px;
              padding: 2rem;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
              transition: all 0.3s ease;
            }

            .card:hover {
              transform: translateY(-4px);
              box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            }

            .grid {
              display: grid;
              gap: 2rem;
            }

            .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
            .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
            .grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }

            @media (max-width: 1024px) {
              .grid-cols-4 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
              .grid-cols-3 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            }

            @media (max-width: 768px) {
              .container {
                padding: 0 16px;
              }

              .grid {
                gap: 1rem;
              }

              .card {
                padding: 1.5rem;
              }
            }
          `
        }} />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />
      </body>
    </html>
  );
}
