import { Card, Button, Statistic, Row, Col, Divider } from 'antd'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AdvancedImage } from '@cloudinary/react'
import { cloudinaryService } from '../utils/cloudinary.service'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { CartContext } from '../context/cartContextProvider'
import { routes } from '../config/routes'

export const ProductCardDesktop = (props) => {
  const { shoppingCart } = useContext(CartContext)

  const shoppingCartButton = () => {
    if (shoppingCart.find((product) => product.itemId === props.product.id)) {
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
            itemId: props.product.id,
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
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      <Card
        style={{
          marginTop: '40px',
          width: '60%',
          fontSize: '16px',
        }}
        title={props.product.name}
        bordered={false}
        hoverable
        actions={[
          <Button onClick={() => props.setShowProductCard(false)} type="link">
            <ArrowLeftOutlined />
            back to Products
          </Button>,
          shoppingCartButton(),
        ]}
      >
        <Row>
          <Col flex={3}>
            <AdvancedImage
              cldImg={cloudinaryService.getProductCardImage(
                props.product.image,
                200
              )}
            />
          </Col>
          <Col offset={2} flex={2}>
            <Statistic
              style={{ paddingTop: '10px', fontSize: '16px' }}
              value={props.product.price}
              prefix={'$'}
              precision={2}
            />
            <Divider />
            <p>{props.product.description}</p>
          </Col>
        </Row>
      </Card>
    </div>
  )
}
