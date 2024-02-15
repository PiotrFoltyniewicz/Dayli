import ImageGallery from './ImageGallery';
import QuoteBlock from './QuoteBlock.js';
import { useAuth } from '../contexts/AuthContext'
function GuestHome() {
    const { toggleLoginForm } = useAuth()
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

    function handleClick() {
        toggleLoginForm()
    }
    return (
        <div className='home--content' >
            <QuoteBlock />
            <h1>Boost your productivity with Dayli</h1>
            <button onClick={handleClick}>Join for free!</button>
            <ImageGallery images={testImages} />
            {/* Dawaj tu ten login popup jak sie kliknie */}

        </div>
    )
}
export default GuestHome;
