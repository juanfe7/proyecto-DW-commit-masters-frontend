import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'

const Cliente = () => {
  const [productos, setProductos] = useState([])
  const [productosFiltrados, setProductosFiltrados] = useState([]) // Estado para los productos filtrados
  const [productoSeleccionado, setProductoSeleccionado] = useState(null)

  const abrirModalProducto = (producto) => {
    setProductoSeleccionado(producto)
  }

  const cerrarModalProducto = () => {
    setProductoSeleccionado(null)
  }

  // Función para filtrar productos por ubicación
  const handleSearch = (searchText) => {
    if (searchText.trim() === '') {
      setProductosFiltrados(productos) // Mostrar todos los productos si el input está vacío
    } else {
      const productosFiltrados = productos.filter((producto) =>
        producto.location.toLowerCase().includes(searchText.toLowerCase())
      )
      setProductosFiltrados(productosFiltrados)
    }
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
        setProductosFiltrados(data) // Inicialmente mostrar todos los productos
      } catch (error) {
        console.error('Error al obtener productos:', error)
      }
    }

    fetchProductos()
  }, [])

  return (
    <div className="min-h-screen bg-white text-[#041D64]">
      {/* Navbar */}
      <Navbar onSearch={handleSearch} />

      {/* Grid de productos */}
      <div className="grid grid-cols-3 gap-8 px-8 py-6 max-w-[80%] mx-auto">
        {productosFiltrados.map((producto) => (
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
          </div>
        ))}
      </div>
    </div>
  )
}

export default Cliente