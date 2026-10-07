# 🌐 BRANDDIGIX — Complete Business & Portfolio Web Platform

A production-ready, full-stack dynamic business and portfolio application built for **BRANDDIGIX** ("We Build Digital Brands") featuring a public user website and a secure, role-protected admin panel powered by Node.js, Express, SQLite, React, and Tailwind CSS.

---

## 🚀 Quick Start (One Command)

The platform is located at:
`C:\Users\ADMIN\.gemini\antigravity\scratch\branddigix`

### 1. Run the Platform
Open a terminal in `branddigix`:
```bash
cd branddigix
npm start
```
> The unified server will start on port `5000`:
> - 🌐 **Public Website**: [http://localhost:5000](http://localhost:5000)
> - 🔐 **Admin Panel**: [http://localhost:5000/#admin](http://localhost:5000/#admin)
> - ⚙️ **Backend API**: [http://localhost:5000/api](http://localhost:5000/api)

---

## 🔐 Admin Panel Credentials

| Credential | Value |
| :--- | :--- |
| **Login URL** | `http://localhost:5000/#admin` |
| **Email / Username** | `admin@branddigix.com` or `admin` |
| **Password** | `Admin@123` |
| **Security** | Bcrypt password hashing + JWT token authentication |

*(You can also change the admin password at any time in the **Website Settings** tab inside the Admin Panel)*

---

## 🌟 Architecture & Features

### 👤 Panel 1 — Public User Website
1. **🏠 Home Page**:
   - **Hero Section**: "Build Your Brand. Build Your Digital Future." with "YOUR VISION. OUR DIGITAL EXPERTISE.", "Ideas into Digital Reality", and quick highlights.
   - **Primary Action CTAs**: "Explore Services", "View Our Work", "Contact Us".
   - **Why BRANDDIGIX**: 4 value pillars (Modern & Scalable, Bespoke Design, Results & Growth, End-to-End Delivery).
   - **Services Preview**: Dynamically loaded from database with "View Details" & "Get Quote".
   - **Featured Work Preview**: Pre-seeded with **KARUPPATTI CAFE** and other real case studies.
   - **Our 6-Step Process**: Interactive roadmap (Discover → Plan → Design → Develop → Review → Launch).
   - **Creative Gallery Preview**: Visual cards with category badges and lightbox zoom.
   - **Client Testimonials**: Verified ratings and testimonials.
   - **Contact CTA Banner**: "Let's Build Something Great".

2. **🛠️ Our Services (`#services`)**:
   - Real-time dynamic catalog from Admin panel.
   - Category filtering (Branding, Web Development, UI/UX, Graphic Design, Digital Solutions, Theme Creations).
   - Search bar for quick lookup.
   - "Get Quote" opens quote modal pre-filled with the selected service.
   - "View Details" modal with deliverables checklist and pricing.

3. **💼 Our Work / Portfolio (`#portfolio`)**:
   - Dedicated portfolio archive with category tabs.
   - Prominent tags for **Concept Project** vs **Client Project**.
   - Rich project detail modals with cover + screenshot gallery, the challenge, the solution, technologies used, services provided, and live demo link.

4. **🖼️ Visual Gallery (`#gallery`)**:
   - Dedicated gallery showcase (Brand Designs, Website Designs, Logo Designs, UI/UX, Team, Events, Behind the Scenes).
   - Full-screen interactive lightbox modal with keyboard navigation (Esc, Arrow keys).

5. **👥 About Us (`#about`)**:
   - BRANDDIGIX narrative and origins.
   - Vision & Mission.
   - Leadership & Team: **Founder & CEO** + **3 Partners** (Technology, Creative Direction, UI/UX).
   - Core beliefs and engineering approach.

6. **⚙️ Our Process (`#process`)**:
   - Deep-dive into each of the 6 steps with deliverables and estimated timelines.

7. **⭐ Testimonials (`#testimonials`)**:
   - Client feedback, star ratings, and company affiliations.

8. **📞 Contact Us (`#contact`)**:
   - Contact form: Name, Email, Phone, Company, Service Required, Budget Range, Message.
   - Instant database insertion -> Admin notification pipeline.
   - Official direct links: `branddigix@gmail.com`, `@branddigix.in`, WhatsApp chat link, direct phone call, and headquarters address.

---

### 🔐 Panel 2 — Protected Admin Panel
Protected by JWT authentication middleware; unauthorized visitors are redirected to the staff login screen.

1. **📊 Admin Dashboard**:
   - Real-time counters: Services, Portfolio Projects, Gallery Images, Total Enquiries, New Enquiries, Testimonials.
   - Recent inquiries table with one-click status change (`🟡 New`, `🔵 Contacted`, `🟢 Converted`, `⚫ Closed`).
   - Quick action shortcuts.

2. **🛠️ Service Management**:
   - ➕ Add Service (Name, Category, Description, Image Upload/URL, Starting Price, Status).
   - ✏️ Edit Service.
   - 👁️ One-click Publish / Unpublish.
   - 🗑️ Delete Service.
   - **Auto-Sync**: Any change instantly reflects on the public Our Services page.

3. **💼 Portfolio Management**:
   - ➕ Add Project (Project Name, Category, Project Type, Short/Full Description, Challenge, Solution, Cover Image Upload/URL, Additional Images, Technologies, Services Provided, Live URL, Completion Date, Status).
   - ✏️ Edit Project.
   - 👁️ Publish / Draft toggle.
   - 🗑️ Delete Project.
   - **Auto-Sync**: Automatically appears under Our Work.

4. **🖼️ Gallery Management**:
   - ➕ Upload Image (or paste Image URL).
   - Categories, title, description, and status.
   - 👁️ Publish / Hide toggle.
   - 🗑️ Delete Gallery image.

5. **⭐ Testimonial Management**:
   - ➕ Add client testimonials with 1-5 star ratings and avatar upload.
   - ✏️ Edit & 🗑️ Delete.

6. **📩 Enquiry Management**:
   - View all submissions from the Contact form.
   - Filter by status (`All`, `New`, `Contacted`, `Converted`, `Closed`).
   - Detailed message view modal.
   - One-click "Reply via Email" (`mailto:`) or "Message on WhatsApp".
   - Internal follow-up notes saving.

7. **⚙️ Website Settings**:
   - Modify official email (`branddigix@gmail.com`), phone, WhatsApp, Instagram (`@branddigix.in`), and address.
   - Customize homepage hero headline, description, and CTA buttons.
   - Update social links (Instagram, Facebook, LinkedIn, YouTube).
   - Change Admin password.

---

## 🗄️ Database Structure (SQLite)

Located at: `backend/database/branddigix.db`

### Tables:
1. `users`: Admin credentials (`username`, `email`, `password` bcrypt hash, `role`, `created_at`).
2. `services`: (`id`, `name`, `category`, `description`, `image`, `price`, `status`, `featured`, `created_at`).
3. `portfolio`: (`id`, `project_name`, `category`, `project_type`, `short_description`, `full_description`, `challenge`, `solution`, `cover_image`, `project_images`, `technologies`, `services_provided`, `live_url`, `completion_date`, `status`, `created_at`).
4. `gallery`: (`id`, `title`, `category`, `image`, `description`, `status`, `created_at`).
5. `testimonials`: (`id`, `client_name`, `company`, `profile_image`, `testimonial`, `rating`, `status`, `created_at`).
6. `enquiries`: (`id`, `name`, `email`, `phone`, `company`, `service`, `budget`, `message`, `status`, `notes`, `created_at`).
7. `website_settings`: Key-value store for contact info, hero copy, and branding.

---

## 📁 Directory Layout

```
branddigix/
├── backend/
│   ├── database/
│   │   ├── db.js             # SQLite init, migrations, seed data
│   │   └── branddigix.db     # SQLite database file
│   ├── middleware/
│   │   ├── auth.js           # JWT token verification
│   │   └── upload.js         # Multer image upload handler
│   ├── routes/
│   │   ├── auth.js           # Admin login, session check, uploads
│   │   ├── services.js       # Services CRUD
│   │   ├── portfolio.js      # Portfolio CRUD
│   │   ├── gallery.js        # Gallery CRUD
│   │   ├── testimonials.js   # Testimonials CRUD
│   │   ├── enquiries.js      # Contact submissions & pipeline
│   │   └── settings.js       # Dynamic website settings
│   ├── uploads/              # Stored uploaded images
│   └── server.js             # Express app serving API & static frontend
├── frontend/
│   ├── dist/                 # Optimized production build
│   ├── src/
│   │   ├── context/          # AuthContext (JWT session management)
│   │   ├── services/         # api.js client
│   │   ├── components/       # Navbar, Footer, Modals, Logo, Social Icons
│   │   ├── pages/            # Home, Services, Portfolio, Gallery, About, Process, Testimonials, Contact
│   │   └── admin/            # Dashboard, Services, Portfolio, Gallery, Testimonials, Enquiries, Settings
│   ├── tailwind.config.js    # Cyber neon theme configuration
│   └── vite.config.js        # Vite config with backend proxy
├── package.json              # Root orchestration script
└── README.md
```
