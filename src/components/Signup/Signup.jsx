// Signup.js

import React, { useState } from 'react';
import './Signup.css';
import axios from 'axios';
import config from '../../Links/config';
import {useNavigate} from "react-router-dom"
const Signup = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault();
        // You can perform signup/authentication logic here
        const backendurl = config.backendUrl+"/createuser"
        try {
            const { data } = await axios.post(backendurl,
                {
                    username,
                    password,
                    email,
                    name
                }
            )
            console.log(data);
            if(data.sucess){
                alert(`registration sucessful for username ${username}`)
                navigate("/login")
            }
            else{
                alert(data.error);
            }
        } catch (error) {
            alert(error)
        }
        // console.log('Name:', name);
        // console.log('Username:', username);
        // console.log('Email:', email);
        // console.log('Password:', password);
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
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
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
