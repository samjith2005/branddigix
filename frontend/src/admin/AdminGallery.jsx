import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Plus, Trash2, Edit2, Upload, Check, X, Eye, EyeOff, Image as ImageIcon } from 'lucide-react';

export const AdminGallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    title: '',
    category: 'Brand Designs',
    image: '',
    description: '',
    status: 'Published'
  });

  const loadGallery = async () => {
    try {
      const res = await api.adminGetGallery();
      if (res.success) setItems(res.data);
    } catch (err) {
      console.error('Error fetching admin gallery:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const openAdd = () => {
    setEditingItem(null);
    setForm({
      title: '',
      category: 'Brand Designs',
      image: '',
      description: '',
      status: 'Published'
    });
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setForm({
      title: item.title,
      category: item.category,
      image: item.image,
      description: item.description || '',
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
        setForm(prev => ({ ...prev, image: res.url }));
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
        const res = await api.adminUpdateGallery(editingItem.id, form);
        if (res.success) {
          setShowModal(false);
          loadGallery();
        }
      } else {
        const res = await api.adminCreateGallery(form);
        if (res.success) {
          setShowModal(false);
          loadGallery();
        }
      }
    } catch (err) {
      alert('Error saving gallery item');
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Published' ? 'Hidden' : 'Published';
    try {
      const res = await api.adminToggleGalleryStatus(id, newStatus);
      if (res.success) {
        setItems(prev => prev.map(i => i.id === id ? { ...i, status: newStatus } : i));
      }
    } catch (err) {
      alert('Failed to change status');
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete gallery image "${title}"?`)) return;
    try {
      const res = await api.adminDeleteGallery(id);
      if (res.success) {
        setItems(prev => prev.filter(i => i.id !== id));
      }
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-white">Gallery Management</h2>
          <p className="text-slate-400 text-xs mt-1">
            Upload and organize visual showcases for Brand Designs, Websites, Logos, UI/UX, and Events.
          </p>
        </div>

        <button
          onClick={openAdd}
          className="cyber-button-primary px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Image</span>
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16 text-slate-400">Loading gallery items...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.id} className="glass-card rounded-2xl overflow-hidden group flex flex-col justify-between">
              <div>
                <div className="relative aspect-square overflow-hidden bg-slate-950">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-black/80 text-cyan-300 border border-slate-700">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h4 className="font-bold text-white text-sm truncate font-heading">{item.title}</h4>
                  {item.description && (
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">{item.description}</p>
                  )}
                </div>
              </div>

              <div className="p-4 pt-0 flex items-center justify-between border-t border-slate-800/60 mt-2">
                <button
                  onClick={() => toggleStatus(item.id, item.status)}
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                    item.status === 'Published'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  {item.status === 'Published' ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  <span>{item.status}</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEdit(item)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.title)}
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
                {editingItem ? 'Edit Gallery Image' : 'Upload Gallery Image'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Modern Brand Visuals"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Category *</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="Brand Designs">Brand Designs</option>
                  <option value="Website Designs">Website Designs</option>
                  <option value="Logo Designs">Logo Designs</option>
                  <option value="UI/UX">UI/UX</option>
                  <option value="Team">Team</option>
                  <option value="Events">Events</option>
                  <option value="Behind the Scenes">Behind the Scenes</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Image *</label>
                <input
                  type="text"
                  required
                  placeholder="Paste Image URL or upload below"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400 mb-2"
                />
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Image</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                  {uploading && <span className="text-xs text-cyan-400">Uploading...</span>}
                  {form.image && (
                    <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                      <Check className="w-3 h-3" /> Image ready
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Brief note or concept backstory..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400 resize-none"
                />
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
