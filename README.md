# Daryl.

> **Your Digital Presence, Your Rules**

A modern, SEO-optimized personal website built with React, Tailwind CSS, and Supabase. Showcase your skills in Data Science, AI, Web Development, and Digital Marketing while taking control of your professional journey.

![React](https://img.shields.io/badge/React-18.2-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38bdf8)
![Supabase](https://img.shields.io/badge/Supabase-BaaS-3ecf8e)

## 🌟 Features

- **📱 Fully Responsive** - Beautiful on all devices
- **⚡ Lightning Fast** - Optimized performance with Vite
- **🔍 SEO Optimized** - Meta tags, Open Graph, sitemap ready
- **📝 Blog System** - Full-featured blog with admin dashboard
- **📧 Contact Forms** - Integrated with email notifications
- **📬 Newsletter** - Email subscription management
- **🎨 Modern UI** - Smooth animations and transitions
- **🔐 Admin Dashboard** - Manage content easily
- **🎯 SEO Friendly** - Optimized for search engines
- **🚀 Ready for Deployment** - Configured for static hosting

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS v3** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Framer Motion** - Animation library
- **React Icons** - Icon library

### Backend
- **Supabase** - Backend as a Service (Database)
- **Node.js + Express** - Email service
- **Nodemailer** - Email sending
- **bcrypt** - Password hashing

## 📚 Documentation

- **[✅ Getting Started](GETTING_STARTED.md)** - Complete launch checklist ⭐
- **[📖 Setup Guide](SETUP_GUIDE.md)** - Step-by-step setup instructions
- **[⚡ Quick Start](QUICK_START.md)** - Quick reference commands
- **[🎨 Customization Guide](CUSTOMIZATION.md)** - Personalize your website
- **[🚀 Deployment Checklist](DEPLOYMENT.md)** - Production deployment guide
- **[🔧 Troubleshooting](TROUBLESHOOTING.md)** - Common issues and solutions
- **[📊 Project Summary](PROJECT_SUMMARY.md)** - Complete project overview

## � Quick Start

**New to this project?** Start with the **[Getting Started Checklist](GETTING_STARTED.md)** ✨

\`\`\`bash
# 1. Install dependencies
npm install
cd backend && npm install && cd ..

# 2. Configure environment (see Setup Guide for details)
Copy-Item .env.example .env
Copy-Item backend\.env.example backend\.env

# 3. Start servers
npm run dev                    # Terminal 1: Frontend
cd backend && npm run dev      # Terminal 2: Backend
\`\`\`

Visit **http://localhost:3000** 🎉

For complete setup instructions, see **[SETUP_GUIDE.md](SETUP_GUIDE.md)**

## �📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account (free tier available)
- Email service (Gmail, SendGrid, etc.)

## 🚀 Quick Start

### 1. Clone the Repository

\`\`\`bash
cd c:/Users/temmo/Desktop/PROJECTS/daryl
\`\`\`

### 2. Install Frontend Dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Install Backend Dependencies

\`\`\`bash
cd backend
npm install
cd ..
\`\`\`

### 4. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** in your Supabase dashboard
3. Run the SQL script from `supabase/schema.sql`
4. Get your project URL and anon key from **Settings > API**

### 5. Configure Environment Variables

#### Frontend (.env)
\`\`\`bash
# Copy the example file
copy .env.example .env
\`\`\`

Edit `.env` and add your Supabase credentials:
\`\`\`env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_BACKEND_URL=http://localhost:5000
\`\`\`

#### Backend (backend/.env)
\`\`\`bash
cd backend
copy .env.example .env
\`\`\`

Edit `backend/.env` and configure your email service:
\`\`\`env
PORT=5000
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=Daryl <your-email@gmail.com>
CONTACT_EMAIL=contact@daryl.com
\`\`\`

**Note for Gmail users:**
- Enable 2-factor authentication
- Generate an App Password: [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
- Use the app password in EMAIL_PASS

### 6. Create Admin User

First, generate a password hash using the backend API:

\`\`\`bash
# Start the backend server
cd backend
npm start
\`\`\`

Then in another terminal or use a tool like Postman:

\`\`\`bash
# Generate password hash
curl -X POST http://localhost:5000/api/hash-password -H "Content-Type: application/json" -d "{\"password\":\"YourSecurePassword123!\"}"
\`\`\`

Copy the returned hash, then:
1. Open `supabase/add_admin.sql`
2. Replace the email and password_hash with your values
3. Run this SQL script in your Supabase SQL Editor

### 7. Run the Application

#### Development Mode

Terminal 1 - Frontend:
\`\`\`bash
npm run dev
\`\`\`

Terminal 2 - Backend:
\`\`\`bash
cd backend
npm run dev
\`\`\`

The frontend will be available at `http://localhost:3000`
The backend will be available at `http://localhost:5000`

#### Production Build

\`\`\`bash
npm run build
\`\`\`

The production files will be in the `dist` folder.

## 📁 Project Structure

\`\`\`
daryl/
├── backend/                 # Backend service
│   ├── server.js           # Express server
│   ├── package.json
│   └── .env.example
├── public/                 # Static assets
│   ├── robots.txt
│   └── favicon.svg
├── src/
│   ├── components/         # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── SEO.jsx
│   │   └── ...
│   ├── contexts/           # React contexts
│   │   ├── AuthContext.jsx
│   │   └── NotificationContext.jsx
│   ├── pages/              # Page components
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── Blog.jsx
│   │   ├── Contact.jsx
│   │   └── admin/          # Admin pages
│   ├── lib/                # Utilities
│   │   └── supabase.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── supabase/               # Database scripts
│   ├── schema.sql
│   └── add_admin.sql
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
\`\`\`

## 🎨 Customization

### Update Branding

1. **Logo**: Edit the logo text in components (search for "Daryl.")
2. **Colors**: Modify `tailwind.config.js` primary colors
3. **Fonts**: Update Google Fonts in `index.html`
4. **Content**: Update text in page components

### Add Your Information

- **Portfolio Link**: Update in `src/pages/About.jsx`
- **Social Links**: Update in `src/components/Footer.jsx`
- **Contact Info**: Update in `src/pages/Contact.jsx`
- **Skills**: Modify arrays in `src/pages/Home.jsx`, `About.jsx`, and `Services.jsx`

## 🔐 Admin Dashboard

Access the admin dashboard at: `http://localhost:3000/admin/login`

**Features:**
- ✍️ Create and manage blog posts
- 📧 View contact messages
- 👥 Manage email subscribers
- 📊 Dashboard with analytics

**Default Route:** `/admin/login` (not linked publicly for security)

## 🌐 Deployment

### Deploy to Coolify (Recommended)

1. Build the project:
\`\`\`bash
npm run build
\`\`\`

2. Upload the `dist` folder to your Coolify instance
3. Configure as a static site
4. Set environment variables in Coolify dashboard
5. Deploy!

### Deploy Backend

Deploy the `backend` folder to any Node.js hosting:
- Railway
- Render
- Heroku
- DigitalOcean App Platform

Update `VITE_BACKEND_URL` in frontend `.env` to point to your deployed backend.

### Other Platforms

- **Vercel**: `vercel --prod`
- **Netlify**: `netlify deploy --prod`
- **GitHub Pages**: Update `vite.config.js` base path

## 📝 Creating Blog Posts

1. Login to admin dashboard
2. Navigate to "Blogs"
3. Click "New Blog Post"
4. Fill in all fields (HTML supported in content)
5. Toggle "Publish" when ready
6. Click "Save Blog Post"

**SEO Tips:**
- Use descriptive titles and meta descriptions
- Add relevant tags
- Use high-quality images
- Write compelling excerpts

## 📧 Email Configuration

The backend supports various email providers:

**Gmail:**
- Use App Passwords (2FA required)
- Set EMAIL_HOST=smtp.gmail.com, EMAIL_PORT=587

**SendGrid:**
- Use API key
- More reliable for production

**Other Providers:**
- Update EMAIL_HOST and EMAIL_PORT accordingly

## 🔧 Troubleshooting

### Frontend Issues

**Build fails:**
\`\`\`bash
rm -rf node_modules package-lock.json
npm install
\`\`\`

**Supabase connection error:**
- Verify .env variables
- Check Supabase project is active
- Ensure anon key is correct

### Backend Issues

**Email not sending:**
- Verify email credentials
- Check firewall/network settings
- Test with a simple email client first

**Admin login fails:**
- Verify admin was added to database
- Check backend is running
- Verify password hash is correct

## 📱 SEO Optimization

This website follows SEO best practices:

- ✅ Semantic HTML
- ✅ Meta tags (title, description, keywords)
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card tags
- ✅ Canonical URLs
- ✅ Robots.txt
- ✅ Fast loading times
- ✅ Mobile responsive
- ✅ Accessible design

## 🤝 Support

For issues or questions:
- Check the troubleshooting section
- Review Supabase documentation
- Check your browser console for errors

## 📄 License

This project is for personal use. Feel free to customize it for your own portfolio.

## 🎯 Roadmap

Future enhancements:
- [ ] Blog categories and search
- [ ] Image upload for blogs
- [ ] Rich text editor for blog content
- [ ] Analytics integration
- [ ] Comments system
- [ ] Multi-language support

---

**Built with ❤️ by Daryl**

*"Taking control of my destiny, one line of code at a time."*