import { useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Router, useRouter } from "./components/Router";
import { HomePage } from "./pages/HomePage";
import { MarketPage } from "./pages/MarketPage";
import { NewsPage } from "./pages/NewsPage";
import { AlertsPage } from "./pages/AlertsPage";
import { SettingsPage } from "./pages/SettingsPage";
import { AboutPage } from "./pages/AboutPage";

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
        return (
          <HomePage 
            favorites={favorites}
            onFavoriteAdd={addToFavorites}
            onRemoveFavorite={removeFavorite}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {renderPage()}
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
