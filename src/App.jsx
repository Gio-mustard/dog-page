'use client';
import { useEffect, useRef, useState } from 'react'
import "/public/css/home.css"
import "/public/css/vaul.css"
import { Drawer } from 'vaul';
import { OwnerContact } from './components/owner_contact';
import { ButtonWithIcon } from './components/general.jsx';
import { ListItems } from './components/general.jsx';
import { SliderImage } from './components/general.jsx';
import { SocialShareButtons } from './components/general.jsx';

const pet_test = {
  photos: ["https://picsum.photos/400/300", "https://picsum.photos/400/200", "https://picsum.photos/400/100", "https://picsum.photos/300/100"],
  properties:[],
  name: 'Mayoneso'
}


const owner_test = {
  name: 'Sergio Morquecho',
  phone_number: '+52 686-602-4822',
  extra:null,
  email:'XXXXXXXXXXXXXXXXXXXXXXXXXX'
}

function Owner(name,phone_number,extra_info){
  this.name = name;
  this.phone_number = phone_number
  this.extra_info = extra_info
  console.log(extra_info)
}
function Pet(name, photosUrl,properties){
  this.name = name;
  this.photos = photosUrl;
  this.properties = properties
}


async function getDataFromJsonFile(filepath) {
  const response = await fetch(filepath);
  const data = await response.json();
  
  return data;
}


const path_info = "/public/info.json"


function App() {
  const contact_owner_button_ref = useRef(null);
  const [pet,setPet] = useState(new Pet(pet_test.name,pet_test.photos,pet_test.properties));
  const [owner,setOwner] = useState(new Owner(owner_test.name,owner_test.phone_number,{}));
  const [hidden_shared_buttons,set_hidden_shared_buttons] = useState(true);
  useEffect(()=>{
    const handleReaddata = async () => {
    const data = await getDataFromJsonFile(path_info);
    setPet(new Pet(data.pet.name, data.pet.photos, data.pet.properties));
    const ownerProps = Object.assign({}, data.owner);
    delete ownerProps.name;
    delete ownerProps.phone_number;
    setOwner(new Owner(data.owner.name, data.owner.phone_number, ownerProps));
    }
    handleReaddata();
  },[])
  useEffect(()=>{
  
  },[])
  return (
    <Drawer.Root >
      <SocialShareButtons
          url={'facebook.com'}
          title={'test page'}
          hidden={hidden_shared_buttons}
          />
      <section className='section horizontal' >
        <SliderImage photos={pet.photos} title="Sus fotos" />
        <div className='main-message'>
          <h3>
            Perdido !
          </h3>
          <div className='message important'>
            <p>
              <b>
                Si estas leyendo esto mi mascota {pet.name} esta perdido.
              </b>
            </p>
            <p>
              ayudame a encontrar a {pet.name} lo extrano.
            </p>
            <Drawer.Trigger ref={contact_owner_button_ref}>
              Contactame
            </Drawer.Trigger>

          </div>
        </div>
      </section>

      <section className='section'>
        <h2>Sobre {pet.name}</h2>
        <ListItems items={pet.properties} />
      </section>
      <section className="section">
        <h2>Ayudas</h2>
        <hr />
        <ButtonWithIcon message="Compartir esta pagina a tus amigos" onClick={()=>{set_hidden_shared_buttons(!hidden_shared_buttons)}}>

          <span className="material-symbols-outlined">
            share
          </span>

        </ButtonWithIcon>
        <ButtonWithIcon message="Mira mi informacion"
          onClick={() => {
            contact_owner_button_ref.current.click();
          }}
        >
          <span className="material-symbols-outlined">
            info
          </span>

        </ButtonWithIcon>
      </section>
      <OwnerContact owner={owner} />
    </Drawer.Root>
  )
}

export default App
