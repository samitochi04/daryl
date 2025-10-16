# 🚀 Daryl Website - Complete Setup Guide

Follow these steps in order to get your website up and running!

## Step 1: Install Dependencies

Open PowerShell in the project folder and run:

\`\`\`powershell
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
\`\`\`

## Step 2: Set Up Supabase Database

1. **Create Supabase Account**
   - Go to https://supabase.com
   - Sign up for free
   - Create a new project
   - Wait for project initialization (2-3 minutes)

2. **Run Database Scripts**
   - In your Supabase dashboard, go to **SQL Editor**
   - Click "New Query"
   - Copy and paste the entire content from `supabase/schema.sql`
   - Click "Run" to execute
   - You should see "Success. No rows returned" message

3. **Get Your Credentials**
   - Go to **Settings > API**
   - Copy your **Project URL**
   - Copy your **anon/public key**

## Step 3: Configure Environment Variables

### Frontend Configuration

1. Create `.env` file in the root folder:
\`\`\`powershell
Copy-Item .env.example .env
\`\`\`

2. Open `.env` and replace with your values:
\`\`\`env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_BACKEND_URL=http://localhost:5000
\`\`\`

### Backend Configuration

1. Create `backend/.env` file:
\`\`\`powershell
cd backend
Copy-Item .env.example .env
cd ..
\`\`\`

2. Open `backend/.env` and configure:

**For Gmail:**
\`\`\`env
PORT=5000
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=youremail@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=Daryl <youremail@gmail.com>
CONTACT_EMAIL=youremail@gmail.com
\`\`\`

**Gmail App Password Setup:**
- Go to https://myaccount.google.com/security
- Enable 2-Step Verification
- Go to https://myaccount.google.com/apppasswords
- Select "Mail" and "Windows Computer"
- Generate password and use it in EMAIL_PASS

## Step 4: Create Admin User

1. **Start the backend server:**
\`\`\`powershell
cd backend
npm start
\`\`\`

2. **Open another PowerShell window** and generate password hash:

\`\`\`powershell
# Windows PowerShell method
$body = @{
    password = "YourSecurePassword123!"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/hash-password" -Method Post -Body $body -ContentType "application/json"
\`\`\`

Or use this simpler method:
\`\`\`powershell
curl.exe -X POST http://localhost:5000/api/hash-password -H "Content-Type: application/json" -d "{\"password\":\"YourSecurePassword123!\"}"
\`\`\`

3. **Copy the hash** from the response

4. **Update the SQL script:**
   - Open `supabase/add_admin.sql`
   - Replace `admin@daryl.com` with your email
   - Replace the hash value with your generated hash
   - Save the file

5. **Run the script in Supabase:**
   - Go to Supabase SQL Editor
   - Copy the content from `supabase/add_admin.sql`
   - Run it
   - You should see "Success. 1 row(s) affected"

6. **Stop the backend** (Ctrl+C) - we'll restart everything together next

## Step 5: Run the Application

You'll need **TWO PowerShell windows**:

### Terminal 1 - Frontend
\`\`\`powershell
npm run dev
\`\`\`

### Terminal 2 - Backend
\`\`\`powershell
cd backend
npm run dev
\`\`\`

## Step 6: Access Your Website

- **Main Website**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin/login
- **Backend API**: http://localhost:5000

## Step 7: Test Everything

### Test Frontend
1. Visit http://localhost:3000
2. Navigate through all pages
3. Check that everything loads properly

### Test Contact Form
1. Go to http://localhost:3000/contact
2. Fill out the form
3. Submit
4. Check your email for confirmation
5. Check admin messages in dashboard

### Test Email Subscription
1. Scroll to footer on any page
2. Enter an email address
3. Click Subscribe
4. Check if it appears in admin dashboard

### Test Admin Dashboard
1. Go to http://localhost:3000/admin/login
2. Login with your admin credentials
3. Check all sections:
   - Dashboard (overview)
   - Blogs (create a test blog)
   - Messages (check if contact form message appears)
   - Subscribers (check if subscription appears)

## Step 8: Create Your First Blog Post

1. Login to admin
2. Go to "Blogs"
3. Click "New Blog Post"
4. Fill in:
   - **Title**: "Welcome to My Blog"
   - **Slug**: Auto-generated, or edit if needed
   - **Excerpt**: A brief summary
   - **Content**: Your blog post HTML (simple HTML tags work)
   - **Image URL**: https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800
   - **Category**: "Technology"
   - **Tags**: "welcome, introduction, tech"
5. Check "Publish this blog post"
6. Click "Save Blog Post"
7. Visit http://localhost:3000/blog to see it!

## Common Issues & Solutions

### Issue: "Module not found" errors
**Solution:**
\`\`\`powershell
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install
\`\`\`

### Issue: Backend won't start
**Solution:**
- Check if port 5000 is in use
- Verify `.env` file exists in backend folder
- Check Node.js version: `node --version` (should be v16+)

### Issue: Email not sending
**Solution:**
- Verify Gmail App Password is correct
- Check EMAIL_USER and EMAIL_PASS in backend/.env
- Try sending a test email manually
- Check spam folder

### Issue: Can't login to admin
**Solution:**
- Verify admin was added to database (check Supabase Table Editor)
- Make sure backend is running
- Check browser console for errors
- Verify password is correct

### Issue: Supabase connection error
**Solution:**
- Check .env has correct Supabase URL and key
- Verify Supabase project is active
- Check browser console for specific error

## Next Steps

### Customize Your Site

1. **Update Your Information:**
   - Edit `src/pages/About.jsx` (your story)
   - Edit `src/pages/Services.jsx` (your services)
   - Edit `src/components/Footer.jsx` (social links)

2. **Add Your Portfolio:**
   - Update the portfolio link in About page
   - Replace with your actual portfolio URL

3. **Update Branding:**
   - Colors in `tailwind.config.js`
   - Logo text throughout components
   - Favicon in `public/favicon.svg`

### Prepare for Production

1. **Update Email Settings:**
   - Consider using SendGrid for production
   - Update EMAIL_HOST, EMAIL_PORT in backend/.env

2. **Update URLs:**
   - Change all "yourdomain.com" references
   - Update Open Graph images
   - Update canonical URLs

3. **Build for Production:**
\`\`\`powershell
npm run build
\`\`\`

## Production Deployment

### Deploy Frontend to Coolify

1. Build the project:
\`\`\`powershell
npm run build
\`\`\`

2. Upload `dist` folder to Coolify
3. Configure as static site
4. Done!

### Deploy Backend

Deploy to Railway, Render, or any Node.js host:
1. Push `backend` folder to Git
2. Set environment variables on hosting platform
3. Get your backend URL
4. Update `VITE_BACKEND_URL` in frontend .env
5. Rebuild and redeploy frontend

## Need Help?

Check these resources:
- Supabase Docs: https://supabase.com/docs
- Vite Docs: https://vitejs.dev
- Tailwind CSS: https://tailwindcss.com
- React Router: https://reactrouter.com

## Success Checklist

- [ ] Dependencies installed
- [ ] Supabase project created
- [ ] Database schema created
- [ ] Environment variables configured
- [ ] Admin user created
- [ ] Frontend running on localhost:3000
- [ ] Backend running on localhost:5000
- [ ] Can navigate all pages
- [ ] Contact form works
- [ ] Email subscription works
- [ ] Can login to admin
- [ ] Can create blog posts
- [ ] Emails sending correctly

---

**Congratulations! Your Daryl website is now running! 🎉**

Start creating content and building your online presence!
