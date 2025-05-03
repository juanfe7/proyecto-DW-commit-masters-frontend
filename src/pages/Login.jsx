import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [usuario, setUsuario] = useState('')
  const [contraseña, setContraseña] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    if (usuario && contraseña) {
      navigate('/home') // Redirige al home después de iniciar sesión
    } else {
      alert('Por favor, ingresa usuario y contraseña')
    }
  }

  const handleUsuarioChange = (e) => {
    const value = e.target.value
    // Validar que solo sean números y que estén entre 6 y 12 caracteres
    if (/^\d*$/.test(value) && value.length <= 12) {
      setUsuario(value)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-[#041D64]">
      <form
        onSubmit={handleLogin}
        className="bg-[#041D64] p-6 w-80"
      >
        {/* Imagen del logo */}
        <div className="flex justify-center mb-4">
          <img
            src="/src/assets/logo_login_sabana.png"
            alt="Logo Sabana"
            className="w-750 h-45"
          />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center text-white">
          Iniciar Sesión
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-white">
            Usuario
          </label>
          <input
            type="text"
            value={usuario}
            onChange={handleUsuarioChange}
            className="w-full px-3 py-2 rounded-[15px] bg-white text-black"
            placeholder="ID Usuario"
            maxLength={12} // Limitar el input a 12 caracteres
            required
          />
          {usuario.length > 0 && usuario.length < 6 && (
            <p className="text-red-500 text-sm mt-1">
              El usuario debe tener al menos 6 números.
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-white">
            Contraseña
          </label>
          <input
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            className="w-full px-3 py-2 rounded-[15px] bg-white text-black"
            placeholder="Contraseña"
            required
          />
        </div>
        {/* Recordar Sesión */}
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="recordar-sesion"
            className="mr-2 w-4 h-4"
          />
          <label htmlFor="recordar-sesion" className="text-sm text-white">
            Recordar Sesión
          </label>
        </div>
        <button
          type="submit"
          className="w-3/4 mx-auto bg-[#193F9E] text-white py-2 rounded-[15px] hover:bg-blue-600 block"
          disabled={usuario.length < 6 || usuario.length > 12}
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  )
}

export default Login