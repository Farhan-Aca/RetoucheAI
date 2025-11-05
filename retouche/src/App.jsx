import { useState,useRef } from 'react';
import './App.css';
import Connexion from "./pages/connexion.jsx";
import Inscription from "./pages/inscription.jsx";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";



function App() {
  // etat
  const[imageUrl,setImageUrl]= useState(null);
  const [resultat,setResultat] = useState(null);
  const [fichier, setFichier] = useState(null);
  const [user, setUser] = useState(null);

  const inputRef=useRef(null) 

  

function envoyer() {

  if (!fichier) return;
  const formData = new FormData();
  formData.append('file', fichier);


  fetch('http://51.21.197.186:8000/predict', {
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

      <BrowserRouter>
      <header className="header">
        <nav>
          {user ? (
            <span>Bienvenue, {user}</span>
          ) : (
            <>
              <Link to="/inscription">Inscription</Link> |{" "}
              <Link to="/connexion">Connexion</Link>
            </>
          )}
        </nav>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <div className="container">
              <h1 className="titre">Retouche d'image</h1>
              <div className="blocgauche">
                <input
                  ref={inputRef}
                  id="imageInput"
                  type="file"
                  accept="image/*"
                  onChange={recup}
                />
                <label htmlFor="imageInput" className="styled">
                  Ajouter une image
                </label>
                {imageUrl && <img src={imageUrl} alt="aperçu" />}
                <button onClick={dele}>Supprimer l'image</button>
              </div>

              <div className="blocdroit">
                <button onClick={envoyer}>Résultat</button>
                {resultat && <img src={resultat} alt="aperçu" />}
              </div>
            </div>
          }
        />

        <Route
          path="/inscription"
          element={<Inscription setUser={setUser} />}
        />
        <Route
          path="/connexion"
          element={<Connexion setUser={setUser} />}
        />
      </Routes>
    </BrowserRouter>  
  );
}

export default App
