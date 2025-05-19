// Importa todos los componentes de pagina usados en las rutas
import ClienteCarrito from '../pages/ClienteCarrito'
import ClienteHisrorial from '../pages/ClienteHistorial'
import POSPedidos from '../pages/POSPedidos'
import POSReseñas from '../pages/POSReseñas'
import Login from '../pages/Login'
import Cliente from '../pages/Cliente'
import POS from '../pages/POS'
import Error403 from '../pages/Error403'
import InventarioRestaurante from '../pages/InventarioRestaurante'
import PrivateRoute from '../components/PrivateRoute'
import ClienteReseñas from '../pages/ClienteReseñas'
import ClienteNotificaciones from '../pages/ClienteNotificaciones'


export const routes = [
  // Cada objeto representa una ruta, su path, componente y roles permitidos
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
    id: 'pos-pedidos',
    path: '/pos/pedidos',
    name: 'Gestión de Pedidos',
    component: POSPedidos,
    roles: ['pos']
  },
  {
    id: 'pos-reseñas',
    path: '/pos/reseñas',
    name: 'Reseñas de Productos',
    component: POSReseñas,
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
    path: '/pos/inventarioRestaurante/:ubicacion',
    name: 'Inventario Restaurante',
    component: InventarioRestaurante,
    roles: ['pos']
  },
  {
  id: 'cliente-reseñas',
  path: '/cliente/reseñas',
  name: 'Cliente Reseñas',
  component: ClienteReseñas,
  roles: ['cliente']
  },  
  {
    id: 'cliente-notificaciones',
    path: '/cliente/notificaciones',
    name: 'Notificaciones',
    component: ClienteNotificaciones,
    roles: ['cliente']
  }
]
