import { Form, Input, Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { routes } from '../config/routes'
import { httpsService } from '../utils/https.service'
import { notificationService } from '../utils/notification.service'
import '../styles/registerForm.scss'

export const RegisterForm = () => {
  const navigate = useNavigate()

  const handleRegister = async (body) => {
    try {
      await httpsService.post('/user', body)
      notificationService.openNotification({
        type: 'info',
        description:
          'In order to complete the login, please click the link in the email we just sent!',
        duration: 10,
      })
      navigate(routes.login)
    } catch (err) {
      notificationService.openNotification({
        type: 'error',
        message: err.response.statusText,
        description: err.response.data.message,
        duration: 6,
      })
    }
  }

  return (
    <div className="container">
      <Form name="register-form" onFinish={handleRegister}>
        <Form.Item
          name="email"
          className="custom-email-input"
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
        >
          <Input placeholder="Email" prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item
          name="password"
          className="input"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            {
              type: 'string',
              min: 9,
              message: 'Password must be at least 9 characters',
            },
          ]}
        >
          <Input.Password placeholder="Password" prefix={<LockOutlined />} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="register-button">
            Register
          </Button>
          <p>
            return to <Link to={routes.homePage}>Homepage</Link>
          </p>
        </Form.Item>
      </Form>
    </div>
  )
}
