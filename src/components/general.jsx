import { useState,useRef,useEffect } from "react";
import ReactMarkdown from 'react-markdown';

function ButtonWithIcon({ children, message, color, onClick }) {
    // children is the icon tag
    const handleClick = () => {
        onClick && onClick();
    }
    return (
        <div className='button-with-icon-container'>
            <button style={{ backgroundColor: color }} onClick={handleClick}>
                {children}
            </button>
            <b>{message}</b>
        </div>
    )
}
function SliderImage({ photos, id, title = 'Slider Images' }) {
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [margin_left, set_margin_left] = useState(0);
    const sensibility = 20;
    useEffect(() => {
        set_margin_left(-(currentPhotoIndex));
    }, [currentPhotoIndex])
    const [startX, setStartX] = useState(null);

    const handlePhotoChange = (index) => {
        setCurrentPhotoIndex(index);
    };

    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX); // Guardar posición inicial del toque
    };

    const handleTouchEnd = (e) => {
        const endX = e.changedTouches[0].clientX; // Obtener la posición final del toque
        if (startX !== null) {
            if (startX - endX > sensibility) {
                nextPhoto(); // Deslizar a la izquierda, ir a la siguiente imagen
            } else if (endX - startX > sensibility) {
                prevPhoto(); // Deslizar a la derecha, ir a la imagen anterior
            }
        }
        setStartX(null); // Resetear el estado del inicio del toque
    };

    const handleMouseDown = (e) => {
        setStartX(e.clientX); // Guardar posición inicial del mouse
    };

    const handleMouseUp = (e) => {
        const endX = e.clientX; // Obtener la posición final del mouse
        if (startX !== null) {
            if (startX - endX >sensibility) {
                nextPhoto(); // Deslizar a la izquierda, ir a la siguiente imagen
            } else if (endX - startX > sensibility) {
                prevPhoto(); // Deslizar a la derecha, ir a la imagen anterior
            }
        }
        setStartX(null); // Resetear el estado del inicio del arrastre
    };

    const nextPhoto = () => {
        setCurrentPhotoIndex((prevIndex) =>
            prevIndex === photos.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevPhoto = () => {
        setCurrentPhotoIndex((prevIndex) =>
            prevIndex === 0 ? photos.length - 1 : prevIndex - 1
        );
    };

    useEffect(() => {}, [currentPhotoIndex]);
    return (
        <>
        <div 
        id={id} 
        className='image-container'
        >
            <div className="drawable"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            >

            </div>
            {photos.length==0 ? (<span>no hay fotos</span>):(

                <img
                className='image-background'
                src={photos[currentPhotoIndex]}
                alt="Pet photo"
                />
            )}
            <div className='images'>
                {photos.length>0?(

                    <img
                    src={photos[currentPhotoIndex]}
                    alt="Pet photo"
                    />
                ):null}
            </div>
            <div className='images-controls'>
                <div className='images-controls--buttons-container'>

                    {photos.map((photo, index) => (
                        <input
                            style={index == 0 ? {
                                marginLeft: `${margin_left*1.28}vh`
                            } : {}}
                            type='radio'
                            key={index + 1 * 2}
                            className='radio-button'
                            checked={index === currentPhotoIndex}
                            onChange={() => handlePhotoChange(index)}
                        />
                    ))}

                </div>
                <b className='images-title'>{title}</b>
            </div>
        </div>
        {photos.length==0 ? (null):(

            <img
            className='image-background global'
            src={photos[currentPhotoIndex]}
            alt="Pet photo"
            />
            )}
        </>
    );
}


function ListItems({ items,withoutShadow=false }) {
    const [openIndex, setOpenIndex] = useState(null); // State to track which item is open

    const toggleItem = (index) => {
        setOpenIndex(openIndex === index ? null : index); // Toggle the open item
    };

    return (
        <ul className={`list-elements ${withoutShadow?"without-shadow":''}`} key={108823}>
            {items.map((item, index) => (
                <>
                    <li key={index} className='list-item' onClick={() => toggleItem(index)} style={{ cursor: 'pointer' }}>
                        {item.title}

                        {item.children && (
                            <button className='view-button' key={index + 1 * 3}>{openIndex === index ? 'Ocultar' : 'Ver'}

                             </button>
                        )}

                    </li>
                    {index < items.length - 1 && <hr key={index + 1 * 5} />}
                    {openIndex === index && item.children && ( // Show children if the item is open

                        <ReactMarkdown className='list-item children-info' key={index + 1 * 4} >{item.children}</ReactMarkdown>

                    )}
                </>
            ))}
        </ul>
    );
}
const SocialShareButtons = ({ url, title ,hidden}) => {
    const encodedURL = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
  
    const shareLinks = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedURL}&text=${encodedTitle}`,
      linkedin: `https://www.linkedin.com/shareArticle?url=${encodedURL}&title=${encodedTitle}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle} ${encodedURL}`,
    };
  
    return (
      <div className={`social-share-buttons ${hidden==true?"hidden":""}`}>
        <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer">
          Share on Facebook
        </a>
        <hr />
        <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer">
          Share on Twitter
        </a>
        <hr />
        <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer">
          Share on LinkedIn
        </a>
        <hr />
        <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer">
          Share on WhatsApp
        </a>
      </div>
    );
  };
export {
    ButtonWithIcon,
    SliderImage,
    ListItems,
    SocialShareButtons
}