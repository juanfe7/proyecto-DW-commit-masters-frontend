import { useNavigate } from 'react-router-dom'

const ClienteHistorial = () => {
  const navigate = useNavigate()

  const handleVolverAtras = () => {
    navigate('/cliente')
  }

  return (
    <div className="h-screen bg-white text-[#041D64]">
      {/* Encabezado */}
      <div className="flex justify-between items-center px-8 py-6 border-b-4 border-[#E0EDFF] max-w-[80%] mx-auto">
        <h1 className="text-2xl font-bold">Historial de Pedidos</h1>
        <button
          onClick={handleVolverAtras}
          className="bg-[#041D64] text-white px-4 py-2 rounded-lg hover:bg-[#193F9E]"
        >
          Volver Atrás
        </button>
      </div>

      {/* Contenido principal */}
      <div className="px-8 py-6 max-w-[80%] mx-auto">
        <p className="text-gray-500">Aquí se mostrará el historial de pedidos del cliente.</p>
        {/* Puedes agregar una tabla o lista aquí para mostrar los pedidos */}
      </div>
    </div>
  )
}

export default ClienteHistorial