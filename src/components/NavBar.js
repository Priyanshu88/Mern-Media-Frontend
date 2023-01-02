import React, { useContext } from 'react';
import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../App';


const NavBar = () => {

    const { state, dispatch } = useContext(UserContext);
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        dispatch({ type: "LOGOUT" });
        navigate("/login");
    }

    const navList = () => {
        if (state) {
            // if the user is present
            return [
                <li key="11111"><Link to="/create-post">Create Post</Link></li>,
                <li key="11178"><Link to="/postsfromfollowing">Posts from Followings</Link></li>,
                <li key="11122"><Link to="/profile">Profile</Link></li>,
                <li key="112121">
                    <button onClick={() => logout()} className="btn waves-effect waves-light #d32f2f red darken-2">Logout</button>
                </li>,
            ]
        }
        else {
            return [
                <li key="222334"><Link to="/login">Login</Link></li>,
                <li key="433435"><Link to="/signup">Signup</Link></li>
            ]
        }
    }

    return (
        <nav>
        <div className="nav-wrapper white">
                <Link to={state ? "/" : "/login"} className="brand-logo">MERN Social Media</Link>
                <ul id="nav-mobile" className="right">
                    {navList()}
                </ul>
        </div>
    </nav>
            
    );
}

export default NavBar