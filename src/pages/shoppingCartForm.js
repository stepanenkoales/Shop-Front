import { useState, useEffect, useCallback, useContext, useMemo } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { routes } from '../config/routes'
import { httpsService } from '../utils/https.service'
import { AuthContext } from '../context/authContextProvider'
import { CartContext } from '../context/cartContextProvider'
import { cloudinaryService } from '../utils/cloudinary.service'
import { AdvancedImage } from '@cloudinary/react'
import { Table, Button, Row, Col, Statistic, InputNumber, Divider } from 'antd'
import { ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons'
import { notificationService } from '../utils/notification.service'
import { Checkout } from '../components/checkout'
import { storageService } from '../utils/storage.service'
import '../styles/homePage.scss'

export const ShoppingCartForm = () => {
  const [items, setItems] = useState([])
  const [state, setState] = useState('start')
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const { shoppingCart, setShoppingCart } = useContext(CartContext)

  useEffect(() => {
    let itemsId = []
    shoppingCart.forEach((item) => itemsId.push(item.itemId))

    if (itemsId.length === 0) return

    httpsService
      .post('/items/id', {
        itemsId,
      })
      .then((res) => {
        res.rows.forEach((item) => {
          const index = shoppingCart.findIndex((el) => el.itemId === item.id)
          item.quantity = shoppingCart[index].quantity
        })

        setItems(res.rows)
      })
      .catch((err) => console.log(err.response))
  }, [shoppingCart])

  const itemsQuantity = useCallback(() => {
    let totalQuantity = 0
    items.map((item) => (totalQuantity += item.quantity))

    if (totalQuantity > 1) {
      return `${totalQuantity} items`
    }

    return `${totalQuantity} item`
  }, [items])

  const totalShoppingSum = useCallback(() => {
    let totalSum = 0
    items.forEach((item) => {
      totalSum += item.price * item.quantity
    })

    return totalSum.toFixed(2)
  }, [items])

  const handleQuantityChange = useCallback(
    (value, id) => {
      shoppingCart
        .filter((item) => item.itemId === id)
        .forEach((item) => (item.quantity = value))
      items
        .filter((item) => item.id === id)
        .forEach((item) => (item.quantity = value))

      setItems(items)
      setShoppingCart([...shoppingCart])
    },
    [shoppingCart, setShoppingCart, items]
  )

  const handleItemDelete = useCallback(
    (id) => {
      shoppingCart.splice(
        shoppingCart.findIndex((item) => item.itemId === id),
        1
      )
      items.splice(
        items.findIndex((item) => item.id === id),
        1
      )

      if (!shoppingCart.length) {
        storageService.set('shoppingCart', JSON.stringify([]))
      }

      setItems([...items])
      setShoppingCart([...shoppingCart])
    },
    [shoppingCart, setShoppingCart, items]
  )

  const handlePlaceOrder = async (value) => {
    let body = []
    items.forEach((item) =>
      body.push({
        itemId: item.id,
        price: item.price,
        quantity: item.quantity,
      })
    )

    try {
      await httpsService.post('/order/', { body, value })
      notificationService.openNotification({
        type: 'success',
        description: 'Order has been successfully submitted!',
        duration: 20,
      })

      setShoppingCart([])
      navigate(routes.homePage)
    } catch (error) {
      notificationService.openNotification({
        type: 'error',
        message: 'Please try again later!',
        duration: 10,
      })
    }
  }

  const onKeyChange = (items) => items.id

  const columns = useMemo(
    () => [
      {
        title: '',
        dataIndex: 'image',
        render: (text, record) => (
          <AdvancedImage
            cldImg={cloudinaryService.getProductCardImage(record.image)}
          />
        ),
      },
      {
        title: 'Name',
        dataIndex: 'name',
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
        render: (text, record) => (
          <>
            <InputNumber
              min={1}
              max={10}
              defaultValue={record.quantity}
              onChange={(value) => handleQuantityChange(value, record.id)}
            />
            <Button type="link" onClick={() => handleItemDelete(record.id)}>
              <DeleteOutlined />
            </Button>
          </>
        ),
      },
      {
        title: 'Price',
        dataIndex: 'price',
        render: (text, record) => (
          <Statistic
            valueStyle={{ fontSize: '17px' }}
            title="Price per 1"
            value={record.price}
            prefix={'$'}
            precision={2}
          />
        ),
      },
    ],
    [handleQuantityChange, handleItemDelete]
  )

  return (
    <div className="shopping-cart-container">
      <h1>Shopping Cart</h1>

      {shoppingCart.length ? (
        <>
          <Table
            rowKey={onKeyChange}
            columns={columns}
            dataSource={items}
            size="small"
            bordered={true}
            pagination={{
              pagesize: 10,
              hideOnSinglePage: true,
            }}
          />
          <Row>
            <Col offset={17} span={5}>
              <Statistic
                title={`Subtotal (${itemsQuantity()})`}
                value={totalShoppingSum()}
                prefix={'$'}
                precision={2}
              />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={5}>
              <Button type="link">
                <Link to={routes.homePage}>
                  <ArrowLeftOutlined /> Continue shopping
                </Link>
              </Button>
            </Col>
            <Col span={5} offset={12}>
              <Button type="primary" onClick={() => setState('checkout')}>
                Proceed to checkout
              </Button>
            </Col>
          </Row>
          <Divider />
          {state === 'checkout' && !user && <Navigate to={routes.login} />}
          {state === 'checkout' && user && (
            <Checkout onFinish={handlePlaceOrder} />
          )}
        </>
      ) : (
        <>
          <h2>Your Cart is empty</h2>
          <Divider />
          <Button type="link">
            <Link to={routes.homePage}>
              <ArrowLeftOutlined /> Continue shopping
            </Link>
          </Button>
        </>
      )}
    </div>
  )
}
