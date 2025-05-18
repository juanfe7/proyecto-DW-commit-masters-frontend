import { useEffect, useState } from 'react'
import api from '../config/api'

const POSProfile = () => {
  const [reseñas, setReseñas] = useState([])
  const [cargando, setCargando] = useState(true)

  const fetchReseñas = async () => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token')
      const res = await api.get('/api/reviews', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setReseñas(res.data)
    } catch (error) {
      console.error('Error al obtener reseñas:', error)
    } finally {
      setCargando(false)
    }
  }

  const renderEstrellas = (n) =>
    '★★★★★☆☆☆☆☆'.slice(5 - n, 10 - n)

  useEffect(() => {
    fetchReseñas()
  }, [])

  return (
    <div className="min-h-screen bg-white text-[#041D64] px-8 py-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Reseñas de Productos</h1>

      {cargando ? (
        <p className="text-gray-500">Cargando reseñas...</p>
      ) : reseñas.length === 0 ? (
        <p className="text-gray-500">No hay reseñas registradas.</p>
      ) : (
        <div className="space-y-6">
          {reseñas.map((r) => (
            <div key={r.id} className="border border-gray-300 rounded-lg p-4 shadow-md bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">{r.productName}</h2>
                <span className="text-yellow-500 font-bold">{renderEstrellas(r.rating)}</span>
              </div>
              <p className="text-sm text-gray-800 mb-1"><strong>Comentario:</strong> {r.comment}</p>
              <p className="text-sm text-gray-600"><strong>Cliente:</strong> {r.email}</p>
              <p className="text-xs text-gray-400">
                {new Date(r.createdAt).toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'short' })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default POSProfile
