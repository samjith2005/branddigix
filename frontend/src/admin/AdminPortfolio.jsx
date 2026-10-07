import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Plus, Edit2, Trash2, Check, X, Upload, Briefcase, Eye, EyeOff, ExternalLink } from 'lucide-react';

export const AdminPortfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [uploadingCover, setUploadingCover] = useState(false);

  const [form, setForm] = useState({
    project_name: '',
    category: 'Web Development',
    project_type: 'Client Project',
    short_description: '',
    full_description: '',
    challenge: '',
    solution: '',
    cover_image: '',
    project_images: [],
    technologies: '',
    services_provided: '',
    live_url: '',
    completion_date: '',
    status: 'Published'
  });

  const loadProjects = async () => {
    try {
      const res = await api.adminGetPortfolio();
      if (res.success) setProjects(res.data);
    } catch (err) {
      console.error('Error fetching admin portfolio:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const openAddModal = () => {
    setEditingProject(null);
    setForm({
      project_name: '',
      category: 'Web Development',
      project_type: 'Client Project',
      short_description: '',
      full_description: '',
      challenge: '',
      solution: '',
      cover_image: '',
      project_images: [],
      technologies: '',
      services_provided: '',
      live_url: '',
      completion_date: '',
      status: 'Published'
    });
    setShowModal(true);
  };

  const openEditModal = (proj) => {
    setEditingProject(proj);
    setForm({
      project_name: proj.project_name,
      category: proj.category,
      project_type: proj.project_type || 'Client Project',
      short_description: proj.short_description,
      full_description: proj.full_description || proj.short_description,
      challenge: proj.challenge || '',
      solution: proj.solution || '',
      cover_image: proj.cover_image,
      project_images: proj.project_images || [],
      technologies: proj.technologies || '',
      services_provided: proj.services_provided || '',
      live_url: proj.live_url || '',
      completion_date: proj.completion_date || '',
      status: proj.status || 'Published'
    });
    setShowModal(true);
  };

  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingCover(true);
    try {
      const res = await api.uploadImage(file);
      if (res.success) {
        setForm(prev => ({ ...prev, cover_image: res.url }));
      }
    } catch (err) {
      alert('Cover upload failed');
    } finally {
      setUploadingCover(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProject) {
        const res = await api.adminUpdatePortfolio(editingProject.id, form);
        if (res.success) {
          setShowModal(false);
          loadProjects();
        } else {
          alert(res.message || 'Update failed');
        }
      } else {
        const res = await api.adminCreatePortfolio(form);
        if (res.success) {
          setShowModal(false);
          loadProjects();
        } else {
          alert(res.message || 'Creation failed');
        }
      }
    } catch (err) {
      alert('Error saving project');
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Published' ? 'Draft' : 'Published';
    try {
      const res = await api.adminTogglePortfolioStatus(id, newStatus);
      if (res.success) {
        setProjects(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
      }
    } catch (err) {
      alert('Status change error');
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete project "${name}"?`)) return;
    try {
      const res = await api.adminDeletePortfolio(id);
      if (res.success) {
        setProjects(prev => prev.filter(p => p.id !== id));
      }
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-white">Portfolio Management</h2>
          <p className="text-slate-400 text-xs mt-1">
            Publish client case studies, prototypes, and concept projects to "Our Work".
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="cyber-button-primary px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects Grid/Table */}
      {loading ? (
        <div className="text-center py-16 text-slate-400">Loading portfolio items...</div>
      ) : (
        <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 uppercase tracking-wider font-semibold text-[10px]">
                  <th className="py-3 px-4">Project</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Live URL</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {projects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-slate-900/40 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={proj.cover_image}
                          alt={proj.project_name}
                          className="w-12 h-10 rounded-lg object-cover bg-slate-950 shrink-0 border border-slate-800"
                        />
                        <div className="min-w-0 max-w-xs">
                          <div className="font-bold text-white text-sm font-heading">{proj.project_name}</div>
                          <div className="text-[11px] text-slate-400 line-clamp-1">{proj.short_description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-cyan-300 font-medium">{proj.category}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        proj.project_type?.includes('Concept')
                          ? 'bg-amber-950 text-amber-300 border border-amber-500/30'
                          : 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        {proj.project_type || 'Client'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      {proj.live_url ? (
                        <a
                          href={proj.live_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-cyan-400 hover:underline flex items-center gap-1"
                        >
                          <span>Visit</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => toggleStatus(proj.id, proj.status)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1.5 transition ${
                          proj.status === 'Published'
                            ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                            : 'bg-amber-950/80 text-amber-300 border border-amber-500/40'
                        }`}
                      >
                        {proj.status === 'Published' ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        <span>{proj.status}</span>
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(proj)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(proj.id, proj.project_name)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition"
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

      {/* Add / Edit Project Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0A0F26] border border-cyan-500/30 rounded-2xl w-full max-w-3xl p-6 shadow-2xl relative my-8 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4 shrink-0">
              <h3 className="text-xl font-bold font-heading text-white">
                {editingProject ? 'Edit Project' : 'Add New Portfolio Project'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto pr-1">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Project Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. KARUPPATTI CAFE"
                    value={form.project_name}
                    onChange={(e) => setForm({ ...form, project_name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Project Type *</label>
                  <select
                    value={form.project_type}
                    onChange={(e) => setForm({ ...form, project_type: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Client Project">Client Project</option>
                    <option value="Concept Project">Concept Project</option>
                    <option value="Demo Project">Demo Project</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="UI/UX">UI/UX</option>
                    <option value="Branding">Branding</option>
                    <option value="Logo Design">Logo Design</option>
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="Digital Solutions">Digital Solutions</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Completion Date</label>
                  <input
                    type="text"
                    placeholder="e.g. February 2026"
                    value={form.completion_date}
                    onChange={(e) => setForm({ ...form, completion_date: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Short Summary *</label>
                <input
                  type="text"
                  required
                  placeholder="One sentence summary for project cards..."
                  value={form.short_description}
                  onChange={(e) => setForm({ ...form, short_description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Narrative / Story</label>
                <textarea
                  rows={3}
                  placeholder="Detailed breakdown of the project background..."
                  value={form.full_description}
                  onChange={(e) => setForm({ ...form, full_description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">The Challenge</label>
                  <textarea
                    rows={2}
                    placeholder="What problem did the client or market face?"
                    value={form.challenge}
                    onChange={(e) => setForm({ ...form, challenge: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">The Solution</label>
                  <textarea
                    rows={2}
                    placeholder="How did BRANDDIGIX engineer the solution?"
                    value={form.solution}
                    onChange={(e) => setForm({ ...form, solution: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400 resize-none"
                  />
                </div>
              </div>

              {/* Cover Image Upload / URL */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Cover Image *</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    required
                    placeholder="Paste image URL or upload below"
                    value={form.cover_image}
                    onChange={(e) => setForm({ ...form, cover_image: e.target.value })}
                    className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Cover Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverUpload}
                      className="hidden"
                    />
                  </label>
                  {uploadingCover && <span className="text-xs text-cyan-400">Uploading...</span>}
                  {form.cover_image && (
                    <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                      <Check className="w-3 h-3" /> Cover image set
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Technologies & Tools</label>
                  <input
                    type="text"
                    placeholder="e.g. React, Tailwind CSS, Node.js, Figma"
                    value={form.technologies}
                    onChange={(e) => setForm({ ...form, technologies: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Services Provided</label>
                  <input
                    type="text"
                    placeholder="e.g. Brand Identity, Web Development, UI/UX"
                    value={form.services_provided}
                    onChange={(e) => setForm({ ...form, services_provided: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Live Demo URL (Optional)</label>
                  <input
                    type="url"
                    placeholder="https://client-demo.com"
                    value={form.live_url}
                    onChange={(e) => setForm({ ...form, live_url: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
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
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800 shrink-0">
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
                  {editingProject ? 'Save Changes' : 'Publish Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
