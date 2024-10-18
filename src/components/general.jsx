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
    const handlePhotoChange = (index) => {
        setCurrentPhotoIndex(index);
    };
    useEffect(() => {
        set_margin_left(-(currentPhotoIndex));
    }, [currentPhotoIndex])
    return (
        <div id={id} className='image-container'>
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
                                marginLeft: `${margin_left}vh`
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
        <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer">
          Share on Twitter
        </a>
        <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer">
          Share on LinkedIn
        </a>
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