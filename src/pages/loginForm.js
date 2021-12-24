import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { routes } from '../config/routes'
import { httpsService } from '../utils/https.service'
import { storageService } from '../utils/storage.service'
import '../styles/loginForm.scss'
import { notificationService } from '../utils/notification.service'

export const LoginForm = () => {
  const navigate = useNavigate()

  const handleLogin = async (body) => {
    try {
      const response = await httpsService.post('/user/login', body)
      storageService.set('accessToken', response.accessToken)
      body.remember
        ? storageService.set('refreshToken', response.refreshToken)
        : storageService.set('refreshToken', null)
      notificationService.openNotification(
        'success',
        '',
        'You are logged in!',
        6
      )
      navigate(routes.homepage)
    } catch (err) {
      switch (err.response.status) {
        case 400:
          notificationService.openNotification(
            'error',
            err.response.statusText,
            err.response.data.message,
            6
          )
          break
        case 401:
          notificationService.openNotification(
            'error',
            err.response.statusText,
            'Please login!',
            6
          )
          break
        default:
          notificationService.openNotification(
            'error',
            err.response.statusText,
            err.response.data.message,
            6
          )
      }
    }
  }

  return (
    <Form
      name="login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={handleLogin}
    >
      <Form.Item
        name="email"
        className="input"
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
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>

      <Form.Item
        name="password"
        className="input"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
          {
            type: 'string',
            min: 9,
            message: 'Password must be at least 9 characters',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Link to={routes.reset}>Forgot password</Link>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Login
        </Button>
        <div className="footer-text">
          <p>
            Don't have an account yet?
            <Link to={routes.register}> Register</Link>
          </p>
          <p>
            return to <Link to={routes.homepage}>Homepage</Link>
          </p>
        </div>
      </Form.Item>
    </Form>
  )
}
