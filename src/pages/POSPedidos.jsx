import { useEffect, useState } from 'react'
import api from '../config/api'
import Swal from 'sweetalert2'

// Pagina de gestion de pedidos para POS
const POSPedidos = () => {
  const [ordenes, setOrdenes] = useState([]) // Lista de ordenes
  const [loading, setLoading] = useState(true) // Estado de carga
  const [error, setError] = useState(null) // Estado de error

  // Obtiene todas las ordenes del backend
  const obtenerOrdenes = async () => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token')
      const res = await api.get('/api/orders/all', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setOrdenes(res.data)
    } catch (err) {
      setError('Error al cargar las órdenes')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Cambia el estado de una orden y recarga la lista
  const actualizarEstado = async (id, nuevoEstado) => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token')
      await api.patch(`/api/orders/${id}/status`, { status: nuevoEstado }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      obtenerOrdenes()
    } catch (err) {
      console.error('Error al actualizar estado:', err)
    }
  }

  // Carga las ordenes
  useEffect(() => {
    obtenerOrdenes()
  }, [])

  // Filtra solo las ordenes activas (no entregadas)
  const ordenesActivas = ordenes.filter(
    (orden) => orden.status === 'en confirmacion' || orden.status === 'en proceso' || orden.status === 'listo'
  )

  return (
    <div className="min-h-screen bg-white text-[#041D64] px-4 sm:px-8 py-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">Gestión de Pedidos</h1>

      {/* Muestra estado de carga, error o lista de ordenes activas */}
      {loading ? (
        <p className="text-gray-500">Cargando órdenes...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : ordenesActivas.length === 0 ? (
        <p className="text-gray-500">No hay órdenes en confirmación, proceso o listas.</p>
      ) : (
        <div className="space-y-6">
          {ordenesActivas.map((orden) => (
            <div
              key={orden.id}
              className="border border-gray-300 rounded-xl shadow-sm p-4 bg-gray-50"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2">
                <h2 className="text-lg font-semibold">Orden #{orden.id}</h2>
                <span
                  className={`px-3 py-1 text-sm rounded-full whitespace-nowrap ${
                    orden.status === 'en confirmacion'
                      ? 'bg-yellow-200 text-yellow-800'
                      : orden.status === 'en proceso'
                      ? 'bg-blue-200 text-blue-800'
                      : orden.status === 'listo'
                      ? 'bg-indigo-200 text-indigo-800'
                      : 'bg-green-200 text-green-800'
                  }`}
                >
                  {orden.status}
                </span>
              </div>

              <p className="text-sm text-gray-700">Cliente: {orden.name}</p>
              <p className="text-sm text-gray-700 mb-2">Total: ${orden.total}</p>
              <ul className="text-sm text-gray-600 mb-3 space-y-1">
                {orden.products.map((prod, i) => (
                  <li key={i}>• {prod.name} (x{prod.quantity}) – {prod.location}</li>
                ))}
              </ul>

              {orden.status === 'en confirmacion' && (
                <button
                  onClick={() => actualizarEstado(orden.id, 'en proceso')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Confirmar Pedido
                </button>
              )}

              {orden.status === 'en proceso' && (
                <button
                  onClick={() => actualizarEstado(orden.id, 'listo')}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                >
                  Marcar como Listo
                </button>
              )}

              {orden.status === 'listo' && (
                <button
                  onClick={async () => {
                    await actualizarEstado(orden.id, 'entregado');
                    Swal.fire({
                      title: "Pedido entregado",
                      text: "El pedido fue marcado como entregado exitosamente.",
                      icon: "success",
                      confirmButtonText: "OK",
                      customClass: {
                        confirmButton: "bg-[#041D64] text-white px-4 py-2 rounded-lg hover:bg-[#193F9E]"
                      },
                      buttonsStyling: false
                    });
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Marcar como Entregado
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default POSPedidos
