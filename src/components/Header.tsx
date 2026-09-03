import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NavLink, Link } from 'react-router-dom';

interface HeaderProps {
  onOpenStartProject: () => void;
}

export const Header = ({ onOpenStartProject }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full pt-8 pb-4 px-6 md:px-12 lg:px-16 flex items-center justify-between z-30 relative select-none">
      {/* Studio Logo */}
      <Link
        to="/"
        className="group flex items-center gap-1.5 cursor-pointer transition-transform duration-200 active:scale-95"
        aria-label="BIZZJUMP Home"
        id="studio-logo"
      >
        <img
          src="https://kelechieze.wordpress.com/wp-content/uploads/2026/08/yyu-1.png"
          alt="BIZZJUMP"
          referrerPolicy="no-referrer"
          className="h-8 sm:h-9 md:h-10 w-auto object-contain max-w-[160px] sm:max-w-[200px]"
        />
      </Link>

      {/* Desktop Navigation Links: ABOUT, PROJECTS, SERVICES, CONTACT ↗ */}
      <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-[13px] font-bold tracking-[0.08em] uppercase text-neutral-800">
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `hover:text-neutral-500 transition-colors py-1 cursor-pointer relative group ${
              isActive ? 'text-neutral-950 font-black' : ''
            }`
          }
          id="nav-about"
        >
          {({ isActive }) => (
            <>
              <span>ABOUT</span>
              <span
                className={`absolute bottom-0 left-0 h-[1.5px] bg-neutral-900 transition-all duration-200 ${
                  isActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              ></span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/projects"
          className={({ isActive }) =>
            `hover:text-neutral-500 transition-colors py-1 cursor-pointer relative group ${
              isActive ? 'text-neutral-950 font-black' : ''
            }`
          }
          id="nav-projects"
        >
          {({ isActive }) => (
            <>
              <span>PROJECTS</span>
              <span
                className={`absolute bottom-0 left-0 h-[1.5px] bg-neutral-900 transition-all duration-200 ${
                  isActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              ></span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/services"
          className={({ isActive }) =>
            `hover:text-neutral-500 transition-colors py-1 cursor-pointer relative group ${
              isActive ? 'text-neutral-950 font-black' : ''
            }`
          }
          id="nav-services"
        >
          {({ isActive }) => (
            <>
              <span>SERVICES</span>
              <span
                className={`absolute bottom-0 left-0 h-[1.5px] bg-neutral-900 transition-all duration-200 ${
                  isActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              ></span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `hover:text-neutral-500 transition-colors py-1 cursor-pointer flex items-center gap-1 group ${
              isActive ? 'text-neutral-950 font-black' : ''
            }`
          }
          id="nav-contact"
        >
          <span>CONTACT</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </NavLink>
      </nav>

      {/* Mobile Menu Trigger */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden p-2 text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer"
        aria-label="Toggle menu"
        id="mobile-menu-btn"
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-[#fcfbf9]/95 backdrop-blur-md border-b border-neutral-200 py-6 px-8 shadow-xl md:hidden flex flex-col gap-5 text-sm font-bold tracking-wider uppercase z-50"
          >
            <NavLink
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-left py-2 hover:text-neutral-500"
            >
              About
            </NavLink>
            <NavLink
              to="/projects"
              onClick={() => setMobileMenuOpen(false)}
              className="text-left py-2 hover:text-neutral-500"
            >
              Projects
            </NavLink>
            <NavLink
              to="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="text-left py-2 hover:text-neutral-500"
            >
              Services
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-left py-2 flex items-center justify-between hover:text-neutral-500"
            >
              <span>Contact</span>
              <ArrowUpRight className="w-4 h-4" />
            </NavLink>
            <div className="pt-2 border-t border-neutral-200">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenStartProject();
                }}
                className="w-full py-3 bg-[#dbfa07] text-black rounded-full text-center text-xs font-bold tracking-widest uppercase hover:bg-[#181a33] hover:text-white transition-all duration-300 shadow-sm cursor-pointer"
              >
                Start Project
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
