import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
    const { token, logoutToken } = useAuth();
    function handleLogOut() {
        logoutToken();
    }
    function handleTest() {
        console.log(token);
    }
    return <>{ token && <section
        className="yourprofile">
        <button onClick={handleLogOut}>Log out</button>
        <button onClick={handleTest}>Console log token</button>
    </section >}</>
}