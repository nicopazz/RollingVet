import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Menu = () => {
  const navigate = useNavigate();
  const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioRollingVet'));

  const logout = () => {
    localStorage.removeItem('usuarioRollingVet');
    navigate('/');
  };

  return (
    <Navbar expand="lg" className="bg-white py-3 shadow-sm sticky-top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-3 text-primary">
            RollingVet
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <NavLink end className="nav-item nav-link mx-2" to="/">Inicio</NavLink>
            <NavLink end className="nav-item nav-link mx-2" to="/acerca-de-nosotros">Nosotros</NavLink>
            
            {/* Solo mostramos el link Admin si hay usuario */}
            {usuarioLogueado && (
                <NavLink end className="nav-item nav-link mx-2" to="/administrador">Administrador</NavLink>
            )}

            {/* LÓGICA: ¿Está logueado? Mostramos Salir. ¿No? Mostramos Login */}
            {usuarioLogueado ? (
                <Button variant="danger" className="ms-2 rounded-pill px-3" onClick={logout}>
                    Cerrar Sesión
                </Button>
            ) : (
                <>
                    <NavLink end className="nav-item nav-link mx-2" to="/registro">Registro</NavLink>
                    <NavLink end className="nav-item nav-link mx-2" to="/login">Login</NavLink>
                </>
            )}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;