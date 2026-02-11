# Spyro Inc - Construction & Renovation Website

A modern, professional website for Spyro Inc Construction, a 25+ year old construction company specializing in basement renovations, flooring installation, and complete home renovations in the Greater Toronto Area.

## 🌟 Features

### Public Website
- **Home Page**: Eye-catching hero section with professional construction imagery, service highlights, and calls-to-action
- **About Page**: Company background, achievements, core values, and team information
- **Basements Page**: Detailed information about basement renovation services, features, and completed projects
- **Flooring Page**: Comprehensive flooring materials overview, services, and customer testimonials
- **Contact Page**: Functional contact form with integrated email/phone information and business hours
- **Responsive Navigation**: Fixed sticky navigation bar with mobile-friendly hamburger menu
- **Professional Footer**: Black footer with red accents, contact information, and quick links

### Admin Dashboard
- **Admin Login**: Secure login page with demo credentials (admin@spyroinc.com / admin123)
- **Dashboard Home**: Overview of key metrics, recent projects, and contact messages
- **Project Management**: View, edit, and delete construction projects
- **Message Management**: Manage customer contact form submissions with status tracking
- **Service Management**: Create, edit, and manage service offerings
- **Settings Page**: Update company information, contact details, and business information

## 🎨 Design Highlights

### Color Scheme
- **Primary Red**: `#EF4444` - Main brand color for CTAs and accents
- **Black Background**: `#0F0F0F` - Professional dark theme
- **White Text**: `#F8F8F8` - High contrast for readability
- **Dark Gray Cards**: `#262626` - Container backgrounds with red borders

### Animations
- **Fade In Up**: Smooth entrance animations for content sections
- **Slide In Right**: Side-to-side reveal animations
- **Pulse Glow**: Pulsing red glow effect on CTAs to draw attention
- **Hover Effects**: Scale and opacity transitions on interactive elements

### Typography
- **Headings**: Poppins (bold, professional)
- **Body Text**: Inter (clean, readable)
- **Font Sizes**: Optimized for mobile and desktop viewing

## 📁 Project Structure

```
app/
├── layout.tsx                 # Root layout with metadata
├── globals.css               # Global styles and custom animations
├── page.tsx                  # Home page
├── about/
│   └── page.tsx             # About page
├── basements/
│   └── page.tsx             # Basements services page
├── flooring/
│   └── page.tsx             # Flooring services page
├── contact/
│   └── page.tsx             # Contact form page
├── admin/
│   ├── login/
│   │   └── page.tsx         # Admin login
│   ├── page.tsx             # Admin dashboard
│   ├── projects/
│   │   └── page.tsx         # Project management
│   ├── messages/
│   │   └── page.tsx         # Message management
│   ├── services/
│   │   └── page.tsx         # Service management
│   └── settings/
│       └── page.tsx         # Settings page
│
components/
├── navigation.tsx            # Header navigation
└── footer.tsx               # Footer component

public/
└── images/
    ├── hero-construction.jpg
    ├── basement-renovation.jpg
    ├── flooring-service.jpg
    └── renovation-showcase.jpg
```

## 🚀 Getting Started

### Installation

1. **Clone or download the project**
2. **Install dependencies**:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open in browser**:
   Navigate to `http://localhost:3000`

### Admin Access

1. Go to `http://localhost:3000/admin/login`
2. Use demo credentials:
   - Email: `admin@spyroinc.com`
   - Password: `admin123`

## 📞 Contact Information

- **Phone**: 289-231-0597
- **Email**: spyro.reno@gmail.com
- **Service Area**: Greater Toronto Area
- **Hours**: Monday-Saturday 8:00 AM - 6:00 PM, Sunday by appointment

## 🏗️ Services Offered

1. **Basement Renovations**
   - Complete waterproofing
   - Custom framing and insulation
   - Electrical and HVAC integration
   - Recreation rooms and home offices

2. **Flooring Installation**
   - Hardwood flooring
   - Luxury vinyl flooring (LVP)
   - Tile installation
   - Laminate flooring

3. **General Renovations**
   - Kitchen renovations
   - Bathroom renovations
   - Whole-home updates

## 🔧 Technology Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS with custom animations
- **Components**: Shadcn/UI
- **Icons**: Lucide React
- **Images**: Optimized with Next.js Image component
- **Forms**: HTML5 with React hooks for state management

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Mobile devices (320px - 768px)
- Tablets (768px - 1024px)
- Desktops (1024px and up)

All pages use CSS Grid and Flexbox for responsive layouts with appropriate breakpoints.

## ✨ Key Animations

- Page load animations on all sections
- Staggered animations for card lists
- Hover effects on service cards and navigation items
- Pulsing glow effect on call-to-action buttons
- Smooth transitions on form inputs

## 🎯 Tagline

**"Excellence in Every Project"** - A powerful statement reflecting the company's commitment to quality and professional craftsmanship.

## 📄 Additional Pages Generated

### Public Pages
- ✅ Home page with hero section
- ✅ About page with company history
- ✅ Basements page with detailed services
- ✅ Flooring page with material options
- ✅ Contact page with form and info

### Admin Pages
- ✅ Login page
- ✅ Dashboard with metrics
- ✅ Projects management
- ✅ Messages management
- ✅ Services management
- ✅ Settings page

## 🔒 Security Notes

For production deployment:
- Implement proper authentication (not demo credentials)
- Add backend API for form submissions
- Store sensitive data securely
- Implement CORS policies
- Use HTTPS only

## 🚀 Deployment

Deploy to Vercel:
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Set environment variables if needed
4. Deploy with automatic builds

## 📝 Customization

To customize the website:
1. Update company info in `/app/admin/settings/page.tsx`
2. Modify images in `/public/images/`
3. Update contact info in components and footer
4. Edit business hours and service details
5. Adjust color scheme in `globals.css` and `tailwind.config.ts`

## 🎓 Features Explained

### Hero Section
- Full-screen hero with background image
- Animated heading with colored accent
- Primary and secondary CTA buttons
- Mobile-responsive layout

### Service Cards
- Image overlays with hover zoom effect
- Service descriptions and links
- Call-to-action indicators
- Responsive grid layout

### Admin Dashboard
- Authentication with localStorage (demo only)
- Data display in tables and cards
- CRUD operations for projects and services
- Message status tracking

---

**Built with ❤️ for Spyro Inc Construction**

For questions or support, contact: spyro.reno@gmail.com or 289-231-0597
