import { jwtDecode } from 'jwt-decode'

export const getUserFromToken = () => {
  const token = localStorage.getItem('token')
  if (!token) return null

  try {
    const decoded = jwtDecode(token)

    // Validar expiración
    const now = Date.now() / 1000
    if (decoded.exp < now) {
      // Token expirado
      localStorage.removeItem('token')
      return null
    }

    return decoded
  } catch (error) {
    console.error('Token inválido', error)
    return null
  }
}


export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login'; // Redirige al login
};