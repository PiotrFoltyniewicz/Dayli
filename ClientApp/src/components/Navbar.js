import React, { Link } from "react"
import betterDayLogo from "../images/betterDayLogo.png"
import { useAuth } from './AuthContext';

function Navbar()
{
    const { token } = useAuth();
    return (
        <nav className="navbar">
            <a className="navbar--name" href="/">
                <img src={betterDayLogo} alt="Logo"></img>
                BetterDay
            </a>
            <ul>
                <li>
                    <a href="/home">Home</a>
                </li>
                <li>
                    <a href="/about">About</a>
                </li>
                <li>
                    <a href="/profile">{token ? "Profile" : "Log in"}</a>
                </li>
            </ul>
        </nav>
    );
}
export default Navbar;