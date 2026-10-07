import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { api } from './services/api';

// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { LightboxModal } from './components/LightboxModal';
import { ServiceModal } from './components/ServiceModal';
import { ContactModal } from './components/ContactModal';
import { SplashScreen } from './components/SplashScreen';
import { WhatsAppButton } from './components/WhatsAppButton';


// Public Pages
import { Home } from './pages/Home';
import { ServicesPage } from './pages/ServicesPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { GalleryPage } from './pages/GalleryPage';
import { AboutPage } from './pages/AboutPage';
import { ProcessPage } from './pages/ProcessPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { ContactPage } from './pages/ContactPage';

// Admin Pages
import { AdminLogin } from './admin/AdminLogin';
import { AdminLayout } from './admin/AdminLayout';
import { AdminDashboard } from './admin/AdminDashboard';
import { AdminServices } from './admin/AdminServices';
import { AdminPortfolio } from './admin/AdminPortfolio';
import { AdminGallery } from './admin/AdminGallery';
import { AdminTestimonials } from './admin/AdminTestimonials';
import { AdminEnquiries } from './admin/AdminEnquiries';
import { AdminSettings } from './admin/AdminSettings';

export function App() {
  const { isAuthenticated, loading: authLoading } = useAuth();

  // Active page state
  const [activePage, setActivePage] = useState('home');
  const [adminTab, setAdminTab] = useState('dashboard');

  // Splash screen — show once per session
  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem('branddigix_splash_shown');
  });


  // Website Global Settings
  const [settings, setSettings] = useState({});

  // Modals state
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [preselectedQuoteService, setPreselectedQuoteService] = useState('');

  // Gallery Lightbox state
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxList, setLightboxList] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Load website settings on mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.getSettings();
        if (res.success && res.data) {
          setSettings(res.data);
        }
      } catch (e) {
        console.error('Settings fetch error:', e);
      }
    };
    fetchSettings();
  }, [activePage]);

  // Handle URL hash for easy direct bookmarking or sharing (e.g. #admin, #services)
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && ['home', 'services', 'portfolio', 'gallery', 'about', 'process', 'testimonials', 'contact', 'admin'].includes(hash)) {
      setActivePage(hash);
    }

    const onHashChange = () => {
      const newHash = window.location.hash.replace('#', '');
      if (newHash && ['home', 'services', 'portfolio', 'gallery', 'about', 'process', 'testimonials', 'contact', 'admin'].includes(newHash)) {
        setActivePage(newHash);
      }
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleNavigate = (page) => {
    setActivePage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuote = (serviceName = '') => {
    setPreselectedQuoteService(serviceName);
    setQuoteModalOpen(true);
  };

  const handleOpenLightbox = (image, list = [], index = 0) => {
    setLightboxImage(image);
    setLightboxList(list);
    setLightboxIndex(index);
  };

  const handleLightboxPrev = () => {
    if (lightboxIndex > 0) {
      const prevIdx = lightboxIndex - 1;
      setLightboxIndex(prevIdx);
      setLightboxImage(lightboxList[prevIdx]);
    }
  };

  const handleLightboxNext = () => {
    if (lightboxIndex < lightboxList.length - 1) {
      const nextIdx = lightboxIndex + 1;
      setLightboxIndex(nextIdx);
      setLightboxImage(lightboxList[nextIdx]);
    }
  };

  // If viewing admin panel
  if (activePage === 'admin') {
    if (authLoading) {
      return (
        <div className="min-h-screen bg-[#050814] flex items-center justify-center text-cyan-400">
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        </div>
      );
    }

    if (!isAuthenticated) {
      return (
        <AdminLogin
          onLoginSuccess={() => setAdminTab('dashboard')}
          onBackToSite={() => handleNavigate('home')}
        />
      );
    }

    return (
      <AdminLayout
        activeTab={adminTab}
        setActiveTab={setAdminTab}
        onExitAdmin={() => handleNavigate('home')}
      >
        {adminTab === 'dashboard' && <AdminDashboard setActiveTab={setAdminTab} />}
        {adminTab === 'services' && <AdminServices />}
        {adminTab === 'portfolio' && <AdminPortfolio />}
        {adminTab === 'gallery' && <AdminGallery />}
        {adminTab === 'testimonials' && <AdminTestimonials />}
        {adminTab === 'enquiries' && <AdminEnquiries />}
        {adminTab === 'settings' && <AdminSettings />}
      </AdminLayout>
    );
  }

  // Public User Website Rendering
  return (
    <div className="min-h-screen bg-[#050814] text-slate-100 flex flex-col cyber-grid-bg relative selection:bg-cyan-500 selection:text-slate-950">
      {/* Splash Screen — shows once per session */}
      {showSplash && (
        <SplashScreen
          onComplete={() => {
            sessionStorage.setItem('branddigix_splash_shown', '1');
            setShowSplash(false);
          }}
        />
      )}

      {/* Navigation Header */}
      <Navbar
        activePage={activePage}
        setActivePage={handleNavigate}
        onOpenQuote={() => handleOpenQuote()}
      />


      {/* Main Page Content */}
      <main className="flex-1">
        {activePage === 'home' && (
          <Home
            setActivePage={handleNavigate}
            onOpenProject={(proj) => setSelectedProject(proj)}
            onOpenService={(srv) => setSelectedService(srv)}
            onOpenQuote={handleOpenQuote}
            onOpenLightbox={handleOpenLightbox}
            settings={settings}
          />
        )}

        {activePage === 'services' && (
          <ServicesPage
            onOpenService={(srv) => setSelectedService(srv)}
            onOpenQuote={handleOpenQuote}
          />
        )}

        {activePage === 'portfolio' && (
          <PortfolioPage
            onOpenProject={(proj) => setSelectedProject(proj)}
            onOpenQuote={handleOpenQuote}
          />
        )}

        {activePage === 'gallery' && (
          <GalleryPage onOpenLightbox={handleOpenLightbox} />
        )}

        {activePage === 'about' && (
          <AboutPage onOpenQuote={handleOpenQuote} settings={settings} />
        )}

        {activePage === 'process' && (
          <ProcessPage onOpenQuote={handleOpenQuote} />
        )}

        {activePage === 'testimonials' && (
          <TestimonialsPage onOpenQuote={handleOpenQuote} />
        )}

        {activePage === 'contact' && (
          <ContactPage settings={settings} />
        )}
      </main>

      {/* Footer */}
      <Footer setActivePage={handleNavigate} settings={settings} />

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenQuote={handleOpenQuote}
      />

      {/* Service Details Modal */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onOpenQuote={handleOpenQuote}
      />

      {/* Quote / Contact Modal */}
      <ContactModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        preselectedService={preselectedQuoteService}
      />

      {/* Gallery Lightbox */}
      <LightboxModal
        image={lightboxImage}
        onClose={() => setLightboxImage(null)}
        onPrev={handleLightboxPrev}
        onNext={handleLightboxNext}
        hasPrev={lightboxIndex > 0}
        hasNext={lightboxIndex < lightboxList.length - 1}
      />

      {/* Floating WhatsApp Shortcut */}
      <WhatsAppButton
        phone={`91${(settings.whatsapp || '6381185917').replace(/\D/g, '').slice(-10)}`}
        message="Hello BRANDDIGIX! I visited your website and would like to know more about your services."
      />
    </div>
  );
}

export default App;
