import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import {
  Layers,
  Briefcase,
  Image as ImageIcon,
  Mail,
  Star,
  ArrowRight,
  Plus,
  Clock,
  CheckCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const AdminDashboard = ({ setActiveTab }) => {
  const [stats, setStats] = useState(null);
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [recentProjects, setRecentProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDashboardData = async () => {
    try {
      const [statsRes, enqRes, portRes] = await Promise.all([
        api.adminGetStats(),
        api.adminGetEnquiries('All'),
        api.adminGetPortfolio()
      ]);

      if (statsRes.success) setStats(statsRes.data);
      if (enqRes.success) setRecentEnquiries(enqRes.data.slice(0, 5));
      if (portRes.success) setRecentProjects(portRes.data.slice(0, 4));
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleStatusChange = async (enquiryId, newStatus) => {
    try {
      const res = await api.adminUpdateEnquiryStatus(enquiryId, newStatus);
      if (res.success) {
        setRecentEnquiries(prev =>
          prev.map(e => (e.id === enquiryId ? { ...e, status: newStatus } : e))
        );
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'New':
        return 'bg-amber-950/80 border-amber-500/40 text-amber-300';
      case 'Contacted':
        return 'bg-sky-950/80 border-sky-500/40 text-sky-300';
      case 'Converted':
        return 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300';
      case 'Closed':
        return 'bg-slate-800 border-slate-700 text-slate-400';
      default:
        return 'bg-slate-800 border-slate-700 text-slate-300';
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-slate-400">Loading admin metrics...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-white">
            Welcome to BRANDDIGIX Control Center
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Manage your live services, portfolio showcase, gallery, client testimonials, and incoming leads.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('services')}
            className="cyber-button-primary px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Service</span>
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className="cyber-button-secondary px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Project</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Services Card */}
        <div
          onClick={() => setActiveTab('services')}
          className="glass-card p-5 rounded-2xl cursor-pointer hover:border-cyan-400 transition"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Total Services</span>
            <div className="p-2 rounded-lg bg-cyan-950 text-cyan-400">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black font-heading text-white">
            {stats?.services || 0}
          </div>
          <div className="text-[11px] text-cyan-400 mt-1 flex items-center gap-1">
            <span>Manage services</span>
            <ChevronRight className="w-3 h-3" />
          </div>
        </div>

        {/* Portfolio Card */}
        <div
          onClick={() => setActiveTab('portfolio')}
          className="glass-card p-5 rounded-2xl cursor-pointer hover:border-cyan-400 transition"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Portfolio Work</span>
            <div className="p-2 rounded-lg bg-cyan-950 text-cyan-400">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black font-heading text-white">
            {stats?.portfolio || 0}
          </div>
          <div className="text-[11px] text-cyan-400 mt-1 flex items-center gap-1">
            <span>Manage projects</span>
            <ChevronRight className="w-3 h-3" />
          </div>
        </div>

        {/* Gallery Card */}
        <div
          onClick={() => setActiveTab('gallery')}
          className="glass-card p-5 rounded-2xl cursor-pointer hover:border-cyan-400 transition"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Gallery Items</span>
            <div className="p-2 rounded-lg bg-cyan-950 text-cyan-400">
              <ImageIcon className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black font-heading text-white">
            {stats?.gallery || 0}
          </div>
          <div className="text-[11px] text-cyan-400 mt-1 flex items-center gap-1">
            <span>Manage media</span>
            <ChevronRight className="w-3 h-3" />
          </div>
        </div>

        {/* Enquiries Card */}
        <div
          onClick={() => setActiveTab('enquiries')}
          className="glass-card p-5 rounded-2xl cursor-pointer hover:border-amber-400 transition relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Enquiries</span>
            <div className="p-2 rounded-lg bg-amber-950 text-amber-400">
              <Mail className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black font-heading text-white">
              {stats?.enquiries?.total || 0}
            </span>
            {stats?.enquiries?.new > 0 && (
              <span className="text-xs font-bold text-amber-400 animate-pulse">
                ({stats.enquiries.new} New)
              </span>
            )}
          </div>
          <div className="text-[11px] text-amber-400 mt-1 flex items-center gap-1">
            <span>View pipeline</span>
            <ChevronRight className="w-3 h-3" />
          </div>
        </div>

        {/* Testimonials Card */}
        <div
          onClick={() => setActiveTab('testimonials')}
          className="glass-card p-5 rounded-2xl cursor-pointer hover:border-cyan-400 transition"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Reviews</span>
            <div className="p-2 rounded-lg bg-cyan-950 text-cyan-400">
              <Star className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black font-heading text-white">
            {stats?.testimonials || 0}
          </div>
          <div className="text-[11px] text-cyan-400 mt-1 flex items-center gap-1">
            <span>Manage reviews</span>
            <ChevronRight className="w-3 h-3" />
          </div>
        </div>
      </div>

      {/* Two Column Layout: Recent Enquiries & Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Enquiries (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-cyan-400" />
              <h3 className="text-base font-bold font-heading text-white">
                Recent Client Enquiries
              </h3>
            </div>
            <button
              onClick={() => setActiveTab('enquiries')}
              className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {recentEnquiries.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500">No enquiries received yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold text-[10px]">
                    <th className="py-2.5 px-3">Client</th>
                    <th className="py-2.5 px-3">Service</th>
                    <th className="py-2.5 px-3">Phone</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {recentEnquiries.map((enq) => (
                    <tr key={enq.id} className="hover:bg-slate-900/40">
                      <td className="py-3 px-3">
                        <div className="font-semibold text-white">{enq.name}</div>
                        <div className="text-[10px] text-slate-400">{enq.company || enq.email}</div>
                      </td>
                      <td className="py-3 px-3 text-slate-300">{enq.service}</td>
                      <td className="py-3 px-3 text-slate-300 font-mono text-[11px]">{enq.phone}</td>
                      <td className="py-3 px-3">
                        <select
                          value={enq.status}
                          onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                          className={`px-2 py-1 rounded-md text-[11px] font-semibold border bg-slate-900 cursor-pointer ${getStatusBadge(enq.status)}`}
                        >
                          <option value="New">🟡 New</option>
                          <option value="Contacted">🔵 Contacted</option>
                          <option value="Converted">🟢 Converted</option>
                          <option value="Closed">⚫ Closed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent Projects (5 cols) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-cyan-400" />
              <h3 className="text-base font-bold font-heading text-white">
                Live Portfolio Items
              </h3>
            </div>
            <button
              onClick={() => setActiveTab('portfolio')}
              className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Manage</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {recentProjects.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/30 transition"
              >
                <img
                  src={p.cover_image}
                  alt={p.project_name}
                  className="w-12 h-12 rounded-lg object-cover bg-slate-950 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-white truncate font-heading">{p.project_name}</div>
                  <div className="text-[10px] text-cyan-400">{p.category}</div>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  p.status === 'Published'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}>
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
