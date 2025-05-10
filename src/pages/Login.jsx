import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../config/api'

const Login = () => {
  const [usuario, setUsuario] = useState('')
  const [contraseña, setContraseña] = useState('')
  const [error, setError] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!usuario || !contraseña) {
      alert('Por favor, completa todos los campos.')
      return
    }

    try {
      const response = await api.post('/api/login', {
        email: usuario,
        password: contraseña
      })

      const data = response.data

      if (rememberMe) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('rol', data.rol)
      } else {
        sessionStorage.setItem('token', data.token)
        sessionStorage.setItem('rol', data.rol)
      }

      if (data.rol === 'cliente') {
        navigate('/cliente')
      } else if (data.rol === 'pos') {
        navigate('/pos')
      } else {
        alert('Rol no reconocido.')
      }
    } catch (error) {
      console.error('Error en el login:', error)
      alert('Ocurrió un error al iniciar sesión.')
    }
  }

  const handleUsuarioChange = (e) => {
    const value = e.target.value
    if (/^\d*$/.test(value) && value.length <= 12) {
      setUsuario(value)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-[#041D64]">
      <form onSubmit={handleLogin} className="bg-[#041D64] p-6 w-80">
        <div className="flex justify-center mb-4">
          <img src="/logo_login_sabana.png" alt="Logo Sabana" className="w-50 h-auto" />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center text-white">Iniciar Sesión</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-white">Usuario</label>
          <input
            type="text"
            value={usuario}
            onChange={handleUsuarioChange}
            className="w-full px-3 py-2 rounded-[15px] bg-white text-black"
            placeholder="ID Usuario"
            maxLength={12}
            required
          />
          {usuario.length > 0 && usuario.length < 6 && (
            <p className="text-red-500 text-sm mt-1">
              El usuario debe tener al menos 6 números.
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-white">Contraseña</label>
          <input
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            className="w-full px-3 py-2 rounded-[15px] bg-white text-black"
            placeholder="Contraseña"
            required
          />
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="recordar-sesion"
            className="mr-2 w-4 h-4"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <label htmlFor="recordar-sesion" className="text-sm text-white">Recordar Sesión</label>
        </div>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button
          type="submit"
          className="w-3/4 mx-auto bg-[#193F9E] text-white py-2 rounded-[15px] hover:bg-blue-600 block"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  )
}

export default Login
