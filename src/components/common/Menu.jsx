import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const Menu = () => {
  const navigate = useNavigate();
  const [clima, setClima] = useState(null);

  const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioRollingVet"));
  const esAdmin = usuarioLogueado && usuarioLogueado.rol === 'admin';
  const estaLogueado = !!usuarioLogueado;

  useEffect(() => {
    const obtenerClima = async () => {
      try {
        const API_KEY = import.meta.env.VITE_API_KEY;
        const ciudad = 'San Miguel de Tucuman';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`;

        const respuesta = await fetch(url);
        const data = await respuesta.json();

        if (data.main && data.weather) {
          setClima({
            temperatura: Math.round(data.main.temp),
            icono: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
            descripcion: data.weather[0].description
          });
        }
      } catch (error) {
        console.error("Error al cargar el clima:", error);
      }
    };

    obtenerClima();
  }, []);

  const logout = () => {
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: "¿Estás seguro que deseas salir del sistema?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("usuarioRollingVet");
        Swal.fire({
            title: '¡Hasta pronto!',
            text: 'Has cerrado sesión correctamente.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
        });
        navigate("/");
      }
    });
  };

  return (
    <Navbar expand="lg" className="bg-white py-3 shadow-sm sticky-top">
      <Container>
       <Navbar.Brand as={Link} to="/" className="fw-bold fs-3 text-primary d-flex align-items-center">
          <div 
            className="bg-primary me-2" 
            style={{
              width: '40px', 
              height: '40px',
              maskImage: `url(/imgpng.png)`,
              WebkitMaskImage: `url(/imgpng.png)`,
              maskSize: 'contain',
              WebkitMaskSize: 'contain',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskPosition: 'center'
            }}
          ></div>
          RollingVet
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <NavLink end className="nav-item nav-link mx-2" to="/">
              Inicio
            </NavLink>
            <NavLink end className="nav-item nav-link mx-2" to="/acerca-de-nosotros">
              Nosotros
            </NavLink>
            <NavLink end className="nav-item nav-link mx-2" to="/contacto">
              Contacto
            </NavLink>

            {esAdmin && (
              <NavLink end className="nav-item nav-link mx-2" to="/administrador">
                Administrador
              </NavLink>
            )}

            {estaLogueado && (
              <NavLink end className="nav-item nav-link mx-2" to="/mis-turnos">
                  Mis Turnos
              </NavLink>
            )}

            
            {clima && (
              <div className="d-flex align-items-center mx-2 px-3 border-start border-end border-light text-secondary" style={{fontSize: '0.9rem'}}>
                <span>Tucumán: {clima.temperatura}°C</span>
                <img src={clima.icono} alt={clima.descripcion} style={{width: '35px'}} />
              </div>
            )}

            
            {estaLogueado ? (
              <>
                <div className="mx-3 text-dark d-flex align-items-center">
                  <i className="bi bi-person-circle fs-4 me-2 text-primary"></i>
                  <span>Hola, <span className="fw-bold text-primary">{usuarioLogueado.nombre}</span></span>
                </div>
                <Button
                  variant="danger"
                  className="rounded-pill px-3"
                  onClick={logout}
                >
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <NavLink end className="nav-item nav-link mx-2" to="/registro">
                  Registro
                </NavLink>
                <NavLink end className="nav-item nav-link mx-2" to="/login">
                  Ingresá<i className="bi bi-box-arrow-in-right ms-2 text-primary"></i>
                </NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;