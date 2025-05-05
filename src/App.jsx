import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { routes } from './config/routes'
import { BackgroundProvider, useBackground } from './context/BackgroundContext'
import PrivateRoute from './components/PrivateRoute' 

const AppContent = () => {
  const { backgroundColor } = useBackground()
  const location = useLocation()

  const hideNavbarAndFooter = location.pathname === '/login'

  return (
    <div className={`flex flex-col min-h-screen ${backgroundColor}`}>
      {!hideNavbarAndFooter && <Navbar />}
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
      </Routes>
      {!hideNavbarAndFooter && <Footer />}
    </div>
  )
}

function App() {
  return (
    <Router>
      <BackgroundProvider>
        <AppContent />
      </BackgroundProvider>
    </Router>
  )
}

export default App
