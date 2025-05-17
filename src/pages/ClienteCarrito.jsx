import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCart, removeFromCart, clearCart } from '../utils/cart'

const ClienteCarrito = () => {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    cargarCarrito()
  }, [])

  const cargarCarrito = () => {
    const items = getCart()
    setCartItems(items)
  }

  const handleVolverAtras = () => {
    navigate('/cliente')
  }

  const handleEliminar = (id) => {
    removeFromCart(id)
    cargarCarrito()
  }

  const handleVaciarCarrito = () => {
    clearCart()
    setCartItems([])
  }

  const calcularTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  return (
    <div className="min-h-screen bg-white text-[#041D64]">
      {/* Encabezado */}
      <div className="flex justify-between items-center px-8 py-6 border-b-4 border-[#E0EDFF] max-w-[80%] mx-auto">
        <h1 className="text-2xl font-bold">Carrito de Compras</h1>
        <button
          onClick={handleVolverAtras}
          className="bg-[#041D64] text-white px-4 py-2 rounded-lg hover:bg-[#193F9E]"
        >
          Volver Atrás
        </button>
      </div>

      {/* Contenido principal */}
      <div className="px-8 py-6 max-w-[80%] mx-auto">
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Tu carrito está vacío.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="border p-4 rounded-lg shadow flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p>Cantidad: {item.quantity}</p>
                    <p>Precio unitario: ${item.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#041D64]">
                      Subtotal: ${item.price * item.quantity}
                    </p>
                    <button
                      onClick={() => handleEliminar(item.id)}
                      className="mt-2 text-red-600 hover:underline text-sm"
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Total y botón de vaciar */}
            <div className="mt-6 flex justify-between items-center">
              <div className="text-xl font-bold text-[#041D64]">
                Total: ${calcularTotal()}
              </div>
              <button
                onClick={handleVaciarCarrito}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Vaciar Carrito
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ClienteCarrito
