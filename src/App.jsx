import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { routes } from './config/routes'
import PrivateRoute from './components/PrivateRoute'

const AppContent = () => {
  const location = useLocation()

  // Oculta el navbar solo en la página de login
  const hideNavbar = location.pathname === '/login'

  return (
    <div className="flex flex-col min-h-screen">
      {!hideNavbar && <Navbar />}

      <main className="flex-grow overflow-auto">
        <Routes>
          {/* Redirección de la raíz a /login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Rutas dinámicas desde routes.js */}
          {routes.map(({ id, path, component: Component, roles }) => {
            const isProtected = roles && roles.length > 0

            const element = isProtected ? (
              <PrivateRoute allowedRoles={roles}>
                <Component />
              </PrivateRoute>
            ) : (
              <Component />
            )

            return <Route key={id} path={path} element={element} />
          })}
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
