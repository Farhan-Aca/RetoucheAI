import { useState,useRef } from 'react'
import './App.css'


function App() {
  // etat
  const[imageUrl,setImageUrl]= useState(null);
  const [resultat,setResultat] = useState(null);
  const [fichier, setFichier] = useState(null);

  const inputRef=useRef(null) 

  

function envoyer() {

  if (!fichier) return;
  const formData = new FormData();
  formData.append('file', fichier);


  fetch('http://localhost:8000/predict', {
    method: 'POST',
    body: formData,
  })
    .then(response => response.blob())            //  lire la réponse comme un fichier
    .then(blob => {
      const imageUrl = URL.createObjectURL(blob); //  créer une URL locale
      setResultat(imageUrl);                      //  mettre dans ton state
      console.log('Image reçue du serveur ✅');
    });
};  


  function recup (evt){
    const f = evt.target.files[0];
    setFichier(f);
    setImageUrl(URL.createObjectURL(f));
  };

  function dele () {

  setImageUrl(null);
  inputRef.current.value = '';
  };
  
  return (

    <div>

      <h1 className='titre'>Retouche d'image</h1>
      
        <div className="blocgauche">
          <input ref={inputRef} id="imageInput"  type="file" accept="image/*" onChange={recup} />
          <label htmlFor="imageInput" className="styled">Ajouter une image</label>
          {imageUrl && <img src={imageUrl} alt="aperçu" />}

          <input type="button" value= "supprimer l'image" onClick={dele} />
        </div>

        <div className="blocdroit">

          <input type="button" value= "Resultat" onClick={envoyer} />
          {resultat && <img src={resultat} alt="aperçu" />}
        </div>
      </div>  
  );
}

export default App
