import React, { useContext } from "react";
import { Navbar, Nav, Container, Button, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { ThemeContext } from "../context/Theme/context";
import { FavoritesContext } from "../context/Favorites/context";

function Header() {
  const { themeState, themeDispatch } = useContext(ThemeContext);
  const { favoritesState } = useContext(FavoritesContext);

  const toggleTheme = () => {
    themeDispatch({
      type: themeState.theme === "light" ? "DARK" : "LIGHT",
    });
  };

  return (
    <Navbar
      bg={themeState.theme === "light" ? "light" : "dark"}
      variant={themeState.theme === "light" ? "light" : "dark"}
      expand="lg"
      className="shadow-sm mb-4"
    >
      <Container>
        <Navbar.Brand href="/">🎬 MovieApp</Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Acasă</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/about">
              <Nav.Link>Despre</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/favorites">
              <Nav.Link>
                Favorite{" "}
                {favoritesState.favorites.length > 0 && (
                  <Badge bg="primary" pill>
                    {favoritesState.favorites.length}
                  </Badge>
                )}
              </Nav.Link>
            </LinkContainer>
          </Nav>

          <Button
            variant={themeState.theme === "light" ? "dark" : "light"}
            onClick={toggleTheme}
          >
            {themeState.theme === "light" ? "🌙" : "☀️"}
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
