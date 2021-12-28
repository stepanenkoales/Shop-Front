import { Form, Input, Button } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { routes } from '../config/routes'
import { httpsService } from '../utils/https.service'
import { notificationService } from '../utils/notification.service'
import '../styles/resetForm.scss'

export const ResetForm = () => {
  const navigate = useNavigate()

  const handleReset = async (body) => {
    try {
      await httpsService.post('/user/reset', body)
      notificationService.openNotification({
        type: 'info',
        description: 'New password was sent to your email.',
        duration: 10,
      })
      navigate(routes.login)
    } catch (err) {
      notificationService.openNotification({
        type: 'error',
        message: err.response.statusText,
        description: err.response.data.message,
        duration: 10,
      })
    }
  }

  return (
    <div className="container">
      <Form name="reset-form" onFinish={handleReset}>
        <div>
          <h2>Having trouble logging in?</h2>
          <p>Enter your email to get started</p>
        </div>
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid Email!',
            },
            {
              required: true,
              message: 'Please input your Email!',
            },
          ]}
          className="email-field"
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="reset-button">
            Reset password
          </Button>
          <div>
            return to <Link to={routes.login}>Login</Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}
