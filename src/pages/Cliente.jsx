import { useState } from 'react'

const Cliente = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const closeModalOnClickOutside = (e) => {
    if (e.target.id === 'modal-background') {
      setIsModalOpen(false)
    }
  }

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
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className="flex flex-col items-center">
            {/* Espacio para la imagen o detalles del producto */}
            <div className="w-3/4 h-60 bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Imagen del Producto</p>
            </div>
            {/* Botón Ver */}
            <button className="mt-4 bg-[#041D64] text-white px-4 py-2 rounded-lg hover:bg-[#193F9E]">
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
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
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
              <p className="text-gray-700 mb-4">Aquí puedes agregar opciones de filtro en el futuro.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cliente
