import { useAuth } from '../contexts/AuthContext'
function About() {

    return (
        <div className='about'>
        <h1>Creators</h1>
        <ol>
            <li>
                <p>Mateusz Kaźmierczak</p>
                    <ul>
                        {/* Jakieś linki itp itd */}
                        <li>GitHub: <a href=''></a></li>
                    </ul>
            </li>
            <li>
                    <p>Piotr Foltyniewicz</p>
                    <ul>
                        {/* Jakieś linki itp itd */}
                        <li>GitHub: <a href=''></a></li>
                    </ul>
            </li>
        </ol>
    </div>)
}
export default About