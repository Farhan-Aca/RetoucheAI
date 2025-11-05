import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Inscription({ setUser }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

async function handleSubmit(e) {
  e.preventDefault();
  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // IMPORTANT: aligner les noms avec le backend
      body: JSON.stringify({ username: username, email, password }),
      credentials: "include", // utile si tu t'appuies sur la session
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      alert(data.message || "Erreur d'inscription");
      return;
    }

    // le backend renvoie { user: { username, email } }
    setUser(data.user?.username || username);
    setTimeout(() => navigate("/", { replace: true }), 0);
  } catch (err) {
    console.error(err);
    alert("Impossible de se connecter au serveur");
  }
}

  return (
    <div className="auth">
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <label>
          username :
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Email :
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit">Créer un compte</button>
      </form>
    </div>
  );
}

export default Inscription;
