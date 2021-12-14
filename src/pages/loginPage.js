import { Login } from '../components/login';
import { Link } from 'react-router-dom';
import '../styles/loginPage.scss';


export const LoginPage = () => {
    return (
        <div >
            <div className='header'>Login</div>
                <Login/>
            <div>
                Don't have an account? 
                    <Link to='/register'>
                        <p>Register</p>
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
