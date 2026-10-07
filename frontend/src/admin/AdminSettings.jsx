import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Save, Check, Lock, Globe, Mail, Phone, MapPin, Sparkles, Shield } from 'lucide-react';

export const AdminSettings = () => {
  const [settings, setSettings] = useState({
    brand_name: 'BRANDDIGIX',
    tagline: 'WE BUILD DIGITAL BRANDS',
    official_email: 'branddigix@gmail.com',
    instagram: '@branddigix.in',
    phone: '+91 80158 10518',
    whatsapp: '+91 80158 10518',
    address: 'Chennai & Coimbatore, Tamil Nadu, India',
    hero_title: 'Build Your Brand. Build Your Digital Future.',
    hero_subtitle: 'BRANDDIGIX helps businesses build their digital presence through creative design, websites and custom digital solutions.',
    cta_primary: 'Explore Services',
    cta_secondary: 'View Our Work',
    social_instagram: 'https://instagram.com/branddigix.in',
    social_facebook: 'https://facebook.com/branddigix',
    social_linkedin: 'https://linkedin.com/company/branddigix',
    social_youtube: 'https://youtube.com/@branddigix',
    vision: '',
    mission: ''
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Password Change state
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '' });
  const [passMsg, setPassMsg] = useState('');
  const [passError, setPassError] = useState('');

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const res = await api.getSettings();
        if (res.success && res.data) {
          setSettings(prev => ({ ...prev, ...res.data }));
        }
      } catch (err) {
        console.error('Error fetching settings:', err);
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.adminUpdateSettings(settings);
      if (res.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        alert(res.message || 'Failed to update settings');
      }
    } catch (err) {
      alert('Error updating settings');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPassMsg('');
    setPassError('');
    try {
      const res = await api.changePassword(passwords);
      if (res.success) {
        setPassMsg('Password changed successfully!');
        setPasswords({ currentPassword: '', newPassword: '' });
      } else {
        setPassError(res.message || 'Failed to change password');
      }
    } catch (err) {
      setPassError('Password update failed');
    }
  };

  if (loading) {
    return <div className="text-center py-16 text-slate-400">Loading settings...</div>;
  }

  return (
    <div className="space-y-10 max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold font-heading text-white">Website & Branding Settings</h2>
        <p className="text-slate-400 text-xs mt-1">
          Customize contact information, social links, homepage hero copy, and admin security without touching any code.
        </p>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>Website settings successfully saved and applied to the public website!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Contact Information */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-5">
          <h3 className="text-base font-bold font-heading text-white flex items-center gap-2">
            <Mail className="w-4 h-4 text-cyan-400" />
            <span>Public Contact Details</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Official Email</label>
              <input
                type="email"
                name="official_email"
                value={settings.official_email}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Instagram Handle</label>
              <input
                type="text"
                name="instagram"
                value={settings.instagram}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={settings.phone}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp Number</label>
              <input
                type="text"
                name="whatsapp"
                value={settings.whatsapp}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Office / Studio Address</label>
              <input
                type="text"
                name="address"
                value={settings.address}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>
        </div>

        {/* Homepage Hero Copy Customizer */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-5">
          <h3 className="text-base font-bold font-heading text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Homepage Hero Copy Customizer</span>
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Hero Main Title</label>
              <input
                type="text"
                name="hero_title"
                value={settings.hero_title}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Hero Subtitle / Description</label>
              <textarea
                rows={2}
                name="hero_subtitle"
                value={settings.hero_subtitle}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Button Label</label>
                <input
                  type="text"
                  name="cta_primary"
                  value={settings.cta_primary}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Secondary Button Label</label>
                <input
                  type="text"
                  name="cta_secondary"
                  value={settings.cta_secondary}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-5">
          <h3 className="text-base font-bold font-heading text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            <span>Social Media Channels</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Instagram URL</label>
              <input
                type="url"
                name="social_instagram"
                value={settings.social_instagram}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Facebook URL</label>
              <input
                type="url"
                name="social_facebook"
                value={settings.social_facebook}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">LinkedIn URL</label>
              <input
                type="url"
                name="social_linkedin"
                value={settings.social_linkedin}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">YouTube URL</label>
              <input
                type="url"
                name="social_youtube"
                value={settings.social_youtube}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div>
          <button
            type="submit"
            disabled={saving}
            className="cyber-button-primary px-8 py-3 rounded-xl font-bold text-xs flex items-center gap-2 shadow-xl"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save All Settings'}</span>
          </button>
        </div>
      </form>

      {/* Admin Password Change Form */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-5 pt-8">
        <h3 className="text-base font-bold font-heading text-white flex items-center gap-2">
          <Shield className="w-4 h-4 text-rose-400" />
          <span>Change Admin Password</span>
        </h3>

        {passMsg && (
          <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs">
            {passMsg}
          </div>
        )}
        {passError && (
          <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs">
            {passError}
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Current Password</label>
            <input
              type="password"
              required
              placeholder="Current password"
              value={passwords.currentPassword}
              onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">New Password</label>
            <input
              type="password"
              required
              placeholder="Enter new password"
              value={passwords.newPassword}
              onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
            >
              Update Admin Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
