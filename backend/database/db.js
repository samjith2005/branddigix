const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');
const fs = require('fs');

const dbPath = path.resolve(__dirname, 'branddigix.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to SQLite database:', err.message);
  } else {
    console.log('Connected to SQLite database at:', dbPath);
  }
});

// Promisified DB helpers
const run = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
};

const get = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const all = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// Initialize schema and seed data
const initDb = async () => {
  try {
    // 1. Users Table
    await run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name TEXT DEFAULT 'Admin',
        role TEXT DEFAULT 'superadmin',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 2. Services Table
    await run(`
      CREATE TABLE IF NOT EXISTS services (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        description TEXT NOT NULL,
        image TEXT,
        price TEXT,
        status TEXT DEFAULT 'Published',
        featured INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 3. Portfolio Table
    await run(`
      CREATE TABLE IF NOT EXISTS portfolio (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_name TEXT NOT NULL,
        category TEXT NOT NULL,
        project_type TEXT DEFAULT 'Client Project',
        short_description TEXT NOT NULL,
        full_description TEXT,
        challenge TEXT,
        solution TEXT,
        cover_image TEXT NOT NULL,
        project_images TEXT,
        technologies TEXT,
        services_provided TEXT,
        client_or_demo TEXT DEFAULT 'Client Project',
        live_url TEXT,
        completion_date TEXT,
        status TEXT DEFAULT 'Published',
        featured INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 4. Gallery Table
    await run(`
      CREATE TABLE IF NOT EXISTS gallery (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        image TEXT NOT NULL,
        description TEXT,
        status TEXT DEFAULT 'Published',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 5. Testimonials Table
    await run(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_name TEXT NOT NULL,
        company TEXT NOT NULL,
        profile_image TEXT,
        testimonial TEXT NOT NULL,
        rating INTEGER DEFAULT 5,
        status TEXT DEFAULT 'Published',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 6. Enquiries Table
    await run(`
      CREATE TABLE IF NOT EXISTS enquiries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        company TEXT,
        service TEXT,
        budget TEXT,
        message TEXT NOT NULL,
        status TEXT DEFAULT 'New',
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 7. Settings Table (Key - Value)
    await run(`
      CREATE TABLE IF NOT EXISTS website_settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      )
    `);

    // --- SEED DATA ---
    // Check if admin exists
    const adminUser = await get('SELECT * FROM users WHERE email = ?', ['admin@branddigix.com']);
    if (!adminUser) {
      const hashedPassword = await bcrypt.hash('Admin@123', 10);
      await run(
        `INSERT INTO users (username, email, password, name, role) VALUES (?, ?, ?, ?, ?)`,
        ['admin', 'admin@branddigix.com', hashedPassword, 'BRANDDIGIX Admin', 'superadmin']
      );
      console.log('Seeded default admin user: admin@branddigix.com / Admin@123');
    }

    // Seed Settings
    const defaultSettings = [
      { key: 'brand_name', value: 'BRANDDIGIX' },
      { key: 'tagline', value: 'WE BUILD DIGITAL BRANDS' },
      { key: 'official_email', value: 'branddigix@gmail.com' },
      { key: 'instagram', value: '@branddigix.in' },
      { key: 'phone', value: '+91 63811 85917' },
      { key: 'whatsapp', value: '+91 63811 85917' },
      { key: 'address', value: 'Chennai & Coimbatore, Tamil Nadu, India' },
      { key: 'hero_title', value: 'Build Your Brand. Build Your Digital Future.' },
      { key: 'hero_subtitle', value: 'BRANDDIGIX helps businesses build their digital presence through creative design, websites and custom digital solutions.' },
      { key: 'cta_primary', value: 'Explore Services' },
      { key: 'cta_secondary', value: 'View Our Work' },
      { key: 'social_instagram', value: 'https://instagram.com/branddigix.in' },
      { key: 'social_facebook', value: 'https://facebook.com/branddigix' },
      { key: 'social_linkedin', value: 'https://linkedin.com/company/branddigix' },
      { key: 'social_youtube', value: 'https://youtube.com/@branddigix' },
      { key: 'vision', value: 'To empower forward-thinking entrepreneurs and businesses worldwide with next-generation digital identities, custom engineering, and transformational brand architecture.' },
      { key: 'mission', value: 'To blend strategic design, bleeding-edge web technology, and data-driven branding to convert everyday businesses into industry leaders.' }
    ];

    for (const s of defaultSettings) {
      const existing = await get('SELECT * FROM website_settings WHERE key = ?', [s.key]);
      if (!existing) {
        await run('INSERT INTO website_settings (key, value) VALUES (?, ?)', [s.key, s.value]);
      }
    }

    // Seed Services if table is empty
    const servicesCount = await get('SELECT COUNT(*) as count FROM services');
    if (servicesCount.count === 0) {
      const seedServices = [
        {
          name: 'Logo & Brand Identity',
          category: 'Branding',
          description: 'Custom logo creation, brand guidelines, typography systems, color schemes, and unforgettable corporate visual identity designed to leave a lasting impact.',
          image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
          price: 'Starting from ₹9,999',
          status: 'Published',
          featured: 1
        },
        {
          name: 'Website Development',
          category: 'Web Development',
          description: 'High-speed, modern, SEO-optimized business websites, landing pages, dynamic web applications, and headless architectures built for high conversion.',
          image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80',
          price: 'Starting from ₹19,999',
          status: 'Published',
          featured: 1
        },
        {
          name: 'UI/UX Design',
          category: 'UI/UX',
          description: 'User-centric wireframes, mobile app prototypes, website designs, and design systems crafted with precision in Figma to maximize engagement.',
          image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
          price: 'Starting from ₹14,999',
          status: 'Published',
          featured: 1
        },
        {
          name: 'Graphic Design & Social Media',
          category: 'Graphic Design',
          description: 'Eye-catching social media posters, promotional carousels, banners, brochures, and print marketing collateral that demand customer attention.',
          image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
          price: 'Starting from ₹7,999',
          status: 'Published',
          featured: 1
        },
        {
          name: 'Custom Digital Solutions',
          category: 'Digital Solutions',
          description: 'Bespoke business automation, client portals, CRM integrations, and specialized digital workflows tailored to scale your enterprise.',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
          price: 'Custom Quote',
          status: 'Published',
          featured: 1
        },
        {
          name: 'Theme Creations & Restaurant Kits',
          category: 'Theme Creations',
          description: 'Tailored digital branding and menus for cafés, dining spaces, retail chains, and luxury lifestyle brands looking for an elite aesthetic.',
          image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
          price: 'Starting from ₹12,999',
          status: 'Published',
          featured: 1
        }
      ];

      for (const s of seedServices) {
        await run(
          `INSERT INTO services (name, category, description, image, price, status, featured) VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [s.name, s.category, s.description, s.image, s.price, s.status, s.featured]
        );
      }
      console.log('Seeded default services.');
    }

    // Seed Portfolio if table is empty
    const portfolioCount = await get('SELECT COUNT(*) as count FROM portfolio');
    if (portfolioCount.count === 0) {
      const seedPortfolio = [
        {
          project_name: 'KARUPPATTI CAFE',
          category: 'Branding',
          project_type: 'Concept Project',
          short_description: 'Complete digital branding and modern web experience for an authentic South Indian palm-jaggery artisan cafe.',
          full_description: 'KARUPPATTI CAFE is a comprehensive brand identity and digital solution designed for a traditional heritage cafe that celebrates authentic South Indian palm-jaggery (Karuppatti) coffee and delicacies. We created an earthy yet futuristic brand narrative combining traditional Tamil craftsmanship with sleek modern digital presentation.',
          challenge: 'Positioning a traditional, rustic culinary tradition for modern youth and urban food lovers without losing cultural authenticity.',
          solution: 'Developed a rich organic color palette (Palm Brown, Golden Amber, Deep Jaggery Obsidian), custom typography, QR digital menu, and an interactive online ordering storefront.',
          cover_image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
          project_images: JSON.stringify([
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1000&q=80'
          ]),
          technologies: 'Figma, React, Tailwind CSS, Node.js, Vercel',
          services_provided: 'Brand Identity, Logo Design, Packaging Concepts, Responsive Web Design',
          client_or_demo: 'Concept Project',
          live_url: 'https://branddigix.in/demo/karuppatti-cafe',
          completion_date: 'February 2026',
          status: 'Published',
          featured: 1
        },
        {
          project_name: 'NEXUS CLOUD ERP',
          category: 'Web Development',
          project_type: 'Client Project',
          short_description: 'Sleek enterprise dashboard and web portal for a multi-tenant cloud supply chain platform.',
          full_description: 'Engineered a lightning-fast enterprise dashboard featuring real-time inventory tracking, role-based access control, analytics charts, and seamless multi-device responsiveness.',
          challenge: 'Rendering dense telemetry data without UI lag while ensuring intuitive navigation for warehouse staff.',
          solution: 'Created an optimized React interface with virtualized tables, WebSocket updates, and dark glassmorphic data visualizers.',
          cover_image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
          project_images: JSON.stringify([
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1000&q=80'
          ]),
          technologies: 'React, Vite, Tailwind CSS, Express, Chart.js, SQLite',
          services_provided: 'Full Stack Web Development, UI/UX Systems, API Architecture',
          client_or_demo: 'Client Project',
          live_url: 'https://nexuscloud.example.com',
          completion_date: 'January 2026',
          status: 'Published',
          featured: 1
        },
        {
          project_name: 'AURORA HEALTH APPS',
          category: 'UI/UX',
          project_type: 'Client Project',
          short_description: 'Mobile patient companion and teleconsultation UI/UX designed for accessibility and clarity.',
          full_description: 'Designed a calm, accessible mobile user experience connecting remote patients with specialized healthcare doctors, featuring one-tap appointment booking and smart health telemetry.',
          challenge: 'Eliminating friction for elderly patients while maintaining high security and medical privacy compliance.',
          solution: 'High contrast typography, simple voice-guided flows, and streamlined booking micro-interactions.',
          cover_image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
          project_images: JSON.stringify([
            'https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1000&q=80'
          ]),
          technologies: 'Figma, Adobe XD, Design Tokens, Prototyping',
          services_provided: 'User Research, Wireframing, High-Fidelity UI Design, Interaction Testing',
          client_or_demo: 'Client Project',
          live_url: 'https://aurorahealth.example.com',
          completion_date: 'December 2025',
          status: 'Published',
          featured: 1
        },
        {
          project_name: 'CYBERPULSE APPAREL',
          category: 'Digital Solutions',
          project_type: 'Client Project',
          short_description: 'Futuristic e-commerce platform and 3D product showcase for a streetwear fashion label.',
          full_description: 'Built a streetwear e-commerce platform with customized interactive product cards, automated checkout triggers, and inventory sync across physical and online stores.',
          challenge: 'Creating a high-fashion underground cyberpunk visual vibe without sacrificing quick page load and checkout conversion.',
          solution: 'Implemented performant image compression, minimal layout shifts, instant cart previews, and seamless payment gateways.',
          cover_image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
          project_images: JSON.stringify([
            'https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=1000&q=80'
          ]),
          technologies: 'React, Node.js, Stripe, Tailwind CSS, Framer Motion',
          services_provided: 'E-Commerce Engineering, Cyber Visual Branding, Payment Integration',
          client_or_demo: 'Client Project',
          live_url: 'https://cyberpulse.example.com',
          completion_date: 'November 2025',
          status: 'Published',
          featured: 1
        }
      ];

      for (const p of seedPortfolio) {
        await run(
          `INSERT INTO portfolio (project_name, category, project_type, short_description, full_description, challenge, solution, cover_image, project_images, technologies, services_provided, client_or_demo, live_url, completion_date, status, featured)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            p.project_name,
            p.category,
            p.project_type,
            p.short_description,
            p.full_description,
            p.challenge,
            p.solution,
            p.cover_image,
            p.project_images,
            p.technologies,
            p.services_provided,
            p.client_or_demo,
            p.live_url,
            p.completion_date,
            p.status,
            p.featured
          ]
        );
      }
      console.log('Seeded default portfolio projects.');
    }

    // Seed Gallery if table is empty
    const galleryCount = await get('SELECT COUNT(*) as count FROM gallery');
    if (galleryCount.count === 0) {
      const seedGallery = [
        {
          title: 'Cyberpunk Brand Visuals',
          category: 'Brand Designs',
          image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80',
          description: 'Exploration of neon fluid lighting and futuristic 3D aesthetics for modern tech startups.',
          status: 'Published'
        },
        {
          title: 'Fintech Dashboard Design',
          category: 'Website Designs',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
          description: 'Clean dark UI dashboard for decentralized analytics and financial portfolio tracking.',
          status: 'Published'
        },
        {
          title: 'Minimalist Monogram Logos',
          category: 'Logo Designs',
          image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=900&q=80',
          description: 'Geometric precision logo emblems designed with golden ratio rules.',
          status: 'Published'
        },
        {
          title: 'Mobile App Interaction Flow',
          category: 'UI/UX',
          image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=900&q=80',
          description: 'Haptic feedback and card gesture interaction study for mobile e-commerce.',
          status: 'Published'
        },
        {
          title: 'Creative Hackathon Sprint',
          category: 'Events',
          image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=900&q=80',
          description: 'BRANDDIGIX team brainstorming and design sprinting during national tech summit.',
          status: 'Published'
        },
        {
          title: 'Design Studio Lab',
          category: 'Behind the Scenes',
          image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80',
          description: 'Inside the BRANDDIGIX creative studio where strategy transforms into code.',
          status: 'Published'
        }
      ];

      for (const g of seedGallery) {
        await run(
          `INSERT INTO gallery (title, category, image, description, status) VALUES (?, ?, ?, ?, ?)`,
          [g.title, g.category, g.image, g.description, g.status]
        );
      }
      console.log('Seeded default gallery items.');
    }

    // Seed Testimonials if table is empty
    const testCount = await get('SELECT COUNT(*) as count FROM testimonials');
    if (testCount.count === 0) {
      const seedTestimonials = [
        {
          client_name: 'Senthil Kumar',
          company: 'Karuppatti Cafe',
          profile_image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
          testimonial: 'BRANDDIGIX completely transformed our heritage cafe vision into a modern, eye-catching digital brand. Their design sense and web speed are exceptional!',
          rating: 5,
          status: 'Published'
        },
        {
          client_name: 'Priya Rajendran',
          company: 'Nexus Tech Global',
          profile_image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
          testimonial: 'Working with BRANDDIGIX was effortless. They built our cloud dashboard in record time with zero compromises on quality. Highly recommended for enterprise projects.',
          rating: 5,
          status: 'Published'
        },
        {
          client_name: 'Dinesh Karthik',
          company: 'Aurora Life Sciences',
          profile_image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
          testimonial: 'Their UI/UX team understands user psychology deeply. Our patient app engagement grew by 65% right after the redesign.',
          rating: 5,
          status: 'Published'
        }
      ];

      for (const t of seedTestimonials) {
        await run(
          `INSERT INTO testimonials (client_name, company, profile_image, testimonial, rating, status) VALUES (?, ?, ?, ?, ?, ?)`,
          [t.client_name, t.company, t.profile_image, t.testimonial, t.rating, t.status]
        );
      }
      console.log('Seeded default testimonials.');
    }

    // Seed sample enquiries if empty
    const enquiryCount = await get('SELECT COUNT(*) as count FROM enquiries');
    if (enquiryCount.count === 0) {
      const seedEnquiries = [
        {
          name: 'Arun Natarajan',
          email: 'arun@velantech.com',
          phone: '+91 98412 34567',
          company: 'Velan Technologies',
          service: 'Website Development',
          budget: '₹25,000 - ₹50,000',
          message: 'We need a high-conversion landing page and company website for our SaaS launch next month.',
          status: 'New'
        },
        {
          name: 'Ravi Chandran',
          email: 'ravi@spicekraft.in',
          phone: '+91 97123 45678',
          company: 'SpiceKraft Foods',
          service: 'Logo & Brand Identity',
          budget: '₹10,000 - ₹25,000',
          message: 'Looking for a premium packaging and logo rebranding for our organic spice exports.',
          status: 'Contacted'
        },
        {
          name: 'Kumar Vivek',
          email: 'kumar@optima.io',
          phone: '+91 96123 45678',
          company: 'Optima Systems',
          service: 'UI/UX Design',
          budget: '₹50,000 - ₹1,00,000',
          message: 'Need a complete Figma design system and mobile app mockup for an AI logistics platform.',
          status: 'Closed'
        }
      ];

      for (const e of seedEnquiries) {
        await run(
          `INSERT INTO enquiries (name, email, phone, company, service, budget, message, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [e.name, e.email, e.phone, e.company, e.service, e.budget, e.message, e.status]
        );
      }
      console.log('Seeded sample enquiries.');
    }

    console.log('Database initialization completed successfully.');
  } catch (err) {
    console.error('Error initializing database:', err);
  }
};

module.exports = {
  db,
  run,
  get,
  all,
  initDb
};
