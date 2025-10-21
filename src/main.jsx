import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { TinaEditProvider } from 'tinacms/dist/edit-state'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TinaEditProvider
      showEditButton={true}
      editMode={
        <BrowserRouter>
          <App />
        </BrowserRouter>
      }
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TinaEditProvider>
  </StrictMode>
)
