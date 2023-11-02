import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useAuth } from "../contexts/AuthContext";

function Login(props) {
    const [formMethod, setFormMethod] = useState(0);

    const handleMethodClick = (method) => {
        setFormMethod(method);
    };
    const { token } = useAuth();

    const isAuthenticated = !!token;
    useEffect(() => {
        if (isAuthenticated) {
            props.setLogPopUp(false);
        }
    }, [isAuthenticated,props]);

    return (
        <div className="profile" id="profile">
            <div className="login--box">
                <h1>BetterDay</h1>
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