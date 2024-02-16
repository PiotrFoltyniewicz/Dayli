export async function loginMethod(username, password, loginToken, setPass) {
    const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
        const data = await response.text();
        const jwtToken = data;
        loginToken(jwtToken);
        setPass({ username: "", password: "" });
    } else {
        console.error('Login failed');
    }
}

export async function registerMethod(username, password, loginToken, setPass) {
    const response = await fetch('/api/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password})
    } )
    if (response.ok) {
        const data = await response.text();
        const { statusCode, message } = JSON.parse(data)
        if (statusCode === 201) {
            loginMethod(username, password, loginToken, setPass)
            setPass({ username: "", password: "", passwordConfirm: "" });
        }
        else {
            alert(message)
        }
    } else {
        console.error('register failed');
    }
}
