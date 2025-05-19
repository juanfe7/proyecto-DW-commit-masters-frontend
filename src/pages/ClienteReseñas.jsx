import { useEffect, useState } from 'react'
import api from '../config/api'
import Swal from 'sweetalert2'

const ClienteReseñas = () => {
  const [productos, setProductos] = useState([]) // Lista de productos disponibles
  const [docId, setDocId] = useState('') // Producto seleccionado
  const [rating, setRating] = useState(5) // Calificación
  const [comment, setComment] = useState('') // Comentario

  // Obtiene la lista de productos
  const fetchProductos = async () => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token')
      const res = await api.get('/api/products', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setProductos(res.data)
    } catch (error) {
      console.error('Error al cargar productos:', error)
    }
  }

  // Envía la reseña al backend
  const enviarReseña = async () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')

    // Validacion de campos obligatorios
    if (!docId || !rating || !comment.trim()) {
      Swal.fire('Campos incompletos', 'Por favor completa todos los campos.', 'warning')
      return
    }

    try {
      console.log('📤 docId enviado:', docId)
      await api.post('/api/reviews', {
        docId,
        rating: Number(rating),
        comment
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })

      Swal.fire('¡Gracias!', 'Tu reseña fue enviada con éxito.', 'success')

      // Reinicia el formulario
      setDocId('')
      setRating(5)
      setComment('')
    } catch (error) {
      console.error('Error al enviar reseña:', error)
      Swal.fire('Error', 'Hubo un problema al enviar tu reseña.', 'error')
    }
  }

  useEffect(() => {
    fetchProductos()
  }, [])

  return (
    <div className="max-w-xl mx-auto p-8 text-[#041D64]">
      <h1 className="text-2xl font-bold mb-6">Dejar una Reseña</h1>

      {/* Selector de producto */}
      <label className="block mb-4">
        <span className="block font-medium mb-1">Producto</span>
        <select
          value={docId}
          onChange={(e) => setDocId(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="">Selecciona un producto</option>
          {productos.map((p) => (
            <option key={p.docId} value={p.docId}>
              {p.name}
            </option>
          ))}
        </select>
      </label>

      <label className="block mb-4">
        <span className="block font-medium mb-1">Calificación (1 a 5)</span>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />
      </label>

      <label className="block mb-6">
        <span className="block font-medium mb-1">Comentario</span>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none"
        />
      </label>

      <button
        onClick={enviarReseña}
        className="bg-[#041D64] text-white px-6 py-2 rounded-lg hover:bg-[#193F9E]"
      >
        Enviar Reseña
      </button>
    </div>
  )
}

export default ClienteReseñas
