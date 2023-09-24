import { useState } from "react"

function Login() {
    const [pass, setPass] = useState({ username: "", password: "" })
    function handleChange(event) {
        const { name, value } = event.target
        setPass(prevPass => ({ ...prevPass, [name]: value }))
    }
    async function handleSubmit(event) {
        event.preventDefault()
        const { username, password } = pass
        console.log(username, password)

        const response = await fetch('/api/userlogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        if (response.ok) {
            const data = await response.text(); 
            const jwtToken = data; 
            console.log("JWT Token:", jwtToken);
        } else {
            console.error('Login failed');
        }

    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    className="Login--username"
                    name="username"
                    autoComplete="username"
                    required
                    value={pass.username}
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
                <button type="submit">Log in</button>
            </form>
        </div>
    )
}
export default Login;