import React, { useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { FavoritesContext } from "../context/Favorites/context";
import Layout from "../components/Layout";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

// import hook
import { useFetch } from "../utils/useFetch";

function MovieDetails() {
  const { id } = useParams();
  const movieId = Number(id);

  const { favoritesState, favoritesDispatch } = useContext(FavoritesContext);

  // --- API URLs ---
  const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=b43cba9094fc86343f96b7ffad2f0c7f`;
  const trailerUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=b43cba9094fc86343f96b7ffad2f0c7f`;
  const recommendationsUrl = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=b43cba9094fc86343f96b7ffad2f0c7f`;

  // --- useFetch ---
  const { data: movie, isLoading: loadingMovie } = useFetch(movieUrl);
  const { data: trailerData } = useFetch(trailerUrl);
  const { data: recommendationsData } = useFetch(recommendationsUrl);

  const [showTrailer, setShowTrailer] = useState(false);

  if (loadingMovie) return <Layout>Se încarcă...</Layout>;

  if (!movie) return <Layout>Nu am găsit filmul.</Layout>;

  const isFavorite = favoritesState.favorites.some((f) => f.id === movieId);

  const toggleFavorite = () => {
    if (isFavorite) {
      favoritesDispatch({ type: "REMOVE_FAVORITE", payload: movieId });
    } else {
      favoritesDispatch({
        type: "ADD_FAVORITE",
        payload: { id: movieId, title: movie.title },
      });
    }
  };

  // --- Trailer key ---
  let trailerKey = null;
  if (trailerData?.results) {
    const trailer =
      trailerData.results.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      ) || trailerData.results.find((v) => v.site === "YouTube");

    if (trailer) trailerKey = trailer.key;
  }

  const recommendations = recommendationsData?.results || [];

  return (
    <Layout>
      <Container>
        <h1 className="mb-4">{movie.title}</h1>

        <Row>
          {/* POSTER */}
          <Col md={4}>
            <img
              className="img-fluid rounded shadow"
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                  : "https://via.placeholder.com/300x450"
              }
              alt={movie.title}
            />
          </Col>

          {/* DETAILS */}
          <Col md={8}>
            <p className="lead">{movie.overview}</p>

            <div className="d-flex gap-3 mt-3">
              <Button variant="primary" onClick={toggleFavorite}>
                {isFavorite ? "Remove favorite" : "Add to favorite"}
              </Button>

              {trailerKey && (
                <>
                  {!showTrailer ? (
                    <Button
                      variant="danger"
                      onClick={() => setShowTrailer(true)}
                    >
                      ▶ Watch Trailer
                    </Button>
                  ) : (
                    <Button
                      variant="secondary"
                      onClick={() => setShowTrailer(false)}
                    >
                      ✖ Hide Trailer
                    </Button>
                  )}
                </>
              )}
            </div>

            {/* TRAILER */}
            {trailerKey && showTrailer && (
              <div className="mt-4">
                <h4>Trailer</h4>
                <div className="ratio ratio-16x9">
                  <iframe
                    src={`https://www.youtube.com/embed/${trailerKey}`}
                    title="Trailer"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </Col>
        </Row>

        {/* RECOMMENDATIONS */}
        <div className="mt-5">
          <h3>Recomandări</h3>

          <Row className="mt-3">
            {recommendations.slice(0, 10).map((rec) => (
              <Col key={rec.id} xs={6} sm={4} md={3} lg={2} className="mb-4">
                <Link
                  to={`/movie/${rec.id}`}
                  className="text-decoration-none text-dark"
                >
                  <img
                    src={
                      rec.poster_path
                        ? `https://image.tmdb.org/t/p/w200${rec.poster_path}`
                        : "https://via.placeholder.com/100x150"
                    }
                    alt={rec.title}
                    className="img-fluid rounded shadow-sm"
                  />
                  <p className="small text-center mt-1">{rec.title}</p>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </Layout>
  );
}

export default MovieDetails;
