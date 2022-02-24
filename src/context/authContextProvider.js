import { createContext, useEffect, useState } from 'react'
import { httpsService } from '../utils/https.service'
import { storageService } from '../utils/storage.service'

export const AuthContext = createContext(null)

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (!storageService.get('accessToken')) {
      return
    }

    httpsService
      .get('/user')
      .then((res) => {
        setUser(res)
      })
      .catch((err) => console.log(err))
  }, [])

  const logout = () => {
    setUser(null)
    storageService.remove('accessToken')
    storageService.remove('refreshToken')
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
