import { useState, useEffect } from 'react'

const Cliente = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [productos, setProductos] = useState([])

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const closeModalOnClickOutside = (e) => {
    if (e.target.id === 'modal-background') {
      setIsModalOpen(false)
    }
  }

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const response = await fetch('https://proyecto-dw-commit-masters-backend.vercel.app/api/products', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Error al obtener productos');

        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchProductos();
  }, []);

  return (
    <div className="h-screen bg-white text-[#041D64]">
      {/* Contenedor debajo del Navbar */}
      <div className="flex justify-between items-center px-8 py-6 border-b-4 border-[#E0EDFF] max-w-[80%] mx-auto">
        <h1 className="text-2xl font-bold">Productos Disponibles</h1>
        <button
          onClick={toggleModal}
          className="bg-[#041D64] text-white px-4 py-2 rounded-lg hover:bg-[#193F9E]"
        >
          Filtrar Productos
        </button>
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-3 gap-8 px-8 py-6 max-w-[80%] mx-auto">
        {productos.map((producto) => (
          <div key={producto.id} className="flex flex-col items-center">
            <div className="w-3/4 h-60 bg-gray-200 rounded-lg overflow-hidden">
              <img src={producto.image} alt={producto.name} className="w-full h-full object-cover" />
            </div>
            <h2 className="mt-2 font-bold text-lg">{producto.name}</h2>
            <p className="text-sm text-gray-700">{producto.category}</p>
            <p className="text-sm text-gray-700">${producto.price}</p>
            <button className="mt-2 bg-[#640404] text-white px-4 py-2 rounded-lg hover:bg-[#193F9E]">
              Ver
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          id="modal-background"
          className="fixed inset-0 flex items-center justify-center z-50"
          onClick={closeModalOnClickOutside}
        >
          <div className="bg-white p-6 rounded-lg shadow-2xl w-1/3">
            {/* Encabezado del modal */}
            <div className="flex justify-between items-center px-4 py-2 border-b-4 border-[#E0EDFF]">
              <h2 className="text-xl font-bold text-[#041D64]">Filtrar Productos</h2>
              <button
                onClick={toggleModal}
                className="bg-[#041D64] text-white px-4 py-2 rounded-lg hover:bg-[#193F9E]"
              >
                Cerrar
              </button>
            </div>

            {/* Contenido del modal */}
            <div className="mt-4">
              {/* Filtro por Categoría */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#041D64] mb-2">Por Categoría</h3>
                <div className="flex items-center mb-2">
                  <input type="checkbox" id="categoria-restaurante" className="mr-2" />
                  <label htmlFor="categoria-restaurante" className="text-gray-700">
                    Restaurante
                  </label>
                </div>
                <div className="flex items-center mb-2">
                  <input type="checkbox" id="categoria-cafeteria" className="mr-2" />
                  <label htmlFor="categoria-cafeteria" className="text-gray-700">
                    Cafetería
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="categoria-menu" className="mr-2" />
                  <label htmlFor="categoria-menu" className="text-gray-700">
                    Menú del Día
                  </label>
                </div>
              </div>

              {/* Filtro por Precio */}
              <div>
                <h3 className="text-lg font-semibold text-[#041D64] mb-2">Por Precio</h3>
                <div className="flex items-center mb-2">
                  <input type="checkbox" id="precio-1" className="mr-2" />
                  <label htmlFor="precio-1" className="text-gray-700">
                    -$10,000
                  </label>
                </div>
                <div className="flex items-center mb-2">
                  <input type="checkbox" id="precio-2" className="mr-2" />
                  <label htmlFor="precio-2" className="text-gray-700">
                    $10,000 - $20,000
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="precio-3" className="mr-2" />
                  <label htmlFor="precio-3" className="text-gray-700">
                    $20,000+
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cliente
