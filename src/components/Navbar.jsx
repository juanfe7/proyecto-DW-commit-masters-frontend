import { Link, useLocation, useNavigate } from 'react-router-dom'
import { logout } from '../utils/auth'
import { useState } from 'react'

const Navbar = ({ onSearch }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchText, setSearchText] = useState('')

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

  const handleInputChange = (e) => {
    const value = e.target.value
    setSearchText(value)
    onSearch(value) // Comunica el valor al componente Cliente
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

      {/* Input de búsqueda en el centro */}
      {isClienteSection && (
        <div className="flex-grow mx-4">
          <input
            type="text"
            value={searchText}
            onChange={handleInputChange}
            placeholder="Buscar comida, restaurantes, cafeterías..."
            className="w-full px-4 py-2 rounded-lg text-black bg-[#ECEDF1]"
          />
        </div>
      )}

      {/* Botones en el lado derecho */}
      <div className="flex items-center space-x-4">
        {isClienteSection && (
          <>
            <Link
              to="/cliente/historial"
              className="bg-[#E0EDFF] px-2 py-2"
            >
              <img
                src="/receipt-svgrepo-com.svg"
                alt="Historial de Pedidos"
                className="w-6 h-6"
                style={{
                  filter: 'invert(13%) sepia(100%) saturate(747%) hue-rotate(211deg) brightness(50%) contrast(120%)',
                }}
              />
            </Link>
            <Link
              to="/cliente/carrito"
              className="bg-[#E0EDFF] px-2 py-2"
            >
              <img
                src="/icon-add-to-cart.svg"
                alt="Carrito de Compras"
                className="w-6 h-6"
                style={{
                  filter: 'invert(13%) sepia(100%) saturate(747%) hue-rotate(211deg) brightness(50%) contrast(120%)',
                }}
              />
            </Link>
          </>
        )}
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