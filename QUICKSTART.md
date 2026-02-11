# Spyro Inc Website - Quick Start Guide

## 🚀 Get Running in 2 Minutes

### Step 1: Install Dependencies
```bash
npm install
# or
pnpm install
```

### Step 2: Start Development Server
```bash
npm run dev
# or
pnpm dev
```

### Step 3: Open in Browser
Navigate to: **http://localhost:3000**

✅ **You're live!**

---

## 🌐 Website URLs

### Public Pages
- **Home**: http://localhost:3000/
- **About**: http://localhost:3000/about
- **Basements**: http://localhost:3000/basements
- **Flooring**: http://localhost:3000/flooring
- **Contact**: http://localhost:3000/contact

### Admin Panel
- **Login**: http://localhost:3000/admin/login
- **Dashboard**: http://localhost:3000/admin
- **Projects**: http://localhost:3000/admin/projects
- **Messages**: http://localhost:3000/admin/messages
- **Services**: http://localhost:3000/admin/services
- **Settings**: http://localhost:3000/admin/settings

---

## 🔐 Admin Login

**Demo Credentials:**
- Email: `admin@spyroinc.com`
- Password: `admin123`

⚠️ *Change these credentials before going to production!*

---

## 📁 Project Structure at a Glance

```
app/
├── page.tsx              ← Home page
├── about/                ← About page
├── basements/            ← Basements services
├── flooring/             ← Flooring services
├── contact/              ← Contact form
├── admin/                ← Admin dashboard
└── layout.tsx            ← Main layout

components/
├── navigation.tsx        ← Header/nav bar
└── footer.tsx           ← Footer

public/images/           ← All images
```

---

## ✏️ Quick Edits

### Change Contact Information
Edit in multiple places:
1. `/app/contact/page.tsx` - Contact page
2. `/components/footer.tsx` - Footer
3. `/app/admin/settings/page.tsx` - Admin settings

**Values to update:**
- Phone: `289-231-0597`
- Email: `spyro.reno@gmail.com`
- Address: `Serving Greater Toronto Area`
- Hours: `Monday-Saturday 8AM-6PM, Sunday by appointment`

### Update Company Colors
Edit `/app/globals.css`:
```css
:root {
  --primary: 0 84% 48%;      /* Red */
  --background: 0 0% 8%;     /* Black */
  --foreground: 0 0% 98%;    /* White */
}
```

### Add/Edit Pages
1. Create new folder in `/app/` (e.g., `/app/gallery/`)
2. Add `page.tsx` file
3. Import Navigation and Footer components
4. Add your content

---

## 🎨 Design System

### Colors
- **Red (Primary)**: `#EF4444` - Main brand color
- **Black (Background)**: `#0F0F0F` - Dark theme
- **White (Text)**: `#F8F8F8` - Main text
- **Dark Gray (Cards)**: `#262626` - Container backgrounds

### Typography
- **Headings**: Poppins font, bold
- **Body**: Inter font, regular

### Spacing (Tailwind)
- Use `p-4` (padding), `gap-4` (gaps), `mb-4` (margins)
- Reference: https://tailwindcss.com/docs/padding

### Animations
- `animate-fade-in-up` - Fade in from bottom
- `animate-slide-in-right` - Slide in from left
- `animate-pulse-glow` - Red pulsing glow

---

## 📱 Testing Responsive Design

### In Chrome DevTools
1. Press `F12` to open DevTools
2. Press `Ctrl+Shift+M` (or `Cmd+Shift+M` on Mac)
3. Select device (iPhone, iPad, etc.)
4. Test all pages on mobile

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

---

## 🔧 Common Tasks

### Add a New Service
1. Go to `/admin/services`
2. Scroll to "Add New Service"
3. Fill in title, description, price
4. Click "Add Service"

### Respond to Customer Message
1. Go to `/admin/messages`
2. Find the message
3. Click email link to respond
4. Mark as "Replied"

### Update Site Info
1. Go to `/admin/settings`
2. Update company information
3. Click "Save Settings"

### Change Hero Image
1. Replace `/public/images/hero-construction.jpg`
2. Image must be same aspect ratio
3. Optimize before uploading

---

## 🚢 Building for Production

```bash
# Create optimized production build
npm run build

# Test production build locally
npm start
```

Then deploy to Vercel, Netlify, or your hosting provider.

---

## 📚 Documentation Files

- **README.md** - Full project documentation
- **ADMIN_GUIDE.md** - Admin panel user guide
- **DEPLOYMENT.md** - Deployment instructions
- **QUICKSTART.md** - This file

---

## 🐛 Debugging Tips

### Check Console for Errors
1. Open browser DevTools (`F12`)
2. Go to "Console" tab
3. Look for red error messages

### Check Network Errors
1. Go to "Network" tab in DevTools
2. Reload page
3. Look for red X (failed requests)

### Common Issues
- **Images not loading**: Check file path starts with `/`
- **Styles not applying**: Check Tailwind classes are spelled correctly
- **Links broken**: Verify file structure matches URL path

---

## 🎯 Next Steps

1. **Customize Colors**: Edit `/app/globals.css`
2. **Add Your Logo**: Replace company name with logo image
3. **Update Photos**: Replace placeholder images
4. **Edit Content**: Update all company information
5. **Deploy**: Push to GitHub and deploy to Vercel

---

## 💡 Pro Tips

✅ Use `Ctrl+Shift+F` (or `Cmd+Shift+F` on Mac) to search entire project
✅ Preview changes in real-time as you edit
✅ Test all links before deploying
✅ Use mobile-first approach (check mobile view first)
✅ Keep animations subtle and professional

---

## 🆘 Need Help?

### Check Documentation
- Next.js: https://nextjs.org/docs
- Tailwind: https://tailwindcss.com
- React: https://react.dev

### Contact Spyro Inc
- Phone: 289-231-0597
- Email: spyro.reno@gmail.com

---

## ✨ Features Included

✅ Professional red & black theme
✅ Fully responsive design
✅ Smooth animations
✅ Contact form
✅ Admin dashboard
✅ Project management
✅ Multiple service pages
✅ Hero section with images
✅ Mobile navigation
✅ SEO optimized

---

## 🎓 Learning Resources

**Getting comfortable with this stack?**
- Tailwind CSS: https://tailwindcss.com/docs
- Next.js: https://nextjs.org/learn
- React Hooks: https://react.dev/reference/react/hooks
- TypeScript: https://typescriptlang.org/docs

---

**Ready to go? Start with `npm run dev` and explore! 🚀**
