import quotePhoto from '../images/marcusAurelius.png'
import ImageGallery from './ImageGallery';

function GuestHome() {
    const testImages = [
        {
            text: 'Plan your life',
            url: '/images/testImg.jpg'
        },
        {
            text: 'Take action',
            url: '/images/testImg1.jpg'
        },
        {
            text: 'Analyze yourself',
            url: '/images/testImg2.jpg'
        }
    ];

    return (
        <div className='home--content' >
            <img src={quotePhoto} width='200px' />
            <div className='randomQuote'>
                <q>Look well into thyself; there is a source of strength which will always spring up if thou wilt always look.</q> - Marcus Aurelius
            </div>
            <h1>Boost your productivity with Dayli</h1>
            <button>Join for free!</button>
            <ImageGallery images={ testImages } />
            {/* Dawaj tu ten login popup jak sie kliknie */}
            
        </div>
    )
}
export default GuestHome;
