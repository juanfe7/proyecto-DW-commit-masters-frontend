import { Link, useLocation, useNavigate } from 'react-router-dom'
import { logout } from '../utils/auth'

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // Verificar si el usuario está en la sección de cliente
  const isClienteSection = location.pathname.startsWith('/cliente')

  // Verificar si el usuario está en la sección de POS
  const isPOSSection = location.pathname.startsWith('/pos')

  const handleLogoClick = () => {
    if (isPOSSection) {
      navigate('/pos')
    } else if (isClienteSection) {
      navigate('/cliente')
    }
  }

  return (
    <nav className="bg-white text-white p-4 flex items-center justify-between">
      {/* Imagen en el lado izquierdo */}
      <div className="flex items-center">
        <img
          src="/logo_sabana_navbar.png"
          alt="Logo"
          className="w-42 h-auto mr-4 cursor-pointer"
          onClick={handleLogoClick}
        />
      </div>

      {/* Botones lado derecho */}
      <div className="flex items-center space-x-4">
        {/* Cliente: historial y carrito */}
        {isClienteSection && (
          <>
            {/* Historial de pedidos */}
            <Link
              to="/cliente/historial"
              className="bg-[#E0EDFF] px-2 py-2 rounded-lg hover:bg-[#d6e8ff]"
            >
              <img
                src="/receipt-svgrepo-com.svg"
                alt="Historial de Pedidos"
                className="w-6 h-6"
                style={{
                  filter:
                    'invert(13%) sepia(100%) saturate(747%) hue-rotate(211deg) brightness(50%) contrast(120%)',
                }}
              />
            </Link>

            {/* Carrito de compras */}
            <Link
              to="/cliente/carrito"
              className="bg-[#E0EDFF] px-2 py-2 rounded-lg hover:bg-[#d6e8ff]"
            >
              <img
                src="/icon-add-to-cart.svg"
                alt="Carrito de Compras"
                className="w-6 h-6"
                style={{
                  filter:
                    'invert(13%) sepia(100%) saturate(747%) hue-rotate(211deg) brightness(50%) contrast(120%)',
                }}
              />
            </Link>

            {/*Reseñas */}
            <Link
              to="/cliente/reseñas"
              className="bg-[#E0EDFF] px-2 py-2 rounded-lg hover:bg-[#d6e8ff]"
            >
              <img
                src="/review-file-svgrepo-com.svg"
                alt="Dejar Reseña"
                className="w-6 h-6"
                style={{
                  filter:
                    'invert(13%) sepia(100%) saturate(747%) hue-rotate(211deg) brightness(50%) contrast(120%)',
                }}
              />
            </Link>
            <Link
              to="/cliente/notificaciones"
              className="bg-[#E0EDFF] px-2 py-2 rounded-lg hover:bg-[#d6e8ff]"
            >
              <img
                src="/bell-svgrepo-com.svg" 
                alt="Notificaciones"
                className="w-6 h-6"
                style={{
                  filter:
                    'invert(13%) sepia(100%) saturate(747%) hue-rotate(211deg) brightness(50%) contrast(120%)',
                }}
              />
            </Link>
          </>
        )}

        {/* POS: solo dashboard */}
        {isPOSSection && (
          <>
            <Link
              to="/pos/dashboard"
              className="bg-[#E0EDFF] px-2 py-2 rounded-lg hover:bg-[#d6e8ff]"
            >
              <img
                src="/receipt-svgrepo-com.svg"
                alt="Dashboard"
                className="w-6 h-6"
                style={{
                  filter:
                    'invert(13%) sepia(100%) saturate(747%) hue-rotate(211deg) brightness(50%) contrast(120%)',
                }}
              />
            </Link>
            <Link
              to="/pos/profile"
              className="bg-[#E0EDFF] px-2 py-2 rounded-lg hover:bg-[#d6e8ff]"
            >
              <img
                src="/review-file-svgrepo-com.svg"
                alt="Perfil POS"
                className="w-6 h-6"
                style={{
                  filter:
                    'invert(13%) sepia(100%) saturate(747%) hue-rotate(211deg) brightness(50%) contrast(120%)',
                }}
              />
            </Link>
          </>
        )}

        {/* Botón cerrar sesión (para todos) */}
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