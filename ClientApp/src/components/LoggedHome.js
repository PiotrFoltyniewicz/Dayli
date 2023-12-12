import quotePhoto from '../images/marcusAurelius.png'

function LoggedHome() {

    return (
        <div className='home--content' >
            <img src={quotePhoto} width='200px' />
            <div className='randomQuote'>
                <q>Look well into thyself; there is a source of strength which will always spring up if thou wilt always look.</q> - Marcus Aurelius
            </div>
            { /* Jakieś brane nazwy uzytkownika */}
            <h1>Welcome user</h1>
        </div>
    )
}
export default LoggedHome;
