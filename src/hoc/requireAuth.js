import { useContext, useState, useEffect } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { AuthContext } from './authProvider'
import { storageService } from '../utils/storage.service'
import { httpsService } from '../utils/https.service'
import { routes } from '../config/routes'

export const RequireAuth = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { user, setUser } = useContext(AuthContext)
  const location = useLocation()
  const accessToken = storageService.get('accessToken')

  useEffect(() => {
    if (user || !accessToken) {
      return
    }

    setIsLoading(true)
    httpsService
      .get('/user')
      .then((res) => {
        console.log(res)
        setUser(res)
      })
      .finally(() => setIsLoading(false))
  }, [])

  if (!accessToken)
    return <Navigate to={routes.login} state={{ from: location }} />

  if (isLoading || !user) return null

  if (user?.role === 'admin') return children

  return <Navigate to={routes.login} state={{ from: location }} />
}
