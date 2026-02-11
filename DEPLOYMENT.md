# Spyro Inc Website - Deployment Guide

## 🚀 Quick Start Deployment

### Option 1: Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy a Next.js application:

#### Step 1: Push to GitHub
```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial Spyro Inc website commit"

# Create a new GitHub repository
# Then push your code:
git branch -M main
git remote add origin https://github.com/yourusername/spyro-inc.git
git push -u origin main
```

#### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub account
3. Click "Add New" → "Project"
4. Select your "spyro-inc" repository
5. Vercel will auto-detect Next.js configuration
6. Click "Deploy"

That's it! Your site is live.

---

### Option 2: Deploy to Other Platforms

#### Netlify
1. Connect your GitHub repository
2. Build command: `npm run build` or `pnpm build`
3. Publish directory: `.next`
4. Deploy

#### AWS Amplify
1. Connect GitHub repository
2. Select "Next.js" framework
3. Configure build settings
4. Deploy

#### Docker Deployment
Create a `Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
```

Deploy Docker image to your hosting provider.

---

## 📋 Pre-Deployment Checklist

- [ ] All images are optimized and in `/public/images/`
- [ ] Contact form has backend endpoint configured
- [ ] Admin credentials are changed from demo credentials
- [ ] Metadata and SEO tags are accurate
- [ ] Phone number and email are updated
- [ ] Business hours are correct
- [ ] Service descriptions are accurate
- [ ] Environment variables are configured
- [ ] Site has been tested on mobile and desktop
- [ ] All links work correctly

---

## 🔧 Environment Variables

Create a `.env.local` file (for local development) with:

```
# Email Service (Optional - for form submissions)
NEXT_PUBLIC_API_URL=https://api.spyroinc.com
ADMIN_EMAIL=admin@spyroinc.com

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

**Important**: Do not commit `.env.local` to GitHub. Add it to `.gitignore`.

---

## 📧 Contact Form Integration

### Current Setup
The contact form is a client-side form that logs data to the browser console.

### Production Setup
To actually process form submissions:

#### Option 1: Email Service (Sendgrid, Mailgun)
```javascript
// In /app/contact/page.tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  const response = await fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })
  
  // Handle response
}
```

#### Option 2: Database Storage
Store messages in a database (Supabase, MongoDB, PostgreSQL).

#### Option 3: Third-party Service
Use Formspree, Basin, or similar service.

---

## 🔒 Security Considerations

### Current Development Issues
- ⚠️ Admin credentials are hardcoded (demo only)
- ⚠️ No backend authentication
- ⚠️ No database

### For Production, Implement:

1. **Authentication**
   ```javascript
   // Use NextAuth.js or Auth0
   import { getServerSession } from "next-auth/next"
   ```

2. **Database**
   - Use Supabase, Firebase, or PostgreSQL
   - Store admin users securely
   - Hash passwords with bcrypt

3. **Environment Variables**
   - Store API keys securely
   - Use Vercel's environment variable system
   - Never commit secrets to GitHub

4. **HTTPS**
   - Ensure site uses HTTPS (automatic on Vercel)
   - Set security headers

5. **CORS**
   - Configure CORS policies
   - Validate all API requests

6. **Rate Limiting**
   - Add rate limiting to contact form
   - Prevent spam submissions

---

## 🎯 Post-Deployment

### 1. Test Your Site
- [ ] Visit home page
- [ ] Test all navigation links
- [ ] Try contact form
- [ ] Test on mobile (use Chrome DevTools)
- [ ] Check admin login works

### 2. Monitor Performance
- Use Vercel Analytics
- Monitor Core Web Vitals
- Check page load times

### 3. Setup Analytics
Add Google Analytics:
```bash
npm install @next/third-parties
```

Update `layout.tsx`:
```jsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
      <GoogleAnalytics gaId="G-XXXXXXXXXX" />
    </html>
  )
}
```

### 4. Setup Domain
1. Purchase domain (GoDaddy, Namecheap, etc.)
2. Point nameservers to Vercel
3. Verify domain in Vercel dashboard

---

## 🔄 Continuous Deployment

### With GitHub + Vercel
1. Push code to GitHub main branch
2. Vercel automatically builds and deploys
3. Production site updates in minutes
4. No manual deployment needed

### Staging Environment
1. Create a staging branch
2. Link to separate Vercel project
3. Test changes before merging to main

---

## 📊 Analytics Setup

### Google Search Console
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your domain
3. Verify ownership
4. Monitor search performance

### Google Analytics
1. Create GA4 property
2. Add measurement ID to `.env.local`
3. Track user behavior

---

## 🐛 Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Images Not Loading
- Check image paths are absolute (`/images/...`)
- Verify images exist in `/public/images/`
- Check image optimization in `next.config.mjs`

### Navigation Not Working
- Check routes exist in `/app/`
- Verify file structure matches URL paths
- Test links in console

### Admin Panel Issues
- Check localStorage is enabled
- Verify login credentials
- Check browser console for errors

---

## 📈 Performance Optimization

### Already Implemented
- ✅ Image optimization with Next.js Image component
- ✅ Code splitting
- ✅ CSS optimization with Tailwind
- ✅ Lazy loading components
- ✅ Mobile-first responsive design

### Additional Improvements
- Add service worker for offline support
- Implement caching strategies
- Compress assets
- Minify JavaScript
- Use CDN for static assets

---

## 🚀 Production Checklist

- [ ] Update company info in settings
- [ ] Test contact form
- [ ] Setup email notifications
- [ ] Configure analytics
- [ ] Setup error monitoring (Sentry)
- [ ] Enable HTTPS
- [ ] Setup backups
- [ ] Configure monitoring
- [ ] Document deployment process
- [ ] Train team on admin panel

---

## 📞 Support & Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Docs**: https://vercel.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **React**: https://react.dev

---

## 🎓 Environment-Specific Configs

### Development
```bash
npm run dev
# Runs on http://localhost:3000
```

### Production
```bash
npm run build
npm start
# Optimized build, ready for deployment
```

---

## 📝 Deployment Log Template

Keep track of deployments:
```
Date: ___________
Version: ________
Changes: ________
Deployed to: ____
Status: SUCCESS/FAILED
Notes: __________
```

---

## 💬 Next Steps

1. **Test thoroughly** - Don't skip testing
2. **Monitor closely** - Watch for errors initially
3. **Get feedback** - Show clients the live site
4. **Iterate** - Make improvements based on feedback
5. **Maintain** - Keep dependencies updated

---

**Ready to deploy? You've got this! 🎉**

Questions? Contact: spyro.reno@gmail.com or 289-231-0597
