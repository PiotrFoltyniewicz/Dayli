import { useAuth } from '../contexts/AuthContext'
import quotePhoto from '../images/marcusAurelius.png'
import GuestHome from './GuestHome.js'

function Home() {

    const { token } = useAuth();

    return (
        <main>
            {token ?
                <div>
                    {/* LOGGED HOME PAGE */}
                    <h1>Essa</h1>
                </div>
                : <GuestHome/>}
        </main>
    )
}
export default Home;