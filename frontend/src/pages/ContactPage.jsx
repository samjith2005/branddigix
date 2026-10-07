import React, { useState } from 'react';
import { api } from '../services/api';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Sparkles, MessageSquare } from 'lucide-react';
import { InstagramIcon } from '../components/SocialIcons';

export const ContactPage = ({ settings = {} }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Website Development',
    budget: '₹25,000 - ₹50,000',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const email = settings.official_email || 'branddigix@gmail.com';
  const instagram = settings.instagram || '@branddigix.in';
  const phone = settings.phone || '+91 80158 10518';
  const whatsapp = settings.whatsapp || '+91 80158 10518';
  const address = settings.address || 'Chennai & Coimbatore, Tamil Nadu, India';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.submitEnquiry(formData);
      if (res.success) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: 'Website Development',
          budget: '₹25,000 - ₹50,000',
          message: ''
        });
      } else {
        setError(res.message || 'Failed to submit enquiry. Please verify details.');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/70 border border-cyan-500/30 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Get In Touch
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white">
          Let's Build Something Great
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-4 leading-relaxed">
          Ready to kick off a new branding initiative, launch a modern website, or ask a question? Send us a message and our team will get in touch promptly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Information & Channels */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-8 rounded-2xl border border-cyan-500/30 space-y-6">
            <h3 className="text-xl font-bold font-heading text-white">
              Official Communication
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              We respond to all verified business inquiries within 24 hours. Connect with us through whichever platform suits you best.
            </p>

            <div className="space-y-4 pt-2">
              <a
                href={`mailto:${email}`}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition group"
              >
                <div className="p-2 rounded-lg bg-cyan-950 text-cyan-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Official Email</div>
                  <div className="text-sm font-semibold text-white group-hover:text-cyan-400 transition break-all">{email}</div>
                </div>
              </a>

              <a
                href="https://instagram.com/branddigix.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition group"
              >
                <div className="p-2 rounded-lg bg-cyan-950 text-cyan-400">
                  <InstagramIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Instagram Official</div>
                  <div className="text-sm font-semibold text-white group-hover:text-cyan-400 transition">{instagram}</div>
                </div>
              </a>

              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition group"
              >
                <div className="p-2 rounded-lg bg-cyan-950 text-cyan-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Direct Phone Call</div>
                  <div className="text-sm font-semibold text-white group-hover:text-cyan-400 transition">{phone}</div>
                </div>
              </a>

              <a
                href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition group"
              >
                <div className="p-2 rounded-lg bg-emerald-950 text-emerald-400">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">WhatsApp Support</div>
                  <div className="text-sm font-semibold text-emerald-300 group-hover:underline">Chat on WhatsApp</div>
                </div>
              </a>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="p-2 rounded-lg bg-cyan-950 text-cyan-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Headquarters</div>
                  <div className="text-sm font-semibold text-white">{address}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-8 sm:p-10 rounded-2xl border border-cyan-500/30 shadow-2xl relative">
            <h3 className="text-2xl font-bold font-heading text-white mb-2">
              Send Us a Message
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Complete this form to log an inquiry directly into our project pipeline.
            </p>

            {success ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-cyan-950/80 border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(0,210,255,0.5)]">
                  <CheckCircle2 className="w-8 h-8 text-cyan-400" />
                </div>
                <h4 className="text-2xl font-bold font-heading text-white">Enquiry Received!</h4>
                <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you! Your details have been transmitted directly to our admin team. We will contact you at your provided phone number or email within 24 hours.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-4 px-6 py-2 rounded-xl cyber-button-secondary text-xs font-semibold"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Arun Natarajan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="arun@brand.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400 transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98400 12345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Company / Brand Name</label>
                    <input
                      type="text"
                      placeholder="e.g. SpiceKraft"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400 transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Service Required</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400 transition"
                    >
                      <option value="Website Development">Website Development</option>
                      <option value="Logo & Brand Identity">Logo & Brand Identity</option>
                      <option value="UI/UX Design">UI/UX Design</option>
                      <option value="Graphic Design">Graphic Design & Social Media</option>
                      <option value="Custom Digital Solutions">Custom Digital Solutions</option>
                      <option value="Theme Creations">Theme Creations & Cafes</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Budget Range</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400 transition"
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
                    rows={4}
                    placeholder="Tell us what you'd like to achieve, target launch date, and any specific preferences..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400 transition resize-none"
                  />
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full cyber-button-primary py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-xl disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Project Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
