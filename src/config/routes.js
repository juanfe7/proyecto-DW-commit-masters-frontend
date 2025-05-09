import ClienteCarrito from '../pages/ClienteCarrito'
import ClienteHisrorial from '../pages/ClienteHistorial'
import POSDashboard from '../pages/POSDashboard'
import POSProfile from '../pages/POSProfile'
import Login from '../pages/Login'
import Cliente from '../pages/Cliente'
import POS from '../pages/POS'
import Error403 from '../pages/Error403'
import InventarioRestaurante from '../pages/InventarioRestaurante'
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
  },
  {
    id: 'error-403',
    path: '/403',
    name: 'Acceso Denegado',
    component: Error403,
    roles: []
  },
  {
    id: 'inventario-restaurante',
    path: '/pos/inventarioRestaurante',
    name: 'Inventario Restaurante',
    component: InventarioRestaurante,
    roles: ['pos']
  }
]
