import { useState, useEffect } from 'react'
import api from '../config/api'

const Cliente = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [productos, setProductos] = useState([])
  const [productoSeleccionado, setProductoSeleccionado] = useState(null)

  const [filtroPrecio, setFiltroPrecio] = useState({
    menos10000: false,
    entre10000y20000: false,
    mas20000: false,
  })

  const [filtroCategoria, setFiltroCategoria] = useState({
    comida: false,
    bebida: false,
  })

  const [ubicacion, setUbicacion] = useState('')

  const toggleModalFiltro = () => setIsModalOpen(!isModalOpen)
  const closeModalOnClickOutside = (e) => {
    if (e.target.id === 'modal-background') setIsModalOpen(false)
  }

  const abrirModalProducto = (producto) => setProductoSeleccionado(producto)
  const cerrarModalProducto = () => setProductoSeleccionado(null)

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const fetchProductos = async () => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token')

      const categorias = []
      if (filtroCategoria.comida) categorias.push('comida')
      if (filtroCategoria.bebida) categorias.push('bebida')

      const priceRanges = []
      if (filtroPrecio.menos10000) priceRanges.push({ maxPrice: 9999 })
      if (filtroPrecio.entre10000y20000) priceRanges.push({ minPrice: 10000, maxPrice: 20000 })
      if (filtroPrecio.mas20000) priceRanges.push({ minPrice: 20001 })

      let responses = []

      if (categorias.length > 0 && priceRanges.length > 0) {
        responses = await Promise.all(
          categorias.flatMap(cat =>
            priceRanges.map(rango => {
              const parts = [`category=${cat}`]
              if (rango.minPrice) parts.push(`minPrice=${rango.minPrice}`)
              if (rango.maxPrice) parts.push(`maxPrice=${rango.maxPrice}`)
              if (ubicacion.trim() !== '') parts.push(`location=${encodeURIComponent(ubicacion)}`)
              const query = parts.join('&')
              return api.get(`/api/products?${query}`, {
                headers: { Authorization: `Bearer ${token}` },
              }).then(res => res.data)
            })
          )
        )
      } else if (categorias.length > 0) {
        responses = await Promise.all(
          categorias.map(cat => {
            const parts = [`category=${cat}`]
            if (ubicacion.trim() !== '') parts.push(`location=${encodeURIComponent(ubicacion)}`)
            const query = parts.join('&')
            return api.get(`/api/products?${query}`, {
              headers: { Authorization: `Bearer ${token}` },
            }).then(res => res.data)
          })
        )
      } else if (priceRanges.length > 0) {
        responses = await Promise.all(
          priceRanges.map(rango => {
            const parts = []
            if (rango.minPrice) parts.push(`minPrice=${rango.minPrice}`)
            if (rango.maxPrice) parts.push(`maxPrice=${rango.maxPrice}`)
            if (ubicacion.trim() !== '') parts.push(`location=${encodeURIComponent(ubicacion)}`)
            const query = parts.join('&')
            return api.get(`/api/products?${query}`, {
              headers: { Authorization: `Bearer ${token}` },
            }).then(res => res.data)
          })
        )
      } else {
        const query = ubicacion.trim() !== '' ? `location=${encodeURIComponent(ubicacion)}` : ''
        const res = await api.get(`/api/products?${query}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        responses = [res.data]
      }

      const todos = responses.flat()
      const unicos = Array.from(new Map(todos.map(p => [p.id, p])).values())
      setProductos(unicos)
    } catch (error) {
      console.error('Error al obtener productos:', error)
    }
  }

  useEffect(() => {
    fetchProductos()
  }, [filtroPrecio, filtroCategoria, ubicacion])

  const handlePrecioChange = (e) => {
    const { name, checked } = e.target
    setFiltroPrecio(prev => ({ ...prev, [name]: checked }))
  }

  const handleCategoriaChange = (e) => {
    const { name, checked } = e.target
    setFiltroCategoria(prev => ({ ...prev, [name]: checked }))
  }

  const handleUbicacionChange = (e) => {
    setUbicacion(e.target.value)
  }

  return (
    <div className="min-h-screen bg-white text-[#041D64]">
      <div className="flex justify-between items-center px-8 py-6 border-b-4 border-[#E0EDFF] max-w-[80%] mx-auto">
        <h1 className="text-2xl font-bold">Productos Disponibles</h1>
        <button
          onClick={toggleModalFiltro}
          className="bg-[#041D64] text-white px-4 py-2 rounded-lg hover:bg-[#193F9E]"
        >
          Filtrar Productos
        </button>
      </div>

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
            <p className={`text-sm font-medium ${producto.stock <= 10 ? 'text-red-500' : 'text-gray-700'}`}>
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

      {isModalOpen && (
        <div
          id="modal-background"
          className="fixed inset-0 flex items-center justify-center z-50"
          onClick={closeModalOnClickOutside}
        >
          <div className="bg-white p-6 rounded-lg shadow-2xl w-1/3">
            <div className="flex justify-between items-center border-b-4 border-[#E0EDFF] pb-2">
              <h2 className="text-xl font-bold text-[#041D64]">Filtrar Productos</h2>
              <button
                onClick={toggleModalFiltro}
                className="bg-[#041D64] text-white px-3 py-1 rounded-lg hover:bg-[#193F9E]"
              >
                Cerrar
              </button>
            </div>

            <div className="mt-4 text-gray-700">
              <h3 className="text-lg font-semibold text-[#041D64] mb-2">Por Categoría</h3>
              <div className="flex flex-col gap-2">
                <label><input type="checkbox" className="mr-2" name="comida" checked={filtroCategoria.comida} onChange={handleCategoriaChange}/>Comida</label>
                <label><input type="checkbox" className="mr-2" name="bebida" checked={filtroCategoria.bebida} onChange={handleCategoriaChange}/>Bebida</label>
              </div>

              <h3 className="text-lg font-semibold text-[#041D64] mt-6 mb-2">Por Precio</h3>
              <div className="flex flex-col gap-2">
                <label><input type="checkbox" className="mr-2" name="menos10000" checked={filtroPrecio.menos10000} onChange={handlePrecioChange}/>-$10,000</label>
                <label><input type="checkbox" className="mr-2" name="entre10000y20000" checked={filtroPrecio.entre10000y20000} onChange={handlePrecioChange}/>$10,000 - $20,000</label>
                <label><input type="checkbox" className="mr-2" name="mas20000" checked={filtroPrecio.mas20000} onChange={handlePrecioChange}/>$20,000+</label>
              </div>

              <h3 className="text-lg font-semibold text-[#041D64] mt-6 mb-2">Por Ubicación</h3>
              <input
                type="text"
                value={ubicacion}
                onChange={handleUbicacionChange}
                placeholder="Ej: Embarcadero"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#041D64]"
              />
            </div>
          </div>
        </div>
      )}

      {productoSeleccionado && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          id="modal-info-bg"
          onClick={(e) => {
            if (e.target.id === 'modal-info-bg') cerrarModalProducto()
          }}
        >
          <div className="bg-white p-6 rounded-xl shadow-2xl max-w-3xl w-full flex flex-col">
            <div className="flex justify-between items-center border-b-2 border-[#E0EDFF] pb-4 mb-4">
              <h2 className="text-2xl font-bold text-[#041D64]">Información Producto</h2>
              <button
                onClick={cerrarModalProducto}
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

            <div className="mt-6">
              <label className="block text-sm font-medium text-[#041D64] mb-2">Cantidad</label>
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
