import { ProductCardMobile } from './productCardMobile'
import { ProductTableDesktop } from './productTableDesktop'
import Media from 'react-media'

export const ContentHomePage = (props) => {
  return (
    <>
      <Media query={{ maxWidth: 720 }}>
        {(matches) =>
          matches ? (
            <ProductCardMobile
              items={props.items}
              totalItems={props.totalItems}
              onMobilePaginationChange={props.onMobilePaginationChange}
            />
          ) : (
            <ProductTableDesktop
              setShowProductCard={props.setShowProductCard}
              items={props.items}
              totalItems={props.totalItems}
              onPaginationChange={props.onPaginationChange}
              currentPage={props.currentPage}
              handleQuantityChange={props.handleQuantityChange}
            />
          )
        }
      </Media>
    </>
  )
}
