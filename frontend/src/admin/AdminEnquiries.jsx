import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import {
  Mail,
  Phone,
  MessageSquare,
  Trash2,
  Eye,
  X,
  Send,
  Building,
  DollarSign,
  Calendar,
  CheckCircle,
  FileText
} from 'lucide-react';

export const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('All');
  const [activeModalEnquiry, setActiveModalEnquiry] = useState(null);
  const [notes, setNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);

  const loadEnquiries = async () => {
    try {
      const res = await api.adminGetEnquiries(filterStatus);
      if (res.success) setEnquiries(res.data);
    } catch (err) {
      console.error('Error fetching admin enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, [filterStatus]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await api.adminUpdateEnquiryStatus(id, newStatus);
      if (res.success) {
        setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status: newStatus } : e));
        if (activeModalEnquiry && activeModalEnquiry.id === id) {
          setActiveModalEnquiry(prev => ({ ...prev, status: newStatus }));
        }
      }
    } catch (err) {
      alert('Status change error');
    }
  };

  const openDetail = (enq) => {
    setActiveModalEnquiry(enq);
    setNotes(enq.notes || '');
  };

  const handleSaveNotes = async () => {
    if (!activeModalEnquiry) return;
    setSavingNotes(true);
    try {
      const res = await api.adminUpdateEnquiryNotes(activeModalEnquiry.id, notes);
      if (res.success) {
        setEnquiries(prev => prev.map(e => e.id === activeModalEnquiry.id ? { ...e, notes } : e));
        setActiveModalEnquiry(prev => ({ ...prev, notes }));
        alert('Notes saved successfully!');
      }
    } catch (err) {
      alert('Failed to save notes');
    } finally {
      setSavingNotes(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete enquiry from "${name}"?`)) return;
    try {
      const res = await api.adminDeleteEnquiry(id);
      if (res.success) {
        setEnquiries(prev => prev.filter(e => e.id !== id));
        if (activeModalEnquiry?.id === id) setActiveModalEnquiry(null);
      }
    } catch (err) {
      alert('Delete failed');
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

  const statuses = ['All', 'New', 'Contacted', 'Converted', 'Closed'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-white">Client Enquiries & Pipeline</h2>
          <p className="text-slate-400 text-xs mt-1">
            Real-time contact submissions from website visitors. Track conversation status and client requirements.
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 self-start">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                filterStatus === st
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Enquiries Table */}
      {loading ? (
        <div className="text-center py-16 text-slate-400">Loading enquiries...</div>
      ) : enquiries.length === 0 ? (
        <div className="text-center py-16 text-slate-400 bg-slate-900/40 rounded-2xl border border-slate-800">
          No enquiries matching "{filterStatus}" status.
        </div>
      ) : (
        <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 uppercase tracking-wider font-semibold text-[10px]">
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">Budget</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {enquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-slate-900/40 transition">
                    <td className="py-3 px-4">
                      <div className="font-bold text-white text-sm font-heading">{enq.name}</div>
                      <div className="text-[11px] text-slate-400">{enq.company || 'Individual'}</div>
                      <div className="text-[11px] text-cyan-400/90 font-mono mt-0.5">{enq.phone} • {enq.email}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-slate-200">{enq.service}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-300">{enq.budget || 'Not specified'}</td>
                    <td className="py-3 px-4 text-slate-400 text-[11px]">
                      {new Date(enq.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={enq.status}
                        onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border bg-slate-900 cursor-pointer ${getStatusBadge(enq.status)}`}
                      >
                        <option value="New">🟡 New</option>
                        <option value="Contacted">🔵 Contacted</option>
                        <option value="Converted">🟢 Converted</option>
                        <option value="Closed">⚫ Closed</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openDetail(enq)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition"
                          title="View Full Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <a
                          href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition"
                          title="WhatsApp Client"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </a>

                        <a
                          href={`mailto:${enq.email}?subject=BRANDDIGIX - In response to your inquiry for ${enq.service}`}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition"
                          title="Email Client"
                        >
                          <Mail className="w-4 h-4" />
                        </a>

                        <button
                          onClick={() => handleDelete(enq.id, enq.name)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition"
                          title="Delete Enquiry"
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

      {/* Enquiry Detail & Follow-up Modal */}
      {activeModalEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="bg-[#0A0F26] border border-cyan-500/30 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-5 sm:p-8 shadow-2xl relative my-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusBadge(activeModalEnquiry.status)}`}>
                  {activeModalEnquiry.status}
                </span>
                <span className="text-xs text-slate-400">
                  Received on {new Date(activeModalEnquiry.created_at).toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => setActiveModalEnquiry(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold font-heading text-white">
                  {activeModalEnquiry.name}
                </h3>
                {activeModalEnquiry.company && (
                  <div className="text-cyan-400 text-sm font-semibold flex items-center gap-1.5 mt-0.5">
                    <Building className="w-4 h-4" />
                    <span>{activeModalEnquiry.company}</span>
                  </div>
                )}
              </div>

              {/* Contact Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-cyan-400" />
                    <span className="text-slate-200 font-mono">{activeModalEnquiry.phone}</span>
                  </div>
                  <a
                    href={`https://wa.me/${activeModalEnquiry.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-400 hover:underline font-semibold"
                  >
                    WhatsApp
                  </a>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2 truncate pr-2">
                    <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="text-slate-200 truncate">{activeModalEnquiry.email}</span>
                  </div>
                  <a
                    href={`mailto:${activeModalEnquiry.email}`}
                    className="text-cyan-400 hover:underline font-semibold shrink-0"
                  >
                    Reply
                  </a>
                </div>
              </div>

              {/* Requirement Meta */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Service Requested</span>
                  <span className="text-sm font-bold text-white font-heading">{activeModalEnquiry.service}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Budget Range</span>
                  <span className="text-sm font-bold text-white font-heading">{activeModalEnquiry.budget || 'Not specified'}</span>
                </div>
              </div>

              {/* Full Message */}
              <div>
                <h4 className="text-xs uppercase font-bold text-slate-400 mb-2">Client Project Message:</h4>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                  {activeModalEnquiry.message}
                </div>
              </div>

              {/* Follow-up Notes */}
              <div>
                <h4 className="text-xs uppercase font-bold text-slate-400 mb-2 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Internal Follow-up Notes:</span>
                </h4>
                <div className="flex gap-2">
                  <textarea
                    rows={2}
                    placeholder="Log call updates, quoted amounts, next follow-up date..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400 resize-none"
                  />
                  <button
                    onClick={handleSaveNotes}
                    disabled={savingNotes}
                    className="cyber-button-primary px-4 rounded-xl text-xs font-semibold self-stretch"
                  >
                    {savingNotes ? 'Saving...' : 'Save Note'}
                  </button>
                </div>
              </div>

              {/* Pipeline Status Action */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium">Update Status:</span>
                  <select
                    value={activeModalEnquiry.status}
                    onChange={(e) => handleStatusChange(activeModalEnquiry.id, e.target.value)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border bg-slate-900 ${getStatusBadge(activeModalEnquiry.status)}`}
                  >
                    <option value="New">🟡 New</option>
                    <option value="Contacted">🔵 Contacted</option>
                    <option value="Converted">🟢 Converted</option>
                    <option value="Closed">⚫ Closed</option>
                  </select>
                </div>

                <button
                  onClick={() => setActiveModalEnquiry(null)}
                  className="px-5 py-2 rounded-xl border border-slate-700 text-slate-300 text-xs hover:text-white"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
