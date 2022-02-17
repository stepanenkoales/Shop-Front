import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { LogoutOutlined, HomeOutlined } from '@ant-design/icons'
import { Layout, Menu, Row, Col, Divider, Select } from 'antd'
import { Orders } from '../components/orders'
import { AuthContext } from '../context/authContextProvider'
import { routes } from '../config/routes'
import { httpsService } from '../utils/https.service'
import '../styles/ordersForm.scss'

const { Content } = Layout
const { Option } = Select

export const OrdersForm = () => {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { logout } = useContext(AuthContext)

  useEffect(() => {
    httpsService
      .get('/order')
      .then((res) => {
        setOrders(res)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setIsLoading(true))
  }, [])

  const ordersQuantity = () => {
    if (orders.length === 1) {
      return '1 order'
    }

    return `${orders.length} orders`
  }

  const handleOrderCancel = (id) => {
    httpsService
      .delete('/order', { id })
      .then((res) => {
        handleOrderSelect()
      })
      .catch((err) => console.log(err))
  }

  const handleOrderSelect = (days) => {
    if (!days) {
      return httpsService
        .get('/order')
        .then((res) => {
          setOrders(res)
        })
        .catch((err) => console.log(err))
    }

    httpsService
      .get('/order', { params: { time: days * 24 * 60 * 60 * 1000 } })
      .then((res) => {
        setOrders(res)
      })
      .catch((err) => console.log(err))
  }

  if (!isLoading) return null

  return (
    <div>
      <Layout style={{ marginTop: '150px' }}>
        <Content>
          <Row>
            <Col span={8}>
              <div className="orders-left-menu">
                <Menu mode="vertical">
                  <Menu.Item key="1">
                    <Link to={routes.homePage}>
                      <HomeOutlined />
                      <span>Home</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <LogoutOutlined />
                    <span onClick={logout}>Logout</span>
                  </Menu.Item>
                </Menu>
              </div>
            </Col>
            <Col span={12}>
              <h1>Your Orders</h1>

              <Divider orientation="left">
                {`${ordersQuantity()} placed in `}
                <Select defaultValue="" onSelect={handleOrderSelect}>
                  <Option value="">at all time</Option>
                  <Option value="30">last 30 days</Option>
                  <Option value="90">past 3 months</Option>
                  <Option value="180">past 6 months</Option>
                </Select>
              </Divider>

              {orders.length > 0 ? (
                <Orders onClick={handleOrderCancel} orders={orders} />
              ) : (
                <div>
                  <h3>
                    You have not placed any orders. Please choose another
                    period!
                  </h3>
                </div>
              )}
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  )
}
