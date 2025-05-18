import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../config/api'

const ClienteHistorial = () => {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const handleVolverAtras = () => {
    navigate('/cliente')
  }

  const handleLimpiarHistorial = () => {
    const confirmacion = window.confirm('¿Estás seguro de que quieres borrar tu historial visualmente?')
    if (confirmacion) {
      setOrders([]) // Solo borra del estado
    }
  }

  useEffect(() => {
    const fetchHistorial = async () => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token')
      try {
        const response = await api.get('/api/orders/history', {
          headers: { Authorization: `Bearer ${token}` },
        })
        setOrders(response.data)
      } catch (err) {
        setError('No se pudo cargar el historial de pedidos.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchHistorial()
  }, [])

  return (
    <div className="min-h-screen bg-white text-[#041D64]">
      {/* Encabezado responsive */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 sm:px-8 py-6 border-b-4 border-[#E0EDFF] max-w-7xl mx-auto gap-4">
        <h1 className="text-2xl font-bold">Historial de Pedidos</h1>
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={handleVolverAtras}
            className="bg-[#041D64] text-white px-4 py-2 rounded-lg hover:bg-[#193F9E]"
          >
            Volver Atrás
          </button>
          <button
            onClick={handleLimpiarHistorial}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Limpiar Historial
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="px-4 sm:px-8 py-6 max-w-7xl mx-auto">
        {loading ? (
          <p className="text-gray-500">Cargando pedidos...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-500">Aún no has realizado pedidos.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border border-gray-300 rounded-xl shadow-sm p-4 bg-white"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2">
                  <h2 className="text-lg font-semibold">Pedido #{order.id}</h2>
                  <span
                    className={`px-3 py-1 text-sm rounded-full whitespace-nowrap ${
                      order.status === 'en confirmacion'
                        ? 'bg-yellow-200 text-yellow-800'
                        : order.status === 'en proceso'
                        ? 'bg-blue-200 text-blue-800'
                        : order.status === 'listo'
                        ? 'bg-indigo-200 text-indigo-800'
                        : 'bg-green-200 text-green-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Fecha:{' '}
                  {new Date(order.createdAt._seconds * 1000).toLocaleString()}
                </p>
                <p className="text-sm text-gray-700 font-medium mt-2">
                  Total: ${order.total}
                </p>
                <ul className="mt-3 space-y-1">
                  {order.products.map((prod, idx) => (
                    <li key={idx} className="text-sm text-gray-700">
                      • {prod.name} (x{prod.quantity}) – ${prod.totalPrice}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ClienteHistorial
