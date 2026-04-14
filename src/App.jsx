import { useState, useEffect } from 'react'
import './index.css'

function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const links = [
    { name: 'Telegram', url: '#', icon: '✈️', color: 'from-blue-500 to-cyan-400' },
    { name: 'YouTube', url: '#', icon: '▶️', color: 'from-red-600 to-red-400' },
    { name: 'Instagram', url: '#', icon: '📸', color: 'from-pink-600 to-purple-500' },
    { name: 'TikTok', url: '#', icon: '🎵', color: 'from-gray-900 to-pink-500' },
    { name: 'Twitch', url: '#', icon: '🎮', color: 'from-purple-700 to-purple-400' },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Animated gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-purple-950/20 to-black animate-gradient-shift" 
           style={{ animationDuration: '15s' }} />
      
      {/* Mouse follower */}
      <div 
        className="fixed w-96 h-96 rounded-full pointer-events-none z-0 transition-all duration-700 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)',
          left: mousePos.x - 192,
          top: mousePos.y - 192,
        }}
      />

      {/* Floating particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-500/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 20}s`,
            }}
          />
        ))}
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
        
        {/* Avatar with glow */}
        <div className={`relative mb-8 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 blur-xl opacity-50 animate-pulse" />
          <div className="relative w-32 h-32 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 p-1 animate-spin-slow">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-5xl">
              👤
            </div>
          </div>
        </div>

        {/* Name with typewriter effect */}
        <h1 className={`text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          Ваше Имя
        </h1>

        {/* Subtitle */}
        <p className={`text-lg md:text-xl text-gray-400 mb-16 max-w-md text-center transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          Краткое описание • Чем занимаетесь
        </p>

        {/* Links */}
        <div className="flex flex-col gap-4 w-full max-w-md">
          {links.map((link, index) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative block transition-all duration-700 delay-${index * 200} ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${700 + index * 150}ms` }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                   style={{ background: `linear-gradient(90deg, var(--tw-gradient-stops))` }}>
                <div className={`w-full h-full bg-gradient-to-r ${link.color} opacity-20`} />
              </div>
              
              {/* Button */}
              <div className="relative flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm group-hover:bg-white/10 group-hover:border-white/20 group-hover:scale-105 transition-all duration-500">
                <span className="text-3xl group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500">
                  {link.icon}
                </span>
                <span className="flex-1 text-lg font-semibold">{link.name}</span>
                <span className="text-2xl group-hover:translate-x-2 transition-transform duration-500">
                  →
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <p className={`mt-16 text-sm text-gray-600 transition-all duration-1000 delay-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          © {new Date().getFullYear()} • Все права защищены
        </p>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
        }
        @keyframes float {
          0%, 100% { transform: translateY(100vh) rotate(0deg); opacity: 0 }
          10% { opacity: 1 }
          90% { opacity: 1 }
          100% { transform: translateY(-100vh) rotate(720deg); opacity: 0 }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg) }
          to { transform: rotate(360deg) }
        }
        .animate-gradient-shift {
          background-size: 400% 400%;
          animation: gradient-shift 15s ease infinite;
        }
        .animate-float {
          animation: float linear infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  )
}

export default App
