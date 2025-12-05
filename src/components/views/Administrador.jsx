import { useEffect, useState} from 'react';
import { Container, Table, Button, Row, Col, Card, Nav, Form, InputGroup } from 'react-bootstrap';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import AdministrarServicios from './AdministrarServicios';
import AdministrarPacientes from './AdministrarPacientes';
import AdministrarProfesionales from './AdministrarProfesionales';
import AdministrarUsuarios from './AdministrarUsuarios';
import AdministrarTurnos from './AdministrarTurnos'; 

const Administrador = () => {
    
    const location = useLocation();
    const [vistaActiva, setVistaActiva] = useState(location.state?.section || 'turnos');
    const navigate = useNavigate();

    
    useEffect(() => {
        const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioRollingVet'));
        if (!usuarioLogueado) {
            navigate('/login');
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
            case 'turnos':
                return <AdministrarTurnos />;
            case 'servicios':
                return <AdministrarServicios />;
            case 'pacientes':
                return <AdministrarPacientes />;
            case 'profesionales':
                return <AdministrarProfesionales />;
            case 'usuarios':
                return <AdministrarUsuarios />;
            default:
                return <AdministrarTurnos />;
        }
    };

    return (
        <Container fluid className="p-0 overflow-hidden">
            <Row className="g-0">
                
                <Col md={3} lg={2} className="bg-light min-vh-100 text-dark d-flex flex-column py-4 shadow sticky-top" style={{height: '100vh'}}>
                    <div className="text-center mb-5 px-2">
                        <h4 className="fw-bold text-dark letter-spacing-2">ADMINISTRACION</h4>
                        <small className="text-white-50">RollingVet v1.0</small>
                    </div>

                    <Nav className="flex-column px-2 gap-2">
                       
                        <Button 
                            variant={vistaActiva === 'turnos' ? 'info' : 'outline-info'} 
                            className="text-start border-0 py-3 px-4 rounded-3 d-flex align-items-center text-dark"
                            onClick={() => setVistaActiva('turnos')}
                        >
                            <i className="bi bi-calendar-check me-3 fs-5"></i> Turnos
                        </Button>
                        
                        
                        <Button 
                            variant={vistaActiva === 'servicios' ? 'info' : 'outline-info'} 
                            className="text-start border-0 py-3 px-4 rounded-3 d-flex align-items-center text-dark"
                            onClick={() => setVistaActiva('servicios')}
                        >
                            <i className="bi bi-tags-fill me-3 fs-5"></i> Servicios
                        </Button>
                        
                        
                        <Button 
                            variant={vistaActiva === 'pacientes' ? 'info' : 'outline-info'} 
                            className={`text-start border-0 py-3 px-4 rounded-3 d-flex align-items-center ${vistaActiva === 'pacientes' ? 'text-dark' : 'text-dark'}`}
                            onClick={() => setVistaActiva('pacientes')}
                        >
                            <i className="bi bi-person-lines-fill me-3 fs-5"></i> Pacientes
                        </Button>
                        
                       
                        <Button 
                            variant={vistaActiva === 'profesionales' ? 'info' : 'outline-info'} 
                            className="text-start border-0 py-3 px-4 rounded-3 d-flex align-items-center text-dark"
                            onClick={() => setVistaActiva('profesionales')}
                        >
                            <i className="bi bi-people-fill me-3 fs-5"></i> Personal
                        </Button>

                       
                        <Button 
                            variant={vistaActiva === 'usuarios' ? 'info' : 'outline-info'} 
                            className="text-start border-0 py-3 px-4 rounded-3 d-flex align-items-center text-dark"
                            onClick={() => setVistaActiva('usuarios')}
                        >
                            <i className="bi bi-person-badge me-3 fs-5"></i> Usuarios
                        </Button>
                    </Nav>
                </Col>

                
                <Col md={9} lg={10} className="bg-light p-4" style={{ height: '100vh', overflowY: 'auto' }}>
                    
                    <div className="mainSection">
                         {renderContent()}
                    </div>

                </Col>
            </Row>
        </Container>
    );
};

export default Administrador;