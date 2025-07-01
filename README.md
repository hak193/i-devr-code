# iDevrCode - Premium Developer Resources Platform

A modern e-commerce platform built with Remix and designed for developers. Features premium courses, tools, templates, and resources to accelerate development skills.

## 🚀 Features

- **Modern Design**: Clean, developer-focused UI with responsive design
- **Course Catalog**: Premium programming courses with detailed information
- **Developer Tools**: Productivity tools and utilities for developers
- **Code Templates**: Ready-to-use code templates and boilerplates
- **Newsletter**: Stay updated with latest resources and content
- **Responsive**: Mobile-first design that works on all devices

## 🛠️ Tech Stack

- **Framework**: [Remix](https://remix.run) - Full-stack web framework
- **Styling**: Custom CSS with CSS Variables and Flexbox/Grid
- **Fonts**: Inter (UI) + JetBrains Mono (Code)
- **Icons**: SVG icons and emoji
- **Deployment**: Vercel (configured)

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd i-devr-code
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment to Vercel

This project is configured for easy deployment to Vercel:

1. **Connect to Vercel**:
   - Push your code to GitHub
   - Connect your GitHub repository to Vercel
   - Vercel will automatically detect it's a Remix project

2. **Environment Variables** (if needed):
   - Add any required environment variables in Vercel dashboard
   - For Shopify integration, you'll need:
     - `SHOPIFY_API_KEY`
     - `SHOPIFY_API_SECRET`
     - `SHOPIFY_APP_URL`
     - `DATABASE_URL` (for Prisma)

3. **Deploy**:
   - Vercel will automatically build and deploy your app
   - Your app will be available at `https://your-app-name.vercel.app`

## 📁 Project Structure

```
app/
├── components/          # Reusable UI components
│   ├── Header.jsx      # Navigation header
│   ├── Hero.jsx        # Hero section
│   ├── FeaturedProducts.jsx
│   ├── Categories.jsx
│   ├── Newsletter.jsx
│   └── Footer.jsx
├── routes/             # Remix routes
│   ├── _index.jsx      # Homepage
│   ├── about.jsx       # About page
│   ├── courses.jsx     # Courses catalog
│   ├── tools.jsx       # Developer tools
│   └── app.jsx         # Shopify admin app
├── root.jsx            # Root component with global styles
└── entry.server.jsx    # Server entry point
```

## 🎨 Customization

### Colors
The design uses CSS custom properties for easy theming:

```css
:root {
  --color-primary: #0066cc;
  --color-secondary: #00d4aa;
  --color-accent: #ff6b35;
  --color-dark: #1a1a1a;
  --color-light: #f8f9fa;
}
```

### Typography
- **UI Font**: Inter (clean, modern)
- **Code Font**: JetBrains Mono (for code snippets)

### Components
All components are modular and can be easily customized:
- Modify component props in route loaders
- Update styling in component files
- Add new components in `/app/components/`

## 📱 Pages

- **Homepage** (`/`): Hero, featured products, categories, newsletter
- **Courses** (`/courses`): Course catalog with filtering
- **Tools** (`/tools`): Developer tools and utilities
- **About** (`/about`): Company information and team
- **Admin App** (`/app`): Shopify admin integration

## 🔧 Development

### Adding New Products
Update the loader data in respective route files:
- Courses: `app/routes/courses.jsx`
- Tools: `app/routes/tools.jsx`

### Adding New Pages
Create new route files in `app/routes/`:
```jsx
// app/routes/new-page.jsx
export default function NewPage() {
  return <div>New Page Content</div>;
}
```

### Styling
- Global styles are in `app/root.jsx`
- Component-specific styles use Tailwind-like utility classes
- Custom CSS properties for consistent theming

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Contact: support@idevrcode.com
- Documentation: [docs.idevrcode.com](https://docs.idevrcode.com)

---

Built with ❤️ for the developer community