import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TinaApp from './TinaApp.jsx'
import client from '../tina/__generated__/client'

// Fetch the content
async function loadContent() {
  try {
    const result = await client.queries.page({ relativePath: 'home.json' });
    return result;
  } catch (error) {
    console.error('Error loading TinaCMS content:', error);
    // Fallback to default App if TinaCMS fails
    return null;
  }
}

// Load and render
loadContent().then((tinaProps) => {
  const root = createRoot(document.getElementById('root'));

  if (tinaProps) {
    // Render with TinaCMS data
    root.render(
      <StrictMode>
        <TinaApp {...tinaProps} />
      </StrictMode>
    );
  } else {
    // Fallback to regular App
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  }
});
