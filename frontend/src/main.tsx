
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import  AppContextProvider  from './context/AppContext.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'

import { ToastContainer } from 'react-toastify';



createRoot(document.getElementById('root')!).render(

  <ThemeProvider 
  defaultTheme="dark" storageKey="vite-ui-theme"
   >
  <BrowserRouter>
    <AppContextProvider>
        <App />
    </AppContextProvider>

      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="dark"
      />
 
  </BrowserRouter>

  </ThemeProvider>


   
 
)
