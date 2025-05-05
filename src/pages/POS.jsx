import { useNavigate } from 'react-router-dom'

const POS = () => {
  const navigate = useNavigate()

  const handleNavigation = () => {
    navigate('/pos/inventarioRestaurante')
  }

  return (
    <div className="h-screen bg-white text-[#041D64] flex flex-col items-center justify-center">
      <div className="flex justify-center gap-16 -mt-16">
        {/* Lista de Restaurantes */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-center">Lista de Restaurantes</h2>
          <ul className="space-y-2">
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
                onClick={handleNavigation}
                className="cursor-pointer text-blue-600 hover:underline"
              >
                {restaurante}
              </li>
            ))}
          </ul>
        </div>

        {/* Lista de Cafés */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-center">Lista de Cafés</h2>
          <ul className="space-y-2">
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
                onClick={handleNavigation}
                className="cursor-pointer text-blue-600 hover:underline"
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