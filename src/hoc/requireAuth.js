import { useContext } from 'react'
import { AuthContext } from './authProvider'
import { useLocation, Navigate } from 'react-router-dom'
import { routes } from '../config/routes'

export const RequireAuth = ({ children }) => {
  const { user } = useContext(AuthContext)
  const location = useLocation()

  if (user?.role !== 'admin') {
    return <Navigate to={routes.login} state={{ from: location }} />
  }

  return children
}
