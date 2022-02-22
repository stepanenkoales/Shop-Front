import { createContext, useCallback, useEffect, useState } from 'react'
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

  const addItemToShoppingCart = useCallback(
    (newShoppingCart) => {
      const foundIndex = shoppingCart.findIndex(
        (item) => item.itemId === newShoppingCart.itemId
      )

      if (foundIndex >= 0) {
        shoppingCart[foundIndex].quantity = ++shoppingCart[foundIndex].quantity
        setShoppingCart([...shoppingCart])
        return
      }

      setShoppingCart([...shoppingCart, newShoppingCart])
    },
    [shoppingCart]
  )

  return (
    <CartContext.Provider
      value={{ shoppingCart, setShoppingCart, addItemToShoppingCart }}
    >
      {children}
    </CartContext.Provider>
  )
}
