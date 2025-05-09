import { useState, useEffect } from 'react'

const Cliente = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [productos, setProductos] = useState([])
  const [productoSeleccionado, setProductoSeleccionado] = useState(null)

  const toggleModalFiltro = () => {
    setIsModalOpen(!isModalOpen)
  }

  const closeModalOnClickOutside = (e) => {
    if (e.target.id === 'modal-background') {
      setIsModalOpen(false)
    }
  }

  const abrirModalProducto = (producto) => {
    setProductoSeleccionado(producto)
    setIsModalOpen(true)
  }

  const cerrarModalProducto = () => {
    setProductoSeleccionado(null)
    setIsModalOpen(false)
  }

  // Función para capitalizar la primera letra
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')
        const response = await fetch('https://proyecto-dw-commit-masters-backend.vercel.app/api/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) throw new Error('Error al obtener productos')

        const data = await response.json()
        setProductos(data)
      } catch (error) {
        console.error('Error al obtener productos:', error)
      }
    }

    fetchProductos()
  }, [])

  return (
    <div className="min-h-screen bg-white text-[#041D64]">
      {/* Encabezado */}
      <div className="flex justify-between items-center px-8 py-6 border-b-4 border-[#E0EDFF] max-w-[80%] mx-auto">
        <h1 className="text-2xl font-bold">Productos Disponibles</h1>
        <button
          onClick={toggleModalFiltro}
          className="bg-[#041D64] text-white px-4 py-2 rounded-lg hover:bg-[#193F9E]"
        >
          Filtrar Productos
        </button>
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-3 gap-8 px-8 py-6 max-w-[80%] mx-auto">
        {productos.map((producto) => (
          <div key={producto.id} className="flex flex-col items-center">
            <div
              className="w-3/4 h-60 bg-gray-200 rounded-lg overflow-hidden cursor-pointer"
              onClick={() => abrirModalProducto(producto)}
            >
              <img src={producto.image} alt={producto.name} className="w-full h-full object-cover" />
            </div>
            <h2 className="mt-2 font-bold text-lg">{producto.name}</h2>
            <p className="text-sm text-gray-700 font-medium">Precio: ${producto.price}</p>
            <p className="text-sm text-gray-700">Ubicación: {producto.location}</p>
            <p
              className={`text-sm font-medium ${
                producto.stock <= 10 ? 'text-red-500' : 'text-gray-700'
              }`}
            >
              Stock: {producto.stock}
            </p>
            <button
              onClick={() => abrirModalProducto(producto)}
              className="mt-2 bg-[#041D64] text-white px-4 py-2 rounded-lg hover:bg-[#193F9E]"
            >
              Ver
            </button>
          </div>
        ))}
      </div>

      {/* Modal de filtro */}
      {isModalOpen && (
        <div
          id="modal-background"
          className="fixed inset-0 flex items-center justify-center z-50"
          onClick={closeModalOnClickOutside}
        >
          <div className="bg-white p-6 rounded-lg shadow-2xl w-1/3">
            <div className="flex justify-between items-center px-4 py-2 border-b-4 border-[#E0EDFF]">
              <h2 className="text-xl font-bold text-[#041D64]">Filtrar Productos</h2>
              <button
                onClick={toggleModalFiltro}
                className="bg-[#041D64] text-white px-4 py-2 rounded-lg hover:bg-[#193F9E]"
              >
                Cerrar
              </button>
            </div>

            {/* Opciones de filtro */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-[#041D64] mb-2">Por Categoría</h3>
              <div className="flex flex-col gap-2 text-gray-700">
                <label>
                  <input type="checkbox" className="mr-2" />
                  Restaurante
                </label>
                <label>
                  <input type="checkbox" className="mr-2" />
                  Cafetería
                </label>
                <label>
                  <input type="checkbox" className="mr-2" />
                  Menú del Día
                </label>
              </div>

              <h3 className="text-lg font-semibold text-[#041D64] mt-6 mb-2">Por Precio</h3>
              <div className="flex flex-col gap-2 text-gray-700">
                <label>
                  <input type="checkbox" className="mr-2" />
                  -$10,000
                </label>
                <label>
                  <input type="checkbox" className="mr-2" />
                  $10,000 - $20,000
                </label>
                <label>
                  <input type="checkbox" className="mr-2" />
                  $20,000+
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de información del producto */}
      {productoSeleccionado && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target.id === 'modal-info-bg') cerrarModalProducto()
          }}
          id="modal-info-bg"
        >
          <div className="bg-white p-6 rounded-xl shadow-2xl max-w-3xl w-full flex flex-col">
            {/* Encabezado del modal */}
            <div className="flex justify-between items-center border-b-2 border-[#E0EDFF] pb-4 mb-4">
              <h2 className="text-2xl font-bold text-[#041D64]">Información Producto</h2>
              <button
                onClick={cerrarModalProducto}
                className="text-[#041D64] text-2xl font-bold hover:text-blue-600"
              >
                X
              </button>
            </div>

            {/* Contenido del modal */}
            <div className="flex">
              {/* Imagen a la izquierda */}
              <div className="w-1/2 pr-4">
                <img
                  src={productoSeleccionado.image}
                  alt={productoSeleccionado.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>

              {/* Información a la derecha */}
              <div className="w-1/2 flex flex-col justify-between">
                <div>
                  <p>
                    <span className="font-semibold">Nombre:</span> {productoSeleccionado.name}
                  </p>
                  <p>
                    <span className="font-semibold">Categoría:</span>{' '}
                    {capitalizeFirstLetter(productoSeleccionado.category)}
                  </p>
                  <p>
                    <span className="font-semibold">Ubicación:</span> {productoSeleccionado.location}
                  </p>
                  <p>
                    <span className="font-semibold">Precio:</span> ${productoSeleccionado.price}
                  </p>
                  <p
                    className={`font-semibold ${
                      productoSeleccionado.stock <= 10 ? 'text-red-500' : 'text-gray-700'
                    }`}
                  >
                    Stock: {productoSeleccionado.stock}
                  </p>
                </div>
              </div>
            </div>

            {/* Espacio para input y botón */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-[#041D64] mb-2">
                Cantidad
              </label>
              <input
                type="number"
                min="1"
                placeholder="Ingrese cantidad"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#041D64]"
              />
              <button
                className="mt-4 w-full bg-[#041D64] text-white py-2 rounded-lg hover:bg-[#193F9E]"
              >
                Añadir al Carrito
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cliente