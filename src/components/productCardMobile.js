import InfiniteScroll from 'react-infinite-scroll-component'
import { Card, Button, Statistic } from 'antd'
import { AdvancedImage } from '@cloudinary/react'
import { cloudinaryService } from '../utils/cloudinary.service'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/cartContextProvider'
import { routes } from '../config/routes'

export const ProductCardMobile = (props) => {
  const { shoppingCart } = useContext(CartContext)

  const shoppingCartButton = (id) => {
    if (shoppingCart.find((product) => product.itemId === id)) {
      return (
        <Button type="ghost">
          <Link to={routes.shoppingCart}>Added to Cart</Link>
        </Button>
      )
    }

    return (
      <Button
        onClick={() =>
          props.addToShoppingCart({
            itemId: id,
            quantity: 1,
          })
        }
        type="ghost"
      >
        Add to Cart
      </Button>
    )
  }

  return (
    <>
      <div style={{ overflow: 'auto' }}>
        <InfiniteScroll
          dataLength={props.items.length}
          next={props.onMobilePaginationChange}
          hasMore={true}
        >
          {props.items.map((item) => (
            <Card
              key={item.id}
              style={{
                marginTop: '20px',
              }}
              hoverable
              actions={[shoppingCartButton(item.id)]}
            >
              <AdvancedImage
                cldImg={cloudinaryService.getProductCardImage(item.image)}
              />
              <Card.Meta
                style={{ paddingTop: '10px' }}
                title={item.name}
                description={item.description}
              />
              <Statistic
                style={{ paddingTop: '10px' }}
                value={item.price}
                prefix={'$'}
                precision={2}
              />
            </Card>
          ))}
        </InfiniteScroll>
      </div>
    </>
  )
}
