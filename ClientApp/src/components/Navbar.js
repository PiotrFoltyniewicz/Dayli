import React, { useRef } from 'react';
import dayliLogo from '../images/dayliLogo.png';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
    const { token, toggleLoginForm } = useAuth();
    const navbarRef = useRef();
    const loginButtonRef = useRef();
    const showNavbar = () => {
        navbarRef.current.classList.toggle('visible');
    };

    const handleLogInClick = () => {
        toggleLoginForm()
        showNavbar();
    };

    const handleLoginEnter = (event) => {
        if (event.key === 'Enter') {
            loginButtonRef.current.click();
        }
    };

    return (
        <header className="header">
            <div className="navbar--top">
                <a className="navbar--name" href="/">
                    <img src={dayliLogo} alt="Logo" />
                    Dayli
                </a>
                <button className="navbar--control" onClick={showNavbar}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
            <nav className="navbar" ref={navbarRef}>
                {/*
                <ul className='navbar--middle'>
                    <li>
                        <a className='navbar--middle--element' href='/task'>
                            Tasks
                        </a>
                    </li>
                    <li>
                        <a className='navbar--middle--element' href='/habit'>
                            Habits
                        </a>
                    </li>
                    <li>
                        <a className='navbar--middle--element' href='/note'>
                            Notes
                        </a>
                    </li>
                    <li>
                        <a className='navbar--middle--element' href='/statistics'>
                            Statistics
                        </a>
                    </li>
                </ul>
                */}
                <ul className="navbar--right">
                    <li>
                        <a className="navbar--right--element" href="/home">
                            Home
                        </a>
                    </li>
                    <li>
                        <a className="navbar--right--element" href="/about">
                            About
                        </a>
                    </li>
                    <li>
                        {token ? (
                            <a className="navbar--right--element" href="/profile">
                                Profile
                            </a>
                        ) : (
                            <span
                                tabIndex="0"
                                className="navbar--right--element"
                                onClick={handleLogInClick}
                                onKeyDown={handleLoginEnter}
                                ref={loginButtonRef}
                            >  
                                Log in
                            </span>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;