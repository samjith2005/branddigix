import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { BrandLogo } from '../components/BrandLogo';
import { Shield, Lock, Mail, ArrowRight, AlertCircle, Eye, EyeOff } from 'lucide-react';

export const AdminLogin = ({ onLoginSuccess, onBackToSite }) => {
  const { login } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login(identifier, password);
      if (res.success) {
        if (onLoginSuccess) onLoginSuccess();
      } else {
        setError(res.message || 'Invalid admin credentials');
      }
    } catch (err) {
      setError('Connection failed. Please check backend server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050814] cyber-grid-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient Glows */}
      <div className="glow-orb w-[500px] h-[500px] bg-cyan-600/15 top-1/4 left-1/4" />
      <div className="glow-orb w-[500px] h-[500px] bg-blue-600/15 bottom-1/4 right-1/4" />

      <div className="w-full max-w-md relative z-10">
        {/* Back Link */}
        <div className="mb-6 text-center">
          <button
            onClick={onBackToSite}
            className="text-xs text-slate-400 hover:text-cyan-400 transition inline-flex items-center gap-1.5 min-h-[38px] px-3 py-1.5 rounded-lg"
          >
            ← Back to Public Website
          </button>
        </div>

        {/* Login Card */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-cyan-500/30 shadow-[0_0_60px_rgba(0,210,255,0.2)]">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <BrandLogo size="default" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 mb-2">
              <Shield className="w-3.5 h-3.5" />
              Secure Staff Portal
            </div>
            <h2 className="text-2xl font-bold font-heading text-white">
              Admin Authentication
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              Enter your authorized staff credentials to manage BRANDDIGIX.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-950/70 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Admin Username or Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  autoComplete="username"
                  placeholder="Enter username or email"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400 transition min-h-[44px]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400 transition min-h-[44px]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full cyber-button-primary py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-xl disabled:opacity-50 min-h-[46px]"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Authenticate & Access Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
