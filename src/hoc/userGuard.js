import { useContext, useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/authContextProvider'
import { storageService } from '../utils/storage.service'
import { httpsService } from '../utils/https.service'
import { routes } from '../config/routes'

export const UserGuard = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { user, setUser } = useContext(AuthContext)
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
    return () => {
      setIsLoading(false)
    }
  }, [accessToken, user, setUser])

  if (!accessToken) return <Navigate to={routes.login} />

  if (isLoading || !user) return null

  if (user) return children

  return <Navigate to={routes.login} />
}
