import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Card, Statistic, Row, Col, Divider } from 'antd'
import { AdvancedImage } from '@cloudinary/react'
import { cloudinaryService } from '../utils/cloudinary.service'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { ShoppingCartButton } from './shoppingCartButton'
import { routes } from '../config/routes'
import { httpsService } from '../utils/https.service'

export const ProductCardDesktop = () => {
  const params = useParams()
  const [item, setItem] = useState([])

  useEffect(() => {
    const set = new Set([params.id])

    httpsService
      .post('/items/id', {
        itemsId: Array.from(set),
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
          <Link to={routes.homePage}>
            <ArrowLeftOutlined />
            back to HomePage
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
