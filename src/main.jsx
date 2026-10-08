import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Font retro (fontsource: file locali, nessun CDN)
import '@fontsource/press-start-2p/latin-400.css'
import '@fontsource/vt323/latin-400.css'

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
// Bootstrap JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import './styles/index.css'


import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
