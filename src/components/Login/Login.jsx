// Login.js
import React, { useState, useContext } from 'react';
import './Login.css';
import config from '../../Links/config';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import {useNavigate} from "react-router-dom"
// import { AuthContext } from '../../contexts/AuthContext'; // Import AuthContext

const Login = () => {
    const { setIsLoggedIn,seTUsername } = useContext(AuthContext); // Access setIsLoggedIn from context
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const backendurl = config.backendUrl+"/loginuser";
    const navigate=useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(username,password);
        try {
            const config = { headers: { "Content-Type": "application/json" } };

            const { data } = await axios.post(backendurl,
            {
                username,
                password
            }
        )
            // const response = await axios.post(backendurl, {
            //     username: username,
            //     password: password
            // });
            console.log(data); // Handle response from the backend
            if(data.succes){
                setIsLoggedIn(true);

                seTUsername(username); // Set isLoggedIn to true upon successful login
                navigate("/dashboard")

            }
            else{
                alert("invalid username or pasword")
            }
        } catch (error) {
            console.error('Error:', error.response.data.message); // Handle error response from the backend
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
