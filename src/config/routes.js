import ClienteHistorial from '../pages/ClienteHistorial'
import ClienteCarrito from '../pages/ClienteCarrito' // Cambia el nombre del componente si es necesario
import POSDashboard from '../pages/POSDashboard'
import POSProfile from '../pages/POSProfile'
import Login from '../pages/Login'
import Cliente from '../pages/Cliente'
import POS from '../pages/POS'

export const routes = [
  {
    id: 'login',
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    id: 'cliente',
    path: '/cliente',
    name: 'Cliente',
    component: Cliente,
  },
  {
    id: 'cliente-historial',
    path: '/cliente/historial',
    name: 'Cliente Historial',
    component: ClienteHistorial,
  },
  {
    id: 'cliente-carrito', // Cambiado de cliente-profile a cliente-carrito
    path: '/cliente/carrito',
    name: 'Cliente Carrito',
    component: ClienteCarrito,
  },
  {
    id: 'pos',
    path: '/pos',
    name: 'POS',
    component: POS,
  },
  {
    id: 'pos-dashboard',
    path: '/pos/dashboard',
    name: 'POS Dashboard',
    component: POSDashboard,
  },
  {
    id: 'pos-profile',
    path: '/pos/profile',
    name: 'POS Profile',
    component: POSProfile,
  },
]
