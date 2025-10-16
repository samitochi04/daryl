# ✅ Getting Started Checklist

Follow this checklist to launch your Daryl website!

## Phase 1: Setup (1-2 hours)

### Prerequisites
- [ ] Node.js installed (v16+) - Download from nodejs.org
- [ ] Git installed (optional but recommended)
- [ ] Code editor ready (VS Code recommended)
- [ ] Supabase account created (free tier)
- [ ] Gmail account for emails (or other email service)

### Installation
- [ ] Open PowerShell in project folder
- [ ] Run `npm install`
- [ ] Run `cd backend && npm install && cd ..`
- [ ] Verify no errors during installation

### Supabase Configuration
- [ ] Create new Supabase project
- [ ] Wait for project initialization (2-3 minutes)
- [ ] Go to SQL Editor
- [ ] Copy content from `supabase/schema.sql`
- [ ] Run the schema script
- [ ] Verify "Success. No rows returned"
- [ ] Go to Settings > API
- [ ] Copy Project URL
- [ ] Copy anon/public key

### Environment Variables
- [ ] Create `.env` in root folder from `.env.example`
- [ ] Add Supabase URL to `.env`
- [ ] Add Supabase anon key to `.env`
- [ ] Create `backend/.env` from `backend/.env.example`
- [ ] Configure Gmail settings in `backend/.env`
- [ ] Generate Gmail App Password if using Gmail
- [ ] Add all email settings to `backend/.env`

### Admin User Creation
- [ ] Start backend: `cd backend && npm start`
- [ ] Generate password hash using curl or PowerShell
- [ ] Copy the hash
- [ ] Edit `supabase/add_admin.sql`
- [ ] Update email and password_hash
- [ ] Run script in Supabase SQL Editor
- [ ] Verify "Success. 1 row(s) affected"
- [ ] Stop backend (Ctrl+C)

## Phase 2: Testing (30 minutes)

### Start Servers
- [ ] Terminal 1: Run `npm run dev`
- [ ] Terminal 2: Run `cd backend && npm run dev`
- [ ] Frontend opens at http://localhost:3000
- [ ] Backend running at http://localhost:5000

### Test Frontend
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] About page displays
- [ ] Services page displays
- [ ] Blog page loads (may be empty)
- [ ] Contact page displays
- [ ] Footer displays
- [ ] Mobile menu works (resize browser)
- [ ] No console errors

### Test Contact Form
- [ ] Fill out contact form
- [ ] Submit form
- [ ] See success notification
- [ ] Check your email for confirmation
- [ ] Check admin email for message

### Test Email Subscription
- [ ] Scroll to footer
- [ ] Enter email address
- [ ] Click Subscribe
- [ ] See success notification
- [ ] No errors in console

### Test Admin Login
- [ ] Go to http://localhost:3000/admin/login
- [ ] Enter admin email
- [ ] Enter admin password
- [ ] Click Sign In
- [ ] Dashboard loads successfully
- [ ] Navigation sidebar works

### Test Admin Features
- [ ] Dashboard shows stats (zeros are OK)
- [ ] Click "Blogs" - loads blog list
- [ ] Click "New Blog Post"
- [ ] Fill in blog form
- [ ] Check "Publish"
- [ ] Save blog post
- [ ] See success notification
- [ ] Blog appears in list
- [ ] Go to public blog page
- [ ] Blog post appears
- [ ] Click to view full post
- [ ] Post displays correctly

### Test Messages
- [ ] In admin, click "Messages"
- [ ] Should see test message from contact form
- [ ] Click message to view details
- [ ] Mark as read works
- [ ] Delete works

### Test Subscribers
- [ ] In admin, click "Subscribers"
- [ ] Should see test email subscription
- [ ] Export CSV works
- [ ] Delete works

## Phase 3: Customization (2-4 hours)

### Content Updates
- [ ] Update About page with your story
- [ ] Change portfolio link to yours
- [ ] Update all social media links (Footer, Contact)
- [ ] Replace contact email with yours
- [ ] Update services to match your offerings
- [ ] Modify skills in Home and About pages
- [ ] Update hero section tagline

### Branding
- [ ] Choose your brand colors (tailwind.config.js)
- [ ] Update logo if changing "Daryl." name
- [ ] Change fonts if desired (index.html)
- [ ] Create/update favicon
- [ ] Update Open Graph image URLs

### SEO
- [ ] Update meta description in index.html
- [ ] Update meta keywords
- [ ] Update title tags for all pages
- [ ] Replace "yourdomain.com" with your domain
- [ ] Update robots.txt sitemap URL

### Content Creation
- [ ] Write 3-5 blog posts
- [ ] Create compelling titles
- [ ] Add SEO-friendly descriptions
- [ ] Choose relevant categories
- [ ] Add tags
- [ ] Publish posts

## Phase 4: Pre-Launch (1-2 hours)

### Quality Assurance
- [ ] Test all pages again
- [ ] Check all links work
- [ ] Verify all forms work
- [ ] Test on mobile device
- [ ] Test in different browsers
- [ ] Fix any console errors
- [ ] Optimize images (compress if large)
- [ ] Test email sending

### Performance
- [ ] Run Lighthouse audit
- [ ] Aim for 90+ score
- [ ] Optimize any issues
- [ ] Test load speed

### Content Review
- [ ] Proofread all text
- [ ] Check for spelling errors
- [ ] Verify contact information
- [ ] Ensure brand consistency
- [ ] Review blog posts

## Phase 5: Deployment (1-2 hours)

### Build & Deploy Frontend
- [ ] Run `npm run build`
- [ ] Verify build succeeds
- [ ] Test build locally: `npm run preview`
- [ ] Upload to Coolify/Vercel/Netlify
- [ ] Configure environment variables
- [ ] Deploy
- [ ] Test deployed site

### Deploy Backend
- [ ] Choose hosting (Railway/Render)
- [ ] Deploy backend folder
- [ ] Set environment variables
- [ ] Test backend is running
- [ ] Update frontend VITE_BACKEND_URL
- [ ] Rebuild and redeploy frontend

### DNS & Domain (Optional)
- [ ] Point domain to hosting
- [ ] Configure DNS records
- [ ] Enable SSL/HTTPS
- [ ] Wait for DNS propagation
- [ ] Test with domain

## Phase 6: Post-Launch (Ongoing)

### Immediate
- [ ] Test all features on production
- [ ] Submit to Google Search Console
- [ ] Add property and verify
- [ ] Submit sitemap
- [ ] Request indexing

### Week 1
- [ ] Set up Google Analytics (optional)
- [ ] Share on LinkedIn
- [ ] Share on Twitter
- [ ] Share on Instagram
- [ ] Update resume with link
- [ ] Add to email signature

### Ongoing
- [ ] Publish blog post weekly/biweekly
- [ ] Respond to contact messages
- [ ] Engage on social media
- [ ] Monitor analytics
- [ ] Update content regularly
- [ ] Backup database monthly

## Success Criteria

You're ready to launch when:
- [ ] All pages load without errors
- [ ] All forms work correctly
- [ ] Admin dashboard fully functional
- [ ] At least 3 blog posts published
- [ ] All your information updated
- [ ] Mobile responsive
- [ ] Fast load times
- [ ] No broken links
- [ ] Emails sending correctly
- [ ] Lighthouse score 90+

## Emergency Contacts

If you get stuck:
1. Check **TROUBLESHOOTING.md**
2. Review **SETUP_GUIDE.md**
3. Check browser console
4. Review Supabase logs
5. Check backend server logs

## Time Estimates

- **Setup**: 1-2 hours
- **Testing**: 30 minutes
- **Customization**: 2-4 hours
- **Content Creation**: 2-3 hours
- **Pre-Launch**: 1-2 hours
- **Deployment**: 1-2 hours

**Total**: 8-14 hours to full launch

## Motivation

Remember why you're doing this:

> "After 7 months of job searching and countless rejections, I decided to take control. This website is my platform, my voice, my future. When companies come looking, I'll be ready."

**You've got this! Let's launch! 🚀**

---

**Current Status**: Ready to begin setup
**Next Step**: Start Phase 1 - Setup
**Documentation**: All guides in project folder

Good luck! 💪
