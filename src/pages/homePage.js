import { Link } from 'react-router-dom';

export const HomePage = () => {
    return (
        < >
            <div><h1>THIS IS HOMEPAGE</h1></div>

            <div>some information</div>  
            
            <div>
                <p>please Login </p>
                    <Link to='/login'>
                        <p>to Login</p>
                    </Link>
            </div>

        </>
    )
}
