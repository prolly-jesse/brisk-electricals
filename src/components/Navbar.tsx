import { useState } from "react";
import { Zap, Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BriskLogo from "@/assets/logobrisk2.png";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { label: "Home", href: "/" },
    { label: "Services & Solutions", href: "/services-solutions" },
    { label: "Why Us", href: "/why-us" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ];

  const scrollToShop = () => {
    setOpen(false);
    if (location.pathname === "/") {
      document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:border-primary/60 transition-colors duration-300">
              <img
                src={BriskLogo}
                alt="Brisk logo"
                className="w-full h-full object-contain scale-[2]"
              />
            </div>
            <span className="font-display font-bold text-lg tracking-tight">
              Brisk <span className="glow-text">Electricals</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className={`text-sm transition-colors duration-200 ${
                  location.pathname === l.href
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <button
              onClick={scrollToShop}
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              Shop
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
            <Link to="/contact" className="btn-voltage text-sm px-5 py-2">
              Get a Quote
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/50 bg-card/95 backdrop-blur-xl">
          <div className="px-4 py-4 space-y-3">
            {links.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                onClick={() => setOpen(false)}
                className={`block text-sm py-2 transition-colors ${
                  location.pathname === l.href
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <button
              onClick={scrollToShop}
              className="block text-sm py-2 text-muted-foreground hover:text-primary transition-colors w-full text-left"
            >
              Shop
            </button>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="btn-voltage text-sm px-5 py-2 w-full text-center block"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
