# 🎨 Daryl Customization Guide

This guide will help you personalize your website.

## 1. Update Your Information

### About Page (src/pages/About.jsx)

**Your Story:**
- Line 10-60: Update the journey timeline
- Line 80-110: Edit your personal story
- Line 120-180: Modify skills and expertise

**Portfolio Link:**
- Line 195: Change `https://samuel.diversis.site/` to your portfolio URL

### Contact Page (src/pages/Contact.jsx)

**Contact Information:**
- Line 70-90: Update email, LinkedIn, Instagram links
- Replace all `daryl` handles with your actual social media handles

### Footer (src/components/Footer.jsx)

**Social Links (Line 20-30):**
\`\`\`javascript
const socialLinks = [
  { icon: FiLinkedin, url: 'https://linkedin.com/in/your-handle', label: 'LinkedIn' },
  { icon: FiInstagram, url: 'https://instagram.com/your-handle', label: 'Instagram' },
  { icon: FiGithub, url: 'https://github.com/your-handle', label: 'GitHub' },
  { icon: FiMail, url: 'mailto:your-email@domain.com', label: 'Email' }
]
\`\`\`

## 2. Customize Branding

### Logo & Brand Name

The logo "Daryl." appears in multiple files. Search and replace if needed:

1. `src/components/Navbar.jsx` - Line 35
2. `src/components/Footer.jsx` - Line 50
3. `src/pages/admin/AdminLogin.jsx` - Line 45
4. `src/pages/admin/AdminLayout.jsx` - Line 30

### Colors (tailwind.config.js)

\`\`\`javascript
colors: {
  primary: {
    50: '#f0f9ff',   // Lightest
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',  // Main brand color
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',  // Darkest
  }
}
\`\`\`

**Quick Color Changes:**
- Blue theme (current): `#0ea5e9`
- Purple theme: `#8b5cf6`
- Green theme: `#10b981`
- Orange theme: `#f97316`
- Pink theme: `#ec4899`

### Fonts (index.html)

Currently using:
- **Display Font**: Poppins (headings)
- **Body Font**: Inter (text)

Change in `index.html` line 28:
\`\`\`html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;500;600;700&display=swap" rel="stylesheet">
\`\`\`

Then update `tailwind.config.js`:
\`\`\`javascript
fontFamily: {
  'display': ['YourDisplayFont', 'sans-serif'],
  'body': ['YourBodyFont', 'sans-serif'],
}
\`\`\`

## 3. Modify Content

### Home Page (src/pages/Home.jsx)

**Hero Section (Line 20-35):**
- Update tagline
- Modify description
- Change CTA button text

**Skills Cards (Line 15-40):**
\`\`\`javascript
const skills = [
  {
    icon: FiYourIcon,
    title: 'Your Service',
    description: 'Your description',
    color: 'from-blue-500 to-cyan-500'
  },
  // Add more...
]
\`\`\`

**Stats Section (Line 120-130):**
Update the numbers and labels to reflect your achievements

### Services Page (src/pages/Services.jsx)

**Services Array (Line 10-100):**
- Add/remove services
- Update features lists
- Change icons and colors
- Modify descriptions

### SEO Settings (index.html)

**Meta Tags (Line 10-30):**
\`\`\`html
<meta name="description" content="Your custom description" />
<meta name="keywords" content="your, keywords, here" />
<meta property="og:title" content="Your Title" />
<meta property="og:description" content="Your Description" />
\`\`\`

## 4. Images & Media

### Hero Images

Replace image URLs in `src/pages/Home.jsx`:
\`\`\`javascript
<img 
  src="https://your-image-url.com/image.jpg" 
  alt="Your alt text"
/>
\`\`\`

**Free Image Sources:**
- Unsplash: https://unsplash.com
- Pexels: https://pexels.com
- Pixabay: https://pixabay.com

### Favicon

Replace `public/favicon.svg` with your own logo

### Open Graph Image

Create a 1200x630px image for social sharing and update in `index.html`

## 5. Add New Pages

1. **Create page file:** `src/pages/NewPage.jsx`
\`\`\`javascript
import SEO from '../components/SEO'

const NewPage = () => {
  return (
    <>
      <SEO title="Page Title" description="Page description" />
      <div className="min-h-screen pt-24">
        {/* Your content */}
      </div>
    </>
  )
}

export default NewPage
\`\`\`

2. **Add route in** `src/App.jsx`:
\`\`\`javascript
import NewPage from './pages/NewPage'

// In Routes section:
<Route path="/new-page" element={<NewPage />} />
\`\`\`

3. **Add to navigation** in `src/components/Navbar.jsx`:
\`\`\`javascript
const navLinks = [
  // existing links...
  { name: 'New Page', path: '/new-page' }
]
\`\`\`

## 6. Modify Admin Dashboard

### Add New Admin Features

1. Create new component in `src/pages/admin/`
2. Add route in `src/App.jsx` admin routes
3. Add navigation in `src/pages/admin/AdminLayout.jsx`

### Customize Dashboard Stats

Edit `src/pages/admin/AdminDashboard.jsx` line 40-70 to add/remove stat cards

## 7. Email Templates

### Contact Form Email (backend/server.js)

Line 60-120: Customize the HTML email templates

**Admin Notification:**
\`\`\`javascript
html: \`
  <h1>Your Custom Header</h1>
  <p>Your custom message</p>
\`
\`\`\`

**Confirmation Email:**
Same file, line 130-180

## 8. Blog Customization

### Categories

Add predefined categories in `src/pages/admin/BlogEditor.jsx`:
\`\`\`javascript
<select name="category" className="input-field">
  <option value="">Select Category</option>
  <option value="Data Science">Data Science</option>
  <option value="Web Development">Web Development</option>
  <option value="Your Category">Your Category</option>
</select>
\`\`\`

### Blog Layout

Modify `src/pages/BlogPost.jsx` to change how blog posts are displayed

## 9. Animation & Effects

### Add Custom Animations

In `tailwind.config.js`:
\`\`\`javascript
animation: {
  'your-animation': 'yourKeyframe 1s ease-in-out infinite',
},
keyframes: {
  yourKeyframe: {
    '0%': { /* start state */ },
    '100%': { /* end state */ },
  }
}
\`\`\`

Use in components:
\`\`\`javascript
<div className="animate-your-animation">
  Content
</div>
\`\`\`

## 10. Mobile Responsiveness

### Tailwind Breakpoints

- `sm:` - 640px and up
- `md:` - 768px and up
- `lg:` - 1024px and up
- `xl:` - 1280px and up
- `2xl:` - 1536px and up

Example:
\`\`\`javascript
<div className="text-2xl md:text-4xl lg:text-6xl">
  Responsive Text
</div>
\`\`\`

## Quick Tips

### Text Gradient
\`\`\`javascript
<h1 className="text-gradient">Gradient Text</h1>
\`\`\`

### Cards
\`\`\`javascript
<div className="card p-6">Card Content</div>
\`\`\`

### Buttons
\`\`\`javascript
<button className="btn-primary">Primary Button</button>
<button className="btn-secondary">Secondary Button</button>
<button className="btn-outline">Outline Button</button>
\`\`\`

### Input Fields
\`\`\`javascript
<input className="input-field" />
\`\`\`

### Sections
\`\`\`javascript
<section className="py-20 gradient-bg">
  <div className="container-custom">
    {/* Content */}
  </div>
</section>
\`\`\`

## Testing Your Changes

1. Save your files
2. Check browser (should hot-reload)
3. Test on mobile (Chrome DevTools)
4. Validate on different browsers
5. Check console for errors

## Best Practices

1. **Always test after changes**
2. **Keep backups** of working versions
3. **One change at a time** for easier debugging
4. **Comment your code** for future reference
5. **Check console** for errors regularly
6. **Test responsiveness** on all screen sizes

---

Happy customizing! Make Daryl truly yours! 🎨
