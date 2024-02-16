import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
    const { token, logoutToken } = useAuth();
    function handleLogOut() {
        logoutToken();
    }
    return <>{ token && <section
        className="yourprofile">
        <button onClick={handleLogOut}>Log out</button>
    </section >}</>
}