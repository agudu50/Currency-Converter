import { useState } from "react";
import { Button } from "./ui/button";
import { Moon, Sun, TrendingUp, Menu, X } from "lucide-react";
import { useRouter } from "./Router"; // make sure this hook is JS-compatible

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentPage, navigateTo } = useRouter();

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

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
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <button
          onClick={() => navigateTo('home')}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <TrendingUp className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold">CurrencyExchange</h1>
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigateTo(item.page)}
              className={`hover:text-primary transition-colors relative ${
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

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="rounded-full"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-full"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-card/95 backdrop-blur-md">
          <nav className="container mx-auto px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  navigateTo(item.page);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg hover:bg-muted transition-colors ${
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
