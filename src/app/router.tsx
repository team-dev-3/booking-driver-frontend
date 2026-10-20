import { createBrowserRouter, Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { DashboardPage } from '../features/admin/pages/DashboardPage'
import { BookingDetailPage } from '../features/admin/pages/BookingDetailPage'
import { BookingListPage } from '../features/admin/pages/BookingListPage'
import { LoginPage } from '../features/admin/pages/LoginPage'

function ProtectedRoute() {
  const { token } = useAuth()
  const location = useLocation()

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location.pathname }} />
  )
}

// function ProtectedRoute() {
//   return <Outlet />
// }

function HomeRedirect() {
  const { token } = useAuth()
  return <Navigate to={token ? '/dashboard' : '/login'} replace />
}

// function HomeRedirect() {
//   return <Navigate to="/dashboard" replace />
// }

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeRedirect />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
      {
        path: '/bookings',
        element: <BookingListPage />,
      },
      {
        path: '/bookings/:id',
        element: <BookingDetailPage />,
      },
    ],
  },
  {
    path: '*',
    element: <HomeRedirect />,
  },
])
