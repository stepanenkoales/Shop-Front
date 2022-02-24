import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/authContextProvider'
import { storageService } from '../utils/storage.service'
import { routes } from '../config/routes'

export const UserGuard = ({ children, admin = false }) => {
  const { user } = useContext(AuthContext)
  const accessToken = storageService.get('accessToken')

  if (!accessToken) return <Navigate to={routes.login} />

  if (!user) return null

  if (admin && user.role === 'admin') return children

  if (!admin) return children

  return <Navigate to={routes.login} />
}
