import { createContext, useState } from 'react'
import { httpsService } from '../utils/https.service'
import { storageService } from '../utils/storage.service'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const accessToken = storageService.get('accessToken')

  const login = (newUser, callback) => {
    setUser(newUser)
    callback()
  }

  if (!user && accessToken) {
    httpsService.get('/user').then((res) => {
      setUser(res)
    })
  }

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  )
}
