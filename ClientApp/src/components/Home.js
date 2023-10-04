import { useAuth } from "../contexts/AuthContext"

function Home() {

    const { token } = useAuth();

    return (
        <main>
            {token ?
                <div>
                    <h1>Essa</h1>
                </div>
                : <h1>Please Log in</h1>}
        </main>
    )
}
export default Home;