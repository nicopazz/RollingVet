import { useEffect, useState, useCallback } from 'react';
import { Container, Table, Button, Row, Col, Card, Nav } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { borrarTurnoAPI, obtenerTurnosAPI } from '../../helpers/queries';
import { useNavigate, Link } from 'react-router-dom';
import AdministrarServicios from './AdministrarServicios';
import AdministrarPacientes from './AdministrarPacientes';
import AdministrarProfesionales from './AdministrarProfesionales'; 

const Administrador = () => {
    const [turnos, setTurnos] = useState([]);
    const [vistaActiva, setVistaActiva] = useState('turnos'); 
    const navigate = useNavigate();

    const consultarAPI = useCallback(async () => {
        const respuesta = await obtenerTurnosAPI();
        if (respuesta && respuesta.status === 200) {
            const datos = await respuesta.json();
            setTurnos(datos);
        } else {
            Swal.fire("Ocurrió un error", "Intente mas tarde", "error");
        }
    }, []);

    useEffect(() => {
        const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioRollingVet'));
        if (!usuarioLogueado) {
            navigate('/login');
        } else {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            consultarAPI();
        }
    }, [consultarAPI, navigate]);

    const borrarTurno = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir este paso",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Borrar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const respuesta = await borrarTurnoAPI(id);
                if (respuesta && respuesta.status === 200) {
                    Swal.fire('Borrado!', 'El turno ha sido eliminado.', 'success');
                    consultarAPI(); 
                } else {
                    Swal.fire('Error', 'No se pudo eliminar el turno', 'error');
                }
            }
        })
    };

    return (
        <Container fluid className="p-0 overflow-hidden">
            <Row className="g-0">
                <Col md={3} lg={2} className="bg-white min-vh-100 text-dark d-flex flex-column py-4 shadow">
                    <div className="text-center mb-5">
                        <h4 className="fw-bold text-dark letter-spacing-2">PANEL ADMIN</h4>
                        
                    </div>

                    <Nav className="flex-column px-2 gap-2">
                        <Button 
                            variant={vistaActiva === 'turnos' ? 'primary' : 'outline-secondary'} 
                            className="text-start border-0 py-3 px-4 rounded-3 d-flex align-items-center"
                            onClick={() => setVistaActiva('turnos')}
                        >
                            <i className="bi bi-calendar-check me-3 fs-5"></i> Turnos
                        </Button>
                        
                        <Button 
                            variant={vistaActiva === 'servicios' ? 'success' : 'outline-secondary'} 
                            className="text-start border-0 py-3 px-4 rounded-3 d-flex align-items-center"
                            onClick={() => setVistaActiva('servicios')}
                        >
                            <i className="bi bi-tags-fill me-3 fs-5"></i> Servicios
                        </Button>
                        
                        <Button 
                            variant={vistaActiva === 'pacientes' ? 'warning' : 'outline-secondary'} 
                            className={`text-start border-0 py-3 px-4 rounded-3 d-flex align-items-center ${vistaActiva !== 'pacientes' ? 'text-' : 'text-dark'}`}
                            onClick={() => setVistaActiva('pacientes')}
                        >
                            <i className="bi bi-person-lines-fill me-3 fs-5"></i> Pacientes
                        </Button>
                        
                        <Button 
                            variant={vistaActiva === 'profesionales' ? 'info' : 'outline-secondary'} 
                            className="text-start border-0 py-3 px-4 rounded-3 d-flex align-items-center text-dark"
                            onClick={() => setVistaActiva('profesionales')}
                        >
                            <i className="bi bi-people-fill me-3 fs-5"></i> Profesionales
                        </Button>
                    </Nav>

                    <div className="mt-auto px-3 text-center text-white-50 small">
                        <p>Logueado como Admin</p>
                    </div>
                </Col>

                
                <Col md={9} lg={10} className="bg-light p-4" style={{ maxHeight: '100vh', overflowY: 'auto' }}>
                    
                    
                    {vistaActiva === 'turnos' && (
                        <div className="fade-in-animation">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h1 className="display-5 fw-bold text-dark">Gestión de Turnos</h1>
                                <Link to="/administrador/crear-turno" className="btn btn-primary rounded-pill px-4 shadow-sm">
                                    <i className="bi bi-plus-circle me-2"></i>Nuevo Turno
                                </Link>
                            </div>
                            <hr className="mb-4" />
                            
                            <Card className="border-0 shadow-sm">
                                <Card.Body className="p-0">
                                    <Table hover responsive className="mb-0 align-middle">
                                        <thead className="bg-light border-bottom">
                                            <tr>
                                                <th className="py-3 ps-4">Mascota</th>
                                                <th className="py-3">Veterinario</th>
                                                <th className="py-3">Fecha</th>
                                                <th className="py-3">Hora</th>
                                                <th className="py-3">Estado</th>
                                                <th className="py-3 text-center">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {turnos.length > 0 ? (
                                                turnos.map((turno) => (
                                                    <tr key={turno._id} className="border-bottom">
                                                        <td className="ps-4 fw-semibold">{turno.mascota}</td>
                                                        <td>{turno.veterinario}</td>
                                                        <td>{new Date(turno.fecha).toLocaleDateString()}</td>
                                                        <td>{turno.hora} hs</td>
                                                        <td>
                                                            <span className={`badge rounded-pill px-3 py-2 ${
                                                                turno.estado === 'realizado' ? 'bg-success' : 
                                                                turno.estado === 'cancelado' ? 'bg-danger' : 
                                                                'bg-warning text-dark'
                                                            }`}>
                                                                {turno.estado}
                                                            </span>
                                                        </td>
                                                        <td className="text-center">
                                                            <Link 
                                                                to={`/administrador/editar-turno/${turno._id}`} 
                                                                className="btn btn-light border btn-sm me-2 rounded-2" 
                                                                title="Editar"
                                                            >
                                                                <i className="bi bi-pencil-square text-warning"></i>
                                                            </Link>
                                                            <Button variant="light" className="border btn-sm rounded-2" onClick={() => borrarTurno(turno._id)}>
                                                                <i className="bi bi-trash-fill text-danger"></i>
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="6" className="text-center py-5 text-muted">No hay turnos registrados</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </div>
                    )}

                    
                    
                    {vistaActiva === 'servicios' && <AdministrarServicios />}
                    
                    {vistaActiva === 'pacientes' && <AdministrarPacientes />}
                    
                    {vistaActiva === 'profesionales' && <AdministrarProfesionales />}

                </Col>
            </Row>
        </Container>
    );
};

export default Administrador;