import ClienteDashboard from '../pages/ClienteDashboard'
import ClienteProfile from '../pages/ClienteProfile'
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
    id: 'cliente-dashboard',
    path: '/cliente/dashboard',
    name: 'Cliente Dashboard',
    component: ClienteDashboard,
  },
  {
    id: 'cliente-profile',
    path: '/cliente/profile',
    name: 'Cliente Profile',
    component: ClienteProfile,
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
