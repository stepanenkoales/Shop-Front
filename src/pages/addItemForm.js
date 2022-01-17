import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../config/routes'
import { httpsService } from '../utils/https.service'
import { notificationService } from '../utils/notification.service'
import { Form, Input, Button, Space, Select } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

import '../styles/adminForm.scss'

export const AddItemForm = () => {
  const [form] = Form.useForm()
  const [categories, setCategories] = useState([])
  const { Option } = Select

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

  const onFinish = async (values) => {
    try {
      await httpsService.post('/items', values.items)
      notificationService.openNotification({
        type: 'success',
        message: 'Items has been successfully added!',
        duration: 10,
      })
    } catch (error) {
      if (error.response.data.errors) {
        return notificationService.openNotification({
          type: 'error',
          message: error.response.data.errors[0].message,
          description: `${error.response.data.errors[0].type} on name: ${error.response.data?.errors[0].value}`,
          duration: 20,
        })
      }
      notificationService.openNotification({
        type: 'error',
        message: 'invalid data type',
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
        <Form.List name="items" initialValue={[{}]}>
          {(fields, { add, remove }) => (
            <>
              <div>
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
                          label="Category"
                          name={[field.name, 'categoryId']}
                          rules={[
                            { required: true, message: 'Missing category' },
                          ]}
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
                      label="Name"
                      name={[field.name, 'name']}
                      rules={[{ required: true, message: 'Missing name' }]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      {...field}
                      label="Price"
                      name={[field.name, 'price']}
                      rules={[
                        {
                          required: true,
                          message: 'Missing price',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      label="Description"
                      name={[field.name, 'description']}
                      rules={[
                        { required: true, message: 'Missing description' },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                ))}
              </div>
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add item
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
