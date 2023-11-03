import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { registerMethod } from "./authUtils"

function RegisterForm() {
    const [pass, setPass] = useState({ username: "", password: "", passwordConfirm: "" });
    const { loginToken } = useAuth();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPass((prevPass) => ({ ...prevPass, [name]: value }));
    };

    async function handleSubmit(event) {
        event.preventDefault()
        const { username, password, passwordConfirm } = pass
        if (passwordConfirm !== password) {
            alert("Passwords don't match")
            return;
        }
        console.log(username, password)
        registerMethod(username, password, loginToken, setPass)
    };

    return (
        <form className="login--form" onSubmit={handleSubmit}>
            <div className="inputWrapper">
                <div>
                    <input
                        type="text"
                        id="username"
                        className="Login--username login--input"
                        name="username"
                        autoComplete="username"
                        required
                        value={pass.username}
                        onChange={handleChange}
                    />
                    <label htmlFor="username" className="username--label login--label">
                        Username
                    </label>
                </div>
                <div>
                    <input
                        type="password"
                        id="password"
                        className="Login--password login--input"
                        name="password"
                        autoComplete="new-password"
                        required
                        value={pass.password}
                        onChange={handleChange}
                    />
                    <label htmlFor="password" className="password--label login--label">
                        Password
                    </label>
                    <div>
                        <input
                            type="password"
                            id="password2"
                            className="Login--password login--input"
                            name="passwordConfirm"
                            autoComplete="new-password"
                            required
                            value={pass.passwordConfirm}
                            onChange={handleChange}
                        />
                        <label htmlFor="password2" className="password--label login--label">
                            Confirm Password
                        </label>
                    </div>
                </div>
            </div>
            <button type="submit" className="login--submit">
                Register
            </button>
        </form>
    );
}
                                                                
export default RegisterForm;