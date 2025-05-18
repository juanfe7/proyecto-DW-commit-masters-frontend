import { useNavigate } from 'react-router-dom'

const POS = () => {
  const navigate = useNavigate()

  const handleNavigation = (ubicacion) => {
    navigate(`/pos/inventarioRestaurante/${encodeURIComponent(ubicacion)}`)
  }

  return (
    <div className="min-h-screen bg-white text-[#041D64] flex items-center justify-center px-4 py-10">
      <div className="flex flex-col lg:flex-row gap-10 w-full max-w-5xl">
        {/* Restaurantes */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4 text-center">Lista de Restaurantes</h2>
          <ul className="space-y-3">
            {[
              'Embarcadero',
              'Mesón',
              'Escuela',
              'Arcos',
              'Punto Wok',
              'Punto Sándwich',
              'Punto Crepes',
              'Living Lab',
              'Kioskos',
              'Banderitas',
              'Cipreses',
            ].map((restaurante) => (
              <li
                key={restaurante}
                onClick={() => handleNavigation(restaurante)}
                className="cursor-pointer px-4 py-3 rounded-lg border border-gray-200 hover:bg-blue-50 transition text-center shadow-sm"
              >
                {restaurante}
              </li>
            ))}
          </ul>
        </div>

        {/* Cafés */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4 text-center">Lista de Cafés</h2>
          <ul className="space-y-3">
            {[
              'Punto Café',
              'Café Embarcadero',
              'Café de la Bolsa',
              'Café Estudio',
              'Café Fab Lab',
              'Café y Letras',
              'Café Estación',
            ].map((cafe) => (
              <li
                key={cafe}
                onClick={() => handleNavigation(cafe)}
                className="cursor-pointer px-4 py-3 rounded-lg border border-gray-200 hover:bg-blue-50 transition text-center shadow-sm"
              >
                {cafe}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default POS
