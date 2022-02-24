import InfiniteScroll from 'react-infinite-scroll-component'
import { Card, Statistic } from 'antd'
import { AdvancedImage } from '@cloudinary/react'
import { cloudinaryService } from '../utils/cloudinary.service'
import { ShoppingCartButton } from './shoppingCartButton'

export const ProductCardMobile = (props) => {
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
              actions={[<ShoppingCartButton id={item.id} />]}
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
