# Deployment Guide for iDevrCode

## Quick Deploy to Vercel

### Option 1: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/i-devr-code)

### Option 2: Manual Deploy

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/i-devr-code.git
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect it's a Remix project

3. **Configure Environment Variables** (if needed):
   ```
   SHOPIFY_API_KEY=your_api_key
   SHOPIFY_API_SECRET=your_api_secret
   SHOPIFY_APP_URL=https://your-app.vercel.app
   DATABASE_URL=your_database_url
   ```

4. **Deploy**:
   - Click "Deploy"
   - Your app will be live at `https://your-app.vercel.app`

## Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## Project Structure

```
├── app/
│   ├── components/          # Reusable UI components
│   ├── routes/             # Remix routes (pages)
│   ├── root.jsx            # Root layout with global styles
│   └── entry.server.jsx    # Server entry point
├── public/                 # Static assets
├── vercel.json            # Vercel configuration
└── package.json           # Dependencies and scripts
```

## Features Included

✅ **Modern Design**: Clean, developer-focused UI  
✅ **Responsive**: Mobile-first design  
✅ **SEO Optimized**: Meta tags and structured data  
✅ **Performance**: Optimized images and code splitting  
✅ **Accessibility**: WCAG compliant components  
✅ **TypeScript Ready**: Type definitions included  

## Pages Created

- **Homepage** (`/`) - Hero, featured products, categories
- **Courses** (`/courses`) - Course catalog with filtering
- **Tools** (`/tools`) - Developer tools showcase
- **About** (`/about`) - Company information
- **Contact** (`/contact`) - Contact form and information

## Customization

### Colors
Edit CSS custom properties in `app/root.jsx`:
```css
:root {
  --color-primary: #0066cc;
  --color-secondary: #00d4aa;
  --color-accent: #ff6b35;
}
```

### Content
Update product data in route loaders:
- Courses: `app/routes/courses.jsx`
- Tools: `app/routes/tools.jsx`

### Components
All components are in `app/components/` and can be easily modified.

## Support

- 📧 Email: support@idevrcode.com
- 📚 Documentation: Built-in help system
- 🐛 Issues: GitHub Issues

---

**Ready to deploy!** 🚀