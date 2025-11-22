import React, { useContext } from "react";
import { FavoritesContext } from "../context/Favorites/context";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

function FavoritesPage() {
  const { favoritesState, favoritesDispatch } = useContext(FavoritesContext);

  const removeFavorite = (id) => {
    favoritesDispatch({ type: "REMOVE_FAVORITE", payload: id });
  };

  return (
    <Layout>
      <Container>
        <h1 className="mb-4">Filme Favorite</h1>

        {favoritesState.favorites.length === 0 ? (
          <p>Nu ai adăugat încă filme la favorite.</p>
        ) : (
          <ul className="list-group">
            {favoritesState.favorites.map((movie) => (
              <li
                key={movie.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <Link
                  to={`/movie/${movie.id}`}
                  className="text-decoration-none"
                >
                  {movie.title}
                </Link>

                <Button
                  variant="danger"
                  onClick={() => removeFavorite(movie.id)}
                >
                  Șterge
                </Button>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </Layout>
  );
}

export default FavoritesPage;
