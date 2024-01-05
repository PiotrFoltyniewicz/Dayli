import { useState } from 'react'
function ImageGallery(props) {
    const images = props.images.map(x => (
        <div className='imageGallery--object'>
            <p>{x.text}</p>
            <img src={x.url}/>
        </div>))
    const [currentIndex, setCurrentIndex] = useState(0)

    function NextImage() {
        if (currentIndex + 1 >= images.length) {
            setCurrentIndex((prev) => 0)
        } else {
            setCurrentIndex((prev) => ++prev)
        }
    }

    function PrevImage() {
        if (currentIndex - 1 < 0) {
            setCurrentIndex((prev) => images.length - 1)
        } else {
            setCurrentIndex((prev) => --prev)
        }
    }

    return (
        <div className='imageGallery'>
            {images[currentIndex]}
            <div className='imageGallery--buttons'>
                <button onClick={PrevImage}>{'<'}</button>
                <button onClick={NextImage}>{'>'}</button>
            </div>
        </div>
    );
}
export default ImageGallery;