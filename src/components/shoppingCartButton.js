import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/cartContextProvider'
import { routes } from '../config/routes'
import { Button } from 'antd'
import { ShoppingOutlined } from '@ant-design/icons'

export const ShoppingCartButton = (props) => {
  const { shoppingCart, addItemToShoppingCart } = useContext(CartContext)

  if (shoppingCart.find((product) => product.itemId === props.id)) {
    return (
      <Button type="ghost">
        <Link to={routes.shoppingCart}>Added to Cart</Link>
      </Button>
    )
  }

  return (
    <Button
      onClick={() =>
        addItemToShoppingCart({
          itemId: props.id,
          quantity: props.quantity ? props.quantity : 1,
        })
      }
      type="link"
    >
      <ShoppingOutlined
        style={{
          color: '#0f0f0f',
          fontSize: '1.4em',
        }}
      />
    </Button>
  )
}
