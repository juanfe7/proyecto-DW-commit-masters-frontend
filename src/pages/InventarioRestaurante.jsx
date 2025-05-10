import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../config/api'

const InventarioRestaurante = () => {
  const { ubicacion } = useParams()
  const navigate = useNavigate()
  const [productos, setProductos] = useState([])
  const [productoSeleccionado, setProductoSeleccionado] = useState(null)

  const handleVolverAtras = () => {
    navigate('/pos')
  }

  const handleAgregarProducto = () => {
    alert(`Agregar producto a ${ubicacion}`)
  }

  const fetchProductos = async () => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token')
      if (!token) {
        console.warn('⚠️ No hay token disponible')
        return
      }

      const res = await api.get(`/api/products?location=${encodeURIComponent(ubicacion)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setProductos(res.data)
    } catch (error) {
      console.error('❌ Error al cargar productos:', error)
    }
  }

  const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }

  useEffect(() => {
    fetchProductos()
  }, [ubicacion])

  return (
    <div className="min-h-screen bg-white text-[#041D64] p-8">
      {/* Encabezado */}
      <div className="mb-6 border-b-4 border-[#E0EDFF] pb-4 flex justify-between items-center">
        {/* Título alineado a la izquierda */}
        <h1 className="text-3xl font-bold">Inventario de {ubicacion}</h1>

        {/* Botones alineados a la derecha */}
        <div className="flex gap-4">
          <button
            onClick={handleAgregarProducto}
            className="bg-[#041D64] text-white px-4 py-2 rounded-lg hover:bg-[#193F9E]"
          >
            Agregar Producto
          </button>
          <button
            onClick={handleVolverAtras}
            className="bg-[#041D64] text-white px-4 py-2 rounded-lg hover:bg-[#193F9E]"
          >
            Volver Atrás
          </button>
        </div>
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-3 gap-8">
        {productos.map((producto) => (
          <div key={producto.id} className="flex flex-col items-center">
            <div
              className="w-3/4 h-60 bg-gray-200 rounded-lg overflow-hidden cursor-pointer"
              onClick={() => setProductoSeleccionado(producto)} // Abrir modal al hacer clic en la imagen
            >
              <img src={producto.image} alt={producto.name} className="w-full h-full object-cover" />
            </div>
            <h2 className="mt-2 font-bold text-lg">{producto.name}</h2>
            <p className="text-sm text-gray-700 font-medium">Precio: ${producto.price}</p>
            <p className={`text-sm font-medium ${producto.stock <= 10 ? 'text-red-500' : 'text-gray-700'}`}>
              Stock: {producto.stock}
            </p>
            <button
              onClick={() => setProductoSeleccionado(producto)}
              className="mt-2 bg-[#041D64] text-white px-4 py-2 rounded-lg hover:bg-[#193F9E]"
            >
              Ver
            </button>
          </div>
        ))}
      </div>

      {/* Modal de información del producto */}
      {productoSeleccionado && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          id="modal-info-bg"
          onClick={(e) => {
            if (e.target.id === 'modal-info-bg') setProductoSeleccionado(null)
          }}
        >
          <div className="bg-white p-6 rounded-xl shadow-2xl max-w-3xl w-full flex flex-col">
            <div className="flex justify-between items-center border-b-2 border-[#E0EDFF] pb-4 mb-4">
              <h2 className="text-2xl font-bold text-[#041D64]">Información Producto</h2>
              <button
                onClick={() => setProductoSeleccionado(null)}
                className="text-[#041D64] text-2xl font-bold hover:text-blue-600"
              >
                X
              </button>
            </div>

            <div className="flex">
              <div className="w-1/2 pr-4">
                <img
                  src={productoSeleccionado.image}
                  alt={productoSeleccionado.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>

              <div className="w-1/2 flex flex-col justify-between">
                <div>
                  <p><span className="font-semibold">Nombre:</span> {productoSeleccionado.name}</p>
                  <p><span className="font-semibold">Categoría:</span> {capitalizeFirstLetter(productoSeleccionado.category)}</p>
                  <p><span className="font-semibold">Ubicación:</span> {productoSeleccionado.location}</p>
                  <p><span className="font-semibold">Precio:</span> ${productoSeleccionado.price}</p>
                  <p className={`font-semibold ${productoSeleccionado.stock <= 10 ? 'text-red-500' : 'text-gray-700'}`}>
                    Stock: {productoSeleccionado.stock}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default InventarioRestaurante