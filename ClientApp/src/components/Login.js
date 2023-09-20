import { useState } from "react"
function Login() {
    const [pass, setPass] = useState({ login:"", password:""})
    return (
        <div>
            <input type="text"
                placeholder="Login"
                className="Login--login"
                name="Login"
                value="pass.login"
            />
            <input type="password"
                placeholder="password"
                className="Login--pasword"
                name="Login"
                value="pass.password"
            />
        </div>
    )
}
export default Login;