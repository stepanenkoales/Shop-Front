import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../config/routes'
import { Form, Input, Button, Space, Select } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { notificationService } from '../utils/notification.service'
import { httpsService } from '../utils/https.service'
import '../styles/adminForm.scss'

export const AddCategoryForm = () => {
  const [categories, setCategories] = useState([])
  const { Option } = Select
  const [form] = Form.useForm()

  useEffect(() => {
    httpsService
      .get('/categories/', {
        params: {
          name: 'parent',
        },
      })
      .then((res) => {
        res.push({ id: 1, category: 'add parent category' })

        setCategories(res)
      })
  }, [])

  const onFinish = async (values) => {
    values.category.map((item) => {
      if (item.parentId === 1) item.parentId = null
    })

    try {
      await httpsService.post('/categories', values.category)
      notificationService.openNotification({
        type: 'success',
        description: 'Categories has been successfully added!',
        duration: 10,
      })
    } catch (error) {
      notificationService.openNotification({
        type: 'error',
        message: `${error.response.data.errors[0].message}!`,
        description: `${error.response.data.errors[0].type} on name: ${error.response.data.errors[0].value}`,
        duration: 20,
      })
    }
  }

  return (
    <div className="container-admin">
      <Form
        form={form}
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.List name="category" initialValue={[{}]}>
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Space key={field.key} align="baseline">
                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, curValues) =>
                      prevValues.categories !== curValues.categories
                    }
                  >
                    {() => (
                      <Form.Item
                        {...field}
                        label="Parent"
                        name={[field.name, 'parentId']}
                        rules={[{ required: true, message: 'Missing parent' }]}
                      >
                        <Select>
                          {categories.map((item) => (
                            <Option key={item.id} value={item.id}>
                              {item.category}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    )}
                  </Form.Item>

                  <Form.Item
                    {...field}
                    label="Category"
                    name={[field.name, 'category']}
                    rules={[{ required: true, message: 'Missing category' }]}
                  >
                    <Input />
                  </Form.Item>

                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Space>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add category
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

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
