import { useState } from 'react';


export const Form = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    return (
        <>
            <div>
                <p>email</p> 
                <div>             
                    <input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div> 
            </div>
            <div >
                <p>password</p>
                <div>
                    <input
                        
                        value={password}
                        onChange={e => setPassword(e.target.value)}              
                    />
                </div>
            </div>    
            <button 
                onClick={() => props.handleClick(email, password)}
            >
                {props.title}
            </button>  
        </>
    )
}