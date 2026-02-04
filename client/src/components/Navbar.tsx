import { Link } from 'react-router-dom';
import { useAuth, UserButton, SignInButton } from '@clerk/clerk-react';
import { Zap, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { isSignedIn } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="fixed top-0 w-full z-50 px-3 sm:px-6 py-2 sm:py-4">
      <div className="max-w-7xl mx-auto glass rounded-xl sm:rounded-2xl border-2 border-white/10 px-3 sm:px-6 py-2 sm:py-3 flex items-center justify-between shadow-neo">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group" onClick={closeMenu}>
          <div className="bg-neon-green p-1 sm:p-1.5 rounded-lg rotate-12 group-hover:rotate-0 transition-transform">
            <Zap size={20} className="sm:w-6 sm:h-6 text-black fill-current" />
          </div>
          <span className="text-xl sm:text-3xl font-black tracking-tighter text-white">
            PRE<span className="text-neon-green">VIDA</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 font-bold text-sm uppercase tracking-widest">
          <Link to="/" className="hover:text-neon-green transition-colors">Home</Link>
          {isSignedIn && (
            <>
              <Link to="/dashboard" className="hover:text-neon-green transition-colors">Dashboard</Link>
              <Link to="/settings" className="hover:text-neon-green transition-colors">Settings</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button & Auth */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Auth Actions */}
          <div className="flex items-center">
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <SignInButton mode="modal">
                <button className="neo-btn bg-electric-purple text-white px-3 sm:px-6 py-1.5 sm:py-2 rounded-lg sm:rounded-xl font-black text-xs sm:text-sm shadow-neo">
                  <span className="hidden sm:inline">GET STARTED</span>
                  <span className="sm:hidden">START</span>
                </button>
              </SignInButton>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X size={20} className="text-white" />
            ) : (
              <Menu size={20} className="text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 sm:top-20 z-40">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeMenu}></div>
          <div className="relative mx-3 sm:mx-6 mt-2 glass rounded-xl border-2 border-white/10 shadow-neo">
            <div className="p-4 space-y-4">
              <Link 
                to="/" 
                className="block py-3 px-4 rounded-lg hover:bg-white/10 transition-colors font-bold text-sm uppercase tracking-widest"
                onClick={closeMenu}
              >
                Home
              </Link>
              {isSignedIn && (
                <>
                  <Link 
                    to="/dashboard" 
                    className="block py-3 px-4 rounded-lg hover:bg-white/10 transition-colors font-bold text-sm uppercase tracking-widest"
                    onClick={closeMenu}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/settings" 
                    className="block py-3 px-4 rounded-lg hover:bg-white/10 transition-colors font-bold text-sm uppercase tracking-widest"
                    onClick={closeMenu}
                  >
                    Settings
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}