import { Drawer } from 'vaul';
import { useRef, useState } from 'react';
import "/public/css/vaul.css"
import "/public/css/inputs.css"
import emailjs from 'emailjs-com';

function Input({ children, id, label, type, value, onChange, helpText, placeHolder,isTextArea = false }) {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e) => {
    onChange(e);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div class='global-input-container'>

      <div className={`input-container ${isFocused ? 'focus' : ''}`}>
        {children}
        {label ?? <label htmlFor={id}>{label}</label>}

        {isTextArea ? (
          <textarea
            id={id}
            type={type}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className='input'
            placeholder={placeHolder}
          />
        ) : (
          <input
            className='input'
            placeholder={placeHolder}
            id={id}
            type={type}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        )}
      </div>
      {helpText && <span className="help-text">{helpText}</span>}
    </div>
  );
}







export function OwnerContact({ owner}) {
  console.log(owner)
  const phone_button_ref = useRef(null);
 
  return (
    <>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content id='owner-contact' className="bg-gray-100 flex flex-col rounded-t-[10px] mt-24 h-fit fixed bottom-0 left-0 right-0 outline-none">
          <Drawer.Handle />
          <Drawer.Description>
            * Informacion de contacto del dueno
          </Drawer.Description>
          
          <Drawer.Title className="font-medium mb-4 text-gray-900">{owner.name}</Drawer.Title>

          <button id='phone-button' onClick={()=>{
            phone_button_ref.current.click();
          }}>
            <span class="material-symbols-rounded">
              call
            </span>
            <a href={`tel:${owner.phone_number}`} ref={phone_button_ref}>
            {owner.phone_number}
            </a>
          </button>
          {owner.extra_info.facebook ? (
            <button id='facebook-button'>

            <a  href={owner.extra_info.facebook}  rel="noopener noreferrer"  target="_blank">
                Facebook
            </a>
            </button>
              
          ) :null}
          

          <section id='contact-form'>
            <div>
              <h2>Mensaje directo</h2>
              <button>Enviar</button>
            </div>
            <hr />
            <Input helpText={"this is a hint text to help user"} placeHolder={"Tu nombre"}>
              <span class="material-symbols-rounded">
                person
              </span>
            </Input>
            <Input isTextArea  placeHolder={'Mensaje'}>
              <span class="material-symbols-outlined">
                info
              </span>
            </Input>
          </section>

        </Drawer.Content>
      </Drawer.Portal>
    </>
  );
}