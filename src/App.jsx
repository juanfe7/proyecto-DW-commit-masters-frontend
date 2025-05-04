import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { routes } from './config/routes'
import { BackgroundProvider, useBackground } from './context/BackgroundContext'

const AppContent = () => {
  const { backgroundColor } = useBackground()
  const location = useLocation()

  const hideNavbarAndFooter = location.pathname === '/login'

  return (
    <div className={`flex flex-col min-h-screen ${backgroundColor}`}>
      {!hideNavbarAndFooter && <Navbar />}
      <div className="flex-grow overflow-auto">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          {routes.map((route) => (
            <Route key={route.id} path={route.path} element={<route.component />} />
          ))}
        </Routes>
      </div>
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
