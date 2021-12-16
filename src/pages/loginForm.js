import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/loginPage.scss';
import { routes } from '../config/routes';
import { httpsService } from '../utils/https.service';
import { storageService } from '../utils/storage.service';


export const LoginForm = () => {
    const navigate = useNavigate();
   

    const handleLogin = async (body) => {       
      
      try { 
        const response = await httpsService.post('/user/login', body);
        
        //console.log(response);
        
        if (response) {
          storageService.set('accessToken', response.accessToken);
          storageService.set('refreshToken', response.refreshToken);
          navigate(routes.homepage);
        }
        

      } catch (e) {
        //change e.message to e.status

        console.log(e)
        /*switch (e.status) {
          case 401:
            console.log('Unauthorized');
            // render page with error
            break;
          case 'jwt expired':
            console.log('jwt expired');
          break;           
          case 'email not found':
            console.log('email not found');
            break;
          case 'user not verified':
            console.log('user not verified');
            break;
          case 'wrong pass':
            console.log('wrong pass');
          break;
          default:
            console.log(e);
        }
        */
      }
      
    };
  
    return (
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={handleLogin}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
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
          Or <Link to='/register'>register now!</Link>
          
          <Link to={routes.homepage}><p>Homepage</p></Link>
        </Form.Item>

      </Form>
    );
};