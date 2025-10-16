# 🚀 Deployment Checklist for Daryl

Use this checklist before deploying to production.

## Pre-Deployment Checklist

### ✅ Content Review

- [ ] All personal information updated (About, Contact, Footer)
- [ ] Social media links point to correct profiles
- [ ] Portfolio link updated
- [ ] Contact email configured correctly
- [ ] All placeholder text replaced
- [ ] At least 3 blog posts created
- [ ] Images optimized and loading correctly
- [ ] Spelling and grammar checked

### ✅ SEO Optimization

- [ ] Meta descriptions updated for all pages
- [ ] Title tags are unique and descriptive
- [ ] Keywords relevant to your niche
- [ ] Open Graph images set (1200x630px)
- [ ] Favicon updated
- [ ] robots.txt configured
- [ ] All links working (internal and external)
- [ ] Alt text added to all images
- [ ] Canonical URLs set correctly

### ✅ Technical Checks

- [ ] All console errors fixed
- [ ] No broken links
- [ ] All forms tested and working
- [ ] Email sending working
- [ ] Database connections secure
- [ ] Environment variables set correctly
- [ ] No hardcoded credentials in code
- [ ] .env files not committed to Git
- [ ] Build process completes without errors
- [ ] Mobile responsive on all pages

### ✅ Performance

- [ ] Images compressed (use TinyPNG or similar)
- [ ] Lazy loading enabled for images
- [ ] No unnecessary dependencies
- [ ] Build size optimized
- [ ] Page load time < 3 seconds
- [ ] Lighthouse score > 90

### ✅ Security

- [ ] Admin route not publicly linked
- [ ] Strong admin password set
- [ ] Backend environment variables secured
- [ ] CORS configured properly
- [ ] SQL injection prevention (using Supabase parameterized queries)
- [ ] Rate limiting considered for APIs
- [ ] HTTPS enabled (on deployment platform)

### ✅ Functionality Testing

- [ ] Home page loads correctly
- [ ] All navigation links work
- [ ] Contact form sends emails
- [ ] Email subscription works
- [ ] Blog posts display correctly
- [ ] Admin login works
- [ ] Can create/edit/delete blogs
- [ ] Can view messages
- [ ] Can view subscribers
- [ ] Logout works
- [ ] 404 pages handled gracefully

## Deployment Steps

### Frontend Deployment (Coolify)

1. **Build the project:**
\`\`\`bash
npm run build
\`\`\`

2. **Test the build locally:**
\`\`\`bash
npm run preview
\`\`\`

3. **Verify dist folder:**
   - [ ] Contains index.html
   - [ ] Assets folder present
   - [ ] All files generated correctly

4. **Upload to Coolify:**
   - [ ] Create new static site project
   - [ ] Upload dist folder contents
   - [ ] Configure domain
   - [ ] Set environment variables
   - [ ] Deploy

5. **Post-deployment checks:**
   - [ ] Website loads at your domain
   - [ ] All pages accessible
   - [ ] Images loading
   - [ ] Forms working
   - [ ] Mobile responsive

### Backend Deployment

#### Option 1: Railway

1. **Prepare backend:**
   - [ ] Add start script to package.json
   - [ ] Create .gitignore for node_modules
   - [ ] Test locally

2. **Deploy to Railway:**
   - [ ] Create new project
   - [ ] Deploy from GitHub or upload
   - [ ] Add environment variables
   - [ ] Get deployment URL

#### Option 2: Render

1. **Create new Web Service**
2. **Connect repository**
3. **Configure:**
   - Build Command: `npm install`
   - Start Command: `npm start`
4. **Add environment variables**
5. **Deploy**

### Environment Variables Configuration

#### Production Frontend (.env)
\`\`\`
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-production-anon-key
VITE_BACKEND_URL=https://your-backend.railway.app
\`\`\`

#### Production Backend (.env)
\`\`\`
PORT=5000
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-production-email@gmail.com
EMAIL_PASS=your-production-app-password
EMAIL_FROM=Daryl <your-production-email@gmail.com>
CONTACT_EMAIL=your-contact-email@gmail.com
\`\`\`

## Post-Deployment

### Update URLs

After deployment, update these in your code:

1. **index.html** (Line 20-35):
   - Replace `https://yourdomain.com` with your actual domain
   - Update Open Graph image URLs

2. **SEO.jsx** (Line 10-15):
   - Update default OG image URL
   - Update canonical URL base

3. **public/robots.txt**:
   - Update sitemap URL

### DNS Configuration

If using custom domain:

- [ ] A record pointing to your hosting IP
- [ ] CNAME for www subdomain
- [ ] SSL certificate installed
- [ ] DNS propagation complete (24-48 hours)

### Google Search Console

1. **Add Property:**
   - [ ] Verify domain ownership
   - [ ] Submit sitemap
   - [ ] Request indexing

2. **Monitor:**
   - [ ] Check for crawl errors
   - [ ] Monitor search performance
   - [ ] Review mobile usability

### Analytics Setup (Optional)

1. **Google Analytics:**
   - [ ] Create property
   - [ ] Add tracking code to index.html
   - [ ] Verify data collection

2. **Alternative:** Plausible, Fathom, or Cloudflare Analytics

## Testing Production Site

### Manual Testing

- [ ] Test on Chrome
- [ ] Test on Firefox
- [ ] Test on Safari
- [ ] Test on mobile (iOS)
- [ ] Test on mobile (Android)
- [ ] Test on tablet
- [ ] Test form submissions
- [ ] Test email notifications
- [ ] Test admin login
- [ ] Test blog creation

### Automated Testing

Use these tools:

- [ ] **Lighthouse**: Performance, SEO, Accessibility
- [ ] **PageSpeed Insights**: Speed analysis
- [ ] **GTmetrix**: Performance metrics
- [ ] **Mobile-Friendly Test**: Google's tool
- [ ] **SSL Test**: Check HTTPS configuration

### SEO Validation

- [ ] **Google Rich Results Test**: Check structured data
- [ ] **Meta Tags Checker**: Verify all meta tags
- [ ] **Open Graph Debugger**: Facebook sharing
- [ ] **Twitter Card Validator**: Twitter sharing

## Monitoring

### Daily Checks

- [ ] Website is up and running
- [ ] No error emails
- [ ] Forms working
- [ ] Contact emails arriving

### Weekly Checks

- [ ] Review analytics
- [ ] Check for broken links
- [ ] Monitor page speed
- [ ] Review admin dashboard
- [ ] Backup database

### Monthly Checks

- [ ] Update dependencies
- [ ] Review and respond to messages
- [ ] Publish new blog posts
- [ ] Check email subscriber list
- [ ] Review SEO performance

## Maintenance

### Regular Updates

\`\`\`bash
# Update dependencies (monthly)
npm update
cd backend && npm update

# Security audit
npm audit
npm audit fix
\`\`\`

### Backup Strategy

- [ ] Regular Supabase backups (automatic in paid plan)
- [ ] Export email subscribers monthly
- [ ] Keep local backup of blog posts
- [ ] Version control with Git

## Emergency Procedures

### Site Down

1. Check hosting platform status
2. Verify DNS records
3. Check server logs
4. Contact support if needed
5. Have static HTML backup ready

### Database Issues

1. Check Supabase dashboard
2. Review recent queries
3. Check row-level security policies
4. Restore from backup if needed

### Email Not Working

1. Verify email credentials
2. Check spam folder
3. Review backend logs
4. Test SMTP connection
5. Consider alternative email service

## Launch Announcement

Once everything is verified:

- [ ] Announce on LinkedIn
- [ ] Share on Twitter
- [ ] Post on Instagram
- [ ] Update resume with link
- [ ] Add to email signature
- [ ] Share in relevant communities
- [ ] Submit to directories

## Success Metrics

Track these KPIs:

- **Traffic**: Visitors per month
- **Engagement**: Time on site, pages per session
- **Conversions**: Contact form submissions
- **SEO**: Search rankings for key terms
- **Email**: Subscriber growth rate
- **Content**: Blog post views

## Final Checklist

- [ ] All tests passing
- [ ] Frontend deployed
- [ ] Backend deployed
- [ ] Environment variables set
- [ ] DNS configured
- [ ] SSL enabled
- [ ] Google Search Console setup
- [ ] Analytics tracking
- [ ] Performance optimized
- [ ] Mobile responsive
- [ ] Cross-browser tested
- [ ] Admin dashboard working
- [ ] Forms sending emails
- [ ] Backup strategy in place
- [ ] Monitoring configured
- [ ] Launch announcement ready

---

**Once all items are checked, you're ready to launch! 🚀**

Remember: Your website is never "finished" - keep improving, updating content, and optimizing based on analytics and feedback.

Good luck with your launch! 💪
