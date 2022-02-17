/* import { createContext, useEffect, useState } from 'react'
import { httpsService } from '../utils/https.service'
import { storageService } from '../utils/storage.service'

export const AppContext = createContext(null)

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [shoppingCart, setShoppingCart] = useState([])

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

  useEffect(() => {
    const shoppingCart = storageService.get('shoppingCart') || []
    setShoppingCart(JSON.parse(shoppingCart))
  }, [])

  useEffect(() => {
    storageService.set('shoppingCart', JSON.stringify(shoppingCart))
  }, [shoppingCart, setShoppingCart])

  const logout = () => {
    setUser(null)
    storageService.remove('accessToken')
    storageService.remove('refreshToken')
  }

  if (isLoading) return null

  return (
    <AppContext.Provider
      value={{ user, setUser, shoppingCart, setShoppingCart, logout }}
    >
      {children}
    </AppContext.Provider>
  )
}
 */
