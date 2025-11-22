import React from "react";
import { Link } from "react-router-dom";

export function About() {
  return (
    <div className="container py-5">
      <div className="card shadow-sm p-4 border-0">
        <h1 className="text-center mb-4">Despre acest proiect</h1>

        <p className="lead text-muted">
          Această aplicație a fost creată pentru a explora concepte esențiale
          din React într-un mod practic și organizat. Scopul ei este să
          demonstreze:
        </p>

        <ul className="list-group list-group-flush mb-4">
          <li className="list-group-item">✔ Routare și pagini dinamice</li>
          <li className="list-group-item">✔ Apelarea unui API real (TMDB)</li>
          <li className="list-group-item">
            ✔ Management de stare cu useReducer
          </li>
          <li className="list-group-item">
            ✔ Context API pentru teme și favorite
          </li>
          <li className="list-group-item">✔ Componente react structurate</li>
        </ul>

        <div className="text-center mt-4">
          <Link to="/" className="btn btn-primary px-4">
            ⬅ Înapoi la pagina principală
          </Link>
        </div>
      </div>
    </div>
  );
}
