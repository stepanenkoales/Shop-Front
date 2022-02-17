import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { routes } from '../config/routes'
import { ArrowLeftOutlined } from '@ant-design/icons'
import '../styles/adminForm.scss'

export const AdminForm = () => {
  return (
    <div className="wrapper">
      <Button type="primary" block>
        <Link to={routes.addCategory}>Add Category</Link>
      </Button>
      <Button type="primary" block>
        <Link to={routes.addItem}>Add Item</Link>
      </Button>
      <Button type="primary" block>
        <Link to={routes.updateItem}>Update Item</Link>
      </Button>
      <Button type="primary" block>
        <Link to={routes.deleteItem}>Delete Item</Link>
      </Button>
      <Button type="link" block>
        <Link to={routes.homePage}>
          <ArrowLeftOutlined /> back to Home Page
        </Link>
      </Button>
    </div>
  )
}
