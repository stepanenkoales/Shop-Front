/* import { useContext } from 'react'
import { CartContext } from '../context/cartContextProvider'
import { routes } from '../config/routes'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import { ShoppingOutlined } from '@ant-design/icons'

export const ShoppingCartButton = (props) => {
  const { shoppingCart } = useContext(CartContext)

  if (shoppingCart.find((product) => product.itemId === props.id)) {
    console.log(1)
    return (
      <Button type="ghost">
        <Link to={routes.shoppingCart}>Added to Cart</Link>
      </Button>
    )
  }
  console.log(2)
  return (
    <Buttons
      onClick={() =>
        props.addToShoppingCart({
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
    </Buttons>
  ) 
}
 */
