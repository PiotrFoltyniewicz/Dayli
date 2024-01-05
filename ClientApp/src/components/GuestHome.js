import quotePhoto from '../images/marcusAurelius.png'

function GuestHome(props) {

    function handleClick(event) {
        props.setLogPopUp(prev => !prev)
    }

    return (
        <div className='home--content' >
            <img src={quotePhoto} width='200px' />
            <div className='randomQuote'>
                <q>Look well into thyself; there is a source of strength which will always spring up if thou wilt always look.</q> - Marcus Aurelius
            </div>
            <h1>Boost your productivity with Dayli</h1>
            <button onClick={handleClick }>Join for free!</button>
            <h2>Plan your life</h2>
            <img src='.' width='200px'/>
            <h2>Take action</h2>
            <img src='.' width='200px'/>
            <h2>Analyze yourself</h2>
            <img src='.' width='200px' />
            {/* Dawaj tu ten login popup jak sie kliknie */}
            
        </div>
    )
}
export default GuestHome;
