# Deploy Instructions untuk GitHub

## Prerequisites
- Git installed (https://git-scm.com/download/win)
- GitHub account (https://github.com)

## Steps

### 1. Setup Git (local)
Buka PowerShell atau Command Prompt dan jalankan:

```powershell
cd c:\Users\asus\projects\ixiera

# Initialize git repository
git init

# Configure git (ganti dengan akun GitHub kamu)
git config user.name "solfixjfa"
git config user.email "jeffry4job@gmail.com"

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Ixiera.id Platform"
```

### 2. Create Repository di GitHub
1. Buka https://github.com/new
2. Repository name: **solvixjfa**
3. Description: "Ixiera.id - Hybrid Agency Platform"
4. Pilih: Public (untuk deployment yang mudah)
5. JANGAN inisialisasi dengan README, .gitignore, or license
6. Click "Create repository"

### 3. Connect Remote & Push
Di PowerShell/Command Prompt, jalankan:

```powershell
cd c:\Users\asus\projects\ixiera

# Add remote repository (ganti USERNAME dengan username GitHub kamu)
git remote add origin https://github.com/USERNAME/solvixjfa.git

# Rename branch ke main (opsional)
git branch -M main

# Push ke GitHub
git push -u origin main
```

### 4. Verifikasi
Kunjungi: https://github.com/solfixjfa/ixiera
Semua files harus sudah terupload

## GitHub Pages / Deployment (Optional)

### Deploy ke Vercel (Recommended untuk Next.js)
1. Buka https://vercel.com
2. Click "New Project"
3. Import GitHub repository: solvixjfa
4. Configure:
   - Framework: Next.js
   - Root Directory: ./
5. Environment Variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
   NEXT_PUBLIC_BASE_URL=
   ```
6. Click "Deploy"

### Deploy ke GitHub Pages
Tambahkan di `next.config.ts`:
```typescript
const nextConfig = {
  output: 'export',
  basePath: '/solvixjfa',
};
```

Kemudian buat GitHub Actions workflow untuk auto-deploy.

## Branch Strategy

```bash
# Main branch untuk production
git checkout -b main

# Development branch untuk testing
git checkout -b develop

# Feature branches
git checkout -b feature/feature-name
```

## Useful Git Commands

```bash
# Check status
git status

# View commits
git log

# Create new branch
git checkout -b branch-name

# Push branch
git push -u origin branch-name

# Pull latest changes
git pull origin main

# Merge branch
git merge branch-name
```

## Troubleshooting

### Fatal: Not a valid object name (jika error saat push)
```bash
git pull origin main --allow-unrelated-histories
git push origin main
```

### Authentication failed
Gunakan GitHub Personal Access Token:
1. Buka https://github.com/settings/tokens
2. Generate new token
3. Copy token
4. Saat prompt password, paste token tersebut

## Security Notes

⚠️ **IMPORTANT: Jangan commit secrets!**
- `.env.local` sudah di `.gitignore`
- Supabase keys: Gunakan Environment Variables di hosting platform
- Jangan share personal access tokens

---

## Summary

Project sudah ready untuk deploy! Structure:
- ✅ Marketing Pages (/, /products, /solutions, /blog, /contact)
- ✅ Auth System (Login, Sign up)
- ✅ Protected Routes (/dashboard, /admin/products)
- ✅ Admin Panel (Products Management)
- ✅ API Routes (/api/products)
- ✅ Dark Mode Support
- ✅ Responsive Design
- ✅ Supabase Integration

Happy deploying! 🚀
