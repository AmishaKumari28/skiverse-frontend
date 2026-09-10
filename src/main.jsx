import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import PageRoutes from './routes/PageRoutes.jsx'
import AuthRoute from './routes/AuthRoute.jsx'
import { ContextProvider } from './context/Auth.jsx'

createRoot(document.getElementById('root')).render(
    <ContextProvider><PageRoutes /></ContextProvider>
)
