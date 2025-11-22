import React, { useReducer } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./style.css";

import Header from "./components/Header";

import { Home } from "./pages/Home";
import { About } from "./pages/About";
import MovieDetails from "./pages/MovieDetails";

import { FavoritesContext } from "./context/Favorites/context";
import {
  favoritesReducer,
  initialFavoritesState,
} from "./context/Favorites/reducer";
import FavoritesPage from "./pages/FavoritesPage";

import { ThemeContext } from "./context/Theme/context";
import { themeReducer, initialState } from "./context/Theme/reducer";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <main>
          <Home />
        </main>
      </>
    ),
  },
  {
    path: "/about",
    element: (
      <>
        <Header />
        <main>
          <About />
        </main>
      </>
    ),
  },
  {
    path: "/movie/:id",
    element: (
      <>
        <Header />
        <main>
          <MovieDetails />
        </main>
      </>
    ),
  },
  {
    path: "/favorites",
    element: (
      <>
        <Header />
        <main>
          <FavoritesPage />
        </main>
      </>
    ),
  },
]);

function App() {
  const [favoritesState, favoritesDispatch] = useReducer(
    favoritesReducer,
    initialFavoritesState
  );
  const [themeState, themeDispatch] = useReducer(themeReducer, initialState);

  const favoritesContextValue = { favoritesState, favoritesDispatch };
  const themeContextValue = { themeState, themeDispatch };

  return (
    <FavoritesContext.Provider value={favoritesContextValue}>
      <ThemeContext.Provider value={themeContextValue}>
        <div className={themeState.theme === "dark" ? "app dark" : "app light"}>
          <RouterProvider router={router} />
        </div>
      </ThemeContext.Provider>
    </FavoritesContext.Provider>
  );
}
export default App;
