import { Form, Input, Button} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { routes } from '../config/routes';
import { httpsService } from '../utils/https.service';
import '../styles/registerPage.scss';

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
};
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
};

export const RegisterForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  

  const handleRegister = async (body) => {
      
    //console.log(body);

    try {
        const response = await httpsService.post('/user', body);
        console.log(response);
    } catch (e) {
        console.log('fatalerror')
    }
    

    navigate(routes.homepage);
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={handleRegister}
      initialValues={{
        residence: ['zhejiang', 'hangzhou', 'xihu'],
        prefix: '86',
      }}
      scrollToFirstError
    >
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
        <Link to={routes.homepage}><p>Homepage</p></Link>
      </Form.Item>
    </Form>

  );
};