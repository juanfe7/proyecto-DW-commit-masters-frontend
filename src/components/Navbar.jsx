import { Link, useLocation, useNavigate } from 'react-router-dom'
import { logout } from '../utils/auth'
import { useEffect, useState } from 'react'
import api from '../config/api'

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [notificacionesNuevas, setNotificacionesNuevas] = useState(0)

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

    fetchNotificaciones() // primer fetch inmediato

    const interval = setInterval(fetchNotificaciones, 20000) // cada 20 segundos

    return () => clearInterval(interval) // limpiar al desmontar
  }, [])

  return (
    <nav className="bg-white text-white p-4 flex items-center justify-between">
      {/* Logo izquierdo */}
      <div className="flex items-center">
        <img
          src="/logo_sabana_navbar.png"
          alt="Logo"
          className="w-42 h-auto mr-4 cursor-pointer"
          onClick={handleLogoClick}
        />
      </div>

      {/* Botones derechos */}
      <div className="flex items-center space-x-4">
        {isClienteSection && (
          <>
            {/* Historial */}
            <Link to="/cliente/historial" className="bg-[#E0EDFF] px-2 py-2 rounded-lg hover:bg-[#d6e8ff]">
              <img
                src="/receipt-svgrepo-com.svg"
                alt="Historial de Pedidos"
                className="w-6 h-6"
                style={{ filter: 'invert(13%) sepia(100%) saturate(747%) hue-rotate(211deg) brightness(50%) contrast(120%)' }}
              />
            </Link>

            {/* Carrito */}
            <Link to="/cliente/carrito" className="bg-[#E0EDFF] px-2 py-2 rounded-lg hover:bg-[#d6e8ff]">
              <img
                src="/icon-add-to-cart.svg"
                alt="Carrito de Compras"
                className="w-6 h-6"
                style={{ filter: 'invert(13%) sepia(100%) saturate(747%) hue-rotate(211deg) brightness(50%) contrast(120%)' }}
              />
            </Link>

            {/* Reseñas */}
            <Link to="/cliente/reseñas" className="bg-[#E0EDFF] px-2 py-2 rounded-lg hover:bg-[#d6e8ff]">
              <img
                src="/review-file-svgrepo-com.svg"
                alt="Dejar Reseña"
                className="w-6 h-6"
                style={{ filter: 'invert(13%) sepia(100%) saturate(747%) hue-rotate(211deg) brightness(50%) contrast(120%)' }}
              />
            </Link>

            {/* Notificaciones */}
            <Link to="/cliente/notificaciones" className="relative bg-[#E0EDFF] px-2 py-2 rounded-lg hover:bg-[#d6e8ff]">
              <img
                src="/bell-svgrepo-com.svg"
                alt="Notificaciones"
                className="w-6 h-6"
                style={{ filter: 'invert(13%) sepia(100%) saturate(747%) hue-rotate(211deg) brightness(50%) contrast(120%)' }}
              />
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
            <Link to="/pos/dashboard" className="bg-[#E0EDFF] px-2 py-2 rounded-lg hover:bg-[#d6e8ff]">
              <img
                src="/receipt-svgrepo-com.svg"
                alt="Dashboard"
                className="w-6 h-6"
                style={{ filter: 'invert(13%) sepia(100%) saturate(747%) hue-rotate(211deg) brightness(50%) contrast(120%)' }}
              />
            </Link>
            <Link to="/pos/profile" className="bg-[#E0EDFF] px-2 py-2 rounded-lg hover:bg-[#d6e8ff]">
              <img
                src="/review-file-svgrepo-com.svg"
                alt="Perfil POS"
                className="w-6 h-6"
                style={{ filter: 'invert(13%) sepia(100%) saturate(747%) hue-rotate(211deg) brightness(50%) contrast(120%)' }}
              />
            </Link>
          </>
        )}

        {/* Logout */}
        <button
          onClick={logout}
          className="bg-white px-3 py-2 rounded-lg hover:bg-[#E0EDFF] text-[#041D64] border border-[#041D64]"
        >
          Cerrar Sesión
        </button>
      </div>
    </nav>
  )
}

export default Navbar
