import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { routes } from './config/routes'
import { BackgroundProvider, useBackground } from './context/BackgroundContext'
import { twMerge } from 'tailwind-merge'
import { Navigate } from 'react-router-dom'

const AppContent = () => {
  const { backgroundColor } = useBackground()
  const location = useLocation()

  const hideNavbarAndFooter = location.pathname === '/login'

  return (
    <div className={twMerge('min-h-screen', backgroundColor)}>
      {!hideNavbarAndFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        {routes.map((route) => (
          <Route
            key={route.id}
            path={route.path}
            element={<route.component />}
          />
        ))}
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
