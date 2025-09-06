import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { CookiesProvider } from 'react-cookie'
import { AuthProvider } from './utils/AuthContext.jsx'
import App from './App.jsx'


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <CookiesProvider>
//         <App />
//     </CookiesProvider>
//   </StrictMode>,
// )


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CookiesProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </CookiesProvider>
  </StrictMode>,
);

