import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

console.log('main.jsx loaded');

// Global error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  document.body.innerHTML = `<div style="padding:20px; color:red;">
    <h2>Error loading app</h2>
    <pre>${String(event.error)}</pre>
  </div>`;
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  document.body.innerHTML = `<div style="padding:20px; color:red;">
    <h2>Promise rejection</h2>
    <pre>${String(event.reason)}</pre>
  </div>`;
});

// App already includes the Router provider
const rootElement = document.getElementById('root');
console.log('root element:', rootElement);

if (!rootElement) {
  console.error('Root element not found! Cannot mount React app.');
  document.body.innerHTML = '<div style="padding:20px; color:red;"><h2>Root element #root not found</h2></div>';
  throw new Error('Root element #root not found in index.html');
}

console.log('Creating React root and rendering App');
try {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  console.log('React app rendered');
} catch (err) {
  console.error('React render error:', err);
  document.body.innerHTML = `<div style="padding:20px; color:red;">
    <h2>Failed to render app</h2>
    <pre>${String(err)}</pre>
  </div>`;
}
