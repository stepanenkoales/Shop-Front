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
    values.items.forEach((item) => {
      item.name = item.name.trim()
      item.description = item.description.trim()
    })

    try {
      await httpsService.post('/items', values.items)
      notificationService.openNotification({
        type: 'success',
        message: 'Items has been successfully added!',
        duration: 10,
      })
    } catch (error) {
      console.log(error.response)
      console.log(error.response.data.message)

      const err = error?.response?.data?.message

      if (err) {
        return notificationService.openNotification({
          type: 'error',
          message: err.message,
          description: `${err.type} on name: ${err.value}`,
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
                      rules={[
                        {
                          required: true,
                          message: 'Missing name',
                          validator: (rule, value) => {
                            if (!value.trim()) {
                              return Promise.reject(new Error())
                            }
                            return Promise.resolve()
                          },
                        },
                      ]}
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
                          validator: (rule, value) => {
                            if (!Number(value.trim())) {
                              return Promise.reject(new Error())
                            }
                            return Promise.resolve()
                          },
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
                        {
                          required: true,
                          message: 'Missing description',
                          validator: (rule, value) => {
                            if (!value.trim()) {
                              return Promise.reject(new Error())
                            }
                            return Promise.resolve()
                          },
                        },
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
