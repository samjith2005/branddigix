import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Plus, Edit2, Trash2, Check, X, Upload, Layers, Eye, EyeOff } from 'lucide-react';

export const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    category: 'Web Development',
    description: '',
    image: '',
    price: '',
    status: 'Published'
  });

  const loadServices = async () => {
    try {
      const res = await api.adminGetServices();
      if (res.success) setServices(res.data);
    } catch (err) {
      console.error('Error fetching admin services:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const openAddModal = () => {
    setEditingService(null);
    setForm({
      name: '',
      category: 'Web Development',
      description: '',
      image: '',
      price: '',
      status: 'Published'
    });
    setShowModal(true);
  };

  const openEditModal = (service) => {
    setEditingService(service);
    setForm({
      name: service.name,
      category: service.category,
      description: service.description,
      image: service.image || '',
      price: service.price || '',
      status: service.status || 'Published'
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
      } else {
        alert(res.message || 'Image upload failed');
      }
    } catch (err) {
      alert('Upload error');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingService) {
        const res = await api.adminUpdateService(editingService.id, form);
        if (res.success) {
          setShowModal(false);
          loadServices();
        } else {
          alert(res.message || 'Failed to update service');
        }
      } else {
        const res = await api.adminCreateService(form);
        if (res.success) {
          setShowModal(false);
          loadServices();
        } else {
          alert(res.message || 'Failed to add service');
        }
      }
    } catch (err) {
      alert('Error saving service');
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Published' ? 'Draft' : 'Published';
    try {
      const res = await api.adminToggleServiceStatus(id, newStatus);
      if (res.success) {
        setServices(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
      }
    } catch (err) {
      alert('Failed to change status');
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete service "${name}"?`)) return;
    try {
      const res = await api.adminDeleteService(id);
      if (res.success) {
        setServices(prev => prev.filter(s => s.id !== id));
      }
    } catch (err) {
      alert('Failed to delete service');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-white">Service Management</h2>
          <p className="text-slate-400 text-xs mt-1">
            Services added or updated here appear automatically on the public website.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="cyber-button-primary px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Services Table */}
      {loading ? (
        <div className="text-center py-16 text-slate-400">Loading services...</div>
      ) : (
        <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 uppercase tracking-wider font-semibold text-[10px]">
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Pricing</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {services.map((srv) => (
                  <tr key={srv.id} className="hover:bg-slate-900/40 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={srv.image || 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=100&q=80'}
                          alt={srv.name}
                          className="w-10 h-10 rounded-lg object-cover bg-slate-950 shrink-0 border border-slate-800"
                        />
                        <div className="min-w-0 max-w-xs">
                          <div className="font-bold text-white text-sm font-heading">{srv.name}</div>
                          <div className="text-[11px] text-slate-400 line-clamp-1">{srv.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-cyan-300 font-medium">{srv.category}</td>
                    <td className="py-3 px-4 text-slate-300">{srv.price || 'Contact for quote'}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => toggleStatus(srv.id, srv.status)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1.5 transition ${
                          srv.status === 'Published'
                            ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                            : 'bg-amber-950/80 text-amber-300 border border-amber-500/40'
                        }`}
                        title="Click to toggle publish status"
                      >
                        {srv.status === 'Published' ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        <span>{srv.status}</span>
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(srv)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition"
                          title="Edit Service"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(srv.id, srv.name)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition"
                          title="Delete Service"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-[#0A0F26] border border-cyan-500/30 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-2xl relative my-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <h3 className="text-xl font-bold font-heading text-white">
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Service Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Website Development"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Branding">Branding</option>
                    <option value="UI/UX">UI/UX</option>
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="Digital Solutions">Digital Solutions</option>
                    <option value="Theme Creations">Theme Creations</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Starting Price (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Starting from ₹14,999"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Detailed description of deliverables and benefits..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              {/* Service Image (URL or Upload) */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Service Image</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Paste Image URL or choose file below"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Image File</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  {uploading && <span className="text-xs text-cyan-400">Uploading...</span>}
                  {form.image && (
                    <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                      <Check className="w-3 h-3" /> Image linked
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="Published">Published (Visible on site)</option>
                  <option value="Draft">Draft (Hidden)</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cyber-button-primary px-5 py-2 rounded-xl text-xs font-semibold"
                >
                  {editingService ? 'Save Changes' : 'Publish Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
