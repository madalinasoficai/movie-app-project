import Container from "react-bootstrap/Container";

export default function Layout({ children }) {
  return <Container className="py-4">{children}</Container>;
}
