import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../config/api'

const InventarioRestaurante = () => {
  const { ubicacion } = useParams()
  const navigate = useNavigate()
  const [productos, setProductos] = useState([])
  const [productoSeleccionado, setProductoSeleccionado] = useState(null)
  const [editando, setEditando] = useState(false)
  const [productoEditado, setProductoEditado] = useState({})
  const [agregando, setAgregando] = useState(false)
  const [nuevoProducto, setNuevoProducto] = useState({ name: '', price: '', stock: '', imageUrl: '', category: '' })

  const handleVolverAtras = () => navigate('/pos')

  const fetchProductos = async () => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token')
      if (!token) return
      const res = await api.get(`/api/products?location=${encodeURIComponent(ubicacion)}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setProductos(res.data)
    } catch (error) {
      console.error('❌ Error al cargar productos:', error)
    }
  }

  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()

  useEffect(() => {
    fetchProductos()
  }, [ubicacion])

  const handleEditarConfirmar = async () => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token')
      await api.put(`/api/products/${productoEditado.id}`, productoEditado, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setEditando(false)
      fetchProductos()
    } catch (err) {
      console.error('Error al actualizar producto:', err)
      alert('Error al actualizar producto')
    }
  }

  return (
    <div className="min-h-screen bg-white text-[#041D64] p-8">
      <div className="mb-6 border-b-4 border-[#E0EDFF] pb-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Inventario de {ubicacion}</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setAgregando(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >Agregar Producto</button>
          <button
            onClick={handleVolverAtras}
            className="bg-[#041D64] text-white px-4 py-2 rounded-lg hover:bg-[#193F9E]"
          >Volver Atrás</button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {productos.map((producto) => (
          <div key={producto.id} className="flex flex-col items-center">
            <div
              className="w-3/4 h-60 bg-gray-200 rounded-lg overflow-hidden"
              onClick={() => setProductoSeleccionado(producto)}
            >
              <img src={producto.image || producto.imageUrl} alt={producto.name} className="w-full h-full object-cover" />
            </div>
            <h2 className="mt-2 font-bold text-lg">{producto.name}</h2>
            <p className="text-sm text-gray-700 font-medium">Precio: ${producto.price}</p>
            <p className={`text-sm font-medium ${producto.stock <= 10 ? 'text-red-500' : 'text-gray-700'}`}>Stock: {producto.stock}</p>
            <button
              onClick={() => setProductoSeleccionado(producto)}
              className="mt-2 bg-[#041D64] text-white px-4 py-2 rounded-lg hover:bg-[#193F9E]"
            >Ver</button>
          </div>
        ))}
      </div>

      {/* Modal Información Producto */}
      {productoSeleccionado && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-xl shadow-2xl max-w-xl w-full flex flex-col">
            <h2 className="text-2xl font-bold text-[#041D64] mb-4">Información Producto</h2>
            <div className="flex gap-4">
              <div className="w-1/2">
                <img
                  src={productoSeleccionado.image || productoSeleccionado.imageUrl}
                  alt={productoSeleccionado.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <div className="w-1/2 flex flex-col justify-between">
                <p><span className="font-semibold">Nombre:</span> {productoSeleccionado.name}</p>
                <p><span className="font-semibold">Categoría:</span> {capitalizeFirstLetter(productoSeleccionado.category)}</p>
                <p><span className="font-semibold">Ubicación:</span> {productoSeleccionado.location}</p>
                <p><span className="font-semibold">Precio:</span> ${productoSeleccionado.price}</p>
                <p className={`font-semibold ${productoSeleccionado.stock <= 10 ? 'text-red-500' : 'text-gray-700'}`}>Stock: {productoSeleccionado.stock}</p>
                <button
                  onClick={() => {
                    setEditando(true)
                    setProductoEditado(productoSeleccionado)
                    setProductoSeleccionado(null)
                  }}
                  className="mt-4 bg-[#041D64] text-white px-4 py-2 rounded-lg hover:bg-[#193F9E]"
                >Editar Producto</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Editar Producto */}
      {editando && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-xl shadow-2xl max-w-xl w-full flex flex-col">
            <h2 className="text-2xl font-bold text-[#041D64] mb-4">Editar Producto</h2>
            <div className="flex flex-col gap-4">
              <input type="text" placeholder="Nombre" className="border p-2 rounded"
                value={productoEditado.name}
                onChange={(e) => setProductoEditado({ ...productoEditado, name: e.target.value })}
              />
              <input type="number" placeholder="Precio" className="border p-2 rounded"
                value={productoEditado.price}
                onChange={(e) => setProductoEditado({ ...productoEditado, price: e.target.value })}
              />
              <input type="number" placeholder="Stock" className="border p-2 rounded"
                value={productoEditado.stock}
                onChange={(e) => setProductoEditado({ ...productoEditado, stock: e.target.value })}
              />
              <button
                className="bg-green-600 text-white py-2 rounded hover:bg-green-700 mt-2"
                onClick={handleEditarConfirmar}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Añadir Producto */}
      {agregando && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-xl shadow-2xl max-w-xl w-full flex flex-col">
            <h2 className="text-2xl font-bold text-[#041D64] mb-4">Añadir Producto</h2>
            <div className="flex flex-col gap-4">
              <input type="text" placeholder="Nombre" className="border p-2 rounded"
                value={nuevoProducto.name}
                onChange={(e) => setNuevoProducto({ ...nuevoProducto, name: e.target.value })}
              />
              <input type="number" placeholder="Precio" className="border p-2 rounded"
                value={nuevoProducto.price}
                onChange={(e) => setNuevoProducto({ ...nuevoProducto, price: e.target.value })}
              />
              <input type="number" placeholder="Stock" className="border p-2 rounded"
                value={nuevoProducto.stock}
                onChange={(e) => setNuevoProducto({ ...nuevoProducto, stock: e.target.value })}
              />
              <input type="text" placeholder="Categoría (comida/bebida)" className="border p-2 rounded"
                value={nuevoProducto.category}
                onChange={(e) => setNuevoProducto({ ...nuevoProducto, category: e.target.value })}
              />
              <input type="text" placeholder="URL de la imagen" className="border p-2 rounded"
                value={nuevoProducto.imageUrl}
                onChange={(e) => setNuevoProducto({ ...nuevoProducto, imageUrl: e.target.value })}
              />
              <button
                className="bg-green-600 text-white py-2 rounded hover:bg-green-700 mt-2"
                onClick={async () => {
                  try {
                    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
                    await api.post(`/api/products`, {
                      ...nuevoProducto,
                      location: ubicacion
                    }, {
                      headers: { Authorization: `Bearer ${token}` }
                    })
                    setAgregando(false)
                    setNuevoProducto({ name: '', price: '', stock: '', imageUrl: '', category: '' })
                    fetchProductos()
                  } catch (err) {
                    console.error('Error al añadir producto:', err)
                    alert('Error al añadir producto')
                  }
                }}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default InventarioRestaurante
