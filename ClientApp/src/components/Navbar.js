import React, {useRef} from "react"
import betterDayLogo from "../images/betterDayLogo.png"
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
    const { token } = useAuth();
    const navbarRef = useRef();
    const showNavbar = () => {
        navbarRef.current.classList.toggle("visible")
    }
    return (
        <header className="header">
            <div className="navbar--top">
                <a className="navbar--name" href="/">
                    <img src={betterDayLogo} alt="Logo"></img>
                    BetterDay
                </a>
                <button
                    className="navbar--control"
                    onClick={showNavbar}
                >
                    <span></span><span></span><span></span>
                </button>
            </div>
            <nav className="navbar" ref={navbarRef}>
                <ul className="navbar--right" >
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
        </header>
    );
}
export default Navbar;