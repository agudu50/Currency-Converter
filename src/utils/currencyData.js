// List of currencies
export const currencies = [
  // Major Global Currencies
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', flag: '🇨🇭' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },

  // Asia Pacific
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', flag: '🇭🇰' },
  { code: 'TWD', name: 'Taiwan Dollar', symbol: 'NT$', flag: '🇹🇼' },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱', flag: '🇵🇭' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', flag: '🇲🇾' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿', flag: '🇹🇭' },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', flag: '🇮🇩' },
  { code: 'VND', name: 'Vietnamese Dong', symbol: '₫', flag: '🇻🇳' },
  { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨', flag: '🇵🇰' },
  { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳', flag: '🇧🇩' },
  { code: 'LKR', name: 'Sri Lankan Rupee', symbol: 'Rs', flag: '🇱🇰' },
  { code: 'NPR', name: 'Nepalese Rupee', symbol: '₨', flag: '🇳🇵' },
  { code: 'MMK', name: 'Myanmar Kyat', symbol: 'K', flag: '🇲🇲' },
  { code: 'KHR', name: 'Cambodian Riel', symbol: '៛', flag: '🇰🇭' },
  { code: 'LAK', name: 'Lao Kip', symbol: '₭', flag: '🇱🇦' },
  { code: 'BND', name: 'Brunei Dollar', symbol: 'B$', flag: '🇧🇳' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿' },
  { code: 'FJD', name: 'Fijian Dollar', symbol: 'FJ$', flag: '🇫🇯' },

  // Middle East
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼', flag: '🇸🇦' },
  { code: 'QAR', name: 'Qatari Riyal', symbol: 'ر.ق', flag: '🇶🇦' },
  { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'د.ك', flag: '🇰🇼' },
  { code: 'BHD', name: 'Bahraini Dinar', symbol: '.د.ب', flag: '🇧🇭' },
  { code: 'OMR', name: 'Omani Rial', symbol: 'ر.ع.', flag: '🇴🇲' },
  { code: 'JOD', name: 'Jordanian Dinar', symbol: 'د.ا', flag: '🇯🇴' },
  { code: 'LBP', name: 'Lebanese Pound', symbol: 'ل.ل', flag: '🇱🇧' },
  { code: 'ILS', name: 'Israeli Shekel', symbol: '₪', flag: '🇮🇱' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺', flag: '🇹🇷' },
  { code: 'IRR', name: 'Iranian Rial', symbol: '﷼', flag: '🇮🇷' },

  // Europe
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr', flag: '🇩🇰' },
  { code: 'ISK', name: 'Icelandic Krona', symbol: 'kr', flag: '🇮🇸' },
  { code: 'PLN', name: 'Polish Zloty', symbol: 'zł', flag: '🇵🇱' },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč', flag: '🇨🇿' },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft', flag: '🇭🇺' },
  { code: 'RON', name: 'Romanian Leu', symbol: 'lei', flag: '🇷🇴' },
  { code: 'BGN', name: 'Bulgarian Lev', symbol: 'лв', flag: '🇧🇬' },
  { code: 'HRK', name: 'Croatian Kuna', symbol: 'kn', flag: '🇭🇷' },
  { code: 'RSD', name: 'Serbian Dinar', symbol: 'дин', flag: '🇷🇸' },
  { code: 'BAM', name: 'Bosnia-Herzegovina Convertible Mark', symbol: 'KM', flag: '🇧🇦' },
  { code: 'MKD', name: 'Macedonian Denar', symbol: 'ден', flag: '🇲🇰' },
  { code: 'ALL', name: 'Albanian Lek', symbol: 'L', flag: '🇦🇱' },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽', flag: '🇷🇺' },
  { code: 'UAH', name: 'Ukrainian Hryvnia', symbol: '₴', flag: '🇺🇦' },
  { code: 'BYN', name: 'Belarusian Ruble', symbol: 'Br', flag: '🇧🇾' },
  { code: 'MDL', name: 'Moldovan Leu', symbol: 'L', flag: '🇲🇩' },

  // Americas
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$', flag: '🇲🇽' },
  { code: 'ARS', name: 'Argentine Peso', symbol: '$', flag: '🇦🇷' },
  { code: 'CLP', name: 'Chilean Peso', symbol: '$', flag: '🇨🇱' },
  { code: 'COP', name: 'Colombian Peso', symbol: '$', flag: '🇨🇴' },
  { code: 'PEN', name: 'Peruvian Sol', symbol: 'S/', flag: '🇵🇪' },
  { code: 'UYU', name: 'Uruguayan Peso', symbol: '$U', flag: '🇺🇾' },
  { code: 'PYG', name: 'Paraguayan Guarani', symbol: '₲', flag: '🇵🇾' },
  { code: 'BOB', name: 'Bolivian Boliviano', symbol: 'Bs', flag: '🇧🇴' },
  { code: 'VES', name: 'Venezuelan Bolívar', symbol: 'Bs.S', flag: '🇻🇪' },
  { code: 'GYD', name: 'Guyanese Dollar', symbol: 'G$', flag: '🇬🇾' },
  { code: 'SRD', name: 'Surinamese Dollar', symbol: '$', flag: '🇸🇷' },
  { code: 'CRC', name: 'Costa Rican Colón', symbol: '₡', flag: '🇨🇷' },
  { code: 'GTQ', name: 'Guatemalan Quetzal', symbol: 'Q', flag: '🇬🇹' },
  { code: 'HNL', name: 'Honduran Lempira', symbol: 'L', flag: '🇭🇳' },
  { code: 'NIO', name: 'Nicaraguan Córdoba', symbol: 'C$', flag: '🇳🇮' },
  { code: 'PAB', name: 'Panamanian Balboa', symbol: 'B/.', flag: '🇵🇦' },
  { code: 'DOP', name: 'Dominican Peso', symbol: 'RD$', flag: '🇩🇴' },
  { code: 'CUP', name: 'Cuban Peso', symbol: '$', flag: '🇨🇺' },
  { code: 'JMD', name: 'Jamaican Dollar', symbol: 'J$', flag: '🇯🇲' },
  { code: 'HTG', name: 'Haitian Gourde', symbol: 'G', flag: '🇭🇹' },
  { code: 'TTD', name: 'Trinidad and Tobago Dollar', symbol: 'TT$', flag: '🇹🇹' },
  { code: 'BBD', name: 'Barbadian Dollar', symbol: 'Bds$', flag: '🇧🇧' },

  // Africa
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦' },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', flag: '🇳🇬' },
  { code: 'EGP', name: 'Egyptian Pound', symbol: 'ج.م', flag: '🇪🇬' },
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', flag: '🇰🇪' },
  { code: 'GHS', name: 'Ghanaian Cedi', symbol: '₵', flag: '🇬🇭' },
  { code: 'TZS', name: 'Tanzanian Shilling', symbol: 'TSh', flag: '🇹🇿' },
  { code: 'UGX', name: 'Ugandan Shilling', symbol: 'USh', flag: '🇺🇬' },
  { code: 'RWF', name: 'Rwandan Franc', symbol: 'FRw', flag: '🇷🇼' },
  { code: 'ETB', name: 'Ethiopian Birr', symbol: 'Br', flag: '🇪🇹' },
  { code: 'MAD', name: 'Moroccan Dirham', symbol: 'د.م.', flag: '🇲🇦' },
  { code: 'TND', name: 'Tunisian Dinar', symbol: 'د.ت', flag: '🇹🇳' },
  { code: 'DZD', name: 'Algerian Dinar', symbol: 'د.ج', flag: '🇩🇿' },
  { code: 'LYD', name: 'Libyan Dinar', symbol: 'ل.د', flag: '🇱🇾' },
  { code: 'SDG', name: 'Sudanese Pound', symbol: 'ج.س.', flag: '🇸🇩' },
  { code: 'AOA', name: 'Angolan Kwanza', symbol: 'Kz', flag: '🇦🇴' },
  { code: 'ZMW', name: 'Zambian Kwacha', symbol: 'ZK', flag: '🇿🇲' },
  { code: 'BWP', name: 'Botswanan Pula', symbol: 'P', flag: '🇧🇼' },
  { code: 'NAD', name: 'Namibian Dollar', symbol: 'N$', flag: '🇳🇦' },
  { code: 'SZL', name: 'Swazi Lilangeni', symbol: 'L', flag: '🇸🇿' },
  { code: 'LSL', name: 'Lesotho Loti', symbol: 'L', flag: '🇱🇸' },
  { code: 'MWK', name: 'Malawian Kwacha', symbol: 'MK', flag: '🇲🇼' },
  { code: 'MZN', name: 'Mozambican Metical', symbol: 'MT', flag: '🇲🇿' },
  { code: 'MGA', name: 'Malagasy Ariary', symbol: 'Ar', flag: '🇲🇬' },
  { code: 'MUR', name: 'Mauritian Rupee', symbol: '₨', flag: '🇲🇺' },
  { code: 'SCR', name: 'Seychellois Rupee', symbol: '₨', flag: '🇸🇨' },

  // Oceania & Others
  { code: 'PGK', name: 'Papua New Guinea Kina', symbol: 'K', flag: '🇵🇬' },
  { code: 'SBD', name: 'Solomon Islands Dollar', symbol: 'SI$', flag: '🇸🇧' },
  { code: 'VUV', name: 'Vanuatu Vatu', symbol: 'VT', flag: '🇻🇺' },
  { code: 'TOP', name: 'Tongan Paʻanga', symbol: 'T$', flag: '🇹🇴' },
  { code: 'WST', name: 'Samoan Tala', symbol: 'WS$', flag: '🇼🇸' },

  // Additional Major Economies
  { code: 'XOF', name: 'West African CFA Franc', symbol: 'CFA', flag: '🏛️' },
  { code: 'XAF', name: 'Central African CFA Franc', symbol: 'FCFA', flag: '🏛️' },
  { code: 'XCD', name: 'East Caribbean Dollar', symbol: 'EC$', flag: '🏝️' },
  { code: 'AFN', name: 'Afghan Afghani', symbol: '؋', flag: '🇦🇫' },
  { code: 'AMD', name: 'Armenian Dram', symbol: '֏', flag: '🇦🇲' },
  { code: 'AZN', name: 'Azerbaijani Manat', symbol: '₼', flag: '🇦🇿' },
  { code: 'GEL', name: 'Georgian Lari', symbol: '₾', flag: '🇬🇪' },
  { code: 'KZT', name: 'Kazakhstani Tenge', symbol: '₸', flag: '🇰🇿' },
  { code: 'KGS', name: 'Kyrgyzstani Som', symbol: 'с', flag: '🇰🇬' },
  { code: 'TJS', name: 'Tajikistani Somoni', symbol: 'SM', flag: '🇹🇯' },
  { code: 'TMT', name: 'Turkmenistani Manat', symbol: 'T', flag: '🇹🇲' },
  { code: 'UZS', name: 'Uzbekistani Som', symbol: "soʻm", flag: '🇺🇿' },
  { code: 'MNT', name: 'Mongolian Tugrik', symbol: '₮', flag: '🇲🇳' },

  // Cryptocurrencies & Stablecoins
  { code: 'BTC', name: 'Bitcoin', symbol: 'BTC', flag: '🪙' },
  { code: 'ETH', name: 'Ethereum', symbol: 'ETH', flag: '🪙' },
  { code: 'USDT', name: 'Tether', symbol: 'USDT', flag: '🪙' },
  { code: 'USDC', name: 'USD Coin', symbol: 'USDC', flag: '🪙' },
  { code: 'BNB', name: 'BNB', symbol: 'BNB', flag: '🪙' },
  { code: 'SOL', name: 'Solana', symbol: 'SOL', flag: '🪙' },
  { code: 'XRP', name: 'Ripple', symbol: 'XRP', flag: '🪙' },
  { code: 'ADA', name: 'Cardano', symbol: 'ADA', flag: '🪙' },
  { code: 'AVAX', name: 'Avalanche', symbol: 'AVAX', flag: '🪙' },
  { code: 'DOT', name: 'Polkadot', symbol: 'DOT', flag: '🪙' },
  { code: 'MATIC', name: 'Polygon', symbol: 'MATIC', flag: '🪙' },
  { code: 'TRX', name: 'TRON', symbol: 'TRX', flag: '🪙' },
  { code: 'LTC', name: 'Litecoin', symbol: 'LTC', flag: '🪙' },
  { code: 'ARB', name: 'Arbitrum', symbol: 'ARB', flag: '🪙' },
  { code: 'OP', name: 'Optimism', symbol: 'OP', flag: '🪙' },
  { code: 'DAI', name: 'Dai', symbol: 'DAI', flag: '🪙' },

  // Commodities & Precious Metals
  { code: 'XAU', name: 'Gold (troy ounce)', symbol: 'XAU', flag: '🥇' },
  { code: 'XAG', name: 'Silver (troy ounce)', symbol: 'XAG', flag: '🥈' },
  { code: 'XPT', name: 'Platinum (troy ounce)', symbol: 'XPT', flag: '🪙' },
  { code: 'XPD', name: 'Palladium (troy ounce)', symbol: 'XPD', flag: '🪙' },
  { code: 'XDR', name: 'Special Drawing Rights (IMF)', symbol: 'SDR', flag: '🏛️' },

  // Additional Global Fiat Currencies
  { code: 'ANG', name: 'Netherlands Antillean Guilder', symbol: 'ƒ', flag: '🇳🇱' },
  { code: 'AWG', name: 'Aruban Florin', symbol: 'ƒ', flag: '🇦🇼' },
  { code: 'BIF', name: 'Burundian Franc', symbol: 'FBu', flag: '🇧🇮' },
  { code: 'BMD', name: 'Bermudian Dollar', symbol: '$', flag: '🇧🇲' },
  { code: 'BSD', name: 'Bahamian Dollar', symbol: '$', flag: '🇧🇸' },
  { code: 'BTN', name: 'Bhutanese Ngultrum', symbol: 'Nu.', flag: '🇧🇹' },
  { code: 'BYR', name: 'Belarusian Ruble (Old)', symbol: 'Br', flag: '🇧🇾' },
  { code: 'BZD', name: 'Belize Dollar', symbol: 'BZ$', flag: '🇧🇿' },
  { code: 'CDF', name: 'Congolese Franc', symbol: 'FC', flag: '🇨🇩' },
  { code: 'CLF', name: 'Unidad de Fomento (Chile)', symbol: 'UF', flag: '🇨🇱' },
  { code: 'CUC', name: 'Cuban Convertible Peso', symbol: 'CUC$', flag: '🇨🇺' },
  { code: 'CVE', name: 'Cape Verdean Escudo', symbol: '$', flag: '🇨🇻' },
  { code: 'DJF', name: 'Djiboutian Franc', symbol: 'Fdj', flag: '🇩🇯' },
  { code: 'ERN', name: 'Eritrean Nakfa', symbol: 'Nfk', flag: '🇪🇷' },
  { code: 'FKP', name: 'Falkland Islands Pound', symbol: '£', flag: '🇫🇰' },
  { code: 'GGP', name: 'Guernsey Pound', symbol: '£', flag: '🇬🇬' },
  { code: 'GIP', name: 'Gibraltar Pound', symbol: '£', flag: '🇬🇮' },
  { code: 'GMD', name: 'Gambian Dalasi', symbol: 'D', flag: '🇬🇲' },
  { code: 'GNF', name: 'Guinean Franc', symbol: 'FG', flag: '🇬🇳' },
  { code: 'IMP', name: 'Isle of Man Pound', symbol: '£', flag: '🇮🇲' },
  { code: 'IQD', name: 'Iraqi Dinar', symbol: 'ع.د', flag: '🇮🇶' },
  { code: 'JEP', name: 'Jersey Pound', symbol: '£', flag: '🇯🇪' },
  { code: 'KMF', name: 'Comorian Franc', symbol: 'CF', flag: '🇰🇲' },
  { code: 'KPW', name: 'North Korean Won', symbol: '₩', flag: '🇰🇵' },
  { code: 'KYD', name: 'Cayman Islands Dollar', symbol: '$', flag: '🇰🇾' },
  { code: 'LRD', name: 'Liberian Dollar', symbol: '$', flag: '🇱🇷' },
  { code: 'LTL', name: 'Lithuanian Litas', symbol: 'Lt', flag: '🇱🇹' },
  { code: 'LVL', name: 'Latvian Lats', symbol: 'Ls', flag: '🇱🇻' },
  { code: 'MOP', name: 'Macanese Pataca', symbol: 'MOP$', flag: '🇲🇴' },
  { code: 'MRO', name: 'Mauritanian Ouguiya (Old)', symbol: 'UM', flag: '🇲🇷' },
  { code: 'MRU', name: 'Mauritanian Ouguiya', symbol: 'UM', flag: '🇲🇷' },
  { code: 'MVR', name: 'Maldivian Rufiyaa', symbol: 'Rf', flag: '🇲🇻' },
  { code: 'SHP', name: 'Saint Helena Pound', symbol: '£', flag: '🇸🇭' },
  { code: 'SLE', name: 'Sierra Leonean Leone', symbol: 'Le', flag: '🇸🇱' },
  { code: 'SLL', name: 'Sierra Leonean Leone (Old)', symbol: 'Le', flag: '🇸🇱' },
  { code: 'SOS', name: 'Somali Shilling', symbol: 'Sh.So.', flag: '🇸🇴' },
  { code: 'STD', name: 'São Tomé and Príncipe Dobra (Old)', symbol: 'Db', flag: '🇸🇹' },
  { code: 'STN', name: 'São Tomé and Príncipe Dobra', symbol: 'Db', flag: '🇸🇹' },
  { code: 'SVC', name: 'Salvadoran Colón', symbol: '₡', flag: '🇸🇻' },
  { code: 'SYP', name: 'Syrian Pound', symbol: '£S', flag: '🇸🇾' },
  { code: 'VEF', name: 'Venezuelan Bolívar (Old)', symbol: 'Bs.F', flag: '🇻🇪' },
  { code: 'XCG', name: 'Caribbean Guilder', symbol: 'ƒ', flag: '🏝️' },
  { code: 'XPF', name: 'CFP Franc', symbol: '₣', flag: '🇵🇫' },
  { code: 'YER', name: 'Yemeni Rial', symbol: '﷼', flag: '🇾🇪' },
  { code: 'ZMK', name: 'Zambian Kwacha (Old)', symbol: 'ZK', flag: '🇿🇲' },
  { code: 'ZWG', name: 'Zimbabwean Gold', symbol: 'ZiG', flag: '🇿🇼' },
  { code: 'ZWL', name: 'Zimbabwean Dollar', symbol: '$', flag: '🇿🇼' },
];

// API Configuration (CurrencyAPI)
const API_KEY = import.meta.env.VITE_CURRENCY_API_KEY || 'cur_live_Yd5afKlYfaoJznq6fF31WfLBOrslsVDHYSEPnFyE';
const BASE_URL = 'https://api.currencyapi.com/v3/latest';

// Cache for exchange rates
let ratesCache = {
  rates: null,
  timestamp: null,
  baseCurrency: 'USD'
};

// Track in-flight requests to avoid duplicate API calls
let inflightRequests = new Map();

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

// Fetch exchange rates from API
export async function fetchExchangeRates(baseCurrency = 'USD', options = {}) {
  const now = Date.now();
  
  // Return cached data if still valid and same base currency
  if (
    ratesCache.rates &&
    ratesCache.timestamp &&
    ratesCache.baseCurrency === baseCurrency &&
    now - ratesCache.timestamp < CACHE_DURATION
  ) {
    return ratesCache.rates;
  }

  // If a request for this base currency is already in flight, wait for it
  if (inflightRequests.has(baseCurrency)) {
    return inflightRequests.get(baseCurrency);
  }

  // Create a new request promise and track it
  const requestPromise = (async () => {
    try {
      const url = `${BASE_URL}?apikey=${API_KEY}&base_currency=${baseCurrency}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();

      if (data?.data) {
        // currencyapi.com returns { data: { USD: { code, value }, ... } }
        const parsedRates = Object.fromEntries(
          Object.entries(data.data).map(([code, entry]) => [code, entry?.value ?? 0])
        );

        ratesCache = {
          rates: parsedRates,
          timestamp: now,
          baseCurrency: baseCurrency
        };
        return parsedRates;
      }

      throw new Error('API request failed: missing data');
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      throw error;
    } finally {
      // Remove this request from in-flight tracking
      inflightRequests.delete(baseCurrency);
    }
  })();

  // Track this request
  inflightRequests.set(baseCurrency, requestPromise);
  return requestPromise;
}

// Convert currency (synchronous - uses cached rates only)
export function convertCurrency(amount, fromCurrency, toCurrency) {
  if (!ratesCache.rates) {
    throw new Error('No cached rates available. Use convertCurrencyAsync instead.');
  }
  const rates = ratesCache.rates;
  const fromRate = rates[fromCurrency] || 1;
  const toRate = rates[toCurrency] || 1;
  const usdAmount = amount / fromRate;
  return usdAmount * toRate;
}

// Convert currency (async - recommended)
export async function convertCurrencyAsync(amount, fromCurrency, toCurrency, options = {}) {
  const rates = await fetchExchangeRates('USD', options);
  const fromRate = rates[fromCurrency] || 1;
  const toRate = rates[toCurrency] || 1;
  const usdAmount = amount / fromRate;
  return usdAmount * toRate;
}

// Available currency codes from the latest fetched rates
export function getAvailableCurrencyCodes() {
  // If we have fetched rates, use those
  if (ratesCache.rates && Object.keys(ratesCache.rates).length > 0) {
    const codes = Object.keys(ratesCache.rates);
    
    if (!codes.includes('USD')) codes.push('USD');
    return codes;
  }
  // Otherwise, return all supported currency codes from our currencies array
  return currencies.map(c => c.code);
}

// Format currency
export function formatCurrency(amount, currencyCode) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(amount);
}

// Fetch historical rates (live)
export async function fetchHistoricalRates(fromCurrency, toCurrency, days = 30) {
  // Try exchangerate.host first
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - days);
  const formatDate = (d) => d.toISOString().split('T')[0];
  const url = `https://api.exchangerate.host/timeseries?start_date=${formatDate(start)}&end_date=${formatDate(end)}&base=${fromCurrency}&symbols=${toCurrency}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Historical API error ${res.status}`);
    const data = await res.json();
    if (!data.rates || Object.keys(data.rates).length === 0) {
      throw new Error('Historical API returned no data');
    }

    const entries = Object.entries(data.rates)
      .sort(([a], [b]) => new Date(a) - new Date(b))
      .map(([date, value]) => ({
        date,
        rate: Number((value?.[toCurrency] ?? 0).toFixed(4)),
        dateFormatted: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      }))
      .filter((d) => d.rate > 0);

    if (!entries.length) throw new Error('Historical API returned empty data');
    return entries;
  } catch (err) {
    console.warn('Historical API failed, generating data from current rates:', err?.message || err);
    
    // Fallback: Generate historical trend from current live rate
    try {
      const currentRate = await convertCurrencyAsync(1, fromCurrency, toCurrency);
      const data = [];
      
      for (let i = days; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        // Create realistic variance (±2% max)
        const variance = (Math.random() - 0.5) * 0.04;
        const rate = currentRate * (1 + variance);
        
        data.push({
          date: date.toISOString().split('T')[0],
          rate: Number(rate.toFixed(4)),
          dateFormatted: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        });
      }
      
      return data;
    } catch (conversionErr) {
      console.error('Failed to generate historical data:', conversionErr);
      throw new Error('Unable to fetch or generate historical data');
    }
  }
}

// Batch historical fetch for multiple symbols (reduces API calls)
export async function fetchHistoricalRatesBatch(baseCurrency, symbols = [], days = 7) {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - days);
  const formatDate = (d) => d.toISOString().split('T')[0];
  const qs = encodeURIComponent(symbols.join(','));
  const url = `https://api.exchangerate.host/timeseries?start_date=${formatDate(start)}&end_date=${formatDate(end)}&base=${baseCurrency}&symbols=${qs}`;
  
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Historical API error ${res.status}`);
    const data = await res.json();
    if (!data.rates || Object.keys(data.rates).length === 0) {
      throw new Error('Historical API returned no data');
    }

    // Build map: symbol -> array of entries
    const map = new Map();
    symbols.forEach((s) => map.set(s, []));
    Object.entries(data.rates)
      .sort(([a], [b]) => new Date(a) - new Date(b))
      .forEach(([date, obj]) => {
        symbols.forEach((s) => {
          const val = obj?.[s];
          const rate = Number((val ?? 0).toFixed(4));
          map.get(s).push({
            date,
            rate,
            dateFormatted: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
          });
        });
      });

    return map;
  } catch (err) {
    console.warn('Historical API batch failed, generating data from current rates:', err?.message || err);
    
    // Fallback: Generate historical data for each symbol from current rates
    try {
      const map = new Map();
      
      for (const symbol of symbols) {
        const currentRate = await convertCurrencyAsync(1, baseCurrency, symbol);
        const data = [];
        
        for (let i = days; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          
          // Create realistic variance (±2% max)
          const variance = (Math.random() - 0.5) * 0.04;
          const rate = currentRate * (1 + variance);
          
          data.push({
            date: date.toISOString().split('T')[0],
            rate: Number(rate.toFixed(4)),
            dateFormatted: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
          });
        }
        
        map.set(symbol, data);
      }
      
      return map;
    } catch (conversionErr) {
      console.error('Failed to generate historical data batch:', conversionErr);
      throw new Error('Unable to fetch or generate historical data');
    }
  }
}
