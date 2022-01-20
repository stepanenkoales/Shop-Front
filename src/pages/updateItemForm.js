import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../config/routes'
import { httpsService } from '../utils/https.service'
import { notificationService } from '../utils/notification.service'
import { Form, Input, Button, Select } from 'antd'
import '../styles/adminForm.scss'

const { Option } = Select

export const UpdateItemForm = () => {
  const [categories, setCategories] = useState([])
  const [items, setItems] = useState([])

  useEffect(() => {
    httpsService
      .get('/categories/', {
        params: {
          name: 'subcategory',
        },
      })
      .then((res) => {
        setCategories(res)
      })
  }, [])

  const onSelect = async (value) => {
    const response = await httpsService.get('/items/', {
      params: {
        categoryId: value,
        pageSize: 50,
      },
    })
    const { rows } = response

    setItems(rows)
  }

  const onFinish = async (values) => {
    const { id, price, description } = values
    const body = { price, description }

    try {
      await httpsService.put(`/items/${id}`, body)
      notificationService.openNotification({
        type: 'success',
        description: 'Item has been successfully updated!',
        duration: 10,
      })
    } catch (error) {
      notificationService.openNotification({
        type: 'error',
        message: 'Invalid data type!',
        duration: 20,
      })
    }
  }

  return (
    <div className="container">
      <Form
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        autoComplete="off"
      >
        <div className="menu">
          <Form.Item
            label="Category"
            name="categoryId"
            rules={[{ required: true, message: 'Missing category' }]}
          >
            <Select onSelect={onSelect}>
              {categories.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.category}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Name"
            name="id"
            rules={[{ required: true, message: 'Missing name' }]}
          >
            <Select>
              {items.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Missing price' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Missing description' }]}
          >
            <Input />
          </Form.Item>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="admin-button">
            Submit
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" block>
            <Link to={routes.admin}>Admin Panel</Link>
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
