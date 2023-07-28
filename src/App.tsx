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
      <Container fluid className="ms-2">
        <Navbar expand="lg">
          <Navbar.Brand href="/">Sock Drawer</Navbar.Brand>
          <Nav>
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
