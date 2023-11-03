import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useAuth } from "../contexts/AuthContext";

function Login(props) {
    const [formMethod, setFormMethod] = useState(0);
    const { token } = useAuth();

    const handleMethodClick = (method) => {
        setFormMethod(method);
    };
    const handleEscape = () => {
        props.setLogPopUp(false);
    }


    const isAuthenticated = !!token;
    useEffect(() => {
        if (isAuthenticated) {
            props.setLogPopUp(false);
        }
    }, [isAuthenticated, props]);

    return (
        <div className="profile" id="profile">
            <div className="login--box">
                <div className="login--title">
                    <h1>BetterDay</h1>
                    <button onClick={handleEscape }>X</button>
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
    );
}

export default Login;