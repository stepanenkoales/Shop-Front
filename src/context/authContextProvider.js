import { createContext, useEffect, useState } from 'react'
import { httpsService } from '../utils/https.service'
import { storageService } from '../utils/storage.service'

export const AuthContext = createContext(null)

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!storageService.get('accessToken')) {
      return
    }

    setIsLoading(true)
    httpsService
      .get('/user')
      .then((res) => {
        setUser(res)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const logout = () => {
    setUser(null)
    storageService.remove('accessToken')
    storageService.remove('refreshToken')
  }

  if (isLoading) return null

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
