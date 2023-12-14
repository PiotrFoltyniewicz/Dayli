import { useAuth } from '../contexts/AuthContext'
import GuestHome from './GuestHome.js'
import LoggedHome from './LoggedHome.js'

function Home() {

    const { token } = useAuth();

    return (
        <main>
            {token ?
                  <LoggedHome />
                : <GuestHome />}
        </main>
    )
}
export default Home;