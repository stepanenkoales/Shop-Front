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
      const response = await httpsService.post('/user/reset', body)

      if (response) {
        notificationService.openNotification(
          'info',
          '',
          'New password was sent to your email!',
          10
        )
        navigate(routes.login)
      } else {
        notificationService.openNotification(
          'error',
          '',
          'This email is not valid or not supported',
          10
        )
      }
    } catch (err) {
      notificationService.openNotification(
        'error',
        err.response.statusText,
        err.response.data.message,
        10
      )
    }
  }

  return (
    <div className="container">
      <Form name="reset-form" className="reset-form" onFinish={handleReset}>
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
          <p>
            return to <Link to={routes.login}>Login</Link>
          </p>
        </Form.Item>
      </Form>
    </div>
  )
}
