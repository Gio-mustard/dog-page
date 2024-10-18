import { Drawer } from 'vaul';
import { useEffect, useInsertionEffect, useRef, useState } from 'react';
import "/public/css/vaul.css"
import "/public/css/inputs.css"
import emailjs from 'emailjs-com';
import { Modal } from './modal';
import { ListItems } from './general';

function Input({ children, id, label, type, value, onChange, helpText, placeHolder,name,isTextArea = false }) {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e) => {
    // onChange??onChange(e);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className='global-input-container'>

      <div className={`input-container ${isFocused ? 'focus' : ''}`}>
        {children}
        {label ?? <label htmlFor={id}>{label}</label>}

        {isTextArea ? (
          <textarea
          name={name}
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
          name={name}
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

const service_id = "service_he2b4p7"
const template_id = "template_rxxb8cr"
const user_id = "Pl_uMVkv0aIsadz4b"


const sendEmail = async (e,form) => {
  e.preventDefault();

  const response = await emailjs.sendForm(service_id, template_id, form,user_id)
    .then((result) => {
      return result
    }, (error) => {
    return error;
    
    });
    console.log(response)
if (response.status === 200) {
  return [false,"Email sent successfully!"];
  
} else {
  console.log(response);
  return [true,`Error on send email`];
}
    
};

export function OwnerContact({owner,onEmailSender}) {
  const phone_button_ref = useRef(null);
  const form_ref = useRef(null);
  
  return (
    <>

      <Drawer.Portal>
        {/*  : No es necesario estos class name si no estamos usando tailwind */}
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content id='owner-contact' className="bg-gray-100 flex flex-col rounded-t-[10px] mt-24 h-fit fixed bottom-0 left-0 right-0 outline-none">
          <Drawer.Handle />
          <Drawer.Description>
            * Informacion de contacto del owner de {owner.pet.name}
          </Drawer.Description>
          
          <Drawer.Title className="font-medium mb-4 text-gray-900">{owner.name}</Drawer.Title>

          <button id='phone-button' onClick={()=>{
            phone_button_ref.current.click();
          }}>
            <span className="material-symbols-rounded">
              call
            </span>
            <a href={`tel:${owner.phone_number}`} ref={phone_button_ref}>
            {owner.phone_number}
            </a>
          </button>
          {owner.facebook !== null ? (
            <button id='facebook-button'>
            <a  href={owner.facebook}  rel="noopener noreferrer"  target="_blank">
                Facebook
            </a>
        </button>
          ):"uwu"}
          

          <form ref={form_ref} onSubmit={async(e)=>{
            const [has_error,message] = await sendEmail(e,form_ref.current);
            const data_to_sender = {
              title:has_error?"Error al enviar el mensaje":"Mensaje enviado",
              message:message,
              type:has_error?"error":"success"
            }
            onEmailSender(
              data_to_sender
            )
            
            }} id='contact-form'>
            <div>
              <h2>Mensaje directo</h2>
              <button className='small'>Enviar</button>
            </div>
            <hr />
            <input type="hidden" name='owner_email' value={owner.email}/>
            <input type="hidden" name='pet_name' value={owner.pet.name}/>
            <Input helpText={"Escribe tu nombre para que sea facil para el dueno identificarte"} placeHolder={"Tu nombre"} name={"finder_name"}>
              <span className="material-symbols-rounded">
                person
              </span>
            </Input>
            <Input isTextArea  placeHolder={'Mensaje'} name="finder_message">
              <span className="material-symbols-outlined">
                info
              </span>
            </Input>
          </form>
          <hr />
          <ListItems withoutShadow items={owner.extra_info}/>
        </Drawer.Content>
      </Drawer.Portal>
    </>
  );
}