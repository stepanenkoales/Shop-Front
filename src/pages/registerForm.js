import { Form, Input, Button } from 'antd'
import { Link } from 'react-router-dom'
import { routes } from '../config/routes'
import { httpsService } from '../utils/https.service'
import '../styles/registerPage.scss'

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
}
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
}

export const RegisterForm = () => {
  const [form] = Form.useForm()

  const handleRegister = async (body) => {
    await httpsService.post('/user', body)
  }

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      className="register-form"
      onFinish={handleRegister}
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
        <Input placeholder="Email" />
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
        <Input.Password placeholder="Password" />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button
          type="primary"
          htmlType="submit"
          className="register-form-button"
        >
          Register
        </Button>
        <Link to={routes.homepage}>
          <p>Homepage</p>
        </Link>
      </Form.Item>
    </Form>
  )
}
