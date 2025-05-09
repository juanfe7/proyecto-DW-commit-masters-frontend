import { Navigate } from 'react-router-dom'
import { getUserFromToken } from '../utils/auth'

const PrivateRoute = ({ children, allowedRoles }) => {
  const user = getUserFromToken()
  console.log('User from token:', user)
  console.log('Allowed roles:', allowedRoles)

  if (user === undefined) {
    return <Navigate to="/403" />
  }


  if (!user) {
    return <Navigate to="/403" />
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/403" />
  }

  return children
}

export default PrivateRoute
