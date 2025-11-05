import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Connexion({ setUser }) {
  const [identifiant, setIdentifiant] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // Ici tu pourrais vérifier via ton API
    setUser(identifiant);
    navigate("/"); // Retour à la page d'accueil
  }

  return (
    <div className="auth">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Identifiant :
          <input
            type="text"
            value={identifiant}
            onChange={(e) => setIdentifiant(e.target.value)}
            required
          />
        </label>
        <label>
          Mot de passe :
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default Connexion;
