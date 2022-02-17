import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { routes } from '../config/routes'
import { Form, Input, Button, Space, Select } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { notificationService } from '../utils/notification.service'
import { httpsService } from '../utils/https.service'
import '../styles/adminForm.scss'

const { Option } = Select

export const AddCategoryForm = () => {
  const [categories, setCategories] = useState([])
  const [form] = Form.useForm()
  const navigate = useNavigate()

  useEffect(() => {
    httpsService
      .get('/categories/', {
        params: {
          name: 'parent',
        },
      })
      .then((res) => {
        res.push({ id: null, category: 'no category' })
        setCategories(res)
      })
  }, [])

  const onFinish = async (values) => {
    values.category.forEach((item) => {
      item.category = item.category.trim()
    })

    try {
      await httpsService.post('/categories', values.category)
      notificationService.openNotification({
        type: 'success',
        description: 'Categories has been successfully added!',
        duration: 10,
      })
      navigate(routes.admin)
    } catch (error) {
      const err = error?.response?.data?.message

      if (err) {
        return notificationService.openNotification({
          type: 'error',
          message: `${err.message}!`,
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
                      >
                        <Select>
                          {categories.map((item) => (
                            <Option key={item.category} value={item.id}>
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
                    rules={[
                      {
                        required: true,
                        message: 'Missing category',
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
