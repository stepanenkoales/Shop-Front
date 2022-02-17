import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { routes } from '../config/routes'
import { httpsService } from '../utils/https.service'
import { storageService } from '../utils/storage.service'
import { notificationService } from '../utils/notification.service'
import '../styles/loginForm.scss'

export const LoginForm = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const fromPage = location.state?.from?.pathname || routes.homePage

  const handleLogin = async (body) => {
    try {
      const response = await httpsService.post('/user/login', body)
      const { accessToken, refreshToken } = response
      storageService.set('accessToken', accessToken)
      navigate(fromPage, { replace: true })
      body.remember
        ? storageService.set('refreshToken', refreshToken)
        : storageService.set('refreshToken', null)
      notificationService.openNotification({
        type: 'success',
        description: 'You are logged in!',
        duration: 6,
      })
    } catch (err) {
      const values = {
        type: 'error',
        message: err.response.statusText,
        description: err.response.data.message,
        duration: 6,
      }

      switch (err.response.status) {
        case 400:
          notificationService.openNotification(values)
          break
        case 401:
          values.description = 'Please login!'
          notificationService.openNotification(values)
          break
        default:
          values.description = err.response.data.message
          notificationService.openNotification(values)
      }
    }
  }

  return (
    <div className="container">
      <Form
        name="login"
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
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Login
          </Button>
          <div className="footer-text">
            <p>
              Don't have an account yet?
              <Link to={routes.register}> Register</Link>
            </p>
            <p>
              return to <Link to={routes.homePage}>Homepage</Link>
            </p>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}
