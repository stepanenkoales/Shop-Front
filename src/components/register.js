import { useNavigate } from 'react-router-dom';
import { Form } from './form';

export const Register = () => {
    
    const navigate = useNavigate();
    
    const handleRegister = (email, password) => {

        

        navigate('/');
    }

    return (
        <Form 
            title='Register'
            handleClick={handleRegister}
        />
    )
}