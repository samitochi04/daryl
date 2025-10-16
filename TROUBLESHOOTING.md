# 🔧 Troubleshooting Guide for Daryl

Common issues and their solutions.

## Installation Issues

### Problem: `npm install` fails

**Solution 1: Clear cache and reinstall**
\`\`\`powershell
Remove-Item -Recurse -Force node_modules, package-lock.json
npm cache clean --force
npm install
\`\`\`

**Solution 2: Check Node version**
\`\`\`powershell
node --version  # Should be v16 or higher
npm --version   # Should be v8 or higher
\`\`\`

**Solution 3: Try yarn instead**
\`\`\`powershell
npm install -g yarn
yarn install
\`\`\`

### Problem: "EACCES: permission denied"

**Windows Solution:**
\`\`\`powershell
# Run PowerShell as Administrator
npm config set prefix "C:\\Users\\YourUsername\\AppData\\Roaming\\npm"
\`\`\`

## Development Server Issues

### Problem: Port 3000 already in use

**Find and kill process:**
\`\`\`powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F
\`\`\`

**Or use different port:**
\`\`\`powershell
# In package.json, modify dev script:
"dev": "vite --port 3001"
\`\`\`

### Problem: Port 5000 already in use (Backend)

\`\`\`powershell
# Find and kill
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change port in backend/.env
PORT=5001
\`\`\`

### Problem: "Cannot find module"

**Solution:**
\`\`\`powershell
# Install missing dependencies
npm install

# If specific module missing:
npm install <module-name>
\`\`\`

### Problem: Hot reload not working

**Solution:**
1. Check if WSL2 is interfering (Windows users)
2. Try:
\`\`\`powershell
npm run dev -- --host
\`\`\`

## Supabase Issues

### Problem: "Invalid API key"

**Check:**
1. Copy correct anon key from Supabase dashboard
2. Ensure no extra spaces in .env file
3. Restart dev server after changing .env
4. Verify VITE_ prefix is present

**Verify:**
\`\`\`javascript
// In browser console:
console.log(import.meta.env.VITE_SUPABASE_URL)
console.log(import.meta.env.VITE_SUPABASE_ANON_KEY)
\`\`\`

### Problem: "Failed to fetch" from Supabase

**Solutions:**
1. Check Supabase project is active
2. Verify database tables exist
3. Check Row Level Security policies
4. Ensure internet connection

**Test connection:**
\`\`\`javascript
// In browser console
const { data, error } = await supabase.from('blogs').select('*')
console.log(data, error)
\`\`\`

### Problem: Row Level Security blocking queries

**Quick fix for development:**
\`\`\`sql
-- Temporarily disable RLS on a table (for testing only!)
ALTER TABLE blogs DISABLE ROW LEVEL SECURITY;
\`\`\`

**Proper solution:**
Review and update policies in Supabase > Authentication > Policies

### Problem: "Unique constraint violation"

**This means:**
- Trying to insert duplicate data (e.g., same email twice)

**Solutions:**
1. Check if record already exists
2. Use UPSERT instead of INSERT
3. Handle error in code:

\`\`\`javascript
try {
  await supabase.from('table').insert([data])
} catch (error) {
  if (error.code === '23505') {
    // Handle duplicate
  }
}
\`\`\`

## Email Issues

### Problem: Emails not sending

**Gmail users - most common issue:**

1. **Enable 2-Factor Authentication:**
   - Go to Google Account Security
   - Turn on 2-Step Verification

2. **Generate App Password:**
   - Visit: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer"
   - Copy the 16-character password
   - Use this in backend/.env EMAIL_PASS

3. **Check less secure apps** (old Gmail accounts):
   - Visit: https://myaccount.google.com/lesssecureapps
   - Turn ON (not recommended, use App Password instead)

**Test email configuration:**
\`\`\`javascript
// In backend/server.js, add this test endpoint:
app.get('/api/test-email', async (req, res) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_USER,
      subject: 'Test Email',
      text: 'If you receive this, email is working!'
    })
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
\`\`\`

Visit: http://localhost:5000/api/test-email

### Problem: Emails going to spam

**Solutions:**
1. Add SPF record to your domain
2. Set up DKIM
3. Use professional email service (SendGrid, Mailgun)
4. Avoid spam trigger words in subject
5. Include unsubscribe link

### Problem: "Invalid login" error from SMTP

**Check:**
- EMAIL_USER is complete email address
- EMAIL_PASS is correct (App Password if Gmail)
- No extra spaces in .env
- Correct SMTP host and port
- Internet connection

## Admin Login Issues

### Problem: Can't login to admin

**Solution 1: Verify admin exists**
\`\`\`sql
-- In Supabase SQL Editor
SELECT * FROM admins;
\`\`\`

If empty, run `supabase/add_admin.sql`

**Solution 2: Password incorrect**
1. Generate new hash:
\`\`\`powershell
curl.exe -X POST http://localhost:5000/api/hash-password -H "Content-Type: application/json" -d "{\"password\":\"NewPassword123!\"}"
\`\`\`

2. Update in Supabase:
\`\`\`sql
UPDATE admins 
SET password_hash = 'new-hash-here' 
WHERE email = 'your-email@example.com';
\`\`\`

**Solution 3: Backend not running**
- Ensure backend server is running on port 5000
- Check VITE_BACKEND_URL in frontend .env

**Solution 4: CORS error**
- Backend should have CORS enabled (check server.js line 12)
- Verify backend URL is correct

### Problem: Logged out unexpectedly

**Reason:** Session stored in localStorage only

**Solutions:**
1. Clear browser cache
2. Check browser console for errors
3. Ensure localStorage is enabled
4. Try incognito mode to test

## Frontend Build Issues

### Problem: `npm run build` fails

**Common causes:**

1. **Syntax errors:**
   - Check console for specific file/line
   - Fix the error and rebuild

2. **Import errors:**
   - Ensure all imports are correct
   - Check file paths (case-sensitive on Linux)

3. **Environment variables:**
   - Ensure all VITE_ variables are set
   - No undefined environment variables in code

4. **Memory issues:**
\`\`\`powershell
# Increase Node memory
$env:NODE_OPTIONS="--max-old-space-size=4096"
npm run build
\`\`\`

### Problem: Build succeeds but site doesn't work

**Check:**
1. Open browser console for errors
2. Verify API endpoints are correct
3. Check network tab for failed requests
4. Ensure environment variables are set in production

### Problem: Images not loading in production

**Solutions:**
1. Use absolute URLs for images
2. Check image paths are correct
3. Ensure images are in public folder or accessible URL
4. Verify CORS if images from external source

## Database Issues

### Problem: Can't create blog posts

**Check:**
1. Logged in as admin
2. All required fields filled
3. Unique slug (no duplicates)
4. Check browser console for errors
5. Verify Supabase connection

**Debug:**
\`\`\`javascript
// Check what's being sent
console.log('Blog data:', blogData)
\`\`\`

### Problem: Blogs not showing on frontend

**Check:**
1. Blogs are published (published = true)
2. Database query is correct
3. No RLS blocking read
4. Check browser console

**Quick test:**
\`\`\`sql
-- In Supabase
SELECT * FROM blogs WHERE published = true;
\`\`\`

### Problem: Contact messages not saving

**Check:**
1. contact_messages table exists
2. RLS policy allows INSERT
3. All required fields sent
4. Check browser network tab

**Test policy:**
\`\`\`sql
-- Allow anyone to insert (for testing)
CREATE POLICY "Anyone can send messages" ON contact_messages
  FOR INSERT WITH CHECK (true);
\`\`\`

## Performance Issues

### Problem: Slow page load

**Solutions:**
1. Optimize images (compress, use WebP)
2. Lazy load images:
\`\`\`javascript
<img loading="lazy" src="..." />
\`\`\`

3. Check network tab for slow requests
4. Minimize dependencies
5. Enable caching

### Problem: Large bundle size

**Check bundle size:**
\`\`\`powershell
npm run build
# Check dist folder size
\`\`\`

**Reduce size:**
1. Remove unused dependencies
2. Code splitting (already configured)
3. Tree shaking (automatic with Vite)
4. Minimize custom code

## Browser Issues

### Problem: Works in Chrome but not Firefox/Safari

**Common issues:**
1. CSS not supported (check caniuse.com)
2. JavaScript features need polyfill
3. CORS headers different

**Debug:**
1. Open browser console
2. Check for specific errors
3. Test in browser dev tools
4. Adjust code for compatibility

### Problem: Mobile layout broken

**Solutions:**
1. Use responsive Tailwind classes
2. Test with Chrome DevTools mobile view
3. Check viewport meta tag in index.html
4. Use mobile-first approach

## Production Issues

### Problem: Site works locally but not in production

**Check:**
1. Environment variables set in hosting platform
2. Correct API URLs (not localhost)
3. CORS configured for production domain
4. SSL/HTTPS enabled
5. Check hosting platform logs

### Problem: API calls failing in production

**Solutions:**
1. Update VITE_BACKEND_URL to production backend URL
2. Ensure backend is deployed and running
3. Check CORS allows your domain
4. Verify API endpoints are correct

### Problem: 404 on refresh (React Router)

**Solution:** Configure hosting for SPA

**Netlify:** Add `_redirects` file:
\`\`\`
/* /index.html 200
\`\`\`

**Vercel:** Automatic

**Apache:** Add `.htaccess`:
\`\`\`
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
\`\`\`

## Still Having Issues?

### Debug Checklist

- [ ] Check browser console
- [ ] Check network tab
- [ ] Check server/backend logs
- [ ] Verify environment variables
- [ ] Test in incognito mode
- [ ] Try different browser
- [ ] Check Supabase logs
- [ ] Review recent code changes
- [ ] Test with simplified code
- [ ] Read error messages carefully

### Getting Help

1. **Check documentation:**
   - Supabase docs
   - Vite docs
   - React Router docs
   - Tailwind CSS docs

2. **Search for error:**
   - Google the exact error message
   - Check Stack Overflow
   - Search GitHub issues

3. **Debug systematically:**
   - Isolate the problem
   - Test one thing at a time
   - Use console.log liberally
   - Comment out code sections

4. **Start fresh:**
   - Clone repo again
   - Fresh npm install
   - New Supabase project
   - Compare with working version

## Prevention Tips

1. **Commit working code:**
\`\`\`bash
git add .
git commit -m "Working version before changes"
\`\`\`

2. **Test before deploying:**
   - Always test locally first
   - Use staging environment
   - Check all features work

3. **Keep backups:**
   - Export database regularly
   - Keep local code copies
   - Use version control

4. **Monitor logs:**
   - Check console regularly
   - Review error messages
   - Monitor performance

---

**Remember:** Most issues have simple solutions. Take your time, read error messages carefully, and debug systematically! 🔍
