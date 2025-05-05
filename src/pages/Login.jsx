import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [usuario, setUsuario] = useState('')
  const [contraseña, setContraseña] = useState('')
  const [errorContraseña, setErrorContraseña] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    // Validar que la contraseña cumpla con los requisitos
    const contraseñaRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{7,}$/ // Correcion momentanea para la contraseña, toca volver a añadir caracteres especiales

    if (!usuario || !contraseña) {
      alert('Por favor, completa todos los campos.')
      return
    }

    if (!contraseñaRegex.test(contraseña)) {
      setErrorContraseña(
        'La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, una minúscula, un número y un símbolo especial.' 
      )
      return
    }

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: usuario,
          password: contraseña,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.error || 'Error al iniciar sesión')
        return
      }

      localStorage.setItem('token', data.token)

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
          <img
            src="/src/assets/logo_login_sabana.png"
            alt="Logo Sabana"
            className="w-50 h-auto"
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
          <label className="block text-sm font-medium mb-1 text-white">
            Contraseña
          </label>
          <input
            type="password"
            value={contraseña}
            onChange={(e) => {
              setContraseña(e.target.value)
              setErrorContraseña('') // Limpiar el mensaje de error al escribir
            }}
            className="w-full px-3 py-2 rounded-[15px] bg-white text-black"
            placeholder="Contraseña"
            required
          />
          {errorContraseña && (
            <p className="text-red-500 text-sm mt-1">{errorContraseña}</p>
          )}
        </div>
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
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  )
}

export default Login