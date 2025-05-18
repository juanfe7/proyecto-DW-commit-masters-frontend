import { Link, useLocation, useNavigate } from 'react-router-dom'
import { logout } from '../utils/auth'
import { useEffect, useState } from 'react'
import api from '../config/api'

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [notificacionesNuevas, setNotificacionesNuevas] = useState(0)
  const [menuAbierto, setMenuAbierto] = useState(false)

  const isClienteSection = location.pathname.startsWith('/cliente')
  const isPOSSection = location.pathname.startsWith('/pos')

  const handleLogoClick = () => {
    if (isPOSSection) {
      navigate('/pos')
    } else if (isClienteSection) {
      navigate('/cliente')
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')

    const fetchNotificaciones = async () => {
      try {
        const res = await api.get('/api/notifications', {
          headers: { Authorization: `Bearer ${token}` }
        })
        const sinLeer = res.data.filter(n => !n.read)
        setNotificacionesNuevas(sinLeer.length)
      } catch (err) {
        console.error('Error al cargar notificaciones:', err)
      }
    }

    fetchNotificaciones()
    const interval = setInterval(fetchNotificaciones, 20000)
    return () => clearInterval(interval)
  }, [])

  return (
    <nav className="bg-white border-b border-gray-200 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/logo_sabana_navbar.png"
            alt="Logo"
            className="h-10 w-auto cursor-pointer"
            onClick={handleLogoClick}
          />
        </div>

        {/* Menú hamburguesa móvil */}
        <div className="md:hidden">
          <button onClick={() => setMenuAbierto(!menuAbierto)} className="text-[#041D64] focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuAbierto ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Botones del navbar (desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {isClienteSection && (
            <>
              <Link to="/cliente/historial" className="bg-[#E0EDFF] px-4 py-3 rounded-xl hover:bg-[#d6e8ff]">
                <img src="/receipt-svgrepo-com.svg" alt="Historial" className="w-7 h-7" />
              </Link>
              <Link to="/cliente/carrito" className="bg-[#E0EDFF] px-4 py-3 rounded-xl hover:bg-[#d6e8ff]">
                <img src="/icon-add-to-cart.svg" alt="Carrito" className="w-7 h-7" />
              </Link>
              <Link to="/cliente/reseñas" className="bg-[#E0EDFF] px-4 py-3 rounded-xl hover:bg-[#d6e8ff]">
                <img src="/review-file-svgrepo-com.svg" alt="Reseñas" className="w-7 h-7" />
              </Link>
              <Link to="/cliente/notificaciones" className="relative bg-[#E0EDFF] px-4 py-3 rounded-xl hover:bg-[#d6e8ff]">
                <img src="/bell-svgrepo-com.svg" alt="Notificaciones" className="w-7 h-7" />
                {notificacionesNuevas > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1 rounded-full">
                    {notificacionesNuevas}
                  </span>
                )}
              </Link>
            </>
          )}

          {isPOSSection && (
            <>
              <Link to="/pos/dashboard" className="bg-[#E0EDFF] px-4 py-3 rounded-xl hover:bg-[#d6e8ff]">
                <img src="/receipt-svgrepo-com.svg" alt="Dashboard" className="w-7 h-7" />
              </Link>
              <Link to="/pos/profile" className="bg-[#E0EDFF] px-4 py-3 rounded-xl hover:bg-[#d6e8ff]">
                <img src="/review-file-svgrepo-com.svg" alt="Perfil POS" className="w-7 h-7" />
              </Link>
            </>
          )}

          <button
            onClick={logout}
            className="bg-white px-4 py-2 rounded-lg hover:bg-[#E0EDFF] text-[#041D64] border border-[#041D64]"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Menú desplegable móvil */}
      {menuAbierto && (
        <div className="md:hidden px-4 pb-4 space-y-3 text-center">
          {isClienteSection && (
            <>
              <Link to="/cliente/historial" className="block bg-[#E0EDFF] py-2 rounded-lg">Historial</Link>
              <Link to="/cliente/carrito" className="block bg-[#E0EDFF] py-2 rounded-lg">Carrito</Link>
              <Link to="/cliente/reseñas" className="block bg-[#E0EDFF] py-2 rounded-lg">Reseñas</Link>
              <Link to="/cliente/notificaciones" className="block bg-[#E0EDFF] py-2 rounded-lg">
                Notificaciones
                {notificacionesNuevas > 0 && (
                  <span className="ml-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                    {notificacionesNuevas}
                  </span>
                )}
              </Link>
            </>
          )}

          {isPOSSection && (
            <>
              <Link to="/pos/dashboard" className="block bg-[#E0EDFF] py-2 rounded-lg">Dashboard</Link>
              <Link to="/pos/profile" className="block bg-[#E0EDFF] py-2 rounded-lg">Perfil POS</Link>
            </>
          )}

          <button
            onClick={logout}
            className="w-full bg-white py-2 rounded-lg hover:bg-[#E0EDFF] text-[#041D64] border border-[#041D64]"
          >
            Cerrar Sesión
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar
