import React from 'react';
import './Home.css'; // Import the CSS file
import { Link } from "react-router-dom"
const Home = () => {
    return (
        <div className="container">
            <h1>Online Electric Bill System</h1>
            <div>
                <Link to={"/login"}>

                    <button onClick={() => console.log("Login button clicked")}>Login</button>
                </Link>
                <Link to={"/signup"}>

                    <button onClick={() => console.log("Signup button clicked")}>Signup</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
