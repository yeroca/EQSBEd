// import ImportDialog from './components/ImportDialog'
// ParentComponent.js

import { Container, Nav, Navbar } from "react-bootstrap";

// React router stuff
import { Route, Routes } from "react-router-dom";

// import other pages
import Home from "./pages/Home";
import Privacy from "./pages/Privacy";
import Usage from "./pages/Usage";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <>
      <Container fluid className="p-3">
        <Navbar expand="lg" className="bg-body-tertiary">
          <Navbar.Brand href="/">Sock Drawer</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/usage">
              Usage and known issues
            </Nav.Link>
            <Nav.Link as={Link} to="/privacy">
              Privacy and secuity
            </Nav.Link>
          </Nav>
        </Navbar>
      </Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usage" element={<Usage />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </>
  );
};

export default App;
