import { auth } from '../../core/config/fireabase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';

export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password)    
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
            <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
            <button onClick={signIn} >SignIn</button>
        </div>
    )
}
