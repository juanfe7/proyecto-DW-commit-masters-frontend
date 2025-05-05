import { useNavigate } from 'react-router-dom'

const InventarioRestaurante = () => {
  const navigate = useNavigate()

  const handleVolverAtras = () => {
    navigate('/pos')
  }

  return (
    <div className="h-screen bg-white text-[#041D64] flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-8">Inventario del Restaurante</h1>
      <button
        onClick={handleVolverAtras}
        className="bg-[#041D64] text-white px-4 py-2 rounded-lg hover:bg-[#193F9E]"
      >
        Volver Atrás
      </button>
    </div>
  )
}

export default InventarioRestaurante