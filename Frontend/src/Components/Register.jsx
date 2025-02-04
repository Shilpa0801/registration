import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

function Register() {
    const navigate = useNavigate();
    const [Record, setRecord] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);  

  
    const changeRecord = (e) => {
        setRecord({ ...Record, [e.target.name]: e.target.value });
    };

  
    const validateForm = () => {
        if (!Record.name || !Record.email || !Record.password) {
            setError('All fields are required.');
            return false;
        }
       
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(Record.email)) {
            setError('Please enter a valid email address.');
            return false;
        }

        
        if (Record.password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return false;
        }
        setError('');  
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;        
        setIsLoading(true);
         const url = 'http://localhost:8000/register';
        Axios.post(url, Record)
    .then((res) => {
        setIsLoading(false); 
        alert(res.data);
        setTimeout(() => {
            navigate('/login');
        }, 1000); 
    })
    .catch((err) => {
        setIsLoading(false);  
        console.error(err);
        setError('Error: try again .');
    });

    };

    return (
        <div>
            <h1>SIGN UP</h1>
            
            <br />
            <form onSubmit={handleSubmit}>
                {error && <p className="error-text">{error}</p>}
                <p>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Username"
                        value={Record.name}
                        onChange={changeRecord}
                    />
                </p>
                <p>
                    <input
                        type="text"
                        className="form-control"
                        name="email"
                        placeholder="E-mail"
                        value={Record.email}
                        onChange={changeRecord}
                    />
                </p>
                <p>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Password"
                        value={Record.password}
                        onChange={changeRecord}
                    />
                </p>
                <input
                    type="submit"
                    className="btn btn-primary"
                    value={isLoading ? 'Registering...' : 'Register'}
                    disabled={isLoading} 
                />
            </form>
        </div>
    );
}

export default Register;

