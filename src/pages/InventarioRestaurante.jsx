import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../config/api'
import Swal from 'sweetalert2'

const InventarioRestaurante = () => {
  const { ubicacion } = useParams()
  const navigate = useNavigate()
  const [productos, setProductos] = useState([])
  const [productoSeleccionado, setProductoSeleccionado] = useState(null)
  const [editando, setEditando] = useState(false)
  const [productoEditado, setProductoEditado] = useState({})
  const [mostrandoModalAgregar, setMostrandoModalAgregar] = useState(false)
  const [nuevoProducto, setNuevoProducto] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
    image: ''
  })

  const handleVolverAtras = () => navigate('/pos')
  const handleAgregarProducto = () => setMostrandoModalAgregar(true)

  const fetchProductos = async () => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token')
      if (!token) return

      const res = await api.get(`/api/products?location=${encodeURIComponent(ubicacion)}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setProductos(res.data)
    } catch (error) {
      console.error('Error al cargar productos:', error)
    }
  }

  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()

  useEffect(() => {
    fetchProductos()
  }, [ubicacion])

  return (
    <div className="min-h-screen bg-white text-[#041D64] p-8">
      {/* Encabezado */}
      <div className="mb-6 border-b-4 border-[#E0EDFF] pb-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Inventario de {ubicacion}</h1>
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
              className="w-3/4 h-60 bg-gray-200 rounded-lg overflow-hidden"
              onClick={() => setProductoSeleccionado(producto)}
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

      {/* Modal de información */}
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

            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => {
                  setEditando(true)
                  setProductoEditado(productoSeleccionado)
                  setProductoSeleccionado(null)
                }}
                className="bg-[#041D64] text-white px-4 py-2 rounded-lg hover:bg-[#193F9E]"
              >
                Editar Producto
              </button>

              <button
                onClick={async () => {
                  const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                      confirmButton: "bg-green-600 text-white px-4 py-2 rounded-lg ml-2",
                      cancelButton: "bg-red-600 text-white px-4 py-2 rounded-lg mr-2"
                    },
                    buttonsStyling: false
                  })

                  const result = await swalWithBootstrapButtons.fire({
                    title: "¿Estás seguro?",
                    text: "¡No podrás revertir esto!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Sí, eliminar",
                    cancelButtonText: "No, cancelar",
                    reverseButtons: true
                  })

                  if (result.isConfirmed) {
                    try {
                      const token = localStorage.getItem('token') || sessionStorage.getItem('token')
                      await api.delete(`/api/products/${productoSeleccionado.id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                      })
                      setProductoSeleccionado(null)
                      fetchProductos()

                      swalWithBootstrapButtons.fire({
                        title: "Eliminado",
                        text: "El producto ha sido eliminado.",
                        icon: "success"
                      })
                    } catch (error) {
                      console.error('Error al eliminar producto:', error)
                      Swal.fire("Error", "No se pudo eliminar el producto.", "error")
                    }
                  } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire({
                      title: "Cancelado",
                      text: "El producto está a salvo :)",
                      icon: "error"
                    })
                  }
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Eliminar Producto
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de edición */}
      {editando && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          id="modal-edit-bg"
          onClick={(e) => {
            if (e.target.id === 'modal-edit-bg') setEditando(false)
          }}
        >
          <div className="bg-white p-6 rounded-xl shadow-2xl max-w-2xl w-full flex flex-col">
            <div className="flex justify-between items-center border-b-2 border-[#E0EDFF] pb-4 mb-4">
              <h2 className="text-2xl font-bold text-[#041D64]">Editar Producto</h2>
              <button
                onClick={() => setEditando(false)}
                className="text-[#041D64] text-2xl font-bold hover:text-blue-600"
              >
                X
              </button>
            </div>

            <div className="flex">
              <div className="w-1/2 pr-4">
                <img
                  src={productoEditado.image}
                  alt={productoEditado.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>

              <div className="w-1/2 flex flex-col gap-4">
                <label>
                  <span className="font-semibold">Nombre:</span>
                  <input
                    type="text"
                    value={productoEditado.name}
                    onChange={(e) => setProductoEditado({ ...productoEditado, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </label>

                <label>
                  <span className="font-semibold">Precio:</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={productoEditado.price === 0 ? '' : productoEditado.price}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '') {
                        setProductoEditado({ ...productoEditado, price: '' });
                      } else if (/^\d+$/.test(val)) {
                        setProductoEditado({ ...productoEditado, price: Number(val) });
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </label>

                <label>
                  <span className="font-semibold">Stock:</span>
                 <input
                    type="text"
                    inputMode="numeric"
                    value={productoEditado.stock === 0 ? '' : productoEditado.stock}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '') {
                        setProductoEditado({ ...productoEditado, stock: '' });
                      } else if (/^\d+$/.test(val)) {
                        setProductoEditado({ ...productoEditado, stock: Number(val) });
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </label>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={async () => {
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
                }}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de agregar producto */}
      {mostrandoModalAgregar && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          id="modal-agregar-bg"
          onClick={(e) => {
            if (e.target.id === 'modal-agregar-bg') setMostrandoModalAgregar(false)
          }}
        >
          <div className="bg-white p-6 rounded-xl shadow-2xl max-w-2xl w-full flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-[#041D64] mb-2">Añadir Producto</h2>

            <label className="text-sm">Nombre:
              <input type="text" value={nuevoProducto.name}
                onChange={(e) => setNuevoProducto({ ...nuevoProducto, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            </label>

            <label className="text-sm">Precio:
              <input
                type="text"
                inputMode="numeric"
                value={nuevoProducto.price === 0 ? '' : nuevoProducto.price}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '') {
                    setNuevoProducto({ ...nuevoProducto, price: '' });
                  } else if (/^\d+$/.test(val)) {
                    setNuevoProducto({ ...nuevoProducto, price: Number(val) });
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </label>

            <label className="text-sm">Stock:
             <input
                type="text"
                inputMode="numeric"
                value={nuevoProducto.stock === 0 ? '' : nuevoProducto.stock}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '') {
                    setNuevoProducto({ ...nuevoProducto, stock: '' });
                  } else if (/^\d+$/.test(val)) {
                    setNuevoProducto({ ...nuevoProducto, stock: Number(val) });
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </label>

            <label className="text-sm">Categoría:
              <select value={nuevoProducto.category}
                onChange={(e) => setNuevoProducto({ ...nuevoProducto, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="">Selecciona una</option>
                <option value="comida">Comida</option>
                <option value="bebida">Bebida</option>
              </select>
            </label>

            <label className="text-sm">Imagen (URL):
              <input type="text" value={nuevoProducto.image}
                onChange={(e) => setNuevoProducto({ ...nuevoProducto, image: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            </label>

            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setMostrandoModalAgregar(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg">
                Cancelar
              </button>
              <button
                onClick={async () => {
                  try {
                    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
                    const productoConUbicacion = { ...nuevoProducto, location: ubicacion }
                    await api.post('/api/products', productoConUbicacion, {
                      headers: { Authorization: `Bearer ${token}` }
                    })
                    setMostrandoModalAgregar(false)
                    setNuevoProducto({
                      name: '',
                      price: '',
                      stock: '',
                      category: '',
                      image: ''
                    })
                    fetchProductos()
                  } catch (err) {
                    console.error('Error al crear producto:', err)
                    alert('Error al crear el producto')
                  }
                }}
                className="px-4 py-2 bg-[#041D64] text-white rounded-lg hover:bg-[#193F9E]">
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
