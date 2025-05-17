import { useEffect, useState } from 'react'
import api from '../config/api'

const POSDashboard = () => {
  const [ordenes, setOrdenes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchOrdenes = async () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    try {
      const estados = ['en confirmacion', 'en proceso']
      const responses = await Promise.all(estados.map(status =>
        api.get(`/api/orders?status=${encodeURIComponent(status)}`, {
          headers: { Authorization: `Bearer ${token}` }
        }).then(res => res.data)
      ))
      const combinadas = responses.flat()
      setOrdenes(combinadas)
    } catch (err) {
      setError('No se pudieron obtener las órdenes')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrdenes()
  }, [])

  const actualizarEstado = async (id, nuevoEstado) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    try {
      await api.patch(`/api/orders/${id}/status`, { status: nuevoEstado }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      alert(`Estado actualizado a "${nuevoEstado}"`)
      fetchOrdenes()
    } catch (err) {
      console.error(err)
      alert('Error al actualizar el estado')
    }
  }

  return (
    <div className="min-h-screen bg-white text-[#041D64] px-8 py-6 max-w-[80%] mx-auto">
      <h1 className="text-3xl font-bold mb-6">Gestión de Pedidos</h1>

      {loading ? (
        <p className="text-gray-500">Cargando órdenes...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : ordenes.length === 0 ? (
        <p className="text-gray-500">No hay órdenes en confirmación o proceso.</p>
      ) : (
        <div className="space-y-6">
          {ordenes.map((orden) => (
            <div
              key={orden.id}
              className="border border-gray-300 rounded-lg shadow-md p-4 bg-gray-50"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">Orden #{orden.id}</h2>
                <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    orden.status === 'en confirmacion'
                      ? 'bg-yellow-200 text-yellow-800'
                      : 'bg-blue-200 text-blue-800'
                  }`}
                >
                  {orden.status}
                </span>
              </div>
              <p className="text-sm text-gray-700">Cliente: {orden.name}</p>
              <p className="text-sm text-gray-700 mb-2">Total: ${orden.total}</p>
              <ul className="text-sm text-gray-600 mb-3">
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
                  onClick={() => actualizarEstado(orden.id, 'entregado')}
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

export default POSDashboard
