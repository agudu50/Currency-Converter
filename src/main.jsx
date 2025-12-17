import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

console.log('main.jsx loaded');

// App already includes the Router provider
const rootElement = document.getElementById('root');
console.log('root element:', rootElement);

if (!rootElement) {
  console.error('Root element not found! Cannot mount React app.');
  throw new Error('Root element #root not found in index.html');
}

console.log('Creating React root and rendering App');
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
console.log('React app rendered');
