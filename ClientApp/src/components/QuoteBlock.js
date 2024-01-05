import quotePhoto from '../images/marcusAurelius.png'
function QuoteBlock(props) {
    return (
        <div className='quoteBlock'>
            <img src={quotePhoto}/>
            <q>Look well into thyself; there is a source of strength which will always spring up if thou wilt always look.</q> - Marcus Aurelius
        </div>
    );
}

export default QuoteBlock;