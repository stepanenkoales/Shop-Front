import { createContext, useEffect, useState } from 'react'
import { storageService } from '../utils/storage.service'

export const CartContext = createContext(null)

export const CartContextProvider = ({ children }) => {
  const [shoppingCart, setShoppingCart] = useState([])
  const [isInitiallyFetched, setIsInitiallyFetched] = useState(false)

  useEffect(() => {
    const shoppingCartStorage =
      JSON.parse(storageService.get('shoppingCart')) || []
    setShoppingCart(shoppingCartStorage)
    setIsInitiallyFetched(true)
  }, [])

  useEffect(() => {
    if (isInitiallyFetched) {
      storageService.set('shoppingCart', JSON.stringify(shoppingCart))
    }
  }, [shoppingCart, isInitiallyFetched])

  return (
    <CartContext.Provider value={{ shoppingCart, setShoppingCart }}>
      {children}
    </CartContext.Provider>
  )
}
