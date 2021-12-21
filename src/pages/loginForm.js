import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { routes } from '../config/routes'
import { httpsService } from '../utils/https.service'
import { storageService } from '../utils/storage.service'
import '../styles/loginPage.scss'

export const LoginForm = () => {
  const navigate = useNavigate()

  const handleLogin = async (body) => {
    try {
      const response = await httpsService.post('/user/login', body)

      if (response.accessToken) {
        storageService.set('accessToken', response.accessToken)
        storageService.set('refreshToken', response.refreshToken)
        navigate(routes.homepage)
      }
    } catch (err) {
      console.log(err)
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
        <Button type="primary" htmlType="submit" className="login-form-button">
          Login
        </Button>
        or <Link to="/register">register now!</Link>
        <Link to={routes.homepage}>
          <p>Homepage</p>
        </Link>
      </Form.Item>
    </Form>
  )
}
