# Spyro Inc Admin Dashboard - User Guide

## 🔐 Login

**URL**: `/admin/login`

### Demo Credentials
- **Email**: `admin@spyroinc.com`
- **Password**: `admin123`

> ⚠️ **Important**: For production use, implement proper authentication with secure password hashing and session management.

---

## 📊 Dashboard Overview

After login, you'll see the main dashboard with:
- **Stats Cards**: Total Projects, Satisfied Clients, New Messages, Revenue
- **Quick Actions**: Links to Manage Projects, Services, and Settings
- **Recent Messages**: Table showing latest contact form submissions

---

## 📁 Admin Pages

### 1. Dashboard (`/admin`)
**Purpose**: Overview of business metrics and recent activity

**Features**:
- High-level statistics
- Quick access to all admin functions
- Recent contact messages preview
- View all messages button

**What You Can Do**:
- View key business metrics
- See new contact submissions
- Navigate to other admin sections
- Logout button in top-right

---

### 2. Project Management (`/admin/projects`)
**Purpose**: Manage all construction projects

**Features**:
- Table view of all projects
- Project status tracking (completed, in-progress, scheduled)
- Client information
- Project dates

**What You Can Do**:
- Add new projects (click "Add Project" button)
- Edit project details
- Delete completed projects
- Filter by status
- View project timeline

---

### 3. Message Management (`/admin/messages`)
**Purpose**: Handle customer contact form submissions

**Features**:
- Full message display with contact details
- Status tracking (new, read, replied)
- Customer contact information
- Message content

**What You Can Do**:
- View complete customer inquiries
- Mark messages as read
- Mark as replied when you've contacted customer
- Delete messages
- Click email/phone to contact customer directly

**Message Status**:
- 🔴 **New**: Unread message
- 🔵 **Read**: Viewed but not yet responded
- 🟢 **Replied**: Customer has been contacted

---

### 4. Service Management (`/admin/services`)
**Purpose**: Manage service offerings and pricing

**Features**:
- Service cards with descriptions
- Pricing information
- Service details display
- Add new services form

**What You Can Do**:
- View all current services
- Add new services (fill form at bottom)
- Edit service descriptions
- Update pricing
- Delete discontinued services

**Service Fields**:
- Service Title (e.g., "Basement Renovation")
- Description (details about the service)
- Price/Quote (e.g., "From $15,000" or "Custom Quote")

---

### 5. Settings (`/admin/settings`)
**Purpose**: Update company information

**Features**:
- Company name and details
- Contact information
- Service area
- Business description
- Tagline/motto
- Business hours display

**What You Can Do**:
- Update company name
- Change phone number
- Modify email address
- Update service area
- Edit company tagline
- Update about text
- View current business hours

**Important Fields**:
- **Company Name**: How you're listed publicly
- **Phone**: Primary contact number (289-231-0597)
- **Email**: Main contact email (spyro.reno@gmail.com)
- **Service Area**: Geographic coverage (Greater Toronto Area)
- **Tagline**: Main company message (Excellence in Every Project)

---

## 📝 Common Tasks

### Adding a New Project
1. Go to `/admin/projects`
2. Click "Add Project" button
3. Fill in project details:
   - Project name
   - Service type
   - Client name
   - Status
   - Project date
4. Submit

### Responding to Customer Inquiry
1. Go to `/admin/messages`
2. Find the customer message
3. Review their contact details and inquiry
4. Click email link to send response
5. Mark message as "Replied"

### Updating Service Pricing
1. Go to `/admin/services`
2. Click "Edit" on the service
3. Update price/quote field
4. Save changes

### Adding a New Service
1. Go to `/admin/services`
2. Scroll to "Add New Service" form
3. Enter service title
4. Write description
5. Set price/quote
6. Click "Add Service"

### Updating Contact Info
1. Go to `/admin/settings`
2. Update phone number if needed
3. Update email address if needed
4. Update service area if expanded
5. Click "Save Settings"

---

## 📱 Mobile & Responsive

All admin pages are fully responsive:
- Dashboard works on mobile
- Tables have horizontal scroll on small screens
- Forms are mobile-friendly
- Navigation works on all devices

---

## 🔗 Quick Links

- **Home Page**: `/`
- **Admin Login**: `/admin/login`
- **Admin Dashboard**: `/admin`
- **Projects**: `/admin/projects`
- **Messages**: `/admin/messages`
- **Services**: `/admin/services`
- **Settings**: `/admin/settings`

---

## 💡 Tips & Tricks

1. **Organize Messages**: Regularly review and delete old messages
2. **Update Services**: Keep pricing current and accurate
3. **Track Projects**: Use status to see project pipeline
4. **Backup Information**: Keep your business information up to date
5. **Customer Responsiveness**: Try to respond to messages within 24 hours

---

## ⚠️ Important Notes

### For Development (Current Setup)
- Credentials are hardcoded (demo only)
- Data is stored in component state
- Changes will reset on page reload
- No database backend

### For Production
- Implement secure authentication
- Add backend API
- Use database for persistent storage
- Encrypt sensitive data
- Add email notifications
- Implement proper error handling
- Add audit logging

---

## 🚀 Future Enhancements

Consider adding:
- Real-time email notifications for new messages
- Photo gallery for completed projects
- Client testimonials/reviews section
- Before/after project photos
- Project timeline and portfolio
- Automated email responses
- Database integration
- User role management
- Analytics dashboard

---

## 📞 Support

**Contact Information**:
- Phone: 289-231-0597
- Email: spyro.reno@gmail.com
- Hours: Mon-Sat 8AM-6PM, Sun by appointment

---

**Last Updated**: February 2024
**Version**: 1.0
