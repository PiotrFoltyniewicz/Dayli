import { useState } from "react"
function Login() {
    const [pass, setPass] = useState({ username: "", password: "" })
    function handleChange(event) {
        const { name, value } = event.target
        setPass(prevPass => ({ ...prevPass, [name]: value }))
    }
    function handleSubmit(event) {
        event.preventDefault()
        const { user, password } = pass
        console.log(user, password)
    }
    return (
        <div>
            <form>
                <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    className="Login--username"
                    name="username"
                    autoComplete="username"
                    required
                    value={pass.login}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    id="password"
                    placeholder="password"
                    className="Login--password"
                    name="password"
                    autoComplete="current-password"
                    required
                    value={pass.password}
                    onChange={handleChange}
                />
                <input
                    type="submit"
                    onSubmit={handleSubmit}
                />
            </form>
        </div>
    )
}
export default Login;