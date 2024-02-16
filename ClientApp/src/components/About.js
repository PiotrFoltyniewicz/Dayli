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
                        <li>GitHub: <a target='_blank' rel='noreferrer' href='https://github.com/mateuszkazmierczak'>https://github.com/mateuszkazmierczak</a></li>
                    </ul>
            </li>
            <li>
                    <p>Piotr Foltyniewicz</p>
                    <ul>
                        {/* Jakieś linki itp itd */}
                        <li>GitHub: <a target='_blank' rel='noreferrer' href='https://github.com/PiotrFoltyniewicz'>https://github.com/PiotrFoltyniewicz</a></li>
                        <li>LinkedIn: <a target='_blank' rel='noreferrer' href='https://www.linkedin.com/in/piotr-foltyniewicz-922919242/'>https://www.linkedin.com/in/piotr-foltyniewicz-922919242/</a></li>
                    </ul>
            </li>
        </ol>
    </div>)
}
export default About