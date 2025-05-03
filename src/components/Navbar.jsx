import { Link } from 'react-router-dom'
import { routes } from '../config/routes'
import { useBackground } from '../context/BackgroundContext'

const Navbar = () => {
  const { updateBackgroundColor } = useBackground()

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">U Sabana</div>
        <div className="space-x-4">
          {routes
            .filter((route) => route.id !== 'login') // Excluir la ruta de Login
            .map((route) => (
              <Link
                key={route.id}
                to={route.path}
                onClick={() => updateBackgroundColor(route.id)}
                className="hover:text-gray-300"
              >
                {route.name}
              </Link>
            ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar