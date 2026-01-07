import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Play } from 'lucide-react';

interface NavbarProps {
  onCategoryClick?: (category: string) => void;
}

const Navbar = ({ onCategoryClick }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = ['Home', 'News', 'Entertainment', 'Movies', 'Sports'];

  const handleNavClick = (link: string) => {
    if (link === 'Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onCategoryClick?.(link);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-surface">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center glow-effect">
              <Play className="w-5 h-5 text-primary-foreground ml-0.5" fill="currentColor" />
            </div>
            <span className="text-xl font-display font-bold gradient-text">StreamVault</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.button
                key={link}
                onClick={() => handleNavClick(link)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary/50 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ height: isMobileMenuOpen ? 'auto' : 0, opacity: isMobileMenuOpen ? 1 : 0 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => handleNavClick(link)}
                className="block w-full text-left px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
              >
                {link}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
