import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { api } from '../services/api';

export const ContactModal = ({ isOpen, onClose, preselectedService = '', servicesList = [] }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: preselectedService || 'Website Development',
    budget: '₹25,000 - ₹50,000',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.submitEnquiry(formData);
      if (res.success) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          onClose();
          setFormData({
            name: '',
            email: '',
            phone: '',
            company: '',
            service: 'Website Development',
            budget: '₹25,000 - ₹50,000',
            message: ''
          });
        }, 2200);
      } else {
        setError(res.message || 'Something went wrong. Please check your inputs.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative bg-[#0A0F26] border border-cyan-500/30 rounded-2xl w-full max-w-xl max-h-[92vh] overflow-y-auto p-5 sm:p-8 shadow-[0_0_50px_rgba(0,210,255,0.25)] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition min-h-[40px] min-w-[40px] flex items-center justify-center"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-cyan-950/80 border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(0,210,255,0.5)]">
              <CheckCircle2 className="w-8 h-8 text-cyan-400" />
            </div>
            <h3 className="text-2xl font-bold font-heading text-white">Enquiry Received!</h3>
            <p className="text-slate-300 text-sm max-w-sm mx-auto leading-relaxed">
              Thank you! Your project details have been sent directly to the BRANDDIGIX team. We will contact you within 24 hours.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-5 pr-8">
              <span className="text-xs uppercase font-semibold tracking-wider text-cyan-400 flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                Let's Build Something Great
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                Request a Project Quote
              </h2>
              <p className="text-slate-400 text-xs mt-1">
                Fill out the form below and we'll prepare a custom roadmap and proposal for your business.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Arun Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-base sm:text-sm focus:outline-none focus:border-cyan-400 transition min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="arun@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-base sm:text-sm focus:outline-none focus:border-cyan-400 transition min-h-[44px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98400 12345"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-base sm:text-sm focus:outline-none focus:border-cyan-400 transition min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Company / Brand Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Karuppatti Cafe"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-base sm:text-sm focus:outline-none focus:border-cyan-400 transition min-h-[44px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Service Required</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-base sm:text-sm focus:outline-none focus:border-cyan-400 transition min-h-[44px]"
                  >
                    <option value="Website Development">Website Development</option>
                    <option value="Logo & Brand Identity">Logo & Brand Identity</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Graphic Design">Graphic Design & Social Media</option>
                    <option value="Theme Creations">Theme Creations & Cafes</option>
                    <option value="Custom Digital Solutions">Custom Digital Solutions</option>
                    <option value="Product Building">Product Building</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Budget Range</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-base sm:text-sm focus:outline-none focus:border-cyan-400 transition min-h-[44px]"
                  >
                    <option value="Under ₹15,000">Under ₹15,000</option>
                    <option value="₹15,000 - ₹35,000">₹15,000 - ₹35,000</option>
                    <option value="₹35,000 - ₹75,000">₹35,000 - ₹75,000</option>
                    <option value="₹75,000 - ₹1,50,000">₹75,000 - ₹1,50,000</option>
                    <option value="₹1,50,000+ / Enterprise">₹1,50,000+ / Enterprise</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Project Details & Requirements *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell us about your brand, what you're looking to build, and any specific deadlines..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-base sm:text-sm focus:outline-none focus:border-cyan-400 transition resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full cyber-button-primary py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 min-h-[46px]"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Project Enquiry</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
