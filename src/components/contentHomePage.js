import { useState } from 'react'
import { ProductCardMobile } from './productCardMobile'
import { ProductTableDesktop } from './productTableDesktop'
import { ProductCardDesktop } from './productCardDesktop'
import Media from 'react-media'

export const ContentHomePage = (props) => {
  const [product, setProduct] = useState(null)

  if (props.showProductCard) {
    return (
      <ProductCardDesktop
        product={product}
        addToShoppingCart={props.addToShoppingCart}
        setShowProductCard={props.setShowProductCard}
      />
    )
  }

  return (
    <Media query={{ maxWidth: 575 }}>
      {(matches) =>
        matches ? (
          <ProductCardMobile
            items={props.items}
            totalItems={props.totalItems}
            addToShoppingCart={props.addToShoppingCart}
            onMobilePaginationChange={props.onMobilePaginationChange}
          />
        ) : (
          <ProductTableDesktop
            setShowProductCard={props.setShowProductCard}
            setProduct={setProduct}
            items={props.items}
            totalItems={props.totalItems}
            onPaginationChange={props.onPaginationChange}
            currentPage={props.currentPage}
            handleQuantityChange={props.handleQuantityChange}
            addToShoppingCart={props.addToShoppingCart}
          />
        )
      }
    </Media>
  )
}
