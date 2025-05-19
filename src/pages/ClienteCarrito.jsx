import api from '../config/api'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCart, removeFromCart, clearCart } from '../utils/cart'
import { getUserFromToken } from '../utils/auth'

const ClienteCarrito = () => {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    cargarCarrito()
  }, [])

  // Obtiene los productos del carrito
  const cargarCarrito = () => {
    const items = getCart()
    setCartItems(items)
  }

  const handleVolverAtras = () => {
    navigate('/cliente')
  }

  // Elimina un producto del carrito
  const handleEliminar = (id) => {
    removeFromCart(id)
    cargarCarrito()
  }

  // Vacía todo el carrito
  const handleVaciarCarrito = () => {
    clearCart()
    setCartItems([])
  }

  // Envía el pedido al backend y limpia el carrito si es exitoso
  const handleHacerPedido = async () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const products = getCart().map(({ id, quantity }) => ({ id, quantity }));

  if (!products.length) {
    alert('Tu carrito está vacío.');
    return;
  }

  try {
    const response = await api.post(
      '/api/orders',
      { products },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert('Pedido realizado con éxito');
    clearCart();
    setCartItems([]);
    navigate('/cliente/historial');
  } catch (error) {
    console.error('Error al hacer pedido:', error);
    const mensaje = error?.response?.data?.message || 'Hubo un error al realizar el pedido.';
    alert(`${mensaje}`);
  }
  };

  // Calcula el total del carrito
  const calcularTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  return (
    <div className="min-h-screen bg-white text-[#041D64]">
      {/*Encabezado*/}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 sm:px-8 py-6 border-b-4 border-[#E0EDFF] max-w-7xl mx-auto gap-4">
        <h1 className="text-2xl font-bold">Carrito de Compras</h1>
        <button
          onClick={handleVolverAtras}
          className="bg-[#041D64] text-white px-4 py-2 rounded-lg hover:bg-[#193F9E]"
        >
          Volver Atrás
        </button>
      </div>

      {/*Contenido principal*/}
      <div className="px-4 sm:px-8 py-6 max-w-7xl mx-auto">
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Tu carrito está vacío.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="border p-4 rounded-lg shadow flex flex-col sm:flex-row justify-between gap-4"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-lg">{item.name}</p>
                    <p className="text-sm">Cantidad: {item.quantity}</p>
                    <p className="text-sm">Precio unitario: ${item.price}</p>
                  </div>
                  <div className="text-left sm:text-right">
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

            {/*Total y acciones*/}
            <div className="mt-6 flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
              <div className="text-xl font-bold text-[#041D64]">
                Total: ${calcularTotal()}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleVaciarCarrito}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Vaciar Carrito
                </button>
                <button
                  onClick={handleHacerPedido}
                  className="bg-[#041D64] text-white px-4 py-2 rounded-lg hover:bg-[#193F9E]"
                >
                  Hacer Pedido
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )

}

export default ClienteCarrito