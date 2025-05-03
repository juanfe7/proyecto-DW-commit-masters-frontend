import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'
import Profile from '../pages/Profile'
import Login from '../pages/Login'

export const routes = [
  {
    id: 'login',
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    id: 'home',
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    id: 'dashboard',
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    id: 'profile',
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
]
