const API_BASE = '/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('branddigix_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

export const api = {
  // Public
  getServices: async () => {
    const res = await fetch(`${API_BASE}/services`);
    return res.json();
  },
  getServiceById: async (id) => {
    const res = await fetch(`${API_BASE}/services/${id}`);
    return res.json();
  },
  getPortfolio: async (category = 'All') => {
    const url = category && category !== 'All' 
      ? `${API_BASE}/portfolio?category=${encodeURIComponent(category)}`
      : `${API_BASE}/portfolio`;
    const res = await fetch(url);
    return res.json();
  },
  getProjectById: async (id) => {
    const res = await fetch(`${API_BASE}/portfolio/${id}`);
    return res.json();
  },
  getGallery: async (category = 'All') => {
    const url = category && category !== 'All' 
      ? `${API_BASE}/gallery?category=${encodeURIComponent(category)}`
      : `${API_BASE}/gallery`;
    const res = await fetch(url);
    return res.json();
  },
  getTestimonials: async () => {
    const res = await fetch(`${API_BASE}/testimonials`);
    return res.json();
  },
  getSettings: async () => {
    const res = await fetch(`${API_BASE}/settings`);
    return res.json();
  },
  submitEnquiry: async (formData) => {
    const res = await fetch(`${API_BASE}/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    return res.json();
  },

  // Auth
  login: async (credentials) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return res.json();
  },
  verifyToken: async () => {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },
  changePassword: async (passwords) => {
    const res = await fetch(`${API_BASE}/auth/change-password`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(passwords)
    });
    return res.json();
  },

  // File Upload
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const token = localStorage.getItem('branddigix_token');
    const res = await fetch(`${API_BASE}/auth/upload`, {
      method: 'POST',
      headers: {
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: formData
    });
    return res.json();
  },

  // Admin: Services
  adminGetServices: async () => {
    const res = await fetch(`${API_BASE}/services/admin/all`, { headers: getAuthHeaders() });
    return res.json();
  },
  adminCreateService: async (data) => {
    const res = await fetch(`${API_BASE}/services`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  },
  adminUpdateService: async (id, data) => {
    const res = await fetch(`${API_BASE}/services/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  },
  adminToggleServiceStatus: async (id, status) => {
    const res = await fetch(`${API_BASE}/services/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status })
    });
    return res.json();
  },
  adminDeleteService: async (id) => {
    const res = await fetch(`${API_BASE}/services/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // Admin: Portfolio
  adminGetPortfolio: async () => {
    const res = await fetch(`${API_BASE}/portfolio/admin/all`, { headers: getAuthHeaders() });
    return res.json();
  },
  adminCreatePortfolio: async (data) => {
    const res = await fetch(`${API_BASE}/portfolio`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  },
  adminUpdatePortfolio: async (id, data) => {
    const res = await fetch(`${API_BASE}/portfolio/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  },
  adminTogglePortfolioStatus: async (id, status) => {
    const res = await fetch(`${API_BASE}/portfolio/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status })
    });
    return res.json();
  },
  adminDeletePortfolio: async (id) => {
    const res = await fetch(`${API_BASE}/portfolio/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // Admin: Gallery
  adminGetGallery: async () => {
    const res = await fetch(`${API_BASE}/gallery/admin/all`, { headers: getAuthHeaders() });
    return res.json();
  },
  adminCreateGallery: async (data) => {
    const res = await fetch(`${API_BASE}/gallery`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  },
  adminUpdateGallery: async (id, data) => {
    const res = await fetch(`${API_BASE}/gallery/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  },
  adminToggleGalleryStatus: async (id, status) => {
    const res = await fetch(`${API_BASE}/gallery/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status })
    });
    return res.json();
  },
  adminDeleteGallery: async (id) => {
    const res = await fetch(`${API_BASE}/gallery/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // Admin: Testimonials
  adminGetTestimonials: async () => {
    const res = await fetch(`${API_BASE}/testimonials/admin/all`, { headers: getAuthHeaders() });
    return res.json();
  },
  adminCreateTestimonial: async (data) => {
    const res = await fetch(`${API_BASE}/testimonials`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  },
  adminUpdateTestimonial: async (id, data) => {
    const res = await fetch(`${API_BASE}/testimonials/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  },
  adminToggleTestimonialStatus: async (id, status) => {
    const res = await fetch(`${API_BASE}/testimonials/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status })
    });
    return res.json();
  },
  adminDeleteTestimonial: async (id) => {
    const res = await fetch(`${API_BASE}/testimonials/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // Admin: Enquiries
  adminGetEnquiries: async (status = 'All') => {
    const url = status && status !== 'All' 
      ? `${API_BASE}/enquiries?status=${encodeURIComponent(status)}`
      : `${API_BASE}/enquiries`;
    const res = await fetch(url, { headers: getAuthHeaders() });
    return res.json();
  },
  adminGetStats: async () => {
    const res = await fetch(`${API_BASE}/enquiries/stats/summary`, { headers: getAuthHeaders() });
    return res.json();
  },
  adminUpdateEnquiryStatus: async (id, status) => {
    const res = await fetch(`${API_BASE}/enquiries/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status })
    });
    return res.json();
  },
  adminUpdateEnquiryNotes: async (id, notes) => {
    const res = await fetch(`${API_BASE}/enquiries/${id}/notes`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ notes })
    });
    return res.json();
  },
  adminDeleteEnquiry: async (id) => {
    const res = await fetch(`${API_BASE}/enquiries/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // Admin: Settings
  adminUpdateSettings: async (settings) => {
    const res = await fetch(`${API_BASE}/settings`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(settings)
    });
    return res.json();
  }
};
