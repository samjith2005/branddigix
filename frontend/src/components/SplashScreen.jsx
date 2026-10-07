import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export const SplashScreen = ({ onComplete }) => {
  const [phase, setPhase] = useState('init'); // init → logo → tagline → particles → exit

  useEffect(() => {
    // Phase timeline
    const t1 = setTimeout(() => setPhase('logo'),      200);   // logo appears
    const t2 = setTimeout(() => setPhase('tagline'),   1400);  // tagline appears
    const t3 = setTimeout(() => setPhase('particles'), 2200);  // particles explode
    const t4 = setTimeout(() => setPhase('exit'),      3400);  // fade out starts
    const t5 = setTimeout(() => onComplete(),           4000);  // unmount

    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout);
  }, [onComplete]);

  const handleSkip = () => {
    setPhase('exit');
    setTimeout(() => onComplete(), 300);
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden transition-all duration-700 px-4
        ${phase === 'exit' ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'}
      `}
      style={{ background: 'radial-gradient(ellipse at center, #060f2e 0%, #020610 60%, #000 100%)' }}
    >
      {/* Skip Button (Top Right) */}
      <button
        onClick={handleSkip}
        className="absolute top-4 sm:top-6 right-4 sm:right-6 z-50 px-3 py-1.5 rounded-full bg-slate-900/70 border border-slate-700/60 text-slate-400 hover:text-white hover:border-cyan-400 text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md transition min-h-[36px]"
        aria-label="Skip intro"
      >
        <span>Skip</span>
        <X className="w-3.5 h-3.5" />
      </button>

      {/* Animated grid lines */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(rgba(0,210,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,210,255,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        animation: 'gridPulse 3s ease-in-out infinite'
      }} />

      {/* Scanning line */}
      <div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0,210,255,0.6), transparent)',
          animation: 'scanLine 2s ease-in-out 0.3s 2',
          top: '50%',
          opacity: phase === 'logo' || phase === 'tagline' ? 1 : 0,
          transition: 'opacity 0.5s'
        }}
      />

      {/* Orbiting particles */}
      {['particles', 'exit'].includes(phase) && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                background: i % 3 === 0 ? '#00D2FF' : i % 3 === 1 ? '#0072FF' : '#38BDF8',
                left: '50%',
                top: '50%',
                animation: `orbit${i % 3 + 1} ${1.2 + (i * 0.15)}s ease-out forwards`,
                animationDelay: `${i * 0.05}s`,
                boxShadow: '0 0 8px currentColor'
              }}
            />
          ))}
        </div>
      )}

      {/* Corner decorations (hidden on small mobile to reduce clutter) */}
      {['logo','tagline','particles'].includes(phase) && (
        <>
          <div className="hidden sm:block absolute top-8 left-8 w-12 sm:w-16 h-12 sm:h-16 border-l-2 border-t-2 border-cyan-500/40 rounded-tl-sm pointer-events-none" style={{ animation: 'cornerSlide 0.8s ease-out forwards' }} />
          <div className="hidden sm:block absolute top-8 right-8 w-12 sm:w-16 h-12 sm:h-16 border-r-2 border-t-2 border-cyan-500/40 rounded-tr-sm pointer-events-none" style={{ animation: 'cornerSlide 0.8s ease-out forwards' }} />
          <div className="hidden sm:block absolute bottom-8 left-8 w-12 sm:w-16 h-12 sm:h-16 border-l-2 border-b-2 border-cyan-500/40 rounded-bl-sm pointer-events-none" style={{ animation: 'cornerSlide 0.8s ease-out forwards' }} />
          <div className="hidden sm:block absolute bottom-8 right-8 w-12 sm:w-16 h-12 sm:h-16 border-r-2 border-b-2 border-cyan-500/40 rounded-br-sm pointer-events-none" style={{ animation: 'cornerSlide 0.8s ease-out forwards' }} />
        </>
      )}

      {/* Main content container */}
      <div className="relative flex flex-col items-center gap-5 sm:gap-8 max-w-lg w-full text-center px-4">

        {/* Logo with glow ring */}
        <div
          className="relative flex items-center justify-center my-2"
          style={{
            opacity: ['logo','tagline','particles','exit'].includes(phase) ? 1 : 0,
            transform: ['logo','tagline','particles','exit'].includes(phase) ? 'scale(1) translateY(0)' : 'scale(0.4) translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          {/* Outer rotating ring */}
          <div
            className="absolute rounded-full border border-cyan-500/30"
            style={{
              width: '130px',
              height: '130px',
              borderTopColor: 'rgba(0,210,255,0.8)',
              borderRightColor: 'rgba(0,114,255,0.5)',
              animation: 'spinRing 3s linear infinite',
              boxShadow: '0 0 30px rgba(0,210,255,0.2)'
            }}
          />
          {/* Inner pulsing ring */}
          <div
            className="absolute rounded-full border border-blue-500/20"
            style={{
              width: '105px',
              height: '105px',
              animation: 'pulseRing 1.5s ease-in-out infinite'
            }}
          />

          {/* Logo image */}
          <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden" style={{
            boxShadow: '0 0 40px rgba(0,210,255,0.5), 0 0 80px rgba(0,114,255,0.3)',
            animation: 'logoGlow 2s ease-in-out infinite'
          }}>
            <img
              src="/branddigix-logo.jpg"
              alt="BRANDDIGIX"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Dot nodes on ring */}
          <div className="absolute w-2.5 h-2.5 sm:w-3 sm:h-3 bg-cyan-400 rounded-full" style={{
            top: '0px',
            left: '50%',
            transform: 'translateX(-50%)',
            boxShadow: '0 0 12px #00D2FF',
            animation: 'dotPulse 1s ease-in-out infinite'
          }} />
          <div className="absolute w-2 h-2 sm:w-2.5 sm:h-2.5 bg-blue-400 rounded-full" style={{
            bottom: '0px',
            left: '50%',
            transform: 'translateX(-50%)',
            boxShadow: '0 0 10px #0072FF'
          }} />
        </div>

        {/* Brand name */}
        <div
          className="w-full"
          style={{
            opacity: ['logo','tagline','particles','exit'].includes(phase) ? 1 : 0,
            transform: ['logo','tagline','particles','exit'].includes(phase) ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s ease-out 0.2s'
          }}
        >
          <h1
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-wide sm:tracking-widest uppercase text-center"
            style={{
              background: 'linear-gradient(90deg, #fff 0%, #e0f7ff 30%, #00D2FF 60%, #0072FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 16px rgba(0,210,255,0.35))'
            }}
          >
            BRAND<span style={{ WebkitTextFillColor: '#00D2FF' }}>DIGIX</span>
          </h1>
          <p className="text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.35em] text-cyan-400/80 text-center uppercase font-semibold mt-1">
            We Build Digital Brands
          </p>
        </div>

        {/* Welcome text */}
        <div
          className="text-center px-2"
          style={{
            opacity: ['tagline','particles','exit'].includes(phase) ? 1 : 0,
            transform: ['tagline','particles','exit'].includes(phase) ? 'translateY(0)' : 'translateY(15px)',
            transition: 'all 0.6s ease-out'
          }}
        >
          <p className="text-lg sm:text-2xl font-light text-slate-200 tracking-wide sm:tracking-wider">
            Welcome to <span className="text-cyan-400 font-semibold">BRANDDIGIX</span>
          </p>
          <p className="text-slate-400 text-xs sm:text-sm mt-1.5 tracking-wider uppercase">
            Your Digital Future Starts Here
          </p>
        </div>

        {/* Loading bar */}
        <div
          className="w-48 sm:w-64 h-0.5 bg-slate-800 rounded-full overflow-hidden mt-1"
          style={{
            opacity: ['logo','tagline'].includes(phase) ? 1 : 0,
            transition: 'opacity 0.4s'
          }}
        >
          <div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #00D2FF, #0072FF)',
              boxShadow: '0 0 10px rgba(0,210,255,0.6)',
              width: phase === 'logo' ? '40%' : phase === 'tagline' ? '80%' : '100%',
              transition: 'width 1.2s ease-out'
            }}
          />
        </div>

        {/* Loading dots */}
        <div
          className="flex gap-2"
          style={{
            opacity: ['logo','tagline'].includes(phase) ? 1 : 0,
            transition: 'opacity 0.3s'
          }}
        >
          {[0,1,2].map(i => (
            <div key={i} className="w-1.5 h-1.5 bg-cyan-500 rounded-full" style={{
              animation: `dotBounce 1s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
              boxShadow: '0 0 6px #00D2FF'
            }} />
          ))}
        </div>
      </div>

      {/* CSS Keyframe Animations */}
      <style>{`
        @keyframes scanLine {
          0% { transform: translateY(-200px); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(200px); opacity: 0; }
        }
        @keyframes spinRing {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulseRing {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.06); opacity: 0.7; }
        }
        @keyframes logoGlow {
          0%, 100% { box-shadow: 0 0 35px rgba(0,210,255,0.5), 0 0 70px rgba(0,114,255,0.3); }
          50% { box-shadow: 0 0 50px rgba(0,210,255,0.8), 0 0 100px rgba(0,114,255,0.5); }
        }
        @keyframes dotBounce {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes dotPulse {
          0%, 100% { box-shadow: 0 0 10px #00D2FF; transform: translateX(-50%) scale(1); }
          50% { box-shadow: 0 0 20px #00D2FF; transform: translateX(-50%) scale(1.3); }
        }
        @keyframes gridPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes cornerSlide {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes orbit1 {
          0% { transform: translate(-50%,-50%) scale(0); opacity:1; }
          100% { transform: translate(calc(-50% + ${Math.cos(0)*110}px), calc(-50% + ${Math.sin(0)*110}px)) scale(1); opacity:0; }
        }
        @keyframes orbit2 {
          0% { transform: translate(-50%,-50%) scale(0); opacity:1; }
          100% { transform: translate(calc(-50% + ${Math.cos(2.1)*130}px), calc(-50% + ${Math.sin(2.1)*130}px)) scale(1); opacity:0; }
        }
        @keyframes orbit3 {
          0% { transform: translate(-50%,-50%) scale(0); opacity:1; }
          100% { transform: translate(calc(-50% + ${Math.cos(4.2)*150}px), calc(-50% + ${Math.sin(4.2)*150}px)) scale(1); opacity:0; }
        }
      `}</style>
    </div>
  );
};
