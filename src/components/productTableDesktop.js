import { useMemo, useContext, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { cloudinaryService } from '../utils/cloudinary.service'
import { AdvancedImage } from '@cloudinary/react'
import { Table, Button, InputNumber } from 'antd'
import { ShoppingOutlined } from '@ant-design/icons'
import { CartContext } from '../context/cartContextProvider'
import { routes } from '../config/routes'
import '../styles/homePage.scss'

export const ProductTableDesktop = (props) => {
  const { shoppingCart } = useContext(CartContext)

  const onTableKeyChange = (items) => items.id

  const shoppingCartButton = useCallback(
    (record) => {
      if (shoppingCart.find((product) => product.itemId === record.id)) {
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
              itemId: record.id,
              quantity: record.quantity ? record.quantity : 1,
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
        </Button>
      )
    },
    [props, shoppingCart]
  )

  const columns = useMemo(
    () => [
      {
        title: '',
        dataIndex: 'image',
        render: (text, record) => (
          <AdvancedImage cldImg={cloudinaryService.getImage(record.image)} />
        ),
      },
      {
        title: 'Name',
        dataIndex: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
        render: (text, record) => (
          <div
            onClick={() => {
              props.setShowProductCard(true)
              props.setProduct(record)
            }}
            style={{
              border: 'none',
              background: 'white',
              cursor: 'pointer',
              color: '#1890ff',
            }}
          >
            {record.name}
          </div>
        ),
      },
      {
        title: 'Description',
        dataIndex: 'description',
      },
      {
        title: 'Price',
        dataIndex: 'price',
        sorter: (a, b) => a.price - b.price,
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
        render: (text, record) => (
          <>
            <InputNumber
              min={1}
              max={10}
              defaultValue={1}
              onChange={(quantity) =>
                props.handleQuantityChange(quantity, record.id)
              }
            />
          </>
        ),
      },
      {
        title: '',
        dataIndex: '',
        render: (text, record) => shoppingCartButton(record),
      },
    ],
    [props, shoppingCartButton]
  )

  return (
    <>
      <Table
        className="product-table-desktop"
        rowKey={onTableKeyChange}
        columns={columns}
        dataSource={props.items}
        pagination={{
          pageSize: 5,
          total: props.totalItems,
          hideOnSinglePage: true,
          onChange: props.onPaginationChange,
          current: props.currentPage,
        }}
        size="small"
        bordered={true}
      />
    </>
  )
}
