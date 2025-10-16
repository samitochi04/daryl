# Daryl Website - Quick Start Commands

## First Time Setup

### 1. Install Dependencies
npm install
cd backend && npm install && cd ..

### 2. Create Environment Files
Copy-Item .env.example .env
Copy-Item backend\.env.example backend\.env

### 3. Edit Environment Files
# Edit .env with your Supabase credentials
# Edit backend\.env with your email settings

### 4. Start Development Servers

# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend (open new terminal)
cd backend && npm run dev

## Quick Commands Reference

# Generate password hash for admin
curl.exe -X POST http://localhost:5000/api/hash-password -H "Content-Type: application/json" -d "{\"password\":\"YourPassword123!\"}"

# Build for production
npm run build

# Preview production build
npm run preview

# Install new dependency
npm install package-name

# Clean install (if errors)
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install

## URLs

- Website: http://localhost:3000
- Admin: http://localhost:3000/admin/login
- Backend: http://localhost:5000
- Backend Health: http://localhost:5000/api/health

## Git Commands (Optional)

git init
git add .
git commit -m "Initial commit - Daryl website"
git branch -M main
git remote add origin https://github.com/yourusername/daryl.git
git push -u origin main
