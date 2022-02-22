import { useMemo } from 'react'
import { cloudinaryService } from '../utils/cloudinary.service'
import { AdvancedImage } from '@cloudinary/react'
import { Table, InputNumber } from 'antd'
import { ShoppingCartButton } from './shoppingCartButton'
import { Link, Outlet, useParams } from 'react-router-dom'
import '../styles/homePage.scss'

export const ProductTableDesktop = (props) => {
  const onTableKeyChange = (items) => items.id

  const columns = useMemo(
    () => [
      {
        title: '',
        dataIndex: 'image',
        render: (text, record) => (
          <AdvancedImage
            cldImg={cloudinaryService.getProductCardImage(record.image, 200)}
          />
        ),
      },
      {
        title: 'Name',
        dataIndex: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
        render: (text, record) => (
          <Link
            style={{
              border: 'none',
              background: 'white',
              cursor: 'pointer',
              color: '#1890ff',
            }}
            to={`/item/${record.id}`}
          >
            {record.name}
          </Link>
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
        render: (text, record) => (
          <ShoppingCartButton id={record.id} quantity={record.quantity} />
        ),
      },
    ],
    [props]
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
