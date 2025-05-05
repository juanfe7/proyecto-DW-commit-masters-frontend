import ClienteCarrito from '../pages/ClienteCarrito'
import ClienteHisrorial from '../pages/ClienteHistorial'
import POSDashboard from '../pages/POSDashboard'
import POSProfile from '../pages/POSProfile'
import Login from '../pages/Login'
import Cliente from '../pages/Cliente'
import POS from '../pages/POS'
import PrivateRoute from '../components/PrivateRoute'

export const routes = [
  {
    id: 'login',
    path: '/login',
    name: 'Login',
    component: Login,
    roles:[]
  },
  {
    id: 'cliente',
    path: '/cliente',
    name: 'Cliente',
    component: Cliente,
    roles:['cliente']
  },
  {
    id: 'cliente-carrito',
    path: '/cliente/carrito',
    name: 'Cliente Carrito',
    component: ClienteCarrito,
    roles: ['cliente']
  },
  {
    id: 'cliente-historial',
    path: '/cliente/historial',
    name: 'Cliente Historial',
    component: ClienteHisrorial,
    roles: ['cliente']
  },
  {
    id: 'pos',
    path: '/pos',
    name: 'POS',
    component: POS,
    roles: ['pos']
  },
  {
    id: 'pos-dashboard',
    path: '/pos/dashboard',
    name: 'POS Dashboard',
    component: POSDashboard,
    roles: ['pos']
  },
  {
    id: 'pos-profile',
    path: '/pos/profile',
    name: 'POS Profile',
    component: POSProfile,
    roles: ['pos']
  }
]
