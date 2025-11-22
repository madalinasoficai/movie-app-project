import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);

  const [trending, setTrending] = useState([]); // ⭐ Tendințe

  // 🔥 Fetch trending movies la încărcarea paginii
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/trending/movie/day?api_key=b43cba9094fc86343f96b7ffad2f0c7f"
    )
      .then((res) => res.json())
      .then((data) => setTrending(data.results || []))
      .catch((err) => console.error("Eroare trending:", err));
  }, []);

  // 🔎 Search filme
  const search = () => {
    if (!query) return;

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=b43cba9094fc86343f96b7ffad2f0c7f&query=${encodeURIComponent(
        query
      )}&page=${page}`
    )
      .then((response) => response.json())
      .then((data) => {
        setResults(data.results || []);
      })
      .catch((error) => console.error("Eroare la API:", error));
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-center">Căutare filme 🎬</h1>

      {/* SEARCH BAR */}
      <div className="input-group mb-4 shadow-sm">
        <span className="input-group-text">🔍</span>
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="form-control"
          placeholder="Caută filme..."
        />
        <button className="btn btn-primary" onClick={search}>
          Caută
        </button>
      </div>

      {/* RESULTS */}
      <h2 className="section-title">Rezultate</h2>

      <div className="row row-cols-2 row-cols-md-4 g-4">
        {results.map((movie) => (
          <div key={movie.id} className="col-6 col-md-3">
            <div className="card h-100 shadow-sm">
              <Link to={`/movie/${movie.id}`} className="text-decoration-none">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                      : "https://via.placeholder.com/300x450"
                  }
                  className="card-img-top"
                  alt={movie.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      {results.length > 0 && (
        <div className="d-flex justify-content-center my-4">
          <button
            className="btn btn-outline-primary me-2"
            disabled={page === 1}
            onClick={() => {
              setPage(page - 1);
              search();
            }}
          >
            ⬅️ Înapoi
          </button>

          <button
            className="btn btn-outline-primary"
            onClick={() => {
              setPage(page + 1);
              search();
            }}
          >
            Înainte ➡️
          </button>
        </div>
      )}

      {/* ⭐ TRENDING SECTION */}
      {trending.length > 0 && (
        <>
          <h2 className="section-title mt-5">Tendințe azi 🔥</h2>

          <div className="row row-cols-2 row-cols-md-4 g-4">
            {trending.map((movie) => (
              <div key={movie.id} className="col-6 col-md-3">
                <div className="card h-100 shadow-sm">
                  <Link
                    to={`/movie/${movie.id}`}
                    className="text-decoration-none"
                  >
                    <img
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                          : "https://via.placeholder.com/300x450"
                      }
                      className="card-img-top"
                      alt={movie.title}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{movie.title}</h5>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
