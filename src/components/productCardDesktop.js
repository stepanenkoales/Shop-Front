import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Card, Statistic, Row, Col, Divider, Button } from 'antd'
import { AdvancedImage } from '@cloudinary/react'
import { cloudinaryService } from '../utils/cloudinary.service'
import { HomeOutlined } from '@ant-design/icons'
import { ShoppingCartButton } from './shoppingCartButton'
import { routes } from '../config/routes'
import { httpsService } from '../utils/https.service'

export const ProductCardDesktop = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState([])

  const navigateBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    httpsService
      .post('/items/id', {
        itemsId: id,
      })
      .then((res) => {
        console.log(res)
        setItem(res.rows[0])
      })
      .catch((err) => console.log(err.response))
  }, [])

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
          marginTop: '130px',
          width: '60%',
          fontSize: '16px',
        }}
        title={item.name}
        bordered={false}
        hoverable
        actions={[
          <Button type="ghost" onClick={navigateBack}>
            back to Products
          </Button>,
          <Link to={routes.homePage}>
            <HomeOutlined
              style={{
                marginTop: '5px',
                color: '#0f0f0f',
                fontSize: '1.4em',
              }}
            />
          </Link>,
          <ShoppingCartButton id={item.id} />,
        ]}
      >
        <Row>
          <Col flex={3}>
            <AdvancedImage
              cldImg={cloudinaryService.getProductCardImage(item.image, 200)}
            />
          </Col>
          <Col offset={2} flex={2}>
            <Statistic
              style={{ paddingTop: '10px', fontSize: '16px' }}
              value={item.price}
              prefix={'$'}
              precision={2}
            />
            <Divider />
            <p>{item.description}</p>
          </Col>
        </Row>
      </Card>
    </div>
  )
}
