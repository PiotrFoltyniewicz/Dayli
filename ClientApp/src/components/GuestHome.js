import ImageGallery from './ImageGallery';
import QuoteBlock from './QuoteBlock.js';

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
            <QuoteBlock />
            <h1>Boost your productivity with Dayli</h1>
            <button>Join for free!</button>
            <ImageGallery images={ testImages } />
            {/* Dawaj tu ten login popup jak sie kliknie */}
            
        </div>
    )
}
export default GuestHome;
