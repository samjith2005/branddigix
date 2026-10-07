import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Calendar, Layers, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export const ProjectModal = ({ project, onClose, onOpenQuote }) => {
  useEffect(() => {
    if (project) {
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
  }, [project, onClose]);

  if (!project) return null;

  const images = [
    project.cover_image,
    ...(Array.isArray(project.project_images) ? project.project_images : [])
  ].filter(Boolean);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const techList = project.technologies
    ? project.technologies.split(',').map((t) => t.trim())
    : [];

  const servicesList = project.services_provided
    ? project.services_provided.split(',').map((s) => s.trim())
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-[#0A0F26] border border-cyan-500/30 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-[0_0_50px_rgba(0,210,255,0.2)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-[#070B1F]/90">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
              {project.category}
            </span>
            <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
              project.project_type?.includes('Concept') 
                ? 'bg-amber-950/70 border border-amber-500/40 text-amber-300'
                : 'bg-emerald-950/70 border border-emerald-500/40 text-emerald-300'
            }`}>
              {project.project_type || 'Client Project'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Main Visual Display */}
          <div className="space-y-3">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
              <img
                src={images[activeImageIndex] || project.cover_image}
                alt={project.project_name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail switcher if multiple images */}
            {images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition ${
                      activeImageIndex === idx
                        ? 'border-cyan-400 shadow-[0_0_10px_rgba(0,210,255,0.5)]'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Project Title & Meta */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
                {project.project_name}
              </h2>
              <p className="text-cyan-400 text-sm mt-1 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{project.completion_date || 'Recently Completed'}</span>
              </p>
            </div>

            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-button-primary px-5 py-2 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shrink-0"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Detailed Narrative */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2 font-heading flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  About the Project
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                  {project.full_description || project.short_description}
                </p>
              </div>

              {/* Challenge & Solution */}
              {(project.challenge || project.solution) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.challenge && (
                    <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
                      <h4 className="text-sm font-semibold text-rose-400 mb-1 flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4" />
                        The Challenge
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {project.challenge}
                      </p>
                    </div>
                  )}

                  {project.solution && (
                    <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
                      <h4 className="text-sm font-semibold text-cyan-400 mb-1 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        The Solution
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {project.solution}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar Spec Box */}
            <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800 space-y-5">
              {servicesList.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    Services Delivered
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-200">
                    {servicesList.map((srv, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span>{srv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {techList.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Technologies & Tools
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {techList.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-cyan-300 border border-slate-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2">
                <button
                  onClick={() => {
                    onClose();
                    if (onOpenQuote) onOpenQuote(project.project_name);
                  }}
                  className="w-full py-2.5 rounded-xl cyber-button-secondary text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <span>Build Similar Project</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
