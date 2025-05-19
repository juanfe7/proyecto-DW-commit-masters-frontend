import { useEffect, useState } from 'react'
import api from '../config/api'

const ClienteNotificaciones = () => {
  const [notificaciones, setNotificaciones] = useState([])

  // Obtiene las notificaciones del backend
  const fetchNotificaciones = async () => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token')
      const res = await api.get('/api/notifications', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setNotificaciones(res.data)
    } catch (error) {
      console.error('Error al obtener notificaciones:', error)
    }
  }

  // Marca una notificacion como leida y actualiza la lista
  const marcarComoLeida = async (id) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    try {
      await api.patch(`/api/notifications/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchNotificaciones()
    } catch (err) {
      console.error('Error al marcar como leída:', err)
    }
  }

  // Carga las notificaciones
  useEffect(() => {
    fetchNotificaciones()
  }, [])

  return (
    <div className="max-w-xl mx-auto p-6 text-[#041D64]">
      <h1 className="text-2xl font-bold mb-4">Notificaciones</h1>

      {/* Lista de notificaciones*/}
      {notificaciones.length === 0 ? (
        <p className="text-gray-500">No tienes notificaciones nuevas.</p>
      ) : (
        notificaciones.map(n => (
            <div
              key={n.id}
              className={`mb-4 p-4 rounded shadow ${
                n.read
                  ? 'bg-gray-100'
                  : n.message.includes('listo')
                  ? 'bg-indigo-100'
                  : 'bg-blue-100'
              }`}
            >
            <p className="text-sm">{n.message}</p>
            <p className="text-xs text-gray-500 mt-1">{new Date(n.createdAt).toLocaleString()}</p>
            {!n.read && (
              <button
                onClick={() => marcarComoLeida(n.id)}
                className="mt-2 text-blue-600 text-sm hover:underline"
              >
                Marcar como leída
              </button>
            )}
          </div>
        ))
      )}
    </div>
  )
}

export default ClienteNotificaciones
