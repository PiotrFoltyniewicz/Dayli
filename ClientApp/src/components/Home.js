import { useAuth } from '../contexts/AuthContext'
import quotePhoto from '../images/marcusAurelius.png'
import GuestHome from './GuestHome.js'
import Tasks from './Tasks'
function Home(props) {

    const { token } = useAuth();

    return (
        <main>
            {token ?
                <div>
                    {/* LOGGED HOME PAGE */}
                    <Tasks/>
                </div>
                : <GuestHome setLogPopUp={props.setLogPopUp} />}
        </main>
    )
}
export default Home;