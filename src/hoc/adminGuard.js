import { useContext, useState, useEffect } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { AuthContext } from '../context/authContextProvider'
import { storageService } from '../utils/storage.service'
import { httpsService } from '../utils/https.service'
import { routes } from '../config/routes'

export const AdminGuard = ({ children }) => {
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
        setUser(res)
      })
      .finally(() => setIsLoading(false))
  }, [accessToken, user, setUser])

  if (!accessToken)
    return <Navigate to={routes.login} state={{ from: location }} />

  if (isLoading || !user) return null

  if (user?.role === 'admin') return children

  return <Navigate to={routes.login} state={{ from: location }} />
}
