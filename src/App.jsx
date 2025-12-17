import { useState, Suspense, lazy } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import { Router, useRouter } from "./components/Router";
const LandingPage = lazy(() => import('./pages/LandingPage').then(m => ({ default: m.LandingPage })));
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const MarketPage = lazy(() => import('./pages/MarketPage').then(m => ({ default: m.MarketPage })));
const NewsPage = lazy(() => import('./pages/NewsPage').then(m => ({ default: m.NewsPage })));
const AlertsPage = lazy(() => import('./pages/AlertsPage').then(m => ({ default: m.AlertsPage })));
const SettingsPage = lazy(() => import('./pages/SettingsPage').then(m => ({ default: m.SettingsPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));

function AppContent() {
  const { currentPage } = useRouter();
  const [favorites, setFavorites] = useState([
    { from: "USD", to: "EUR" },
    { from: "GBP", to: "USD" },
  ]);

  const addToFavorites = (pair) => {
    const exists = favorites.some(
      (fav) => fav.from === pair.from && fav.to === pair.to
    );
    
    if (!exists) {
      setFavorites([...favorites, pair]);
    }
  };

  const removeFavorite = (index) => {
    setFavorites(favorites.filter((_, i) => i !== index));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage />;
      case 'home':
        return (
          <HomePage 
            favorites={favorites}
            onFavoriteAdd={addToFavorites}
            onRemoveFavorite={removeFavorite}
          />
        );
      case 'market':
        return <MarketPage />;
      case 'news':
        return <NewsPage />;
      case 'alerts':
        return <AlertsPage />;
      case 'settings':
        return <SettingsPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 w-full px-3 sm:px-4 py-4 sm:py-8">
        <div className="max-w-7xl mx-auto">
          <ErrorBoundary>
            <Suspense fallback={<div className="p-6 text-sm text-muted-foreground">Loading…</div>}>
              {renderPage()}
            </Suspense>
          </ErrorBoundary>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
