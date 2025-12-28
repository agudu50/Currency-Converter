import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Moon, Sun, TrendingUp, Menu, X } from "lucide-react";
import { useRouter } from "./Router"; // make sure this hook is JS-compatible
import { useTheme } from "../context/theme.jsx";

export default function Header() {
  const { resolvedTheme, toggleTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentPage, navigateTo } = useRouter();

  useEffect(() => {
    setIsDark(resolvedTheme === 'dark');
  }, [resolvedTheme]);

  const navItems = [
    { id: 'home', label: 'Home', page: 'home' },
    { id: 'market', label: 'Market', page: 'market' },
    { id: 'news', label: 'News', page: 'news' },
    { id: 'alerts', label: 'Alerts', page: 'alerts' },
    { id: 'settings', label: 'Settings', page: 'settings' },
    { id: 'about', label: 'About', page: 'about' },
  ];

  return (
    <header className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-50">
      <div className="w-full px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
        <button
          onClick={() => navigateTo('home')}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <TrendingUp className="h-5 sm:h-6 w-5 sm:w-6 text-primary" />
          <h1 className="text-base sm:text-xl font-semibold hidden sm:block">CurrencyExchange</h1>
          <h1 className="text-sm font-semibold sm:hidden">Currency</h1>
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigateTo(item.page)}
              className={`hover:text-primary transition-colors relative text-sm ${
                currentPage === item.page ? 'text-primary' : ''
              }`}
            >
              {item.label}
              {currentPage === item.page && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full h-9 w-9 sm:h-10 sm:w-10"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-full h-9 w-9 sm:h-10 sm:w-10"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-card/95 backdrop-blur-md">
          <nav className="w-full px-3 sm:px-4 py-3 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  navigateTo(item.page);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors ${
                  currentPage === item.page ? 'bg-muted text-primary' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
