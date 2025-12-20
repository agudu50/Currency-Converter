# 💱 Currency Exchange - Reimagined

A modern, real-time currency converter application with live exchange rates, market analytics, and comprehensive financial news. Built with React 19, Vite, and Tailwind CSS for a seamless mobile-first experience.

## 📌 Project Overview

**Currency Exchange** is a full-featured currency conversion platform that provides:

- ✨ **Real-Time Rates**: Live exchange rates for 20+ major currencies via CurrencyAPI
- 📊 **Historical Trends**: 7-90 day trend analysis with interactive Recharts visualizations
- 📰 **Market News**: Currency and economic news aggregated from multiple sources
- ⭐ **Smart Favorites**: Save frequently-used currency pairs for instant access
- 🔔 **Price Alerts**: Set custom alerts for significant rate movements
- 📱 **Mobile-First**: Fully responsive design optimized for all devices

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 with Vite 7
- **Styling**: Tailwind CSS + Radix UI components
- **Charts**: Recharts for historical data visualization
- **APIs**:
  - **CurrencyAPI** (`/v3/latest`): Live exchange rates for 200+ currencies
  - **ExchangeRate.host** (`/timeseries`): Historical rate trends
- **State Management**: React Context + Hooks
- **Deployment**: Vercel

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm/yarn
- A free CurrencyAPI account (get [here](https://currencyapi.com))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/currency-converter.git
   cd currency-converter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   Create a `.env` file in the project root:
   ```
   VITE_CURRENCY_API_KEY=your_currencyapi_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production
```bash
npm run build
npm run preview  # Local preview of production build
```

## 📂 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CurrencyChart.jsx       # Historical trend visualization
│   ├── CurrencyConverter.jsx    # Main conversion interface
│   ├── ExchangeRateTable.jsx    # Live rates table with 7-day trends
│   ├── FavoritesPairs.jsx       # Saved pair display
│   ├── Header.jsx              # Navigation header
│   ├── Footer.jsx              # Footer
│   ├── Router.jsx              # Custom route context
│   └── ui/                      # Radix UI component library
├── pages/               # Page components
│   ├── LandingPage.jsx         # Hero & ticker
│   ├── HomePage.jsx            # Dashboard with converter & rates
│   ├── MarketPage.jsx          # Market overview & pairs table
│   ├── NewsPage.jsx            # Currency news & economic calendar
│   ├── AlertsPage.jsx          # Alert management
│   ├── SettingsPage.jsx        # User preferences
│   └── AboutPage.jsx           # Company/product info
├── utils/
│   └── currencyData.js         # API integrations & rate conversions
├── App.jsx             # Main app component
└── main.jsx            # React entry point

tailwind.config.js      # Tailwind CSS theme
vite.config.js          # Vite build configuration
```

## 🔑 Environment Variables

| Variable | Required | Source |
|----------|----------|--------|
| `VITE_CURRENCY_API_KEY` | Yes | [CurrencyAPI](https://currencyapi.com) |

Get your free API key from CurrencyAPI—includes 300 monthly requests on the free tier.

## 📊 API Usage

### Latest Rates (CurrencyAPI)
```javascript
// Fetch live rates for all currencies
const rates = await fetchExchangeRates("USD");
// Returns: { EUR: 0.92, GBP: 0.78, ... }
```

### Conversions
```javascript
// Async conversion with live rates
const result = await convertCurrencyAsync(100, "USD", "EUR");
```

### Historical Trends
```javascript
// Fetch 7-day trend data
const history = await fetchHistoricalRatesBatch("USD", ["EUR", "GBP"], 7);
```

## 🌐 Pages & Components

### Pages
- **Landing Page**: Hero section with exchange rate ticker and featured pairs
- **Home**: Dashboard with currency converter, favorites, live rates table, and historical charts
- **Market**: Market overview with currency pairs, major/exotic/crypto sections
- **News**: Currency news aggregator with economic calendar
- **Alerts**: Create and manage price alerts
- **Settings**: User preferences (timezone, decimal places, theme, notifications)
- **About**: Company info, team, and statistics

### Key Components
- **CurrencyConverter**: Main conversion UI with live unit rate display
- **ExchangeRateTable**: 12 major pairs with 7-day trend badges
- **CurrencyChart**: Interactive line charts with historical data (7d-1y)
- **FavoritesPairs**: Quick-access saved pairs with live rates
- **Header**: Responsive navigation with mobile menu
- **Footer**: Company info, features list, and social links

## 🔧 Development

### Scripts
```bash
npm run dev       # Start Vite dev server (hot reload)
npm run build     # Production build to /dist
npm run preview   # Preview production build locally
npm run lint      # ESLint check
```

### Debugging
All errors are logged to the browser console. Error boundaries catch React component crashes and display helpful messages.

## 📱 Responsive Design

Pages are optimized for:
- **Mobile** (320px+): Single column, stacked components, touch-friendly buttons
- **Tablet** (768px+): 2-column grids, larger inputs, expanded tables
- **Desktop** (1024px+): Full layouts, side-by-side sections, detailed views

## 🔐 Performance Optimizations

- **Code Splitting**: Pages lazy-loaded on route change
- **Batch API Calls**: Historical rates fetched once for multiple pairs
- **Rate Limiting**: Fallback to mock data when API rate-limit hit
- **Deduplicated Bundles**: React and React-DOM deduplicated via Vite config

## 📦 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel login
vercel deploy
```

**Environment Variables on Vercel**:
1. Go to Project Settings → Environment Variables
2. Add `VITE_CURRENCY_API_KEY` with your CurrencyAPI key
3. Redeploy

### Manual Build
```bash
npm run build
# /dist folder ready for static hosting
```

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| Blank page on deploy | Check `VITE_CURRENCY_API_KEY` in Vercel env vars |
| 429 errors (rate limit) | Use batch fetch; fallback to mock data active |
| Icons not showing | Component rendering is stable; CSS grid loads |
| Mobile layout breaks | Check responsive classes: `sm:`, `md:`, `lg:` |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Submit a Pull Request

## 📄 License

MIT License – feel free to use this project in your own work.

## 👤 Author

**Anthony Gudu** – Frontend Developer | Open Source Contributor

---

**Last Updated**: December 2025  
**Status**: ✅ Production Ready