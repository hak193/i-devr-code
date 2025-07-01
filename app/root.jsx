import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

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
              --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
              --shadow-sm: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
              --shadow-md: 0 4px 6px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.06);
              --shadow-lg: 0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05);
              --border-radius: 8px;
              --transition: all 0.2s ease-in-out;
            }

            * {
              box-sizing: border-box;
            }

            body {
              font-family: var(--font-sans);
              line-height: 1.6;
              color: var(--color-dark);
              background-color: var(--color-light);
              margin: 0;
              padding: 0;
            }

            .code-highlight {
              font-family: var(--font-mono);
              background: var(--color-dark);
              color: var(--color-secondary);
              padding: 2px 6px;
              border-radius: 4px;
              font-size: 0.9em;
            }

            .btn {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              padding: 12px 24px;
              border: none;
              border-radius: var(--border-radius);
              font-family: var(--font-sans);
              font-weight: 500;
              text-decoration: none;
              cursor: pointer;
              transition: var(--transition);
              font-size: 16px;
            }

            .btn-primary {
              background: var(--color-primary);
              color: white;
            }

            .btn-primary:hover {
              background: var(--color-primary-dark);
              transform: translateY(-1px);
              box-shadow: var(--shadow-md);
            }

            .btn-secondary {
              background: var(--color-secondary);
              color: var(--color-dark);
            }

            .btn-secondary:hover {
              background: #00c49a;
              transform: translateY(-1px);
            }

            .container {
              max-width: 1200px;
              margin: 0 auto;
              padding: 0 20px;
            }

            .grid {
              display: grid;
              gap: 2rem;
            }

            .grid-2 {
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            }

            .grid-3 {
              grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            }

            .card {
              background: white;
              border-radius: var(--border-radius);
              padding: 2rem;
              box-shadow: var(--shadow-sm);
              transition: var(--transition);
            }

            .card:hover {
              box-shadow: var(--shadow-md);
              transform: translateY(-2px);
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
      </body>
    </html>
  );
}
