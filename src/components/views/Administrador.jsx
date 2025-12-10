import { useEffect, useState } from "react";
import { Container, Button, Row, Col, Nav } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

import Dashboard from "./Dashboard";
import AdministrarServicios from "./AdministrarServicios";
import AdministrarProductos from "./AdministrarProductos";
import AdministrarPacientes from "./AdministrarPacientes";
import AdministrarProfesionales from "./AdministrarProfesionales";
import AdministrarUsuarios from "./AdministrarUsuarios";
import AdministrarTurnos from "./AdministrarTurnos";

const Administrador = () => {
  const location = useLocation();
  const [vistaActiva, setVistaActiva] = useState(
    location.state?.section || "dashboard"
  );
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioLogueado = JSON.parse(
      localStorage.getItem("usuarioRollingVet")
    );
    if (!usuarioLogueado) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (location.state?.section) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVistaActiva(location.state.section);
    }
  }, [location.state]);

  const renderContent = () => {
    switch (vistaActiva) {
      case "dashboard":
        return <Dashboard />;
      case "turnos":
        return <AdministrarTurnos />;
      case "servicios":
        return <AdministrarServicios />;
      case "productos":
        return <AdministrarProductos />;
      case "pacientes":
        return <AdministrarPacientes />;
      case "profesionales":
        return <AdministrarProfesionales />;
      case "usuarios":
        return <AdministrarUsuarios />;
      default:
        return <Dashboard />;
    }
  };

  const getButtonClass = (vista) => 
    `text-start border-0 py-3 px-4 rounded-3 d-flex align-items-center mb-1 ${
      vistaActiva === vista ? "bg-info text-dark fw-bold shadow-sm" : "text-secondary hover-bg-light"
    }`;

  return (
    <Container fluid className="p-0">
      <Row className="g-0">
      
        <Col
          md={3}
          lg={2}
          className="bg-white min-vh-100 d-flex flex-column py-4 shadow-sm border-end"
        >
          <div className="text-center mb-5 px-3">
            <h4 className="fw-bold text-primary letter-spacing-2">
              <i className="bi bi-shield-lock-fill me-2"></i>ADMIN
            </h4>
            <small className="text-muted">RollingVet v1.0</small>
          </div>

          <Nav className="flex-column px-3">
            <Button
              variant="link"
              className={getButtonClass("dashboard")}
              onClick={() => setVistaActiva("dashboard")}
              style={{ textDecoration: 'none' }}
            >
              <i className="bi bi-speedometer2 me-3 fs-5"></i> Inicio
            </Button>

            <div className="text-muted small fw-bold mt-3 mb-2 px-3">GESTIÓN</div>

            <Button
              variant="link"
              className={getButtonClass("turnos")}
              onClick={() => setVistaActiva("turnos")}
              style={{ textDecoration: 'none' }}
            >
              <i className="bi bi-calendar-check me-3 fs-5"></i> Turnos
            </Button>

            <Button
              variant="link"
              className={getButtonClass("pacientes")}
              onClick={() => setVistaActiva("pacientes")}
              style={{ textDecoration: 'none' }}
            >
              <i className="bi bi-person-lines-fill me-3 fs-5"></i> Pacientes
            </Button>

            <div className="text-muted small fw-bold mt-3 mb-2 px-3">CONFIGURACIÓN</div>

            <Button
              variant="link"
              className={getButtonClass("servicios")}
              onClick={() => setVistaActiva("servicios")}
              style={{ textDecoration: 'none' }}
            >
              <i className="bi bi-tags-fill me-3 fs-5"></i> Servicios
            </Button>

            <Button
              variant="link"
              className={getButtonClass("productos")}
              onClick={() => setVistaActiva("productos")}
              style={{ textDecoration: 'none' }}
            >
              <i className="bi bi-bag-fill me-3 fs-5"></i> Productos
            </Button>

            <Button
              variant="link"
              className={getButtonClass("profesionales")}
              onClick={() => setVistaActiva("profesionales")}
              style={{ textDecoration: 'none' }}
            >
              <i className="bi bi-people-fill me-3 fs-5"></i> Personal
            </Button>

            <Button
              variant="link"
              className={getButtonClass("usuarios")}
              onClick={() => setVistaActiva("usuarios")}
              style={{ textDecoration: 'none' }}
            >
              <i className="bi bi-person-badge me-3 fs-5"></i> Usuarios
            </Button>
          </Nav>
        </Col>

        
        <Col
          md={9}
          lg={10}
          className="bg-light p-4"
         
        >
          <div className="fade-in">
            {renderContent()}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Administrador;