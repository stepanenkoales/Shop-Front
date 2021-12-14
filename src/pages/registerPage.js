import { Register } from '../components/register';
import { Link } from 'react-router-dom';

export const RegisterPage = () => {
    return (
        <div >
            <h1>Register</h1>
                <Register/>

            <div>
                Already have an account? 
                    <Link to='/login'>
                        <p>Login</p>
                    </Link>
            </div>

            <div> 
                <Link to='/'>
                    <p>Homepage</p>
                </Link>
            </div>

        </div>
    )
}
