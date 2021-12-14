import { useNavigate } from 'react-router-dom';
import { Form } from './form';

export const Login = () => {

    const navigate = useNavigate();
    
    const handleLogin = (email, password) => {

        navigate('/');
        
    }

    return (
        <Form 
            title='Login'
            handleClick={handleLogin}
        />
    )
}