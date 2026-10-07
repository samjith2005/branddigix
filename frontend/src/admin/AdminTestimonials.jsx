import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Plus, Trash2, Edit2, Upload, Check, X, Eye, EyeOff, Star } from 'lucide-react';

export const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    client_name: '',
    company: '',
    profile_image: '',
    testimonial: '',
    rating: 5,
    status: 'Published'
  });

  const loadTestimonials = async () => {
    try {
      const res = await api.adminGetTestimonials();
      if (res.success) setTestimonials(res.data);
    } catch (err) {
      console.error('Error fetching admin testimonials:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const openAdd = () => {
    setEditingItem(null);
    setForm({
      client_name: '',
      company: '',
      profile_image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      testimonial: '',
      rating: 5,
      status: 'Published'
    });
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setForm({
      client_name: item.client_name,
      company: item.company,
      profile_image: item.profile_image || '',
      testimonial: item.testimonial,
      rating: item.rating || 5,
      status: item.status || 'Published'
    });
    setShowModal(true);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await api.uploadImage(file);
      if (res.success) {
        setForm(prev => ({ ...prev, profile_image: res.url }));
      }
    } catch (err) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        const res = await api.adminUpdateTestimonial(editingItem.id, form);
        if (res.success) {
          setShowModal(false);
          loadTestimonials();
        }
      } else {
        const res = await api.adminCreateTestimonial(form);
        if (res.success) {
          setShowModal(false);
          loadTestimonials();
        }
      }
    } catch (err) {
      alert('Error saving testimonial');
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Published' ? 'Hidden' : 'Published';
    try {
      const res = await api.adminToggleTestimonialStatus(id, newStatus);
      if (res.success) {
        setTestimonials(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
      }
    } catch (err) {
      alert('Status toggle failed');
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete review from "${name}"?`)) return;
    try {
      const res = await api.adminDeleteTestimonial(id);
      if (res.success) {
        setTestimonials(prev => prev.filter(t => t.id !== id));
      }
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-white">Testimonial Management</h2>
          <p className="text-slate-400 text-xs mt-1">
            Manage client reviews and feedback displayed on the homepage and review page.
          </p>
        </div>

        <button
          onClick={openAdd}
          className="cyber-button-primary px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16 text-slate-400">Loading testimonials...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="glass-card p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>

                  <button
                    onClick={() => toggleStatus(t.id, t.status)}
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                      t.status === 'Published'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {t.status === 'Published' ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    <span>{t.status}</span>
                  </button>
                </div>

                <p className="text-xs text-slate-300 italic leading-relaxed line-clamp-4">
                  "{t.testimonial}"
                </p>
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-800/80">
                <div className="flex items-center gap-2.5">
                  <img
                    src={t.profile_image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                    alt={t.client_name}
                    className="w-8 h-8 rounded-full object-cover border border-cyan-400/40"
                  />
                  <div>
                    <h5 className="font-bold text-white text-xs">{t.client_name}</h5>
                    <p className="text-[10px] text-cyan-400">{t.company}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEdit(t)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(t.id, t.client_name)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-[#0A0F26] border border-cyan-500/30 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-2xl relative my-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h3 className="text-xl font-bold font-heading text-white">
                {editingItem ? 'Edit Testimonial' : 'Add Testimonial'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Client Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senthil Kumar"
                    value={form.client_name}
                    onChange={(e) => setForm({ ...form, client_name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Company / Brand *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Karuppatti Cafe"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Profile Avatar Image</label>
                <input
                  type="text"
                  placeholder="Paste URL or upload below"
                  value={form.profile_image}
                  onChange={(e) => setForm({ ...form, profile_image: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400 mb-2"
                />
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Avatar</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                  {uploading && <span className="text-xs text-cyan-400">Uploading...</span>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Testimonial Quote *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Client feedback and comments..."
                  value={form.testimonial}
                  onChange={(e) => setForm({ ...form, testimonial: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Rating (1 to 5)</label>
                  <select
                    value={form.rating}
                    onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Published">Published</option>
                    <option value="Hidden">Hidden</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 text-xs"
                >
                  Cancel
                </button>
                <button type="submit" className="cyber-button-primary px-5 py-2 rounded-xl text-xs font-semibold">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
