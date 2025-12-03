import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link, NavLink } from 'react-router-dom';

const Menu = () => {
  return (
    <Navbar expand="lg" className="bg-white py-3 shadow-sm sticky-top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-3 text-primary">
            [RollingVet]
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <NavLink end className="nav-item nav-link mx-2" to="/">Inicio</NavLink>
            <NavLink end className="nav-item nav-link mx-2" to="/administrador">Administrador</NavLink>
            <NavLink end className="nav-item nav-link mx-2" to="/registro">Registro</NavLink>
            <NavLink end className="nav-item nav-link mx-2" to="/login">Login</NavLink>
            
            
            <span className="fw-bold ms-3 d-none d-lg-block text-secondary me-3">
               123-456-7890
            </span>

            <Button variant="warning" className="text-white fw-bold rounded-pill px-4">
              AGENDAR CITA
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;