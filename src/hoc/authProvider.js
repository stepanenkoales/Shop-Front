import { createContext, useEffect, useState } from 'react'
import { httpsService } from '../utils/https.service'
import { storageService } from '../utils/storage.service'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = (newUser, callback) => {
    setUser(newUser)
    callback()
  }

  useEffect(() => {
    console.log('useEffe AP')
    console.log(storageService.get('accessToken'))
    console.log(user)
    if (!storageService.get('accessToken')) {
      return
    }

    setIsLoading(true)
    httpsService
      .get('/user')
      .then((res) => {
        console.log(2)
        setUser(res)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  if (isLoading) return null

  return (
    <AuthContext.Provider value={{ user, login, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
