import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useAuth } from "../contexts/AuthContext";

function Login() {
    const [formMethod, setFormMethod] = useState(0);
    const { token, isLoginFormVisible, toggleLoginForm } = useAuth();

    const handleMethodClick = (method) => {
        setFormMethod(method);
    };

    const isAuthenticated = !!token;

    useEffect(() => {
        if (isLoginFormVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        if (isAuthenticated && isLoginFormVisible) {
            toggleLoginForm();
        }
    }, [isAuthenticated, toggleLoginForm, isLoginFormVisible]);

    if (!isLoginFormVisible || isAuthenticated) {
        return null;
    }

    return (
        <>
            {isLoginFormVisible && <div className="login--overlay"></div>}
            <div className="profile" id="profile">
                <div className="login--box">
                    <div className="login--title">
                        <h1>BetterDay</h1>
                        <button onClick={toggleLoginForm}>X</button>
                    </div>
                    <div className="login--formMethod">
                        <button
                            type="button"
                            className={formMethod === 0 ? "login--activeMethod" : ""}
                            onClick={() => handleMethodClick(0)}
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            className={formMethod === 1 ? "login--activeMethod" : ""}
                            onClick={() => handleMethodClick(1)}
                        >
                            New Account
                        </button>
                    </div>
                    {formMethod === 0 ? <LoginForm /> : <RegisterForm />}
                </div>
            </div>
        </>
    );
}

export default Login;