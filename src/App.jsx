import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { routes } from './config/routes'
import PrivateRoute from './components/PrivateRoute'
import POS from './pages/POS'
import InventarioRestaurante from './pages/InventarioRestaurante'

const AppContent = () => {
  const location = useLocation()

  const hideNavbar = location.pathname === '/login'

  return (
    <div className={`flex flex-col min-h-screen`}>
      {!hideNavbar && <Navbar />}
      <main className="flex-grow overflow-auto">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          {routes.map((route) => {
            const isProtected = route.roles && route.roles.length > 0

            const element = isProtected ? (
              <PrivateRoute allowedRoles={route.roles}>
                <route.component />
              </PrivateRoute>
            ) : (
              <route.component />
            )

            return <Route key={route.id} path={route.path} element={element} />
          })}
          
          {/* Rutas adicionales */}
          <Route path="/pos" element={<POS />} />
          <Route path="/pos/inventarioRestaurante/:ubicacion" element={<InventarioRestaurante />} />
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
