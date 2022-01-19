import { createContext, useEffect, useState } from 'react'

import { httpsService } from '../utils/https.service'
import { storageService } from '../utils/storage.service'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  //storageService.remove('accessToken')
  //storageService.remove('refreshToken')

  const login = (newUser, callback) => {
    setUser(newUser)
    callback()
  }

  console.log(1)

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

  console.log(2)
  console.log(user)
  console.log(isLoading)

  if (isLoading) return null

  return (
    <AuthContext.Provider value={{ user, login, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
